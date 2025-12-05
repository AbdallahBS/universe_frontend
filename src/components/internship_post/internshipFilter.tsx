import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X } from 'lucide-react';

interface FilterOptions {
  criteria: string[];
  dateFrom?: string;
  dateTo?: string;
}

interface InternshipFiltersProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  currentSearchQuery: string;
  currentFilters: FilterOptions;
  availableFilters: {
    criteria: string[];
  };
}

const InternshipFilters: React.FC<InternshipFiltersProps> = ({
  onSearchChange,
  onFilterChange,
  currentSearchQuery,
  currentFilters,
  availableFilters,
}) => {
  const [searchQuery, setSearchQuery] = useState(currentSearchQuery);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>(currentFilters);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
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

    // Clear the previous timeout
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      onSearchChange(query); // Call the prop function after 1s of inactivity
    }, 2000);
  };

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      const index = updated.criteria.indexOf(value);
      if (index > -1) {
        updated.criteria.splice(index, 1);
      } else {
        updated.criteria.push(value);
      }
      onFilterChange(updated);
      return updated;
    });
  };

  const handleDateChange = (type: 'from' | 'to', value: string) => {
    setSelectedFilters((prev) => {
      const updated = {
        ...prev,
        [type === 'from' ? 'dateFrom' : 'dateTo']: value,
      };
      onFilterChange(updated);
      return updated;
    });
  };

  const clearFilters = () => {
    const cleared = {
      criteria: [],
      dateFrom: '',
      dateTo: '',
    };
    setSelectedFilters(cleared);
    setSearchQuery('');
    onSearchChange('');
    onFilterChange(cleared);
  };

  const CriteriaDropdown = () => {
    const isOpen = openDropdown === 'criteria';
    const selectedCount = selectedFilters.criteria.length;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : 'criteria')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 group"
        >
          <span className="text-slate-700 dark:text-slate-300 font-medium">Criteria</span>
          {selectedCount > 0 && (
            <span className="ml-auto bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCount}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-[100] animate-fade-in-up">
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {availableFilters.criteria.length > 0 ? (
                availableFilters.criteria.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.criteria.includes(option)}
                      onChange={() => toggleFilter(option)}
                      className="w-4 h-4 rounded accent-teal-600 cursor-pointer"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium flex-1">{option}</span>
                    {selectedFilters.criteria.includes(option) && (
                      <Check className="w-4 h-4 text-teal-600" />
                    )}
                  </label>
                ))
              ) : (
                <p className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">No options available</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const DurationFilter = () => {
    const isOpen = openDropdown === 'duration';

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : 'duration')}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 group"
        >
          <span className="text-slate-700 dark:text-slate-300 font-medium">Duration</span>
          {(selectedFilters.dateFrom || selectedFilters.dateTo) && (
            <span className="ml-auto bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-600 dark:text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
              }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg z-50 animate-fade-in-up">
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-white">From Date</label>
                <input
                  type="date"
                  value={selectedFilters.dateFrom || ''}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  className="flex items-center gap-3 p-2 rounded-lg dark:bg-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 dark:text-white">To Date</label>
                <input
                  type="date"
                  value={selectedFilters.dateTo || ''}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  className="flex items-center gap-3 p-2 rounded-lg dark:bg-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-200"
                />
              </div>
              {(selectedFilters.dateFrom || selectedFilters.dateTo) && (
                <button
                  onClick={() => {
                    setSelectedFilters((prev) => ({
                      ...prev,
                      dateFrom: '',
                      dateTo: '',
                    }));
                    onFilterChange({
                      ...selectedFilters,
                      dateFrom: '',
                      dateTo: '',
                    });
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear Dates
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hasActiveFilters =
    selectedFilters.criteria.length > 0 ||
    selectedFilters.dateFrom ||
    selectedFilters.dateTo ||
    searchQuery.length > 0;

  return (
    <div className="space-y-4 animate-fade-in-up relative z-40" ref={dropdownRef}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex-1 flex items-center relative gap-2">
          {/* Input */}
          <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search by title, company, or keyword..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearchChange(searchQuery);
                }}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg
                 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none
                  focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900 transition-all duration-300"
              />
            </div>
              
            {/* Icon Button */}
            <button
              onClick={() => onSearchChange(searchQuery)}
              className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-300"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <DurationFilter />
        <CriteriaDropdown />
      </div>
    </div>
  );
};

export default InternshipFilters;
