import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import InternshipsList from '@pages/internships/InternshipsList';import InternshipDetail from '@pages/internships/InternshipDetail';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from '@pages/NotFoundPage';
import Navigation from '@components/Navigation';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/auth/LoginPage';
import SignupPage from '@pages/auth/SignupPage';
import VerifyEmailPage from '@pages/auth/VerifyEmailPage';
import ForgotPassword from '@pages/auth/ForgotPassword';
import { PublicRoute } from '@components/PublicRoute';
import { ProtectedRoute } from '@components/ProtectedRoute';

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
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    navigate('/verify-email');
  };

  const handleIntershipClick = () => {
    navigate('/internships/1');
  };

  // Show dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard />;
  }

  // Show auth pages if not authenticated
  return (
    <div className="relative">
      <Navigation currentPage={location.pathname} />
      
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes - redirect if already logged in */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignupPage onSignupSuccess={handleSignupSuccess}/>
              </PublicRoute>
            } 
          />

          {/* Password Reset */}         
          <Route 
            path="/password-reset" 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            } 
          />

          {/* Email Verification */}
          <Route 
            path="/verify-email" 
            element={
              <ProtectedRoute requireVerified={false}>
                <VerifyEmailPage userEmail={userEmail} />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes - require authentication */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Semi-public routes - anyone can view, but enhanced for logged-in users */}
          <Route path="/internships" element={<InternshipsList onInternshipClick={handleIntershipClick}/>} />
          <Route path="/internships/:id" element={<InternshipDetail />} /> {/* will require login to apply for internship */}

          {/* Admin-only Routes */}
          {/* <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          /> */}

          {/* Error Routes */}
          {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;