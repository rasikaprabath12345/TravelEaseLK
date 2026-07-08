'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const packageId = params.id;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  // 1. Destinations Dropdown එක සඳහා දත්ත ලබාගැනීම
  const { data: destinationsData } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const response = await api.get('/destinations');
      return response.data;
    },
  });
  const destinations = destinationsData?.data || [];

  // 2. Form එකේ දත්ත State එක
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    duration: 1,
    maxSeats: 10,
    imageUrl: '',
    destinationId: 0,
    isFeatured: false,
  });

  // 3. දැනට තියෙන Package දත්ත ලබාගැනීම
  useEffect(() => {
    const fetchPackage = async () => {
      if (!packageId) return;
      try {
        const response = await api.get(`/packages/${packageId}`);
        const pkg = response.data.data;
        if (pkg) {
          setFormData({
            id: pkg.id,
            name: pkg.name || '',
            description: pkg.description || '',
            price: pkg.price || 0,
            duration: pkg.duration || 1,
            maxSeats: pkg.maxSeats || 10,
            imageUrl: pkg.imageUrl || '',
            destinationId: pkg.destinationId || 0,
            isFeatured: pkg.isFeatured || false,
          });
        }
      } catch (err: any) {
        setError('Failed to load package details.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchPackage();
  }, [packageId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
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
    if (formData.destinationId === 0) {
      setError('Please select a destination.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Backend එකේ Update (PUT) Endpoint එකට යැවීම
      await api.put('/packages', formData);
      router.push('/admin/packages');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update package.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
        <p className="mt-4 text-gray-500">Loading package details...</p>
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
          Back to Packages
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Tour Package</CardTitle>
            <p className="text-sm text-gray-500">Update the details of this travel package.</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Package Name <span className="text-red-500">*</span></label>
                  <Input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Destination <span className="text-red-500">*</span></label>
                  <select 
                    name="destinationId"
                    value={formData.destinationId}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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

              <div className="space-y-2">
                <label className="text-sm font-medium">Description <span className="text-red-500">*</span></label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  rows={4}
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (Rs.) <span className="text-red-500">*</span></label>
                  <Input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (Days) <span className="text-red-500">*</span></label>
                  <Input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Seats</label>
                  <Input type="number" name="maxSeats" value={formData.maxSeats} onChange={handleChange} min="1" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
              </div>

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
                <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                  ) : (
                    <><Save className="mr-2 h-4 w-4" /> Save Changes</>
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