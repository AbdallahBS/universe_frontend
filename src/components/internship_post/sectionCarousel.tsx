import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Section {
  id: string;
  name: string;
  icon: string;
}

interface SectionTagsProps {
  selectedSections: Set<string>;
  toggleSection: (sectionId: string) => void;
}

const SectionTags: React.FC<SectionTagsProps> = ({ selectedSections, toggleSection }) => {
  const {t} = useTranslation();

const SECTIONS: Section[] = [
  { id: "internship_offers", name: t('filters.offers'), icon: "🔍" },
  { id: "internship_requests", name: t('filters.requests'), icon: "👀" },
  { id: "job_offers", name: t('filters.jobs'), icon: "💼" },
  { id: "news_announcements", name: t('filters.news'), icon: "📢" },
  { id: "events_trainings", name: t('filters.events'), icon: "📅" },
  { id: "educational_content", name: t('filters.education'), icon: "📚" },
  { id: "general_updates", name: t('filters.updates'), icon: "📰" },
  { id: "marketing_promotion", name: t('filters.marketing'), icon: "📈" },
  { id: "other", name: t('filters.other'), icon: "✨" }
];

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        
        .animate-pulse-once {
          animation: pulse 0.3s ease-out;
        }
      `}</style>

      <div className="mb-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Choose Your Category
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Select categories to filter your result
        </p>
      </div>

      {/* Flex wrap container for pill-style tags */}
      <div className="flex flex-wrap gap-3 justify-center">
        {SECTIONS.map((section, index) => {
          const isSelected = selectedSections.has(section.id);
          return (
            <button
              key={section.id}
              onClick={() => toggleSection(section.id)}
              className={`
                group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                transition-all duration-300 ease-out animate-fade-in
                ${isSelected
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-700'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-2 border-teal-100 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md'
                }
              `}
              style={{
                animationDelay: `${index * 30}ms`,
              }}
            >
              {/* Icon */}
              <span className="text-lg leading-none transition-transform duration-300 group-hover:scale-110">
                {section.icon}
              </span>

              {/* Label */}
              <span className="text-sm font-medium whitespace-nowrap">
                {section.name}
              </span>

              {/* Check icon when selected */}
              {isSelected && (
                <span className="ml-1 animate-pulse-once">
                  <Check className="w-4 h-4" />
                </span>
              )}

              {/* Hover glow effect */}
              <div
                className={`
                  absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 pointer-events-none
                  ${isSelected ? 'bg-white/10' : 'bg-teal-50/50 dark:bg-teal-900/30'}
                `}
              />
            </button>
          );
        })}
      </div>

      {/* Selected count indicator */}
      {selectedSections.size > 0 && (
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium animate-fade-in border border-teal-200 dark:border-teal-700">
          <Check className="w-4 h-4" />
          <span>{selectedSections.size} {selectedSections.size === 1 ? 'category' : 'categories'} selected</span>
        </div>
      )}
    </div>
  );
};

export default SectionTags;