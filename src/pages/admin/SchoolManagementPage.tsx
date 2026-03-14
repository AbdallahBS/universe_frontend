import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, Trash2, Eye, EyeOff, Loader2,
    GraduationCap, Plus, Edit3, X, MapPin,
    ChevronLeft, ChevronRight, CheckSquare, Square,
} from 'lucide-react';
import ModalPortal from '@components/ModalPortal';
import { School, DetailedSpecialty, ScoreEntry } from '../../types/school';
import {
    getSchools, createSchool, updateSchool, deleteSchool, toggleSchoolStatus
} from '../../services/schoolService';

// ─── Types ───────────────────────────────────────────────────────────────────

type SchoolFormData = Omit<School, '_id' | 'createdAt' | 'updatedAt'>;

const emptySpecialty = (): DetailedSpecialty => ({
    name: '', code: '', license: '', description: '',
    planEtudeUrl: '', duration: '', capacity: 0, lastAcceptableScore: 0,
});

const emptyScoreEntry = (): ScoreEntry => ({
    specialty: '', code: '', lastAcceptableScore: 0, places: 0,
});

const defaultForm = (): SchoolFormData => ({
    schoolId: '', name: '', fullName: '', location: '', type: 'specifique',
    image: '', logo: '', description: '', specialties: [],
    detailedSpecialties: [emptySpecialty()],
    lastYearScores: { year: new Date().getFullYear() - 1, detailedScores: [emptyScoreEntry()] },
    concoursStatus: 'not-launched', concoursWebsite: '', annexeRangUrl: '',
    candidatureGuideUrl: '', website: '', establishedYear: 1990, studentsCount: 0,
    ranking: undefined, address: '', phone: '', email: '',
    coordinates: { lat: 0, lng: 0 }, gallery: [], facilities: [], partnerships: [],
    university: '', isActive: true,
});

// ─── Sub-components ──────────────────────────────────────────────────────────

const inputCls = "w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm";
const labelCls = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1";
const sectionCls = "bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-4";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div>
            <label className={labelCls}>{label}</label>
            {children}
        </div>
    );
}

// ─── Specialty Editor ────────────────────────────────────────────────────────

