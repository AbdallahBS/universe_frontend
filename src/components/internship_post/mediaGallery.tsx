import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, FileText, FileWarning } from "lucide-react";
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

  if (!media || media.length === 0) return null;

  const currentMedia = media[currentMediaIndex];
  const isPdf = currentMedia.media_type === "pdf";

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [currentMediaIndex]);

  const handlePrevious = () => {
    setCurrentMediaIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  const renderMediaPreview = (item: Media) => {
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
            className="relative group w-full h-full block rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={`https://corsproxy.io/?url=${item.thumbnail}`}
              alt="Video Thumbnail"
              className="w-full h-full object-cover group-hover:brightness-90 transition"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/40 group-hover:bg-black/60 transition p-4 rounded-full">
                <Play className="w-10 h-10 text-white" />
              </div>
            </div>
          </a>
        );
      case "pdf":
        return (
          <div className="flex flex-col sm:flex-row h-full rounded-2xl overflow-hidden border border-slate-200">
            <div className="sm:w-2/3 h-48 sm:h-auto bg-slate-50 flex items-center justify-center">
              {item.thumbnail ? (
                <img
                  src={`https://corsproxy.io/?url=${item.thumbnail}`}
                  alt="PDF Preview"
                  className="w-full h-full object-contain"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              ) : (
                <FileWarning className="w-14 h-14 text-slate-300" />
              )}
            </div>
            <div className="sm:w-1/3 p-4 flex flex-col justify-center text-center space-y-2">
              <FileText className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-slate-800 font-semibold">{item.title || "PDF Document"}</p>
              <p className="text-slate-500 text-sm">
                {item.documentPage ? `${item.documentPage} pages` : "Page count unavailable"}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-2 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
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

  const renderThumbnail = (item: Media) => {
    if (item.media_type === "image") {
      return (
        <img
          src={`https://corsproxy.io/?url=${item.url}`}
          alt="Media thumbnail"
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }

    if (item.media_type === "video") {
      return (
        <div className="w-full h-full rounded-xl bg-slate-900/80 text-white flex items-center justify-center">
          <Play className="w-5 h-5" />
        </div>
      );
    }

    return (
      <div className="w-full h-full rounded-xl bg-slate-100 text-slate-500 flex flex-col items-center justify-center text-[11px] font-semibold">
        <FileText className="w-4 h-4 mb-1" />
        PDF
      </div>
    );
  };

  return (
    <section className="space-y-4 animate-fade-in-up animation-delay-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Media</h2>
        <span className="text-sm text-slate-500">
          {currentMediaIndex + 1} / {media.length}
        </span>
      </div>

      <div className="bg-white/90 backdrop-blur rounded-3xl border border-slate-200 p-5 shadow-lg">
        <div
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 ${
            isPdf ? "min-h-[320px] sm:min-h-0" : "aspect-video"
          }`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-slate-100/40">
              <LoadingSpinner loading={isLoading} fullScreen={false} />
            </div>
          )}

          {renderMediaPreview(currentMedia)}

          {media.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-slate-900" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-slate-900" />
              </button>
            </>
          )}
        </div>

        {media.length > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentMediaIndex(index)}
                className={`relative flex-shrink-0 h-20 w-32 rounded-2xl border transition-all ${
                  index === currentMediaIndex
                    ? "border-teal-500 ring-2 ring-teal-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                aria-label={`Select media ${index + 1}`}
              >
                {renderThumbnail(item)}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGallery;
