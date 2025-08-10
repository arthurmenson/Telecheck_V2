import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface AuthState {
  token: string | null;
  userId: string | null;
}

const TOKEN_KEY = 'telecheck_token';
const USER_KEY = 'telecheck_user';

// Helper functions for cross-platform storage
async function setItem(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}

async function getItem(key: string): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}

async function removeItem(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}

export async function login(email: string, password: string): Promise<AuthState> {
  // Backend auth endpoints not wired in this scaffold; simulate token issuance
  const token = 'dev_token_' + Date.now();
  const userId = email || 'user-1';
  await setItem(TOKEN_KEY, token);
  await setItem(USER_KEY, userId);
  return { token, userId };
}

export async function register(name: string, email: string, password: string): Promise<AuthState> {
  return login(email, password);
}

export async function logout(): Promise<void> {
  await removeItem(TOKEN_KEY);
  await removeItem(USER_KEY);
}

export async function getAuthState(): Promise<AuthState> {
  const token = await getItem(TOKEN_KEY);
  const userId = await getItem(USER_KEY);
  return { token, userId };
}


