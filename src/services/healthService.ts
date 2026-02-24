import { DBMetricsResponse, FrontendMetricsResponse, SuspiciousActivityMetricsResponse, SystemMetricsResponse, VisitorsMetricsResponse } from 'types/health';
import { apiFetch } from './api';

/**
 * Get health statistics
 */
export async function getSystemStats(): Promise<SystemMetricsResponse> {
    try {
        const data = await apiFetch<SystemMetricsResponse>('/health/backend/general', {
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch system stats';
        throw new Error(message);
    }
}

export async function getSuspeciousActivityStats(): Promise<SuspiciousActivityMetricsResponse> {
    try {
        const data = await apiFetch<SuspiciousActivityMetricsResponse>('/health/backend/suspeciousactivity', {
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch suspicious activity stats';
        throw new Error(message);
    }
}

export async function getFrontendStats(): Promise<FrontendMetricsResponse> {
    try {
        const data = await apiFetch<FrontendMetricsResponse>('/health/frontend', {
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch frontend stats';
        throw new Error(message);
    }
}

export async function getDBStats(): Promise<DBMetricsResponse> {
    try {
        const data = await apiFetch<DBMetricsResponse>('/health/DB', {
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch DB stats';
        throw new Error(message);
    }
}

export async function getVisitorStats(): Promise<VisitorsMetricsResponse> {
    try {
        const data = await apiFetch<VisitorsMetricsResponse>('/health/visitorbase', {
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch visitorbase stats';
        throw new Error(message);
    }
}