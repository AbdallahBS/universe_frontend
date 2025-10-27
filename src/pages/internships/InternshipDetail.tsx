import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

interface InternshipDetails {
  id: string;
  title: string;
  company: string;
  description: string;
  full_description: string;
  location: string;
  duration: string;
  requirements: string[];
  benefits: string[];
  thumbnail_icon: string;
}

interface InternshipDetailProps {}

const InternshipDetail: React.FC<InternshipDetailProps> = ({}) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const [internship, setInternship] = useState<InternshipDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    document.title = "Universe | Internships";

    fetchInternshipDetails();
  }, []);

  const fetchInternshipDetails = async () => {
    try {
      /*const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('id', internshipId)
        .maybeSingle();

      if (error) throw error;*/
      const data = {
        id: "e12a84cb-2758-4d0c-9515-2f6116e44074",
        title: "Frontend Developer Intern",
        company: "TechCorp Solutions",
        description:
          "Join our dynamic team to build modern web applications using React and TypeScript. Perfect for students looking to gain real-world experience.",
        full_description:
          "We are looking for a passionate Frontend Developer Intern to join our growing team. You will work alongside experienced developers to create beautiful, responsive web applications that serve millions of users worldwide.\n\nDuring this internship, you will:\n- Collaborate with designers and backend developers to implement new features\n- Write clean, maintainable code using React and TypeScript\n- Participate in code reviews and team meetings\n- Learn industry best practices and modern development workflows\n- Contribute to real projects that impact our users\n\nThis is a fantastic opportunity to kickstart your career in web development and gain hands-on experience with cutting-edge technologies.",
        location: "San Francisco, CA (Hybrid)",
        duration: "3-6 months",
        requirements: [
          "Currently pursuing a degree in Computer Science or related field",
          "Basic knowledge of HTML, CSS, and JavaScript",
          "Familiarity with React or other modern frontend frameworks",
          "Strong problem-solving skills and attention to detail",
          "Good communication and teamwork abilities",
          "Eagerness to learn and take on new challenges",
        ],
        benefits: [
          "Competitive monthly stipend",
          "Mentorship from senior engineers",
          "Flexible working hours",
          "Access to learning resources and courses",
          "Opportunity for full-time conversion",
          "Collaborative and inclusive work environment",
        ],
        thumbnail_icon: "Code",
        created_at: "2025-10-23T23:16:40.748766+00:00",
      } as InternshipDetails;

      setTimeout(() => {
        setInternship(data);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error fetching internship details:", error);
    } finally {
      // setLoading(false);
    }
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
                <Briefcase className="w-10 h-10 text-teal-600" />
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-2">{internship.title}</h1>
                <p className="text-xl text-teal-50 mb-4">
                  {internship.company}
                </p>
                <div className="flex items-center gap-4 text-teal-50">
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
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div className="space-y-4 animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-bold text-slate-900">
                About this Internship
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {internship.full_description}
              </p>
            </div>

            {internship.requirements && internship.requirements.length > 0 && (
              <div className="space-y-4 animate-fade-in-up animation-delay-500">
                <h2 className="text-2xl font-bold text-slate-900">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {internship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {internship.benefits && internship.benefits.length > 0 && (
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
            )}

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
    </div>
  );
};

export default InternshipDetail;
