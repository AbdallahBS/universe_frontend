import { apiFetch } from './api';

/**
 * User Service - API functions for user profile management
 */

export interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profilePicture: string | null;
    isVerified: boolean;
    roles: string[];
}

/**
 * Update user profile (firstname, lastname)
 */
export async function updateProfile(data: { firstname?: string; lastname?: string }): Promise<{ message: string; user: UserProfile }> {
    try {
        const response = await apiFetch<{ message: string; user: UserProfile }>('/v1/user/update-profile', {
            method: 'PATCH',
            json: data,
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to update profile';
        throw new Error(message);
    }
}

/**
 * Upload profile picture
 */
export async function uploadProfilePicture(file: File): Promise<{ message: string; user: UserProfile }> {
    try {
        const formData = new FormData();
        formData.append('profilePicture', file);

        const response = await apiFetch<{ message: string; user: UserProfile }>('/v1/user/upload-profile-picture', {
            method: 'POST',
            body: formData,
            requireAuth: true,
            // Don't set Content-Type header - browser will set it with boundary
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to upload profile picture';
        throw new Error(message);
    }
}

/**
 * Delete profile picture
 */
export async function deleteProfilePicture(): Promise<{ message: string; user: UserProfile }> {
    try {
        const response = await apiFetch<{ message: string; user: UserProfile }>('/v1/user/delete-profile-picture', {
            method: 'DELETE',
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to delete profile picture';
        throw new Error(message);
    }
}

/**
 * Delete user account (requires password confirmation)
 */
export async function deleteAccount(password: string): Promise<{ message: string }> {
    try {
        const response = await apiFetch<{ message: string }>('/v1/user/delete-account', {
            method: 'DELETE',
            json: { password },
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to delete account';
        throw new Error(message);
    }
}
