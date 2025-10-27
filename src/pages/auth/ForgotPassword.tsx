import React, { useEffect, useState } from 'react';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordProps {
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

   useEffect(() => {
     document.title = 'Universe | Auth';
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
    //   const { error } = await supabase.auth.resetPasswordForEmail(email, {
    //     redirectTo: `${window.location.origin}/reset-password`,
    //   });

      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-xl animate-float animation-delay-500"></div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl p-8 text-center animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center animate-float">
                <CheckCircle2 className="w-10 h-10 text-teal-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Check Your Email</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We've sent a password reset link to <strong>{email}</strong>. Please check your inbox and follow the instructions to reset your password.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Back to Login
            </button>

            <p className="text-sm text-slate-500 mt-6">
              Didn't receive the email?{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/login')}
          className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors duration-300 animate-fade-in-up"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Login</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl p-8 animate-fade-in-up animation-delay-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-teal-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Forgot Password?</h2>
            <p className="text-slate-600">
              No worries! Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
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
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-white border-t-transparent border-l-transparent border-r-transparent border-2 mr-2"></div>
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

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Remember your password?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-teal-600 hover:text-teal-700 font-medium"
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

export default ForgotPassword;
