import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  currentPage: String;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (page: string) => {
    navigate(page);
    setIsMenuOpen(false); // Close menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-600 hover:text-slate-900`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                      <span className="text-xl text-white font-bold">U</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-800">
                      NIVERSE
                    </span>
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === "/"
                    ? "text-teal-600 bg-teal-50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Home
              </button>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Score calculator
              </a>
              <button
                onClick={() => handleNavClick("/internships")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === "/internships"
                    ? "text-teal-600 bg-teal-50"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Internships
              </button>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Alternance
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => handleNavClick("/login")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === "/login"
                  ? "bg-teal-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick("/signup")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                currentPage === "/signup"
                  ? "bg-teal-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-slate-200">
          {/* Mobile Navigation Items */}
          <button
            onClick={() => handleNavClick("/")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              currentPage === "/"
                ? "text-teal-600 bg-teal-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </button>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Destinations
          </a>
          <button
            onClick={() => handleNavClick("/internships")}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              currentPage === "/internships"
                ? "text-teal-600 bg-teal-50"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Internships
          </button>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Contact
          </a>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => handleNavClick("/login")}
              className={`block w-full text-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                currentPage === "/login"
                  ? "bg-teal-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleNavClick("/signup")}
              className={`block w-full text-center px-4 py-2 text-base font-medium rounded-lg transition-all duration-200 ${
                currentPage === "/signup"
                  ? "bg-teal-600 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
