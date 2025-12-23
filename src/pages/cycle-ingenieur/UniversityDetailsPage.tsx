import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, ExternalLink, Download, Calendar, Users, Award, Navigation, Star } from 'lucide-react';
import { getUniversityById, University } from '@data/cycleIngenieurData';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import TransText from '@components/TransText';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UniversityDetailsPage: React.FC = () => {

    useEffect(() => {
      document.title = 'Universe | Cycle Ingénieur';
    }, []);
  
  const {t} = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [university, setUniversity] = useState<University | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'specialties' | 'location'>('overview');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  // Get the selected specialty from URL search params or location state
  const selectedSpecialty = searchParams.get('specialty') || location.state?.selectedSpecialty || "All Specialties";

  useEffect(() => {
    if (id) {
      const uni = getUniversityById(id);
      if (uni) {
        setUniversity(uni);
      } else {
        navigate('/cycle-ingenieur');
      }
    }
  }, [id, navigate]);

  // Filter specialties based on selected license
  const getFilteredSpecialties = () => {
    if (!university || selectedSpecialty === "All Specialties") {
      return university?.detailedSpecialties || [];
    }

    return university.detailedSpecialties.filter(specialty => {
      if (Array.isArray(specialty.license)) {
        return specialty.license.includes(selectedSpecialty);
      }
      return specialty.license === selectedSpecialty;
    });
  };

  // Filter scores based on filtered specialties
  const getFilteredScores = () => {
    if (!university || selectedSpecialty === "All Specialties") {
      return university?.lastYearScores.detailedScores || [];
    }

    const filteredSpecialtyCodes = getFilteredSpecialties().map(s => s.code);
    return university.lastYearScores.detailedScores.filter(score =>
      filteredSpecialtyCodes.includes(score.code)
    );
  };

  const MapComponent = () => {
    if (!university) return null;

    return (
      <div className="w-full h-96 bg-slate-100 dark:bg-slate-700 rounded-lg relative overflow-hidden">
        <MapContainer
          center={[university.coordinates.lat, university.coordinates.lng]}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[university.coordinates.lat, university.coordinates.lng]}>
            <Popup>
              <div className="text-sm">
                <div className="font-medium mb-1">{university.name}</div>
                <div className="text-slate-600">{university.address}</div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        <div className="absolute top-4 right-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-lg z-[400]">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium text-slate-800 dark:text-white">{university.name}</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{university.address}</div>
        </div>
      </div>
    );
  };

  if (!university) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Loading...</div>
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: University['type']) => {
    switch (type) {
      case 'specifique':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'independant':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'ressource-pedagogique':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeLabel = (type: University['type']) => {
    switch (type) {
      case 'specifique':
        return 'Specific';
      case 'independant':
        return 'Independent';
      case 'ressource-pedagogique':
        return 'Educational Resource';
      default:
        return type;
    }
  };

  const getStatusColor = (status: University['concoursStatus']) => {
    switch (status) {
      case 'launched':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700';
      case 'not-launched':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700';
      case 'results-published':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getStatusLabel = (status: University['concoursStatus']) => {
    switch (status) {
      case 'launched':
        return 'Contest Open';
      case 'not-launched':
        return 'Not Yet Open';
      case 'closed':
        return 'Contest Closed';
      case 'results-published':
        return 'Results Published';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Header */}
      <div className="relative">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="absolute top-6 left-6">
          <Link
            to="/cycle-ingenieur"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Schools
          </Link>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">

          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{university.name}</h1>
          <p className="text-xl text-white/90 mb-4">{university.fullName}</p>
          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {university.location}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Established in {university.establishedYear}
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white dark:bg-slate-800 rounded-xl p-2 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
          >
            <TransText>{t("universityDetail.overview")}</TransText>
          </button>
          <button
            onClick={() => setActiveTab('specialties')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'specialties'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
          >
            <TransText>{t("universityDetail.specialtiesScores")}</TransText>
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${activeTab === 'location'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
          >
            <TransText>{t("universityDetail.location")}</TransText>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
          {activeTab === 'overview' && (
            <>


              {/* Contact Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <MapPin className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  <div>
                    <TransText as='div' className="font-medium text-slate-800 dark:text-white">{t("universityDetail.address")}</TransText>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{university.address}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Phone className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  <div>
                    <TransText as='div' className="font-medium text-slate-800 dark:text-white">{t("universityDetail.phone")}</TransText>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{university.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Mail className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                  <div>
                    <TransText as='div' className="font-medium text-slate-800 dark:text-white">{t("universityDetail.email")}</TransText>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{university.email}</div>
                  </div>
                </div>
              </div>

              {/* University Info */}
              <div className="mb-8">

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <TransText as='div' className="font-medium text-indigo-800 dark:text-indigo-300 mb-2">{t("universityDetail.university")}</TransText>
                    <div className="text-indigo-700 dark:text-indigo-400">{university.university}</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <TransText as='div' className="font-medium text-purple-800 dark:text-purple-300 mb-2">{t("universityDetail.officialWebsite")}</TransText>
                    <a
                      href={`https://${university.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 flex items-center gap-2"
                    >
                      {university.website}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>




            </>
          )}

          {activeTab === 'specialties' && (
            <>
              {/* Detailed Scores */}
              <div className="mb-8">
                <TransText as='h3' className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t("universityDetail.admissionScores")} {university.lastYearScores.year}</TransText>
                <div className="grid gap-6">
                  {getFilteredScores().map((score, index) => (
                    <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-800 dark:text-white text-lg">{score.specialty}</h4>
                          <span className="text-sm text-slate-500 dark:text-slate-400 font-mono bg-white dark:bg-slate-700 px-2 py-1 rounded">{score.code}</span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 px-3 py-1 rounded-full">{score.places} seats</span>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{score.lastAcceptableScore}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">Last Acceptable Score</div>
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">Year {university.lastYearScores.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties with Plans d'Étude */}
              <div className="mb-8">
                <TransText as='h3' className="text-xl font-bold text-slate-800 dark:text-white mb-6">{t("universityDetail.studyPlans")}</TransText>
                <div className="grid gap-6">
                  {getFilteredSpecialties().map((specialty, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-600 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{specialty.name}</h4>
                          <p className="text-slate-600 dark:text-slate-400 mb-3">{specialty.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded font-mono">{specialty.code}</span>
                            <span>Duration: {specialty.duration}</span>
                            <span>Capacity: {specialty.capacity} students</span>
                          </div>
                        </div>
                        {specialty.planEtudeUrl ? (
                          <a
                            href={specialty.planEtudeUrl}
                            className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors ${isDownloading === specialty.code ? 'opacity-75 cursor-wait' : ''}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={async (e) => {
                              if (!specialty.planEtudeUrl.startsWith('https')) {
                                e.preventDefault();
                                setIsDownloading(specialty.code);
                                const fileName = specialty.planEtudeUrl.split('/').pop();
                                // Create a temporary link with the correct base URL
                                const link = document.createElement('a');
                                // Use the full URL path from the public directory
                                link.href = `${window.location.origin}${specialty.planEtudeUrl}`;
                                link.setAttribute('download', fileName || 'plan-etude.pdf');
                                link.setAttribute('type', 'application/pdf');
                                document.body.appendChild(link);

                                // Add a small delay to show loading state
                                await new Promise(resolve => setTimeout(resolve, 800));

                                link.click();
                                document.body.removeChild(link);
                                setIsDownloading(null);
                              }
                            }}
                          >
                            {isDownloading === specialty.code ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            Study Plan
                          </a>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400 italic px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            Study plan not yet available
                          </span>
                        )}
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{specialty.lastAcceptableScore}</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Last Acceptable Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </>
          )}

          {activeTab === 'location' && (
            <>
              <div className="mb-6">
                <TransText as='h3' className="text-2xl font-bold text-slate-800 dark:text-white mb-6">{t("universityDetail.universityLocation")}</TransText>

              </div>

              <MapComponent />

              <div className="mt-6 flex justify-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${university.coordinates.lat},${university.coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Google Maps
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default UniversityDetailsPage;
