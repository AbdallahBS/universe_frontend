import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@context/AuthContext';
import { requestPasswordReset } from '@services/authService';
import { updateProfile, uploadProfilePicture, deleteAccount } from '@services/userService';
import { ProfileCard, PasswordResetCard, DangerZoneCard } from '@components/profile';

/**
 * ProfilePage Component
 * 
 * Allows authenticated users to:
 * - View and edit their profile information
 * - Upload/change profile picture
 * - Request a password reset email
 * - Delete their account
 */
const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, refreshUser, logout } = useAuth();

    // Loading states
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingPicture, setUploadingPicture] = useState(false);

    // Feedback states
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.title = 'Universe | Profile';
    }, []);

    /**
     * Handle profile update
     */
    const handleProfileUpdate = async (data: { firstname: string; lastname: string }) => {
        setError('');
        setSuccess('');
        setSavingProfile(true);

        try {
            await updateProfile(data);
            await refreshUser();
            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setSavingProfile(false);
        }
    };

    /**
     * Handle profile picture upload
     */
    const handlePictureUpload = async (file: File) => {
        setError('');
        setUploadingPicture(true);

        try {
            await uploadProfilePicture(file);
            await refreshUser();
            setSuccess('Profile picture updated!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to upload profile picture');
        } finally {
            setUploadingPicture(false);
        }
    };

    /**
     * Handle password reset request
     */
    const handlePasswordReset = async () => {
        if (!user?.email) return;
        await requestPasswordReset(user.email);
    };

    /**
     * Handle account deletion
     */
    const handleDeleteAccount = async (password: string) => {
        await deleteAccount(password);
        await logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-32 left-10 w-32 h-32 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors duration-300"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="font-medium">Back to Dashboard</span>
                </button>

                {/* Error/Success Messages */}
                {error && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 p-4 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400">
                        {success}
                    </div>
                )}

                {/* Profile Card */}
                <ProfileCard
                    user={user}
                    onProfileUpdate={handleProfileUpdate}
                    onPictureUpload={handlePictureUpload}
                    savingProfile={savingProfile}
                    uploadingPicture={uploadingPicture}
                    error={error}
                    setError={setError}
                />

                {/* Password Reset Card */}
                <PasswordResetCard
                    email={user?.email}
                    onRequestReset={handlePasswordReset}
                />

                {/* Danger Zone Card */}
                <DangerZoneCard onDeleteAccount={handleDeleteAccount} />
            </div>
        </div>
    );
};

export default ProfilePage;
