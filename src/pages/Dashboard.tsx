import { useAuth } from '@context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Rocket, MapPin, Sparkles, Bookmark, X, Clock, Loader2 } from 'lucide-react';
import TunisiaMap from '../components/TunisiaMap';
import { getSavedInternships, unsaveInternship } from '@services/savedInternshipsService';
import { LinkedInPost } from 'types/resource';
import { timeAgo } from '@utils/helpers';

interface DashboardProps {
}

interface SavedInternship extends LinkedInPost {
  savedAt?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [savedInternships, setSavedInternships] = useState<SavedInternship[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Universe | Dashboard';
    fetchSavedInternships();
  }, []);

  const fetchSavedInternships = async () => {
    try {
      setLoadingSaved(true);
      const data = await getSavedInternships();
      setSavedInternships(data);
    } catch (error) {
      console.error('Error fetching saved internships:', error);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleRemoveSaved = async (urn: string) => {
    setRemovingId(urn);
    try {
      await unsaveInternship(urn);
      setSavedInternships(prev => prev.filter(i => i.urn?.activity_urn !== urn));
    } catch (error) {
      console.error('Error removing saved internship:', error);
    } finally {
      setRemovingId(null);
    }
  };

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstname?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/15 dark:bg-blue-500/10 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        {/* Section 1: Personalized Welcome */}
        <div className="mb-10 animate-fade-in-up">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.firstname}
                    className="w-20 h-20 rounded-full object-cover border-4 border-teal-500/30 dark:border-teal-400/30 shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg border-4 border-teal-500/30 dark:border-teal-400/30">
                    {getInitials()}
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-800"></div>
              </div>

              {/* Welcome Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                  <span className="text-sm font-medium text-teal-600 dark:text-teal-400">Welcome back!</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
                  Hello, {user?.firstname || 'there'}! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Saved Internships */}
        <div className="mb-10 animate-fade-in-up animation-delay-200">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-teal-500" />
            Saved Internships
          </h2>

          {loadingSaved ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
            </div>
          ) : savedInternships.length === 0 ? (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No saved internships yet</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">Browse internships and click the bookmark icon to save them here.</p>
              <button
                onClick={() => navigate('/internships')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedInternships.slice(0, 6).map((internship) => (
                <div
                  key={internship._id}
                  className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl transition-all duration-300"
                >
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSaved(internship.urn?.activity_urn);
                    }}
                    disabled={removingId === internship.urn?.activity_urn}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors z-10"
                    title="Remove from saved"
                  >
                    {removingId === internship.urn?.activity_urn ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>

                  <div
                    onClick={() => navigate(`/internship/${internship.urn?.activity_urn}`)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 pr-8 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {internship.title || internship.text?.substring(0, 60) + '...'}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{timeAgo(internship.posted_at?.timestamp, Date.now())}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                        {internship.author?.first_name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-xs text-slate-600 dark:text-slate-400 truncate">
                        {internship.author?.first_name} {internship.author?.last_name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedInternships.length > 6 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-teal-600 dark:text-teal-400 hover:underline">
                View all {savedInternships.length} saved internships
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Quick Actions */}
        <div className="mb-10 animate-fade-in-up animation-delay-300">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-teal-500" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Browse Internships Card */}
            <button
              onClick={() => navigate('/internships')}
              className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 dark:from-teal-500/10 dark:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Browse Internships
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Discover PFE offers & opportunities
                  </p>
                </div>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                <span className="text-teal-500 dark:text-teal-400 text-2xl">→</span>
              </div>
            </button>

            {/* Cycle Ingénieur Card */}
            <button
              onClick={() => navigate('/cycle-ingenieur')}
              className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-left overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    Cycle Ingénieur
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Explore engineering path options
                  </p>
                </div>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                <span className="text-purple-500 dark:text-purple-400 text-2xl">→</span>
              </div>
            </button>
          </div>
        </div>

        {/* Section 3: Coming Soon - Tunisia Map Feature */}
        <div className="animate-fade-in-up animation-delay-400">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                {/* Coming Soon Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
                  <Rocket className="w-4 h-4" />
                  COMING SOON
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  Don't search for an internship
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                    {' '}— let the internship find you
                  </span>
                </h2>

                <p className="text-slate-400 text-lg mb-6">
                  Our smart matching system will automatically connect you with the perfect opportunities across Tunisia.
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    <span>5+ Cities</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-teal-400" />
                    <span>100+ Companies</span>
                  </div>
                </div>
              </div>

              {/* Right: Tunisia Map */}
              <div className="relative">
                <TunisiaMap />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;