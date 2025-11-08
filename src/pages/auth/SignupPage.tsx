import React, { useEffect, useState } from 'react';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { SignupSchema } from '../../utils/validators';
import { signup as signupService } from '../../services/authService';
import { SignupFormData, SignupPayload } from 'types/auth';
import { useNavigate } from 'react-router-dom';

interface SignupPageProps {
  onSignupSuccess?: (email: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
     document.title = 'Universe | Auth';
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    const parsed = SignupSchema.safeParse(formData);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      setFieldErrors({
        firstname: flat.fieldErrors.firstname?.[0],
        lastname: flat.fieldErrors.lastname?.[0],
        email: flat.fieldErrors.email?.[0],
        password: flat.fieldErrors.password?.[0],
        confirmPassword: flat.fieldErrors.confirmPassword?.[0],
        agreeToTerms: flat.fieldErrors.agreeToTerms?.[0],
      } as Partial<Record<keyof SignupFormData, string>>);
      return;
    }

    setIsLoading(true);
    try {
      const payload: SignupPayload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
      };
      await signupService(payload);
      onSignupSuccess?.(formData.email);
      navigate('/verify-email')
    } catch (err: any) {
      setServerError(err?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
  };

  return (
    <div className="min-h-screen flex mt-10">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.2),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-24 h-24 bg-teal-500/20 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-500"></div>
        
        {/* Mountain Silhouette */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 300" className="w-full h-auto text-slate-800/30" fill="currentColor">
            <path d="M0 300 L200 150 L400 200 L600 100 L800 180 L1000 120 L1200 200 L1200 300 Z"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              START YOUR
              <br />
              <span className="text-teal-400">JOURNEY</span>
              <br />
              TODAY!
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              Join thousands of adventurers who have discovered amazing places, created unforgettable memories, and found their perfect escapes.
            </p>
            <p className="text-lg text-teal-300 animate-fade-in-up animation-delay-400">
              Your adventure begins with a single step.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="max-w-md w-full animate-fade-in-left">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              CREATE ACCOUNT
            </h2>
            <p className="text-slate-600">
              Join us today! Please fill in your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {serverError && (
              <div className="w-full rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-2" role="alert">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                type="text"
                id="firstname"
                value={formData.firstname}
                onChange={(value) => setFormData(prev => ({ ...prev, firstname: value }))}
                placeholder="Enter your first name"
                required
                error={fieldErrors.firstname}
              />
              <InputField
                label="Last Name"
                type="text"
                id="lastname"
                value={formData.lastname}
                onChange={(value) => setFormData(prev => ({ ...prev, lastname: value }))}
                placeholder="Enter your last name"
                required
                error={fieldErrors.lastname}
              />
            </div>

            <InputField
              label="Email"
              type="email"
              id="email"
              value={formData.email}
              onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
              placeholder="Enter your email"
              required
              error={fieldErrors.email}
            />

            <InputField
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={(value) => setFormData(prev => ({ ...prev, password: value }))}
              placeholder="••••••••"
              required
              error={fieldErrors.password}
            />

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

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                className="w-4 h-4 text-teal-600 bg-slate-100 rounded border-slate-300 focus:ring-teal-500"
                required
              />
              <label htmlFor="agreeToTerms" className="text-sm text-slate-700">
                I agree to the{' '}
                <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button
              onClick={handleGoogleSignUp}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Sign up with Google</span>
            </Button>

            <div className="text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;