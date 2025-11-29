import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Calendar,
  User2,
  PanelBottom,
  GitCompareArrows,
  Briefcase,
} from "lucide-react";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import ScrollButtons from "@components/ui/ScrollButtons";
import { getInternship } from "@services/internshipService";
import { LinkedInPost } from "types/resource";
import { timeAgo } from "@utils/helpers";
import CommentsSection from "@components/internship_post/statsSection";
import MediaGallery from "@components/internship_post/mediaGallery";
import Linkify from "linkify-react";

interface InternshipDetailProps {}

const InternshipDetail: React.FC<InternshipDetailProps> = ({}) => {
  const navigate = useNavigate();
  const { urn } = useParams();
  const { user, isLoading } = useAuth();

  const [internship, setInternship] = useState<LinkedInPost>();
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    document.title = "Universe | Internships";
    setLoading(isLoading);
    fetchInternshipDetails();
  }, [isLoading]);

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

  const loadMediaLinks = (item : LinkedInPost) => {
    let res: { media_type: 'image' | 'video' | 'pdf';
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

  const handleApply = () => {
    setApplying(true);
    setTimeout(() => {
      alert("Application submitted successfully! We will contact you soon.");
      setApplying(false);
    }, 1500);
  };

  if (loading) {
    return <LoadingSpinner loading={loading} fullScreen />;
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-600">Internship not found</p>
          <button
            onClick={() => {
              navigate("/internships");
            }}
            className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const bannerImage = getThumbnailUrl(internship);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-24">
      <div className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden rounded-b-[2.5rem] shadow-2xl">
        {bannerImage ? (
          <img
            src={`https://corsproxy.io/?url=${encodeURIComponent(bannerImage)}`}
            alt={internship.title ?? "Internship banner"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 flex flex-col items-center justify-center text-white">
            <Briefcase className="w-20 h-20 mb-4 opacity-80" />
            <p className="text-2xl font-semibold">Opportunity Spotlight</p>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-between max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
          <button
            onClick={() => navigate("/internships")}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Internships</span>
          </button>
          <div className="space-y-6 pb-6">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex-shrink-0 w-20 h-20 rounded-full border-2 border-white/40 overflow-hidden bg-white/20 backdrop-blur">
                {internship.reshared_post ? (
                  internship.reshared_post.author.profile_picture ? (
                    <img
                      src={`https://corsproxy.io/?url=${internship.reshared_post.author.profile_picture}`}
                      alt="Author avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User2 className="w-10 h-10 text-white" />
                    </div>
                  )
                ) : internship.author.profile_picture ? (
                  <img
                    src={`https://corsproxy.io/?url=${internship.author.profile_picture}`}
                    alt="Author avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User2 className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm uppercase tracking-[0.35em] text-white/70 mb-2">Featured Internship</p>
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-2">
                  {internship.title ?? internship.reshared_post?.text ?? internship.text}
                </h1>
                <p className="text-lg text-teal-100">
                  <a
                    href={internship.reshared_post?.author.profile_url ?? internship.author.profile_url ?? ""}
                    target="_blank"
                    className="font-semibold hover:text-white"
                  >
                    {internship.reshared_post?.author.first_name ?? internship.author.first_name}{" "}
                    {internship.reshared_post?.author.last_name ?? internship.author.last_name}
                  </a>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-teal-100">
              {internship.reshared_post && (
                <div className="flex items-start gap-2">
                  <GitCompareArrows className="w-4 h-4 mt-0.5" />
                  <span>
                    Reshared by{" "}
                    <a href={internship.author.profile_url ?? ""} target="_blank" className="underline hover:text-white">
                      {internship.author.first_name} {internship.author.last_name}
                    </a>
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{timeAgo(internship.posted_at.timestamp, Date.now())}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(internship.posted_at.date).toDateString().replace(/ /g, " / ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <PanelBottom className="w-4 h-4" />
                <span>{internship.post_type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-10 pb-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-0 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            <div className="space-y-4 animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-bold text-slate-900">
                About this Internship
              </h2>
              <p className="leading-relaxed whitespace-pre-line text-slate-600 [&_a]:text-blue-600 [&_a]:underline">
                <Linkify
                  options={{
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }}
                >
                  {internship.reshared_post ? (
                    <> 
                     <span className="text-sm text-gray-500 italic">Reshared : {internship.text}</span><br />
                     <span className="font-mono">{internship.reshared_post.text}</span>
                     </>
                    ) : (
                      <span className="font-mono">{internship.text}</span>
                    ) }
                  {}
                </Linkify>
              </p>
            </div>

            <MediaGallery media={loadMediaLinks(internship)} />

            {/* {internship.stats && (
              <div className="space-y-4 animate-fade-in-up animation-delay-500">
                <h2 className="text-2xl font-bold text-slate-900">Stats</h2>
                <ul className="space-y-3">
                  {internship.stats && (
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        {internship.stats.total_reactions} Reactions
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )} */}

            {/* {internship.benefits && internship.benefits.length > 0 && (
              <div className="space-y-4 animate-fade-in-up animation-delay-600">
                <h2 className="text-2xl font-bold text-slate-900">Benefits</h2>
                <ul className="space-y-3">
                  {internship.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            <CommentsSection stats={internship.stats} />

            <div className="pt-6 animate-fade-in-up animation-delay-700">
              <button
                onClick={handleApply}
                disabled={isLoading || !user || applying}
                className="w-full group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {applying ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-white border-t-transparent border-l-transparent border-r-transparent border-2 mr-2"></div>
                    <span>Submitting Application...</span>
                  </>
                ) : isLoading ? (
                  <>
                    <span>Loading...</span>
                  </>
                ) : user ? (
                  <>
                    <span>Apply Now</span>
                    <Sparkles className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    <span>Login is required to apply</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScrollButtons />
    </div>
  );
};

export default InternshipDetail;
