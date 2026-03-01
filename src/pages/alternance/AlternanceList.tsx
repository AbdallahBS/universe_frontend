import React, { useState, useEffect, useCallback } from 'react';
import { GraduationCap, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import ScrollButtons from '@components/ui/ScrollButtons';
import AlternanceCard from '../../components/alternance/AlternanceCard';
import AlternanceFilters from '../../components/alternance/AlternanceFilters';
import { Alternance, AlternanceStats, AlternanceFilters as IAlternanceFilters } from '../../types/alternance';
import { getAlternances, getAlternanceStats } from '../../services/alternanceService';
import { useNavigatePage } from '@components/ui/useNavigatePage';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthGuardedListItem from '@components/AuthGuardedListItem';
import { useAuth } from '@context/AuthContext';

const AlternanceList: React.FC = () => {
    const navigate = useNavigatePage();
    const { page: pageParam } = useParams();
    const { t } = useTranslation();
    const { isAuthenticated } = useAuth();

    // Data state
    const [alternances, setAlternances] = useState<Alternance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 12;

    // Filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    // Stats state
    const [stats, setStats] = useState<AlternanceStats>({
        totalCount: 0,
        activeCount: 0,
        apprenticeshipCount: 0,
        professionalContractCount: 0,
        inactiveCount: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
    });

    // Fetch alternances from API
    const fetchAlternances = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: IAlternanceFilters = {
                isActive: true, // Only show active alternances to users
            };

            if (searchQuery) {
                filters.search = searchQuery;
            }

            if (typeFilter !== 'all') {
                filters.type = typeFilter;
            }

            const response = await getAlternances(page, limit, filters);

            if (response.success && response.data) {
                setAlternances(response.data.alternances);
                setTotalPages(response.data.pagination.pages);
                setTotal(response.data.pagination.total);
            }
        } catch (err: any) {
            console.error('Error fetching alternances:', err);
            setError(err.message || t('alternance.loadingOffers'));
        } finally {
            setLoading(false);
        }
    }, [page, searchQuery, typeFilter]);

    // Fetch stats
    const fetchStats = async () => {
        try {
            const response = await getAlternanceStats();
            if (response.success && response.data) {
                setStats(response.data);
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    // Initial load
    useEffect(() => {
        document.title = 'Universe | Alternances';
        fetchStats();
    }, []);

    // Fetch alternances when filters or page changes
    useEffect(() => {
        fetchAlternances();
    }, [fetchAlternances]);

    // Debounced search handler
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reset to first page on search
    };

    // Type filter handler
    const handleTypeChange = (type: string) => {
        setTypeFilter(type);
        setPage(1); // Reset to first page on filter change
    };

    // Pagination handler
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <ScrollButtons />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 pb-16">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-32 left-10 w-64 h-64 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-96 right-20 w-80 h-80 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-green-200/15 dark:bg-green-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 mb-12 animate-fade-in-up">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-900/40 border border-teal-200 dark:border-teal-800 rounded-full text-teal-700 dark:text-teal-300 text-sm font-medium">
                            <Sparkles className="w-4 h-4" />
                            <span>{t('alternance.newOpportunities')}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
                            {t('alternance.title')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 dark:from-teal-400 dark:via-emerald-400 dark:to-green-400">
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            {t('alternance.subtitle')}
                        </p>

                        {/* Stats Cards */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.activeCount}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{t('alternance.availableOffers')}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.apprenticeshipCount}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{t('alternance.apprenticeshipContracts')}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <AlternanceFilters
                            onSearchChange={handleSearchChange}
                            onTypeChange={handleTypeChange}
                            currentSearch={searchQuery}
                            currentType={typeFilter}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-center">
                            {error}
                            <button
                                onClick={() => fetchAlternances()}
                                className="ml-4 underline hover:no-underline"
                            >
                                {t('alternance.retry')}
                            </button>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                            <p className="text-slate-600 dark:text-slate-400">{t('alternance.loadingOffers')}</p>
                        </div>
                    ) : (
                        <>
                            {/* Results count */}
                            <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                                <p className="text-slate-600 dark:text-slate-400">
                                    <span className="font-semibold text-slate-900 dark:text-white">{total}</span>
                                    {' '}{t('alternance.offersFound')}
                                </p>
                            </div>

                            {/* Alternances Grid */}
                            {alternances.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {alternances.map((alternance, index) => (
                                            <AuthGuardedListItem key={alternance._id} redirectUrl={`/alternance/${alternance._id}`}>
                                                <AlternanceCard
                                                    alternance={alternance}
                                                    index={index}
                                                    onClick={() => navigate(`/alternance/${alternance._id}?prevPage=${page}`)}
                                                />
                                            </AuthGuardedListItem>
                                        ))}

                                        {/* Dummy Cards for Unauthenticated Users */}
                                        {!isAuthenticated && [1, 2, 3].map((dummy) => (
                                            <AuthGuardedListItem key={`dummy-${dummy}`} redirectUrl="/alternance" isDummy={true}>
                                                <div className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-auto transform transition-all duration-300">
                                                    {/* Placeholder Image */}
                                                    <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 flex items-center justify-center">
                                                        <GraduationCap className="w-20 h-20 text-slate-400 dark:text-slate-500 opacity-50" />
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="p-6">
                                                        {/* Title Placeholder */}
                                                        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4"></div>

                                                        {/* Type Placeholder */}
                                                        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/2 mb-4"></div>

                                                        {/* Description Placeholder */}
                                                        <div className="space-y-2 mb-4">
                                                            <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full"></div>
                                                            <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-5/6"></div>
                                                            <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-4/6"></div>
                                                        </div>

                                                        {/* Location Placeholder */}
                                                        <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-1/3"></div>
                                                    </div>
                                                </div>
                                            </AuthGuardedListItem>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20 animate-fade-in-up">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <GraduationCap className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        {t('alternance.noOffersFound')}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                                        {t('alternance.tryModifySearch')}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default AlternanceList;
