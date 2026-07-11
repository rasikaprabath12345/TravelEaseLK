'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Calendar, User, ArrowRight, Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { useBlogs } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';

const POPULAR_TAGS = ['All', 'Ella', 'Sigiriya', 'Galle', 'Wildlife', 'Cultural', 'Beaches', 'Hiking'];

export default function BlogsPage() {
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Fetch blogs using react-query hook
  const { data: blogsData, isLoading } = useBlogs({
    search: search || undefined,
    isPublished: true, // Only show published blogs to visitors
    page,
    pageSize,
  });

  const blogs = blogsData?.data || [];
  const total = blogsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  // Client-side filtering by tag (backend gets query-based search, tag is filterable on clients for quick feel)
  const filteredBlogs = blogs.filter((blog) => {
    if (selectedTag === 'All') return true;
    return blog.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-slate-900 pt-36 pb-20 text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546708973-b339540b5162?w=1600&q=80')] bg-cover bg-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-50" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Sri Lankan Travel Insights
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight mb-5 bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-100">
                Wanderlust Sri Lanka
              </h1>
              <p className="max-w-2xl mx-auto text-slate-300 text-base md:text-lg font-medium leading-relaxed mb-8">
                Explore guides, local tips, hidden gems, and itineraries written by travel experts to make your journey across the Pearl of the Indian Ocean unforgettable.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content & Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-16">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] p-6 md:p-8 mb-10">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search articles, stories, guides..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-12 pr-4 h-12 w-full rounded-2xl border-slate-200 text-slate-800 placeholder:text-slate-400 focus-visible:ring-rose-500 focus-visible:border-rose-500 text-sm shadow-sm"
                />
              </div>

              {/* Tag Filters */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center justify-start lg:justify-end overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setPage(1);
                    }}
                    className={`px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-xl transition-all whitespace-nowrap border ${
                      (selectedTag === tag)
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/10 hover:bg-rose-600'
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100/70 hover:text-slate-900'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[420px] rounded-3xl border border-slate-200/80 bg-white shadow-sm animate-pulse flex flex-col overflow-hidden"
                >
                  <div className="h-48 bg-slate-100 w-full" />
                  <div className="p-6 flex-1 space-y-4">
                    <div className="h-4 bg-slate-100 w-24 rounded" />
                    <div className="h-6 bg-slate-100 w-full rounded" />
                    <div className="h-4 bg-slate-100 w-3/4 rounded" />
                    <div className="h-10 bg-slate-100 w-full rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-sm">
              <Compass className="h-16 w-16 text-slate-300 mx-auto mb-4 animate-spin" style={{ animationDuration: '6s' }} />
              <h3 className="font-sans font-extrabold text-xl text-slate-800 mb-1">No articles found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                We couldn't find any travel articles matching your filter. Try searching for other keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Banner Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={blog.imageUrl || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                    {blog.tags.length > 0 && (
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        {blog.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Metadata and Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-semibold mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(blog.publishedDate || blog.createdAt)}
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {blog.author || 'TravelEase LK'}
                      </span>
                    </div>

                    <h3 className="font-sans font-extrabold text-slate-900 text-lg mb-2 line-clamp-2 leading-snug group-hover:text-rose-500 transition-colors">
                      <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                      {blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                    </p>

                    <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 max-w-[70%]">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 hover:gap-1.5 transition-all"
                      >
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold tracking-wide uppercase hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      page === i + 1
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold tracking-wide uppercase hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
