import React, { useEffect } from 'react';
import { Sparkles, ArrowRight, Globe, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
}

const LandingPage: React.FC<LandingPageProps> = ({ }) => {
  useEffect(() => {
    document.title = 'Universe';
  }, []);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 dark:bg-teal-500/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-float animation-delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 dark:bg-blue-500/15 rounded-full blur-xl animate-float animation-delay-500"></div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3334_1px,transparent_1px),linear-gradient(to_bottom,#3334_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-teal-200/50 dark:border-teal-700/50 rounded-full px-4 py-2 shadow-lg animate-fade-in-up animation-delay-200">
                <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Join the Adventure</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight animate-fade-in-up animation-delay-400">
                  Universe,
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-400">
                    let's change
                  </span>
                  <br />
                  together
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg animate-fade-in-up animation-delay-500">
                  With UNIVERSE, navigating university life in Tunisia becomes easier. Discover PFE offers, internships, engineering cycle paths, and alternance opportunities — all in one place. Build the future you deserve.                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                <button
                  onClick={() => navigate('/signup')}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span>Join Us</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Login
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-8 animate-fade-in-up animation-delay-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">50PFE Offers</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">internships</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">2025</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Engineering cycle paths</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Documents</div>
                </div>


              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="relative animate-fade-in-right animation-delay-800">
              {/* Main Image Container */}
              <div className="relative">
                {/* Background Image */}
                <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Adventure landscape"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Your Future</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Build the future you deserve</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float animation-delay-1000">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Community</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Connect & explore</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-float animation-delay-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Instant</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Access to all resources</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;