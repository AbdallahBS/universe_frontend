import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import LoadingSpinner from "@components/ui/LoadingSpinner";

interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  duration: string;
  thumbnail_icon: string;
}

interface InternshipsListProps {
  onInternshipClick: (id: string) => void;
}

const InternshipsList: React.FC<InternshipsListProps> = ({ onInternshipClick }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Universe | Internships';
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      /*const { data, error } = await supabase
        .from('internships')
        .select('id, title, company, description, location, duration, thumbnail_icon')
        .order('created_at', { ascending: false });

      if (error) throw error;*/
      const data = [
    {
        "id": "e12a84cb-2758-4d0c-9515-2f6116e44074",
        "title": "Frontend Developer Intern",
        "company": "TechCorp Solutions",
        "description": "Join our dynamic team to build modern web applications using React and TypeScript. Perfect for students looking to gain real-world experience.",
        "location": "San Francisco, CA (Hybrid)",
        "duration": "3-6 months",
        "thumbnail_icon": "Code"
    },
    {
        "id": "76b5d51f-6b76-42ff-b8b5-b8b7d31e3252",
        "title": "UX/UI Design Intern",
        "company": "Creative Studios Inc",
        "description": "Work with our award-winning design team to create intuitive and beautiful user experiences for web and mobile applications.",
        "location": "New York, NY (Remote)",
        "duration": "4 months",
        "thumbnail_icon": "Palette"
    },
    {
        "id": "187d51be-e7d8-431d-963e-e59da750a85b",
        "title": "Data Science Intern",
        "company": "DataMinds Analytics",
        "description": "Dive into the world of data science and machine learning. Work on exciting projects involving big data analysis and predictive modeling.",
        "location": "Austin, TX (On-site)",
        "duration": "6 months",
        "thumbnail_icon": "BarChart"
    },
    {
        "id": "737a263f-db81-43e3-8fd6-10b684a52d3a",
        "title": "Marketing Intern",
        "company": "BrandBoost Marketing",
        "description": "Help us create compelling marketing campaigns and grow brand awareness for exciting startups and established companies.",
        "location": "Los Angeles, CA (Hybrid)",
        "duration": "3 months",
        "thumbnail_icon": "Megaphone"
    },
    {
        "id": "11f0c106-0462-4744-b218-e814054b7e49",
        "title": "Software Engineering Intern",
        "company": "CloudTech Systems",
        "description": "Build scalable cloud-based solutions and work with cutting-edge technologies. Great opportunity for aspiring full-stack developers.",
        "location": "Seattle, WA (Remote)",
        "duration": "5 months",
        "thumbnail_icon": "Cloud"
    }
]
      setTimeout(() => {
        setInternships(data || []);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching internships:', error);
    } finally {
      // setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    return <Briefcase className="w-12 h-12 text-teal-600" />;
  };

  return (
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
                  key={internship.id}
                  onClick={() => onInternshipClick(internship.id)}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 cursor-pointer transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-teal-100 to-blue-100 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {getIcon(internship.thumbnail_icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors duration-300">
                        {internship.title}
                      </h3>
                      <p className="text-lg text-slate-700 font-medium mt-1">{internship.company}</p>
                      <p className="text-slate-600 mt-2 line-clamp-2">{internship.description}</p>

                      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{internship.duration}</span>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternshipsList;
