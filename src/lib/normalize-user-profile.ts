import type { UserProfile } from '@/types/user';

function readString(value: unknown, fallback = '') {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

export function normalizeUserProfile(value: unknown): UserProfile | null {
  const root = asRecord(value);

  if (!root) {
    return null;
  }

  const nested = asRecord(root.user) ?? asRecord(root.data) ?? root;
  const id = readString(nested.id);
  const firstName = readString(nested.firstName ?? nested.first_name);
  const surname = readString(nested.surname ?? nested.lastName ?? nested.last_name);

  if (!id && !firstName && !surname && !nested.email && !nested.phone) {
    return null;
  }

  return {
    id,
    firstName,
    surname,
    email: readString(nested.email) || undefined,
    phone: readString(nested.phone) || undefined,
  };
}

export function getUserDisplayName(user: UserProfile) {
  return [user.firstName, user.surname].filter(Boolean).join(' ').trim();
}
