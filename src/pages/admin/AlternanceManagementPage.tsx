import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Trash2,
    Eye,
    EyeOff,
    Loader2,
    Briefcase,
    Plus,
    Edit3,
    X,
    MapPin,
    Clock,
    Building2,
    Mail,
    Link as LinkIcon,
    ChevronLeft,
    ChevronRight,
    Upload,
    ImageIcon,
    CheckSquare,
    Square
} from 'lucide-react';
import ModalPortal from '@components/ModalPortal';
import {
    Alternance,
    AlternanceFormData,
    AlternanceFilters
} from '../../types/alternance';
import {
    getAlternances,
    createAlternance,
    updateAlternance,
    deleteAlternance,
    toggleAlternanceStatus,
    getAlternanceStats,
    approveAlternance,
    rejectAlternance,
    bulkApproveAlternances,
    bulkRejectAlternances
} from '../../services/alternanceService';

interface DialogState {
    isOpen: boolean;
    mode: 'add' | 'edit';
    alternanceData: AlternanceFormData;
    editId?: string;
}

const emptyAlternance: AlternanceFormData = {
    title: '',
    company: '',
    location: '',
    type: 'apprenticeship',
    duration: '',
    description: '',
    requirements: '',
    contactEmail: '',
    companyLogo: '',
    bannerImage: '',
    externalUrl: '',
    isActive: true,
    isOpen: true,
    category: '',
    sector: '',
};

