import { useState } from 'react';
import { AuthPage } from './types/auth';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Dashboard component for authenticated users
function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome back, {user?.firstname}!
              </h1>
              <p className="text-gray-600 mb-6">
                You are successfully logged in to your account.
              </p>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main app content component
function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<AuthPage>('landing');
  const [userEmail, setUserEmail] = useState<string>('');

  const handlePageChange = (page: AuthPage) => {
    setCurrentPage(page);
  };

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    setCurrentPage('verify');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Show dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Show auth pages if not authenticated
  return (
    <div className="relative">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="pt-16">
        {currentPage === 'landing' ? (
          <LandingPage onPageChange={handlePageChange} />
        ) : currentPage === 'login' ? (
          <LoginPage onPageChange={handlePageChange} />
        ) : currentPage === 'signup' ? (
          <SignupPage onPageChange={handlePageChange} onSignupSuccess={handleSignupSuccess} />
        ) : (
          <VerifyEmailPage onPageChange={handlePageChange} userEmail={userEmail} />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;