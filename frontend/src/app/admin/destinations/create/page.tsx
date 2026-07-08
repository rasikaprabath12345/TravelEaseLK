'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';

export default function CreateDestinationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Backend DTO එකට ගැළපෙන පරිදි State එක සකස් කිරීම
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    bestTimeToVisit: '',
    travelTips: '',
    attractions: '',
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Backend එකේ Create Endpoint එකට දත්ත යැවීම
      await api.post('/destinations', formData);
      
      // සාර්ථකව Save වූ පසු නැවතත් ලැයිස්තුවට යාම
      router.push('/admin/destinations');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create destination. Please try again.');
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
          Back to Destinations
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Destination</CardTitle>
            <p className="text-sm text-gray-500">Fill in the details below to add a new travel destination.</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination Name <span className="text-red-500">*</span></label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="e.g. Sigiriya Rock Fortress" 
                    required 
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Country <span className="text-red-500">*</span></label>
                  <Input 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    placeholder="e.g. Sri Lanka" 
                    required 
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Short Description</label>
                <Input 
                  name="shortDescription" 
                  value={formData.shortDescription} 
                  onChange={handleChange} 
                  placeholder="A brief summary of the destination..." 
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Detailed information about the destination..." 
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Main Image URL</label>
                <Input 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  placeholder="https://example.com/image.jpg" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Best Time To Visit */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Best Time to Visit</label>
                  <Input 
                    name="bestTimeToVisit" 
                    value={formData.bestTimeToVisit} 
                    onChange={handleChange} 
                    placeholder="e.g. December to March" 
                  />
                </div>

                {/* Attractions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Attractions</label>
                  <Input 
                    name="attractions" 
                    value={formData.attractions} 
                    onChange={handleChange} 
                    placeholder="e.g. Lion Paws, Frescoes, Mirror Wall" 
                  />
                </div>
              </div>

              {/* Travel Tips */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Tips</label>
                <Input 
                  name="travelTips" 
                  value={formData.travelTips} 
                  onChange={handleChange} 
                  placeholder="e.g. Wear comfortable shoes, bring water..." 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Latitude */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Latitude (Map)</label>
                  <Input 
                    type="number"
                    step="any"
                    name="latitude" 
                    value={formData.latitude} 
                    onChange={handleChange} 
                    placeholder="7.9570" 
                  />
                </div>

                {/* Longitude */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Longitude (Map)</label>
                  <Input 
                    type="number"
                    step="any"
                    name="longitude" 
                    value={formData.longitude} 
                    onChange={handleChange} 
                    placeholder="80.7603" 
                  />
                </div>
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
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Destination
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