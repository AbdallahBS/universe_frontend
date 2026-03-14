import { apiFetch } from './api';
import { School, SchoolConfig, SchoolFilters } from '../types/school';

// ─── Public API functions ─────────────────────────────────────────────────────

export async function getSchools(
    filters: SchoolFilters = {}
): Promise<{ success: boolean; data: School[]; total: number }> {
    try {
        let url = '/api/schools?';
        if (filters.type) url += `type=${filters.type}&`;
        if (filters.location) url += `location=${encodeURIComponent(filters.location)}&`;
        if (filters.specialty) url += `specialty=${encodeURIComponent(filters.specialty)}&`;
        if (filters.search) url += `search=${encodeURIComponent(filters.search)}&`;
        url = url.replace(/[?&]$/, '');
        return await apiFetch<{ success: boolean; data: School[]; total: number }>(url);
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch schools');
    }
}

export async function getSchoolById(
    id: string
): Promise<{ success: boolean; data: School }> {
    try {
        return await apiFetch<{ success: boolean; data: School }>(`/api/schools/${id}`);
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch school');
    }
}

export async function getSchoolConfig(): Promise<{ success: boolean; data: SchoolConfig }> {
    try {
        return await apiFetch<{ success: boolean; data: SchoolConfig }>('/api/schools/config');
    } catch (err: any) {
        throw new Error(err.message || 'Failed to fetch school config');
    }
}

// ─── Client-side helpers ──────────────────────────────────────────────────────

export function getSchoolsByLicense(
    schools: School[],
    license: string
): { school: School; specialties: School['detailedSpecialties'] }[] {
    return schools
        .map((school) => {
            const matchingSpecialties = school.detailedSpecialties.filter((spec) => {
                if (Array.isArray(spec.license)) return spec.license.includes(license);
                return spec.license === license;
            });
            if (matchingSpecialties.length > 0) return { school, specialties: matchingSpecialties };
            return null;
        })
        .filter(Boolean) as { school: School; specialties: School['detailedSpecialties'] }[];
}

// ─── Admin API functions (require auth + admin role) ─────────────────────────

export async function createSchool(
    data: Partial<School>
): Promise<{ success: boolean; data: School }> {
    try {
        return await apiFetch<{ success: boolean; data: School }>('/api/schools', {
            method: 'POST',
            json: data,
            requireAuth: true,
        });
    } catch (err: any) {
        throw new Error(err.message || 'Failed to create school');
    }
}

export async function updateSchool(
    id: string,
    data: Partial<School>
): Promise<{ success: boolean; data: School }> {
    try {
        return await apiFetch<{ success: boolean; data: School }>(`/api/schools/${id}`, {
            method: 'PUT',
            json: data,
            requireAuth: true,
        });
    } catch (err: any) {
        throw new Error(err.message || 'Failed to update school');
    }
}

export async function deleteSchool(
    id: string
): Promise<{ success: boolean; message: string }> {
    try {
        return await apiFetch<{ success: boolean; message: string }>(`/api/schools/${id}`, {
            method: 'DELETE',
            requireAuth: true,
        });
    } catch (err: any) {
        throw new Error(err.message || 'Failed to delete school');
    }
}

export async function toggleSchoolStatus(
    id: string
): Promise<{ success: boolean; data: School }> {
    try {
        return await apiFetch<{ success: boolean; data: School }>(`/api/schools/${id}/status`, {
            method: 'PATCH',
            requireAuth: true,
        });
    } catch (err: any) {
        throw new Error(err.message || 'Failed to toggle school status');
    }
}
