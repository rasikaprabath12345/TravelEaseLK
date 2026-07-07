'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Clock } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDestination } from '@/hooks/useDestinations';
import { usePackages } from '@/hooks/usePackages';
import { formatPrice } from '@/lib/utils';

export default function DestinationDetailPage() {
  const params = useParams();
  const { data: destinationData, isLoading } = useDestination(Number(params.id));
  const { data: packagesData } = usePackages({ destinationId: Number(params.id) });

  const destination = destinationData?.data;
  const packages = packagesData?.data || [];

  if (isLoading || !destination) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-20 pb-12">
        {/* Hero */}
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={destination.images?.[0] || destination.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <Badge className="mb-3">{destination.country}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{destination.name}</h1>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {destination.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{destination.description}</p>
                </CardContent>
              </Card>

              {destination.attractions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Top Attractions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{destination.attractions}</p>
                  </CardContent>
                </Card>
              )}

              {destination.bestTimeToVisit && (
                <Card>
                  <CardHeader>
                    <CardTitle>Best Time to Visit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{destination.bestTimeToVisit}</p>
                  </CardContent>
                </Card>
              )}

              {destination.travelTips && (
                <Card>
                  <CardHeader>
                    <CardTitle>Travel Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{destination.travelTips}</p>
                  </CardContent>
                </Card>
              )}

              {/* Gallery */}
              {destination.images && destination.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {destination.images.map((img, i) => (
                        <img key={i} src={img} alt={`${destination.name} ${i + 1}`} className="w-full h-40 object-cover rounded-xl" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  {packages.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No packages available</p>
                  ) : (
                    <div className="space-y-4">
                      {packages.map((pkg) => (
                        <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer">
                            <img
                              src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'}
                              alt={pkg.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold mb-1">{pkg.name}</h3>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">{pkg.duration} Days</span>
                              <span className="font-bold text-blue-600">{formatPrice(pkg.price)}</span>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}