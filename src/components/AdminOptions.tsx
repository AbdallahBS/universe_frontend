import React, { useState } from 'react';
import {
  Users,
  FileText,
  Shield,
  Database,
  Trash2,
  ChevronRight,
  Lock,
  Eye,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';

interface AdminOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  textColor: string;
  action: () => void;
  badge?: string;
  lock?: boolean;
}

const AdminOptions: React.FC = () => {
  const {stats} = useAuth();
  const navigate = useNavigate();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const adminOptions: AdminOption[] = [
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-600',
      textColor: 'text-blue-600 dark:text-blue-400',
      action: () => navigate('/admin/users')
    },
    {
      id: 'content',
      title: 'Content Management',
      description: 'Manage scrapped posts',
      icon: FileText,
      gradient: 'from-orange-500 to-red-600',
      textColor: 'text-orange-600 dark:text-orange-400',
      action: () => navigate('/admin/contents')
    },
    {
      id: 'scrapper',
      title: 'Scrapper Management',
      description: 'Init Scrappers and manage Settings & configuration',
      icon: Database,
      gradient: 'from-violet-500 to-purple-600',
      textColor: 'text-violet-600 dark:text-violet-400',
      action: () => navigate('/admin/scrappers'),
    },
    {
      id: 'monitoring',
      title: 'Application Monitoring',
      description: 'Monitor server health and resources metrics',
      icon: Activity,
      gradient: 'from-green-500 to-teal-600',
      textColor: 'text-green-600 dark:text-green-400',
      action: () => console.log('Navigate to monitoring'),
    },
    {
      id: 'dangerzone',
      title: 'Danger Zone',
      description: 'Critical administrative actions, Use with extreme caution',
      icon: Shield,
      gradient: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600 dark:text-rose-400',
      lock: true,
      action: () => console.log('Navigate to security'),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Admin Panel
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Manage and monitor your platform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-green-600 dark:text-green-400">{stats.usersCount.addedUsersPercentage ?? "N/A"}%</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">This month traffic</div>
          </div>
          <div className="text-center px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{stats.sessionsCount.activeUsers ?? "N/A"}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Active users</div>
          </div>
        </div>
      </div>

      {/* Admin Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {adminOptions.map((option) => {
          const Icon = option.icon;
          const isHovered = hoveredOption === option.id;

          return (
            <button
              key={option.id}
              onClick={option.action}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
              className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-left overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Badge */}
              {option.badge && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                  {option.badge}
                </div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title and Description */}
                <h3 className={`text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:${option.textColor} transition-colors`}>
                  {option.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
                  {option.description}
                </p>

                {/* Arrow indicator */}
                <div className={`flex items-center gap-2 ${option.textColor} opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${isHovered ? 'translate-x-0' : '-translate-x-2'}`}>
                  <span className="text-sm font-semibold">Access</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Lock indicator for restricted access */}
              {option.lock && (<div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              </div>)}
            </button>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800/50 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Trash2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">
              Danger Zone
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400 mb-4">
              Critical administrative actions that can permanently affect the platform. Use with extreme caution.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm">
                Clear Cache
              </button>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm">
                Reset Analytics
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm shadow-lg">
                Maintenance Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOptions;
