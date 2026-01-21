import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AlternanceFiltersProps {
    onSearchChange: (query: string) => void;
    onTypeChange: (type: string) => void;
    currentSearch: string;
    currentType: string;
}

const AlternanceFilters: React.FC<AlternanceFiltersProps> = ({
    onSearchChange,
    onTypeChange,
    currentSearch,
    currentType
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const { t } = useTranslation();

    const types = [
        { value: 'all', label: t('alternance.allTypes') },
        { value: 'apprenticeship', label: t('alternance.apprenticeship') },
        { value: 'professionalization_contract', label: t('alternance.professionalizationContract') },
        { value: 'other', label: t('alternance.other') },
    ];

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder={t('alternance.search')}
                        value={currentSearch}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                    {currentSearch && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Filter Toggle Button (Mobile) */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                    <SlidersHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Filter Pills (Desktop always visible, Mobile conditional) */}
            <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                {types.map((type) => (
                    <button
                        key={type.value}
                        onClick={() => onTypeChange(type.value)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentType === type.value
                            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-500 dark:hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400'
                            }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AlternanceFilters;
