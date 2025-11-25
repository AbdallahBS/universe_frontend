import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Sparkles,
  Calendar,
  User2,
  PanelBottom,
  GitCompareArrows,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-24 pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/20 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            navigate("/internships");
          }}
          className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors duration-300 animate-fade-in-up"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back to Internships</span>
        </button>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg">
                {
                  internship.reshared_post ? (
                    internship.reshared_post.author.profile_picture ? (
                      <div className="w-20 h-20 rounded-full border-2 border-slate-300 overflow-hidden">
                        <img
                          src={`https://corsproxy.io/?url=${internship.reshared_post.author.profile_picture}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (<User2 className="w-10 h-10 text-teal-600" />)
                  ) : (
                    internship.author.profile_picture ? (
                      <div className="w-20 h-20 rounded-full border-2 border-slate-300 overflow-hidden">
                        <img
                          src={`https://corsproxy.io/?url=${internship.author.profile_picture}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (<User2 className="w-10 h-10 text-teal-600" />)
                  )
                }
                
              </div>

          <div className="flex-1 text-white min-w-0">
                <h2 className="text-4xl font-bold mb-2 truncate">{internship.title ?? internship.reshared_post?.text ?? internship.text}</h2>
                <p className="text-xl text-teal-50 mb-4">
                  <a href={internship.reshared_post?.author.profile_url ?? internship.author.profile_url ?? ""} target="_blank" className="text-slate-100 font-bold hover:text-teal-100">
                    {internship.reshared_post?.author.first_name ?? internship.author.first_name} {internship.reshared_post?.author.last_name ?? internship.author.last_name}
                  </a>
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-teal-50 text-sm">
                  {internship.reshared_post && 
                  (<>
                    <div className="flex items-center gap-1">
                      <GitCompareArrows className="w-4 h-4" />
                      <span>Reshared by <br /> <a href={internship.author.profile_url ?? ""} target="_blank"
                      className="text-slate-100 underline hover:text-teal-100">
                        {internship.author.first_name} {internship.author.last_name}</a>
                      </span>
                    </div>
                  </>)}
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{timeAgo(internship.posted_at.timestamp, Date.now())}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span> {new Date(internship.posted_at.date).toDateString().replace(/ /g, " / ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PanelBottom className="w-4 h-4" />
                    <span>{internship.post_type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
