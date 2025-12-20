import { apiFetch } from './api';
import { QuizAttempt, QuizAttemptSummary, SaveAttemptPayload, ModuleStats } from '../types/quiz';

interface SaveAttemptResponse {
    success: boolean;
    message: string;
    data: {
        attemptId: string;
        attemptNumber: number;
        scorePercentage: number;
    };
}

interface AttemptsListResponse {
    success: boolean;
    data: QuizAttemptSummary[];
}

interface AttemptDetailResponse {
    success: boolean;
    data: QuizAttempt;
}

interface StatsResponse {
    success: boolean;
    data: ModuleStats[];
}

/**
 * Save a completed quiz attempt
 */
export async function saveQuizAttempt(payload: SaveAttemptPayload): Promise<SaveAttemptResponse> {
    try {
        const data = await apiFetch<SaveAttemptResponse>('/api/quiz/attempts', {
            method: 'POST',
            json: payload,
            requireAuth: true,
        });
        return data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to save quiz attempt';
        throw new Error(message);
    }
}

/**
 * Get all quiz attempts for the current user
 */
export async function getQuizAttempts(module?: string): Promise<QuizAttemptSummary[]> {
    try {
        const url = module ? `/api/quiz/attempts?module=${module}` : '/api/quiz/attempts';
        const data = await apiFetch<AttemptsListResponse>(url, {
            requireAuth: true,
        });
        return data.data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch quiz attempts';
        throw new Error(message);
    }
}

/**
 * Get a specific quiz attempt with full details
 */
export async function getQuizAttemptById(attemptId: string): Promise<QuizAttempt> {
    try {
        const data = await apiFetch<AttemptDetailResponse>(`/api/quiz/attempts/${attemptId}`, {
            requireAuth: true,
        });
        return data.data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch quiz attempt';
        throw new Error(message);
    }
}

/**
 * Get user's quiz statistics
 */
export async function getQuizStats(): Promise<ModuleStats[]> {
    try {
        const data = await apiFetch<StatsResponse>('/api/quiz/stats', {
            requireAuth: true,
        });
        return data.data;
    } catch (err: any) {
        const message = typeof err?.message === 'string' ? err.message : 'Failed to fetch quiz stats';
        throw new Error(message);
    }
}
