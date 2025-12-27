import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuizAttemptById } from '../services/quizService';
import { QuizAttempt } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { useNavigatePage } from '@components/ui/useNavigatePage';

const moduleNames: Record<string, string> = {
    ccna1: 'CCNA 1 - Introduction aux Réseaux',
    ccna2: 'CCNA 2 - Switching & Routing',
    ccna3: 'CCNA 3 - Enterprise Networking'
};

export default function AttemptDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigatePage();
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAllQuestions, setShowAllQuestions] = useState(false);

    useEffect(() => {
        document.title = 'Universe | Quiz Detail';
    }, []);

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated) {
            navigate('/login?redirect=/quiz-history');
            return;
        }

        if (!id) {
            setError('Invalid attempt ID');
            setLoading(false);
            return;
        }

        const fetchAttempt = async () => {
            try {
                setLoading(true);
                const data = await getQuizAttemptById(id);
                setAttempt(data);
            } catch (err) {
                console.error('Failed to fetch attempt:', err);
                setError(err instanceof Error ? err.message : 'Failed to load attempt details');
            } finally {
                setLoading(false);
            }
        };

        fetchAttempt();
    }, [id, isAuthenticated, authLoading, navigate]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return 'from-green-400 to-emerald-600';
        if (percentage >= 60) return 'from-yellow-400 to-orange-500';
        return 'from-red-400 to-pink-600';
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-600 dark:text-gray-400">Chargement des détails...</p>
                </div>
            </div>
        );
    }

    if (error || !attempt) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                        <p className="text-red-700 dark:text-red-400 mb-4">{error || 'Attempt not found'}</p>
                        <button
                            onClick={() => navigate('/quiz-history')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retour à l'historique
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const incorrectQuestions = attempt.questionResults.filter(q => !q.isCorrect);
    const correctQuestions = attempt.questionResults.filter(q => q.isCorrect);
    const displayedQuestions = showAllQuestions ? attempt.questionResults : incorrectQuestions;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/quiz-history')}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour à l'historique
                </button>

                {/* Summary Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${attempt.module === 'ccna1'
                                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400'
                                    : 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400'
                                }`}>
                                Tentative #{attempt.attemptNumber}
                            </span>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
                                {moduleNames[attempt.module] || attempt.module}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                {formatDate(attempt.completedAt)}
                            </p>
                        </div>
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getScoreColor(attempt.scorePercentage)} flex items-center justify-center`}>
                            <span className="text-3xl font-bold text-white">{attempt.scorePercentage}%</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctQuestions.length}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Correctes</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectQuestions.length}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Incorrectes</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{attempt.totalQuestions}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatTime(attempt.timeTaken)}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">Temps</div>
                        </div>
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setShowAllQuestions(false)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${!showAllQuestions
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        Incorrectes ({incorrectQuestions.length})
                    </button>
                    <button
                        onClick={() => setShowAllQuestions(true)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${showAllQuestions
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                            }`}
                    >
                        Toutes ({attempt.questionResults.length})
                    </button>
                </div>

                {/* Questions List */}
                {displayedQuestions.length === 0 ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                            Excellent ! Toutes vos réponses étaient correctes !
                        </h3>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayedQuestions.map((question, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-medium text-white ${question.isCorrect ? 'bg-green-500' : 'bg-red-500'
                                        }`}>
                                        {question.isCorrect ? '✓' : '✗'}
                                    </span>
                                    <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                                        {question.questionText}
                                    </h3>
                                </div>

                                {/* Image if present */}
                                {question.imageUrl && (
                                    <div className="mb-4 ml-11">
                                        <img
                                            src={question.imageUrl}
                                            alt="Question diagram"
                                            className="max-w-full h-auto rounded-lg border border-gray-200 dark:border-slate-600"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}

                                {/* Options */}
                                <div className="space-y-2 ml-11">
                                    {question.options.map((option, optIdx) => {
                                        const isUserAnswer = question.userAnswers.includes(optIdx);
                                        const isCorrectAnswer = question.correctAnswers.includes(optIdx);
                                        const isWrongSelection = isUserAnswer && !isCorrectAnswer;

                                        let optionClass = 'bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300';
                                        if (isCorrectAnswer) {
                                            optionClass = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500';
                                        } else if (isWrongSelection) {
                                            optionClass = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500';
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                className={`p-3 rounded-lg ${optionClass}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${isCorrectAnswer
                                                            ? 'bg-green-500 text-white'
                                                            : isWrongSelection
                                                                ? 'bg-red-500 text-white'
                                                                : 'bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400'
                                                        }`}>
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </span>
                                                    <span className="flex-1">{option}</span>
                                                    {isUserAnswer && (
                                                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-400">
                                                            Votre réponse
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Explanation */}
                                {question.explanation && (
                                    <div className="mt-4 ml-11 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                        <div className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="font-medium text-blue-700 dark:text-blue-400 text-sm mb-1">Explication</p>
                                                <p className="text-blue-600 dark:text-blue-300 text-sm">{question.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
