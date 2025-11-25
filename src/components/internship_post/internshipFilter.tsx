import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

interface FilterOptions {
  location: string[];
  duration: string[];
  company: string[];
}

interface InternshipFiltersProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  availableFilters: {
    locations: string[];
    durations: string[];
    companies: string[];
  };
}

const InternshipFilters: React.FC<InternshipFiltersProps> = ({
  onSearchChange,
  onFilterChange,
  availableFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    location: [],
    duration: [],
    company: [],
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      const index = updated[category].indexOf(value);
      if (index > -1) {
        updated[category].splice(index, 1);
      } else {
        updated[category].push(value);
      }
      onFilterChange(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: [],
      duration: [],
      company: [],
    });
    setSearchQuery('');
    onSearchChange('');
    onFilterChange({
      location: [],
      duration: [],
      company: [],
    });
  };

  const FilterDropdown = ({
    label,
    category,
    options,
  }: {
    label: string;
    category: keyof FilterOptions;
    options: string[];
  }) => {
    const isOpen = openDropdown === category;
    const selectedCount = selectedFilters[category].length;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : category)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg hover:border-slate-400 transition-all duration-300 group"
        >
          <span className="text-slate-700 font-medium">{label}</span>
          {selectedCount > 0 && (
            <span className="ml-auto bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCount}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-300 rounded-lg shadow-lg z-50 animate-fade-in-up">
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {options.length > 0 ? (
                options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[category].includes(option)}
                      onChange={() => toggleFilter(category, option)}
                      className="w-4 h-4 rounded accent-teal-600 cursor-pointer"
                    />
                    <span className="text-slate-700 font-medium flex-1">{option}</span>
                    {selectedFilters[category].includes(option) && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </label>
                ))
              ) : (
                <p className="text-slate-500 text-sm text-center py-4">No options available</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters =
    selectedFilters.location.length > 0 ||
    selectedFilters.duration.length > 0 ||
    selectedFilters.company.length > 0 ||
    searchQuery.length > 0;

  return (
    <div className="space-y-4 animate-fade-in-up" ref={dropdownRef}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, company, or keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all duration-300"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-300"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <FilterDropdown
          label="Location"
          category="location"
          options={availableFilters.locations}
        />
        <FilterDropdown
          label="Duration"
          category="duration"
          options={availableFilters.durations}
        />
        <FilterDropdown
          label="Company"
          category="company"
          options={availableFilters.companies}
        />
      </div>
    </div>
  );
};

export default InternshipFilters;
