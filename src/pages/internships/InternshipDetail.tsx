import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User2,
  PanelBottom,
  GitCompareArrows,
  Briefcase,
  ExternalLink,
  Linkedin,
  Share2,
  Bookmark,
  Tag,
} from "lucide-react";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ScrollButtons from "@components/ui/ScrollButtons";
import { getInternship } from "@services/internshipService";
import { LinkedInPost } from "types/resource";
import { timeAgo } from "@utils/helpers";
import CommentsSection from "@components/internship_post/statsSection";
import MediaGallery from "@components/internship_post/mediaGallery";
import Linkify from "linkify-react";

interface InternshipDetailProps {
}

const InternshipDetail: React.FC<InternshipDetailProps> = ({ }) => {
  const navigate = useNavigate();
  const { urn } = useParams();

  const [searchParams] = useSearchParams();
  const PreviousPageNumber = searchParams.get("prevPage");

  const [internship, setInternship] = useState<LinkedInPost>();
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    document.title = "Universe | Internships";
    fetchInternshipDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fetchInternshipDetails = async () => {
    try {
      setLoading(true);
      if (urn) {
        const response = await getInternship(urn);
        console.log(response);

        if (response.success) {
          setInternship(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching internship details:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMediaLinks = (item: LinkedInPost) => {
    let res: {
      media_type: 'image' | 'video' | 'pdf';
      thumbnail?: string;
      url: string;
      title?: string;
      documentPage?: number;
    }[] = [];

    if (item.reshared_post) {
      res = [...res, ...loadMediaLinks(item.reshared_post)];
    }

    if (item?.media?.type.includes("video")) {
      res.push({
        media_type: "video",
        thumbnail: item?.media?.thumbnail!,
        url: item?.media?.url
      });
    }
    if (item?.media?.type.includes("image") || (item?.media?.images?.length ?? 0) > 0) {
      item!.media!.images?.forEach(image => {
        res.push({
          media_type: "image",
          url: image.url
        });
      });

    }
    if (item?.document) {
      res.push({
        media_type: "pdf",
        title: item?.document?.title,
        url: item?.document?.url,
        thumbnail: item?.document?.thumbnail,
        documentPage: item?.document?.page_count
      });
    }
    return res;
  }

  const getThumbnailUrl = (post: LinkedInPost): string | null => {
    if (post.media?.thumbnail) {
      return post.media.thumbnail;
    }
    if (post.media?.images && post.media.images.length > 0) {
      return post.media.images[0].url;
    }
    if (post.document?.thumbnail) {
      return post.document.thumbnail;
    }
    if (post.reshared_post) {
      const nested = getThumbnailUrl(post.reshared_post);
      if (nested) return nested;
    }
    return null;
  };

  const handleViewOriginalPost = () => {
    if (internship?.url) {
      window.open(internship.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async () => {
    if (navigator.share && internship?.url) {
      try {
        await navigator.share({
          title: internship.title || 'Internship Opportunity',
          text: internship.text?.substring(0, 100) + '...',
          url: internship.url,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else if (internship?.url) {
      navigator.clipboard.writeText(internship.url);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return <LoadingSpinner loading={loading} fullScreen />;
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/50 dark:to-blue-900/50 flex items-center justify-center">
            <Briefcase className="w-12 h-12 text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Internship Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/internships")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Internships
          </button>
        </div>
      </div>
    );
  }

  const bannerImage = getThumbnailUrl(internship);
  const authorName = internship.reshared_post?.author.first_name
    ? `${internship.reshared_post.author.first_name} ${internship.reshared_post.author.last_name}`
    : `${internship.author.first_name} ${internship.author.last_name}`;
  const authorProfileUrl = internship.reshared_post?.author.profile_url ?? internship.author.profile_url;
  const authorProfilePicture = internship.reshared_post?.author.profile_picture ?? internship.author.profile_picture;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 to-blue-200/20 dark:from-teal-700/10 dark:to-blue-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 dark:from-purple-700/10 dark:to-pink-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-teal-200/20 dark:from-blue-700/10 dark:to-teal-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative pt-20">
        <div className="relative w-full h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
          {bannerImage ? (
            <img
              src={`https://corsproxy.io/?url=${encodeURIComponent(bannerImage)}`}
              alt={internship.title ?? "Internship banner"}
              className="h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-teal-500 via-blue-600 to-purple-700 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
              </div>
              <Briefcase className="w-20 h-20 mb-4 opacity-80 animate-bounce" style={{ animationDuration: '3s' }} />
              <p className="text-2xl sm:text-3xl font-bold">Opportunity Spotlight</p>
              <p className="text-white/70 mt-2">Discover your next career move</p>
            </div>
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-4 sm:left-8 z-20">
            <button
              onClick={() => navigate(`/internships/${PreviousPageNumber || ''}`)}
              className="group inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="hidden sm:inline">Back to Internships</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              title="Share"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2.5 rounded-full backdrop-blur-md border shadow-lg transition-all duration-300 ${isBookmarked
                  ? 'bg-teal-500/80 border-teal-400/50 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30'
                }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-12">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                {/* Author Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl border-2 border-white/30 overflow-hidden bg-white/10 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    {authorProfilePicture ? (
                      <img
                        src={`https://corsproxy.io/?url=${authorProfilePicture}`}
                        alt="Author avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600">
                        <User2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Author Info */}
                <div className="flex-1 min-w-0 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-teal-500/80 to-blue-500/80 backdrop-blur-sm text-xs sm:text-sm font-semibold">
                      <Briefcase className="w-3 h-3" />
                      Featured Internship
                    </span>
                    {internship.category && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs sm:text-sm font-medium border border-white/20">
                        <Tag className="w-3 h-3" />
                        {internship.category}
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3 line-clamp-2">
                    {internship.title ?? (internship.reshared_post?.text ?? internship.text)?.substring(0, 80)}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-white/80">
                    <a
                      href={authorProfileUrl ?? ""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      {authorName}
                    </a>

                    {internship.reshared_post && (
                      <span className="inline-flex items-center gap-1.5 text-teal-200">
                        <GitCompareArrows className="w-4 h-4" />
                        <span>Reshared by </span>
                        <a href={internship.author.profile_url ?? ""} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                          {internship.author.first_name}
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    About this Opportunity
                  </h2>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300 [&_a]:text-teal-600 dark:[&_a]:text-teal-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-teal-700 dark:hover:[&_a]:text-teal-300 text-sm sm:text-base">
                    <Linkify
                      options={{
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }}
                    >
                      {internship.reshared_post ? (
                        <>
                          {internship.text && (
                            <div className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border-l-4 border-teal-500">
                              <p className="text-sm text-slate-500 dark:text-slate-400 italic mb-1">Comment from resharer:</p>
                              <p className="text-slate-700 dark:text-slate-300">{internship.text}</p>
                            </div>
                          )}
                          <p>{internship.reshared_post.text}</p>
                        </>
                      ) : (
                        <p>{internship.text}</p>
                      )}
                    </Linkify>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Gallery */}
            <MediaGallery media={loadMediaLinks(internship)} />

            {/* Stats Section */}
            <CommentsSection stats={internship.stats} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Info</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Posted</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {timeAgo(internship.posted_at.timestamp, Date.now())}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Date</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {new Date(internship.posted_at.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                      <PanelBottom className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Post Type</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                        {internship.post_type}
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Original Post Button */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleViewOriginalPost}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>View Original Post</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </button>

                  <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                    Opens in LinkedIn
                  </p>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Posted By</h3>

                <a
                  href={authorProfileUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-slate-200 dark:ring-slate-600 group-hover:ring-teal-500 transition-all duration-300">
                    {authorProfilePicture ? (
                      <img
                        src={`https://corsproxy.io/?url=${authorProfilePicture}`}
                        alt={authorName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
                        <User2 className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {authorName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Linkedin className="w-3 h-3" />
                      View Profile
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollButtons />
    </div>
  );
};

export default InternshipDetail;
