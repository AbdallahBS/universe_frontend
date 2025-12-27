import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search, Trash2, Play, Edit, Loader2, Database, Clock, Zap, Plus, X, Save, Ban, PowerCircleIcon } from 'lucide-react';
import ModalPortal from '@components/ModalPortal';
import LoadingSpinner from '@components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import { isValidCron } from 'cron-validator';
import { addScraper, changeScraperStatus, deleteScraper, getScrapers, startScrapers, updateScraper } from '@services/adminService';

interface Scrapper {
  scrapperApifyId: string;
  name: string;
  source: string;
  status: 'running' | 'stopped' | 'disabled';
  lastRun: string;
  totalScrappedResult: number;
  frequency: {
    schedule : string,
    scheduleText : string
  };
  RequestBody: string;
}

const ScrapperManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScrappers, setSelectedScrappers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isStartDialogOpen, setIsStartDialogOpen] = useState(false);
  const [editingScrapper, setEditingScrapper] = useState<Scrapper | null>(null);
  // Scrapper states
  const [scrapperApifyId, setScrapperApifyId] = useState('');
  const [scrapperName, setScrapperName] = useState('');
  const [scrapperSource, setScrapperSource] = useState('');
  const [totalScrappedResult, setTotalScrappedResult] = useState(0);
  const [requestBody, setRequestBody] = useState('');
  const [customRequestBody, setCustomRequestBody] = useState('');
  const [cronSchedule, setCronSchedule] = useState('');
  const [cronError, setCronError] = useState('');

  const [jsonError, setJsonError] = useState<string | null>(null);
  const [scrappers, setScrappers] = useState<Scrapper[]>([]);

  const [disabledButtons, setDisabledButtons] = useState<string[]>([]);

  const filteredScrappers = scrappers.filter(scrapper =>
    scrapper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scrapper.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    document.title = 'Universe | Scrapper Management';
    getScrappersList();
  }, []);

  const toggleScrapperSelection = (scraperId: string) => {
    setSelectedScrappers(prev => {
      const next = prev.includes(scraperId)
        ? prev.filter(id => id !== scraperId)
        : [...prev, scraperId];

      let interrupted = false;
      for (const scraperId of next) {
        const scraper = scrappers.find(s => s.scrapperApifyId === scraperId);
        if (scraper?.status === 'disabled') {
          setDisabledButtons(["start", "disable"]);
          interrupted = true;
          break;
        }
      }
      if (!interrupted) {setDisabledButtons(["enable"]);}
      return next;
    }
    );
  };

  const toggleAllScrappers = () => {
    if (selectedScrappers.length === filteredScrappers.length) {
      setSelectedScrappers([]);
    } else {
      setSelectedScrappers(filteredScrappers.map(s => s.scrapperApifyId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'stopped':
        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300';
      case 'disabled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300';
    }
  };

  const handleStartScrappers = async () => {
    if (selectedScrappers.length === 0) return;
    
    // Get the selected scrappers' details
    const selectedScrapperDetails = scrappers.filter(s => selectedScrappers.includes(s.scrapperApifyId));
    
    if (selectedScrapperDetails.length > 0) {
      const scrapper = selectedScrapperDetails[0];
      setEditingScrapper(scrapper);
      setScrapperApifyId(scrapper.scrapperApifyId)
      setScrapperName(scrapper.name);
      setScrapperSource(scrapper.source);
      setTotalScrappedResult(scrapper.totalScrappedResult);
      setCustomRequestBody(scrapper.RequestBody);
      setCronSchedule(scrapper.frequency.schedule);
      setIsStartDialogOpen(true);
    }
  };

  const handleConfirmScraperStart = async () => {
     try {
        setActionLoading('start');
        startScrapers({
          name : scrapperName,
          scrapperApifyId : scrapperApifyId,
          totalScrappedResult : totalScrappedResult,
          RequestBody : customRequestBody
        });
        toast.success('Scrapper started successfully');
        setActionLoading(null);
        await changeScraperStatus(scrapperApifyId, 'running');
        await getScrappersList();
        setIsStartDialogOpen(false);
    } catch (error) {
        console.error('Error scrapping result:', error);
        setActionLoading(null);
        toast.error('Error scrapping result');
    }
  };

  const getScrappersList = async() => {
    try {
        setLoading(true);
        const response = await getScrapers();
        setScrappers(response);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching scrapers:', error);
        setLoading(false);
        toast.error('Error fetching scrapers');
    } finally {
      setSelectedScrappers([]);
    }
  }

  const openModifyDialog = async () => {
    if (selectedScrappers.length === 0) return;
    
    // Get the selected scrappers' details
    const selectedScrapperDetails = scrappers.filter(s => selectedScrappers.includes(s.scrapperApifyId));
    
    if (selectedScrapperDetails.length > 0) {
      const scrapper = selectedScrapperDetails[0];
      openEditDialog(scrapper);
    }
  }

  const handleModifyScrappers = async () => {
      try {
        if (!scrapperName.trim() || !scrapperSource.trim() || !requestBody.trim() || !cronSchedule.trim()) {
          alert('Please fill in all fields');
          return;
        }
      
        if (!validateCronSchedule(cronSchedule)) {
          setCronError('Invalid cron schedule format');
          return;
        }

        if (jsonError) { return };

        setActionLoading("modify");
        await updateScraper({
          scrapperApifyId : scrapperApifyId,
          name : scrapperName,
          status: editingScrapper!.status,
          source : scrapperSource,
          RequestBody : requestBody,
          frequency : {
            schedule : cronSchedule,
            scheduleText : ""
          }
        });
        toast.success('Scrapper updated successfully');
        await getScrappersList();
    } catch (error) {
        console.error('Error modifying scraper:', error);
        toast.error('Error modifying scraper');
    } finally {
      setActionLoading(null);
      setIsDialogOpen(false);
    }
  };

const handleEnableScrappers = async () => {
    try {
      if (selectedScrappers.length === 0) return;
      setActionLoading('enable');
      await Promise.all(
          selectedScrappers.map(scrapperApifyId => changeScraperStatus(scrapperApifyId, "stopped"))
      );
      await getScrappersList();
      toast.success('Scrappers enabled');
      setActionLoading(null);
    } catch (error) {
        console.error('Error occured:', error);
        setActionLoading(null);
        toast.error('Error occured');
    }
  };

  const handleDisableScrappers = async () => {
    try {
      if (selectedScrappers.length === 0) return;
      setActionLoading('disable');
      await Promise.all(
          selectedScrappers.map(scrapperApifyId => changeScraperStatus(scrapperApifyId, "disabled"))
      );
      await getScrappersList();
      toast.success('Scrappers disabled');
      setActionLoading(null);
    } catch (error) {
        console.error('Error occured:', error);
        setActionLoading(null);
        toast.error('Error occured');
    }
  };

  const handleDeleteScrappers = async () => {
    try {
      if (selectedScrappers.length === 0) return;
      setActionLoading('delete');
      await Promise.all(
          selectedScrappers.map(scrapperApifyId => deleteScraper (scrapperApifyId))
      );
      await getScrappersList();
      toast.success('Scrappers deleted');
      setActionLoading(null);
    } catch (error) {
        console.error('Error occured:', error);
        setActionLoading(null);
        toast.error('Error occured');
    }
  };

const validateCronSchedule = (schedule: string): boolean => {
  const specialStrings = [
    '@yearly',
    '@annually',
    '@monthly',
    '@weekly',
    '@daily',
    '@midnight',
    '@hourly',
  ];

  const normalized = schedule.trim().toLowerCase();

  // Allow special cron strings
  if (specialStrings.includes(normalized)) {
    return true;
  }

  // Validate standard cron syntax (5 fields)
  return isValidCron(normalized);
};


  const handleCronChange = (value: string) => {
    setCronSchedule(value);
    if (value && !validateCronSchedule(value)) {
      setCronError('Invalid cron schedule format. Example: "0 */6 * * *" for every 6 hours');
    } else {
      setCronError('');
    }
  };

  const openAddDialog = () => {
    setEditingScrapper(null);
    setScrapperApifyId('');
    setScrapperName('');
    setScrapperSource('');
    setRequestBody('{}');
    setCronSchedule('');
    setCronError('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (scrapper: Scrapper) => {
    setEditingScrapper(scrapper);
    setScrapperApifyId(scrapper.scrapperApifyId);
    setScrapperName(scrapper.name);
    setScrapperSource(scrapper.source);
    setRequestBody(scrapper.RequestBody);
    setCronSchedule(scrapper.frequency.schedule); 
    setCronError(''); // Placeholder
    setIsDialogOpen(true);
  };

  const handleSaveScrapper = async () => {
    try {
      if (!scrapperName.trim() || !scrapperSource.trim() || !requestBody.trim() || !cronSchedule.trim()) {
        alert('Please fill in all fields');
        return;
      }

      if (!validateCronSchedule(cronSchedule)) {
        setCronError('Invalid cron schedule format');
        return;
      }

      if (jsonError) { return };

      await addScraper({
        scrapperApifyId : scrapperApifyId,
        name : scrapperName,
        status: "stopped",
        source : scrapperSource,
        RequestBody : requestBody,
        frequency : {
          schedule : cronSchedule,
          scheduleText : ""
        }
      })
      
      toast.success('Scrapper added successfully');
      await getScrappersList();
    } catch (error) {
        console.error('Error adding scraper:', error);
        toast.error('Error adding scraper');
    } finally {
      setActionLoading(null);
      setIsDialogOpen(false);
    }
  };

  return (
  <>
    <LoadingSpinner loading={loading} fullScreen/>
    {
      !loading && (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-violet-200/20 dark:bg-violet-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-64 right-20 w-24 h-24 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-200/15 dark:bg-indigo-500/10 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
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
              <div className="flex gap-6 items-start">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {scrappers.filter(s => s.status === 'running').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Running</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {scrappers.filter(s => s.status === 'disabled').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Disabled</div>
                </div>
                <button
                  onClick={openAddDialog}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Add Scrapper
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 space-y-4">
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
                  disabled={actionLoading !== null || disabledButtons.includes('start')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'start' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Play className="w-4 h-4" />
                  Start Now
                </button>

                <button
                  onClick={openModifyDialog}
                  disabled={actionLoading !== null || disabledButtons.includes('modify')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'modify' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Edit className="w-4 h-4" />
                  Modify
                </button>

                <button
                  onClick={handleEnableScrappers}
                  disabled={actionLoading !== null || disabledButtons.includes('enable')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'enable' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <PowerCircleIcon className="w-4 h-4" />
                  Enable
                </button>

                <button
                  onClick={handleDisableScrappers}
                  disabled={actionLoading !== null || disabledButtons.includes('disable')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'disable' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Ban className="w-4 h-4" />
                  Disable
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
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
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
                    key={scrapper.scrapperApifyId}
                    onClick={() => openEditDialog(scrapper)}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer ${
                      selectedScrappers.includes(scrapper.scrapperApifyId) ? 'bg-violet-50/50 dark:bg-violet-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedScrappers.includes(scrapper.scrapperApifyId)}
                        onChange={() => toggleScrapperSelection(scrapper.scrapperApifyId)}
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
                          scrapper.status === 'disabled' ? 'bg-red-500' :
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
                        {scrapper.lastRun === "non specified" ? scrapper.lastRun : new Date(scrapper.lastRun).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {scrapper.totalScrappedResult ? scrapper.totalScrappedResult.toLocaleString() : 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Zap className="w-4 h-4" />
                        {scrapper.frequency.scheduleText}
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

        {/* Add/Edit Scrapper Dialog */}
        {isDialogOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingScrapper ? 'Edit Scrapper' : 'Add New Scrapper'}
                </h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Dialog Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Scrapper ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Scrapper Id (Apify ID)
                  </label>
                  <input
                    type="text"
                    value={scrapperApifyId}
                    onChange={(e) => setScrapperApifyId(e.target.value)}
                    placeholder="e.g., APIFY_..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500"
                  />
                </div>

                {/* Scrapper Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Scrapper Name
                  </label>
                  <input
                    type="text"
                    value={scrapperName}
                    onChange={(e) => setScrapperName(e.target.value)}
                    placeholder="e.g., LinkedIn Jobs Scraper"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500"
                  />
                </div>

                {/* Source */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Source
                  </label>
                  <input
                    type="text"
                    value={scrapperSource}
                    onChange={(e) => setScrapperSource(e.target.value)}
                    placeholder="e.g., LinkedIn, Indeed, Facebook"
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500"
                  />
                </div>

                {/* Request Body */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Request Body (JSON)
                  </label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                    
                      setRequestBody((prev) => {
                        try {
                          if (nextValue.trim()) {
                            JSON.parse(nextValue);
                          }
                          setJsonError(null);
                        } catch (err: any) {
                          setJsonError(err.message);
                        }
                      
                        return nextValue;
                      });
                    }}
                    rows={8}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 font-mono text-sm
                      border ${
                        jsonError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-300 dark:border-slate-600 focus:border-violet-500'
                      }
                    `}
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Enter the JSON configuration for your scraper
                  </p>
                  {jsonError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{jsonError}</p>
                  )}
                </div>

                {/* Cron Schedule */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Cron Schedule
                  </label>
                  <input
                    type="text"
                    value={cronSchedule}
                    onChange={(e) => handleCronChange(e.target.value)}
                    placeholder="0 */6 * * *"
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border ${
                      cronError
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-slate-300 dark:border-slate-600'
                    } text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 font-mono`}
                  />
                  {cronError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{cronError}</p>
                  )}
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p>Examples:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li><code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">0 */6 * * *</code> - Every 6 hours</li>
                      <li><code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">0 0 * * *</code> - Daily at midnight</li>
                      <li><code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">@hourly</code> - Every hour</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                {editingScrapper && (
                  <button
                  onClick={handleModifyScrappers}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Update Scrapper
                </button>
                )}
                {!editingScrapper && (
                  <button
                  onClick={handleSaveScrapper}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Create Scrapper
                </button>
                )}
              </div>
            </div>
          </div>
        </ModalPortal>
        )}

        {/* Start Scrapper Dialog */}
        {isStartDialogOpen && (
        <ModalPortal>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Start Scrapper - Review Settings
                </h2>
                <button
                  onClick={() => setIsStartDialogOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Dialog Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Scrapper ID */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Scrapper Id (Apify ID)
                  </label>
                  <input
                    type="text"
                    disabled={true}
                    value={scrapperApifyId}
                    placeholder="e.g., APIFY_..."
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500"
                  />
                </div>

                {/* Scrapper Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Scrapper Name
                  </label>
                  <div className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                    {scrapperName}
                  </div>
                </div>

                {/* Source */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Source
                  </label>
                  <div className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                    {scrapperSource}
                  </div>
                </div>

                {/* Request Body */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Request Body (JSON)
                  </label>
                  <textarea
                    value={requestBody}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                    
                      setRequestBody((prev) => {
                        try {
                          if (nextValue.trim()) {
                            JSON.parse(nextValue);
                          }
                          setJsonError(null);
                        } catch (err: any) {
                          setJsonError(err.message);
                        }
                      
                        return nextValue;
                      });
                    }}
                    rows={8}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500 dark:focus:border-violet-500 font-mono text-sm
                      border ${
                        jsonError
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-300 dark:border-slate-600 focus:border-violet-500'
                      }
                    `}
                  />
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    Enter the JSON configuration for your scraper
                  </p>
                  {jsonError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{jsonError}</p>
                  )}
                </div>

                {/* Cron Schedule */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Cron Schedule
                  </label>
                  <div className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono">
                    RUNNING NOW
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    {selectedScrappers.length > 1 
                      ? `Ready to start ${selectedScrappers.length} scrappers with these settings.`
                      : 'Ready to start this scrapper with the above configuration.'}
                  </p>
                </div>
              </div>

              {/* Dialog Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setIsStartDialogOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmScraperStart}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors shadow-lg"
                >
                  {actionLoading === 'start' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start Scrapper
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
        )}
      </div>
    </div>)}
  </>
  );
};

export default ScrapperManagementPage;