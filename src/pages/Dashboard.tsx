import { useAuth } from '@context/AuthContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
  useEffect(() => {
     document.title = 'Universe | Dashboard';
    }, []);
    const navigate = useNavigate()
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
};

export default Dashboard;