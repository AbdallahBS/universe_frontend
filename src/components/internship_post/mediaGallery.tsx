import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Play, FileText, X, FileWarning } from "lucide-react";
import LoadingSpinner from "@components/ui/LoadingSpinner";

interface Media {
  media_type: "image" | "video" | "pdf";
  thumbnail?: string;
  url: string;
  title?: string;
  documentPage?: number;
}

interface MediaGalleryProps {
  media: Media[];
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ media }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [expandedMedia, setExpandedMedia] = useState<Media | null>(null);

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentMediaIndex];

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    setIsLoading(true);
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  };

  const renderMediaThumbnail = (item: Media) => {
    switch (item.media_type) {
      case "image":
        return (
          <img
            src={`https://corsproxy.io/?url=${item.url}`}
            alt={item.title || "Internship media"}
            className="w-full h-full object-cover"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        );
      case "video":
        return (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group w-full h-full block rounded-xl overflow-hidden shadow-md"
          >
            {/* Thumbnail Image */}
            <img
              src={`https://corsproxy.io/?url=${item.thumbnail}`}
              alt="Video Thumbnail"
              className="w-full h-full object-cover group-hover:brightness-90 transition"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />

            {/* Play Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/40 group-hover:bg-black/50 transition p-4 rounded-full">
                <Play className="w-10 h-10 text-white" />
              </div>
            </div>
          </a>
        );
      case "pdf":
        return (
          <div className="relative w-full h-full flex">
            {" "}
            {/* Left: Thumbnail */}
            <div className="w-[60%] h-full bg-slate-100 flex items-center justify-center">
              {item.thumbnail ? (
                <img
                  src={`https://corsproxy.io/?url=${item.thumbnail}`}
                  alt="PDF Preview"
                  className="w-full h-full object-fill"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              ) : (
                <FileWarning className="w-14 h-14 text-slate-300" />
              )}
            </div>
            {/* Right: Content */}
            <div className="w-[40%] h-full p-2 flex flex-col justify-center items-center text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-800 font-semibold mb-1">PDF Document</p>
              <p className="text-slate-800 font-semibold mb-1">
                {item.title ? `title : ${item.title}` : "Untitled"}
              </p>

              <p className="text-slate-500 text-sm mb-3">
                {item.documentPage
                  ? `${item.documentPage} Pages is found.`
                  : "No pages found."}
              </p>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center gap-2 px-3 py-2 w-1/2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                View PDF
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="space-y-4 animate-fade-in-up animation-delay-300">
        <h2 className="text-2xl font-bold text-slate-900">Media</h2>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden">
          <div className="relative aspect-video bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
            <div className="relative w-full h-full">
{/* Loading Spinner */}
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center z-30 bg-slate-100/40">
        <LoadingSpinner loading={isLoading} fullScreen={false} />
      </div>
    )}

              {renderMediaThumbnail(currentMedia)}
            </div>

            {media.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-900" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-slate-900" />
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-1 bg-white/90 rounded-full px-3 py-1">
                  {media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMediaIndex
                          ? "bg-teal-600 w-6"
                          : "bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {expandedMedia && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {expandedMedia.title || "Media"}
              </h3>
              <button
                onClick={() => setExpandedMedia(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>
            <div className="p-4">{renderMediaThumbnail(expandedMedia)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaGallery;
