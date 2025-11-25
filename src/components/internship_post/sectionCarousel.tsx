import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Section {
  id: string;
  name: string;
  icon: string;
}

const SECTIONS: Section[] = [
  { id: "tech", name: "Technology", icon: "💻" },
  { id: "software", name: "Software Engineering", icon: "🧑‍💻" },
  { id: "data-ai", name: "Data & AI", icon: "🤖" },
  { id: "sales-marketing", name: "Sales & Marketing", icon: "📈" },
  { id: "finance", name: "Finance", icon: "💰" },
  { id: "hr", name: "Human Resources", icon: "👥" },
  { id: "healthcare", name: "Healthcare", icon: "🏥" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "consulting", name: "Consulting", icon: "💼" },
  { id: "design", name: "Design", icon: "🎨" },
  { id: "management", name: "Management", icon: "📦" },
];

const SectionTags = () => {
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setSelectedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Choose Your Category
        </h2>
        <p className="text-slate-600 text-sm">
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
                ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 hover:bg-teal-700'
                    : 'bg-white text-slate-700 border-2 border-teal-100 hover:border-teal-400 hover:shadow-md'
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
                  ${isSelected ? 'bg-white/10' : 'bg-teal-50/50'}
                `}
              />
            </button>
          );
        })}
      </div>

      {/* Selected count indicator */}
      {selectedSections.size > 0 && (
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-teal-100 text-teal-700 rounded-full text-sm font-medium animate-fade-in border border-teal-200">
          <Check className="w-4 h-4" />
          <span>{selectedSections.size} {selectedSections.size === 1 ? 'category' : 'categories'} selected</span>
        </div>
      )}
    </div>
  );
};

export default SectionTags;