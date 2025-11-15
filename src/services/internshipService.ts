import { apiFetch } from './api';
import { TokensResponse } from 'types/network';

export async function getInternships(page : string = '1', limit : string = '10'): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/internships?page=${page}&limit=${limit}`, {
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Login failed';
    throw new Error(message);
  }
}

export async function getInternship(urn : string): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/internships/${urn}`, {
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Login failed';
    throw new Error(message);
  }
}
