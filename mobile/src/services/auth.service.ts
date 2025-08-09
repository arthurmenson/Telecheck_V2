import * as SecureStore from 'expo-secure-store';

export interface AuthState {
  token: string | null;
  userId: string | null;
}

const TOKEN_KEY = 'telecheck_token';
const USER_KEY = 'telecheck_user';

export async function login(email: string, password: string): Promise<AuthState> {
  // Backend auth endpoints not wired in this scaffold; simulate token issuance
  const token = 'dev_token_' + Date.now();
  const userId = email || 'user-1';
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  await SecureStore.setItemAsync(USER_KEY, userId);
  return { token, userId };
}

export async function register(name: string, email: string, password: string): Promise<AuthState> {
  return login(email, password);
}

export async function logout(): Promise<void> {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}

export async function getAuthState(): Promise<AuthState> {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  const userId = await SecureStore.getItemAsync(USER_KEY);
  return { token, userId };
}


