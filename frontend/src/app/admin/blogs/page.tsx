'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Plus, Search, Edit, Trash2, Calendar, User, Eye, EyeOff,
  ChevronLeft, ChevronRight, Filter, AlertCircle, Sparkles, X, BookOpen, Link2
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog } from '@/hooks/useBlogs';
import { useAuthStore } from '@/store/auth.store';
import { formatDate } from '@/lib/utils';
import { ImageUpload } from '@/components/ui/image-upload';

export default function AdminBlogsPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  // Route protection
  useEffect(() => {
    if (user && user.role !== 'Admin') {
      router.push('/');
    }
  }, [user, router]);

  // Query state
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);

  const { data: blogsData, isLoading } = useBlogs({ search, onlyPublished: false });
  const blogs = blogsData?.data || [];
  
  // Local filtering/pagination since we get all from hook
  const filteredBlogs = blogs; // backend does the search filtering
  const total = blogsData?.total || 0;
  const paginatedBlogs = filteredBlogs; // API handles pagination if server-side, but standard endpoints return all or paginated. Our service does handle it if passed.

  // Mutations
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog();
  const deleteBlog = useDeleteBlog();

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [formError, setFormError] = useState('');

  // Open form for creating
  const handleOpenCreate = () => {
    setEditingBlogId(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setImageUrl('');
    setVideoUrl('');
    setAuthor(user ? `${user.firstName} ${user.lastName}` : 'Admin');
    setTagsInput('Palace, Sri Lanka');
    setIsPublished(false);
    setFormError('');
    setIsFormOpen(true);
  };

  // Open form for editing
  const handleOpenEdit = (blog: any) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content);
    setImageUrl(blog.imageUrl || '');
    setVideoUrl(blog.videoUrl || '');
    setAuthor(blog.author || 'Admin');
    
    // Parse tags JSON or handle comma-separated
    let tagsStr = '';
    if (blog.tags) {
      try {
        const parsed = JSON.parse(blog.tags);
        tagsStr = Array.isArray(parsed) ? parsed.join(', ') : blog.tags;
      } catch {
        tagsStr = blog.tags;
      }
    }
    setTagsInput(tagsStr);
    setIsPublished(blog.isPublished);
    setFormError('');
    setIsFormOpen(true);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim() || !content.trim()) {
      setFormError('Title and Content are required fields.');
      return;
    }

    // Convert comma separated tags to JSON array string
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    const tagsJson = JSON.stringify(tagsArray);

    const payload = {
      title,
      excerpt,
      content,
      imageUrl,
      videoUrl,
      author,
      tags: tagsJson,
      isPublished,
    };

    try {
      if (editingBlogId) {
        await updateBlog.mutateAsync({ ...payload, id: editingBlogId });
      } else {
        await createBlog.mutateAsync(payload);
      }
      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err.response?.data?.message || 'An error occurred while saving the post.');
    }
  };

  // Delete handler
  const handleDelete = async (id: number) => {
    try {
      await deleteBlog.mutateAsync(id);
      setDeleteConfirmId(null);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Header / Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-650 text-xs font-semibold">Admin</Link>
              <span className="text-slate-350">/</span>
              <span className="text-slate-800 text-xs font-semibold">Vlogs & Blogs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Video className="h-7 w-7 text-rose-500" />
              Palace Vlogs & Blogs
            </h1>
            <p className="text-slate-500 text-xs mt-1">{total} posts configured</p>
          </div>
          <Button
            onClick={handleOpenCreate}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl px-5 py-2.5 font-bold shadow-md hover:-translate-y-0.5 transition-all border border-rose-450"
          >
            <Plus className="h-4 w-4 mr-2" /> Add vlog / blog
          </Button>
        </motion.div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search posts by title or tag..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm focus:border-rose-400 focus:ring-rose-400"
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Showing {paginatedBlogs.length} of {total} entries</span>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500" />
          </div>
        ) : paginatedBlogs.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-20 text-center">
            <Video className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-bold text-slate-700">No blog posts found</h3>
            <p className="text-slate-400 text-xs mt-1">Start by creating your first post about Sri Lankan palaces.</p>
            <Button onClick={handleOpenCreate} variant="outline" className="mt-4 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl">
              Create First Entry
            </Button>
          </div>
        ) : (
          /* Data Table */
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-400 font-bold text-[10px] tracking-wider uppercase">
                    <th className="py-4 px-6">Post Cover</th>
                    <th className="py-4 px-6">Title & Excerpt</th>
                    <th className="py-4 px-6">Author</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date Created</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {paginatedBlogs.map((blog) => {
                    const isVlog = !!(blog.videoUrl && blog.videoUrl.trim());
                    const tags = blog.tags ? JSON.parse(blog.tags) as string[] : [];
                    
                    return (
                      <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 shrink-0">
                          {blog.imageUrl ? (
                            <img src={blog.imageUrl} alt="" className="w-14 aspect-video rounded-lg object-cover shadow-sm border border-slate-100 bg-slate-50" />
                          ) : (
                            <div className="w-14 aspect-video rounded-lg bg-slate-100 flex items-center justify-center border border-slate-250">
                              <BookOpen className="h-4 w-4 text-slate-400" />
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6 max-w-sm">
                          <span className="font-extrabold text-slate-800 line-clamp-1">{blog.title}</span>
                          <span className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">{blog.excerpt || 'No excerpt available.'}</span>
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {tags.map((t) => (
                              <span key={t} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 rounded text-[9px] font-semibold">
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-550 font-medium">
                          <div className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            <span>{blog.author || 'Admin'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge variant="outline" className={`font-bold px-2 py-0.5 border text-[9px] rounded-lg tracking-wider ${
                            isVlog 
                              ? 'bg-rose-50 text-rose-600 border-rose-100' 
                              : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                          }`}>
                            {isVlog ? 'VLOG' : 'BLOG'}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5">
                            {blog.isPublished ? (
                              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                <Eye className="h-4 w-4" /> Published
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-slate-400 font-bold">
                                <EyeOff className="h-4 w-4" /> Draft
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-450 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-slate-450" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEdit(blog)}
                              className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-650 hover:text-slate-800 flex items-center justify-center transition-colors border border-transparent hover:border-slate-200"
                              title="Edit post"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            {/* Delete */}
                            {deleteConfirmId === blog.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(blog.id)}
                                  className="px-2 py-1 rounded bg-rose-550 text-white font-bold text-[10px] hover:bg-rose-600"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 rounded bg-slate-100 text-slate-600 font-bold text-[10px] hover:bg-slate-200 border border-slate-200"
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(blog.id)}
                                className="w-8 h-8 rounded-lg hover:bg-rose-50 text-rose-500 hover:text-rose-600 flex items-center justify-center transition-colors border border-transparent hover:border-rose-100"
                                title="Delete post"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination footer (placeholder / simple UI) */}
            <div className="bg-slate-50/75 border-t border-slate-200 px-6 py-4 flex items-center justify-between text-xs text-slate-450 font-semibold">
              <span>Page 1 of 1</span>
              <div className="flex gap-1.5">
                <Button disabled variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button disabled variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over / Modal Form Panel */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-rose-500" />
                    {editingBlogId ? 'Edit Vlog / Blog Post' : 'Add New Vlog / Blog Post'}
                  </h3>
                  <p className="text-slate-450 text-xs mt-1">Configure post titles, palace descriptors, and media embed attachments.</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-450 hover:text-slate-700 flex items-center justify-center transition-all"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="space-y-5 flex-1">
                {formError && (
                  <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-2.5 text-xs text-rose-600 font-medium">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Title */}
                <div className="space-y-1.5">
                  <label htmlFor="form-title" className="text-xs font-bold text-slate-700">Post Title *</label>
                  <Input
                    id="form-title"
                    placeholder="e.g. Sigiriya: The Magnificent Lion Rock Palace"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="rounded-xl border-slate-200"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-1.5">
                  <label htmlFor="form-excerpt" className="text-xs font-bold text-slate-700">Short Summary / Excerpt</label>
                  <Input
                    id="form-excerpt"
                    placeholder="A brief snippet displayed on listings pages..."
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Author */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-author" className="text-xs font-bold text-slate-700">Author Name</label>
                    <Input
                      id="form-author"
                      placeholder="e.g. TravelEase Guide"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                      className="rounded-xl border-slate-200"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-tags" className="text-xs font-bold text-slate-700">Tags (Comma-separated)</label>
                    <Input
                      id="form-tags"
                      placeholder="e.g. Palace, Sigiriya, History"
                      value={tagsInput}
                      onChange={e => setTagsInput(e.target.value)}
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Image Upload */}
                  <ImageUpload
                    value={imageUrl}
                    onChange={setImageUrl}
                    label="Cover Image"
                    placeholder="https://images.unsplash.com/..."
                  />

                  {/* Video URL */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-video" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Link2 className="h-3.5 w-3.5 text-rose-500" />
                      <span>YouTube Video URL (Optional, for Vlogs)</span>
                    </label>
                    <Input
                      id="form-video"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                      className="rounded-xl border-rose-105 focus:border-rose-400 focus:ring-rose-450/20"
                    />
                    <span className="text-[10px] text-slate-450 block leading-tight">Providing a valid YouTube link turns this post into a video vlog.</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label htmlFor="form-content" className="text-xs font-bold text-slate-700">Blog Article Content *</label>
                  <textarea
                    id="form-content"
                    rows={6}
                    placeholder="Write the full palace story or vlog script notes here..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                    required
                  />
                </div>

                {/* Publish Toggle */}
                <div className="flex items-center gap-2.5 py-1">
                  <input
                    type="checkbox"
                    id="form-publish"
                    checked={isPublished}
                    onChange={e => setIsPublished(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-slate-350 text-rose-600 focus:ring-rose-500"
                  />
                  <label htmlFor="form-publish" className="text-xs font-extrabold text-slate-800 cursor-pointer select-none">
                    Publish Immediately (Visible to guests)
                  </label>
                </div>

                {/* Buttons */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3.5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    className="rounded-xl font-bold border-slate-250 text-slate-650 h-10 px-5"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl font-bold shadow-md h-10 px-6 border border-rose-450 flex items-center justify-center gap-1.5"
                    disabled={createBlog.isPending || updateBlog.isPending}
                  >
                    {(createBlog.isPending || updateBlog.isPending) && (
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white" />
                    )}
                    <span>Save Post</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
