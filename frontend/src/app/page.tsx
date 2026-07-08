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
  Sparkles,
  CheckCircle,
  Play,
  Quote,
  Compass,
  Camera,
  Sun,
  Waves,
  Mountain,
  TreePine,
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

const IMAGES = {
  hero: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/118da4336-3953-4ca6-b315-99ef014952d6.png',
  sigiriya: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/1a8d1aa12-160e-4c1f-8cc7-f10f5675db58.png',
  ella: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/1479926ae-5216-4fd8-b7c1-3528caca7122.png',
  kandy: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/1a0438d02-1922-45b2-bec3-2b07b20156da.png',
  yala: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/1335030c0-0605-4f92-a8fa-ad37583c6186.png',
  mirissa: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/175172c21-a721-4942-b2e9-f07824061a63.png',
  nuwaraeliya: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/15ccd3012-f00a-44f1-a817-dbcd1233580f.png',
  galle: 'https://image.qwenlm.ai/public_source/b8ecae86-4884-448f-8cdf-9ce39fadb778/1a44f951d-2ad0-4d48-b38e-45b51f47f7b3.png',
};

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''));
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [numericValue]);

  return <span>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { data: destinationsData, isLoading: destLoading, error: destError } = useDestinations();
  const [activeCategory, setActiveCategory] = useState('all');
  const [bgIndex, setBgIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  const categories = [
    { id: 'all', label: 'All Tours', icon: Compass },
    { id: 'beach', label: 'Beach & Coastal', icon: Waves },
    { id: 'cultural', label: 'Cultural Heritage', icon: Award },
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine },
    { id: 'hill', label: 'Hill Country', icon: Mountain },
  ];

  const filteredPackages = activeCategory === 'all'
    ? featuredPackages
    : featuredPackages.filter((pkg: any) => pkg.category === activeCategory);

  const heroBackgrounds = [
    IMAGES.hero,
    IMAGES.sigiriya,
    IMAGES.ella,
    IMAGES.yala,
    IMAGES.mirissa,
    IMAGES.galle
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  const packageImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.nuwaraeliya, IMAGES.galle, IMAGES.hero];
  const destinationImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.galle];

  return (
    <div className="font-body bg-gradient-to-b from-sky-50 via-white to-sky-50/30 overflow-x-hidden">
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/plus-jakarta-sans@5.0.16/index.min.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/index.min.css');
        
        :root {
          --tl-primary: #0ea5e9;
          --tl-primary-light: #e0f2fe;
          --tl-accent: #f97316;
          --tl-accent-light: #ffedd5;
        }
        
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 600;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #38bdf8 0%, #22d3ee 50%, #fb923c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .soft-shadow {
          box-shadow: 0 10px 40px -10px rgba(14, 165, 233, 0.15);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px -15px rgba(14, 165, 233, 0.2);
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-orange-400 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero Section - Image Slideshow Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        
        {/* Dynamic Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === bgIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={src}
                alt="Sri Lanka Destination"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Overlay to ensure text readability and smooth transition to the next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-sky-50" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 mb-8 soft-shadow"
          >
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="font-display text-sm text-white font-medium">
              #1 Travel Agency in Sri Lanka
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
          >
            Discover
            <span className="block gradient-text drop-shadow-md">Sri Lanka</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 font-normal text-white/90">
              The Pearl of the Indian Ocean
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow"
          >
            From pristine beaches to ancient kingdoms, explore Sri Lanka's magic
            with expertly curated tours designed for unforgettable memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/packages">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 rounded-full text-base soft-shadow hover:shadow-xl transition-all hover:-translate-y-0.5 group"
              >
                Explore Packages 
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-6 rounded-full text-base transition-all hover:-translate-y-0.5"
              >
                <Play className="h-5 w-5 mr-2" /> Watch Video
              </Button>
            </Link>
          </motion.div>

          {/* Search Box - Light Glass */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-3xl p-3 soft-shadow max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-sky-50/50 transition-colors group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <MapPin className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-sky-50/50 transition-colors md:border-l md:border-sky-100 group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Calendar className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Date</p>
                  <input
                    type="text"
                    placeholder="When?"
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-sky-50/50 transition-colors md:border-l md:border-sky-100 group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Users className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Guests</p>
                  <input
                    type="text"
                    placeholder="How many?"
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center p-2">
                <Link href="/packages" className="w-full h-full">
                  <Button
                    size="lg"
                    className="w-full h-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-2xl px-8 font-semibold soft-shadow hover:shadow-xl transition-all"
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
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/90 text-sm font-medium drop-shadow-sm"
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-30 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl soft-shadow p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border border-sky-100/50"
          >
            {[
              { value: '15K+', label: 'Happy Travelers', icon: Users, color: 'sky' },
              { value: '250+', label: 'Tour Packages', icon: Globe, color: 'cyan' },
              { value: '50+', label: 'Destinations', icon: MapPin, color: 'orange' },
              { value: '98%', label: 'Satisfaction Rate', icon: Star, color: 'amber' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-7 w-7 text-${stat.color}-600`} />
                </div>
                <p className="font-display text-3xl md:text-4xl text-slate-800 mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
                <Sparkles className="h-4 w-4" /> FEATURED TOURS
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-slate-800 leading-tight">
                Popular Packages
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-slate-500 max-w-md text-base leading-relaxed">
                Handpicked travel experiences crafted by experts
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white soft-shadow'
                        : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-100'
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
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-sky-100 soft-shadow animate-pulse">
                  <div className="h-56 bg-sky-100" />
                  <div className="p-5">
                    <div className="h-3 bg-sky-100 rounded w-20 mb-3" />
                    <div className="h-5 bg-sky-100 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-sky-100 rounded w-1/2 mb-4" />
                    <div className="flex justify-between items-center pt-3 border-t border-sky-100">
                      <div className="h-6 bg-sky-100 rounded w-24" />
                      <div className="h-6 bg-sky-100 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : packagesError ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <p className="text-red-500 font-medium mb-2">Failed to load packages</p>
              <p className="text-slate-400 text-sm">Please try again later</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium mb-2">No packages found</p>
              <p className="text-slate-400 text-sm">Try a different category</p>
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
                    <div className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-sky-100 soft-shadow card-hover">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={pkg.imageUrl || packageImages[index % packageImages.length]}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-800 soft-shadow text-xs font-semibold border-0">
                            <Star className="h-3 w-3 mr-1 fill-orange-400 text-orange-400" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>

                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-500 to-orange-400 text-white border-none text-xs font-semibold soft-shadow">
                              <Sparkles className="h-3 w-3 mr-1" /> FEATURED
                            </Badge>
                          </div>
                        )}

                        <button
                          onClick={(e) => { e.preventDefault(); }}
                          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 soft-shadow"
                        >
                          <Heart className="h-4 w-4 text-slate-600 hover:text-orange-500 transition-colors" />
                        </button>

                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-800 soft-shadow text-xs font-semibold border-0">
                            <Camera className="h-3 w-3 mr-1" /> {pkg.imageCount || 12} Photos
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center text-xs text-sky-600 font-semibold mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {pkg.destinationName || 'Sri Lanka'}
                        </div>
                        <h3 className="font-display text-lg mb-3 line-clamp-1 text-slate-800 group-hover:text-sky-600 transition-colors">
                          {pkg.name}
                        </h3>

                        <div className="flex items-center gap-3 mb-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> Max {pkg.maxGroupSize || 15}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {pkg.duration} Days
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                          <div>
                            <span className="text-xs text-slate-400">From</span>
                            <div>
                              <span className="text-xl font-display text-slate-800">
                                {formatPrice(pkg.price)}
                              </span>
                              <span className="text-xs text-slate-400 ml-1">/ person</span>
                            </div>
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
          )}

          <div className="text-center mt-14">
            <Link href="/packages">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-sm font-semibold px-10 py-6 rounded-full soft-shadow hover:shadow-xl transition-all hover:-translate-y-0.5 group"
              >
                View All Packages 
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <MapPin className="h-4 w-4" /> TOP DESTINATIONS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-800">
              Explore Destinations
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Discover the most beautiful places around the island
            </p>
          </motion.div>

          {destLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 rounded-3xl overflow-hidden animate-pulse">
                  <div className="w-full h-full bg-sky-100" />
                </div>
              ))}
            </div>
          ) : destError ? (
            <div className="text-center py-16">
              <p className="text-red-500 font-medium">Failed to load destinations</p>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400">No destinations found</p>
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
                    <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer soft-shadow card-hover">
                      <img
                        src={dest.imageUrl || destinationImages[index % destinationImages.length]}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-slate-800 soft-shadow text-xs font-semibold border-0">
                          {dest.packageCount || 0} Tours
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-display text-2xl mb-1 group-hover:text-orange-300 transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-white/80 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {dest.country || 'Sri Lanka'}
                        </p>
                        <div className="flex items-center gap-2 text-orange-300 font-semibold text-sm group-hover:gap-3 transition-all">
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

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <Shield className="h-4 w-4" /> WHY TRAVELEASE LK
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-800">
              Built On Trust & Excellence
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              We provide the best travel experiences with premium service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: 'Experienced Guides',
                desc: 'Professional and knowledgeable tour guides with years of expertise',
                bgColor: 'bg-sky-50',
                iconColor: 'text-sky-600',
              },
              {
                icon: Shield,
                title: 'Best Prices',
                desc: 'Competitive pricing with no hidden charges and price match guarantee',
                bgColor: 'bg-orange-50',
                iconColor: 'text-orange-600',
              },
              {
                icon: Star,
                title: 'Safe Travel',
                desc: 'Your safety is our top priority with comprehensive travel insurance',
                bgColor: 'bg-amber-50',
                iconColor: 'text-amber-600',
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                desc: 'Round the clock customer support in multiple languages',
                bgColor: 'bg-emerald-50',
                iconColor: 'text-emerald-600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 rounded-3xl border border-sky-100 soft-shadow card-hover h-full group bg-white">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display text-lg mb-3 text-slate-800">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <Heart className="h-4 w-4" /> TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-800">
              What Our Travelers Say
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base">
              Real stories from real travelers
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
                text: 'Perfect family vacation. Everything was taken care of. The kids loved every moment. Highly recommended!',
                rating: 5,
                location: 'Australia',
              },
              {
                name: 'Michael Brown',
                role: 'Solo Traveler',
                text: 'Best travel agency I have ever used. Professional service and great value. Will definitely book again.',
                rating: 5,
                location: 'United States',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 rounded-3xl bg-white soft-shadow card-hover h-full flex flex-col relative border border-sky-100">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-sky-100" />
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-5 border-t border-sky-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-lg font-display font-bold shrink-0 soft-shadow">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Light & Elegant */}
      <section className="py-24 bg-gradient-to-br from-sky-100 via-white to-orange-50 relative overflow-hidden">
        {/* Floating Light Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 mb-6 soft-shadow border border-sky-100">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="text-slate-700 text-sm font-medium">Start Your Journey Today</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl mb-6 text-slate-800 leading-tight">
              Ready for Your Next
              <span className="block gradient-text">Adventure?</span>
            </h2>
            <p className="text-lg md:text-xl mb-10 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Book your dream vacation today and create memories that last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-base font-semibold px-10 py-7 rounded-full soft-shadow hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  Browse Packages 
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-sky-200 text-slate-700 hover:bg-white hover:border-sky-300 text-base font-semibold px-10 py-7 rounded-full transition-all hover:-translate-y-1"
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