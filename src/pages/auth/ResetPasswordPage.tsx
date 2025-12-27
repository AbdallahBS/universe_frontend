import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, Lock, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, validateResetToken } from '@services/authService';
import { ResetPasswordSchema } from '@utils/validators';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import { useAuth } from '@context/AuthContext';
import { useNavigatePage } from '@components/ui/useNavigatePage';

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

type PageState = 'loading' | 'valid' | 'invalid' | 'success';

/**
 * ResetPasswordPage Component
 * 
 * Handles the password reset confirmation flow where users
 * set a new password using the token from the reset email.
 * 
 * Validates token on page load before showing the form.
 */
const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigatePage();
    const [searchParams] = useSearchParams();
    const { logout, isAuthenticated } = useAuth();

    // Extract token from URL
    const token = searchParams.get('token');

    // Page state
    const [pageState, setPageState] = useState<PageState>('loading');
    const [tokenError, setTokenError] = useState('');

    // Form state
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        password: '',
        confirmPassword: '',
    });
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ResetPasswordFormData, string>>>({});

    // UI state
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        document.title = 'Universe | Reset Password';

        // Validate token on page load
        if (token) {
            validateTokenOnLoad();
        } else {
            setPageState('invalid');
            setTokenError('Invalid reset link');
        }
    }, [token]);

    /**
     * Validate token when page loads
     */
    const validateTokenOnLoad = async () => {
        if (!token) return;

        try {
            const result = await validateResetToken(token);
            if (result.valid) {
                setPageState('valid');
            } else {
                setPageState('invalid');
                setTokenError(result.error || 'Invalid reset link');
            }
        } catch (err) {
            setPageState('invalid');
            setTokenError('Failed to validate reset link');
        }
    };

    /**
     * Handle form submission with Zod validation
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setServerError('');
        setFieldErrors({});

        if (!token) {
            setServerError('Invalid reset link');
            return;
        }

        // Validate with Zod schema (same rules as signup)
        const parsed = ResetPasswordSchema.safeParse(formData);
        if (!parsed.success) {
            const flat = parsed.error.flatten();
            setFieldErrors({
                password: flat.fieldErrors.password?.[0],
                confirmPassword: flat.fieldErrors.confirmPassword?.[0],
            });
            return;
        }

        setLoading(true);

        try {
            await confirmPasswordReset(token, formData.password);

            // Force logout if user was authenticated (sessions are revoked on backend)
            if (isAuthenticated) {
                await logout();
            }

            setPageState('success');
        } catch (err: any) {
            setServerError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    // Loading state - validating token
    if (pageState === 'loading') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-16">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Validating reset link...</p>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (pageState === 'invalid') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-16 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-red-200/30 dark:bg-red-500/20 rounded-full blur-xl animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200/30 dark:bg-orange-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8 text-center animate-fade-in-up">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Link Expired</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            {tokenError || 'This password reset link is invalid or has expired.'}
                        </p>

                        <div className="space-y-3">
                            <Button
                                onClick={() => navigate('/forgot-password')}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                Request New Link
                            </Button>
                            <Button
                                onClick={() => navigate('/login')}
                                variant="outline"
                                size="lg"
                                className="w-full"
                            >
                                Back to Login
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Success state
    if (pageState === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center pt-16 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 dark:bg-green-500/20 rounded-full blur-xl animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
                </div>

                <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl p-8 text-center animate-fade-in-up">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 rounded-full flex items-center justify-center animate-float">
                                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Password Reset!
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            Your password has been successfully reset. You can now sign in.
                        </p>

                        <Button
                            onClick={() => navigate('/login')}
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            Sign In Now
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Valid token - show form
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
                                <Lock className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                            Set New Password
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400">
                            Enter your new password below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Server error */}
                        {serverError && (
                            <div className="w-full rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2" role="alert">
                                {serverError}
                            </div>
                        )}

                        {/* New Password - using InputField component */}
                        <InputField
                            label="New Password"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
                            placeholder="••••••••"
                            required
                            error={fieldErrors.password}
                        />

                        {/* Confirm Password - using InputField component */}
                        <InputField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(value) => setFormData(prev => ({ ...prev, confirmPassword: value }))}
                            placeholder="••••••••"
                            required
                            error={fieldErrors.confirmPassword}
                        />

                        {/* Submit button - using Button component */}
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            loading={loading}
                            className="w-full"
                        >
                            Reset Password
                        </Button>
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

export default ResetPasswordPage;
