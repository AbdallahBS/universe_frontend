import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '@context/AuthContext';
import AuthModal from './AuthModal';
import ModalPortal from './ModalPortal';

interface AuthGuardedListItemProps {
  children: React.ReactNode;
  redirectUrl?: string;
  isDummy?: boolean;
}

/**
 * AuthGuardedListItem Component
 * 
 * Wraps list items with an authentication guard.
 * - Real items: Visible and readable but non-clickable for unauthenticated users
 * - Dummy items: Show a foggy/blur effect with "View More" button to trigger authentication
 * - Allows full interaction for authenticated users
 */
const AuthGuardedListItem: React.FC<AuthGuardedListItemProps> = ({
  children,
  redirectUrl = '/internships',
  isDummy = false
}) => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // If user is authenticated, show content normally
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // For real items: Show content with clickable overlay to trigger auth modal
  if (!isDummy) {
    return (
      <>
        <div className="relative group">
          {/* Content wrapper with disabled interactions */}
          <div className="pointer-events-none">
            {children}
          </div>

          {/* Clickable overlay */}
          <div className="absolute inset-0 bg-transparent rounded-3xl transition-all duration-300 pointer-events-auto hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAuthModalOpen(true);
            }}
          />
        </div>

        {/* Auth Modal */}
        <ModalPortal>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            redirectUrl={redirectUrl}
            title="Sign in to view internships"
            description="Please sign in to explore all internship opportunities available for you."
          />
        </ModalPortal>
      </>
    );
  }

  // For dummy items: Show content with foggy overlay and button
  return (
    <>
      <div className="relative group">
        {/* Content wrapper with disabled interactions */}
        <div className="pointer-events-none">
          {children}
        </div>

        {/* Foggy overlay effect - only for dummy items */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/40 dark:from-slate-900/95 dark:via-slate-900/70 dark:to-slate-900/40 backdrop-blur-sm rounded-3xl transition-all duration-300 pointer-events-auto" />

        {/* View More Button */}
        <div className="absolute inset-0 flex items-center justify-center rounded-3xl pointer-events-auto">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAuthModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Lock className="w-4 h-4" />
            <span>View More</span>
          </button>
        </div>
      </div>

      {/* Auth Modal - Using Portal to render at root level */}
      <ModalPortal>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          redirectUrl={redirectUrl}
          title="Sign in to view internships"
          description="Please sign in to explore all internship opportunities available for you."
        />
      </ModalPortal>
    </>
  );
};

export default AuthGuardedListItem;
