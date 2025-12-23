import React from 'react';
import { HandHeartIcon, Heart, Laugh, Lightbulb, LucideGitCompareArrows, MessageCircle, PartyPopper, ThumbsUp } from 'lucide-react';
import { Stats } from 'types/resource';
import { useTranslation } from 'react-i18next';
import TransText from '@components/TransText';

interface StatsSectionProps {
  stats: Stats
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const {t} = useTranslation();
  // Build reaction items dynamically
  const reactionItems = [
    { key: 'like', value: stats.like, icon: ThumbsUp, label: 'Likes', color: 'text-blue-500 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/50' },
    { key: 'love', value: stats.love, icon: Heart, label: 'Loves', color: 'text-red-500 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/50' },
    { key: 'insight', value: stats.insight, icon: Lightbulb, label: 'Insights', color: 'text-amber-500 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/50' },
    { key: 'support', value: stats.support, icon: HandHeartIcon, label: 'Support', color: 'text-purple-500 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/50' },
    { key: 'funny', value: stats.funny, icon: Laugh, label: 'Funny', color: 'text-yellow-500 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/50' },
    { key: 'celebrate', value: stats.celebrate, icon: PartyPopper, label: 'Celebrate', color: 'text-pink-500 dark:text-pink-400', bgColor: 'bg-pink-100 dark:bg-pink-900/50' },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <TransText as='h2' className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t('internshipDetail.engagementStats')}
          </TransText>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-blue-500/10 dark:from-teal-500/20 dark:to-blue-500/20 border border-teal-200 dark:border-teal-700">
            <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
              {stats.total_reactions.toLocaleString()}
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">Total Reactions</span>
          </div>
        </div>

        {/* Main Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {/* Comments */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{stats.comments.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Comments</p>
          </div>

          {/* Reposts */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <LucideGitCompareArrows className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{stats.reposts.toLocaleString()}</p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Reposts</p>
          </div>

          {/* Total Reactions on mobile - only show if there are reactions */}
          {reactionItems.length > 0 && (
            <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-2xl p-4 text-center">
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{reactionItems.length}</p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Reaction Types</p>
            </div>
          )}
        </div>

        {/* Reactions Grid - Responsive for 5+ types */}
        {reactionItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Reactions Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
              {reactionItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.key}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 text-center hover:scale-105 transition-transform duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-600"
                  >
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {item.value.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsSection;
