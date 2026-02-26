import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Shield, UserCheck, Loader2, UserX } from 'lucide-react';
import { changerole, deleteUser, getUsers } from '@services/adminService';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { Pagination } from 'types/resource';
import PaginationPage from "@components/Pagination";

interface User {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  roles: string[];
  createdAt: string;
  lastSeen: string;
  status: string;
  isVerified: boolean;
}

const UserManagementPage: React.FC = () => {

    useEffect(() => {
        document.title = 'Universe | User Management';
        getUsersList();
    }, []);

  /* Pagination States */
  const [Pagination, setPagination] = useState<Pagination>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>();
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.status && user.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.lastSeen && new Date(user.lastSeen).toDateString().toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.createdAt && new Date(user.createdAt).toDateString().toLowerCase().includes(searchTerm.toLowerCase()))
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
      case 'super_admin':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case 'admin':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'moderator':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
  };

  const getVerifiedColor = (verified: boolean) => {
    switch (verified) {
      case true:
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case false:
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

    const getUsersList = async (page?: string) => {
    try {
        setLoading(true);
        const response = await getUsers(page);
        setUsers(response.data.users);

        setPagination(response.data.pagination);
        setTotalPages(response.data.pagination?.pages || 1);

        setLoading(false);
    } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
        toast.error('Error fetching users');
    }
  }

const handleDeleteUsers = async () => {
  try {
    setLoading(true);
    // Wait for ALL delete operations to complete
    await Promise.all(
      selectedUsers.map(userId => deleteUser(userId))
    );
    await getUsersList();
    setSelectedUsers([]); // Clear selection after deletion
    setLoading(false);
    toast.success('Users deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    setLoading(false);
    toast.error('Error deleting user');
  }
};

const handlePromoteToAdmin = async () => {
  try {
    setLoading(true);
    // Wait for ALL promote operations to complete
    await Promise.all(
      selectedUsers.map(userId => changerole(userId, true))
    );
    await getUsersList();
    setSelectedUsers([]); // Clear selection after promotion
    setLoading(false);
    toast.success('Users promoted successfully');
  } catch (error) {
    console.error('Error promoting user:', error);
    setLoading(false);
    toast.error('Error promoting user');
  }
};

const handleDowngradeToUser = async () => {
  try {
    setLoading(true);
    // Wait for ALL downgrade operations to complete
    await Promise.all(
      selectedUsers.map(userId => changerole(userId, false))
    );
    await getUsersList();
    setSelectedUsers([]); // Clear selection after downgrade
    setLoading(false);
    toast.success('Users downgraded successfully');
  } catch (error) {
    console.error('Error downgrading user:', error);
    setLoading(false);
    toast.error('Error downgrading user');
  }
};

 const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getUsersList(page.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  User Management
                </h1>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Manage user accounts, roles, and permissions across the platform
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {Pagination?.total ?? "N/A"}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Total Users</div>
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
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 backdrop-blur-sm"
            />
          </div>

          {/* Action Buttons */}
          {selectedUsers.length > 0 && (
            <div className="flex flex-col gap-3 p-3 sm:p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {selectedUsers.length} selected
                </span>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                <button
                  onClick={handlePromoteToAdmin}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white text-sm sm:text-base rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'promote' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <UserCheck className="w-4 h-4" />
                  Promote to Admin
                </button>

                <button
                  onClick={handleDowngradeToUser}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white text-sm sm:text-base rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'downgrade' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <UserX className="w-4 h-4" />
                  Downgrade to Student
                </button>

                <button
                  onClick={handleDeleteUsers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white text-sm sm:text-base rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Trash2 className="w-4 h-4" />
                  Delete Users
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users Table - Desktop View */}
        <div className="hidden lg:block bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
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
                    Is Verified?
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Current Status
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
                            {(role === 'admin' || role === 'super_admin') && <Shield className="w-3 h-3" />}
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getVerifiedColor(user.isVerified)}`}
                          >
                            {user.isVerified ? "Verified" : "Unverified"}
                          </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {user.status ? user.status : "No status available"}
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

        {/* Users Card View - Mobile */}
        <div className="lg:hidden space-y-4 animate-fade-in-up animation-delay-200">
          {filteredUsers.length === 0 ? (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No users found matching your search criteria.
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-4 transition-colors ${
                  selectedUsers.includes(user._id) ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : ''
                }`}
              >
                {/* Checkbox and User Info */}
                <div className="flex items-start gap-3 mb-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleUserSelection(user._id)}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer mt-1"
                  />
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {user.firstname.charAt(0)}{user.lastname.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {user.firstname} {user.lastname}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* Role */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Role</div>
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(role)}`}
                        >
                          {(role === 'admin' || role === 'super_admin') && <Shield className="w-3 h-3" />}
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verified */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Verification</div>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getVerifiedColor(user.isVerified)}`}
                    >
                      {user.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Status</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {user.status ? user.status : "No status"}
                    </div>
                  </div>

                  {/* Joined */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Joined</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {new Date(user.createdAt).toDateString()}
                    </div>
                  </div>
                </div>

                {/* Last Active */}
                <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Last Active</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {(user.lastSeen == null) ? "No opened sessions found" : new Date(user.lastSeen).toDateString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {users.length > 0 && Pagination!.pages > 1 && (
          <PaginationPage
            currentPage={currentPage ?? 0}
            totalPages={totalPages ?? 0}
            onPageChange={handlePageChange}
          />
        )}
    </div>
    )}
  </>
  );
};

export default UserManagementPage;
