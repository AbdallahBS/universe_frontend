import { apiFetch } from './api';
import {
    Alternance,
    AlternanceFormData,
    AlternanceListResponse,
    AlternanceFilters,
    AlternanceStats
} from '../types/alternance';

/**
 * Get all alternances with pagination and filters
 */
export async function getAlternances(
    page: number = 1,
    limit: number = 10,
    filters: AlternanceFilters = {}
): Promise<{ success: boolean; data: AlternanceListResponse }> {
    try {
        let url = `/api/alternances?page=${page}&limit=${limit}`;

        if (filters.search) {
            url += `&search=${encodeURIComponent(filters.search)}`;
        }
        if (filters.type) {
            url += `&type=${filters.type}`;
        }
        if (filters.category) {
            url += `&category=${filters.category}`;
        }
        if (filters.isActive !== undefined) {
            url += `&isActive=${filters.isActive}`;
        }
        if (filters.status) {
            url += `&status=${filters.status}`;
        }
        if (filters.fromDate) {
            url += `&fromDate=${filters.fromDate}`;
        }
        if (filters.toDate) {
            url += `&toDate=${filters.toDate}`;
        }

        const response = await apiFetch<{ success: boolean; data: AlternanceListResponse }>(url, {
            requireAuth: true,
        });

        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch alternances';
        throw new Error(message);
    }
}

/**
 * Get a single alternance by ID
 */
export async function getAlternance(id: string): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>(`/api/alternances/${id}`, {
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch alternance';
        throw new Error(message);
    }
}

/**
 * Create a new alternance
 */
export async function createAlternance(data: AlternanceFormData): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>('/api/alternances', {
            method: 'POST',
            json: data,
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to create alternance';
        throw new Error(message);
    }
}

/**
 * Update an existing alternance
 */
export async function updateAlternance(id: string, data: AlternanceFormData): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>(`/api/alternances/${id}`, {
            method: 'PUT',
            json: data,
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to update alternance';
        throw new Error(message);
    }
}

/**
 * Delete an alternance
 */
export async function deleteAlternance(id: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await apiFetch<{ success: boolean; message: string }>(`/api/alternances/${id}`, {
            method: 'DELETE',
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to delete alternance';
        throw new Error(message);
    }
}

/**
 * Toggle alternance active status
 */
export async function toggleAlternanceStatus(id: string): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>(`/api/alternances/${id}/toggle-status`, {
            method: 'PATCH',
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to toggle alternance status';
        throw new Error(message);
    }
}

/**
 * Get alternance statistics
 */
export async function getAlternanceStats(): Promise<{ success: boolean; data: AlternanceStats }> {
    try {
        const response = await apiFetch<{ success: boolean; data: AlternanceStats }>('/api/alternances/stats', {
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch alternance stats';
        throw new Error(message);
    }
}

/**
 * Approve an alternance
 */
export async function approveAlternance(id: string): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>(`/api/alternances/${id}/approve`, {
            method: 'PATCH',
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to approve alternance';
        throw new Error(message);
    }
}

/**
 * Reject an alternance
 */
export async function rejectAlternance(id: string): Promise<{ success: boolean; data: Alternance }> {
    try {
        const response = await apiFetch<{ success: boolean; data: Alternance }>(`/api/alternances/${id}/reject`, {
            method: 'PATCH',
            requireAuth: true,
        });
        return response;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to reject alternance';
        throw new Error(message);
    }
}

/**
 * Bulk approve alternances
 */
export async function bulkApproveAlternances(ids: string[]): Promise<{ success: boolean; approvedCount: number }> {
    try {
        const response = await apiFetch<{ success: boolean; data: { approvedCount: number } }>('/api/alternances/bulk-approve', {
            method: 'POST',
            json: { ids },
            requireAuth: true,
        });
        return { success: response.success, approvedCount: response.data.approvedCount };
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to bulk approve alternances';
        throw new Error(message);
    }
}

/**
 * Bulk reject alternances
 */
export async function bulkRejectAlternances(ids: string[]): Promise<{ success: boolean; rejectedCount: number }> {
    try {
        const response = await apiFetch<{ success: boolean; data: { rejectedCount: number } }>('/api/alternances/bulk-reject', {
            method: 'POST',
            json: { ids },
            requireAuth: true,
        });
        return { success: response.success, rejectedCount: response.data.rejectedCount };
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to bulk reject alternances';
        throw new Error(message);
    }
}
