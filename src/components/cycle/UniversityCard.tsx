import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Award, ExternalLink, Download, X, Phone, Mail, MapPin as LocationIcon, Navigation } from 'lucide-react';
import { University } from '@data/cycleIngenieurData';

interface UniversityCardProps {
  university: University;
  license?: string;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university, license }) => {
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

  // Filter specialties by license if provided
  const filteredSpecialties = license
    ? university.detailedSpecialties.filter(s => {
      // Handle both string and array license types
      if (Array.isArray(s.license)) {
        return s.license.includes(license);
      }
      return s.license === license;
    })
    : university.detailedSpecialties;
  // Get the lowest acceptable score from filtered specialties
  const lowestScore = filteredSpecialties.length > 0
    ? Math.min(...filteredSpecialties.map(s => s.lastAcceptableScore))
    : null;

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xl transition-all duration-300 overflow-hidden group text-sm">
        {/* University Image */}
        <div className="relative h-32 overflow-hidden bg-white dark:bg-slate-700 flex items-center justify-center">
          <img
            src={university.image}
            alt={university.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-2 pt-4">
            <h3 className="text-base font-semibold text-white mb-0.5">
              {university.name}
            </h3>
            <p className="text-xs text-white/90 line-clamp-1">{university.fullName}</p>
          </div>
        </div>

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">


              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {university.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Established in {university.establishedYear}
                </div>

              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              <span className="font-medium">University:</span> {university.university}
            </div>
          </div>



          {/* Specialties */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Specialties:</h4>
            <div className="flex flex-wrap gap-2">
              {filteredSpecialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium"
                >
                  {specialty.name} ({specialty.code})
                </span>
              ))}
              {filteredSpecialties.length > 2 && (
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md text-xs">
                  +{filteredSpecialties.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Last Acceptable Score */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-3 mb-3 border border-indigo-200 dark:border-indigo-700">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 text-center">Last Acceptable Score {university.lastYearScores.year}:</h4>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{lowestScore !== null ? lowestScore : '--'}</div>

              {filteredSpecialties.length > 1 && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  (Varies by specialty)
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
            <a
              href={`https://${university.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-xs transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Official Website
            </a>
            <Link
              to={{
                pathname: `/university/${university.id}`,
                search: license ? `?specialty=${encodeURIComponent(license)}` : ''
              }}
              state={{ selectedSpecialty: license || "All Specialties" }}
              className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-medium text-xs shadow-lg"
            >
              More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversityCard;