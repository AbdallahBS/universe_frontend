import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

interface ImageCropperModalProps {
    imageFile: File;
    onAccept: (croppedBlob: Blob) => void;
    onDiscard: () => void;
    isUploading?: boolean;
}

/**
 * Creates image from URL
 */
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.src = url;
    });

/**
 * Gets the cropped image as a blob
 */
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
): Promise<Blob> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    // Set canvas size to the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // Return as blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas is empty'));
                }
            },
            'image/jpeg',
            0.9
        );
    });
}

/**
 * ImageCropperModal Component
 * 
 * Full-screen modal for cropping profile pictures with zoom and positioning controls.
 */
const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
    imageFile,
    onAccept,
    onDiscard,
    isUploading = false,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [imageUrl] = useState(() => URL.createObjectURL(imageFile));

    const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleAccept = async () => {
        if (!croppedAreaPixels) return;

        try {
            const croppedBlob = await getCroppedImg(imageUrl, croppedAreaPixels);
            onAccept(croppedBlob);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 0.1, 3));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 0.1, 1));
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <h2 className="text-xl font-semibold text-white">Position Your Photo</h2>
                <button
                    onClick={onDiscard}
                    disabled={isUploading}
                    className="p-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Cropper Area */}
            <div className="relative flex-1 min-h-0">
                <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    classes={{
                        containerClassName: 'absolute inset-0',
                        cropAreaClassName: 'border-4 border-teal-500',
                    }}
                />
            </div>

            {/* Controls */}
            <div className="px-6 py-4 border-t border-slate-700">
                {/* Zoom controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                        onClick={handleZoomOut}
                        disabled={zoom <= 1 || isUploading}
                        className="p-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        disabled={isUploading}
                        className="w-48 h-2 appearance-none bg-slate-700 rounded-full cursor-pointer disabled:opacity-50
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                            [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-teal-500 
                            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                    />
                    <button
                        onClick={handleZoomIn}
                        disabled={zoom >= 3 || isUploading}
                        className="p-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                </div>

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onDiscard}
                        disabled={isUploading}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600/20 text-red-400 border border-red-600/50 
                            rounded-xl hover:bg-red-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="w-5 h-5" />
                        Discard
                    </button>
                    <button
                        onClick={handleAccept}
                        disabled={isUploading}
                        className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl 
                            hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Check className="w-5 h-5" />
                                Accept
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropperModal;
