export function formatPrice(price: string) {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return price;
  }

  return `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}
