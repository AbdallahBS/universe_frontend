import React, { useState } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { updateNotificationPreferences } from '@services/userService';

interface NotificationPreferencesCardProps {
    emailNotificationsEnabled: boolean | undefined;
    onPreferencesUpdate: () => void;
}

/**
 * NotificationPreferencesCard Component
 * Allows users to toggle email notifications on/off
 */
const NotificationPreferencesCard: React.FC<NotificationPreferencesCardProps> = ({
    emailNotificationsEnabled,
    onPreferencesUpdate
}) => {
    const { t } = useTranslation();
    const [isEnabled, setIsEnabled] = useState(emailNotificationsEnabled ?? true);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async () => {
        const newValue = !isEnabled;
        setIsLoading(true);
        
        try {
            await updateNotificationPreferences({ receiveNotificationsMail: newValue });
            setIsEnabled(newValue);
            onPreferencesUpdate();
        } catch (error) {
            console.error('Failed to update notification preferences:', error);
            // Revert on error
            setIsEnabled(!newValue);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-6 animate-fade-in-up animation-delay-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                        <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {t('profile.emailNotifications') || 'Email Notifications'}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {t('profile.notificationsDescription') || 'Receive updates and alerts via email'}
                        </p>
                    </div>
                </div>

                {/* Toggle Switch */}
                <button
                    type="button"
                    onClick={handleToggle}
                    disabled={isLoading}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 disabled:opacity-50 ${
                        isEnabled
                            ? 'bg-teal-600'
                            : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    role="switch"
                    aria-checked={isEnabled}
                    aria-label="Toggle email notifications"
                >
                    <span className="sr-only">Toggle email notifications</span>
                    <span
                        className={`inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                            isEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    >
                        {isLoading && (
                            <Loader2 className="w-3 h-3 text-teal-600 animate-spin" />
                        )}
                    </span>
                </button>
            </div>

            {/* Status Text */}
            <div className="mt-3 ml-13">
                <p className={`text-sm font-medium ${
                    isEnabled
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-slate-500 dark:text-slate-400'
                }`}>
                    {isEnabled
                        ? t('profile.notificationsEnabled') || 'Notifications enabled'
                        : t('profile.notificationsDisabled') || 'Notifications disabled'
                    }
                </p>
            </div>
        </div>
    );
};

export default NotificationPreferencesCard;