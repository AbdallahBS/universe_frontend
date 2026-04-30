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

// ─── Admin: Certificate Question Management ────────────────────────────────

export interface CertificateQuestion {
    _id: string;
    questionId: number;
    module: string;
    question: string;
    type: 'single' | 'multiple' | 'matching';
    options: string[];
    correctAnswers: number[];
    explanation: string;
    imageUrl?: string | null;
    leftItems?: string[];
    rightItems?: string[];
    correctMatches?: Record<string, number> | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface QuestionsPageResponse {
    success: boolean;
    data: {
        questions: CertificateQuestion[];
        total: number;
        page: number;
        limit: number;
    };
}

/**
 * [ADMIN] Get paginated list of certificate questions for a module
 */
export async function getAdminQuestions(
    module = 'ccna2',
    page = 1,
    limit = 20
): Promise<{ questions: CertificateQuestion[]; total: number; page: number; limit: number }> {
    const data = await apiFetch<QuestionsPageResponse>(
        `/api/quiz/questions?module=${module}&page=${page}&limit=${limit}`
        // No requireAuth — this endpoint is public (used by the quiz page for all users)
    );
    return data.data;
}

/**
 * [ADMIN] Create a new certificate question
 */
export async function addAdminQuestion(
    payload: Partial<CertificateQuestion>
): Promise<CertificateQuestion> {
    const data = await apiFetch<{ success: boolean; data: CertificateQuestion }>('/api/quiz/questions', {
        method: 'POST',
        json: payload,
        requireAuth: true,
    });
    return data.data;
}

/**
 * [ADMIN] Update an existing certificate question
 */
export async function updateAdminQuestion(
    id: string,
    payload: Partial<CertificateQuestion>
): Promise<CertificateQuestion> {
    const data = await apiFetch<{ success: boolean; data: CertificateQuestion }>(
        `/api/quiz/questions/${id}`,
        { method: 'PUT', json: payload, requireAuth: true }
    );
    return data.data;
}

/**
 * [ADMIN] Delete a certificate question by MongoDB _id
 */
export async function deleteAdminQuestion(id: string): Promise<void> {
    await apiFetch<{ success: boolean }>(`/api/quiz/questions/${id}`, {
        method: 'DELETE',
        requireAuth: true,
    });
}
