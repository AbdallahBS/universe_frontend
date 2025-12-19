import { apiFetch } from './api';
import { TokensResponse } from 'types/network';

/** Users management **/
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

/** Scrapers management **/
export async function getScrapers(): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/scrapers`, {
      requireAuth: false,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function startScrapers(scraper : any): Promise<any> {  
  try {
    const data = await apiFetch<TokensResponse>(`/api/scrapers/run`, {
      method: 'POST',
      requireAuth: false,
      json: {
        name : scraper.name,
        scrapperApifyId : scraper.scrapperApifyId,
        totalScrappedResult : scraper.totalScrappedResult,
        RequestBody : scraper.RequestBody
      }
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function changeScraperStatus(scraperId : string, status : string): Promise<any> {  
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/status/${scraperId}?status=${status}`, {
      method: 'PATCH',
      requireAuth: false
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function updateScraper (scraper : any): Promise<any> {  
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/${scraper.scrapperApifyId}`, {
      method: 'PUT',
      requireAuth: false,
      json : scraper
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function deleteScraper (scrapperApifyId : string): Promise<any> {  
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/${scrapperApifyId}`, {
      method: 'DELETE',
      requireAuth: false
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function addScraper (scraper : any): Promise<any> {  
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers`, {
      method: 'POST',
      requireAuth: false,
      json : scraper
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}