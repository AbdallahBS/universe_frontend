import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Loader2, TextSearchIcon } from 'lucide-react';
import { getQuizAttempts } from '../services/quizService';
import { QuizAttemptSummary } from '../types/quiz';
import { useNavigatePage } from './ui/useNavigatePage';

interface QuizAttemptsListProps {
    maxItems?: number;
}

const QuizAttemptsList: React.FC<QuizAttemptsListProps> = ({ maxItems = 6 }) => {
    const navigate = useNavigatePage();
    const [attempts, setAttempts] = useState<QuizAttemptSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('[QuizAttemptsList] Fetching quiz attempts...');
                const data = await getQuizAttempts();
                console.log('[QuizAttemptsList] Received data:', data);
                setAttempts(data);
            } catch (err) {
                console.error('[QuizAttemptsList] Error fetching attempts:', err);
                setError(err instanceof Error ? err.message : 'Failed to load quiz attempts');
            } finally {
                setLoading(false);
            }
        };

        fetchAttempts();
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
        if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
        );
    }

    if (attempts.length === 0) {
        return (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No quiz attempts yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Complete a CCNA quiz to see your results here!</p>
                <button
                    onClick={() => navigate('/exam-certificates')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
                >
                    <TextSearchIcon className="w-4 h-4" />
                    Start Quiz
                </button>
            </div>
        );
    }

    const displayedAttempts = attempts.slice(0, maxItems);

    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedAttempts.map((attempt) => (
                    <div
                        key={attempt._id}
                        onClick={() => navigate(`/quiz-history/${attempt._id}`)}
                        className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${attempt.module === 'ccna1'
                                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                                        : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400'
                                    }`}>
                                    {attempt.module.toUpperCase()}
                                </span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                    Attempt #{attempt.attemptNumber}
                                </p>
                            </div>
                            <div className={`text-lg font-bold px-3 py-1 rounded-lg ${getScoreColor(attempt.scorePercentage)}`}>
                                {attempt.scorePercentage}%
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(attempt.timeTaken)}</span>
                            </div>
                            <span>{attempt.correctAnswers}/{attempt.totalQuestions} correct</span>
                        </div>
                    </div>
                ))}
            </div>

            {attempts.length > maxItems && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => navigate('/quiz-history')}
                        className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                    >
                        View all {attempts.length} attempts
                    </button>
                </div>
            )}
        </>
    );
};

export default QuizAttemptsList;
