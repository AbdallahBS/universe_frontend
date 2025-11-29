import React from 'react';
import { Search, BookOpen } from 'lucide-react';
import { availableSpecialties } from '@data/cycleIngenieurData';

interface CycleFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
}

const CycleFilters: React.FC<CycleFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedSpecialty,
  onSpecialtyChange
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search for a school
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="School name, city..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Choose a specialty
          </label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={selectedSpecialty}
              onChange={(e) => onSpecialtyChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors appearance-none bg-white"
            >
              {availableSpecialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleFilters;