import React from 'react';
import { X, Lock, LogIn, Sparkles } from 'lucide-react';
import { useNavigatePage } from './ui/useNavigatePage';
import { useTranslation } from 'react-i18next';
import TransText from './TransText';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthToaster: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigatePage();
  const {t} = useTranslation();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 999999,
      width: '380px',
      maxWidth: 'calc(100vw - 48px)'
    }}>
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-slide-in">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          type="button"
          style={{ zIndex: 10 }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="relative p-6" style={{ zIndex: 1 }}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-teal-500 dark:text-teal-400" />
            </div>
            <TransText as='h2' className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {t('dashboard.welcome')}
            </TransText>
            <TransText as='p' className="text-sm text-slate-600 dark:text-slate-400">
              {t('dashboard.askForSignUp')}
            </TransText>
          </div>
            {/* Submit Button */}
            <button
                onClick={() => navigate('/signup')}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <TransText>{t('auth.signUp')}</TransText>
              </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AuthToaster;