import React, { useState } from 'react';
import { Key, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface PasswordResetCardProps {
    email: string | undefined;
    onRequestReset: () => Promise<void>;
}

/**
 * PasswordResetCard Component
 * 
 * Handles password reset email requests.
 */
const PasswordResetCard: React.FC<PasswordResetCardProps> = ({
    email,
    onRequestReset,
}) => {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleRequest = async () => {
        setSending(true);
        try {
            await onRequestReset();
            setSent(true);
        } catch {
            setSent(true); // Still show success for security
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-8 animate-fade-in-up animation-delay-200">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-500" />
                Change Password
            </h2>

            {sent ? (
                <div className="text-center py-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center animate-float">
                            <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Check Your Email
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        We've sent a password reset link to <strong className="text-slate-900 dark:text-white">{email}</strong>.
                    </p>
                    <button
                        onClick={() => setSent(false)}
                        className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                    >
                        Didn't receive? Send again
                    </button>
                </div>
            ) : (
                <div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        We'll send a reset link to your email address.
                    </p>
                    <button
                        onClick={handleRequest}
                        disabled={sending}
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {sending ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                <span>Sending...</span>
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 w-5 h-5" />
                                <span>Send Password Reset Email</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default PasswordResetCard;
