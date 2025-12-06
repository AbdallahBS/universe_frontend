import React, { useState, useRef, useEffect } from "react";
import { Menu, X, Sun, Moon, User, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

interface NavigationProps {
  currentPage: String;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (page: string) => {
    navigate(page);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user initials for default avatar
  const getUserInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    return 'U';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <img src="/logo.png" alt="Universe" className="w-20 h-20 object-cover dark:brightness-0 dark:invert" />
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Items */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => handleNavClick("/")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "/"
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick("/internships")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "/internships"
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Internships
              </button>
              <button
                onClick={() => handleNavClick("/cycle-ingenieur")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "/cycle-ingenieur"
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Engineering Cycle
              </button>
              <span
                className="text-slate-400 dark:text-slate-500 cursor-not-allowed px-3 py-2 rounded-md text-sm font-medium"
              >
                Alternance
              </span>
              <button
                onClick={() => handleNavClick("/about")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "/about"
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("/contact")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === "/contact"
                  ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {isAuthenticated && user ? (
              /* Profile Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {/* Profile Picture or Default Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium text-sm overflow-hidden">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => handleNavClick('/dashboard')}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </button>

                    <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Sign In / Sign Up Buttons */
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === "/login"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick("/signup")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${currentPage === "/signup"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700">
          {/* Mobile Navigation Items */}
          <button
            onClick={() => handleNavClick("/")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "/"
              ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            Home
          </button>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Destinations
          </a>
          <button
            onClick={() => handleNavClick("/internships")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "/internships"
              ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            Internships
          </button>
          <button
            onClick={() => handleNavClick("/cycle-ingenieur")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "/cycle-ingenieur"
              ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            Engineering Cycle
          </button>
          <button
            onClick={() => handleNavClick("/about")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "/about"
              ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("/contact")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "/contact"
              ? "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
          >
            Contact
          </button>

          {/* Mobile Auth Section */}
          <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
            {isAuthenticated && user ? (
              <>
                {/* User Info */}
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-medium">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        getUserInitials()
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleNavClick('/dashboard')}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/login")}
                  className={`block w-full text-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${currentPage === "/login"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavClick("/signup")}
                  className={`block w-full text-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${currentPage === "/signup"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
