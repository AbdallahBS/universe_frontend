import React, { useState } from 'react';
import { HandHeartIcon, Heart, Laugh, Lightbulb, LucideGitCompareArrows, MessageCircle, PartyPopper, Share2, ThumbsUp, Zap } from 'lucide-react';
import { Stats } from 'types/resource';

interface StatsSectionProps {
  stats: Stats
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {

  return (
    <div className="space-y-8 animate-fade-in-up animation-delay-800">
      <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Comments & Reactions</h2>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="ml-auto text-sm font-semibold text-slate-600 dark:text-slate-400">
                {stats.total_reactions} Total Reactions
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white dark:bg-slate-700 rounded-lg p-3">
                <MessageCircle className="w-5 h-5 text-teal-600 dark:text-teal-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.comments}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Comments</p>
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-lg p-3 flex gap-6">
                {stats.like > 0 && (<div className="flex flex-col items-center">
                  <ThumbsUp className="w-5 h-5 text-blue-500 dark:text-blue-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.like}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Likes</p>
                </div>)}

                {stats.love > 0 && (<div className="flex flex-col items-center">
                  <Heart className="w-5 h-5 text-red-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.love}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Loves</p>
                </div>)}

                {stats.insight > 0 && (<div className="flex flex-col items-center">
                  <Lightbulb className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.insight}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Insights</p>
                </div>)}

                {stats.support > 0 && (<div className="flex flex-col items-center">
                  <HandHeartIcon className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.support}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">support</p>
                </div>)}

                {stats.funny > 0 && (<div className="flex flex-col items-center">
                  <Laugh className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.funny}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">funny</p>
                </div>)}

                {stats.celebrate > 0 && (<div className="flex flex-col items-center">
                  <PartyPopper className="w-5 h-5 text-orange-400 mb-1" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.celebrate}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">celebrate</p>
                </div>)}
              </div>
              <div className="bg-white dark:bg-slate-700 rounded-lg p-3">
                <LucideGitCompareArrows className="w-5 h-5 text-green-500 dark:text-green-400 mx-auto mb-1" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{stats.reposts}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reposts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
