import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    redirectUrl: string;
    title?: string;
    description?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({
    isOpen,
    onClose,
    redirectUrl,
    title = "Sign in to continue",
    description = "Please sign in or create an account to access this feature."
}) => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await login(email, password, false);
            onClose();
            navigate(redirectUrl);
        } catch (err: any) {
            console.error('Auth error:', err.message);
            setError('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsGoogleLoading(true);
            setError(null);
            try {
                await loginWithGoogle(tokenResponse.access_token);
                onClose();
                navigate(redirectUrl);
            } catch (err: any) {
                console.error('Google login error:', err);
                setError('Google sign in failed. Please try again.');
            } finally {
                setIsGoogleLoading(false);
            }
        },
        onError: (error) => {
            console.error('Google login error:', error);
            setError('Google sign in failed. Please try again.');
        },
        flow: 'implicit',
    });

    const handleGoToSignup = () => {
        onClose();
        navigate(`/signup?redirect=${encodeURIComponent(redirectUrl)}`);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md mx-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl animate-scale-in overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 px-6 py-8 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">Authentication Required</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{title}</h2>
                    <p className="text-white/80 text-sm">{description}</p>
                </div>

                {/* Form */}
                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={() => googleLogin()}
                        disabled={isGoogleLoading}
                        className="w-full py-3 px-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isGoogleLoading ? (
                            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Sign in with Google</span>
                            </>
                        )}
                    </button>

                    {/* Sign up link */}
                    <p className="mt-6 text-center text-slate-600 dark:text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <button
                            onClick={handleGoToSignup}
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                            Create one now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
