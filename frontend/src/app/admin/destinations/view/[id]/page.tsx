'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader2, MapPin, Calendar, Info, Map, Star, Edit } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/services/api';

export default function ViewDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await api.get(`/destinations/${id}`);
        const data = response.data?.data || response.data;
        setDestination(data);
      } catch (err: any) {
        console.error("API Error:", err);
        setError('Failed to load destination details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDestination();
  }, [id]);

  if (isLoading) {
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

  if (error || !destination) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col">
          <p className="text-red-500 mb-4">{error || "Destination not found"}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-24 pb-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="-ml-4 text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>

          {/* කෙලින්ම View page එකේ ඉඳන් Edit එකට යන්න Button එකක් */}
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={() => router.push(`/admin/destinations/edit/${id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Destination
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Main Image Section */}
          <div className="h-64 sm:h-80 w-full bg-gray-200 relative">
            {(destination.imageUrl || destination.ImageUrl) ? (
              <img 
                src={destination.imageUrl || destination.ImageUrl} 
                alt={destination.name || destination.Name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/1000x400/e2e8f0/94a3b8?text=Image+Not+Available'; }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <MapPin className="h-12 w-12 mb-2 opacity-50" />
                <p>No image available</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 sm:p-8 pt-20">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {destination.name || destination.Name}
              </h1>
              <div className="flex items-center text-white/90 text-sm sm:text-base">
                <MapPin className="h-4 w-4 mr-1" />
                {destination.country || destination.Country}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Main Content) */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    About this Destination
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {destination.shortDescription || destination.ShortDescription}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                    {destination.description || destination.Description || "No detailed description provided."}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Main Attractions
                  </h2>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-blue-800 dark:text-blue-200">
                    {destination.attractions || destination.Attractions || "Not specified."}
                  </div>
                </section>
              </div>

              {/* Right Column (Details sidebar) */}
              <div className="space-y-6">
                <Card className="bg-gray-50 dark:bg-gray-800/50 border-none shadow-none">
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Best Time To Visit</h3>
                      <div className="flex items-center text-gray-800 dark:text-gray-200 font-medium">
                        <Calendar className="h-4 w-4 mr-2 text-green-500" />
                        {destination.bestTimeToVisit || destination.BestTimeToVisit || "Anytime"}
                      </div>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Travel Tips</h3>
                      <p className="text-gray-800 dark:text-gray-200 text-sm">
                        {destination.travelTips || destination.TravelTips || "No specific tips provided."}
                      </p>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Location Coordinates</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <Map className="h-4 w-4 mr-2" />
                        Lat: {destination.latitude || destination.Latitude || "0.00"}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Map className="h-4 w-4 mr-2 opacity-0" />
                        Lng: {destination.longitude || destination.Longitude || "0.00"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}