const AlternanceManagementPage: React.FC = () => {
    const navigate = useNavigate();
    const [alternances, setAlternances] = useState<Alternance[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [approvalFilter, setApprovalFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');

    // Stats
    const [stats, setStats] = useState({
        totalCount: 0,
        activeCount: 0,
        inactiveCount: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
    });

    // Dialog state
    const [dialog, setDialog] = useState<DialogState>({
        isOpen: false,
        mode: 'add',
        alternanceData: { ...emptyAlternance },
    });

    // Delete confirmation
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; title: string }>({
        isOpen: false,
        id: '',
        title: '',
    });

    // Multi-select state
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState<{ isOpen: boolean; count: number }>({
        isOpen: false,
        count: 0,
    });

    // File upload state
    const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
    const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
    const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
    const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);

    // Content images state (multiple images)
    const [contentImageFiles, setContentImageFiles] = useState<File[]>([]);
    const [contentImagePreviews, setContentImagePreviews] = useState<string[]>([]);

    // Fetch alternances
    const fetchAlternances = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: AlternanceFilters = {};
            if (searchTerm) filters.search = searchTerm;
            if (statusFilter !== 'all') filters.isActive = statusFilter === 'active';
            if (approvalFilter !== 'all') filters.status = approvalFilter;
            if (typeFilter !== 'all') filters.type = typeFilter;

            const response = await getAlternances(page, limit, filters);

            if (response.success && response.data) {
                setAlternances(response.data.alternances);
                setTotalPages(response.data.pagination.pages);
                setTotal(response.data.pagination.total);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch alternances');
        } finally {
            setLoading(false);
        }
    };

    // Fetch stats
    const fetchStats = async () => {
        try {
            const response = await getAlternanceStats();
            if (response.success && response.data) {
                setStats(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    useEffect(() => {
        fetchAlternances();
        fetchStats();
    }, [page, statusFilter, approvalFilter, typeFilter]);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (page === 1) {
                fetchAlternances();
            } else {
                setPage(1);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Dialog handlers
    const openAddDialog = () => {
        setDialog({
            isOpen: true,
            mode: 'add',
            alternanceData: { ...emptyAlternance },
        });
        // Reset file states
        setCompanyLogoFile(null);
        setBannerImageFile(null);
        setCompanyLogoPreview(null);
        setBannerImagePreview(null);
        setContentImageFiles([]);
        setContentImagePreviews([]);
    };

    const openEditDialog = (alternance: Alternance) => {
        setDialog({
            isOpen: true,
            mode: 'edit',
            alternanceData: {
                title: alternance.title || '',
                company: alternance.company || '',
                location: alternance.location || '',
                type: alternance.type || 'apprenticeship',
                duration: alternance.duration || '',
                description: alternance.description || '',
                requirements: alternance.requirements || '',
                contactEmail: alternance.contactEmail || '',
                companyLogo: alternance.companyLogo || '',
                bannerImage: alternance.bannerImage || '',
                externalUrl: alternance.externalUrl || '',
                isActive: alternance.isActive ?? true,
                isOpen: alternance.isOpen ?? true,
                category: alternance.category || '',
                sector: alternance.sector || '',
            },
            editId: alternance._id,
        });
        // Reset file states but set URL previews
        setCompanyLogoFile(null);
        setBannerImageFile(null);
        setCompanyLogoPreview(alternance.companyLogo || null);
        setBannerImagePreview(alternance.bannerImage || null);
    };

    const closeDialog = () => {
        setDialog({
            isOpen: false,
            mode: 'add',
            alternanceData: { ...emptyAlternance },
        });
        // Reset file states
        setCompanyLogoFile(null);
        setBannerImageFile(null);
        setCompanyLogoPreview(null);
        setBannerImagePreview(null);
        setContentImageFiles([]);
        setContentImagePreviews([]);
    };

    const handleInputChange = (field: keyof AlternanceFormData, value: any) => {
        setDialog(prev => ({
            ...prev,
            alternanceData: {
                ...prev.alternanceData,
                [field]: value,
            },
        }));
    };

    const handleSave = async () => {
        try {
            setActionLoading('save');

            if (dialog.mode === 'add') {
                await createAlternance(
                    dialog.alternanceData,
                    companyLogoFile || undefined,
                    bannerImageFile || undefined,
                    contentImageFiles.length > 0 ? contentImageFiles : undefined
                );
            } else if (dialog.editId) {
                await updateAlternance(
                    dialog.editId,
                    dialog.alternanceData,
                    companyLogoFile || undefined,
                    bannerImageFile || undefined,
                    contentImageFiles.length > 0 ? contentImageFiles : undefined
                );
            }

            closeDialog();
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to save alternance');
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            setActionLoading(`toggle-${id}`);
            await toggleAlternanceStatus(id);
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to toggle status');
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async () => {
        try {
            setActionLoading('delete');
            await deleteAlternance(deleteConfirm.id);
            setDeleteConfirm({ isOpen: false, id: '', title: '' });
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to delete alternance');
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            setActionLoading(`approve-${id}`);
            await approveAlternance(id);
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to approve alternance');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id: string) => {
        try {
            setActionLoading(`reject-${id}`);
            await rejectAlternance(id);
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to reject alternance');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkApprove = async () => {
        const pendingIds = alternances
            .filter(a => a.status === 'pending' && a._id)
            .map(a => a._id as string);

        if (pendingIds.length === 0) return;

        try {
            setActionLoading('bulk-approve');
            await bulkApproveAlternances(pendingIds);
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to bulk approve alternances');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkReject = async () => {
        const pendingIds = alternances
            .filter(a => a.status === 'pending' && a._id)
            .map(a => a._id as string);

        if (pendingIds.length === 0) return;

        try {
            setActionLoading('bulk-reject');
            await bulkRejectAlternances(pendingIds);
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to bulk reject alternances');
        } finally {
            setActionLoading(null);
        }
    };

    // Selection handlers
    const toggleSelectId = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === alternances.length && alternances.length > 0) {
            setSelectedIds(new Set());
        } else {
            const allIds = new Set(alternances.map(a => a._id).filter(Boolean) as string[]);
            setSelectedIds(allIds);
        }
    };

    const handleBulkApproveSelected = async () => {
        const idsToApprove = Array.from(selectedIds);
        if (idsToApprove.length === 0) return;

        try {
            setActionLoading('bulk-approve-selected');
            await bulkApproveAlternances(idsToApprove);
            setSelectedIds(new Set());
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to approve selected alternances');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkRejectSelected = async () => {
        const idsToReject = Array.from(selectedIds);
        if (idsToReject.length === 0) return;

        try {
            setActionLoading('bulk-reject-selected');
            await bulkRejectAlternances(idsToReject);
            setSelectedIds(new Set());
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to reject selected alternances');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkDeleteSelected = async () => {
        const idsToDelete = Array.from(selectedIds);
        if (idsToDelete.length === 0) return;

        try {
            setActionLoading('bulk-delete');
            for (const id of idsToDelete) {
                await deleteAlternance(id);
            }
            setSelectedIds(new Set());
            setBulkDeleteConfirm({ isOpen: false, count: 0 });
            fetchAlternances();
            fetchStats();
        } catch (err: any) {
            setError(err.message || 'Failed to delete selected alternances');
        } finally {
            setActionLoading(null);
        }
    };

    const getTypeLabel = (type?: string) => {
        switch (type) {
            case 'apprenticeship': return 'Apprenticeship';
            case 'professionalization_contract': return 'Professional Contract';
            case 'other': return 'Other';
            default: return 'Undefined';
        }
    };

    const getTypeColor = (type?: string) => {
        switch (type) {
            case 'apprenticeship': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
            case 'professionalization_contract': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
            default: return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
        }
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
                {/* Header */}
                <div className="mb-8 animate-fade-in-up">
                    <button
                        onClick={() => navigate('/admin/contents')}
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Dashboard
                    </button>

                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex items-start justify-between gap-6 flex-wrap">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                    Manage Internship Offers
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Create, modify and manage internship opportunities
                                </p>
                            </div>
                            <div className="flex gap-6">
                                {stats.pendingCount > 0 && (
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                            {stats.pendingCount}
                                        </div>
                                        <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">⏳ Pending</div>
                                    </div>
                                )}
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {stats.activeCount}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Active</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-slate-500 dark:text-slate-400">
                                        {stats.inactiveCount}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Inactive</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {stats.totalCount}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300">
                        {error}
                        <button onClick={() => setError(null)} className="ml-4 underline">Close</button>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="mb-6 space-y-4 animate-fade-in-up animation-delay-100">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by title, company, location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 backdrop-blur-sm"
                        />
                    </div>

                    {/* Approval Filter Tabs */}
                    <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <button
                            onClick={() => setApprovalFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${approvalFilter === 'all'
                                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setApprovalFilter('pending')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all inline-flex items-center gap-2 ${approvalFilter === 'pending'
                                ? 'bg-amber-500 text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            ⏳ Pending
                            {stats.pendingCount > 0 && (
                                <span className="px-2 py-0.5 text-xs rounded-full bg-white/20">
                                    {stats.pendingCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setApprovalFilter('approved')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${approvalFilter === 'approved'
                                ? 'bg-green-500 text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            ✅ Approved
                        </button>
                        <button
                            onClick={() => setApprovalFilter('rejected')}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${approvalFilter === 'rejected'
                                ? 'bg-red-500 text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            ❌ Rejected
                        </button>
                    </div>

                    {/* Bulk Actions for Pending */}
                    {approvalFilter === 'pending' && alternances.length > 0 && (
                        <div className="flex gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                            <span className="text-amber-700 dark:text-amber-300 font-medium">
                                {alternances.filter(a => a.status === 'pending').length} pending approval
                            </span>
                            <div className="flex-1"></div>
                            <button
                                onClick={handleBulkApprove}
                                disabled={actionLoading === 'bulk-approve'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
                            >
                                {actionLoading === 'bulk-approve' && <Loader2 className="w-4 h-4 animate-spin" />}
                                ✅ Approve All
                            </button>
                            <button
                                onClick={handleBulkReject}
                                disabled={actionLoading === 'bulk-reject'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors"
                            >
                                {actionLoading === 'bulk-reject' && <Loader2 className="w-4 h-4 animate-spin" />}
                                ❌ Reject All
                            </button>
                        </div>
                    )}

                    {/* Bulk Actions for Selected Items */}
                    {selectedIds.size > 0 && (
                        <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl items-center">
                            <span className="text-blue-700 dark:text-blue-300 font-medium">
                                {selectedIds.size} item(s) selected
                            </span>
                            <div className="flex-1"></div>
                            <button
                                onClick={handleBulkApproveSelected}
                                disabled={actionLoading === 'bulk-approve-selected'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors"
                            >
                                {actionLoading === 'bulk-approve-selected' && <Loader2 className="w-4 h-4 animate-spin" />}
                                ✅ Approve
                            </button>
                            <button
                                onClick={handleBulkRejectSelected}
                                disabled={actionLoading === 'bulk-reject-selected'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white rounded-lg font-medium transition-colors"
                            >
                                {actionLoading === 'bulk-reject-selected' && <Loader2 className="w-4 h-4 animate-spin" />}
                                ⚠️ Reject
                            </button>
                            <button
                                onClick={() => setBulkDeleteConfirm({ isOpen: true, count: selectedIds.size })}
                                disabled={actionLoading === 'bulk-delete'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors"
                            >
                                {actionLoading === 'bulk-delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    )}

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setStatusFilter('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'all'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setStatusFilter('active')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'active'
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setStatusFilter('inactive')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${statusFilter === 'inactive'
                                    ? 'bg-slate-500 text-white shadow-lg'
                                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                    }`}
                            >
                                Inactive
                            </button>
                        </div>

                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">All Types</option>
                            <option value="apprenticeship">Apprenticeship</option>
                            <option value="professionalization_contract">Professional Contract</option>
                            <option value="other">Other</option>
                        </select>

                        <div className="flex-1"></div>

                        <button
                            onClick={openAddDialog}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg"
                        >
                            <Plus className="w-4 h-4" />
                            Add Internship
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
                    {loading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
                        </div>
                    ) : alternances.length === 0 ? (
                        <div className="p-12 text-center">
                            <Briefcase className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400">
                                No internship offers found
                            </p>
                            <button
                                onClick={openAddDialog}
                                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Create First Internship
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                                        <tr>
                                            <th className="px-4 py-4 text-left">
                                                <button
                                                    onClick={toggleSelectAll}
                                                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                    title={selectedIds.size === alternances.length && alternances.length > 0 ? 'Deselect all' : 'Select all'}
                                                >
                                                    {selectedIds.size === alternances.length && alternances.length > 0 ? (
                                                        <CheckSquare className="w-5 h-5 text-blue-500" />
                                                    ) : (
                                                        <Square className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Title
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Company
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Type
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Location
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {alternances.map((alternance) => (
                                            <tr
                                                key={alternance._id}
                                                className={`border-b border-slate-200/50 dark:border-slate-700/50 transition-colors ${selectedIds.has(alternance._id || '') ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/30'}`}
                                            >
                                                <td className="px-4 py-4">
                                                    <button
                                                        onClick={() => alternance._id && toggleSelectId(alternance._id)}
                                                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                    >
                                                        {selectedIds.has(alternance._id || '') ? (
                                                            <CheckSquare className="w-5 h-5 text-blue-500" />
                                                        ) : (
                                                            <Square className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                                                            <Briefcase className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                                                {alternance.title || 'No title'}
                                                            </div>
                                                            {alternance.duration && (
                                                                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {alternance.duration}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white">
                                                        <Building2 className="w-4 h-4 text-slate-400" />
                                                        {alternance.company || 'Not specified'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(alternance.type)}`}>
                                                        {getTypeLabel(alternance.type)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                        <MapPin className="w-4 h-4" />
                                                        {alternance.location || 'Not specified'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        {/* Approval status badge */}
                                                        {alternance.status === 'pending' && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                                                ⏳ Pending
                                                            </span>
                                                        )}
                                                        {alternance.status === 'rejected' && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                                                                ❌ Rejected
                                                            </span>
                                                        )}
                                                        {(alternance.status === 'approved' || !alternance.status) && (
                                                            <button
                                                                onClick={() => alternance._id && handleToggleStatus(alternance._id)}
                                                                disabled={actionLoading === `toggle-${alternance._id}`}
                                                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${alternance.isActive
                                                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                                                    }`}
                                                            >
                                                                {actionLoading === `toggle-${alternance._id}` ? (
                                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                                ) : alternance.isActive ? (
                                                                    <Eye className="w-3 h-3" />
                                                                ) : (
                                                                    <EyeOff className="w-3 h-3" />
                                                                )}
                                                                {alternance.isActive ? 'Active' : 'Inactive'}
                                                            </button>
                                                        )}

                                                        {/* Open Status Badge */}
                                                        {alternance.isOpen === false && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                                                                🔒 Not yet open
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {/* Approve/Reject buttons for pending items */}
                                                        {alternance.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => alternance._id && handleApprove(alternance._id)}
                                                                    disabled={actionLoading === `approve-${alternance._id}`}
                                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white rounded-lg text-sm font-medium transition-colors"
                                                                    title="Approve"
                                                                >
                                                                    {actionLoading === `approve-${alternance._id}` ? (
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                    ) : (
                                                                        '✅'
                                                                    )}
                                                                </button>
                                                                <button
                                                                    onClick={() => alternance._id && handleReject(alternance._id)}
                                                                    disabled={actionLoading === `reject-${alternance._id}`}
                                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg text-sm font-medium transition-colors"
                                                                    title="Reject"
                                                                >
                                                                    {actionLoading === `reject-${alternance._id}` ? (
                                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                                    ) : (
                                                                        '❌'
                                                                    )}
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => openEditDialog(alternance)}
                                                            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => alternance._id && setDeleteConfirm({ isOpen: true, id: alternance._id, title: alternance.title || 'This internship' })}
                                                            className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                <div className="text-sm text-slate-600 dark:text-slate-400">
                                    Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Add/Edit Dialog */}
            {dialog.isOpen && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex items-center justify-between">
                                <h2 className="text-2xl font-bold">
                                    {dialog.mode === 'add' ? 'New Internship' : 'Edit Internship'}
                                </h2>
                                <button
                                    onClick={closeDialog}
                                    className="text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Form Content */}
                            <div className="p-6 space-y-6">
                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        value={dialog.alternanceData.title || ''}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        placeholder="Ex: Full Stack Developer"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Company & Location */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <Building2 className="w-4 h-4 inline mr-1" />
                                            Company
                                        </label>
                                        <input
                                            type="text"
                                            value={dialog.alternanceData.company || ''}
                                            onChange={(e) => handleInputChange('company', e.target.value)}
                                            placeholder="Company name"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <MapPin className="w-4 h-4 inline mr-1" />
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={dialog.alternanceData.location || ''}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            placeholder="Paris, Remote..."
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Type & Duration */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            Contract Type
                                        </label>
                                        <select
                                            value={dialog.alternanceData.type || 'apprenticeship'}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors"
                                        >
                                            <option value="apprenticeship">Apprenticeship</option>
                                            <option value="professionalization_contract">Professional Contract</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <Clock className="w-4 h-4 inline mr-1" />
                                            Duration
                                        </label>
                                        <input
                                            type="text"
                                            value={dialog.alternanceData.duration || ''}
                                            onChange={(e) => handleInputChange('duration', e.target.value)}
                                            placeholder="12 months, 24 months..."
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                        Description
                                    </label>
                                    <textarea
                                        value={dialog.alternanceData.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Job description, responsibilities..."
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                {/* Requirements */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                        Requirements
                                    </label>
                                    <textarea
                                        value={dialog.alternanceData.requirements || ''}
                                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                                        placeholder="Required skills, education..."
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                    />
                                </div>

                                {/* Contact & Links */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <Mail className="w-4 h-4 inline mr-1" />
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            value={dialog.alternanceData.contactEmail || ''}
                                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                                            placeholder="recruitment@company.com"
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <LinkIcon className="w-4 h-4 inline mr-1" />
                                            External Link
                                        </label>
                                        <input
                                            type="url"
                                            value={dialog.alternanceData.externalUrl || ''}
                                            onChange={(e) => handleInputChange('externalUrl', e.target.value)}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Image Uploads */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Company Logo Upload */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <ImageIcon className="w-4 h-4 inline mr-1" />
                                            Company Logo
                                        </label>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                            {companyLogoPreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={companyLogoPreview}
                                                        alt="Company logo preview"
                                                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setCompanyLogoFile(null);
                                                            setCompanyLogoPreview(null);
                                                        }}
                                                        className="absolute top-1 right-1/2 translate-x-12 -translate-y-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer">
                                                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Click to upload
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setCompanyLogoFile(file);
                                                                setCompanyLogoPreview(URL.createObjectURL(file));
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    {/* Banner Image Upload */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            <ImageIcon className="w-4 h-4 inline mr-1" />
                                            Banner Image
                                        </label>
                                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                            {bannerImagePreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={bannerImagePreview}
                                                        alt="Banner preview"
                                                        className="w-full h-24 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setBannerImageFile(null);
                                                            setBannerImagePreview(null);
                                                        }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <label className="cursor-pointer">
                                                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                                        Click to upload
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setBannerImageFile(file);
                                                                setBannerImagePreview(URL.createObjectURL(file));
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Images Upload (Multiple) */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                        <ImageIcon className="w-4 h-4 inline mr-1" />
                                        Content Images (max 10)
                                    </label>
                                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        {/* Preview Grid */}
                                        {contentImagePreviews.length > 0 && (
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
                                                {contentImagePreviews.map((preview, index) => (
                                                    <div key={index} className="relative aspect-square">
                                                        <img
                                                            src={preview}
                                                            alt={`Content image ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newFiles = [...contentImageFiles];
                                                                const newPreviews = [...contentImagePreviews];
                                                                newFiles.splice(index, 1);
                                                                newPreviews.splice(index, 1);
                                                                setContentImageFiles(newFiles);
                                                                setContentImagePreviews(newPreviews);
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Upload Button */}
                                        {contentImageFiles.length < 10 && (
                                            <label className="cursor-pointer flex flex-col items-center justify-center py-4">
                                                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                                    Click to add images
                                                </span>
                                                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                    {contentImageFiles.length}/10 images
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        const maxToAdd = 10 - contentImageFiles.length;
                                                        const filesToAdd = files.slice(0, maxToAdd);

                                                        if (filesToAdd.length > 0) {
                                                            setContentImageFiles(prev => [...prev, ...filesToAdd]);
                                                            const newPreviews = filesToAdd.map(f => URL.createObjectURL(f));
                                                            setContentImagePreviews(prev => [...prev, ...newPreviews]);
                                                        }

                                                        // Reset input value to allow selecting same files again
                                                        e.target.value = '';
                                                    }}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Category & Sector */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            value={dialog.alternanceData.category || ''}
                                            onChange={(e) => handleInputChange('category', e.target.value)}
                                            placeholder="IT, Marketing, HR..."
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                                            Sector
                                        </label>
                                        <input
                                            type="text"
                                            value={dialog.alternanceData.sector || ''}
                                            onChange={(e) => handleInputChange('sector', e.target.value)}
                                            placeholder="Tech, Finance, Health..."
                                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Active Toggle */}
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {dialog.alternanceData.isActive ? (
                                                <Eye className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <EyeOff className="w-5 h-5 text-slate-400" />
                                            )}
                                            <div>
                                                <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                                                    Active Internship
                                                </span>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    Visible in public listing
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={dialog.alternanceData.isActive ?? true}
                                            onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                            className="w-5 h-5 text-blue-500 rounded"
                                        />
                                    </label>
                                </div>

                                {/* Open Toggle */}
                                <div className="space-y-2">
                                    <label className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg cursor-pointer border-2 border-amber-200 dark:border-amber-800 hover:border-amber-400 dark:hover:border-amber-600 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">
                                                {dialog.alternanceData.isOpen ? '🔓' : '🔒'}
                                            </span>
                                            <div>
                                                <span className="text-sm font-semibold text-slate-900 dark:text-white block">
                                                    Internship Open for Applications
                                                </span>
                                                <span className="text-xs text-amber-700 dark:text-amber-300">
                                                    {dialog.alternanceData.isOpen
                                                        ? "This internship currently accepts applications"
                                                        : "'Not yet open' badge displayed to users"}
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={dialog.alternanceData.isOpen ?? true}
                                            onChange={(e) => handleInputChange('isOpen', e.target.checked)}
                                            className="w-5 h-5 text-amber-500 rounded"
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end gap-3">
                                <button
                                    onClick={closeDialog}
                                    className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={actionLoading === 'save'}
                                    className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium transition-colors inline-flex items-center gap-2"
                                >
                                    {actionLoading === 'save' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {dialog.mode === 'add' ? 'Create' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteConfirm.isOpen && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                                    Delete Internship?
                                </h3>
                                <p className="text-center text-slate-600 dark:text-slate-400">
                                    Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteConfirm({ isOpen: false, id: '', title: '' })}
                                    className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={actionLoading === 'delete'}
                                    className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-medium transition-colors inline-flex items-center gap-2"
                                >
                                    {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}

            {/* Bulk Delete Confirmation Dialog */}
            {bulkDeleteConfirm.isOpen && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="p-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
                                    <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-center text-slate-900 dark:text-white mb-2">
                                    Delete {bulkDeleteConfirm.count} Internship(s)?
                                </h3>
                                <p className="text-center text-slate-600 dark:text-slate-400">
                                    Are you sure you want to delete {bulkDeleteConfirm.count} selected internship(s)? This action cannot be undone.
                                </p>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end gap-3">
                                <button
                                    onClick={() => setBulkDeleteConfirm({ isOpen: false, count: 0 })}
                                    className="px-6 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBulkDeleteSelected}
                                    disabled={actionLoading === 'bulk-delete'}
                                    className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white font-medium transition-colors inline-flex items-center gap-2"
                                >
                                    {actionLoading === 'bulk-delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}
        </div>
    );
};

export default AlternanceManagementPage;
