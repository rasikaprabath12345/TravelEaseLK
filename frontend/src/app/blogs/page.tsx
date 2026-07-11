'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, Play, X, Compass, Clock, BookOpen, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBlogs } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';
import type { Blog } from '@/types';

// Helper to convert YouTube URL to Embed URL
function getYouTubeEmbedUrl(url?: string) {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
  }
  return '';
}

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'vlog' | 'blog'>('all');
  const [filterPalace, setFilterPalace] = useState<string>('all');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Fetch only published blogs
  const { data: blogsData, isLoading } = useBlogs({ search, onlyPublished: true });
  const blogs = blogsData?.data || [];

  // Filter local logic for quick responsive feedback
  const filteredBlogs = blogs.filter((blog) => {
    // Type Filter
    if (filterType === 'vlog' && !blog.videoUrl) return false;
    if (filterType === 'blog' && blog.videoUrl) return false;

    // Palace Tag Filter
    if (filterPalace !== 'all') {
      const tags = blog.tags ? JSON.parse(blog.tags) as string[] : [];
      const hasPalaceTag = tags.some((t) => t.toLowerCase() === filterPalace.toLowerCase());
      if (!hasPalaceTag) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-slate-950 pt-36 pb-20 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80')] bg-cover bg-center opacity-10 blur-[1px] mask-gradient pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Compass className="h-3.5 w-3.5" />
              Heritage & History
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-400 tracking-tight leading-tight">
              Sri Lankan Palaces
            </h1>
            <p className="mt-4 text-lg text-slate-400 font-medium leading-relaxed">
              Step back in time to explore the architectural marvels, royal fortress-temples, and ancient kingdoms of Sri Lanka through immersive video logs and stories.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 bg-slate-950/40 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl mb-12">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Media Type Filter */}
            <div className="flex rounded-xl bg-slate-900 border border-slate-850 p-1">
              {(['all', 'vlog', 'blog'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filterType === type
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                      : 'text-slate-450 hover:text-white'
                  }`}
                >
                  {type === 'all' ? 'All Content' : type === 'vlog' ? 'Vlogs (Videos)' : 'Articles'}
                </button>
              ))}
            </div>

            {/* Palace Categories Filter */}
            <div className="flex rounded-xl bg-slate-900 border border-slate-850 p-1">
              {['all', 'Sigiriya', 'Kandy', 'Polonnaruwa'].map((palace) => (
                <button
                  key={palace}
                  onClick={() => setFilterPalace(palace)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    filterPalace === palace
                      ? 'bg-slate-850 text-white border border-slate-700'
                      : 'text-slate-450 hover:text-white border border-transparent'
                  }`}
                >
                  {palace === 'all' ? 'All Places' : palace}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search palaces and vlogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border-slate-800 text-white placeholder-slate-500 pl-10 rounded-xl h-10 text-sm focus:border-rose-500 focus:ring-rose-500"
            />
          </div>
        </div>

        {/* Content Loading / Empty state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-950/60 rounded-3xl border border-slate-850 h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-slate-950/20 border border-dashed border-slate-800 rounded-3xl">
            <AlertCircle className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-350">No Vlogs or Articles Found</h3>
            <p className="text-slate-500 text-sm mt-1">Try tweaking your search or filter selection.</p>
          </div>
        ) : (
          /* Cards Grid */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBlogs.map((blog) => {
              const isVlog = !!blog.videoUrl;
              const tags = blog.tags ? (JSON.parse(blog.tags) as string[]) : [];

              return (
                <motion.div
                  key={blog.id}
                  layoutId={`blog-card-${blog.id}`}
                  onClick={() => setSelectedBlog(blog)}
                  className="group bg-slate-950 border border-slate-850 rounded-3xl overflow-hidden hover:border-slate-700 shadow-md hover:shadow-2xl hover:shadow-rose-950/10 cursor-pointer flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
                        <BookOpen className="h-12 w-12 text-slate-800" />
                      </div>
                    )}

                    {/* Vlog Overlay - Play Button */}
                    {isVlog && (
                      <div className="absolute inset-0 bg-slate-950/45 flex items-center justify-center group-hover:bg-slate-950/30 transition-colors duration-300">
                        <div className="w-14 h-14 bg-rose-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-rose-500 transition-transform duration-300">
                          <Play className="h-6 w-6 fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-1.5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        isVlog ? 'bg-rose-600 text-white shadow' : 'bg-indigo-650 text-white'
                      }`}>
                        {isVlog ? 'Vlog' : 'Article'}
                      </span>
                      {tags.slice(0, 1).map((t) => (
                        <span key={t} className="px-2.5 py-1 bg-slate-900/90 border border-slate-750 text-slate-300 rounded-lg text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3.5 text-[11px] text-slate-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{blog.author || 'TravelEase'}</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(blog.publishedDate || blog.createdAt)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-450 line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.content}
                    </p>

                    <div className="mt-auto pt-5 border-t border-slate-850/80 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-rose-400 transition-colors">
                      <span>{isVlog ? 'Watch Vlog' : 'Read Article'}</span>
                      <Play className="h-3 w-3 fill-current rotate-0" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Detail / Playback Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`blog-card-${selectedBlog.id}`}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute right-4 top-4 z-20 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center hover:scale-105 transition-all"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Vlog Video Embed */}
              {selectedBlog.videoUrl && getYouTubeEmbedUrl(selectedBlog.videoUrl) ? (
                <div className="aspect-video w-full bg-slate-950 overflow-hidden rounded-t-3xl border-b border-slate-800">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedBlog.videoUrl)}
                    title={selectedBlog.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              ) : (
                /* Cover Image for Articles */
                selectedBlog.imageUrl && (
                  <div className="relative w-full h-[300px] overflow-hidden rounded-t-3xl border-b border-slate-800">
                    <img
                      src={selectedBlog.imageUrl}
                      alt={selectedBlog.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  </div>
                )
              )}

              {/* Text Info */}
              <div className="p-6 sm:p-8 flex-1">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3.5">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                    selectedBlog.videoUrl ? 'bg-rose-600/20 text-rose-400 border border-rose-500/20' : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {selectedBlog.videoUrl ? 'Video Vlog' : 'Article'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    <span>Written by {selectedBlog.author || 'TravelEase'}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(selectedBlog.publishedDate || selectedBlog.createdAt)}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
                  {selectedBlog.title}
                </h2>

                {/* Tags list */}
                {selectedBlog.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {(JSON.parse(selectedBlog.tags) as string[]).map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-400 text-[10px] font-semibold">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="mt-6 text-sm sm:text-base text-slate-350 leading-relaxed font-medium space-y-4 whitespace-pre-wrap max-w-none">
                  {selectedBlog.content}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
