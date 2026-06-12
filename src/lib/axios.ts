import axios from 'axios';
import { Platform } from 'react-native';

function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  return Platform.select({
    android: 'http://10.0.2.2:3333',
    default: 'http://localhost:3333',
  })!;
}

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
