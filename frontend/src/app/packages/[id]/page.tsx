'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  MapPin, Calendar, Users, Star, Clock, CheckCircle, XCircle, MessageCircle,
  Heart, Share2, ArrowLeft, Camera, Shield, Award, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePackage } from '@/hooks/usePackages';
import { useCreateBooking } from '@/hooks/useBookings';
import { useAuthStore } from '@/store/auth.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { formatPrice, formatDate, generateWhatsAppUrl } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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

const tabs = ['overview', 'itinerary', 'includes', 'reviews'];

const packageImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
  'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=1200&q=80',
];

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { data: packageData, isLoading } = usePackage(Number(params.id));
  const createBooking = useCreateBooking();
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [whatsappNumber, setWhatsappNumber] = useState('94703348191');
  const [activeTab, setActiveTab] = useState('overview');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const { toggleItem, isInWishlist } = useWishlistStore();

  useEffect(() => {
    const saved = localStorage.getItem('site_whatsapp_number');
    if (saved) setWhatsappNumber(saved);
  }, []);

  const pkg = packageData?.data;

  const images = pkg?.images?.length > 0
    ? pkg.images
    : [pkg?.imageUrl, ...packageImages].filter(Boolean);

  const totalPrice = pkg ? pkg.price * adults + (pkg.price * 0.6 * children) : 0;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { numberOfAdults: 1, numberOfChildren: 0 },
  });

  useEffect(() => {
    setValue('numberOfAdults', adults);
    setValue('numberOfChildren', children);
  }, [adults, children, setValue]);

  if (user) {
    // Prefill if logged in
  }

  const onSubmit = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      const response = await createBooking.mutateAsync({ packageId: pkg!.id, ...data });
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
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="pt-20">
          <div className="h-[500px] bg-sky-100 animate-pulse" />
          <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-sky-100 rounded animate-pulse w-1/3" />
              <div className="h-12 bg-sky-100 rounded animate-pulse w-3/4" />
              <div className="h-40 bg-sky-100 rounded animate-pulse" />
            </div>
            <div className="h-80 bg-sky-100 rounded-3xl animate-pulse" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-white">
        <Navbar />
        <div className="text-center mt-32 mb-32">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Package Not Found</h2>
          <p className="text-slate-500 mb-6">This tour package doesn't exist or has been removed.</p>
          <Link href="/packages">
            <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl px-6">
              Browse All Packages
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = pkg.originalPrice && pkg.originalPrice > pkg.price
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />
      <div>


      {/* Hero Image Carousel */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden pt-16">
        <img
          src={images[imgIdx] || packageImages[0]}
          alt={pkg.name}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-slate-900/40" />

        {/* Carousel Nav */}
        {images.length > 1 && (
          <>
            <button onClick={() => setImgIdx(i => (i - 1 + images.length) % images.length)}
              className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setImgIdx(i => (i + 1) % images.length)}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_: any, i: number) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? 'bg-white w-4' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}

        {/* Back Button */}
        <Link href="/packages" className="absolute top-20 left-6">
          <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-white/30 transition-all">
            <ArrowLeft className="h-4 w-4" /> All Packages
          </button>
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-20 right-6 flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (pkg) {
                toggleItem({
                  id: pkg.id,
                  name: pkg.name,
                  price: pkg.price,
                  imageUrl: pkg.imageUrl,
                  destinationName: pkg.destinationName
                });
              }
            }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
            aria-label="Add to wishlist"
          >
            <Heart className={`h-4 w-4 ${pkg && isInWishlist(pkg.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {pkg.isFeatured && (
              <Badge className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-0 mb-3 text-xs font-bold">
                ⭐ FEATURED TOUR
              </Badge>
            )}
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-3 ml-2">
              <MapPin className="h-3 w-3 mr-1" /> {pkg.destinationName || 'Sri Lanka'}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow">{pkg.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-5 w-5 text-sky-400" /> {pkg.duration} Days
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                {pkg.averageRating?.toFixed(1) || '5.0'} ({pkg.totalReviews || 0} reviews)
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-5 w-5 text-sky-400" /> Max {pkg.maxGroupSize || 15} guests
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Camera className="h-5 w-5 text-sky-400" /> {pkg.availableSeats || 10} seats left
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Tabs */}
            <div className="bg-white rounded-2xl border border-sky-100 shadow overflow-hidden">
              <div className="flex border-b border-sky-100">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm font-semibold capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-sky-600 border-b-2 border-sky-500 bg-sky-50/50'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed text-base">{pkg.description || 'Explore this incredible Sri Lanka tour package crafted by our expert travel team.'}</p>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {pkg.itinerary ? (
                      JSON.parse(pkg.itinerary).map((day: any, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Day {i + 1}: {day.title}</p>
                            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{day.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      Array.from({ length: pkg.duration }, (_, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-sky-50 rounded-xl border border-sky-100">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">Day {i + 1}</p>
                            <p className="text-slate-500 text-sm mt-1">Detailed day itinerary provided upon booking confirmation.</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'includes' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" /> What's Included
                      </h3>
                      <ul className="space-y-2.5">
                        {(pkg.inclusions ? JSON.parse(pkg.inclusions) : [
                          'Accommodation', 'Meals as per itinerary', 'Air-conditioned transport',
                          'Professional guide', 'All entrance fees', 'Airport transfers'
                        ]).map((item: string) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                        <XCircle className="h-5 w-5" /> Not Included
                      </h3>
                      <ul className="space-y-2.5">
                        {(pkg.exclusions ? JSON.parse(pkg.exclusions) : [
                          'International flights', 'Travel insurance', 'Visa fees',
                          'Personal expenses', 'Tips for guides', 'Alcoholic beverages'
                        ]).map((item: string) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                              <XCircle className="h-3 w-3 text-red-500" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-10">
                    <Star className="h-12 w-12 text-slate-200 mx-auto mb-3" />
                    <h3 className="font-semibold text-slate-700 mb-1">No reviews yet</h3>
                    <p className="text-slate-400 text-sm">Be the first to share your experience!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'Free Cancellation', sub: 'Up to 48hrs before', color: 'sky' },
                { icon: Award, label: 'Best Price Guarantee', sub: 'We match any price', color: 'orange' },
                { icon: MessageCircle, label: '24/7 Support', sub: 'Via WhatsApp & email', color: 'emerald' },
              ].map(badge => (
                <div key={badge.label} className="bg-white rounded-2xl border border-sky-100 shadow p-4 text-center">
                  <div className={`w-10 h-10 bg-${badge.color}-100 rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <badge.icon className={`h-5 w-5 text-${badge.color}-600`} />
                  </div>
                  <p className="font-semibold text-slate-800 text-xs">{badge.label}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Booking Sidebar */}
          <div className="space-y-4">
            <div className="sticky top-24 bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden">

              {/* Price Header */}
              <div className="bg-gradient-to-r from-sky-500 to-cyan-500 p-6 text-white">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold">{formatPrice(pkg.price)}</span>
                  {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                    <span className="text-white/70 line-through text-base">{formatPrice(pkg.originalPrice)}</span>
                  )}
                </div>
                <p className="text-white/80 text-sm">per person</p>
                {discount && (
                  <Badge className="bg-orange-400 text-white border-0 mt-2 text-xs font-bold">
                    Save {discount}% — Limited Offer!
                  </Badge>
                )}
              </div>

              <div className="p-6">
                {!bookingSuccess ? (
                  <>
                    {/* Guest Counter */}
                    <div className="mb-5">
                      <label className="text-sm font-semibold text-slate-700 mb-3 block">Guests</label>
                      <div className="flex gap-3">
                        <div className="flex-1 flex items-center justify-between bg-sky-50 rounded-xl px-3 py-2 border border-sky-100">
                          <span className="text-xs text-slate-500 font-medium">Adults</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold hover:bg-sky-100 transition-colors shadow-sm">−</button>
                            <span className="font-bold text-slate-800 w-5 text-center">{adults}</span>
                            <button onClick={() => setAdults(Math.min(pkg.maxGroupSize || 15, adults + 1))}
                              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold hover:bg-sky-100 transition-colors shadow-sm">+</button>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center justify-between bg-sky-50 rounded-xl px-3 py-2 border border-sky-100">
                          <span className="text-xs text-slate-500 font-medium">Children</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setChildren(Math.max(0, children - 1))}
                              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold hover:bg-sky-100 transition-colors shadow-sm">−</button>
                            <span className="font-bold text-slate-800 w-5 text-center">{children}</span>
                            <button onClick={() => setChildren(children + 1)}
                              className="w-7 h-7 bg-white rounded-lg text-slate-600 font-bold hover:bg-sky-100 transition-colors shadow-sm">+</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-sky-50 rounded-xl p-3 mb-5 space-y-1.5 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>{adults} Adult{adults > 1 ? 's' : ''} × {formatPrice(pkg.price)}</span>
                        <span className="font-medium">{formatPrice(pkg.price * adults)}</span>
                      </div>
                      {children > 0 && (
                        <div className="flex justify-between text-slate-600">
                          <span>{children} Child{children > 1 ? 'ren' : ''} × {formatPrice(pkg.price * 0.6)}</span>
                          <span className="font-medium">{formatPrice(pkg.price * 0.6 * children)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-slate-800 pt-1.5 border-t border-sky-200">
                        <span>Total</span>
                        <span className="text-sky-700">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                      <h3 className="font-bold text-slate-800 text-base">Your Details</h3>

                      <div>
                        <Input {...register('fullName')} placeholder="Full Name *" className="rounded-xl border-slate-200 h-10 text-sm" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <Input {...register('email')} type="email" placeholder="Email Address *" className="rounded-xl border-slate-200 h-10 text-sm" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <Input {...register('phoneNumber')} placeholder="Phone Number *" className="rounded-xl border-slate-200 h-10 text-sm" />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                      </div>
                      <div>
                        <Input {...register('country')} placeholder="Country *" className="rounded-xl border-slate-200 h-10 text-sm" />
                        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                      </div>
                      <div>
                        <Input {...register('travelDate')} type="date" className="rounded-xl border-slate-200 h-10 text-sm" min={new Date().toISOString().split('T')[0]} />
                        {errors.travelDate && <p className="text-red-500 text-xs mt-1">{errors.travelDate.message}</p>}
                      </div>
                      <div>
                        <textarea
                          {...register('specialRequests')}
                          placeholder="Special requests (optional)"
                          rows={2}
                          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 resize-none"
                        />
                      </div>

                      {!isAuthenticated && (
                        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                          ⚠️ You must <Link href="/login" className="font-semibold underline">sign in</Link> to complete a booking.
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={createBooking.isPending}
                        className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-3 rounded-xl font-bold text-base transition-all hover:shadow-lg"
                      >
                        {createBooking.isPending ? 'Booking...' : `Book Now — ${formatPrice(totalPrice)}`}
                      </Button>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=Hi%20TravelEaseLK!%20I'm%20interested%20in%20booking%20"${encodeURIComponent(pkg.name)}"%20for%20${adults}%20adult(s).`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button type="button" variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 rounded-xl py-3 font-semibold">
                          <MessageCircle className="h-4 w-4 mr-2" /> Inquire via WhatsApp
                        </Button>
                      </a>
                    </form>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Booking Confirmed! 🎉</h3>
                    <div className="bg-sky-50 rounded-xl p-3 text-sm text-slate-600">
                      <p>Booking ID: <strong className="text-slate-800">{bookingSuccess.bookingId}</strong></p>
                      <p>Package: {bookingSuccess.packageName}</p>
                    </div>
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
                      <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl py-3 font-bold">
                        <MessageCircle className="h-4 w-4 mr-2" /> Confirm via WhatsApp
                      </Button>
                    </a>
                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full rounded-xl py-3">View My Bookings</Button>
                    </Link>
                    <button onClick={() => setBookingSuccess(null)} className="text-sky-600 text-sm font-medium hover:underline">
                      Book Another Tour
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}