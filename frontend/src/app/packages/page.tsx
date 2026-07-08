'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Grid, List, MapPin, Clock, Users, Star, ArrowRight,
  SlidersHorizontal, Sparkles, Heart, Camera, Filter, X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const packageImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=800&q=80',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
  'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=800&q=80',
  'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=80',
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'duration_asc', label: 'Shortest Duration' },
];

const durationOptions = [
  { value: '', label: 'Any Duration' },
  { value: '1-3', label: '1–3 Days' },
  { value: '4-7', label: '4–7 Days' },
  { value: '8-14', label: '8–14 Days' },
  { value: '14+', label: '14+ Days' },
];

export default function PackagesPage() {
  const [search, setSearch] = useState('');
  const [destinationId, setDestinationId] = useState<number | undefined>();
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { data: packagesData, isLoading } = usePackages({ search, destinationId, sortBy, page, pageSize: 12 });
  const { data: destinationsData } = useDestinations();

  const packages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];
  const total = packagesData?.total || 0;

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-80" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-sky-100 rounded-full px-4 py-2 mb-4 border border-sky-200"
          >
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span className="text-sky-700 text-sm font-semibold">{total > 0 ? `${total} Curated Tours` : 'Curated Tours'} Available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight"
          >
            Find Your Perfect
            <span className="block bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Sri Lanka Tour
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto mb-8"
          >
            Handpicked experiences from wildlife safaris to beach escapes — crafted by local experts for unforgettable memories.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tours (Sigiriya, Whale watching, Yala...)"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-13 pr-5 py-4 bg-white rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-lg border border-sky-100"
            />
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">

            {/* Destination Filter */}
            <select
              value={destinationId || ''}
              onChange={e => { setDestinationId(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:border-sky-400 min-w-[160px]"
            >
              <option value="">All Destinations</option>
              {destinations.map((d: any) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:border-sky-400 min-w-[170px]"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Results count */}
            <p className="text-slate-500 text-sm ml-auto">
              Showing <span className="font-semibold text-slate-800">{packages.length}</span>
              {total > 0 && <> of <span className="font-semibold text-slate-800">{total}</span></>} packages
            </p>

            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-sky-100 shadow animate-pulse">
                  <div className={`${viewMode === 'grid' ? 'h-56' : 'h-40'} bg-sky-100`} />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-sky-100 rounded w-24" />
                    <div className="h-5 bg-sky-100 rounded w-3/4" />
                    <div className="h-4 bg-sky-100 rounded w-1/2" />
                    <div className="flex justify-between pt-3 border-t border-sky-100">
                      <div className="h-6 bg-sky-100 rounded w-24" />
                      <div className="h-6 bg-sky-100 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No packages found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or search query</p>
              <Button
                onClick={() => { setSearch(''); setDestinationId(undefined); setSortBy('newest'); }}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Clear All Filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-sky-100 shadow hover:shadow-2xl transition-all hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={pkg.imageUrl || packageImages[index % packageImages.length]}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-semibold border-0 shadow">
                            <Star className="h-3 w-3 mr-1 fill-orange-400 text-orange-400" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>

                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-0 text-xs font-semibold shadow">
                              <Sparkles className="h-3 w-3 mr-1" /> FEATURED
                            </Badge>
                          </div>
                        )}

                        <button
                          onClick={e => e.preventDefault()}
                          className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow"
                        >
                          <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors" />
                        </button>

                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Badge className="bg-white/95 text-slate-700 text-xs font-medium border-0 shadow">
                            <Camera className="h-3 w-3 mr-1" /> View Tour
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-center text-xs text-sky-600 font-semibold mb-1.5">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {pkg.destinationName || 'Sri Lanka'}
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-1 text-slate-800 group-hover:text-sky-600 transition-colors">
                          {pkg.name}
                        </h3>

                        <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {pkg.duration} Days
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> Max {pkg.maxGroupSize || 15}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-sky-50">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-medium">From</p>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-bold text-slate-900">{formatPrice(pkg.price)}</span>
                              {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                                <span className="text-xs text-slate-400 line-through">{formatPrice(pkg.originalPrice)}</span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-400">per person</p>
                          </div>
                          <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-cyan-500 transition-all">
                            <ArrowRight className="h-4 w-4 text-sky-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {packages.map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-sky-100 shadow hover:shadow-xl transition-all hover:-translate-y-0.5 flex">
                      <div className="relative w-48 md:w-64 shrink-0 overflow-hidden">
                        <img
                          src={pkg.imageUrl || packageImages[index % packageImages.length]}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-0 text-xs font-semibold">
                              FEATURED
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Badge className="bg-sky-50 text-sky-700 border-sky-100 text-xs font-medium">
                              {pkg.destinationName || 'Sri Lanka'}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                              <span className="font-semibold text-slate-700">{pkg.averageRating?.toFixed(1) || '5.0'}</span>
                            </div>
                          </div>
                          <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">{pkg.name}</h3>
                          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-3">
                            {pkg.shortDescription || pkg.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{pkg.duration} Days</span>
                            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />Max {pkg.maxGroupSize || 15}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-sky-50">
                          <div>
                            <span className="text-xl font-bold text-slate-900">{formatPrice(pkg.price)}</span>
                            <span className="text-sm text-slate-400 ml-1">/ person</span>
                            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                              <span className="text-sm text-slate-400 line-through ml-2">{formatPrice(pkg.originalPrice)}</span>
                            )}
                          </div>
                          <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl px-5 text-sm font-semibold group-hover:shadow-md">
                            View Tour
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {total > 12 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-xl border-sky-200 text-slate-600 hover:border-sky-400 hover:text-sky-600 disabled:opacity-50"
              >
                ← Previous
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${
                    page === p
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md'
                      : 'bg-white border border-sky-200 text-slate-600 hover:border-sky-400 hover:text-sky-600'
                  }`}
                >
                  {p}
                </button>
              ))}
              <Button
                variant="outline"
                onClick={() => setPage(page + 1)}
                disabled={packages.length < 12}
                className="rounded-xl border-sky-200 text-slate-600 hover:border-sky-400 hover:text-sky-600 disabled:opacity-50"
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}