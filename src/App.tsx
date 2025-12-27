import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import InternshipsList from '@pages/internships/InternshipsList'; import InternshipDetail from '@pages/internships/InternshipDetail';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import ErrorPage from '@pages/ErrorPage';
import Navigation from '@components/Navigation';
import LandingPage from '@pages/LandingPage';
import LoginPage from '@pages/auth/LoginPage';
import SignupPage from '@pages/auth/SignupPage';
import VerifyEmailPage from '@pages/auth/VerifyEmailPage';
import ForgotPasswordPage from '@pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@pages/auth/ResetPasswordPage';

import { PublicRoute } from '@components/PublicRoute';
import { ProtectedRoute } from '@components/ProtectedRoute';
import Dashboard from '@pages/Dashboard';
import ProfilePage from '@pages/ProfilePage';
import About from '@pages/About';
import Contact from '@pages/Contact';
import CycleIngenieurPage from '@pages/cycle-ingenieur/CycleIngenieurPage';
import UniversityDetailsPage from '@pages/cycle-ingenieur/UniversityDetailsPage';
import QuizPage from '@pages/QuizPage';
import ExamCertificatesPage from '@pages/ExamCertificatesPage';
import QuizHistoryPage from '@pages/QuizHistoryPage';
import AttemptDetailPage from '@pages/AttemptDetailPage';
import Footer from '@components/Footer';
import UserManagementPage from '@pages/admin/UserManagementPage';
import ContentManagementPage from '@pages/admin/ContentManagementPage';
import ScrapperManagementPage from '@pages/admin/ScrapperManagementPage';
import CustomToaster from '@components/customToaster';
import VerificationBanner from '@components/VerificationBanner';
import { useNavigatePage } from '@components/ui/useNavigatePage';

// Main app content component
function AppContent() {
  const navigate = useNavigatePage();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignupSuccess = (email: string) => {
    setUserEmail(email);
    navigate('/verify-email');
  };

  // const handleIntershipClick = (activityUrn: string) => {
  //   navigate(`/internships/${activityUrn}`);
  // };

  // Show auth pages if not authenticated
  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navigation currentPage={location.pathname} />
      <VerificationBanner />
      <CustomToaster />

      <Routes>
        {/* Home Page - accessible to everyone */}
        <Route
          path="/"
          element={<LandingPage />}
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
              <SignupPage onSignupSuccess={handleSignupSuccess} />
            </PublicRoute>
          }
        />

        {/* Password Reset Routes */}
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        {/* Reset password - accessible even when logged in (user clicks email link) */}
        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
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
            <ProtectedRoute requireVerified={true}>
              {/* Dashboard component for authenticated users */}
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute requireVerified={false}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Semi-public routes - anyone can view, but enhanced for logged-in users */}
        <Route path="/internships" element={<InternshipsList />} />
        <Route path="/internships/:page" element={<InternshipsList />} />
        <Route path="/internship/:urn" element={<InternshipDetail />} /> {/* will require login to apply for internship */}
        <Route path="/cycle-ingenieur" element={<CycleIngenieurPage />} />
        <Route path="/university/:id" element={<UniversityDetailsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/exam-certificates" element={<ExamCertificatesPage />} />
        <Route path="/exam-certificates/quiz" element={<QuizPage />} />

        {/* Quiz History Routes - Protected (requires email verification) */}
        <Route
          path="/quiz-history"
          element={
            <ProtectedRoute requireVerified={true}>
              <QuizHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz-history/:id"
          element={
            <ProtectedRoute requireVerified={true}>
              <AttemptDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Routes */}
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <UserManagementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/scrappers"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <ScrapperManagementPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/contents"
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <ContentManagementPage />
            </ProtectedRoute>
          }
        />

        {/* Error Routes */}
        <Route path="/401" element={<ErrorPage errorCode="401" errorText="Unauthorized" errorDescription="You are not authorized to access this page." />} />
        <Route path="/404" element={<ErrorPage errorCode="404" errorText="Page Not Found" errorDescription="The page you are looking for does not exist." />} />
        <Route path="*" element={<Navigate to="/404" replace />} />

      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;