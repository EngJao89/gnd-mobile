import i18n from '@/i18n';

export function formatPrice(price: string) {
  const value = Number(price);

  if (Number.isNaN(value)) {
    return price;
  }

  const locale = i18n.language.startsWith('en') ? 'en-US' : 'pt-BR';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
