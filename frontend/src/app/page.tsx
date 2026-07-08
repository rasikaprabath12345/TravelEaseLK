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
  Navigation,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
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

// Image URLs - Generated
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

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
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

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HomePage() {
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { data: destinationsData, isLoading: destLoading, error: destError } = useDestinations();
  const [activeCategory, setActiveCategory] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const packageImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.nuwaraeliya, IMAGES.galle, IMAGES.hero];
  const destinationImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.galle];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="font-body bg-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/plus-jakarta-sans@5.0.16/index.min.css');
        @import url('https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/index.min.css');
        
        :root {
          --tl-navy: #0f172a;
          --tl-ocean: #0369a1;
          --tl-ocean-light: #0ea5e9;
          --tl-coral: #ea580c;
          --tl-coral-light: #f97316;
          --tl-gray-50: #f8fafc;
          --tl-gray-100: #f1f5f9;
          --tl-gray-200: #e2e8f0;
          --tl-gray-400: #94a3b8;
          --tl-gray-500: #64748b;
          --tl-gray-600: #475569;
          --tl-gray-700: #334155;
          --tl-gray-900: #0f172a;
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
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9 0%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          
          {/* Floating Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-6xl mx-auto pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-2.5 mb-8"
          >
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="font-display text-sm text-white">
              #1 Travel Agency in Sri Lanka
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight"
          >
            Discover
            <span className="block gradient-text">Sri Lanka</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 font-normal text-white/80">
              The Pearl of the Indian Ocean
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
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
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold px-8 py-6 rounded-full text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all hover:-translate-y-0.5 group"
              >
                Explore Packages 
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="glass-card text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-base transition-all hover:-translate-y-0.5"
              >
                <Play className="h-5 w-5 mr-2" /> Watch Video
              </Button>
            </Link>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-3xl p-3 shadow-2xl max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-white/5 transition-colors group">
                <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                  <MapPin className="h-5 w-5 text-sky-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-0.5">Destination</p>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-white/5 transition-colors md:border-l md:border-white/10 group">
                <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                  <Calendar className="h-5 w-5 text-sky-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-0.5">Date</p>
                  <input
                    type="text"
                    placeholder="When?"
                    className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl px-5 py-4 hover:bg-white/5 transition-colors md:border-l md:border-white/10 group">
                <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center group-hover:bg-sky-500/30 transition-colors">
                  <Users className="h-5 w-5 text-sky-400" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mb-0.5">Guests</p>
                  <input
                    type="text"
                    placeholder="How many?"
                    className="bg-transparent border-none outline-none text-white placeholder-white/40 w-full text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center p-2">
                <Link href="/packages" className="w-full h-full">
                  <Button
                    size="lg"
                    className="w-full h-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-2xl px-8 font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all group"
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
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
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100"
          >
            {[
              { value: '15K+', label: 'Happy Travelers', icon: Users, color: 'sky' },
              { value: '250+', label: 'Tour Packages', icon: Globe, color: 'orange' },
              { value: '50+', label: 'Destinations', icon: MapPin, color: 'green' },
              { value: '98%', label: 'Satisfaction Rate', icon: Star, color: 'yellow' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-14 h-14 bg-${stat.color}-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-7 w-7 text-${stat.color}-600`} />
                </div>
                <p className="font-display text-3xl md:text-4xl text-slate-900 mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 font-display text-sm text-orange-600 mb-3">
                <Sparkles className="h-4 w-4" /> FEATURED TOURS
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-slate-900 leading-tight">
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
                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/20'
                        : 'bg-white text-slate-600 hover:bg-gray-100 border border-gray-200'
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
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
                  <div className="h-56 bg-gray-200" />
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
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    <div className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={pkg.imageUrl || packageImages[index % packageImages.length]}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 shadow-sm text-xs font-semibold border-0">
                            <Star className="h-3 w-3 mr-1 fill-orange-400 text-orange-400" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>

                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-gradient-to-r from-orange-600 to-orange-500 text-white border-none text-xs font-semibold shadow-lg">
                              <Sparkles className="h-3 w-3 mr-1" /> FEATURED
                            </Badge>
                          </div>
                        )}

                        <button
                          onClick={(e) => { e.preventDefault(); }}
                          className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 shadow-lg"
                        >
                          <Heart className="h-4 w-4 text-slate-600 hover:text-orange-600 transition-colors" />
                        </button>

                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 shadow-sm text-xs font-semibold border-0">
                            <Camera className="h-3 w-3 mr-1" /> {pkg.imageCount || 12} Photos
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center text-xs text-sky-600 font-semibold mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {pkg.destinationName || 'Sri Lanka'}
                        </div>
                        <h3 className="font-display text-lg mb-3 line-clamp-1 text-slate-900 group-hover:text-sky-600 transition-colors">
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

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <span className="text-xs text-slate-400">From</span>
                            <div>
                              <span className="text-xl font-display text-slate-900">
                                {formatPrice(pkg.price)}
                              </span>
                              <span className="text-xs text-slate-400 ml-1">/ person</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-sky-500 transition-all">
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
                className="bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white text-sm font-semibold px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 group"
              >
                View All Packages 
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-orange-600 mb-3">
              <MapPin className="h-4 w-4" /> TOP DESTINATIONS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-900">
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
                  <div className="w-full h-full bg-gray-200" />
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
                    <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img
                        src={dest.imageUrl || destinationImages[index % destinationImages.length]}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 text-xs font-semibold">
                          {dest.packageCount || 0} Tours
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-display text-2xl mb-1 group-hover:text-orange-400 transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" /> {dest.country || 'Sri Lanka'}
                        </p>
                        <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all">
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
            <span className="inline-flex items-center gap-2 font-display text-sm text-orange-600 mb-3">
              <Shield className="h-4 w-4" /> WHY TRAVELEASE LK
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-900">
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
                gradient: 'from-sky-500 to-sky-600',
              },
              {
                icon: Shield,
                title: 'Best Prices',
                desc: 'Competitive pricing with no hidden charges and price match guarantee',
                bgColor: 'bg-orange-50',
                iconColor: 'text-orange-600',
                gradient: 'from-orange-500 to-orange-600',
              },
              {
                icon: Star,
                title: 'Safe Travel',
                desc: 'Your safety is our top priority with comprehensive travel insurance',
                bgColor: 'bg-yellow-50',
                iconColor: 'text-yellow-600',
                gradient: 'from-yellow-500 to-yellow-600',
              },
              {
                icon: Headphones,
                title: '24/7 Support',
                desc: 'Round the clock customer support in multiple languages',
                bgColor: 'bg-green-50',
                iconColor: 'text-green-600',
                gradient: 'from-green-500 to-green-600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full group bg-white relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 relative`}>
                    <item.icon className={`h-7 w-7 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-display text-lg mb-3 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-orange-600 mb-3">
              <Heart className="h-4 w-4" /> TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-900">
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
                <div className="p-8 rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col relative border border-gray-100">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-orange-100" />
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-600 to-orange-600 flex items-center justify-center text-white text-lg font-display font-bold shrink-0 shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-sky-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-white/80 text-sm font-medium">Start Your Journey Today</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl mb-6 text-white leading-tight">
              Ready for Your Next
              <span className="block gradient-text">Adventure?</span>
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/70 max-w-2xl mx-auto leading-relaxed">
              Book your dream vacation today and create memories that last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white text-base font-semibold px-10 py-7 rounded-full shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all hover:-translate-y-1 group"
                >
                  Browse Packages 
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-card text-white hover:bg-white/10 text-base font-semibold px-10 py-7 rounded-full transition-all hover:-translate-y-1"
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