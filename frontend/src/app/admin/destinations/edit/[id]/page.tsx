'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { ImageUpload } from '../../../../../components/ui/image-upload';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/api';

export default function EditDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; 

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); 
  const [error, setError] = useState('');

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

  // පිටුව load වෙද්දී අදාළ ID එකට අයිති දත්ත ගෙනැවිත් Form එකට දැමීම
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await api.get(`/destinations/${id}`);
        
        console.log("Backend Response:", response.data); 

        const data = response.data?.data || response.data;
        
        setFormData({
          name: data.name || data.Name || '',
          country: data.country || data.Country || '',
          shortDescription: data.shortDescription || data.ShortDescription || '',
          description: data.description || data.Description || '',
          imageUrl: data.imageUrl || data.ImageUrl || '',
          bestTimeToVisit: data.bestTimeToVisit || data.BestTimeToVisit || '',
          travelTips: data.travelTips || data.TravelTips || '',
          attractions: data.attractions || data.Attractions || '',
          latitude: data.latitude || data.Latitude || 0,
          longitude: data.longitude || data.Longitude || 0,
        });
      } catch (err: any) {
        console.error("API Error:", err);
        setError('Failed to fetch destination details.');
      } finally {
        setIsFetching(false);
      }
    };

    if (id) {
      fetchDestination();
    }
  }, [id]);

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
      // Backend එකට යවද්දී ID එකත් Data එක ඇතුලටම දාලා යවනවා
      const payload = {
        ...formData,
        id: Number(id),
        Id: Number(id)
      };

      await api.put(`/destinations/${id}`, payload);
      
      router.push('/admin/destinations');
      router.refresh(); 
    } catch (err: any) {
      // සම්පූර්ණ Error එකම Console එකේ print කිරීම
      console.error("Full Error Object:", err);
      console.error("Error Status:", err.response?.status);
      
      // වඩාත් පැහැදිලි Error Message එකක් UI එකේ පෙන්නීම
      const errorMessage = err.response?.data?.title || 
                           err.response?.data?.message || 
                           (typeof err.response?.data === 'string' && err.response?.data !== '' ? err.response?.data : null) ||
                           `Failed to update (Status: ${err.response?.status || 'Unknown'}). Please check console.`;
                           
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-500">Loading destination details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <CardTitle className="text-2xl">Edit Destination</CardTitle>
            <p className="text-sm text-gray-500">Update the details of the selected destination.</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination Name <span className="text-red-500">*</span></label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Country <span className="text-red-500">*</span></label>
                  <Input 
                    name="country" 
                    value={formData.country} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Short Description</label>
                <Input 
                  name="shortDescription" 
                  value={formData.shortDescription} 
                  onChange={handleChange} 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Full Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Image Drag-n-Drop & Upload */}
              <ImageUpload
                label="Main Image"
                value={formData.imageUrl}
                onChange={(val) => setFormData((prev) => ({ ...prev, imageUrl: val }))}
                placeholder="Paste main image URL or upload one"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Best Time to Visit</label>
                  <Input 
                    name="bestTimeToVisit" 
                    value={formData.bestTimeToVisit} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Attractions</label>
                  <Input 
                    name="attractions" 
                    value={formData.attractions} 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Travel Tips</label>
                <Input 
                  name="travelTips" 
                  value={formData.travelTips} 
                  onChange={handleChange} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Latitude (Map)</label>
                  <Input 
                    type="number"
                    step="any"
                    name="latitude" 
                    value={formData.latitude} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Longitude (Map)</label>
                  <Input 
                    type="number"
                    step="any"
                    name="longitude" 
                    value={formData.longitude} 
                    onChange={handleChange} 
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Destination
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