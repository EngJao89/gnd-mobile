import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/contexts/auth';
import { addCartItem, getCart } from '@/lib/cart-api';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

type CartContextValue = {
  items: CartItem[];
  isLoading: boolean;
  addItem: (productId: string, quantity: number, product?: Product) => Promise<void>;
  getQuantity: (productId: string) => number;
  isUpdating: (productId: string) => boolean;
  reload: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

function upsertItem(
  items: CartItem[],
  productId: string,
  quantity: number,
  product?: Product,
): CartItem[] {
  if (items.some((item) => item.productId === productId)) {
    return items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + quantity }
        : item,
    );
  }

  if (!product) {
    return items;
  }

  return [
    ...items,
    {
      id: productId,
      productId,
      quantity,
      product,
    },
  ];
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { isReady, isUser } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const reload = useCallback(async () => {
    if (!isUser) {
      setItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const cart = await getCart();
      setItems(cart.items);
    } catch {
      // Keep the current items when GET /cart is not available yet.
    } finally {
      setIsLoading(false);
    }
  }, [isUser]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!isUser) {
      setItems([]);
      return;
    }

    void reload();
  }, [isReady, isUser, reload]);

  const addItem = useCallback(
    async (productId: string, quantity: number, product?: Product) => {
      if (quantity < 1) {
        return;
      }

      setPendingIds((current) => new Set(current).add(productId));

      try {
        await addCartItem(productId, quantity);
        setItems((current) => upsertItem(current, productId, quantity, product));

        try {
          const cart = await getCart();
          setItems(cart.items);
        } catch {
          // Keep the optimistic item when GET /cart is not available yet.
        }
      } finally {
        setPendingIds((current) => {
          const next = new Set(current);
          next.delete(productId);
          return next;
        });
      }
    },
    [],
  );

  const getQuantity = useCallback(
    (productId: string) => items.find((item) => item.productId === productId)?.quantity ?? 0,
    [items],
  );

  const isUpdating = useCallback((productId: string) => pendingIds.has(productId), [pendingIds]);

  const value = useMemo(
    () => ({
      items,
      isLoading,
      addItem,
      getQuantity,
      isUpdating,
      reload,
    }),
    [items, isLoading, addItem, getQuantity, isUpdating, reload],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}
