import React from 'react';
import { getUniversitiesByLicense, University } from '@data/cycleIngenieurData';

interface ScoreComparisonProps {
  scoreG: number;
  selectedLicense: string;
  onClose: () => void;
}

const ScoreComparison: React.FC<ScoreComparisonProps> = ({ scoreG, selectedLicense, onClose }) => {
  const matchingUniversities = getUniversitiesByLicense(selectedLicense);

  const getAcceptanceChance = (lastScore: number): {
    label: string;
    color: string;
    percentage: number;
  } => {
    const scoreDiff = scoreG - lastScore;
    
    if (scoreDiff >= 5) {
      return {
        label: 'فرصتك كبيرة باهي',
        color: 'bg-green-500',
        percentage: 100
      };
    } else if (scoreDiff >= 2) {
      return {
        label: 'فرصة متوسطة، نجم تعدي',
        color: 'bg-yellow-500',
        percentage: 75
      };
    } else if (scoreDiff >= -2) {
      return {
        label: 'فرصة ضعيفة، اما نجم يصير خير',
        color: 'bg-orange-500',
        percentage: 50
      };
    } else {
      return {
        label: 'صعيبة برشا، لازم تلقى حل آخر',
        color: 'bg-red-500',
        percentage: 25
      };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">وين تنجم تدخل؟</h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕
            </button>
          </div>
          <div className="text-slate-600 mb-2">
            <span className="font-medium">Score متاعك:</span>{' '}
            <span className="text-2xl font-bold text-indigo-600">{scoreG.toFixed(4)}</span>
          </div>
          <div className="text-slate-600">
            <span className="font-medium">التخصص:</span>{' '}
            <span className="text-indigo-600">{selectedLicense}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {matchingUniversities.map(({ university, specialties }) => (
              <div key={university.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{university.name}</h3>
                    <p className="text-slate-600">{university.fullName}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {specialties.length} تخصصات
                  </span>
                </div>

                <div className="space-y-4">
                  {specialties.map((specialty) => {
                    const chance = getAcceptanceChance(specialty.lastAcceptableScore);
                    return (
                      <div key={specialty.code} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-slate-800">{specialty.name}</div>
                          <span className="text-sm text-slate-500">{specialty.code}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-sm">
                            <span className="text-slate-600">آخر score قبلوه:</span>{' '}
                            <span className="font-bold">{specialty.lastAcceptableScore}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-slate-600">عدد البلايص:</span>{' '}
                            <span className="font-bold">{specialty.capacity}</span>
                          </div>
                        </div>

                        <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                          <div 
                            className={`absolute left-0 top-0 h-full ${chance.color} transition-all duration-500`}
                            style={{ width: `${chance.percentage}%` }}
                          />
                        </div>

                        <div className="text-sm font-medium" style={{ color: chance.color.replace('bg-', 'text-') }}>
                          {chance.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreComparison; 