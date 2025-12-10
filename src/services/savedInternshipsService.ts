import { apiFetch } from './api';
import { LinkedInPost } from 'types/resource';

interface SavedInternship extends LinkedInPost {
    savedAt?: string;
}

interface SavedInternshipsResponse {
    success: boolean;
    data: SavedInternship[];
}

interface CheckSavedResponse {
    success: boolean;
    data: { isSaved: boolean };
}

interface SaveActionResponse {
    success: boolean;
    data: { message: string };
}

/**
 * Save an internship to user's saved list
 */
export async function saveInternship(internshipUrn: string): Promise<SaveActionResponse> {
    try {
        const data = await apiFetch<SaveActionResponse>('/api/users/saved-internships/save', {
            method: 'POST',
            json: { internshipUrn },
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to save internship';
        throw new Error(message);
    }
}

/**
 * Remove an internship from user's saved list
 */
export async function unsaveInternship(internshipUrn: string): Promise<SaveActionResponse> {
    try {
        const data = await apiFetch<SaveActionResponse>(`/api/users/saved-internships/unsave/${internshipUrn}`, {
            method: 'DELETE',
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to unsave internship';
        throw new Error(message);
    }
}

/**
 * Get all saved internships for the current user
 */
export async function getSavedInternships(): Promise<SavedInternship[]> {
    try {
        const data = await apiFetch<SavedInternshipsResponse>('/api/users/saved-internships', {
            requireAuth: true,
        });
        return data.data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch saved internships';
        throw new Error(message);
    }
}

/**
 * Check if a specific internship is saved by the current user
 */
export async function checkIfSaved(internshipUrn: string): Promise<boolean> {
    try {
        const data = await apiFetch<CheckSavedResponse>(`/api/users/saved-internships/check/${internshipUrn}`, {
            requireAuth: true,
        });
        return data.data.isSaved;
    } catch (err: any) {
        // If error (e.g., not logged in), return false
        return false;
    }
}
