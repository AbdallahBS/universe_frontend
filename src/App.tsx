import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import InternshipsList from '@pages/internships/InternshipsList';import InternshipDetail from '@pages/internships/InternshipDetail';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ErrorPage from '@pages/ErrorPage';
import Navigation from '@components/Navigation';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/auth/LoginPage';
import SignupPage from '@pages/auth/SignupPage';
import VerifyEmailPage from '@pages/auth/VerifyEmailPage';
import ForgotPassword from '@pages/auth/ForgotPassword';
import { PublicRoute } from '@components/PublicRoute';
import { ProtectedRoute } from '@components/ProtectedRoute';
import Dashboard from '@pages/Dashboard';

// Main app content component
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    navigate('/verify-email');
  };

  // test purpose
  const handleIntershipClick = () => {
    navigate('/internships/1');
  };

  // Show auth pages if not authenticated
  return (
    <div className="relative">
      <Navigation currentPage={location.pathname} />
      
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />
          
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
                {/* Dashboard component for authenticated users */}
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
          <Route path="/401" element={<ErrorPage errorCode="401" errorText="Unauthorized" errorDescription="You are not authorized to access this page." />} />
          <Route path="/404" element={<ErrorPage errorCode="404" errorText="Page Not Found" errorDescription="The page you are looking for does not exist." />} />
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