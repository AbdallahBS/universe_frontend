import { apiFetch } from './api';
import { TokensResponse } from 'types/network';

export async function getUsers(): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/admin/users`, {
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}
