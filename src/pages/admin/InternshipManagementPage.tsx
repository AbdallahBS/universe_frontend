import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, AlertCircle, Loader2, Briefcase, Calendar, Plus, Edit3, X, Image, ChevronLeft, ChevronRight } from 'lucide-react';
import ModalPortal from '@components/ModalPortal';
import { LinkedInPost } from 'types/resource';
import { getInternships, updateInternship, deleteInternship } from '@services/internshipService';

interface DialogState {
  isOpen: boolean;
  mode: 'add' | 'edit';
  postData: LinkedInPost;
  editUrn?: string;
}

interface DeleteConfirm {
  isOpen: boolean;
  urn: string;
  title: string;
}

const InternshipManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [posts, setPosts] = useState<LinkedInPost[]>([
  ]);

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirm>({
    isOpen: false,
    urn: '',
    title: '',
  });

  // Dialog state
  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    mode: 'add',
    postData: createEmptyPost(),
  });

  // Multi-selection state
  const [selectedUrns, setSelectedUrns] = useState<Set<string>>(new Set());

  function createEmptyPost(): LinkedInPost {
    return {
      _id: '',
      urn: { activity_urn: '' },
      author: {
        first_name: '',
        last_name: '',
        headline: '',
        username: '',
        profile_picture: null,
        profile_url: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      document: null,
      full_urn: '',
      media: null,
      post_type: 'text',
      posted_at: {
        date: new Date().toISOString().split('T')[0] + ' 00:00:00',
        relative: 'Just now',
        timestamp: Date.now(),
      },
      profile_input: '',
      reshared_post: null,
      stats: {
        total_reactions: 0,
        like: 0,
        support: 0,
        love: 0,
        insight: 0,
        celebrate: 0,
        funny: 0,
        comments: 0,
        reposts: 0,
      },
      text: '',
      title: '',
      category: 'draft',
      url: '',
    };
  }

  const getPostUrn = (post: LinkedInPost): string => {
    return post.urn?.activity_urn || post.full_urn || post._id || '';
  };

  // Fetch internships
  const fetchInternships = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInternships(page.toString(), limit.toString(), [], {}, searchTerm);
      
      if (response.success && response.data) {
        setPosts(response.data.internships || response.data.posts || []);
        if (response.data.pagination) {
          setTotal(response.data.pagination.total || 0);
          setTotalPages(response.data.pagination.pages || 1);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch internships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page, limit]);


  // Filter posts on frontend
  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      (post.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.text?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (post.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      `${post.author.first_name || ''} ${post.author.last_name || ''}`.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const openAddDialog = () => {
    setDialog({
      isOpen: true,
      mode: 'add',
      postData: createEmptyPost(),
    });
  };

  const openEditDialog = (post: LinkedInPost) => {
    setDialog({
      isOpen: true,
      mode: 'edit',
      postData: { ...post },
      editUrn: getPostUrn(post),
    });
  };

  const closeDialog = () => {
    setDialog({
      isOpen: false,
      mode: 'add',
      postData: createEmptyPost(),
    });
  };

  const handleDialogInputChange = (field: string, value: any) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        [field]: value,
      },
    }));
  };

  const handleAuthorInputChange = (field: keyof typeof dialog.postData.author, value: string) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        author: {
          ...prev.postData.author,
          [field]: value,
        },
      },
    }));
  };

  const handleStatsInputChange = (field: keyof typeof dialog.postData.stats, value: number) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        stats: {
          ...prev.postData.stats,
          [field]: value,
        },
      },
    }));
  };

  const handleSavePost = async () => {
    if (!dialog.postData.title || !dialog.postData.profile_input) {
      setError('Title and Company Profile are required');
      return;
    }

    try {
      setActionLoading('save');

      if (dialog.mode === 'edit' && dialog.editUrn) {
        // Update existing post
        await updateInternship(dialog.editUrn, dialog.postData);
      } else {
        // For add mode, if API supports creating, call the service
        // Otherwise, add to list locally
        dialog.postData._id = `${Date.now()}`;
        dialog.postData.full_urn = `urn:li:activity:${Date.now()}`;
      }

      await fetchInternships();
      closeDialog();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeletePost = async () => {
    if (!deleteConfirm.urn) return;

    try {
      setActionLoading('delete');
      await deleteInternship(deleteConfirm.urn);
      setDeleteConfirm({ isOpen: false, urn: '', title: '' });
      await fetchInternships();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteMultiplePosts = async (selectedUrns : Set<string>) => {
    if (!selectedUrns.size) return;

    try {
      setActionLoading('delete');
      for (const urn of selectedUrns) {
        await deleteInternship(urn);
      }
      await fetchInternships();
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete posts');
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelectPost = (urn: string) => {
    const newSelected = new Set(selectedUrns);
    if (newSelected.has(urn)) {
      newSelected.delete(urn);
    } else {
      newSelected.add(urn);
    }
    setSelectedUrns(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedUrns.size === filteredPosts.length && filteredPosts.length > 0) {
      setSelectedUrns(new Set());
    } else {
      const allUrns = new Set(filteredPosts.map(p => getPostUrn(p)));
      setSelectedUrns(allUrns);
    }
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
            onClick={() => navigate('/admin/contents')}
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Internship Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage and moderate internship posts
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {total}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total posts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="underline">Close</button>
          </div>
        )}

        {/* Search and Filters */}
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

          {/* Filter and Add Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1"></div>

            <button
              onClick={openAddDialog}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Post
            </button>
          </div>

          {/* Bulk Actions Bar */}
          {selectedUrns.size > 0 && (
            <div className="flex flex-wrap gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                {selectedUrns.size} selected
              </span>
              <div className="flex-1"></div>
              <button
                onClick={async () => {
                  if (window.confirm(`Are you sure you want to delete ${selectedUrns.size} selected posts?`)) {
                    await handleDeleteMultiplePosts(selectedUrns);
                    setSelectedUrns(new Set());
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Loading State

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        )}

        {/* Posts Table */}
        {!loading && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-fade-in-up animation-delay-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUrns.size === filteredPosts.length && filteredPosts.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Post
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Posted
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => {
                    const postUrn = getPostUrn(post);
                    const isSelected = selectedUrns.has(postUrn);
                    return (
                      <tr
                        key={postUrn}
                        className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                          isSelected ? 'bg-orange-50/50 dark:bg-orange-900/20' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectPost(postUrn)}
                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                              {post.media ? <Image className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                {post.title || post.text.substring(0, 40) + '...' || 'Untitled'}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-400">
                                by {post.author.first_name} {post.author.last_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                          {post.category}
                        </td>
                        <td className="text-xs text-slate-600 dark:text-slate-400">
                          {post.text.length > 50 ? post.text.substring(0, 50) + '...' : post.text || 'No description'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Calendar className="w-4 h-4" />
                            {post.posted_at.date.split(' ')[0]}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditDialog(post)}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ isOpen: true, urn: getPostUrn(post), title: post.title || 'This post' })}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  {loading ? 'Loading internships...' : 'No posts found matching your search criteria.'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredPosts.length > 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, total)} of {total} results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.isOpen && (
          <ModalPortal>
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-200/50 dark:border-slate-700/50 animate-in fade-in zoom-in-95 duration-300">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Post?</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{deleteConfirm.title}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    This action cannot be undone. The post will be permanently deleted.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 p-4 flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: false, urn: '', title: '' })}
                    className="px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePost}
                    disabled={actionLoading === 'delete'}
                    className="px-4 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 disabled:bg-slate-400 transition-colors inline-flex items-center gap-2"
                  >
                    {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}

        {/* Edit/Add Post Dialog */}
        {dialog.isOpen && (
          <ModalPortal>
            <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {dialog.mode === 'add' ? 'Add New Post' : 'Edit Post'}
                  </h2>
                  <button
                    onClick={closeDialog}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* URN - Read Only */}
                  {dialog.mode === 'edit' && (
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        URN (Read-only)
                      </label>
                      <input
                        type="text"
                        value={dialog.editUrn || ''}
                        disabled={true}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 cursor-not-allowed opacity-60"
                      />
                    </div>
                  )}

                  {/* Post Title */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                      Post Title *
                    </label>
                    <input
                      type="text"
                      value={dialog.postData.title}
                      onChange={(e) => handleDialogInputChange('title', e.target.value)}
                      placeholder="e.g., Software Engineering Internship"
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Post Text/Description */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                      Post Text *
                    </label>
                    <textarea
                      value={dialog.postData.text}
                      onChange={(e) => handleDialogInputChange('text', e.target.value)}
                      placeholder="Post content and details..."
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Company/Profile Input, URL, and Post Type */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Company Profile *
                      </label>
                      <input
                        type="text"
                        value={dialog.postData.profile_input}
                        onChange={(e) => handleDialogInputChange('profile_input', e.target.value)}
                        placeholder="e.g., tech-corp"
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Post Type
                      </label>
                      <input
                        type="text"
                        value={dialog.postData.post_type}
                        onChange={(e) => handleDialogInputChange('post_type', e.target.value)}
                        placeholder="e.g., text, video, image"
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Post URL
                      </label>
                      <input
                        type="url"
                        value={dialog.postData.url}
                        onChange={(e) => handleDialogInputChange('url', e.target.value)}
                        placeholder="https://linkedin.com/post/..."
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                      Category
                    </label>
                    <input
                      type="text"
                      value={dialog.postData.category}
                      onChange={(e) => handleDialogInputChange('category', e.target.value)}
                      placeholder="e.g., internship, job, marketing"
                      className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Posted At Information - Read Only */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Posted At Information (Read-only)
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Date
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.posted_at.date}
                          disabled={true}
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 cursor-not-allowed opacity-60"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Timestamp
                        </label>
                        <input
                          type="number"
                          value={dialog.postData.posted_at.timestamp}
                          disabled={true}
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 cursor-not-allowed opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Relative Time
                      </label>
                      <input
                        type="text"
                        value={dialog.postData.posted_at.relative}
                        disabled={true}
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 cursor-not-allowed opacity-60"
                      />
                    </div>
                  </div>

                  {/* Author Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Author Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.author.first_name}
                          onChange={(e) => handleAuthorInputChange('first_name', e.target.value)}
                          placeholder="John"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.author.last_name}
                          onChange={(e) => handleAuthorInputChange('last_name', e.target.value)}
                          placeholder="Doe"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Username
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.author.username || ''}
                          onChange={(e) => handleAuthorInputChange('username', e.target.value)}
                          placeholder="johndoe"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Headline
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.author.headline || ''}
                          onChange={(e) => handleAuthorInputChange('headline', e.target.value)}
                          placeholder="Software Engineer"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats Information */}
                  <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Post Statistics
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Total Reactions
                        </label>
                        <input
                          type="number"
                          value={dialog.postData.stats.total_reactions}
                          onChange={(e) => handleStatsInputChange('total_reactions', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Comments
                        </label>
                        <input
                          type="number"
                          value={dialog.postData.stats.comments}
                          onChange={(e) => handleStatsInputChange('comments', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Reposts
                        </label>
                        <input
                          type="number"
                          value={dialog.postData.stats.reposts}
                          onChange={(e) => handleStatsInputChange('reposts', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Reaction Types
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Like</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.like}
                            onChange={(e) => handleStatsInputChange('like', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Support</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.support}
                            onChange={(e) => handleStatsInputChange('support', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Love</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.love}
                            onChange={(e) => handleStatsInputChange('love', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Insight</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.insight}
                            onChange={(e) => handleStatsInputChange('insight', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Celebrate</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.celebrate}
                            onChange={(e) => handleStatsInputChange('celebrate', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-xs text-slate-600 dark:text-slate-400">Funny</label>
                          <input
                            type="number"
                            value={dialog.postData.stats.funny}
                            onChange={(e) => handleStatsInputChange('funny', parseInt(e.target.value) || 0)}
                            min="0"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                      </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200/50 dark:border-slate-700/50 p-4 flex gap-3 justify-end">
                  <button
                    onClick={closeDialog}
                    className="px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePost}
                    disabled={actionLoading === 'save' || !dialog.postData.title || !dialog.postData.profile_input}
                    className={`px-6 py-2 rounded-lg font-semibold text-white transition-all inline-flex items-center gap-2 ${
                      actionLoading === 'save' || !dialog.postData.title || !dialog.postData.profile_input
                        ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed opacity-50'
                        : 'bg-orange-600 hover:bg-orange-700 cursor-pointer shadow-lg'
                    }`}
                  >
                    {actionLoading === 'save' && <Loader2 className="w-4 h-4 animate-spin" />}
                    {dialog.mode === 'add' ? 'Create Post' : 'Update Post'}
                  </button>
                </div>
              </div>
            </div>
            </div>
          </ModalPortal>
        )}
      </div>
    </div>
  );
};

export default InternshipManagementPage;