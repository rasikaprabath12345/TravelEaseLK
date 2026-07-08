'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { ImageUpload } from '../../../../components/ui/image-upload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function NewPackagePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Database එකේ තියෙන Destinations ටික Load කරගැනීම (Dropdown එකට)
  const { data: destinationsData } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const response = await api.get('/destinations');
      return response.data;
    },
  });
  const destinations = destinationsData?.data || [];

  // 2. Form එකේ දත්ත තබා ගන්නා State එක
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 1, // දින ගණන
    maxSeats: 10, // උපරිම ඉඩකඩ
    imageUrl: '',
    destinationId: 0,
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Checkbox එකක් නම් checked අගය ගන්නවා, නැත්නම් සාමාන්‍ය value එක ගන්නවා
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: (type === 'number' || name === 'destinationId') ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Destination එකක් තෝරලා නැත්නම් Error එකක් පෙන්වීම
    if (formData.destinationId === 0) {
      setError('Please select a destination first.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Backend එකේ Create Endpoint එකට දත්ත යැවීම
      await api.post('/packages', formData);
      
      // සාර්ථකව Save වූ පසු නැවතත් Packages ලැයිස්තුවට යාම
      router.push('/admin/packages');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create package. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button එක */}
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 -ml-4 text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Packages
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Tour Package</CardTitle>
            <p className="text-sm text-gray-500">Add details for your new travel package offering.</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Package Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Package Name <span className="text-red-500">*</span></label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. 5 Days Sigiriya Adventure" 
                    required 
                  />
                </div>

                {/* Destination Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Destination <span className="text-red-500">*</span></label>
                  <select 
                    name="destinationId"
                    value={formData.destinationId}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value={0}>-- Select a Destination --</option>
                    {destinations.map((dest: any) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name} {dest.country ? `(${dest.country})` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe what is included in this package..." 
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (Rs.) <span className="text-red-500">*</span></label>
                  <Input 
                    type="number"
                    step="0.01"
                    name="price" 
                    value={formData.price} 
                    onChange={handleChange} 
                    placeholder="0.00" 
                    required
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Days) <span className="text-red-500">*</span></label>
                  <Input 
                    type="number"
                    name="duration" 
                    value={formData.duration} 
                    onChange={handleChange} 
                    placeholder="1"
                    min="1"
                    required
                  />
                </div>

                {/* Max Seats */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Seats</label>
                  <Input 
                    type="number"
                    name="maxSeats" 
                    value={formData.maxSeats} 
                    onChange={handleChange} 
                    placeholder="10"
                    min="1"
                  />
                </div>
              </div>

              {/* Image Drag-n-Drop & Upload */}
              <ImageUpload
                label="Cover Image"
                value={formData.imageUrl}
                onChange={(val) => setFormData((prev) => ({ ...prev, imageUrl: val }))}
                placeholder="Paste cover image URL or upload one"
              />

              {/* Is Featured Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isFeatured" 
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mark as Featured Package (Shows on Homepage)
                </label>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Create Package
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