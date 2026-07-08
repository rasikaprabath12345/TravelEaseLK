'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Eye, Edit, Trash2, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface Destination {
  id: number;
  name: string;
  country?: string;
  location?: string;
  price?: number;
  isActive?: boolean;
  imageUrl?: string;
}

export default function AdminDestinationsPage() {
  const [search, setSearch] = useState('');
  const router = useRouter(); 
  
  const { data: destinationsData, isLoading } = useQuery({
    queryKey: ['destinations', search],
    queryFn: async () => {
      const response = await api.get('/destinations', { params: { search } });
      return response.data;
    },
  });

  const destinations: Destination[] = destinationsData?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Destinations</h1>
            <p className="text-gray-600 dark:text-gray-400">View, add, and manage travel destinations in TravelEase</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push('/admin/destinations/create')}
          >
            + Add New Destination
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search destinations by name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination Info</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price / Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        Loading destinations...
                      </td>
                    </tr>
                  ) : destinations.length > 0 ? (
                    destinations.map((destination, index) => (
                      <tr key={destination?.id || `dest-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                              {destination?.imageUrl ? (
                                <img src={destination.imageUrl} alt="Destination" className="w-full h-full object-cover" />
                              ) : (
                                <MapPin className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{destination?.name || `Destination ${index + 1}`}</p>
                              <p className="text-sm text-gray-500">ID: {destination?.id || 'N/A'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{destination?.country || destination?.location || 'Not specified'}</td>
                        <td className="px-6 py-4 text-sm">
                          Rs. {destination?.price ? destination.price.toLocaleString() : '0.00'}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={destination?.isActive !== false ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}>
                            {destination?.isActive !== false ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" title="View Details">
                              <Eye className="h-4 w-4 text-blue-500" />
                            </Button>
                            
                            {/* අලුතින් update කරපු Edit Button එක */}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              title="Edit"
                              onClick={() => router.push(`/admin/destinations/edit/${destination.id}`)}
                            >
                              <Edit className="h-4 w-4 text-orange-500" />
                            </Button>
                            
                            <Button variant="ghost" size="sm" title="Delete">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No destinations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}