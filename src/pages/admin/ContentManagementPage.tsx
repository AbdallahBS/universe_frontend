import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Trash2, Eye, EyeOff, AlertCircle, Loader2, Briefcase, Calendar, Plus, Edit3, X, Image } from 'lucide-react';
import ModalPortal from '@components/ModalPortal';

/** Post object **/
export interface Author {
  first_name: string;
  last_name: string;
  headline: string | null;
  username: string | null;
  profile_picture: string | null;
  profile_url: string | null;
}

export interface MediaImage {
  url: string;
  width: number;
  height: number;
}

export interface Document {
  title: string;
  page_count: number;
  url: string;
  thumbnail: string;
}

export interface Media {
  type: "image" | "video" | "document" | string;
  url: string;
  thumbnail: string | null;
  images: MediaImage[];
}

export interface PostedAt {
  date: string;
  relative: string;
  timestamp: number;
}

export interface Stats {
  total_reactions: number;
  like: number;
  support: number;
  love: number;
  insight: number;
  celebrate: number;
  funny: number;
  comments: number;
  reposts: number;
}

export interface LinkedInPost {
  _id?: string;
  urn: {
    activity_urn?: string;
    [key: string]: any;
  };
  __v?: number;
  author: Author;
  createdAt: string;
  updatedAt: string;
  document: Document | null;
  full_urn: string;
  media: Media | null;
  post_type: string;
  posted_at: PostedAt;
  profile_input: string;
  reshared_post: LinkedInPost | null;
  stats: Stats;
  text: string;
  title: string;
  category: string;
  url: string;
}

interface DialogState {
  isOpen: boolean;
  mode: 'add' | 'edit';
  postData: LinkedInPost;
}

const ContentManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'flagged'>('all');
  
  const getPostStatus = (post: LinkedInPost): 'published' | 'flagged' => {
    return (!post.title || !post.category) ? 'flagged' : 'published';
  };

  const [posts, setPosts] = useState<LinkedInPost[]>([
    {
      _id: '1',
      urn: { activity_urn: 'urn:li:activity:1234567890' },
      author: {
        first_name: 'John',
        last_name: 'Doe',
        headline: 'Software Engineer',
        username: 'johndoe',
        profile_picture: null,
        profile_url: null,
      },
      createdAt: '2025-12-10T00:00:00.000Z',
      updatedAt: '2025-12-10T00:00:00.000Z',
      document: null,
      full_urn: 'urn:li:post:1',
      media: null,
      post_type: 'text',
      posted_at: {
        date: '2025-12-10 18:41:54',
        relative: '8 days ago',
        timestamp: 1733857314000,
      },
      profile_input: 'tech-corp',
      reshared_post: null,
      stats: {
        total_reactions: 234,
        like: 150,
        support: 40,
        love: 30,
        insight: 10,
        celebrate: 4,
        funny: 0,
        comments: 15,
        reposts: 8,
      },
      text: 'Join our talented engineering team for a rewarding internship experience.',
      title: 'Software Engineering Internship',
      category: 'internship',
      url: 'https://linkedin.com/post/1',
    },
    {
      _id: '2',
      urn: { activity_urn: 'urn:li:activity:2345678901' },
      author: {
        first_name: 'Jane',
        last_name: 'Smith',
        headline: 'Data Scientist',
        username: 'janesmith',
        profile_picture: null,
        profile_url: null,
      },
      createdAt: '2025-12-12T00:00:00.000Z',
      updatedAt: '2025-12-12T00:00:00.000Z',
      document: null,
      full_urn: 'urn:li:post:2',
      media: null,
      post_type: 'text',
      posted_at: {
        date: '2025-12-12 14:20:00',
        relative: '6 days ago',
        timestamp: 1734015600000,
      },
      profile_input: 'dataflow-inc',
      reshared_post: null,
      stats: {
        total_reactions: 156,
        like: 100,
        support: 30,
        love: 20,
        insight: 6,
        celebrate: 0,
        funny: 0,
        comments: 12,
        reposts: 5,
      },
      text: 'Work with cutting-edge data science tools and technologies.',
      title: 'Data Science Opportunity',
      category: 'job',
      url: 'https://linkedin.com/post/2',
    },
    {
      _id: '3',
      urn: { activity_urn: 'urn:li:activity:3456789012' },
      author: {
        first_name: 'Bob',
        last_name: 'Johnson',
        headline: 'Marketing Manager',
        username: 'bobjohnson',
        profile_picture: null,
        profile_url: null,
      },
      createdAt: '2025-12-14T00:00:00.000Z',
      updatedAt: '2025-12-14T00:00:00.000Z',
      document: null,
      full_urn: 'urn:li:post:3',
      media: null,
      post_type: 'text',
      posted_at: {
        date: '2025-12-14 10:15:00',
        relative: '4 days ago',
        timestamp: 1734174900000,
      },
      profile_input: 'creative-solutions',
      reshared_post: null,
      stats: {
        total_reactions: 45,
        like: 30,
        support: 10,
        love: 5,
        insight: 0,
        celebrate: 0,
        funny: 0,
        comments: 3,
        reposts: 2,
      },
      text: 'Creative marketing position with excellent learning opportunities.',
      title: '',
      category: 'marketing',
      url: 'https://linkedin.com/post/3',
    },
  ]);

  const createEmptyPost = (): LinkedInPost => ({
    urn: {},
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
  });

  const [dialog, setDialog] = useState<DialogState>({
    isOpen: false,
    mode: 'add',
    postData: createEmptyPost(),
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.profile_input.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${post.author.first_name} ${post.author.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());

    const postStatus = getPostStatus(post);
    const matchesStatus = statusFilter === 'all' || postStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getPostIdentifier = (post: LinkedInPost) => {
    return post.urn?.activity_urn || post._id || '';
  };

  const togglePostSelection = (post: LinkedInPost) => {
    const identifier = getPostIdentifier(post);
    setSelectedPosts(prev =>
      prev.includes(identifier)
        ? prev.filter(id => id !== identifier)
        : [...prev, identifier]
    );
  };

  const toggleAllPosts = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(p => getPostIdentifier(p)));
    }
  };

  const getStatusColor = (status: 'published' | 'flagged') => {
    switch (status) {
      case 'published':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'flagged':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    }
  };

  const handlePublishPosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('publish');
    setTimeout(() => {
      setPosts(posts.map(p => {
        if (selectedPosts.includes(getPostIdentifier(p))) {
          // Ensure title and category are filled to make it published
          return {
            ...p,
            title: p.title || 'Untitled Post',
            category: p.category || 'general'
          };
        }
        return p;
      }));
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleUnpublishPosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('unpublish');
    setTimeout(() => {
      setPosts(posts.map(p =>
        selectedPosts.includes(getPostIdentifier(p)) ? { ...p, title: '' } : p
      ));
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

  const handleDeletePosts = async () => {
    if (selectedPosts.length === 0) return;
    setActionLoading('delete');
    setTimeout(() => {
      setPosts(posts.filter(p => !selectedPosts.includes(getPostIdentifier(p))));
      setSelectedPosts([]);
      setActionLoading(null);
    }, 1000);
  };

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

  const handleAuthorInputChange = (field: keyof Author, value: string) => {
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

  const handleStatsInputChange = (field: keyof Stats, value: number) => {
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

  const handlePostedAtInputChange = (field: keyof PostedAt, value: any) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        posted_at: {
          ...prev.postData.posted_at,
          [field]: value,
        },
      },
    }));
  };

  const handleMediaInputChange = (field: keyof Media, value: any) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        media: {
          ...(prev.postData.media || { type: 'image', url: '', thumbnail: null, images: [] }),
          [field]: value,
        },
      },
    }));
  };

  const handleDocumentInputChange = (field: keyof Document, value: any) => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        document: {
          ...(prev.postData.document || { title: '', page_count: 0, url: '', thumbnail: '' }),
          [field]: value,
        },
      },
    }));
  };

  const toggleMediaSection = () => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        media: prev.postData.media ? null : { type: 'image', url: '', thumbnail: null, images: [] },
      },
    }));
  };

  const toggleDocumentSection = () => {
    setDialog(prev => ({
      ...prev,
      postData: {
        ...prev.postData,
        document: prev.postData.document ? null : { title: '', page_count: 0, url: '', thumbnail: '' },
      },
    }));
  };

  const handleSavePost = async () => {
    if (!dialog.postData.title || !dialog.postData.profile_input) {
      return;
    }

    setActionLoading('save');
    setTimeout(() => {
      if (dialog.mode === 'add') {
        const newPost: LinkedInPost = {
          ...dialog.postData,
          urn: { activity_urn: `urn:li:activity:${Date.now()}` },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          posted_at: {
            date: new Date().toISOString().replace('T', ' ').split('.')[0],
            relative: 'Just now',
            timestamp: Date.now(),
          },
        };
        setPosts([...posts, newPost]);
        console.log('Added post:', newPost);
      } else {
        setPosts(posts.map(p =>
          getPostIdentifier(p) === getPostIdentifier(dialog.postData)
            ? { ...dialog.postData, updatedAt: new Date().toISOString() }
            : p
        ));
        console.log('Updated post:', dialog.postData);
      }
      closeDialog();
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
                  Review, publish, and manage LinkedIn posts
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {posts.filter(p => getPostStatus(p) === 'published').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Published</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {posts.filter(p => getPostStatus(p) === 'flagged').length}
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

          {/* Filter and Add Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'published'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter('flagged')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'flagged'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                Flagged
              </button>
            </div>

            <div className="flex-1"></div>

            <button
              onClick={openAddDialog}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Post
            </button>
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
                    Reactions
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={getPostIdentifier(post)}
                    className={`border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${
                      selectedPosts.includes(getPostIdentifier(post)) ? 'bg-orange-50/50 dark:bg-orange-900/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(getPostIdentifier(post))}
                        onChange={() => togglePostSelection(post)}
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
                            {post.title}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">
                            by {post.author.first_name} {post.author.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                      {post.profile_input}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPostStatus(post) === 'flagged' && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(getPostStatus(post))}`}>
                          {getPostStatus(post).charAt(0).toUpperCase() + getPostStatus(post).slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        {post.posted_at.date.split(' ')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                      {post.stats.total_reactions}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openEditDialog(post)}
                        className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>
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

                  {/* Posted At Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
                      Posted At Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Date
                        </label>
                        <input
                          type="text"
                          value={dialog.postData.posted_at.date}
                          onChange={(e) => handlePostedAtInputChange('date', e.target.value)}
                          placeholder="2025-08-22 18:41:54"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                          Timestamp
                        </label>
                        <input
                          type="number"
                          value={dialog.postData.posted_at.timestamp}
                          onChange={(e) => handlePostedAtInputChange('timestamp', parseInt(e.target.value) || 0)}
                          placeholder="1734015600000"
                          className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
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
                        onChange={(e) => handlePostedAtInputChange('relative', e.target.value)}
                        placeholder="4 months ago • Visible to anyone on or off LinkedIn"
                        className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
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

                  {/* Media Section */}
                  <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Media Attachment
                      </h3>
                      <button
                        type="button"
                        onClick={toggleMediaSection}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          dialog.postData.media
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {dialog.postData.media ? 'Remove Media' : 'Add Media'}
                      </button>
                    </div>

                    {dialog.postData.media && (
                      <div className="space-y-4 pl-4 border-l-2 border-orange-500">
                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                            Media Type
                          </label>
                          <select
                            value={dialog.postData.media.type}
                            onChange={(e) => handleMediaInputChange('type', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                          >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="document">Document</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                              Media URL
                            </label>
                            <input
                              type="url"
                              value={dialog.postData.media.url}
                              onChange={(e) => handleMediaInputChange('url', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                              Thumbnail URL
                            </label>
                            <input
                              type="url"
                              value={dialog.postData.media.thumbnail || ''}
                              onChange={(e) => handleMediaInputChange('thumbnail', e.target.value || null)}
                              placeholder="https://..."
                              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                            Images (JSON Array)
                          </label>
                          <textarea
                            value={JSON.stringify(dialog.postData.media.images, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                handleMediaInputChange('images', parsed);
                              } catch (err) {
                                // Invalid JSON, ignore
                              }
                            }}
                            placeholder='[{"url": "https://...", "width": 800, "height": 600}]'
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors font-mono text-xs resize-none"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Format: Array of objects with url, width, and height
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Document Section */}
                  <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Document Attachment
                      </h3>
                      <button
                        type="button"
                        onClick={toggleDocumentSection}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          dialog.postData.document
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {dialog.postData.document ? 'Remove Document' : 'Add Document'}
                      </button>
                    </div>

                    {dialog.postData.document && (
                      <div className="space-y-4 pl-4 border-l-2 border-blue-500">
                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                            Document Title
                          </label>
                          <input
                            type="text"
                            value={dialog.postData.document.title}
                            onChange={(e) => handleDocumentInputChange('title', e.target.value)}
                            placeholder="Document title"
                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                              Document URL
                            </label>
                            <input
                              type="url"
                              value={dialog.postData.document.url}
                              onChange={(e) => handleDocumentInputChange('url', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                              Thumbnail URL
                            </label>
                            <input
                              type="url"
                              value={dialog.postData.document.thumbnail}
                              onChange={(e) => handleDocumentInputChange('thumbnail', e.target.value)}
                              placeholder="https://..."
                              className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="block text-sm font-semibold text-slate-900 dark:text-white">
                            Page Count
                          </label>
                          <input
                            type="number"
                            value={dialog.postData.document.page_count}
                            onChange={(e) => handleDocumentInputChange('page_count', parseInt(e.target.value) || 0)}
                            placeholder="0"
                            min="0"
                            className="w-full px-4 py-2 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    )}
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
          </ModalPortal>
        )}
      </div>
    </div>
  );
};

export default ContentManagementPage;