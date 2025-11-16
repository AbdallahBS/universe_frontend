import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import LoadingSpinner from "@components/ui/LoadingSpinner";
import PaginationPage from "@components/Pagination";
import { useAuth } from '@context/AuthContext';
import { getInternships } from '@services/internshipService';
import { LinkedInPost, Pagination } from 'types/resource';
import ScrollDownButton from '@components/ui/ScrollDownButton';
import { timeAgo } from '@utils/helpers';

interface InternshipsListProps {
  onInternshipClick: (id: string) => void;
}

const InternshipsList: React.FC<InternshipsListProps> = ({ onInternshipClick }) => {
  const [internships, setInternships] = useState<LinkedInPost[]>([]);

  const [Pagination, setPagination] = useState<Pagination>();
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();

  const [loading, setLoading] = useState(true);

  const {isLoading, isAuthenticated} = useAuth();

  useEffect(() => {
    document.title = 'Universe | Internships';
    setLoading(isLoading);
    fetchInternships();
  }, [isLoading]);

  const fetchInternships = async (page: string = "1", limit: string = "10") => {
    try {
      setLoading(true);
      const response = await getInternships(page, limit);
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
    fetchInternships(page.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (iconName: string | null | undefined) => {
    return <Briefcase className="w-12 h-12 text-teal-600" />;
  };

  return (
    <>
    <ScrollDownButton />
    
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
              {internships.map((internship, index) => (
                <div
                  key={internship.urn}
                  onClick={() => onInternshipClick(internship.urn.activity_urn)}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {getIcon(internship.media?.thumbnail)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300 truncate">
                        {internship.text ?? internship.reshared_post?.text}
                      </h3>
                      <p className="text-lg text-slate-700 font-medium mt-1">{internship.author.first_name ?? internship.reshared_post?.author.first_name} {internship.author.last_name ?? internship.reshared_post?.author.last_name}</p>
                      <p className="text-slate-600 mt-2 line-clamp-2">{internship.text ?? internship.reshared_post?.text}</p>

                      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{internship.post_type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{timeAgo(internship.posted_at.timestamp, Date.now())} - {new Date(internship.posted_at.date).toDateString().replace(/ /g, ' / ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-colors duration-300">
                        <ArrowRight className="w-6 h-6 text-teal-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

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
