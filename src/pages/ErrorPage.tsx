import React, { useEffect } from 'react';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
  errorCode: String,
  errorText: String,
  errorDescription: String
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorCode, errorText, errorDescription }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Universe | ${errorCode}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in-up">
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-100 to-purple-100 dark:from-teal-900/50 dark:to-purple-900/50 rounded-full flex items-center justify-center shadow-xl animate-float">
              <AlertCircle className="w-16 h-16 text-teal-600 dark:text-teal-400" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-400 animate-fade-in-up animation-delay-200">
              {errorCode}
            </h1>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white animate-fade-in-up animation-delay-300">
              {errorText}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto animate-fade-in-up animation-delay-400">
              {errorDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center justify-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Home className="mr-2 w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
