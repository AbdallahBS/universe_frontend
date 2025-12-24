import React, { useState } from 'react';
import { Briefcase, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { updateStatus, UserStatus } from '@services/userService';

interface StatusCardProps {
    currentStatus: UserStatus | null | undefined;
    onStatusUpdate: () => void;
}

const STATUS_OPTIONS: UserStatus[] = [
    'looking_for_internship',
    'looking_for_master_alternance',
    'looking_for_job',
    'employed',
    'student'
];

/**
 * StatusCard Component
 * Allows users to view and change their current status
 */
const StatusCard: React.FC<StatusCardProps> = ({ currentStatus, onStatusUpdate }) => {
    const { t } = useTranslation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<UserStatus | null>(currentStatus || null);

    const handleStatusChange = async (status: UserStatus) => {
        if (status === selectedStatus) {
            setIsDropdownOpen(false);
            return;
        }

        setIsLoading(true);
        try {
            await updateStatus(status);
            setSelectedStatus(status);
            onStatusUpdate();
            setIsDropdownOpen(false);
        } catch (error) {
            console.error('Failed to update status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-6 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {t('profile.currentStatus') || 'Current Status'}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {t('profile.statusDescription') || 'Let companies know what you\'re looking for'}
                    </p>
                </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-left flex items-center justify-between transition-all hover:border-teal-400 dark:hover:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50"
                >
                    <div className="flex items-center gap-3">
                        {selectedStatus && (
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        )}
                        <span className={selectedStatus ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}>
                            {selectedStatus
                                ? t(`statusModal.options.${selectedStatus}`)
                                : t('statusModal.selectPlaceholder') || 'Select your status'
                            }
                        </span>
                    </div>
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
                    ) : (
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                </button>

                {/* Dropdown Options */}
                {isDropdownOpen && !isLoading && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl z-[100] overflow-hidden animate-fade-in">
                        {STATUS_OPTIONS.map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(status)}
                                className={`w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-600 flex items-center justify-between ${selectedStatus === status
                                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                                    : 'text-slate-700 dark:text-slate-200'
                                    }`}
                            >
                                <span>{t(`statusModal.options.${status}`)}</span>
                                {selectedStatus === status && (
                                    <Check className="w-4 h-4 text-teal-500" />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusCard;
