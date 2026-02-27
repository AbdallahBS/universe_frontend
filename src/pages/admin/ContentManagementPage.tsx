import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    BookOpen,
    FileText,
    Users,
    Settings,
    Briefcase,
    Zap,
    Mail,
    BarChart3,
    Shield,
    ChevronRight
} from 'lucide-react';

interface ContentOption {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
    bgColor: string;
}

const ContentManagementPage: React.FC = () => {
    const navigate = useNavigate();

    // Dynamic content management options
    const contentOptions: ContentOption[] = [
        {
            id: 'Internships',
            title: 'Manage Internships',
            description: 'Create, edit, and manage internship posts',
            icon: <Briefcase className="w-8 h-8" />,
            path: '/admin/contents/internships',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            id: 'Alternances',
            title: 'Manage alternances',
            description: 'Create and manage alternance posts',
            icon: <FileText className="w-8 h-8" />,
            path: '/admin/contents/alternances',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
    ];

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-200/15 dark:bg-teal-500/10 rounded-full blur-xl animate-float animation-delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <div className="mb-8 animate-fade-in-up">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>

                    {/* Header */}
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex items-start justify-between gap-6 flex-wrap">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    Content Management
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Select a module to manage your content and settings
                                </p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                    </div>
                </div>

                {/* Content Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up animation-delay-100">
                    {contentOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => handleNavigate(option.path)}
                            className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                        >
                            {/* Background Gradient */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 dark:opacity-0 dark:group-hover:opacity-20 transition-opacity duration-300`}
                            ></div>

                            {/* Content */}
                            <div className="relative p-6 h-full flex flex-col">
                                {/* Icon */}
                                <div
                                    className={`${option.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <div
                                        className={`text-white bg-gradient-to-br ${option.color} p-2 rounded-lg`}
                                    >
                                        {option.icon}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 text-left">
                                    {option.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow text-left">
                                    {option.description}
                                </p>

                                {/* Arrow Button */}
                                <div className="flex items-center justify-between">
                                    <div className="text-xs font-medium text-slate-500 dark:text-slate-500">
                                        Click to open
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Border Highlight on Hover */}
                            <div
                                className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-br ${option.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                                style={{
                                    borderImage: `linear-gradient(135deg, var(--color-start), var(--color-end))`
                                }}
                            ></div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContentManagementPage;
