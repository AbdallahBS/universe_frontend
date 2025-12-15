import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Play, Pause, RotateCcw, Loader2, Database, Clock, Zap } from 'lucide-react';

interface Scrapper {
  id: string;
  name: string;
  source: string;
  status: 'running' | 'stopped' | 'error';
  lastRun: string;
  postsScraped: number;
  frequency: string;
}

const ScrapperManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScrappers, setSelectedScrappers] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [scrappers] = useState<Scrapper[]>([
    {
      id: '1',
      name: 'LinkedIn Jobs Scraper',
      source: 'LinkedIn',
      status: 'running',
      lastRun: '2025-12-15 14:30',
      postsScraped: 2543,
      frequency: 'Every 6 hours',
    },
    {
      id: '2',
      name: 'Indeed Internships Scraper',
      source: 'Indeed',
      status: 'running',
      lastRun: '2025-12-15 13:00',
      postsScraped: 1856,
      frequency: 'Every 8 hours',
    },
    {
      id: '3',
      name: 'Facebook Jobs Scraper',
      source: 'Facebook',
      status: 'stopped',
      lastRun: '2025-12-14 10:15',
      postsScraped: 892,
      frequency: 'Every 12 hours',
    },
    {
      id: '4',
      name: 'Twitter Opportunities Scraper',
      source: 'Twitter/X',
      status: 'error',
      lastRun: '2025-12-15 11:45',
      postsScraped: 345,
      frequency: 'Every 4 hours',
    },
    {
      id: '5',
      name: 'University Portal Scraper',
      source: 'University Portals',
      status: 'running',
      lastRun: '2025-12-15 15:00',
      postsScraped: 3124,
      frequency: 'Every 3 hours',
    },
  ]);

  const filteredScrappers = scrappers.filter(scrapper =>
    scrapper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scrapper.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleScrapperSelection = (scraperId: string) => {
    setSelectedScrappers(prev =>
      prev.includes(scraperId)
        ? prev.filter(id => id !== scraperId)
        : [...prev, scraperId]
    );
  };

  const toggleAllScrappers = () => {
    if (selectedScrappers.length === filteredScrappers.length) {
      setSelectedScrappers([]);
    } else {
      setSelectedScrappers(filteredScrappers.map(s => s.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'stopped':
        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300';
    }
  };

  const handleStartScrappers = async () => {
    if (selectedScrappers.length === 0) return;
    setActionLoading('start');
    setTimeout(() => {
      console.log('Started scrappers:', selectedScrappers);
      setSelectedScrappers([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleStopScrappers = async () => {
    if (selectedScrappers.length === 0) return;
    setActionLoading('stop');
    setTimeout(() => {
      console.log('Stopped scrappers:', selectedScrappers);
      setSelectedScrappers([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleRestartScrappers = async () => {
    if (selectedScrappers.length === 0) return;
    setActionLoading('restart');
    setTimeout(() => {
      console.log('Restarted scrappers:', selectedScrappers);
      setSelectedScrappers([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleDeleteScrappers = async () => {
    if (selectedScrappers.length === 0) return;
    setActionLoading('delete');
    setTimeout(() => {
      console.log('Deleted scrappers:', selectedScrappers);
      setSelectedScrappers([]);
      setActionLoading(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-violet-200/20 dark:bg-violet-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/15 dark:bg-indigo-500/10 rounded-full blur-xl animate-float animation-delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Scrapper Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Initialize, configure, and monitor web scrapers
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {scrappers.filter(s => s.status === 'running').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Running</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {scrappers.filter(s => s.status === 'error').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Errors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 space-y-4 animate-fade-in-up animation-delay-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search scrappers by name or source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 backdrop-blur-sm"
            />
          </div>

          {/* Action Buttons */}
          {selectedScrappers.length > 0 && (
            <div className="flex flex-wrap gap-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {selectedScrappers.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleStartScrappers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'start' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Play className="w-4 h-4" />
                  Start
                </button>

                <button
                  onClick={handleStopScrappers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'stop' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Pause className="w-4 h-4" />
                  Stop
                </button>

                <button
                  onClick={handleRestartScrappers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'restart' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>

                <button
                  onClick={handleDeleteScrappers}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scrappers Table */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedScrappers.length === filteredScrappers.length && filteredScrappers.length > 0}
                      onChange={toggleAllScrappers}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-2 focus:ring-violet-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Scrapper
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Last Run
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Posts Scraped
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Frequency
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredScrappers.map((scrapper) => (
                  <tr
                    key={scrapper.id}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                      selectedScrappers.includes(scrapper.id) ? 'bg-violet-50/50 dark:bg-violet-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedScrappers.includes(scrapper.id)}
                        onChange={() => toggleScrapperSelection(scrapper.id)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-violet-600 focus:ring-2 focus:ring-violet-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <Database className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {scrapper.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            {scrapper.source}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          scrapper.status === 'running' ? 'bg-green-500 animate-pulse' :
                          scrapper.status === 'error' ? 'bg-red-500' :
                          'bg-slate-400'
                        }`}></div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(scrapper.status)}`}>
                          {scrapper.status.charAt(0).toUpperCase() + scrapper.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        {scrapper.lastRun}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {scrapper.postsScraped.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Zap className="w-4 h-4" />
                        {scrapper.frequency}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredScrappers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No scrappers found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrapperManagementPage;
