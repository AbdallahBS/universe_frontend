// Quiz attempt types

export interface QuestionResult {
    questionId: number;
    questionText: string;
    options: string[];
    userAnswers: number[];
    correctAnswers: number[];
    isCorrect: boolean;
    explanation: string;
    imageUrl?: string;
}

export interface QuizAttempt {
    _id: string;
    userId: string;
    module: 'ccna1' | 'ccna2' | 'ccna3';
    attemptNumber: number;
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
    timeTaken: number;
    questionResults: QuestionResult[];
    completedAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface QuizAttemptSummary {
    _id: string;
    userId: string;
    module: 'ccna1' | 'ccna2' | 'ccna3';
    attemptNumber: number;
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
    timeTaken: number;
    completedAt: string;
    createdAt: string;
}

export interface SaveAttemptPayload {
    module: 'ccna1' | 'ccna2' | 'ccna3';
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
    timeTaken: number;
    questionResults: QuestionResult[];
}

export interface ModuleStats {
    _id: string; // module name
    totalAttempts: number;
    avgScore: number;
    bestScore: number;
    totalTimeTaken: number;
}
