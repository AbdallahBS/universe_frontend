import React, { useState } from 'react';
import { Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { updateStatus, UserStatus } from '../services/userService';

interface StatusSelectionModalProps {
    isOpen: boolean;
    onComplete: () => void;
    onUserUpdate?: (user: any) => void;
}

const STATUS_OPTIONS: UserStatus[] = [
    'looking_for_internship',
    'looking_for_master_alternance',
    'looking_for_job',
    'employed',
    'student'
];

const StatusSelectionModal: React.FC<StatusSelectionModalProps> = ({
    isOpen,
    onComplete,
    onUserUpdate
}) => {
    const { t } = useTranslation();
    const [selectedStatus, setSelectedStatus] = useState<UserStatus | ''>('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = async () => {
        if (!selectedStatus) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await updateStatus(selectedStatus);
            if (onUserUpdate && response.user) {
                onUserUpdate(response.user);
            }
            onComplete();
        } catch (err: any) {
            setError(err.message || 'Failed to update status');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 animate-scale-in">
                {/* Header */}
                <div className="px-6 pt-8 pb-4 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <span className="text-sm font-medium text-teal-400">
                            {t('statusModal.subtitle')}
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {t('statusModal.title')}
                    </h2>
                </div>

                {/* Content */}
                <div className="px-6 pb-8 overflow-visible">
                    {error && (
                        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Custom Select Dropdown */}
                    <div className="relative mb-6">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 rounded-xl text-left flex items-center justify-between transition-all hover:border-teal-500/50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                            <span className={selectedStatus ? 'text-white' : 'text-slate-500'}>
                                {selectedStatus
                                    ? t(`statusModal.options.${selectedStatus}`)
                                    : t('statusModal.selectPlaceholder')
                                }
                            </span>
                            <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Options */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-[300] overflow-hidden animate-fade-in max-h-60 overflow-y-auto">
                                {STATUS_OPTIONS.map((status) => (
                                    <button
                                        key={status}
                                        type="button"
                                        onClick={() => {
                                            setSelectedStatus(status);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-700 ${selectedStatus === status
                                            ? 'bg-teal-500/20 text-teal-400 border-l-2 border-teal-500'
                                            : 'text-slate-300'
                                            }`}
                                    >
                                        {t(`statusModal.options.${status}`)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Submit Button - Teal gradient like the example */}
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedStatus || isLoading}
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-teal-500 to-teal-400 font-semibold rounded-xl hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span style={{ color: 'white' }}>{t('statusModal.submitting')}</span>
                            </>
                        ) : (
                            <>
                                <span style={{ color: 'white' }}>{t('statusModal.submit')}</span>
                                <ArrowRight className="w-5 h-5" style={{ color: 'white' }} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatusSelectionModal;
