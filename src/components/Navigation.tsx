import React from 'react';
import { User } from 'lucide-react';
import { AuthPage } from '../types/auth';

interface NavigationProps {
  currentPage: AuthPage;
  onPageChange: (page: AuthPage) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-slate-800">Adventure</span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => onPageChange('landing')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'landing'
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>
              <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Destinations
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange('login')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === 'login'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => onPageChange('signup')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === 'signup'
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;