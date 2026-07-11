'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Link as LinkIcon, Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useBlog, useBlogs } from '@/hooks/useBlogs';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const router = useRouter();
  const { id } = use(params);
  const blogId = parseInt(id, 10);
  const [copied, setCopied] = useState(false);

  // Fetch target blog article details
  const { data: blogResponse, isLoading } = useBlog(blogId);
  const blog = blogResponse?.data;

  // Fetch other blogs for "Read Next" section
  const { data: blogsResponse } = useBlogs({ isPublished: true, page: 1, pageSize: 4 });
  const otherBlogs = (blogsResponse?.data || []).filter(b => b.id !== blogId).slice(0, 3);

  const handleShareCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
            <div className="h-6 w-24 bg-slate-200 animate-pulse rounded mb-6" />
            <div className="h-12 w-3/4 bg-slate-200 animate-pulse rounded mb-4" />
            <div className="h-4 w-48 bg-slate-200 animate-pulse rounded mb-10" />
            <div className="h-96 w-full bg-slate-200 animate-pulse rounded-3xl mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 w-full rounded animate-pulse" />
              <div className="h-4 bg-slate-200 w-full rounded animate-pulse" />
              <div className="h-4 bg-slate-200 w-5/6 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div>
          <Navbar />
          <div className="max-w-md mx-auto px-4 py-32 text-center">
            <Compass className="h-16 w-16 text-slate-300 mx-auto mb-4 animate-bounce" />
            <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-slate-800 mb-2">Article Not Found</h2>
            <p className="text-slate-500 text-sm mb-6">The article you are looking for might have been removed or unpublished.</p>
            <Link href="/blogs">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl">
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate read time roughly
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.push('/blogs')}
            className="group inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Articles
          </button>

          {/* Article Header */}
          <motion.header
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {blog.tags.length > 0 && (
              <div className="flex gap-2 mb-4">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] bg-rose-50 border border-rose-100 text-rose-600 px-3 py-1 rounded-lg font-extrabold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Plus_Jakarta_Sans'] font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              {blog.title}
            </h1>

            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-y border-slate-200/60 py-4.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-rose-500/10">
                  {(blog.author || 'TE').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-xs">{blog.author || 'TravelEase LK Editorial'}</p>
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mt-0.5">Author</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-slate-400 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {formatDate(blog.publishedDate || blog.createdAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {readTime} Min Read
                </span>
              </div>
            </div>
          </motion.header>

          {/* Banner Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-10"
          >
            <img
              src={blog.imageUrl || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80'}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Article Body */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 md:p-10 prose prose-slate max-w-none text-slate-700 font-['Inter'] leading-relaxed"
              >
                {/* We use dangerouslySetInnerHTML to allow simple formatting or rich text (markup). 
                    If it contains basic returns, let's output them nicely. */}
                {blog.content.startsWith('<') ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    className="space-y-6 [&>p]:text-slate-600 [&>p]:leading-relaxed [&>h2]:font-['Plus_Jakarta_Sans'] [&>h2]:font-extrabold [&>h2]:text-slate-800 [&>h2]:text-2xl [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5"
                  />
                ) : (
                  <div className="space-y-6 text-slate-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {blog.content}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar with Actions and Quick Links */}
            <div className="space-y-6">
              {/* Share Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-slate-800 mb-3.5 flex items-center gap-1.5">
                  <Share2 className="h-4 w-4 text-slate-400" /> Share This Story
                </h3>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl flex items-center justify-center transition-colors">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="flex-1 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleShareCopy}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center transition-colors ${
                      copied ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {copied ? <span className="text-[10px] font-bold uppercase">Copied!</span> : <LinkIcon className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Booking Promo Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-md relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-500/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-rose-500/10 rounded-lg flex items-center justify-center mb-3">
                    <Compass className="h-4.5 w-4.5 text-rose-400" />
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-extrabold text-sm mb-1">Ready to Explore?</h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Book a customized tour package to Sri Lanka with TravelEase LK and enjoy a stress-free adventure.
                  </p>
                  <Link href="/packages">
                    <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold h-9">
                      Browse Tour Packages
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Section */}
          {otherBlogs.length > 0 && (
            <div className="mt-16 border-t border-slate-200/80 pt-12">
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-slate-900 mb-8 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rose-500" /> Recommended Reads
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherBlogs.map(item => (
                  <Link key={item.id} href={`/blogs/${item.id}`} className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <div className="relative h-32 overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4.5 flex-1 flex flex-col justify-between">
                      <h4 className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-rose-500 transition-colors leading-snug mb-2">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {formatDate(item.publishedDate || item.createdAt)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
