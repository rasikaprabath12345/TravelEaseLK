'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Filter, Eye, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBlogs, useDeleteBlog } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';

export default function AdminBlogsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const pageSize = 10;

  // Fetch blogs (both published and drafts for administrative view)
  const { data: blogsData, isLoading } = useBlogs({
    search: search || undefined,
    isPublished: undefined, // undefined returns both drafts and published
    page,
    pageSize,
  });

  const deleteBlog = useDeleteBlog();

  const blogs = blogsData?.data || [];
  const total = blogsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog.mutateAsync(id);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete blog', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 text-sm font-medium">Blogs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-rose-500" /> Manage Travel Blogs
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">{total} blog articles total</p>
          </div>
          <Link href="/admin/blogs/create">
            <Button className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl px-5 py-2.5 font-semibold shadow-md hover:-translate-y-0.5 transition-all">
              <Plus className="h-4 w-4 mr-2" /> Add Blog Article
            </Button>
          </Link>
        </motion.div>

        {/* Filter / Search bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search blog title, content, excerpt..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 rounded-xl border-slate-200 h-10 text-sm focus-visible:ring-rose-500 focus-visible:border-rose-500"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto text-sm text-slate-500 font-semibold">
            <Filter className="h-4 w-4 text-slate-400" />
            <span>Showing {blogs.length} of {total} articles</span>
          </div>
        </div>

        {/* Content Table or Grid */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-white rounded-2xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <BookOpen className="h-16 w-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No blog articles found</p>
            <p className="text-slate-400 text-sm mt-1">Create your first travel guide article to display on the blog page.</p>
            <Link href="/admin/blogs/create" className="inline-block mt-4">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs h-9">
                Create Article
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="px-6 py-4.5">Article Details</th>
                    <th className="px-6 py-4.5">Author</th>
                    <th className="px-6 py-4.5">Date Created</th>
                    <th className="px-6 py-4.5">Status</th>
                    <th className="px-6 py-4.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4.5 max-w-md">
                        <div className="flex gap-4 items-center">
                          <img
                            src={blog.imageUrl || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=100&q=80'}
                            alt={blog.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 truncate">{blog.title}</p>
                            <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {blog.tags.map(t => `#${t}`).join(' ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-slate-600 font-medium">
                        {blog.author || 'TravelEase LK'}
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-slate-400 text-xs">
                        {formatDate(blog.createdAt)}
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <Badge
                          className={`text-[10px] font-bold border-0 px-2.5 py-0.5 rounded-full ${
                            blog.isPublished
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4.5 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 items-center">
                          {blog.isPublished && (
                            <Link href={`/blogs/${blog.id}`} target="_blank">
                              <button className="w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 transition-colors" title="View public post">
                                <Eye className="h-4 w-4" />
                              </button>
                            </Link>
                          )}
                          <Link href={`/admin/blogs/edit/${blog.id}`}>
                            <button className="w-8 h-8 bg-rose-50 hover:bg-rose-100 rounded-lg flex items-center justify-center text-rose-600 transition-colors" title="Edit article">
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          
                          {deleteConfirm === blog.id ? (
                            <div className="flex items-center gap-1.5 shadow-sm border border-red-100 bg-red-50/50 p-1 rounded-xl">
                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(blog.id)}
                              className="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center text-red-500 transition-colors"
                              title="Delete article"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 bg-slate-50/50">
                <p className="text-xs text-slate-500 font-semibold">Page {page} of {totalPages}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="w-8.5 h-8.5 border border-slate-200 bg-white rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="w-8.5 h-8.5 border border-slate-200 bg-white rounded-xl flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
