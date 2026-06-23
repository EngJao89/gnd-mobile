import { getApiBaseUrl } from '@/lib/axios';

export function getProductImageUrl(imageUrl: string) {
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  const baseUrl = getApiBaseUrl().replace(/\/$/, '');
  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;

  return `${baseUrl}${path}`;
}
