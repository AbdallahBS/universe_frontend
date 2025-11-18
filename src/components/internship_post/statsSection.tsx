import React, { useState } from 'react';
import { HandHeartIcon, Heart, Laugh, Lightbulb, LucideGitCompareArrows, MessageCircle, PartyPopper, Share2, ThumbsUp, Zap } from 'lucide-react';
import { Stats } from 'types/resource';

interface StatsSectionProps {
  stats: Stats
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const [activeReaction, setActiveReaction] = useState<string | null>(null);

  const reactionEmojis: { [key: string]: string } = {
    like: '👍',
    love: '❤️',
    helpful: '🙌',
    amazing: '⭐',
  };

  return (
    <div className="space-y-8 animate-fade-in-up animation-delay-800">
      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments & Reactions</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              {/* <div className="flex gap-3">
                {Object.entries(reactionEmojis).map(([reactionType, emoji]) => (
                  <button
                    key={reactionType}
                    onClick={() => setActiveReaction(activeReaction === reactionType ? null : reactionType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      activeReaction === reactionType
                        ? 'bg-white shadow-md'
                        : 'bg-white/60 hover:bg-white'
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    {reactions[reactionType] > 0 && (
                      <span className="text-sm font-semibold text-slate-700">{reactions[reactionType]}</span>
                    )}
                  </button>
                ))}
              </div> */}
              <div className="ml-auto text-sm font-semibold text-slate-600">
                {stats.total_reactions} Total Reactions
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white rounded-lg p-3">
                <MessageCircle className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <p className="text-sm font-semibold text-slate-900">{stats.comments}</p>
                <p className="text-xs text-slate-500">Comments</p>
              </div>
              <div className="bg-white rounded-lg p-3 flex gap-6">
                {stats.like > 0 &&  (<div className="flex flex-col items-center">
                  <ThumbsUp className="w-5 h-5 text-blue-500 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.like}</p>
                  <p className="text-xs text-slate-500">Likes</p>
                </div>)}

                {stats.love > 0 &&  (<div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-red-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.love}</p>
                  <p className="text-xs text-slate-500">Loves</p>
                </div>)}

                {stats.insight > 0 && (<div className="flex flex-col items-center">
                  <Lightbulb className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.insight}</p>
                  <p className="text-xs text-slate-500">Insights</p>
                </div>)}

                {stats.support > 0 && (<div className="flex flex-col items-center">
                  <HandHeartIcon className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.support}</p>
                  <p className="text-xs text-slate-500">support</p>
                </div>)}

                {stats.funny > 0 && (<div className="flex flex-col items-center">
                  <Laugh className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.funny}</p>
                  <p className="text-xs text-slate-500">funny</p>
                </div>)}

                {stats.celebrate > 0 && (<div className="flex flex-col items-center">
                  <PartyPopper className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900">{stats.celebrate}</p>
                  <p className="text-xs text-slate-500">celebrate</p>
                </div>)}
              </div>
              <div className="bg-white rounded-lg p-3">
                <LucideGitCompareArrows className="w-5 h-5 text-green-500 mx-auto mb-1" />
                <p className="text-sm font-semibold text-slate-900">{stats.reposts}</p>
                <p className="text-xs text-slate-500">Reposts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
