import React, { useEffect, useState } from 'react';
import { Briefcase, Clock, ArrowRight } from 'lucide-react';
import LoadingSpinner from "@components/ui/LoadingSpinner";
import PaginationPage from "@components/Pagination";
import { useAuth } from '@context/AuthContext';
import { getInternships } from '@services/internshipService';
import { LinkedInPost, Pagination } from 'types/resource';
import ScrollButtons from '@components/ui/ScrollButtons';
import { timeAgo } from '@utils/helpers';
import InternshipFilters from '@components/internship_post/internshipFilter';
import SectionCarousel from '@components/internship_post/sectionCarousel';

// Thumbnail component with error handling
const ThumbnailImage: React.FC<{ src: string | null; alt: string; className?: string }> = ({ src, alt, className = "" }) => {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100 ${className}`}>
        <Briefcase className="w-16 h-16 text-teal-600 opacity-50" />
      </div>
    );
  }

  return (
    <img
      src={src ? `https://corsproxy.io/?url=${encodeURIComponent(src)}` : undefined}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      onError={() => setImageError(true)}
    />
  );
};

interface InternshipsListProps {
  onInternshipClick: (id: string) => void;
}

const InternshipsList: React.FC<InternshipsListProps> = ({ onInternshipClick }) => {
  const [internships, setInternships] = useState<LinkedInPost[]>([]);

  const [Pagination, setPagination] = useState<Pagination>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();

  const [loading, setLoading] = useState(true);

  const {isLoading} = useAuth();

  useEffect(() => {
    document.title = 'Universe | Internships';
    setLoading(isLoading);
    fetchInternships("1", "10", selectedSections);
  }, [isLoading]);

  /*** SectionCarousel Props*****/
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set(["internship_offers", "internship_requests", "job_offers"]));

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      // update internships
      fetchInternships("1", "10", newSet);
      return newSet;
    });
  };
  /************ */
  const fetchInternships = async (page: string = "1", limit: string = "10", Sections : Set<string> = new Set()) => {
    try {
      setLoading(true);
      const response = await getInternships(page, limit, [...Sections]);
      console.log(response);
      
      if (response.success) {
        setInternships(response.data.internships);
        setPagination(response.data.pagination);

        setCurrentPage(response.data.pagination.page);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchInternships(page.toString(), "10", selectedSections);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getThumbnailUrl = (internship: LinkedInPost): string | null => {
    // Priority: media thumbnail > first image > document thumbnail > reshared post thumbnail
    if (internship.media?.thumbnail) {
      return internship.media.thumbnail;
    }
    if (internship.media?.images && internship.media.images.length > 0) {
      return internship.media.images[0].url;
    }
    if (internship.document?.thumbnail) {
      return internship.document.thumbnail;
    }
    if (internship.reshared_post) {
      const resharedThumbnail = getThumbnailUrl(internship.reshared_post);
      if (resharedThumbnail) return resharedThumbnail;
    }
    return null;
  };

  return (
    <>
    <ScrollButtons />
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 animate-fade-in-up">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-slate-900">
              Available{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600">
                Internships
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover exciting opportunities to kickstart your career and gain valuable experience
            </p>
          </div>

          {loading ? (
            <LoadingSpinner loading={loading} />
          ) : (
            <div className="space-y-4">
              <SectionCarousel selectedSections={selectedSections} toggleSection={toggleSection} />
              <InternshipFilters onSearchChange={() => {}} onFilterChange={() => {}} availableFilters={{ duration: ["past day" ,"past week", "past month"], search_by: ["title", "description", "author"] }} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship, index) => (
                  <div
                    key={internship.urn}
                    onClick={() => onInternshipClick(internship.urn.activity_urn)}
                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Large Featured Image */}
                    <div className="relative w-full h-64 md:h-72 overflow-hidden bg-gradient-to-br from-teal-100 via-blue-100 to-purple-100">
                      <ThumbnailImage 
                        src={getThumbnailUrl(internship)} 
                        alt={internship.title ?? internship.reshared_post?.text ?? internship.text ?? "Internship thumbnail"}
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Post type badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-semibold rounded-full shadow-lg">
                          {internship.post_type}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                          {(internship.reshared_post?.author.first_name ?? internship.author.first_name)?.[0]}
                          {(internship.reshared_post?.author.last_name ?? internship.author.last_name)?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {internship.reshared_post?.author.first_name ?? internship.author.first_name} {internship.reshared_post?.author.last_name ?? internship.author.last_name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            <span>{timeAgo(internship.posted_at.timestamp, Date.now())}</span>
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300 mb-3 line-clamp-2">
                        {internship.title ?? internship.reshared_post?.text ?? internship.text}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4 underline">
                        {internship.category}
                      </p>
                      {/* Description */}
                      <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                        {internship.reshared_post?.text ?? internship.text}
                      </p>

                      {/* Footer with CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-xs text-slate-500">
                          {new Date(internship.posted_at.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-teal-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {internships.length === 0 && !loading && (
                <div className="text-center py-20">
                  <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-xl text-slate-600">No internships available at the moment</p>
                  <p className="text-slate-500 mt-2">Check back soon for new opportunities!</p>
                </div>
              )}

              {internships.length > 0 && Pagination!.pages > 1 && (
                <PaginationPage currentPage={currentPage ?? 0} totalPages={totalPages ?? 0} onPageChange={handlePageChange} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default InternshipsList;
