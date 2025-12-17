import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, ChevronLeft, ChevronRight, Award, BookOpen, Cloud, Monitor, X, Play, CheckCircle, Timer, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

interface CertificateModule {
    id: string;
    name: string;
    description: string;
    fullDescription?: string;
    isAvailable: boolean;
    route?: string;
    questionsCount?: number;
    duration?: string;
    imageUrl?: string;
}

interface CertificateCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    isComingSoon?: boolean;
    modules?: CertificateModule[];
    onClick?: () => void;
    onModuleSelect?: (modules: CertificateModule[]) => void;
}

// Fullscreen Module Carousel Component
interface ModuleCarouselProps {
    modules: CertificateModule[];
    onClose: () => void;
    onStartQuiz: (questionCount: number, timeLimit: number | null, moduleId: string) => void;
    isVisible: boolean;
}

const ModuleCarousel: React.FC<ModuleCarouselProps> = ({ modules, onClose, onStartQuiz, isVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(30);
    const [selectedTimeLimit, setSelectedTimeLimit] = useState<number | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
    const [isStarting, setIsStarting] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);

    // Trigger enter animation
    useEffect(() => {
        if (isVisible) {
            setTimeout(() => setIsAnimatingIn(true), 50);
        } else {
            setIsAnimatingIn(false);
        }
    }, [isVisible]);

    const currentModule = modules[currentIndex];

    const goToPrevious = () => {
        if (isNavigating) return;
        setIsNavigating(true);
        setSlideDirection('left');
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? modules.length - 1 : prev - 1));
            setTimeout(() => {
                setIsNavigating(false);
                setSlideDirection(null);
            }, 50);
        }, 300);
    };

    const goToNext = () => {
        if (isNavigating) return;
        setIsNavigating(true);
        setSlideDirection('right');
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === modules.length - 1 ? 0 : prev + 1));
            setTimeout(() => {
                setIsNavigating(false);
                setSlideDirection(null);
            }, 50);
        }, 300);
    };

    const handleStartQuiz = () => {
        setIsStarting(true);
        setTimeout(() => {
            onStartQuiz(selectedQuestionCount, selectedTimeLimit, currentModule.id);
        }, 500);
    };

    const questionOptions = [30, 60, 160];
    const timeOptions = [
        { value: null, label: 'No Limit' },
        { value: 15, label: '15 min' },
        { value: 30, label: '30 min' },
        { value: 45, label: '45 min' },
        { value: 60, label: '60 min' }
    ];

    return (
        <div
            className={`fixed inset-0 z-[100] bg-slate-900 transition-all duration-500 ease-out ${isAnimatingIn ? 'opacity-100' : 'opacity-0'
                } ${isStarting ? 'scale-105 opacity-0' : ''}`}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all hover:scale-110 border border-white/20"
            >
                <X className="w-5 h-5 text-white" />
            </button>

            {/* Progress Dots */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {modules.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (idx !== currentIndex && !isNavigating) {
                                setIsNavigating(true);
                                setSlideDirection(idx > currentIndex ? 'right' : 'left');
                                setTimeout(() => {
                                    setCurrentIndex(idx);
                                    setTimeout(() => {
                                        setIsNavigating(false);
                                        setSlideDirection(null);
                                    }, 50);
                                }, 300);
                            }
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                            ? 'bg-white scale-125'
                            : 'bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className={`h-full flex flex-col md:flex-row transition-all duration-700 ease-out ${isAnimatingIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                {/* Left Side - Background Image */}
                <div className="relative w-full md:w-[45%] h-1/3 md:h-full overflow-hidden">
                    {/* Image with transition */}
                    <div className={`absolute inset-0 transition-all duration-500 ease-out ${slideDirection === 'right' ? '-translate-x-full opacity-0' :
                        slideDirection === 'left' ? 'translate-x-full opacity-0' :
                            'translate-x-0 opacity-100'
                        }`}>
                        <img
                            key={currentModule.id}
                            src={currentModule.imageUrl || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80"}
                            alt={currentModule.name}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-transparent via-slate-900/20 to-slate-900" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/30" />
                    </div>

                    {/* Floating blur elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 left-20 w-16 h-16 bg-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
                    </div>

                    {/* Module Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <div className="px-2.5 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                Cisco CCNA
                            </div>
                            {currentModule.isAvailable ? (
                                <div className="px-2.5 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Available
                                </div>
                            ) : (
                                <div className="px-2.5 py-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Coming Soon
                                </div>
                            )}
                        </div>
                        <h1 className={`text-2xl md:text-4xl font-bold text-white mb-1 drop-shadow-2xl transition-all duration-500 ${slideDirection ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                            }`}>
                            {currentModule.name}
                        </h1>
                        <p className={`text-xs md:text-sm text-white/70 max-w-sm transition-all duration-500 delay-100 ${slideDirection ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                            }`}>
                            {currentModule.description}
                        </p>
                    </div>

                    {/* Left Arrow - INSIDE image area on left edge */}
                    <button
                        onClick={goToPrevious}
                        disabled={isNavigating}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-black/40 backdrop-blur-xl rounded-full hover:bg-black/60 transition-all hover:scale-110 border border-white/20 group disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                </div>

                {/* Right Side - Content */}
                <div className="relative w-full md:w-[55%] flex-1 md:h-full flex flex-col justify-center items-center px-4 py-4 md:px-6 md:py-8 overflow-y-auto">
                    {/* Right Arrow */}
                    <button
                        onClick={goToNext}
                        disabled={isNavigating}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all hover:scale-110 border border-white/20 group disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Quiz Options Content */}
                    <div className={`space-y-4 md:space-y-5 w-full max-w-lg transition-all duration-500 ${slideDirection ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                        }`} key={currentModule.id}>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                                {currentModule.isAvailable ? 'Ready to Test Your Knowledge?' : 'Coming Soon'}
                            </h2>
                            <p className="text-sm md:text-base text-slate-400">
                                {currentModule.fullDescription || currentModule.description}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-blue-400 mb-1">
                                    <HelpCircle className="w-4 h-4" />
                                    <span className="text-sm font-medium">Questions</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {currentModule.questionsCount || 160}+
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                                <div className="flex items-center gap-2 text-orange-400 mb-1">
                                    <Timer className="w-4 h-4" />
                                    <span className="text-sm font-medium">Duration</span>
                                </div>
                                <p className="text-2xl font-bold text-white">
                                    {selectedTimeLimit ? `${selectedTimeLimit}m` : "No Limit"}
                                </p>
                            </div>
                        </div>

                        {/* Question Count Selection */}
                        {currentModule.isAvailable && (
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">
                                    Number of Questions
                                </label>
                                <div className="flex gap-3">
                                    {questionOptions.map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setSelectedQuestionCount(count)}
                                            className={`flex-1 py-3 rounded-xl font-bold text-base transition-all ${selectedQuestionCount === count
                                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                                                }`}
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Time Limit Selection */}
                        {currentModule.isAvailable && (
                            <div>
                                <label className="text-white text-sm font-medium mb-2 block">
                                    Time Limit
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {timeOptions.map((option) => (
                                        <button
                                            key={option.label}
                                            onClick={() => setSelectedTimeLimit(option.value)}
                                            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${selectedTimeLimit === option.value
                                                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                                                : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2 text-sm">
                                <Sparkles className="w-4 h-4" />
                                Instructions
                            </h4>
                            <ul className="text-slate-400 space-y-1 text-sm">
                                <li>• Questions are presented in random order</li>
                                <li>• Some questions require multiple selections</li>
                                {selectedTimeLimit && (
                                    <li className="text-orange-400">• Timer ends = auto-submit results</li>
                                )}
                            </ul>
                        </div>

                        {/* Start Quiz Button */}
                        {currentModule.isAvailable ? (
                            <button
                                onClick={handleStartQuiz}
                                disabled={isStarting}
                                className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group ${isStarting ? 'scale-95 opacity-75' : ''
                                    }`}
                            >
                                <Play className={`w-6 h-6 transition-transform ${isStarting ? 'scale-150' : 'group-hover:scale-110'}`} />
                                {isStarting ? 'Loading...' : 'Start Quiz'}
                                <ArrowRight className={`w-5 h-5 transition-transform ${isStarting ? 'translate-x-4 opacity-0' : 'group-hover:translate-x-1'}`} />
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full py-4 px-6 bg-slate-700/50 text-slate-500 font-bold text-lg rounded-xl cursor-not-allowed flex items-center justify-center gap-3 border border-slate-600/50"
                            >
                                <Clock className="w-6 h-6" />
                                Coming Soon
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Loading overlay */}
            {isStarting && (
                <div className="absolute inset-0 bg-slate-900/80 z-30 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
};

const CertificateCard: React.FC<CertificateCardProps> = ({
    icon,
    title,
    description,
    gradient,
    isComingSoon,
    modules,
    onClick,
    onModuleSelect
}) => {
    const hasModules = modules && modules.length > 0;
    const isClickable = !isComingSoon && (onClick || hasModules);

    const handleClick = () => {
        if (isComingSoon) return;
        if (hasModules && onModuleSelect) {
            onModuleSelect(modules);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); } : undefined}
            className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg transition-all duration-300 ${isClickable ? 'cursor-pointer hover:shadow-xl hover:scale-[1.02]' : ''
                } ${isComingSoon ? 'opacity-75' : ''}`}
        >
            {/* Coming Soon Badge */}
            {isComingSoon && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                    Coming Soon
                </div>
            )}

            {/* Icon */}
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {icon}
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>

            {/* Modules count */}
            {hasModules && !isComingSoon && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
                        {modules.length} modules available
                    </span>
                    <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function ExamCertificatesPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showCarousel, setShowCarousel] = useState(false);
    const [selectedModules, setSelectedModules] = useState<CertificateModule[]>([]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingQuizUrl, setPendingQuizUrl] = useState<string>('');

    const ccnaModules: CertificateModule[] = [
        {
            id: 'ccna1',
            name: 'CCNA 1',
            description: 'Introduction to Networks - ITN v7.0',
            fullDescription: 'Master the fundamentals of networking with this comprehensive practice exam covering network basics, Ethernet, IP addressing, and the OSI model.',
            isAvailable: true,
            route: '/quiz',
            questionsCount: 160,
            duration: 'No Limit',
            imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80'
        },
        {
            id: 'ccna2',
            name: 'CCNA 2',
            description: 'Switching, Routing & Wireless - SRWE v7.0',
            fullDescription: 'Advance your networking skills with switching, VLANs, inter-VLAN routing, STP, EtherChannel, and wireless LAN concepts.',
            isAvailable: true,
            route: '/quiz',
            questionsCount: 174,
            duration: 'No Limit',
            imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80'
        },
        {
            id: 'ccna3',
            name: 'CCNA 3',
            description: 'Enterprise Networking & Automation - ENSA v7.0',
            fullDescription: 'Complete your CCNA journey with enterprise networking, OSPF, security, WAN concepts, and network automation.',
            isAvailable: false,
            questionsCount: 140,
            duration: 'No Limit',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80'
        }
    ];

    const certificates = [
        {
            icon: <Monitor className="w-8 h-8 text-white" />,
            title: 'Cisco CCNA',
            description: 'Cisco Certified Network Associate - Master networking fundamentals, switching, routing, and more.',
            gradient: 'from-blue-500 to-cyan-600',
            modules: ccnaModules
        },
        {
            icon: <BookOpen className="w-8 h-8 text-white" />,
            title: 'CompTIA A+',
            description: 'The industry standard for establishing a career in IT. Hardware, software, and troubleshooting.',
            gradient: 'from-red-500 to-orange-600',
            isComingSoon: true
        },
        {
            icon: <Cloud className="w-8 h-8 text-white" />,
            title: 'AWS Cloud Practitioner',
            description: 'Foundational understanding of AWS Cloud concepts, services, and terminology.',
            gradient: 'from-orange-400 to-amber-500',
            isComingSoon: true
        }
    ];

    const handleModuleSelect = (modules: CertificateModule[]) => {
        setSelectedModules(modules);
        setShowCarousel(true);
    };

    const handleStartQuiz = (questionCount: number, timeLimit: number | null, moduleId: string) => {
        const params = new URLSearchParams();
        params.set('start', 'true');
        params.set('count', questionCount.toString());
        params.set('module', moduleId);
        if (timeLimit) {
            params.set('time', timeLimit.toString());
        }
        const quizUrl = `/exam-certificates/quiz?${params.toString()}`;

        // Check if user is authenticated
        if (!isAuthenticated) {
            setPendingQuizUrl(quizUrl);
            setShowAuthModal(true);
            setShowCarousel(false);
            return;
        }

        navigate(quizUrl);
    };

    const handleCloseCarousel = () => {
        setShowCarousel(false);
        setTimeout(() => {
            setSelectedModules([]);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3334_1px,transparent_1px),linear-gradient(to_bottom,#3334_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                {/* Header */}
                <div className="text-center space-y-4 mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 rounded-full px-4 py-2 shadow-lg">
                        <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Certification Exams</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                        Exam{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-400">
                            Certificate Tests
                        </span>
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Prepare for your IT certifications with comprehensive practice exams. Choose a certification below to get started.
                    </p>
                </div>

                {/* Certificates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <CertificateCard
                            key={index}
                            icon={cert.icon}
                            title={cert.title}
                            description={cert.description}
                            gradient={cert.gradient}
                            isComingSoon={cert.isComingSoon}
                            modules={cert.modules}
                            onModuleSelect={handleModuleSelect}
                        />
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 animate-fade-in-up">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                            <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">More Certifications Coming Soon</h3>
                            <p className="text-blue-700 dark:text-blue-400 text-sm">
                                We're constantly adding new certification practice exams. Stay tuned for CompTIA Network+, Security+, Azure certifications, and more!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Module Carousel */}
            {showCarousel && selectedModules.length > 0 && (
                <ModuleCarousel
                    modules={selectedModules}
                    onClose={handleCloseCarousel}
                    onStartQuiz={handleStartQuiz}
                    isVisible={showCarousel}
                />
            )}

            {/* Auth Modal - shown when user tries to start quiz without being logged in */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                redirectUrl={pendingQuizUrl}
                title="Sign in to start the quiz"
                description="Create an account or sign in to track your progress and save your quiz results."
            />
        </div>
    );
}
