import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Eye, EyeOff, AlertCircle, Loader2, Briefcase, Calendar } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  company: string;
  author: string;
  postedAt: string;
  status: 'published' | 'draft' | 'flagged';
  views: number;
}

const ContentManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [posts] = useState<Post[]>([
    {
      id: '1',
      title: 'Software Engineering Internship',
      company: 'Tech Corp',
      author: 'john@example.com',
      postedAt: '2025-12-10',
      status: 'published',
      views: 234,
    },
    {
      id: '2',
      title: 'Data Science Opportunity',
      company: 'DataFlow Inc',
      author: 'jane@example.com',
      postedAt: '2025-12-12',
      status: 'published',
      views: 156,
    },
    {
      id: '3',
      title: 'Marketing Internship',
      company: 'Creative Solutions',
      author: 'bob@example.com',
      postedAt: '2025-12-14',
      status: 'flagged',
      views: 45,
    },
    {
      id: '4',
      title: 'Product Design Internship',
      company: 'Design Studios',
      author: 'alice@example.com',
      postedAt: '2025-12-09',
      status: 'published',
      views: 312,
    },
    {
      id: '5',
      title: 'Backend Development',
      company: 'CloudTech',
      author: 'charlie@example.com',
      postedAt: '2025-12-06',
      status: 'draft',
      views: 12,
    },
  ]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePostSelection = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => p.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'flagged':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300';
    }
  };

  const handlePublishPosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('publish');
    setTimeout(() => {
      console.log('Published posts:', selectedPosts);
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleUnpublishPosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('unpublish');
    setTimeout(() => {
      console.log('Unpublished posts:', selectedPosts);
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleDeletePosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('delete');
    setTimeout(() => {
      console.log('Deleted posts:', selectedPosts);
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-32 h-32 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-64 right-20 w-24 h-24 bg-red-200/20 dark:bg-red-500/10 rounded-full blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-amber-200/15 dark:bg-amber-500/10 rounded-full blur-xl animate-float animation-delay-500"></div>
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
                  Content Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Review, publish, and manage internship posts
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {posts.filter(p => p.status === 'published').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Published</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {posts.filter(p => p.status === 'flagged').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Flagged</div>
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
              placeholder="Search posts by title, company, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 backdrop-blur-sm"
            />
          </div>

          {/* Action Buttons */}
          {selectedPosts.length > 0 && (
            <div className="flex flex-wrap gap-3 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {selectedPosts.length} selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handlePublishPosts}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'publish' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Eye className="w-4 h-4" />
                  Publish Posts
                </button>

                <button
                  onClick={handleUnpublishPosts}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'unpublish' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <EyeOff className="w-4 h-4" />
                  Unpublish Posts
                </button>

                <button
                  onClick={handleDeletePosts}
                  disabled={actionLoading !== null}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
                >
                  {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Trash2 className="w-4 h-4" />
                  Delete Posts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Posts Table */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={toggleAllPosts}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Post
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Posted
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                      selectedPosts.includes(post.id) ? 'bg-orange-50/50 dark:bg-orange-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => togglePostSelection(post.id)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">
                            {post.title}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            by {post.author}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                      {post.company}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {post.status === 'flagged' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {post.postedAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {post.views}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No posts found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagementPage;
