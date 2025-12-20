import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ccnaQuestions, CCNAQuestion } from './data/ccnaQuizData';
import { ccna2Questions } from './data/ccna2QuizData';
import MatchingQuestion from '../components/quiz/MatchingQuestion';
import FeedbackCard from '../components/quiz/FeedbackCard';
import { useAuth } from '../context/AuthContext';
import { saveQuizAttempt } from '../services/quizService';
import { QuestionResult, SaveAttemptPayload } from '../types/quiz';

type QuizModule = 'ccna1' | 'ccna2';

type QuizScreen = 'start' | 'quiz' | 'results';

export default function QuizPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [screen, setScreen] = useState<QuizScreen>('start');
    const [selectedModule, setSelectedModule] = useState<QuizModule>('ccna1');
    const [questions, setQuestions] = useState<CCNAQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState<{ questionId: number; selected: number[]; correct: boolean; matchingAnswers?: { [key: number]: number } }[]>([]);
    const [matchingUserAnswers, setMatchingUserAnswers] = useState<{ [key: number]: number }>({});

    // Feedback card state - show after question 3
    const [showFeedbackCard, setShowFeedbackCard] = useState(false);
    const [feedbackDismissed, setFeedbackDismissed] = useState(false);

    // Timer state
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timeLimit, setTimeLimit] = useState<number | null>(null); // in seconds
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const timerRef = useRef<number | null>(null);
    const hasAutoSubmittedRef = useRef(false);

    // Save attempt state
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [savedAttemptId, setSavedAttemptId] = useState<string | null>(null);
    const hasSavedRef = useRef(false);

    // Check for direct start from URL params
    useEffect(() => {
        const autoStart = searchParams.get('start');
        const questionCount = searchParams.get('count');
        const timeLimitParam = searchParams.get('time');
        const moduleParam = searchParams.get('module');

        if (autoStart === 'true') {
            const count = questionCount ? parseInt(questionCount) : undefined;
            const time = timeLimitParam ? parseInt(timeLimitParam) * 60 : null; // Convert minutes to seconds
            const module = (moduleParam === 'ccna1' || moduleParam === 'ccna2') ? moduleParam : 'ccna1';

            // Set the selected module before starting
            setSelectedModule(module);
            startQuiz(count, time, module);
        }
    }, [searchParams]);


    useEffect(() => {
        document.title = 'Universe | Quiz';
    }, []);

    // Timer logic
    useEffect(() => {
        if (screen === 'quiz') {
            timerRef.current = window.setInterval(() => {
                setElapsedTime(prev => prev + 1);

                if (timeLimit !== null) {
                    setRemainingTime(prev => {
                        if (prev === null) return prev;
                        const newTime = prev - 1;

                        // Auto-submit when time runs out
                        if (newTime <= 0 && !hasAutoSubmittedRef.current) {
                            hasAutoSubmittedRef.current = true;
                            // Small delay to ensure state updates
                            setTimeout(() => {
                                autoSubmitQuiz();
                            }, 100);
                        }

                        return Math.max(0, newTime);
                    });
                }
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [screen, timeLimit]);

    // Save quiz attempt when reaching results screen
    useEffect(() => {
        const saveAttempt = async () => {
            // Only save if authenticated, on results screen, not already saved, and has answers
            if (!isAuthenticated || screen !== 'results' || hasSavedRef.current || answers.length === 0) {
                return;
            }

            hasSavedRef.current = true;
            setIsSaving(true);
            setSaveError(null);

            try {
                // Build question results array
                const questionResults: QuestionResult[] = answers.map(answer => {
                    const q = questions.find(q => q.id === answer.questionId);
                    if (!q) return null;
                    return {
                        questionId: q.id,
                        questionText: q.question,
                        options: q.options,
                        userAnswers: answer.selected,
                        correctAnswers: q.correctAnswers,
                        isCorrect: answer.correct,
                        explanation: q.explanation || '',
                        imageUrl: q.imageUrl
                    };
                }).filter(Boolean) as QuestionResult[];

                const totalAnswered = answers.length;
                const correctCount = answers.filter(a => a.correct).length;
                const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

                const payload: SaveAttemptPayload = {
                    module: selectedModule,
                    totalQuestions: totalAnswered,
                    correctAnswers: correctCount,
                    scorePercentage: percentage,
                    timeTaken: elapsedTime,
                    questionResults
                };

                const response = await saveQuizAttempt(payload);
                setSavedAttemptId(response.data.attemptId);
                console.log('Quiz attempt saved successfully:', response.data.attemptId);
            } catch (error) {
                console.error('Failed to save quiz attempt:', error);
                setSaveError(error instanceof Error ? error.message : 'Failed to save attempt');
                hasSavedRef.current = false; // Allow retry
            } finally {
                setIsSaving(false);
            }
        };

        saveAttempt();
    }, [screen, isAuthenticated, answers, questions, selectedModule, elapsedTime]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Auto-submit all remaining questions and show results
    const autoSubmitQuiz = () => {
        // Calculate final score for answered questions
        setScreen('results');
    };

    const startQuiz = (questionCount?: number, timeLimitSeconds?: number | null, module?: QuizModule) => {
        // Use selected module or default
        const currentModule = module || selectedModule;
        const sourceQuestions = currentModule === 'ccna2' ? ccna2Questions : ccnaQuestions;

        // Shuffle questions
        let quizQuestions = [...sourceQuestions].sort(() => Math.random() - 0.5);

        // Limit question count if specified
        if (questionCount && questionCount > 0 && questionCount < quizQuestions.length) {
            quizQuestions = quizQuestions.slice(0, questionCount);
        }

        setQuestions(quizQuestions);
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setShowExplanation(false);
        setScore(0);
        setAnswers([]);
        setElapsedTime(0);
        setMatchingUserAnswers({});
        hasAutoSubmittedRef.current = false;

        // Set time limit
        if (timeLimitSeconds) {
            setTimeLimit(timeLimitSeconds);
            setRemainingTime(timeLimitSeconds);
        } else {
            setTimeLimit(null);
            setRemainingTime(null);
        }

        setScreen('quiz');
    };

    const handleAnswerSelect = (index: number) => {
        if (showExplanation) return;

        const currentQ = questions[currentIndex];

        if (currentQ.type === 'single') {
            setSelectedAnswers([index]);
            submitAnswer([index]);
        } else {
            setSelectedAnswers(prev => {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                } else {
                    return [...prev, index];
                }
            });
        }
    };

    const submitAnswer = (answersToSubmit: number[] = selectedAnswers) => {
        const currentQ = questions[currentIndex];
        const correctAns = currentQ.correctAnswers;

        const isCorrect =
            answersToSubmit.length === correctAns.length &&
            answersToSubmit.every(a => correctAns.includes(a));

        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        setShowExplanation(true);
        setAnswers(prev => [...prev, {
            questionId: currentQ.id,
            selected: answersToSubmit,
            correct: isCorrect
        }]);
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            // Show feedback card after completing question 3 (index 2)
            if (currentIndex === 2 && !feedbackDismissed) {
                setShowFeedbackCard(true);
            }
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswers([]);
            setShowExplanation(false);
            setMatchingUserAnswers({});
        } else {
            setScreen('results');
        }
    };

    // Handle matching question submission
    const handleMatchingSubmit = (userMatches: { [key: number]: number }, isCorrect: boolean) => {
        if (isCorrect) {
            setScore(prev => prev + 1);
        }
        setMatchingUserAnswers(userMatches);
        setShowExplanation(true);
        setAnswers(prev => [...prev, {
            questionId: currentQuestion.id,
            selected: [],
            correct: isCorrect,
            matchingAnswers: userMatches
        }]);
    };

    const restartQuiz = () => {
        // Navigate to exam certificates page (carousel) to start a new quiz
        navigate('/exam-certificates');
    };

    const currentQuestion = questions[currentIndex];
    const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
    const answeredQuestions = answers.length;

    // Timer warning states
    const isTimeLow = remainingTime !== null && remainingTime <= 60; // Last minute
    const isTimeCritical = remainingTime !== null && remainingTime <= 10; // Last 10 seconds

    // Start Screen
    if (screen === 'start') {
        const currentModuleQuestions = selectedModule === 'ccna2' ? ccna2Questions : ccnaQuestions;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-fade-in-up">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                Quiz CCNA
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {selectedModule === 'ccna1'
                                    ? 'Introduction aux Réseaux'
                                    : 'Switching, Routing & Wireless Essentials'}
                            </p>
                        </div>

                        {/* Module Selection Tabs */}
                        <div className="flex mb-6 bg-gray-100 dark:bg-slate-700/50 rounded-xl p-1">
                            <button
                                onClick={() => setSelectedModule('ccna1')}
                                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${selectedModule === 'ccna1'
                                    ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <div className="text-sm font-bold">CCNA 1</div>
                                <div className="text-xs opacity-75">Introduction aux Réseaux</div>
                            </button>
                            <button
                                onClick={() => setSelectedModule('ccna2')}
                                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${selectedModule === 'ccna2'
                                    ? 'bg-white dark:bg-slate-600 text-purple-600 dark:text-purple-400 shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                <div className="text-sm font-bold">CCNA 2</div>
                                <div className="text-xs opacity-75">Switching & Routing</div>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentModuleQuestions.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">v7.0</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Version CCNA</div>
                            </div>
                            <div className="bg-green-50 dark:bg-slate-700/50 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">⏱️</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Chronométré</div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">Mode Examen</p>
                                    <p className="text-blue-600 dark:text-blue-300 text-sm">
                                        Les {currentModuleQuestions.length} questions seront présentées dans un ordre aléatoire.
                                        Un chronomètre suivra votre progression. Certaines questions nécessitent plusieurs réponses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={() => startQuiz()}
                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>Commencer l'Examen</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>


                    </div>
                </div>
            </div>
        );
    }

    // Quiz Screen
    if (screen === 'quiz' && currentQuestion) {
        const isMultipleChoice = currentQuestion.type === 'multiple';
        const requiredSelections = currentQuestion.correctAnswers.length;
        const canSubmit = isMultipleChoice && selectedAnswers.length === requiredSelections && !showExplanation;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Progress Bar with Timer */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Question {currentIndex + 1} sur {questions.length}
                            </span>
                            <div className="flex items-center gap-2 md:gap-4">
                                {/* Countdown Timer (if time limit set) */}
                                {remainingTime !== null && (
                                    <span className={`text-sm font-bold flex items-center gap-1 px-3 py-1 rounded-full transition-all ${isTimeCritical
                                        ? 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 animate-pulse'
                                        : isTimeLow
                                            ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400'
                                            : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                                        }`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatTime(remainingTime)}
                                    </span>
                                )}
                                {/* Elapsed time (if no limit) */}
                                {remainingTime === null && (
                                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {formatTime(elapsedTime)}
                                    </span>
                                )}
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                    Score: {score}/{answeredQuestions}
                                </span>
                                {/* Cancel Button */}
                                <button
                                    onClick={() => {
                                        if (window.confirm('Êtes-vous sûr de vouloir annuler le quiz ?')) {
                                            navigate('/exam-certificates');
                                        }
                                    }}
                                    className="px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full transition-all"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        {/* Time bar if countdown active */}
                        {timeLimit && remainingTime !== null && (
                            <div className="h-1 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                                <div
                                    className={`h-full transition-all duration-1000 ${isTimeCritical ? 'bg-red-500' : isTimeLow ? 'bg-orange-500' : 'bg-green-500'
                                        }`}
                                    style={{ width: `${(remainingTime / timeLimit) * 100}%` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Question Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in-up">
                        {/* Question */}
                        <div className="mb-6">
                            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed">
                                {currentQuestion.question}
                            </h2>
                            {isMultipleChoice && !showExplanation && (
                                <p className="mt-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                                    (Choisissez {requiredSelections} réponses)
                                </p>
                            )}
                        </div>

                        {/* Image if present */}
                        {currentQuestion.imageUrl && (
                            <div className="mb-6">
                                <img
                                    src={currentQuestion.imageUrl}
                                    alt="Diagramme de la question"
                                    className="max-w-full h-auto rounded-lg mx-auto border border-gray-200 dark:border-slate-600"
                                    style={{ maxHeight: '400px' }}
                                />
                            </div>
                        )}

                        {/* Matching Question Type */}
                        {currentQuestion.type === 'matching' && currentQuestion.leftItems && currentQuestion.rightItems && currentQuestion.correctMatches && (
                            <MatchingQuestion
                                leftItems={currentQuestion.leftItems}
                                rightItems={currentQuestion.rightItems}
                                correctMatches={currentQuestion.correctMatches}
                                onSubmit={handleMatchingSubmit}
                                showResults={showExplanation}
                                userMatches={matchingUserAnswers}
                            />
                        )}

                        {/* Options (for non-matching questions) */}
                        {currentQuestion.type !== 'matching' && currentQuestion.options.length > 0 && (
                            <div className="space-y-3 mb-6">
                                {currentQuestion.options.map((option, index) => {
                                    const isSelected = selectedAnswers.includes(index);
                                    const isCorrectAnswer = currentQuestion.correctAnswers.includes(index);
                                    const isWrongSelection = isSelected && !isCorrectAnswer;

                                    let buttonClass = 'bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 border-2 border-transparent';

                                    if (showExplanation) {
                                        if (isCorrectAnswer) {
                                            buttonClass = 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 text-green-700 dark:text-green-400';
                                        } else if (isWrongSelection) {
                                            buttonClass = 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500 text-red-700 dark:text-red-400';
                                        }
                                    } else if (isSelected) {
                                        buttonClass = 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500';
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index)}
                                            disabled={showExplanation}
                                            className={`w-full p-4 rounded-xl text-left transition-all ${buttonClass} ${!showExplanation ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-medium ${showExplanation && isCorrectAnswer
                                                    ? 'bg-green-500 text-white'
                                                    : showExplanation && isWrongSelection
                                                        ? 'bg-red-500 text-white'
                                                        : isSelected
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300'
                                                    }`}>
                                                    {isMultipleChoice ? (
                                                        isSelected ? '✓' : String.fromCharCode(65 + index)
                                                    ) : (
                                                        String.fromCharCode(65 + index)
                                                    )}
                                                </span>
                                                <span className="text-gray-700 dark:text-gray-300 pt-1">{option}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Submit Button for Multiple Choice */}
                        {isMultipleChoice && !showExplanation && (
                            <button
                                onClick={() => submitAnswer()}
                                disabled={!canSubmit}
                                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 mb-4 ${canSubmit
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                    : 'bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Valider la réponse ({selectedAnswers.length}/{requiredSelections} sélectionnées)
                            </button>
                        )}

                        {/* Explanation */}
                        {showExplanation && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 animate-fade-in-up">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">Explication</p>
                                        <p className="text-blue-600 dark:text-blue-300 text-sm">{currentQuestion.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Next Button */}
                        {showExplanation && (
                            <button
                                onClick={nextQuestion}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <span>{currentIndex < questions.length - 1 ? 'Question Suivante' : 'Voir les Résultats'}</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Feedback Card - appears after question 3 */}
                {showFeedbackCard && !feedbackDismissed && (
                    <FeedbackCard
                        onClose={() => {
                            setShowFeedbackCard(false);
                            setFeedbackDismissed(true);
                        }}
                    />
                )}
            </div>
        );
    }

    // Results Screen
    if (screen === 'results') {
        const incorrectAnswers = answers.filter(a => !a.correct);
        const totalAnswered = answers.length;
        const unanswered = questions.length - totalAnswered;
        const finalScorePercentage = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
                <div className="max-w-3xl mx-auto px-4">
                    {/* Results Card */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-fade-in-up mb-6">
                        {/* Time's Up Message (if timer ran out) */}
                        {hasAutoSubmittedRef.current && (
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="font-medium text-orange-700 dark:text-orange-400">
                                        ⏰ Time's up! Your quiz has been automatically submitted.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Score Circle */}
                        <div className="text-center mb-8">
                            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${finalScorePercentage >= 80
                                ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                                : finalScorePercentage >= 60
                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                                    : 'bg-gradient-to-br from-red-400 to-pink-600'
                                }`}>
                                <span className="text-4xl font-bold text-white">{finalScorePercentage}%</span>
                            </div>

                            {/* Celebration or Encouragement Message */}
                            {finalScorePercentage >= 70 ? (
                                <div className="animate-bounce">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-2">
                                        🎉 YEPPPIIIII! 🎉
                                    </h2>
                                    <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
                                        Félicitations ! Tu es prêt(e) pour l'examen final Cisco !
                                    </p>

                                </div>
                            ) : (
                                <div>


                                    <p className="text-xl font-semibold text-purple-600 dark:text-purple-400 animate-pulse">
                                        Heekkkka Tawww 😭,
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Avant l'examen final, révise encore !
                                    </p>
                                </div>
                            )}

                            <p className="text-gray-600 dark:text-gray-400 mt-4">
                                Vous avez obtenu {score} sur {totalAnswered} questions répondues
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{score}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Correctes</div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectAnswers.length}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Incorrectes</div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalAnswered}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Répondues</div>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{formatTime(elapsedTime)}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">Temps</div>
                            </div>
                        </div>

                        {/* Unanswered questions warning */}
                        {unanswered > 0 && (
                            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    ⚠️ {unanswered} questions non répondues (non comptées dans le score)
                                </p>
                            </div>
                        )}

                        {/* Save Status Indicator */}
                        {isAuthenticated && (
                            <div className={`rounded-xl p-4 mb-6 ${isSaving ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' :
                                saveError ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                                    savedAttemptId ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' :
                                        'bg-gray-50 dark:bg-slate-700/50'
                                }`}>
                                <div className="flex items-center gap-3">
                                    {isSaving && (
                                        <>
                                            <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">
                                                Sauvegarde de votre tentative...
                                            </p>
                                        </>
                                    )}
                                    {!isSaving && saveError && (
                                        <>
                                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                                                Erreur: {saveError}
                                            </p>
                                        </>
                                    )}
                                    {!isSaving && savedAttemptId && (
                                        <>
                                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <p className="text-green-700 dark:text-green-400 text-sm font-medium">
                                                ✓ Tentative sauvegardée avec succès !
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={restartQuiz}
                                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Réessayer</span>
                            </button>
                            {savedAttemptId && (
                                <button
                                    onClick={() => navigate('/quiz-history')}
                                    className="flex-1 py-4 px-6 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <span>Voir Historique</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Incorrect Answers Review */}
                    {incorrectAnswers.length > 0 && (
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Révision des réponses incorrectes ({incorrectAnswers.length})
                            </h3>
                            <div className="space-y-6">
                                {incorrectAnswers.map((answer, idx) => {
                                    const q = questions.find(q => q.id === answer.questionId);
                                    if (!q) return null;
                                    return (
                                        <div key={idx} className="border-b border-gray-200 dark:border-slate-700 pb-6 last:border-0">
                                            <p className="font-medium text-gray-900 dark:text-white mb-3">{q.question}</p>
                                            {q.imageUrl && (
                                                <img
                                                    src={q.imageUrl}
                                                    alt="Diagramme de la question"
                                                    className="max-w-full h-auto rounded-lg mb-3 border border-gray-200 dark:border-slate-600"
                                                    style={{ maxHeight: '200px' }}
                                                />
                                            )}
                                            <div className="space-y-2 text-sm">
                                                <p className="text-red-600 dark:text-red-400">
                                                    Votre réponse : {answer.selected.map(i => q.options[i]).join(', ') || '(aucune réponse)'}
                                                </p>
                                                <p className="text-green-600 dark:text-green-400">
                                                    Bonne réponse : {q.correctAnswers.map(i => q.options[i]).join(', ')}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400 mt-2 italic">
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
