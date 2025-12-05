import { useAuth } from '@context/AuthContext';
import React, { useEffect } from 'react';

interface DashboardProps {
}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
  useEffect(() => {
    document.title = 'Universe | Dashboard';
  }, []);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-slate-700 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome back, {user?.firstname}!
              </h1>
              <p className="text-gray-600 dark:text-slate-400 mb-6">
                You are successfully logged in to your account.
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-500">
                Use the profile menu in the navigation bar to logout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;