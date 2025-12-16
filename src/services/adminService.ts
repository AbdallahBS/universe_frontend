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

export async function changerole(id: string, isPromote: boolean): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/admin/user/changerole`, {
      requireAuth: false,
      method: 'POST',
      json: {userId : id, promote : isPromote},
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function deleteUser(id: string): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/admin/user`, {
      requireAuth: false,
      method: 'DELETE',
      json: {userId : id},
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}