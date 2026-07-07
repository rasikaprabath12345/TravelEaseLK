'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Shield,
  Award,
  Headphones,
  ChevronRight,
  ArrowRight,
  Globe,
  Clock,
  Heart,
  Play,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Quote,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';

// Animated counter component
function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`counter-${target}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span id={`counter-${target}`}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Skeleton loader for packages
function PackageSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-5">
        <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="h-6 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// Destination skeleton
function DestinationSkeleton() {
  return (
    <div className="h-72 rounded-2xl overflow-hidden animate-pulse">
      <div className="w-full h-full bg-gray-200" />
    </div>
  );
}

export default function HomePage() {
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { data: destinationsData, isLoading: destLoading, error: destError } = useDestinations();
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  const categories = [
    { id: 'all', label: 'All Tours', icon: Globe },
    { id: 'beach', label: 'Beach', icon: MapPin },
    { id: 'adventure', label: 'Adventure', icon: TrendingUp },
    { id: 'cultural', label: 'Cultural', icon: Award },
  ];

  const filteredPackages = activeCategory === 'all'
    ? featuredPackages
    : featuredPackages.filter((pkg: any) => pkg.category === activeCategory);

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <div className="font-body bg-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        :root {
          --tl-navy: #16232e;
          --tl-ocean: #0e6ba8;
          --tl-ocean-dark: #0a4e7d;
          --tl-coral: #ff7a50;
          --tl-coral-dark: #e85d34;
          --tl-bg-soft: #f5f9fb;
          --tl-gold: #f4b942;
        }
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-body {
          font-family: 'Inter', sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-cover bg-center scale-110"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        >
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80"
            alt="Sri Lanka Beach"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--tl-navy)]/80 via-[var(--tl-navy)]/50 to-[var(--tl-navy)]/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--tl-ocean-dark)]/30 to-transparent z-10" />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-[var(--tl-coral)]/10 blur-xl z-10"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[var(--tl-ocean)]/10 blur-xl z-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-[var(--tl-coral)]" />
            <span className="font-display font-semibold text-xs md:text-sm tracking-wide text-white/90">
              #1 Rated Travel Agency in Sri Lanka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[1.1] tracking-tight"
          >
            Explore The
            <span className="relative inline-block ml-4">
              <span className="relative z-10 bg-gradient-to-r from-[var(--tl-coral)] to-[var(--tl-gold)] bg-clip-text text-transparent">
                Pearl
              </span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
              >
                <motion.path
                  d="M 0 8 Q 50 0, 100 8 T 200 8"
                  fill="none"
                  stroke="var(--tl-coral)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </motion.svg>
            </span>
            <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-white/90">
              of the Indian Ocean
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From pristine beaches to ancient kingdoms, discover Sri Lanka's magic
            with expertly curated tours designed for unforgettable memories.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/packages">
              <Button
                size="lg"
                className="bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white font-semibold px-8 py-6 rounded-full text-base shadow-lg shadow-[var(--tl-coral)]/30 hover:shadow-xl hover:shadow-[var(--tl-coral)]/40 transition-all hover:-translate-y-0.5"
              >
                Explore Packages <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 font-semibold px-8 py-6 rounded-full text-base transition-all hover:-translate-y-0.5"
            >
              <Play className="h-5 w-5 mr-2 fill-white" /> Watch Story
            </Button>
          </motion.div>

          {/* Search Box - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-2 shadow-2xl shadow-black/20 max-w-4xl mx-auto border border-white/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-1">
              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-[var(--tl-bg-soft)] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-[var(--tl-ocean)]/10 flex items-center justify-center group-hover:bg-[var(--tl-ocean)]/20 transition-colors">
                  <MapPin className="h-5 w-5 text-[var(--tl-ocean)]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-[var(--tl-bg-soft)] transition-all cursor-pointer group md:border-l md:border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[var(--tl-ocean)]/10 flex items-center justify-center group-hover:bg-[var(--tl-ocean)]/20 transition-colors">
                  <Calendar className="h-5 w-5 text-[var(--tl-ocean)]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Date</p>
                  <input
                    type="text"
                    placeholder="When?"
                    className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-[var(--tl-bg-soft)] transition-all cursor-pointer group md:border-l md:border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[var(--tl-ocean)]/10 flex items-center justify-center group-hover:bg-[var(--tl-ocean)]/20 transition-colors">
                  <Users className="h-5 w-5 text-[var(--tl-ocean)]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Guests</p>
                  <input
                    type="text"
                    placeholder="How many?"
                    className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center p-2">
                <Link href="/packages" className="w-full h-full">
                  <Button
                    size="lg"
                    className="w-full h-full bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white rounded-2xl px-8 font-semibold shadow-lg shadow-[var(--tl-coral)]/30 hover:shadow-xl transition-all"
                  >
                    <Search className="h-5 w-5 mr-2" /> Search
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/70"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-30 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100"
          >
            {[
              { value: 15000, suffix: '+', label: 'Happy Travelers', icon: Users },
              { value: 250, suffix: '+', label: 'Tour Packages', icon: Globe },
              { value: 50, suffix: '+', label: 'Destinations', icon: MapPin },
              { value: 98, suffix: '%', label: 'Satisfaction Rate', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-[var(--tl-bg-soft)] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-[var(--tl-ocean)]" />
                </div>
                <p className="font-display font-extrabold text-3xl md:text-4xl text-[var(--tl-navy)] mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Packages Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)] mb-3">
                <Sparkles className="h-4 w-4" /> FEATURED TOURS
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--tl-navy)] leading-tight">
                Popular Packages
                <span className="block text-[var(--tl-ocean)]">For You</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-gray-500 max-w-md text-sm md:text-base leading-relaxed">
                Handpicked travel experiences crafted by experts for unforgettable memories
              </p>
              {/* Category filter */}
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-[var(--tl-navy)] text-white shadow-md'
                        : 'bg-[var(--tl-bg-soft)] text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <PackageSkeleton key={i} />
              ))}
            </div>
          ) : packagesError ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-red-500 font-medium mb-2">Failed to load packages</p>
              <p className="text-gray-400 text-sm">Please try again later</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium mb-2">No packages found</p>
              <p className="text-gray-400 text-sm">Try a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPackages.slice(0, 8).map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Badge className="bg-white/95 backdrop-blur-sm text-[var(--tl-navy)] shadow-sm text-xs font-semibold border-0">
                            <Star className="h-3 w-3 mr-1 fill-[var(--tl-gold)] text-[var(--tl-gold)]" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>

                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-[var(--tl-coral)] to-[var(--tl-coral-dark)] text-white border-none text-[10px] font-bold tracking-wide shadow-lg">
                              <Sparkles className="h-3 w-3 mr-1" /> FEATURED
                            </Badge>
                          </div>
                        )}

                        {/* Wishlist button */}
                        <button
                          onClick={(e) => { e.preventDefault(); }}
                          className="absolute bottom-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                        >
                          <Heart className="h-4 w-4 text-gray-600 hover:text-[var(--tl-coral)] transition-colors" />
                        </button>

                        {/* Duration badge */}
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-black/60 backdrop-blur-sm text-white border-0 text-xs">
                            <Clock className="h-3 w-3 mr-1" /> {pkg.duration} Days
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center text-xs text-[var(--tl-ocean)] font-semibold mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {pkg.destinationName || 'Sri Lanka'}
                        </div>
                        <h3 className="font-display font-bold text-lg mb-3 line-clamp-1 text-[var(--tl-navy)] group-hover:text-[var(--tl-ocean)] transition-colors">
                          {pkg.name}
                        </h3>

                        {/* Features */}
                        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> Max {pkg.maxGroupSize || 15}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-[var(--tl-gold)] text-[var(--tl-gold)]" />
                            {pkg.reviewCount || 0} reviews
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-gray-400">From</span>
                            <div>
                              <span className="text-xl font-display font-extrabold text-[var(--tl-navy)]">
                                {formatPrice(pkg.price)}
                              </span>
                              <span className="text-xs text-gray-400 ml-1">/ person</span>
                            </div>
                          </div>
                          <div className="w-9 h-9 bg-[var(--tl-ocean)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--tl-ocean)] group-hover:text-white transition-all">
                            <ArrowRight className="h-4 w-4 text-[var(--tl-ocean)] group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <Link href="/packages">
              <Button
                size="lg"
                className="bg-[var(--tl-navy)] hover:bg-[var(--tl-navy)]/90 text-white text-sm font-semibold px-10 py-6 rounded-full shadow-lg shadow-[var(--tl-navy)]/20 hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                View All Packages <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations - Enhanced */}
      <section className="py-24 bg-[var(--tl-bg-soft)] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--tl-ocean)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--tl-coral)]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)] mb-3">
              <MapPin className="h-4 w-4" /> TOP DESTINATIONS
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-4 text-[var(--tl-navy)]">
              Explore Destinations
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Discover the most beautiful places around the island paradise
            </p>
          </motion.div>

          {destLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <DestinationSkeleton key={i} />
              ))}
            </div>
          ) : destError ? (
            <div className="text-center py-16">
              <p className="text-red-500 font-medium">Failed to load destinations</p>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400">No destinations found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.slice(0, 6).map((dest: any, index: number) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/destinations/${dest.id}`}>
                    <div className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img
                        src={dest.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tl-navy)]/95 via-[var(--tl-navy)]/30 to-transparent" />

                      {/* Package count badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 text-xs font-semibold">
                          {dest.packageCount || 0} Tours
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-display font-bold text-2xl mb-1 group-hover:text-[var(--tl-coral)] transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {dest.country || 'Sri Lanka'}
                        </p>
                        <div className="flex items-center gap-2 text-[var(--tl-coral)] font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Explore Now</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)] mb-3">
              <Shield className="h-4 w-4" /> WHY TRAVELEASE LK
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-4 text-[var(--tl-navy)]">
              Built On Trust &
              <span className="text-[var(--tl-ocean)]"> Excellence</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              We provide the best travel experiences with premium service and unmatched quality
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Experienced Guides',
                desc: 'Professional and knowledgeable tour guides with years of expertise',
                color: 'from-[var(--tl-ocean)] to-blue-400',
                bgColor: 'bg-[var(--tl-ocean)]/10',
              },
              {
                icon: Shield,
                title: 'Best Prices',
                desc: 'Competitive pricing with no hidden charges and price match guarantee',
                color: 'from-[var(--tl-coral)] to-orange-400',
                bgColor: 'bg-[var(--tl-coral)]/10',
              },
              {
                icon: Star,
                title: 'Safe Travel',
                desc: 'Your safety is our top priority with comprehensive travel insurance',
                color: 'from-[var(--tl-gold)] to-yellow-400',
                bgColor: 'bg-[var(--tl-gold)]/10',
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                desc: 'Round the clock customer support in multiple languages',
                color: 'from-green-500 to-emerald-400',
                bgColor: 'bg-green-50',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 hover:-translate-y-2 transition-all duration-500 h-full group bg-white">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-7 w-7 bg-gradient-to-br ${item.color} bg-clip-text`} style={{ color: 'inherit' }} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-3 text-[var(--tl-navy)]">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-24 bg-[var(--tl-bg-soft)] relative overflow-hidden">
        <div className="absolute top-20 left-10 text-[var(--tl-ocean)]/5">
          <Quote className="h-40 w-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)] mb-3">
              <Heart className="h-4 w-4" /> TESTIMONIALS
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl mb-4 text-[var(--tl-navy)]">
              What Our Travelers Say
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Real stories from real travelers who explored with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'John Smith',
                role: 'Adventure Traveler',
                text: 'Amazing experience! The tour was well organized and the guides were fantastic. Every detail was perfectly planned.',
                rating: 5,
                location: 'United Kingdom',
              },
              {
                name: 'Sarah Johnson',
                role: 'Family Traveler',
                text: 'Perfect family vacation. Everything was taken care of from start to finish. The kids loved every moment!',
                rating: 5,
                location: 'Australia',
              },
              {
                name: 'Michael Brown',
                role: 'Solo Traveler',
                text: 'Best travel agency I have ever used. Professional service, great value, and incredible experiences throughout.',
                rating: 5,
                location: 'Canada',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative group">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote className="h-12 w-12 text-[var(--tl-ocean)]" />
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[var(--tl-gold)] text-[var(--tl-gold)]" />
                    ))}
                  </div>

                  <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-1 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--tl-ocean)] to-[var(--tl-coral)] flex items-center justify-center text-white text-lg font-display font-bold shrink-0 shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--tl-navy)] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--tl-navy)] to-[var(--tl-ocean-dark)] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--tl-coral)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--tl-ocean)]/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">
                Get Exclusive Deals
              </h3>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Subscribe to our newsletter and be the first to know about special offers and new destinations
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 outline-none focus:border-[var(--tl-coral)] transition-colors"
                />
                <Button className="bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-[var(--tl-coral)]/30 whitespace-nowrap">
                  Subscribe <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-[var(--tl-ocean-dark)] via-[var(--tl-ocean)] to-[var(--tl-ocean-dark)] relative overflow-hidden">
        {/* Animated background shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-80 h-80 border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 w-96 h-96 border border-white/5 rounded-full"
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-[var(--tl-coral)]" />
              <span className="text-white/80 text-sm font-medium">Start Your Journey Today</span>
            </div>

            <h2 className="font-display font-extrabold text-4xl md:text-6xl mb-6 text-white leading-tight">
              Ready for Your Next
              <span className="block text-[var(--tl-coral)]">Adventure?</span>
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/70 max-w-2xl mx-auto leading-relaxed">
              Book your dream vacation today and create memories that last a lifetime.
              Our experts are ready to help you plan the perfect trip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white text-base font-semibold px-10 py-7 rounded-full shadow-xl shadow-[var(--tl-coral)]/30 hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  Browse Packages <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-2 border-white/30 hover:bg-white/10 text-base font-semibold px-10 py-7 rounded-full backdrop-blur-sm transition-all hover:-translate-y-1"
                >
                  <Headphones className="h-5 w-5 mr-2" /> Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
