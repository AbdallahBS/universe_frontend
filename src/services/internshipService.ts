import { apiFetch } from './api';
import { TokensResponse } from 'types/network';

export async function getInternships(page : string = '1', limit : string = '10', categories : string[] = [], filters : any, searchQuery : string): Promise<any> {  
  try {
    let url = `/api/internships?limit=${limit}&page=${page}`;
    if (categories.length > 0) {
      url += `&categories=${categories.join(',')}`;
    }
    if (searchQuery.length > 0) {
      url += `&search=${searchQuery}`;
      url += `&criteria=${filters.criteria.join(',')}`;
    }
    if (filters.dateFrom) {
      url += `&fromDate=${filters.dateFrom}`;
    }
    if (filters.dateTo) {
      url += `&toDate=${filters.dateTo}`;
    }

    console.log(url);
    
    const data = await apiFetch<TokensResponse>(url, {
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
