import { getApiBaseUrl } from '@/lib/axios';

export function getProductImageUrl(imageUrl: string) {
  if (!imageUrl) {
    return imageUrl;
  }

  const baseUrl = getApiBaseUrl().replace(/\/$/, '');

  if (/^https?:\/\//i.test(imageUrl)) {
    try {
      const { pathname, search } = new URL(imageUrl);
      return `${baseUrl}${pathname}${search}`;
    } catch {
      return imageUrl;
    }
  }

  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;

  return `${baseUrl}${path}`;
}
