import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getQuizAttempts } from '../services/quizService';
import { QuizAttemptSummary } from '../types/quiz';
import { useAuth } from '../context/AuthContext';

const moduleNames: Record<string, string> = {
    ccna1: 'CCNA 1 - Introduction aux Réseaux',
    ccna2: 'CCNA 2 - Switching & Routing',
    ccna3: 'CCNA 3 - Enterprise Networking'
};

export default function QuizHistoryPage() {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [attempts, setAttempts] = useState<QuizAttemptSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterModule, setFilterModule] = useState<string>('all');

    useEffect(() => {
        document.title = 'Universe | Quiz History';
    }, []);

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated) {
            navigate('/login?redirect=/quiz-history');
            return;
        }

        const fetchAttempts = async () => {
            try {
                setLoading(true);
                const module = filterModule === 'all' ? undefined : filterModule;
                const data = await getQuizAttempts(module);
                setAttempts(data);
            } catch (err) {
                console.error('Failed to fetch attempts:', err);
                setError(err instanceof Error ? err.message : 'Failed to load quiz history');
            } finally {
                setLoading(false);
            }
        };

        fetchAttempts();
    }, [isAuthenticated, authLoading, filterModule, navigate]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
        if (percentage >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">Chargement de l'historique...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Historique des Quiz
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Consultez vos tentatives passées et suivez votre progression
                    </p>
                </div>

                {/* Filter */}
                <div className="mb-6">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilterModule('all')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterModule === 'all'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            Tous
                        </button>
                        <button
                            onClick={() => setFilterModule('ccna1')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterModule === 'ccna1'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            CCNA 1
                        </button>
                        <button
                            onClick={() => setFilterModule('ccna2')}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${filterModule === 'ccna2'
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            CCNA 2
                        </button>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                        <p className="text-red-700 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!error && attempts.length === 0 && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Aucune tentative trouvée
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Vous n'avez pas encore complété de quiz. Commencez dès maintenant !
                        </p>
                        <button
                            onClick={() => navigate('/exam-certificates')}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            Commencer un Quiz
                        </button>
                    </div>
                )}

                {/* Attempts List */}
                {!error && attempts.length > 0 && (
                    <div className="space-y-4">
                        {attempts.map((attempt) => (
                            <div
                                key={attempt._id}
                                onClick={() => navigate(`/quiz-history/${attempt._id}`)}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-[1.01] transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${attempt.module === 'ccna1'
                                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                                                    : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400'
                                                }`}>
                                                {attempt.module.toUpperCase()}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Tentative #{attempt.attemptNumber}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {moduleNames[attempt.module] || attempt.module}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(attempt.completedAt)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-center">
                                            <div className={`text-2xl font-bold px-4 py-2 rounded-xl ${getScoreColor(attempt.scorePercentage)}`}>
                                                {attempt.scorePercentage}%
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {attempt.correctAnswers}/{attempt.totalQuestions}
                                            </p>
                                        </div>
                                        <div className="text-center px-4">
                                            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                                {formatTime(attempt.timeTaken)}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Durée
                                            </p>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
