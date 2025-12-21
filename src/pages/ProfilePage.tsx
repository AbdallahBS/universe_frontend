import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Mail,
    CheckCircle2,
    ArrowLeft,
    Key,
    Send
} from 'lucide-react';
import { useAuth } from '@context/AuthContext';
import { requestPasswordReset } from '@services/authService';

/**
 * ProfilePage Component
 * 
 * Allows authenticated users to:
 * - View their profile information
 * - Request a password reset email
 */
const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // UI state
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        document.title = 'Universe | Profile';
    }, []);

    /**
     * Handle password reset request
     * Sends an email with a reset link to the user
     */
    const handleRequestPasswordReset = async () => {
        if (!user?.email) return;

        setLoading(true);

        try {
            await requestPasswordReset(user.email);
            setEmailSent(true);
        } catch (err: any) {
            // Still show success for security (same as forgot password)
            setEmailSent(true);
        } finally {
            setLoading(false);
        }
    };

    // Get user initials for avatar
    const getInitials = () => {
        if (!user) return 'U';
        return `${user.firstname?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-10 w-32 h-32 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                {/* Profile Card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-8 animate-fade-in-up">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <User className="w-6 h-6 text-teal-500" />
                        Profile
                    </h1>

                    <div className="flex items-center gap-6 mb-6">
                        {/* Avatar */}
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.firstname}
                                className="w-20 h-20 rounded-full object-cover border-4 border-teal-500/30 dark:border-teal-400/30 shadow-lg"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-teal-500/30 dark:border-teal-400/30">
                                {getInitials()}
                            </div>
                        )}

                        {/* User info */}
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {user?.firstname} {user?.lastname}
                            </h2>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                                <Mail className="w-4 h-4" />
                                <span>{user?.email}</span>
                            </div>
                            {user?.isVerified && (
                                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 mt-1 text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Email verified</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 animate-fade-in-up animation-delay-200">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Key className="w-5 h-5 text-teal-500" />
                        Change Password
                    </h2>

                    {emailSent ? (
                        // Success state - email sent
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
                                We've sent a password reset link to <strong className="text-slate-900 dark:text-white">{user?.email}</strong>.
                                Click the link in the email to set your new password.
                            </p>
                            <button
                                onClick={() => setEmailSent(false)}
                                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                            >
                                Didn't receive? Send again
                            </button>
                        </div>
                    ) : (
                        // Request password reset
                        <div>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                To change your password, we'll send a reset link to your email address.
                                Click the link to set a new password.
                            </p>

                            <button
                                onClick={handleRequestPasswordReset}
                                disabled={loading}
                                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
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
            </div>
        </div>
    );
};

export default ProfilePage;
