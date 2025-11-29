import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Calculator, TrendingUp, Users, MapPin, Calendar, Award, ExternalLink, FileText, Download, AlertCircle } from 'lucide-react';
import { universitiesData, University, scoreCalculationInfo, getUniversitiesBySpecialty } from '@data/cycleIngenieurData';
import UniversityCard from '@components/cycle/UniversityCard';
import CycleFilters from '@components/cycle/CycleFilters';
import ScoreCalculator from '@components/cycle/ScoreCalculator';
import ConcoursTimer from '@components/cycle/ConcoursTimer';
import CandidatureGuide from '@components/cycle/CandidatureGuide';

const CycleIngenieurPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as University['type']) || 'all';
  
  const [selectedType, setSelectedType] = useState<University['type'] | 'all'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [activeTab, setActiveTab] = useState<'universities' | 'calculator' | 'annexes' | 'guide' | 'requirements'>('universities');

  // Filter universities based on selected criteria
  const filteredUniversities = useMemo(() => {
    let filtered = universitiesData;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(university => university.type === selectedType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(university =>
        university.name.toLowerCase().includes(query) ||
        university.fullName.toLowerCase().includes(query) ||
        university.location.toLowerCase().includes(query) ||
        university.specialties.some(specialty => specialty.toLowerCase().includes(query))
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'All Specialties') {
      filtered = filtered.filter(university =>
        university.specialties.includes(selectedSpecialty)
      );
    }

    return filtered.sort((a, b) => (a.ranking || 999) - (b.ranking || 999));
  }, [selectedType, searchQuery, selectedSpecialty]);

  // Statistics
  const stats = {
    total: universitiesData.length,
    specifique: universitiesData.filter(u => u.type === 'specifique').length,
    independant: universitiesData.filter(u => u.type === 'independant').length,
    ressourcePedagogique: universitiesData.filter(u => u.type === 'ressource-pedagogique').length,
    launched: universitiesData.filter(u => u.concoursStatus === 'launched').length
  };

  const getStatusColor = (status: University['concoursStatus']) => {
    switch (status) {
      case 'launched':
        return 'bg-green-100 text-green-800';
      case 'not-launched':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'results-published':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    <div className="min-h-screen bg-slate-50 pt-20">
     

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
         

          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 mr-2" />
              Engineering Cycle
            </div>
            <h1 className="text-2xl md:text-10xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Engineering Schools in Tunisia
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover the best engineering schools, calculate your scores, and prepare for admission
            </p>
          </div>

         
        
        </div>
        <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">What's New? 🎉</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-green-100">
                    <Calendar className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1">2025 Notice Available! 📢</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        You can download the new 2025 notice and see all the details
                      </p>
                      <a
                        href="/assets/PREAVIS_2025.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Notice (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 border border-slate-200">
          <button
            onClick={() => setActiveTab('universities')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'universities'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <GraduationCap className="w-4 h-4 inline mr-2" />
            Universities
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'calculator'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Calculator className="w-4 h-4 inline mr-2" />
            Calculate Your Score
          </button>
          <button
            onClick={() => setActiveTab('annexes')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'annexes'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Annexes
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'requirements'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 inline mr-2" />
            Requirements
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'universities' && (
          <>
            {/* Concours Timer */}
            <div className="mb-8">
              <ConcoursTimer />
            </div>

            {/* Filters */}
            <CycleFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedSpecialty={selectedSpecialty}
              onSpecialtyChange={setSelectedSpecialty}
            />

            {/* Results */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {filteredUniversities.length} école{filteredUniversities.length !== 1 ? 's' : ''} trouvée{filteredUniversities.length !== 1 ? 's' : ''}
                </h2>
                {(selectedType !== 'all' || searchQuery || selectedSpecialty !== 'All Specialties') && (
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSearchQuery('');
                      setSelectedSpecialty('All Specialties');
                    }}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* University Cards */}
            {filteredUniversities.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredUniversities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    license={selectedSpecialty !== 'All Specialties' ? selectedSpecialty : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No schools found</h3>
                <p className="text-slate-600 mb-6">
                  Try changing your search criteria to see more results.
                </p>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setSearchQuery('');
                    setSelectedSpecialty('All Specialties');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 font-medium"
                >
                  View All Schools
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'calculator' && <ScoreCalculator />}

        {activeTab === 'annexes' && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-800">Annexes</h2>
            </div>

            {/* Specific Schools Section */}
            <div className="mb-8">
              <div className="bg-indigo-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-indigo-800 mb-3"></h3>
                <p className="text-lg text-slate-700 mb-4">
              
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                 
                      <div  className="bg-white rounded-lg p-4 border border-indigo-100 hover:border-indigo-300 transition-colors">
                        <div className="flex items-start gap-3">
                          <Download className="w-5 h-5 text-indigo-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-slate-800 mb-1">PDF</h4>
                            <p className="text-sm text-slate-600 mb-2">Annex to submit with your application</p>
                            <a
                              href="/assets/ANNEXE.pdf"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                              download
                            >
                              <Download className="w-4 h-4" />
                              <span>Download Annex (PDF)</span>
                            </a>
                          </div>
                        </div>
                      </div>
                
                </div>
              </div>

              {/* Independent Schools Section */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-3">Independent Institutes Annexes (Indépendant)</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-lg text-slate-700">
                    ⚠️ Important Note: Many institutes have not yet published their annexes for this year. 
                    We recommend following their official websites. You can find the links to all institutes below 🔍
                  </p>
                </div>
                
                {/* Available Annexes */}
                <div className="mb-6">
                  <h4 className="font-medium text-purple-900 mb-4">Currently Available Annexes:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
              
                        <div  className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors">
                          <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <h4 className="font-medium text-slate-800 mb-1">INSAT</h4>
                              <p className="text-sm text-slate-600 mb-2">Institut National des Sciences Appliquées et de Technologie  </p>
                              <a
                                href="/assets/ANNEXE_INSAT.pdf"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                download
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Annex (PDF)</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div  className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors">
                          <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <h4 className="font-medium text-slate-800 mb-1">FST</h4>
                              <p className="text-sm text-slate-600 mb-2">Faculté des Sciences de Tunis </p>
                              <a
                                href="/assets/ANNEXE_SCI_TUNIS.pdf"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                download
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Annex (PDF)</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div  className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors">
                          <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <h4 className="font-medium text-slate-800 mb-1">FST</h4>
                              <p className="text-sm text-slate-600 mb-2">Faculty of Sciences for Mathematics, Physics and Natural Sciences in Tunis</p>
                              <a
                                href="/assets/ANNEXE_SCI_TUNIS_math_phy.pdf"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                download
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Annex (PDF)</span>
                              </a>
                            </div>
                          </div>
                        </div>

                        <div  className="bg-white rounded-lg p-4 border border-purple-100 hover:border-purple-300 transition-colors">
                          <div className="flex items-start gap-3">
                            <Download className="w-5 h-5 text-purple-600 mt-1" />
                            <div>
                              <h4 className="font-medium text-slate-800 mb-1">FSS</h4>
                              <p className="text-sm text-slate-600 mb-2">Faculté des Sciences de Sfax </p>
                              <a
                                href="/assets/ANNEXE_SCI_SFAX.pdf"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                download
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Annex (PDF)</span>
                              </a>
                            </div>
                          </div>
                        </div>
                    
                  </div>
                </div>

                {/* University Websites */}
                <div className="bg-white rounded-lg p-6 border border-purple-100">
                  <h4 className="font-medium text-purple-900 mb-4">Official Institute Website Links:</h4>
                  <p className="text-slate-700 mb-4">
                    You can visit these websites to follow the latest news and download new annexes when they are published 🌐
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                   
                        <a
                 
                          href="https://intek.rnu.tn/fr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <div>
                            <span className="font-medium text-purple-900">INTE KEF</span>
                            <span className="text-sm text-purple-700 block">Institut National des Technologies et des Sciences du Kef</span>
                          </div>
                        </a>
                        <a
                 
                          href="https://isimg.rnu.tn/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <div>
                            <span className="font-medium text-purple-900">ISIMG</span>
                            <span className="text-sm text-purple-700 block">Institut Supérieur d'Informatique et de Multimédia de Gabès</span>
                          </div>
                        </a>
                        <a
                 
                 href="http://www.isimm.rnu.tn/public/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
               >
                 <ExternalLink className="w-4 h-4 text-purple-600" />
                 <div>
                   <span className="font-medium text-purple-900">ISIMM</span>
                   <span className="text-sm text-purple-700 block">Institut Supérieur d'Informatique et de Mathématiques de Monastir</span>
                 </div>
               </a>
               <a
                 
                 href="http://www.fsb.rnu.tn/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
               >
                 <ExternalLink className="w-4 h-4 text-purple-600" />
                 <div>
                   <span className="font-medium text-purple-900">SCI Bizerte</span>
                   <span className="text-sm text-purple-700 block">Faculté des Sciences de Bizerte </span>
                 </div>
               </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && <CandidatureGuide />}

        {activeTab === 'requirements' && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-800">Requirements</h2>
              </div>
              <div className="flex gap-3">
                <a
                  href="/assets/PREAVIS_2025.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                  download
                >
                  <Download className="w-4 h-4" />
                  <span>2025 Notice</span>
                </a>
                <a
                  href="/assets/SCORE_E_CS_2024.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                  download
                >
                  <Download className="w-4 h-4" />
                  <span>Score E Formula</span>
                </a>
              </div>
            </div>


            <div className="mt-8 space-y-4">
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">What's New? 🎉</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-green-100">
                    <Calendar className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1">2025 Notice Available Now! 📢</h4>
                      <p className="text-sm text-slate-600 mb-2">
                        You can download the new 2025 notice and see all the details
                      </p>
                      <a
                        href="/assets/PREAVIS_2025.pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        download
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Notice (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                 
                  <a href="https://www.facebook.com/1269451033/posts/10233562670789835/?mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer">
                  <p className="text-amber-800 font-medium">
                  The scores shown are Global Scores. These scores are from 2024.
                  
                  </p>
                     
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CycleIngenieurPage;

