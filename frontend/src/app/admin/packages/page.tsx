'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- useRouter එක එකතු කළා
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePackages, useDeletePackage } from '@/hooks/usePackages';
import { formatPrice } from '@/lib/utils';

export default function AdminPackagesPage() {
  const router = useRouter(); // <-- router එක හඳුන්වා දුන්නා
  const [search, setSearch] = useState('');
  
  const { data: packagesData, isLoading } = usePackages({ search });
  const deletePackage = useDeletePackage();
  const packages = packagesData?.data || [];

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this package?')) {
      await deletePackage.mutateAsync(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Packages</h1>
            <p className="text-gray-600 dark:text-gray-400">Create, edit, and delete tour packages</p>
          </div>
          {/* Add Package බොත්තම - onClick හරහා */}
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push('/admin/packages/new')}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Package
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search packages..."
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        Loading packages...
                      </td>
                    </tr>
                  ) : packages.length > 0 ? (
                    packages.map((pkg: any) => (
                      <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80'}
                              alt={pkg.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium">{pkg.name}</p>
                              <p className="text-sm text-gray-500">ID: {pkg.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{pkg.destinationName || '-'}</td>
                        <td className="px-6 py-4 text-sm font-medium">{formatPrice(pkg.price)}</td>
                        <td className="px-6 py-4 text-sm">{pkg.duration} Days</td>
                        <td className="px-6 py-4 text-sm">{pkg.availableSeats}/{pkg.maxSeats}</td>
                        <td className="px-6 py-4">
                          <Badge className={pkg.isFeatured ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}>
                            {pkg.isFeatured ? 'Featured' : 'Normal'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            {/* Edit බොත්තම - onClick හරහා */}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-gray-600 hover:text-blue-600"
                              onClick={() => router.push(`/admin/packages/edit/${pkg.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(pkg.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        No packages found.
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