import React, { useRef, useState } from 'react';
import {
    User,
    Mail,
    CheckCircle2,
    Pencil,
    Camera,
    Loader2
} from 'lucide-react';
import ImageCropperModal from '@components/ImageCropperModal';

interface ProfileCardProps {
    user: {
        firstname?: string;
        lastname?: string;
        email?: string;
        profilePicture?: string | null;
        isVerified?: boolean;
    } | null;
    onProfileUpdate: (data: { firstname: string; lastname: string }) => Promise<void>;
    onPictureUpload: (file: File) => Promise<void>;
    savingProfile: boolean;
    uploadingPicture: boolean;
    error: string;
    setError: (error: string) => void;
}

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * ProfileCard Component
 * 
 * Displays user avatar, name, email and handles profile editing.
 */
const ProfileCard: React.FC<ProfileCardProps> = ({
    user,
    onProfileUpdate,
    onPictureUpload,
    savingProfile,
    uploadingPicture,
    error,
    setError,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
    });

    // Image cropper state
    const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
    const [showCropper, setShowCropper] = useState(false);

    /**
     * Get user initials for avatar
     */
    const getInitials = () => {
        if (!user) return 'U';
        return `${user.firstname?.charAt(0) || ''}${user.lastname?.charAt(0) || ''}`.toUpperCase();
    };

    /**
     * Handle save profile
     */
    const handleSave = async () => {
        await onProfileUpdate(editData);
        setIsEditing(false);
    };

    /**
     * Handle cancel edit
     */
    const handleCancel = () => {
        setIsEditing(false);
        setEditData({
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
        });
    };

    /**
     * Handle picture selection - opens cropper
     */
    const handlePictureSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        event.target.value = '';

        if (file.size > MAX_FILE_SIZE) {
            setError('File too large. Maximum size is 5MB.');
            return;
        }

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            setError('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
            return;
        }

        setSelectedImageFile(file);
        setShowCropper(true);
    };

    /**
     * Handle crop accept
     */
    const handleCropAccept = async (croppedBlob: Blob) => {
        const croppedFile = new File(
            [croppedBlob],
            selectedImageFile?.name || 'profile.jpg',
            { type: 'image/jpeg' }
        );

        await onPictureUpload(croppedFile);
        setShowCropper(false);
        setSelectedImageFile(null);
    };

    /**
     * Handle crop discard
     */
    const handleCropDiscard = () => {
        setShowCropper(false);
        setSelectedImageFile(null);
    };

    // Sync editData when user changes
    React.useEffect(() => {
        if (user) {
            setEditData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
            });
        }
    }, [user]);

    return (
        <>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50 mb-8 animate-fade-in-up">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-6 h-6 text-teal-500" />
                        Profile
                    </h1>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-1 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                    {/* Avatar with upload */}
                    <div className="relative group">
                        {user?.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt={user.firstname}
                                className="w-24 h-24 rounded-full object-cover border-4 border-teal-500/30 dark:border-teal-400/30 shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-teal-500/30 dark:border-teal-400/30">
                                {getInitials()}
                            </div>
                        )}

                        {/* Upload overlay */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingPicture}
                            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                        >
                            {uploadingPicture ? (
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                            ) : (
                                <Camera className="w-6 h-6 text-white" />
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={handlePictureSelect}
                            className="hidden"
                        />
                    </div>

                    {/* User info or edit form */}
                    <div className="flex-1 w-full">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.firstname}
                                            onChange={(e) => setEditData({ ...editData, firstname: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editData.lastname}
                                            onChange={(e) => setEditData({ ...editData, lastname: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <Mail className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        disabled={savingProfile}
                                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {savingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    {user?.firstname} {user?.lastname}
                                </h2>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mt-1">
                                    <Mail className="w-4 h-4" />
                                    <span>{user?.email}</span>
                                </div>
                                {user?.isVerified && (
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 mt-1 text-sm">
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Email verified</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Cropper Modal */}
            {showCropper && selectedImageFile && (
                <ImageCropperModal
                    imageFile={selectedImageFile}
                    onAccept={handleCropAccept}
                    onDiscard={handleCropDiscard}
                    isUploading={uploadingPicture}
                />
            )}
        </>
    );
};

export default ProfileCard;
