import { apiFetch } from './api';
import { DBCollectionInfo, TokensResponse } from 'types/network';

/** Users management **/
export async function getUsers(page? : String): Promise<any> {
  try {
    const data = await apiFetch<TokensResponse>(`/api/admin/users?page=${page}`, {
      requireAuth: true,
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
      requireAuth: true,
      method: 'POST',
      json: { userId: id, promote: isPromote },
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
      requireAuth: true,
      method: 'DELETE',
      json: { userId: id },
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
      requireAuth: true,
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function startScrapers(scraper: any): Promise<any> {
  try {
    const data = await apiFetch<TokensResponse>(`/api/scrapers/run`, {
      method: 'POST',
      requireAuth: true,
      json: {
        _id: scraper._id,
        name: scraper.name,
        scrapperApifyId: scraper.scrapperApifyId,
        targetCollection: scraper.targetCollection,
        totalScrappedResult: scraper.totalScrappedResult,
        sendNotificationMail: scraper.sendNotificationMail,
        RequestBody: scraper.RequestBody
      }
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function changeScraperStatus(scraperId: string, status: string): Promise<any> {
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/status/${scraperId}?status=${status}`, {
      method: 'PATCH',
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function updateScraper(scraper: any): Promise<any> {
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/${scraper._id}`, {
      method: 'PUT',
      requireAuth: true,
      json: scraper
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function deleteScraper(scraperId: string): Promise<any> {
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers/${scraperId}`, {
      method: 'DELETE',
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function addScraper(scraper: any): Promise<any> {
  try {
    const data = apiFetch<TokensResponse>(`/api/scrapers`, {
      method: 'POST',
      requireAuth: true,
      json: scraper
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function getDBCollections(): Promise<any> {
  try {
    const data = await apiFetch<DBCollectionInfo>(`/api/admin/dangerzone/collections`, {
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function deleteDBCollectionByName(collectionName: string): Promise<any> {
  try {
    const data = await apiFetch<any>(`/api/admin/dangerzone/collections/${collectionName}`, {
      method: 'DELETE',
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function backupDB(): Promise<any> {
  try {
    const data = await apiFetch<any>(`/api/admin/dangerzone/backupdb`, {
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}

export async function resetSessionsandAnalytics(): Promise<any> {
  try {
    const data = await apiFetch<any>(`/api/admin/dangerzone/resetsessionsanalytics`, {
      requireAuth: true
    });
    return data;
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'Fetch failed';
    throw new Error(message);
  }
}