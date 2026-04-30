import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, Plus, Trash2, ChevronLeft, ChevronRight,
    BookOpen, CheckCircle, List, Shuffle, Loader2, AlertTriangle,
    X, Eye, EyeOff, Image, Save, RefreshCw
} from 'lucide-react';
import {
    getAdminQuestions,
    addAdminQuestion,
    updateAdminQuestion,
    deleteAdminQuestion,
    CertificateQuestion
} from '@services/quizService';

// ─── Types ──────────────────────────────────────────────────────────────────
type QuestionType = 'single' | 'multiple' | 'matching';

interface NewQuestion {
    module: string;
    question: string;
    type: QuestionType;
    options: string[];
    correctAnswers: number[];
    explanation: string;
    imageUrl: string;
    leftItems: string[];
    rightItems: string[];
}

const MODULES = ['ccna2', 'ccna1', 'ccna3'];
const ITEMS_PER_PAGE = 15;

const emptyQuestion = (): NewQuestion => ({
    module: 'ccna2',
    question: '',
    type: 'single',
    options: ['', '', '', ''],
    correctAnswers: [],
    explanation: '',
    imageUrl: '',
    leftItems: ['', ''],
    rightItems: ['', ''],
});

// ─── Badge helpers ────────────────────────────────────────────────────────────
const TypeBadge: React.FC<{ type: QuestionType }> = ({ type }) => {
    const styles: Record<QuestionType, string> = {
        single: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
        multiple: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
        matching: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    };
    const icons: Record<QuestionType, React.ReactNode> = {
        single: <CheckCircle className="w-3 h-3" />,
        multiple: <List className="w-3 h-3" />,
        matching: <Shuffle className="w-3 h-3" />,
    };
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${styles[type]}`}>
            {icons[type]} {type}
        </span>
    );
};

// ─── Expanded question detail ─────────────────────────────────────────────────
const QuestionDetail: React.FC<{ q: CertificateQuestion }> = ({ q }) => (
    <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 space-y-3 text-sm">
        {q.imageUrl && (
            <div>
                <img src={q.imageUrl} alt="exhibit" className="max-h-40 rounded-lg border border-slate-200 dark:border-slate-700" />
            </div>
        )}
        {q.type !== 'matching' && q.options.length > 0 && (
            <ul className="space-y-1.5">
                {q.options.map((opt, i) => (
                    <li key={i} className={`flex items-start gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        q.correctAnswers.includes(i)
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
                            : 'text-slate-600 dark:text-slate-400 bg-slate-100/60 dark:bg-slate-800/60'
                    }`}>
                        <span className={`font-bold shrink-0 w-5 text-center ${q.correctAnswers.includes(i) ? 'text-green-600 dark:text-green-400' : 'text-slate-400'}`}>
                            {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                        {q.correctAnswers.includes(i) && <CheckCircle className="w-3.5 h-3.5 ml-auto shrink-0 text-green-500 mt-0.5" />}
                    </li>
                ))}
            </ul>
        )}
        {q.type === 'matching' && (
            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Left</p>
                    {(q.leftItems || []).map((item, i) => (
                        <div key={i} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded text-xs">{item}</div>
                    ))}
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Right</p>
                    {(q.rightItems || []).map((item, i) => (
                        <div key={i} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded text-xs">{item}</div>
                    ))}
                </div>
            </div>
        )}
        {q.explanation && (
            <div className="p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-lg text-amber-800 dark:text-amber-300">
                <p className="text-xs font-semibold mb-0.5 uppercase tracking-wide">Explanation</p>
                <p className="text-xs leading-relaxed">{q.explanation}</p>
            </div>
        )}
    </div>
);

// ─── Question Form Modal ────────────────────────────────────────────────────────
const QuestionFormModal: React.FC<{
    initialData?: CertificateQuestion | null;
    onClose: () => void;
    onSave: (q: NewQuestion) => Promise<void>;
    saving: boolean;
}> = ({ initialData, onClose, onSave, saving }) => {
    const [form, setForm] = useState<NewQuestion>(() => {
        if (initialData) {
            return {
                module: initialData.module,
                question: initialData.question,
                type: initialData.type,
                options: initialData.options || ['', '', '', ''],
                correctAnswers: initialData.correctAnswers || [],
                explanation: initialData.explanation || '',
                imageUrl: initialData.imageUrl || '',
                leftItems: initialData.leftItems || ['', ''],
                rightItems: initialData.rightItems || ['', ''],
            };
        }
        return emptyQuestion();
    });

    const set = <K extends keyof NewQuestion>(key: K, val: NewQuestion[K]) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const setOption = (i: number, val: string) => {
        const opts = [...form.options];
        opts[i] = val;
        set('options', opts);
    };

    const toggleCorrect = (i: number) => {
        if (form.type === 'single') {
            set('correctAnswers', [i]);
        } else {
            const cur = form.correctAnswers;
            set('correctAnswers', cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]);
        }
    };

    const addOption = () => set('options', [...form.options, '']);
    const removeOption = (i: number) => {
        const opts = form.options.filter((_, idx) => idx !== i);
        set('options', opts);
        set('correctAnswers', form.correctAnswers.filter(x => x !== i).map(x => (x > i ? x - 1 : x)));
    };

    const setLeftItem = (i: number, val: string) => {
        const items = [...form.leftItems];
        items[i] = val;
        set('leftItems', items);
    };
    const setRightItem = (i: number, val: string) => {
        const items = [...form.rightItems];
        items[i] = val;
        set('rightItems', items);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(form);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-800 px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                {initialData ? 'Edit Question' : 'Add New Question'}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Fill in all required fields</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Module + Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Module *</label>
                            <select
                                value={form.module}
                                onChange={e => set('module', e.target.value)}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                {MODULES.map(m => <option key={m} value={m}>{m.toUpperCase()}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Type *</label>
                            <select
                                value={form.type}
                                onChange={e => { set('type', e.target.value as QuestionType); set('correctAnswers', []); }}
                                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="single">Single choice</option>
                                <option value="multiple">Multiple choice</option>
                                <option value="matching">Matching</option>
                            </select>
                        </div>
                    </div>

                    {/* Question text */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Question *</label>
                        <textarea
                            required
                            rows={3}
                            value={form.question}
                            onChange={e => set('question', e.target.value)}
                            placeholder="Enter the question text..."
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        />
                    </div>

                    {/* Options (single / multiple) */}
                    {form.type !== 'matching' && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                Options — click a letter to mark as correct
                            </label>
                            <div className="space-y-2">
                                {form.options.map((opt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => toggleCorrect(i)}
                                            className={`w-8 h-8 rounded-lg font-bold text-sm shrink-0 transition-colors ${
                                                form.correctAnswers.includes(i)
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600'
                                            }`}
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </button>
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={e => setOption(i, e.target.value)}
                                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                            className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                        {form.options.length > 2 && (
                                            <button type="button" onClick={() => removeOption(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addOption}
                                    className="text-sm text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 mt-1"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add option
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Matching items */}
                    {form.type === 'matching' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Left items</label>
                                <div className="space-y-2">
                                    {form.leftItems.map((item, i) => (
                                        <input key={i} type="text" value={item} onChange={e => setLeftItem(i, e.target.value)}
                                            placeholder={`Left ${i + 1}`}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                    ))}
                                    <button type="button" onClick={() => set('leftItems', [...form.leftItems, ''])} className="text-xs text-teal-600 dark:text-teal-400 hover:underline">+ Add left item</button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Right items</label>
                                <div className="space-y-2">
                                    {form.rightItems.map((item, i) => (
                                        <input key={i} type="text" value={item} onChange={e => setRightItem(i, e.target.value)}
                                            placeholder={`Right ${i + 1}`}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                    ))}
                                    <button type="button" onClick={() => set('rightItems', [...form.rightItems, ''])} className="text-xs text-teal-600 dark:text-teal-400 hover:underline">+ Add right item</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Explanation */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Explanation</label>
                        <textarea
                            rows={2}
                            value={form.explanation}
                            onChange={e => set('explanation', e.target.value)}
                            placeholder="Why is this the correct answer?"
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            <span className="flex items-center gap-1.5"><Image className="w-3.5 h-3.5" /> Exhibit image URL (optional)</span>
                        </label>
                        <input
                            type="text"
                            value={form.imageUrl}
                            onChange={e => set('imageUrl', e.target.value)}
                            placeholder="/CCNA2/my-image.png"
                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium text-sm hover:from-teal-600 hover:to-teal-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Question</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ─── Delete confirmation dialog ───────────────────────────────────────────────
const DeleteDialog: React.FC<{
    question: CertificateQuestion;
    onConfirm: () => void;
    onCancel: () => void;
    deleting: boolean;
}> = ({ question, onConfirm, onCancel, deleting }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-red-200 dark:border-red-800/50 w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Question</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone</p>
                </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl mb-6 line-clamp-3">
                <span className="font-semibold">Q{question.questionId}:</span> {question.question}
            </p>
            <div className="flex gap-3">
                <button onClick={onCancel} className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    Cancel
                </button>
                <button onClick={onConfirm} disabled={deleting}
                    className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                    {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</> : <><Trash2 className="w-4 h-4" /> Delete</>}
                </button>
            </div>
        </div>
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const QuestionManagementPage: React.FC = () => {
    const navigate = useNavigate();

    const [module, setModule] = useState('ccna2');
    const [page, setPage] = useState(1);
    const [questions, setQuestions] = useState<CertificateQuestion[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editTarget, setEditTarget] = useState<CertificateQuestion | null>(null);
    const [saving, setSaving] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<CertificateQuestion | null>(null);
    const [deleting, setDeleting] = useState(false);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    const fetchQuestions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAdminQuestions(module, page, ITEMS_PER_PAGE);
            setQuestions(result.questions);
            setTotal(result.total);
        } catch (e: any) {
            setError(e.message || 'Failed to load questions');
        } finally {
            setLoading(false);
        }
    }, [module, page]);

    useEffect(() => {
        document.title = 'Universe | Question Management';
    }, []);

    useEffect(() => {
        setPage(1);
    }, [module]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const filteredQuestions = search.trim()
        ? questions.filter(q =>
            q.question.toLowerCase().includes(search.toLowerCase()) ||
            String(q.questionId).includes(search)
        )
        : questions;

    const handleSave = async (form: NewQuestion) => {
        setSaving(true);
        try {
            if (editTarget) {
                await updateAdminQuestion(editTarget._id, form as any);
            } else {
                await addAdminQuestion(form as any);
            }
            setShowFormModal(false);
            setEditTarget(null);
            fetchQuestions();
        } catch (e: any) {
            alert(e.message || 'Failed to save question');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await deleteAdminQuestion(deleteTarget._id);
            setDeleteTarget(null);
            setQuestions(prev => prev.filter(q => q._id !== deleteTarget._id));
            setTotal(prev => prev - 1);
        } catch (e: any) {
            alert(e.message || 'Failed to delete question');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-10 w-32 h-32 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-xl animate-float" />
                <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000" />
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/15 dark:bg-blue-500/10 rounded-full blur-xl animate-float animation-delay-500" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <button
                    onClick={() => navigate('/admin/contents')}
                    className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Contents
                </button>

                {/* Header card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-8 animate-fade-in-up">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                                <BookOpen className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Question Manager</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">
                                    {total} question{total !== 1 ? 's' : ''} in{' '}
                                    <span className="font-semibold text-teal-600 dark:text-teal-400 uppercase">{module}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={fetchQuestions}
                                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                title="Refresh"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={() => {
                                    setEditTarget(null);
                                    setShowFormModal(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-105"
                            >
                                <Plus className="w-4 h-4" /> Add Question
                            </button>
                        </div>
                    </div>

                    {/* Filters row */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        {/* Module selector */}
                        <div className="flex gap-2">
                            {MODULES.map(m => (
                                <button
                                    key={m}
                                    onClick={() => setModule(m)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        module === m
                                            ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                                >
                                    {m.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by question text or ID..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Questions list */}
                <div className="space-y-3 animate-fade-in-up animation-delay-100">
                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Loading questions...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                            <p className="text-red-700 dark:text-red-400 font-semibold">{error}</p>
                            <button onClick={fetchQuestions} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">
                                Try Again
                            </button>
                        </div>
                    ) : filteredQuestions.length === 0 ? (
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
                            <BookOpen className="w-14 h-14 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                {search ? 'No questions match your search' : 'No questions found'}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                                {search ? 'Try a different search term' : 'Run the seed script or add questions manually'}
                            </p>
                        </div>
                    ) : (
                        filteredQuestions.map((q, idx) => {
                            const isExpanded = expandedId === q._id;
                            return (
                                <div
                                    key={q._id}
                                    className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-md border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-200"
                                >
                                    {/* Question row */}
                                    <div className="flex items-start gap-4 p-4">
                                        {/* ID badge */}
                                        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                                {q.questionId}
                                            </span>
                                        </div>

                                        {/* Question content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                                <TypeBadge type={q.type} />
                                                {q.imageUrl && (
                                                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                                                        <Image className="w-3 h-3" /> exhibit
                                                    </span>
                                                )}
                                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                                    {q.options?.length ?? 0} options
                                                    {q.correctAnswers?.length > 0 && ` · ${q.correctAnswers.length} correct`}
                                                </span>
                                            </div>
                                            <p className={`text-sm text-slate-700 dark:text-slate-300 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                                                {q.question}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-1 shrink-0">
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : q._id)}
                                                className="p-2 rounded-xl text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                                                title={isExpanded ? 'Collapse' : 'View details'}
                                            >
                                                {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditTarget(q);
                                                    setShowFormModal(true);
                                                }}
                                                className="p-2 rounded-xl text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                                title="Edit question"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                            </button>
                                            <button
                                                onClick={() => setDeleteTarget(q)}
                                                className="p-2 rounded-xl text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                                title="Delete question"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded detail */}
                                    {isExpanded && (
                                        <div className="px-4 pb-4">
                                            <QuestionDetail q={q} />
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && !search && (
                    <div className="mt-6 flex items-center justify-between animate-fade-in-up animation-delay-200">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Page <span className="font-semibold text-slate-700 dark:text-slate-300">{page}</span> of{' '}
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{totalPages}</span>
                            {' '}· {total} total
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                const p = page <= 3 ? i + 1 : page + i - 2;
                                if (p < 1 || p > totalPages) return null;
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors ${
                                            p === page
                                                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {p}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            {showFormModal && (
                <QuestionFormModal
                    initialData={editTarget}
                    onClose={() => {
                        setShowFormModal(false);
                        setEditTarget(null);
                    }}
                    onSave={handleSave}
                    saving={saving}
                />
            )}
            {deleteTarget && (
                <DeleteDialog
                    question={deleteTarget}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                    deleting={deleting}
                />
            )}
        </div>
    );
};

export default QuestionManagementPage;
