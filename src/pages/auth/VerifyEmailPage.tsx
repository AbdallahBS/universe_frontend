import React, { useState, useEffect } from 'react';
import InputField from '../../components/ui/InputField';
import Button from '../../components/ui/Button';
import { verifyEmail, requestEmailVerification } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface VerifyEmailPageProps {
  userEmail?: string;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({ userEmail }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Countdown timer for resend button
  useEffect(() => {
    document.title = 'Universe | Auth';

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await verifyEmail({ code: verificationCode });
      setSuccess(true);
      setTimeout(() => {
         navigate('/login')
      }, 2000);
    } catch (err: any) {
      setError(err?.message || 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setIsResending(true);

    try {
      await requestEmailVerification();
      setTimeLeft(60); // 60 seconds cooldown
    } catch (err: any) {
      setError(err?.message || 'Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(numericValue);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-slate-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Email Verified!
            </h2>
            <p className="text-slate-600 mb-6">
              Your email has been successfully verified. You can now sign in to your account.
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto"></div>
            <p className="text-sm text-slate-500 mt-2">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
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
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              VERIFY YOUR
              <br />
              <span className="text-teal-400">EMAIL</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
              We've sent a verification code to your email address. Please check your inbox and enter the code below.
            </p>
            <p className="text-lg text-teal-300 animate-fade-in-up animation-delay-400">
              Almost there! Just one more step.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8 py-12">
        <div className="max-w-md w-full animate-fade-in-left">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              VERIFY EMAIL
            </h2>
            <p className="text-slate-600">
              Enter the 6-digit code sent to
            </p>
            <p className="text-teal-600 font-medium">
              {userEmail || 'your email address'}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {error && (
              <div className="w-full rounded-md border border-red-200 bg-red-50 text-red-700 px-4 py-2" role="alert">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <InputField
                label="Verification Code"
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={handleCodeChange}
                placeholder="000000"
                required
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
              
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-4">
                  Didn't receive the code?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleResendCode}
                  loading={isResending}
                  disabled={timeLeft > 0}
                  className="w-full"
                >
                  {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              disabled={verificationCode.length !== 6}
              className="w-full"
            >
              Verify Email
            </Button>

            <div className="text-center">
              <p className="text-slate-600">
                Wrong email?{' '}
                <button
                  type="button"
                  onClick={() =>  navigate('/signup')}
                  className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
                >
                  Go back to signup
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
