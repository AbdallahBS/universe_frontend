import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '@services/authService';

/**
 * ForgotPasswordPage Component
 * 
 * Handles the "forgot password" flow where users can request
 * a password reset email by entering their email address.
 * 
 * Security: Always shows success message to prevent user enumeration
 */
const ForgotPasswordPage: React.FC = () => {
    const navigate = useNavigate();

    // Form state
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Universe | Forgot Password';
    }, []);

    /**
     * Handle form submission
     * Calls the password reset API endpoint
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await requestPasswordReset(email);
            setSubmitted(true);
        } catch (err: any) {
            // Still show success to prevent user enumeration
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    // Success state - show confirmation message
    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-16 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                    <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
                </div>

                <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8 text-center animate-fade-in-up">
                        {/* Success icon */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center animate-float">
                                <CheckCircle2 className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Check Your Email
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            If an account exists for <strong className="text-slate-900 dark:text-white">{email}</strong>,
                            you will receive a password reset link shortly.
                        </p>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >
                            Back to Login
                        </button>

                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-6">
                            Didn't receive the email?{' '}
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                            >
                                Try again
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Form state - request email input
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-16 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
            </div>

            <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    onClick={() => navigate('/login')}
                    className="group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors duration-300 animate-fade-in-up"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Login</span>
                </button>

                {/* Main card */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8 animate-fade-in-up animation-delay-200">
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 rounded-full flex items-center justify-center">
                                <Mail className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Forgot Password?
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Enter your email and we'll send you a reset link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder:text-slate-400"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Mail className="mr-2 w-5 h-5" />
                                    <span>Send Reset Link</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign in link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Remember your password?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
