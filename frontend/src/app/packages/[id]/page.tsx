'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star, Clock, CheckCircle, XCircle, MessageCircle, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePackage } from '@/hooks/usePackages';
import { useCreateBooking } from '@/hooks/useBookings';
import { useAuthStore } from '@/store/auth.store';
import { formatPrice, formatDate, generateWhatsAppUrl } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookingSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phoneNumber: z.string().min(10, 'Valid phone number required'),
  country: z.string().min(2, 'Country is required'),
  passportOrNIC: z.string().optional(),
  numberOfAdults: z.number().min(1, 'At least 1 adult'),
  numberOfChildren: z.number().min(0),
  travelDate: z.string().min(1, 'Travel date is required'),
  pickupLocation: z.string().optional(),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { data: packageData, isLoading } = usePackage(Number(params.id));
  const createBooking = useCreateBooking();
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const pkg = packageData?.data;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      numberOfAdults: 1,
      numberOfChildren: 0,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const response = await createBooking.mutateAsync({
        packageId: pkg!.id,
        ...data,
      });

      if (response.success) {
        setBookingSuccess(response.data);
        reset();
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-2xl" />
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navbar />
        <p>Package not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-20 pb-12">
        {/* Hero Image */}
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={pkg.images?.[0] || pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-7xl mx-auto">
              <Badge className="mb-3">{pkg.destinationName}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{pkg.name}</h1>
              <div className="flex items-center space-x-6 text-lg">
                <span className="flex items-center"><Clock className="h-5 w-5 mr-2" />{pkg.duration} Days</span>
                <span className="flex items-center"><Star className="h-5 w-5 mr-2 fill-yellow-400 text-yellow-400" />{pkg.averageRating.toFixed(1)}</span>
                <span className="flex items-center"><Users className="h-5 w-5 mr-2" />{pkg.availableSeats} seats left</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <Card>
                <CardContent className="p-0">
                  <div className="flex border-b border-gray-200 dark:border-gray-700">
                    {['overview', 'itinerary', 'includes', 'reviews'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-4 text-center font-medium capitalize transition-colors ${
                          activeTab === tab
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="p-6">
                    {activeTab === 'overview' && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{pkg.description}</p>
                      </div>
                    )}
                    {activeTab === 'itinerary' && (
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">Detailed itinerary will be shown here.</p>
                      </div>
                    )}
                    {activeTab === 'includes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-2" /> Included
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>✓ Accommodation</li>
                            <li>✓ Meals as per itinerary</li>
                            <li>✓ Transportation</li>
                            <li>✓ Professional guide</li>
                            <li>✓ Entry tickets</li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center text-red-600">
                            <XCircle className="h-5 w-5 mr-2" /> Excluded
                          </h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li>✗ International flights</li>
                            <li>✗ Travel insurance</li>
                            <li>✗ Personal expenses</li>
                            <li>✗ Tips and gratuities</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {activeTab === 'reviews' && (
                      <div className="text-center py-8 text-gray-500">
                        No reviews yet. Be the first to review!
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Image Gallery */}
              {pkg.images && pkg.images.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {pkg.images.map((img, i) => (
                        <img key={i} src={img} alt={`${pkg.name} ${i + 1}`} className="w-full h-40 object-cover rounded-xl" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-blue-600">{formatPrice(pkg.price)}</span>
                      <span className="text-gray-500 line-through">{formatPrice(pkg.originalPrice)}</span>
                    </div>
                    <p className="text-sm text-gray-500">per person</p>
                  </div>

                  {!bookingSuccess ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <h3 className="font-semibold text-lg">Book This Tour</h3>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Full Name *</label>
                        <Input {...register('fullName')} placeholder="John Doe" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Email *</label>
                        <Input {...register('email')} type="email" placeholder="you@example.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Phone *</label>
                        <Input {...register('phoneNumber')} placeholder="+94 77 123 4567" />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Country *</label>
                        <Input {...register('country')} placeholder="Sri Lanka" />
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Adults</label>
                          <Input {...register('numberOfAdults', { valueAsNumber: true })} type="number" min="1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Children</label>
                          <Input {...register('numberOfChildren', { valueAsNumber: true })} type="number" min="0" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">Travel Date *</label>
                        <Input {...register('travelDate')} type="date" />
                        {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>}
                      </div>

                      <Button type="submit" className="w-full" size="lg" disabled={createBooking.isPending}>
                        {createBooking.isPending ? 'Booking...' : 'Book Now'}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold">Booking Confirmed!</h3>
                      <p className="text-sm text-gray-500">Booking ID: <strong>{bookingSuccess.bookingId}</strong></p>
                      <a
                        href={generateWhatsAppUrl({
                          bookingId: bookingSuccess.bookingId,
                          packageName: bookingSuccess.packageName,
                          travelDate: bookingSuccess.travelDate,
                          numberOfAdults: bookingSuccess.numberOfAdults,
                          numberOfChildren: bookingSuccess.numberOfChildren,
                          fullName: bookingSuccess.customerName,
                          phoneNumber: bookingSuccess.phoneNumber,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          <MessageCircle className="h-5 w-5 mr-2" />
                          Confirm via WhatsApp
                        </Button>
                      </a>
                      <Button variant="outline" className="w-full" onClick={() => setBookingSuccess(null)}>
                        Book Another
                      </Button>
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