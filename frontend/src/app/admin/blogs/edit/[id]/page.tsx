'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import { useBlog, useUpdateBlog } from '@/hooks/useBlogs';
import { useQueryClient } from '@tanstack/react-query';
import BlogBuilder from '@/components/admin/blog-builder';

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = use(params);
  const blogId = parseInt(id, 10);

  const { data: blogResponse, isLoading: isFetching } = useBlog(blogId);
  const updateBlog = useUpdateBlog();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    author: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    tagsString: '',
    isPublished: false,
  });

  // Load blog details into form
  useEffect(() => {
    if (blogResponse?.data) {
      const blog = blogResponse.data;
      setFormData({
        id: blog.id,
        title: blog.title,
        author: blog.author || '',
        excerpt: blog.excerpt || '',
        content: blog.content,
        imageUrl: blog.imageUrl || '',
        tagsString: blog.tags ? blog.tags.join(', ') : '',
        isPublished: blog.isPublished,
      });
    }
  }, [blogResponse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePublished = () => {
    setFormData((prev) => ({
      ...prev,
      isPublished: !prev.isPublished,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.content || formData.content.trim() === '') {
      setError('Please add some content to the article using the builder before saving.');
      setIsLoading(false);
      return;
    }

    // Format tags from comma-separated string to string array
    const tags = formData.tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const payload = {
      id: formData.id,
      title: formData.title,
      author: formData.author || 'TravelEase LK',
      excerpt: formData.excerpt,
      content: formData.content,
      imageUrl: formData.imageUrl,
      isPublished: formData.isPublished,
      tags,
    };

    try {
      await updateBlog.mutateAsync(payload);
      router.push('/admin/blogs');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 text-center">
          <Loader2 className="h-10 w-10 text-rose-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-semibold">Loading article details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/admin/blogs')}
          className="mb-6 -ml-4 text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blogs
        </Button>

        <Card className="rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6 md:p-8">
            <CardTitle className="text-2xl font-bold font-sans text-slate-900 flex items-center gap-2">
              <BookOpen className="h-6.5 w-6.5 text-rose-500" /> Edit Travel Blog Article
            </CardTitle>
            <p className="text-sm text-slate-500 mt-1">Modify and update your travel story, guide, or hidden place entry.</p>
          </CardHeader>

          <CardContent className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-semibold rounded-r-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Article Title <span className="text-red-500">*</span></label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Ella Odyssey Train: Scenic Rail Route Guide"
                    required
                    className="rounded-xl border-slate-200 h-11"
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Author Name</label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Rasika Prabath"
                    className="rounded-xl border-slate-200 h-11"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tags (comma-separated)</label>
                  <Input
                    name="tagsString"
                    value={formData.tagsString}
                    onChange={handleChange}
                    placeholder="e.g. Ella, Train, Ella Rock, Hiking"
                    className="rounded-xl border-slate-200 h-11"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Short Summary / Excerpt</label>
                <Input
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="A short hook sentence or description of the article..."
                  className="rounded-xl border-slate-200 h-11"
                />
              </div>

              {/* Content Visual Builder */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Article Body Content <span className="text-red-500">*</span></label>
                {formData.id > 0 && (
                  <BlogBuilder
                    value={formData.content}
                    onChange={(htmlVal) => setFormData((prev) => ({ ...prev, content: htmlVal }))}
                    autoSaveKey={`edit-${blogId}`}
                  />
                )}
              </div>

              {/* Banner Image Upload */}
              <div className="border-t border-slate-100 pt-6">
                <ImageUpload
                  label="Article Cover Image"
                  value={formData.imageUrl}
                  onChange={(val) => setFormData((prev) => ({ ...prev, imageUrl: val }))}
                  placeholder="Upload cover image or paste external image URL"
                />
              </div>

              {/* Publication state */}
              <div className="flex items-center justify-between border-y border-slate-100 py-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Publish Article</h4>
                  <p className="text-xs text-slate-500">Make this article publicly visible immediately upon saving.</p>
                </div>
                <button
                  type="button"
                  onClick={handleTogglePublished}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${formData.isPublished ? 'bg-rose-500 justify-end' : 'bg-slate-200 justify-start'
                    }`}
                >
                  <motion.div layout className="bg-white w-4.5 h-4.5 rounded-full shadow-sm" />
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/blogs')}
                  className="rounded-xl border-slate-200"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-rose-500 hover:bg-rose-600 text-white min-w-[150px] rounded-xl font-bold shadow-md hover:-translate-y-0.5 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
