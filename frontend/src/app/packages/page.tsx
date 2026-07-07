'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function PackagesPage() {
  const [search, setSearch] = useState('');
  const [destinationId, setDestinationId] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: packagesData, isLoading } = usePackages({
    search,
    destinationId,
    sortBy,
    page,
    pageSize: 12,
  });

  const { data: destinationsData } = useDestinations();

  const packages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];
  const total = packagesData?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Explore Tour Packages</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing travel experiences tailored for you
          </p>
        </motion.div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search packages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={destinationId || ''}
                onChange={(e) => setDestinationId(e.target.value ? Number(e.target.value) : undefined)}
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Destinations</option>
                {destinations.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex h-11 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid className="h-5 w-5" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Showing <strong>{packages.length}</strong> of <strong>{total}</strong> packages
          </p>
        </div>

        {/* Packages Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : packages.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">No packages found</p>
            <Button className="mt-4" onClick={() => { setSearch(''); setDestinationId(undefined); }}>
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/packages/${pkg.id}`}>
                  {viewMode === 'grid' ? (
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {pkg.isFeatured && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{pkg.destinationName}</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{pkg.name}</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">{formatPrice(pkg.price)}</span>
                            <span className="text-sm text-gray-500 ml-1">/ person</span>
                          </div>
                          <div className="text-sm text-gray-500">{pkg.duration} Days</div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                          <img
                            src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                            alt={pkg.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <Badge variant="secondary" className="mb-2">{pkg.destinationName}</Badge>
                              <h3 className="font-semibold text-xl mb-1">{pkg.name}</h3>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">{formatPrice(pkg.price)}</p>
                              <p className="text-sm text-gray-500">{pkg.duration} Days</p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{pkg.shortDescription || pkg.description}</p>
                        </CardContent>
                      </div>
                    </Card>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button variant="outline" className="px-4">
              Page {page}
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage(page + 1)}
              disabled={packages.length < 12}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}