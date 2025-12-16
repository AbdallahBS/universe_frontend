import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Shield, Ban, UserCheck, Loader2, UserX } from 'lucide-react';
import { changerole, deleteUser, getUsers } from '@services/adminService';
import LoadingSpinner from '@components/ui/LoadingSpinner';

interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
  createdAt: string;
  lastSeen: string;
}

const UserManagementPage: React.FC = () => {

    useEffect(() => {
        document.title = 'Universe | User Management';
        getUsersList();
    }, []);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u._id));
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'moderator':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
  };

    const getUsersList = async () => {
    try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response.data);
        console.log(response.data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
    }
  }

  const handleDeleteUsers = async () => {
     try {
        setLoading(true);
        selectedUsers.forEach(async (userId) => {
           await deleteUser(userId);
        });
        await getUsersList();
        setLoading(false);
    } catch (error) {
        console.error('Error deleting user:', error);
        setLoading(false);
    }
  };

  const handlePromoteToAdmin = async () => {
    try {
        setLoading(true);
        selectedUsers.forEach(async (userId) => {
           await changerole(userId, true);
        });
        await getUsersList();
        setLoading(false);
    } catch (error) {
        console.error('Error promoting user:', error);
        setLoading(false);
    }
  };

    const handleDowngradeToUser = async () => {
     try {
        setLoading(true);
        selectedUsers.forEach(async (userId) => {
           await changerole(userId, false);
        });
        await getUsersList();
        setLoading(false);
    } catch (error) {
        console.error('Error downgrading user:', error);
        setLoading(false);
    }
  };

  return (
  <>
    <LoadingSpinner loading={loading} />

    {!loading && 
    (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-64 right-20 w-24 h-24 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-teal-200/15 dark:bg-teal-500/10 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  User Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage user accounts, roles, and permissions across the platform
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {users.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 space-y-4 animate-fade-in-up animation-delay-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users by email, first name, or last name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 backdrop-blur-sm"
            />
          </div>

          {/* Action Buttons */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-wrap gap-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {selectedUsers.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePromoteToAdmin}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'promote' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <UserCheck className="w-4 h-4" />
                  Promote to Admin
                </button>

                <button
                  onClick={handleDowngradeToUser}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'downgrade' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <UserX className="w-4 h-4" />
                  Downgrade to Student
                </button>

                <button
                  onClick={handleDeleteUsers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Trash2 className="w-4 h-4" />
                  Delete Users
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={toggleAllUsers}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                      selectedUsers.includes(user._id) ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => toggleUserSelection(user._id)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm">
                          {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {user.firstname} {user.lastname}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(role)}`}
                          >
                            {role === 'admin' && <Shield className="w-3 h-3" />}
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {new Date(user.createdAt).toDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {(user.lastSeen == null) ? "No opened sessions found" : new Date(user.lastSeen).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No users found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    )}
  </>
  );
};

export default UserManagementPage;