function SpecialtyEditor({
    specialties, onChange,
}: {
    specialties: DetailedSpecialty[];
    onChange: (s: DetailedSpecialty[]) => void;
}) {
    const update = (i: number, field: keyof DetailedSpecialty, val: any) => {
        const copy = [...specialties];
        copy[i] = { ...copy[i], [field]: val };
        onChange(copy);
    };
    const add = () => onChange([...specialties, emptySpecialty()]);
    const remove = (i: number) => onChange(specialties.filter((_, idx) => idx !== i));

    return (
        <div>
            {specialties.map((sp, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-3 relative bg-white dark:bg-slate-800">
                    <button onClick={() => remove(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                        <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-bold text-emerald-600 mb-3">Specialty #{i + 1}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <FormField label="Name">
                            <input className={inputCls} value={sp.name} onChange={e => update(i, 'name', e.target.value)} placeholder="e.g. Génie logiciel" />
                        </FormField>
                        <FormField label="Code">
                            <input className={inputCls} value={sp.code} onChange={e => update(i, 'code', e.target.value)} placeholder="e.g. GL" />
                        </FormField>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <FormField label="License (comma-separated)">
                            <input className={inputCls}
                                value={Array.isArray(sp.license) ? sp.license.join(',') : sp.license ?? ''}
                                onChange={e => {
                                    const v = e.target.value;
                                    update(i, 'license', v.includes(',') ? v.split(',').map(s => s.trim()) : v);
                                }}
                                placeholder="e.g. GL,IA" />
                        </FormField>
                        <FormField label="Duration">
                            <input className={inputCls} value={sp.duration} onChange={e => update(i, 'duration', e.target.value)} placeholder="e.g. 3 ans" />
                        </FormField>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-2">
                        <FormField label="Capacity (places available)">
                            <input type="number" className={inputCls} value={sp.capacity} onChange={e => update(i, 'capacity', +e.target.value)} />
                        </FormField>
                    </div>
                    <FormField label="Description">
                        <textarea className={inputCls} rows={2} value={sp.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Short description..." />
                    </FormField>
                    <FormField label="Plan d'étude URL">
                        <input className={inputCls} value={sp.planEtudeUrl} onChange={e => update(i, 'planEtudeUrl', e.target.value)} placeholder="https://..." />
                    </FormField>
                </div>
            ))}
            <button onClick={add} className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Specialty
            </button>
        </div>
    );
}

// ─── Score Entries Editor ────────────────────────────────────────────────────

function ScoreEditor({
    year, entries, onYearChange, onEntriesChange,
}: {
    year: number;
    entries: ScoreEntry[];
    onYearChange: (y: number) => void;
    onEntriesChange: (e: ScoreEntry[]) => void;
}) {
    const update = (i: number, field: keyof ScoreEntry, val: any) => {
        const copy = [...entries];
        copy[i] = { ...copy[i], [field]: val };
        onEntriesChange(copy);
    };
    const add = () => onEntriesChange([...entries, emptyScoreEntry()]);
    const remove = (i: number) => onEntriesChange(entries.filter((_, idx) => idx !== i));

    return (
        <div>
            <FormField label="Year">
                <input type="number" className={`${inputCls} mb-3 w-32`} value={year} onChange={e => onYearChange(+e.target.value)} />
            </FormField>
            {entries.map((entry, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-3 relative bg-white dark:bg-slate-800">
                    <button onClick={() => remove(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                        <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs font-bold text-blue-500 mb-3">Score Entry #{i + 1}</p>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <FormField label="Specialty Name">
                            <input className={inputCls} value={entry.specialty} onChange={e => update(i, 'specialty', e.target.value)} placeholder="e.g. Génie logiciel" />
                        </FormField>
                        <FormField label="Code">
                            <input className={inputCls} value={entry.code} onChange={e => update(i, 'code', e.target.value)} placeholder="e.g. GL" />
                        </FormField>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField label="Last Acceptable Score">
                            <input type="number" step="0.01" className={inputCls} value={entry.lastAcceptableScore} onChange={e => update(i, 'lastAcceptableScore', +e.target.value)} />
                        </FormField>
                        <FormField label="Places">
                            <input type="number" className={inputCls} value={entry.places} onChange={e => update(i, 'places', +e.target.value)} />
                        </FormField>
                    </div>
                </div>
            ))}
            <button onClick={add} className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Score Entry
            </button>
        </div>
    );
}

// ─── Tags Input ───────────────────────────────────────────────────────────────

function TagsInput({ label, value, onChange, placeholder }: {
    label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string;
}) {
    const [input, setInput] = useState('');
    const add = () => {
        const trimmed = input.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInput('');
        }
    };
    return (
        <div>
            <label className={labelCls}>{label}</label>
            <div className="flex flex-wrap gap-1 mb-1">
                {value.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs">
                        {tag}
                        <button onClick={() => onChange(value.filter((_, idx) => idx !== i))}><X className="w-3 h-3" /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input className={inputCls} value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
                    placeholder={placeholder ?? 'Type and press Enter'} />
                <button onClick={add} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm"><Plus className="w-4 h-4" /></button>
            </div>
        </div>
    );
}

// ─── Modal tabs ──────────────────────────────────────────────────────────────

type Tab = 'basic' | 'specialties' | 'scores' | 'links';

// ─── Main Page ────────────────────────────────────────────────────────────────

const SchoolManagementPage: React.FC = () => {
    const navigate = useNavigate();

    // Data state
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [page, setPage] = useState(1);
    const limit = 10;
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });

    // Search / filter
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | School['type']>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    // Multi-select
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState<SchoolFormData>(defaultForm());
    const [activeTab, setActiveTab] = useState<Tab>('basic');

    // Confirm delete
    const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string; name: string }>({ open: false, id: '', name: '' });

    // ─── Fetch ────────────────────────────────────────────────────────────────

    const fetchSchools = async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            setError(null);
            const filters: any = {};
            if (searchTerm) filters.search = searchTerm;
            if (typeFilter !== 'all') filters.type = typeFilter;
            // We fetch all schools and handle active filter client-side (backend only filters by isActive:true by default)
            const res = await getSchools(filters);
            if (res.success) {
                let data = res.data;
                // The backend only returns active schools; to also show inactive for admins we may need all
                // For now, filter client-side if needed
                if (statusFilter === 'active') data = data.filter(s => s.isActive);
                if (statusFilter === 'inactive') data = data.filter(s => !s.isActive);
                setSchools(data);
                setStats({
                    total: res.total,
                    active: res.data.filter(s => s.isActive).length,
                    inactive: res.data.filter(s => !s.isActive).length,
                });
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch schools');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSchools(); }, [typeFilter, statusFilter]);

    useEffect(() => {
        const t = setTimeout(() => { setPage(1); fetchSchools(); }, 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    // ─── Form helpers ─────────────────────────────────────────────────────────

    const setField = (field: keyof SchoolFormData, val: any) =>
        setForm(prev => ({ ...prev, [field]: val }));

    const openAdd = () => {
        setForm(defaultForm());
        setModalMode('add');
        setEditId(null);
        setActiveTab('basic');
        setModalOpen(true);
    };

    const openEdit = (school: School) => {
        setForm({
            schoolId: school.schoolId,
            name: school.name,
            fullName: school.fullName,
            location: school.location,
            type: school.type,
            image: school.image ?? '',
            logo: school.logo ?? '',
            description: school.description,
            specialties: school.specialties ?? [],
            detailedSpecialties: school.detailedSpecialties?.length ? school.detailedSpecialties : [emptySpecialty()],
            lastYearScores: {
                year: school.lastYearScores?.year ?? new Date().getFullYear() - 1,
                detailedScores: school.lastYearScores?.detailedScores?.length ? school.lastYearScores.detailedScores : [emptyScoreEntry()],
            },
            concoursStatus: school.concoursStatus,
            concoursWebsite: school.concoursWebsite ?? '',
            annexeRangUrl: school.annexeRangUrl ?? '',
            candidatureGuideUrl: school.candidatureGuideUrl ?? '',
            website: school.website ?? '',
            establishedYear: school.establishedYear ?? 1990,
            studentsCount: school.studentsCount ?? 0,
            ranking: school.ranking,
            address: school.address ?? '',
            phone: school.phone ?? '',
            email: school.email ?? '',
            coordinates: school.coordinates ?? { lat: 0, lng: 0 },
            gallery: school.gallery ?? [],
            facilities: school.facilities ?? [],
            partnerships: school.partnerships ?? [],
            university: school.university ?? '',
            isActive: school.isActive,
        });
        setModalMode('edit');
        setEditId(school._id);
        setActiveTab('basic');
        setModalOpen(true);
    };

    const closeModal = () => { setModalOpen(false); setEditId(null); };

    // ─── CRUD handlers ────────────────────────────────────────────────────────

    const handleSave = async () => {
        try {
            setActionLoading('save');

            // Auto-sync lastAcceptableScore from Scores tab → detailedSpecialties
            // This avoids duplication: admin fills score only once (in Scores tab)
            const syncedSpecialties = (form.detailedSpecialties ?? []).map(spec => {
                const matchingScore = form.lastYearScores?.detailedScores?.find(
                    entry => entry.code === spec.code || entry.specialty === spec.name
                );
                return matchingScore
                    ? { ...spec, lastAcceptableScore: matchingScore.lastAcceptableScore }
                    : spec;
            });

            const payload = { ...form, detailedSpecialties: syncedSpecialties } as Partial<School>;

            if (modalMode === 'add') {
                await createSchool(payload);
            } else if (editId) {
                await updateSchool(editId, payload);
            }
            closeModal();
            fetchSchools();
        } catch (err: any) {
            setError(err.message || 'Failed to save school');
        } finally {
            setActionLoading(null);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            setActionLoading(`toggle-${id}`);
            await toggleSchoolStatus(id);
            fetchSchools(true);
        } catch (err: any) {
            setError(err.message || 'Failed to toggle status');
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async () => {
        try {
            setActionLoading('delete');
            await deleteSchool(deleteConfirm.id);
            setDeleteConfirm({ open: false, id: '', name: '' });
            fetchSchools();
        } catch (err: any) {
            setError(err.message || 'Failed to delete school');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBulkDelete = async () => {
        try {
            setActionLoading('bulk-delete');
            for (const id of selectedIds) await deleteSchool(id);
            setSelectedIds(new Set());
            fetchSchools();
        } catch (err: any) {
            setError(err.message || 'Failed to bulk delete');
        } finally {
            setActionLoading(null);
        }
    };

    // Pagination helpers
    const totalPages = Math.max(1, Math.ceil(schools.length / limit));
    const displayed = schools.slice((page - 1) * limit, page * limit);

    // Selection helpers
    const toggleSelect = (id: string) => {
        const s = new Set(selectedIds);
        s.has(id) ? s.delete(id) : s.add(id);
        setSelectedIds(s);
    };
    const toggleAll = () =>
        setSelectedIds(selectedIds.size === displayed.length && displayed.length > 0
            ? new Set()
            : new Set(displayed.map(sc => sc._id).filter(Boolean) as string[]));

    // ─── JSX ──────────────────────────────────────────────────────────────────

    const tabs: { key: Tab; label: string }[] = [
        { key: 'basic', label: '📋 Basic Info' },
        { key: 'specialties', label: '🎓 Specialties' },
        { key: 'scores', label: '📊 Scores' },
        { key: 'links', label: '🔗 Links & Extras' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-10 w-32 h-32 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-xl animate-float" />
                <div className="absolute bottom-32 right-20 w-40 h-40 bg-teal-200/15 dark:bg-teal-500/10 rounded-full blur-xl animate-float animation-delay-500" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

                {/* Back */}
                <button onClick={() => navigate('/admin/contents')}
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Content Management
                </button>

                {/* Header */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-8">
                    <div className="flex items-start justify-between gap-6 flex-wrap">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                🏫 School Management
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Manage Cycle Ingénieur schools — add, edit, activate or deactivate schools
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <div className="text-right">
                                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.active}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Active</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-slate-400">{stats.inactive}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Inactive</div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Total</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 flex justify-between items-center">
                        <span>{error}</span>
                        <button onClick={() => setError(null)}><X className="w-5 h-5" /></button>
                    </div>
                )}

                {/* Filters row */}
                <div className="mb-6 space-y-4">
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="relative flex-1 min-w-48">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search schools..."
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 text-sm" />
                        </div>
                        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)}
                            className="px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 focus:outline-none text-sm">
                            <option value="all">All Types</option>
                            <option value="specifique">Spécifique</option>
                            <option value="independant">Indépendant</option>
                            <option value="ressource-pedagogique">Ressource Pédagogique</option>
                        </select>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
                            className="px-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 focus:outline-none text-sm">
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <div className="flex-1" />
                        <button onClick={openAdd}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-lg text-sm">
                            <Plus className="w-4 h-4" /> Add School
                        </button>
                    </div>

                    {/* Bulk bar */}
                    {selectedIds.size > 0 && (
                        <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl items-center">
                            <span className="text-blue-700 dark:text-blue-300 font-medium text-sm">{selectedIds.size} selected</span>
                            <div className="flex-1" />
                            <button onClick={() => setDeleteConfirm({ open: true, id: '__bulk__', name: `${selectedIds.size} schools` })}
                                disabled={actionLoading === 'bulk-delete'}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium">
                                {actionLoading === 'bulk-delete' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete Selected
                            </button>
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-500" />
                            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading schools...</p>
                        </div>
                    ) : schools.length === 0 ? (
                        <div className="p-12 text-center">
                            <GraduationCap className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                            <p className="text-slate-600 dark:text-slate-400">No schools found</p>
                            <button onClick={openAdd} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium">
                                <Plus className="w-4 h-4" /> Add First School
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                                        <tr>
                                            <th className="px-4 py-4 text-left">
                                                <button onClick={toggleAll}>
                                                    {selectedIds.size === displayed.length && displayed.length > 0
                                                        ? <CheckSquare className="w-5 h-5 text-emerald-500" />
                                                        : <Square className="w-5 h-5 text-slate-400" />}
                                                </button>
                                            </th>
                                            {['School', 'Type', 'Location', 'Specialties', 'Concours', 'Status', 'Actions'].map(h => (
                                                <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayed.map(school => (
                                            <tr key={school._id}
                                                className={`border-b border-slate-200/50 dark:border-slate-700/50 transition-colors ${selectedIds.has(school._id) ? 'bg-emerald-50 dark:bg-emerald-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/30'}`}>
                                                <td className="px-4 py-4">
                                                    <button onClick={() => toggleSelect(school._id)}>
                                                        {selectedIds.has(school._id)
                                                            ? <CheckSquare className="w-5 h-5 text-emerald-500" />
                                                            : <Square className="w-5 h-5 text-slate-400" />}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {school.logo || school.image ? (
                                                            <img src={school.logo || school.image} alt={school.name}
                                                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-100" />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white flex-shrink-0">
                                                                <GraduationCap className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-semibold text-slate-900 dark:text-white">{school.name}</div>
                                                            <div className="text-xs text-slate-500 dark:text-slate-400">{school.schoolId}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${school.type === 'specifique' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : school.type === 'independant' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'}`}>
                                                        {school.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                                                        <MapPin className="w-3 h-3" /> {school.location}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-slate-700 dark:text-slate-300">{school.detailedSpecialties?.length ?? 0} specialties</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${school.concoursStatus === 'launched' ? 'bg-green-100 dark:bg-green-900/30 text-green-700' : school.concoursStatus === 'results-published' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700' : school.concoursStatus === 'closed' ? 'bg-red-100 dark:bg-red-900/30 text-red-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                                        {school.concoursStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${school.isActive ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                                                        {school.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => openEdit(school)} title="Edit"
                                                            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => handleToggle(school._id)} title={school.isActive ? 'Deactivate' : 'Activate'}
                                                            disabled={actionLoading === `toggle-${school._id}`}
                                                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                            {actionLoading === `toggle-${school._id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : school.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                        <button onClick={() => setDeleteConfirm({ open: true, id: school._id, name: school.name })}
                                                            title="Delete"
                                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Page {page} of {totalPages} ({schools.length} total)
                                    </p>
                                    <div className="flex gap-2">
                                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                            className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40">
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                            className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* ─── Add/Edit Modal ─────────────────────────────────────────────── */}
            {modalOpen && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">

                            {/* Modal header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {modalMode === 'add' ? '➕ Add New School' : `✏️ Edit — ${form.name}`}
                                </h2>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-slate-200 dark:border-slate-700 flex-shrink-0 overflow-x-auto">
                                {tabs.map(t => (
                                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                                        className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === t.key ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
                                        {t.label}
                                    </button>
                                ))}
                            </div>

                            {/* Modal body */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">

                                {/* ── Tab: Basic Info ── */}
                                {activeTab === 'basic' && (
                                    <>
                                        <div className={sectionCls}>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Identity</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <FormField label="School ID (slug) *">
                                                    <input className={inputCls} value={form.schoolId} onChange={e => setField('schoolId', e.target.value.toUpperCase())} placeholder="e.g. ENIT" />
                                                </FormField>
                                                <FormField label="Short Name *">
                                                    <input className={inputCls} value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. ENIT" />
                                                </FormField>
                                            </div>
                                            <div className="mt-3">
                                                <FormField label="Full Name *">
                                                    <input className={inputCls} value={form.fullName} onChange={e => setField('fullName', e.target.value)} placeholder="École Nationale d'Ingénieurs de Tunis" />
                                                </FormField>
                                            </div>
                                            <div className="mt-3">
                                                <FormField label="University Affiliation">
                                                    <input className={inputCls} value={form.university} onChange={e => setField('university', e.target.value)} placeholder="Université de Tunis El Manar" />
                                                </FormField>
                                            </div>
                                        </div>

                                        <div className={sectionCls}>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Details</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <FormField label="Type *">
                                                    <select className={inputCls} value={form.type} onChange={e => setField('type', e.target.value)}>
                                                        <option value="specifique">Spécifique</option>
                                                        <option value="independant">Indépendant</option>
                                                        <option value="ressource-pedagogique">Ressource Pédagogique</option>
                                                    </select>
                                                </FormField>
                                                <FormField label="Concours Status">
                                                    <select className={inputCls} value={form.concoursStatus} onChange={e => setField('concoursStatus', e.target.value)}>
                                                        <option value="not-launched">Not Launched</option>
                                                        <option value="launched">Launched</option>
                                                        <option value="closed">Closed</option>
                                                        <option value="results-published">Results Published</option>
                                                    </select>
                                                </FormField>
                                                <FormField label="Established Year">
                                                    <input type="number" className={inputCls} value={form.establishedYear} onChange={e => setField('establishedYear', +e.target.value)} />
                                                </FormField>
                                                <FormField label="Students Count">
                                                    <input type="number" className={inputCls} value={form.studentsCount} onChange={e => setField('studentsCount', +e.target.value)} />
                                                </FormField>
                                                <FormField label="Ranking (optional)">
                                                    <input type="number" className={inputCls} value={form.ranking ?? ''} onChange={e => setField('ranking', e.target.value ? +e.target.value : undefined)} placeholder="e.g. 1" />
                                                </FormField>
                                                <FormField label="Active">
                                                    <select className={inputCls} value={form.isActive ? 'true' : 'false'} onChange={e => setField('isActive', e.target.value === 'true')}>
                                                        <option value="true">Active</option>
                                                        <option value="false">Inactive</option>
                                                    </select>
                                                </FormField>
                                            </div>
                                        </div>

                                        <div className={sectionCls}>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Location & Contact</p>
                                            <div className="grid grid-cols-2 gap-3">
                                                <FormField label="Location *">
                                                    <input className={inputCls} value={form.location} onChange={e => setField('location', e.target.value)} placeholder="e.g. Tunis" />
                                                </FormField>
                                                <FormField label="Address">
                                                    <input className={inputCls} value={form.address} onChange={e => setField('address', e.target.value)} placeholder="Full address" />
                                                </FormField>
                                                <FormField label="Phone">
                                                    <input className={inputCls} value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+216 XX XXX XXX" />
                                                </FormField>
                                                <FormField label="Email">
                                                    <input type="email" className={inputCls} value={form.email} onChange={e => setField('email', e.target.value)} placeholder="contact@school.tn" />
                                                </FormField>
                                                <FormField label="Latitude">
                                                    <input type="number" step="any" className={inputCls} value={form.coordinates?.lat ?? 0} onChange={e => setField('coordinates', { ...form.coordinates, lat: +e.target.value })} />
                                                </FormField>
                                                <FormField label="Longitude">
                                                    <input type="number" step="any" className={inputCls} value={form.coordinates?.lng ?? 0} onChange={e => setField('coordinates', { ...form.coordinates, lng: +e.target.value })} />
                                                </FormField>
                                            </div>
                                        </div>

                                        <div className={sectionCls}>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Description & Media</p>
                                            <FormField label="Description">
                                                <textarea className={inputCls} rows={3} value={form.description} onChange={e => setField('description', e.target.value)} placeholder="Short description of the school..." />
                                            </FormField>
                                            <div className="grid grid-cols-2 gap-3 mt-3">
                                                <FormField label="Image URL">
                                                    <input className={inputCls} value={form.image} onChange={e => setField('image', e.target.value)} placeholder="https://" />
                                                </FormField>
                                                <FormField label="Logo URL">
                                                    <input className={inputCls} value={form.logo ?? ''} onChange={e => setField('logo', e.target.value)} placeholder="https://" />
                                                </FormField>
                                            </div>
                                        </div>

                                        <div className={sectionCls}>
                                            <p className="text-xs font-bold text-slate-500 uppercase mb-3">Tags</p>
                                            <div className="space-y-3">
                                                <TagsInput label="Specialties (short names)" value={form.specialties ?? []} onChange={v => setField('specialties', v)} placeholder="e.g. Génie logiciel" />
                                                <TagsInput label="Facilities" value={form.facilities ?? []} onChange={v => setField('facilities', v)} placeholder="e.g. Bibliothèque" />
                                                <TagsInput label="Partnerships" value={form.partnerships ?? []} onChange={v => setField('partnerships', v)} placeholder="e.g. Microsoft" />
                                                <TagsInput label="Gallery URLs" value={form.gallery ?? []} onChange={v => setField('gallery', v)} placeholder="https://..." />
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* ── Tab: Specialties ── */}
                                {activeTab === 'specialties' && (
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            Add all detailed specialties offered by this school. Fill in name, code, license, capacity and study plan for each specialty.
                                            <span className="ml-1 text-amber-600 dark:text-amber-400 font-medium">💡 Admission scores are managed in the "Scores" tab — no need to enter them here.</span>
                                        </p>
                                        <SpecialtyEditor
                                            specialties={form.detailedSpecialties ?? []}
                                            onChange={v => setField('detailedSpecialties', v)}
                                        />
                                    </div>
                                )}

                                {/* ── Tab: Scores ── */}
                                {activeTab === 'scores' && (
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                                            Enter last year's admission scores for each specialty.
                                        </p>
                                        <ScoreEditor
                                            year={form.lastYearScores?.year ?? new Date().getFullYear() - 1}
                                            entries={form.lastYearScores?.detailedScores ?? []}
                                            onYearChange={y => setField('lastYearScores', { ...form.lastYearScores, year: y })}
                                            onEntriesChange={e => setField('lastYearScores', { ...form.lastYearScores, detailedScores: e })}
                                        />
                                    </div>
                                )}

                                {/* ── Tab: Links & Extras ── */}
                                {activeTab === 'links' && (
                                    <div className={sectionCls}>
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-3">URLs</p>
                                        <div className="space-y-3">
                                            <FormField label="Website">
                                                <input className={inputCls} value={form.website ?? ''} onChange={e => setField('website', e.target.value)} placeholder="https://www.school.tn" />
                                            </FormField>
                                            <FormField label="Concours Website">
                                                <input className={inputCls} value={form.concoursWebsite ?? ''} onChange={e => setField('concoursWebsite', e.target.value)} placeholder="https://concours.school.tn" />
                                            </FormField>
                                            <FormField label="Annexe / Rang URL">
                                                <input className={inputCls} value={form.annexeRangUrl ?? ''} onChange={e => setField('annexeRangUrl', e.target.value)} placeholder="https://..." />
                                            </FormField>
                                            <FormField label="Candidature Guide URL">
                                                <input className={inputCls} value={form.candidatureGuideUrl ?? ''} onChange={e => setField('candidatureGuideUrl', e.target.value)} placeholder="https://..." />
                                            </FormField>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex gap-1">
                                    {tabs.map((t) => (
                                        <button key={t.key} onClick={() => setActiveTab(t.key)}
                                            className={`w-2 h-2 rounded-full transition-colors ${activeTab === t.key ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                                            title={t.label} />
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={closeModal} className="px-5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium">
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} disabled={actionLoading === 'save'}
                                        className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white rounded-lg text-sm font-medium transition-colors shadow-md">
                                        {actionLoading === 'save' && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {modalMode === 'add' ? 'Create School' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalPortal>
            )}

            {/* ─── Delete Confirm Modal ───────────────────────────────────────── */}
            {deleteConfirm.open && (
                <ModalPortal>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-md w-full">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Trash2 className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Delete School?</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm({ open: false, id: '', name: '' })}
                                    className="flex-1 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-medium">
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteConfirm.id === '__bulk__' ? handleBulkDelete : handleDelete}
                                    disabled={actionLoading === 'delete' || actionLoading === 'bulk-delete'}
                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white rounded-lg text-sm font-medium">
                                    {(actionLoading === 'delete' || actionLoading === 'bulk-delete') && <Loader2 className="w-4 h-4 animate-spin" />}
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

export default SchoolManagementPage;
