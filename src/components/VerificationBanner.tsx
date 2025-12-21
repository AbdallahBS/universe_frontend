import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, X, AlertTriangle } from 'lucide-react';

/**
 * VerificationBanner - Displays a dismissible warning banner for unverified users
 * Prompts users to verify their email address
 */
const VerificationBanner: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isDismissed, setIsDismissed] = useState(false);

    // Don't show if user is verified or banner is dismissed
    if (!user || user.isVerified || isDismissed) {
        return null;
    }

    const handleVerifyClick = () => {
        navigate('/verify-email');
    };

    const handleDismiss = () => {
        setIsDismissed(true);
    };

    return (
        <div className="bg-gradient-to-r from-amber-500/90 to-orange-500/90 dark:from-amber-600/90 dark:to-orange-600/90">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    {/* Message */}
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <AlertTriangle className="h-5 w-5 text-white" />
                        </div>
                        <p className="text-sm font-medium text-white">
                            <span className="hidden sm:inline">Your email is not verified. </span>
                            Please verify your email to access all features.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleVerifyClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-amber-600 dark:text-amber-700 bg-white rounded-lg hover:bg-amber-50 transition-colors shadow-sm"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Verify Email</span>
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Dismiss"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationBanner;
