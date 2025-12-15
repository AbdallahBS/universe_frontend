import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData } from 'types/auth';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
}

const LoginPage: React.FC<LoginPageProps> = ({ }) => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    document.title = 'Universe | Auth';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      // Login successful - the AuthContext will handle the state update
      // You might want to redirect to a dashboard or home page here
      navigate('/dashboard');
      console.log('Login successful');
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError('Login failed. Please try again.');
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
        navigate('/dashboard');
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

  const handleGoogleSignIn = () => {
    googleLogin();
  };

  return (
    <div className="min-h-screen flex mt-10">
      {/* Left Side - Hero Section with Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/singinbg.jpg')" }}
        ></div>

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-teal-900/60"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-teal-500/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-cyan-400/15 rounded-full animate-float"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
            FIND YOUR SUITABLE
            <br />
            <span className="text-teal-400">INTERNSHIP</span>
            <br />
          </h1>
          <p className="text-xl text-slate-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
            Welcome to Universe, your gateway to internship opportunities! Log in now to explore a world of exciting experiences, connect with companies, and take the first step towards your future career.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white dark:bg-slate-900 px-8 py-12">
        <div className="max-w-md w-full animate-fade-in-right">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              WELCOME BACK!
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="w-full rounded-md border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-2" role="alert">
                {error}
              </div>
            )}

            <InputField
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, email: value }));
                if (error) setError(null);
              }}
              placeholder="Enter your email"
              required
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, password: value }));
                if (error) setError(null);
              }}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="w-4 h-4 text-teal-600 bg-slate-100 dark:bg-slate-700 rounded border-slate-300 dark:border-slate-600 focus:ring-teal-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">Remember me</span>
              </label>

              <button
                type="button"
                className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium transition-colors"
                onClick={() => navigate('/password-reset')}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign in with Google</span>
            </Button>

            <div className="text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;