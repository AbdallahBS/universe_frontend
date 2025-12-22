import React, { useState } from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

interface DangerZoneCardProps {
    onDeleteAccount: (password: string) => Promise<void>;
}

/**
 * DangerZoneCard Component
 * 
 * Handles account deletion with confirmation modal.
 */
const DangerZoneCard: React.FC<DangerZoneCardProps> = ({ onDeleteAccount }) => {
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (!password) {
            setError('Password is required to delete account');
            return;
        }

        setError('');
        setDeleting(true);

        try {
            await onDeleteAccount(password);
        } catch (err: any) {
            setError(err.message || 'Failed to delete account');
            setDeleting(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setPassword('');
        setError('');
    };

    return (
        <>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-200/50 dark:border-red-800/50 animate-fade-in-up animation-delay-400">
                <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete Account</h3>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            This action is <strong>permanent</strong> and cannot be undone. All your data will be deleted.
                        </p>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Enter your password to confirm
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleClose}
                                className="flex-1 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting || !password}
                                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DangerZoneCard;
