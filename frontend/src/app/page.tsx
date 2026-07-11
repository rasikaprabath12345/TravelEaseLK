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
  Waves,
  Mountain,
  TreePine,
  ShieldCheck,
  Check,
  HelpCircle,
  Map,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice, isValidImageUrl } from '@/lib/utils';

const IMAGES = {
  hero1: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1600&q=80',
  hero2: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=80',
  hero3: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1600&q=80',
  sigiriya: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
  ella: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800&q=80',
  kandy: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
  yala: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=800&q=80',
  mirissa: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
  nuwaraeliya: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
  galle: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
};

const signatureExperiences = [
  {
    title: 'Scenic Ella Train Ride',
    desc: 'Wind through emerald-green tea plantations and view historic stone arch bridges from your window.',
    image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=600&q=80',
    tag: 'Must-Do Experience',
    category: 'nature'
  },
  {
    title: 'Yala National Park Safari',
    desc: 'Spot leopards, elephants, and hundreds of bird species roaming freely in their natural habitat.',
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=600&q=80',
    tag: 'Wildlife Safari',
    category: 'nature'
  },
  {
    title: 'Ancient City of Sigiriya',
    desc: 'Climb the iconic 660-foot rock fortress and witness ruins of the ancient royal castle built on top.',
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80',
    tag: 'Unesco Heritage',
    category: 'cultural'
  },
  {
    title: 'Coastal Surf & Sun in Mirissa',
    desc: 'Relax on coconut-fringed golden beaches, swim with turtles, and catch stunning sunset waves.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&q=80',
    tag: 'Beach & Coastal',
    category: 'beach'
  }
];

const faqs = [
  {
    q: 'Is Sri Lanka safe for international tourists?',
    a: 'Absolutely. Sri Lanka is recognized globally as a safe, friendly, and welcoming destination for travelers, families, and solo tourists. Our dedicated tour coordinators check safety parameters daily.'
  },
  {
    q: 'How does the booking and bank transfer upload system work?',
    a: 'It is simple! You reserve your preferred dates instantly. You will then receive our official Bank account details to deposit/transfer funds. Once you transfer, simply log into your dashboard, click "Upload Slip" to submit the receipt photo, and our team will verify it in under 2 hours!'
  },
  {
    q: 'Can I cancel or reschedule my tour?',
    a: 'Yes! We offer free cancellation and rescheduling up to 7 days before your travel date. You can request changes directly through your customer dashboard.'
  },
  {
    q: 'Are your tours private or part of a group?',
    a: 'We offer both options. You can explore our standard packages which are small-group tours, or contact our support team to customize a private tour tailored exclusively for you.'
  }
];

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
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  const filteredPackages = activeCategory === 'all'
    ? featuredPackages
    : featuredPackages.filter((pkg: any) => pkg.category === activeCategory || pkg.categoryId === activeCategory);

  const categories = [
    { id: 'all', label: 'All Tours', icon: Compass },
    { id: 'beach', label: 'Beach & Coastal', icon: Waves },
    { id: 'cultural', label: 'Cultural Heritage', icon: Award },
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine },
    { id: 'hill', label: 'Hill Country', icon: Mountain },
  ];

  const [heroBackgrounds, setHeroBackgrounds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('site_hero_backgrounds');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHeroBackgrounds(parsed);
          return;
        }
      } catch (e) { }
    }
    setHeroBackgrounds([
      IMAGES.hero1,
      IMAGES.hero2,
      IMAGES.hero3,
    ]);
  }, []);

  useEffect(() => {
    if (heroBackgrounds.length === 0) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroBackgrounds.length]);

  const packageImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.nuwaraeliya, IMAGES.galle, IMAGES.hero1];
  const destinationImages = [IMAGES.sigiriya, IMAGES.ella, IMAGES.kandy, IMAGES.yala, IMAGES.mirissa, IMAGES.galle];

  return (
    <div className="font-body bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 overflow-x-hidden">
      <style jsx global>{`
        :root {
          --tl-primary: #0ea5e9;
          --tl-primary-light: #e0f2fe;
          --tl-accent: #f97316;
          --tl-accent-light: #ffedd5;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 20px 50px -12px rgba(15, 23, 42, 0.15);
        }

        .gradient-text {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #f97316 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .soft-shadow {
          box-shadow: 0 10px 45px -10px rgba(14, 165, 233, 0.12);
        }

        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px -15px rgba(14, 165, 233, 0.18);
        }

        .hero-bottom-fade {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.65) 60%,
            rgba(255, 255, 255, 1) 100%
          );
        }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-orange-400 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      {/* Hero Section - Elevated Slideshow Background */}
      <section className="relative h-[95vh] min-h-[780px] flex flex-col justify-end overflow-hidden">
        {/* Dynamic Background Slider */}
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === bgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } transition-transform duration-6000`}
            >
              <img
                src={src}
                alt="Sri Lanka Destination"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Luxury Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/50" />
          <div className="absolute bottom-0 left-0 right-0 h-48 hero-bottom-fade" />
        </div>

        <div className="relative z-20 w-full px-4 max-w-6xl mx-auto flex flex-col items-center pt-36 pb-10 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-5 leading-tight tracking-tight drop-shadow-xl"
          >
            Experience
            <span className="block gradient-text drop-shadow-md">Sri Lanka</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl mt-3 font-normal text-white/95">
              Curated Adventures. Uncompromising Trust.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow"
          >
            Explore breathtaking coastlines, ancient royal kingdoms, and lush tea estates.
            Travel with Sri Lanka's most trusted agency offering 100% verified local guides.
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
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold px-9 py-6.5 rounded-full text-base soft-shadow hover:shadow-xl transition-all hover:-translate-y-0.5 group cursor-pointer"
              >
                Browse Tour Packages
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 font-semibold px-9 py-6.5 rounded-full text-base transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Compass className="h-5 w-5 mr-2" /> Talk to an Expert
              </Button>
            </Link>
          </motion.div>

          {/* Premium Search box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-3xl p-3.5 soft-shadow w-full max-w-5xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2.5">
              <div className="flex items-center gap-3.5 rounded-2xl px-5 py-4 hover:bg-sky-50/80 transition-colors group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <MapPin className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Where to?</p>
                  <input
                    type="text"
                    placeholder="Ella, Sigiriya, Galle..."
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl px-5 py-4 hover:bg-sky-50/80 transition-colors md:border-l md:border-slate-200 group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Calendar className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">When?</p>
                  <input
                    type="text"
                    placeholder="Select Month / Dates"
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl px-5 py-4 hover:bg-sky-50/80 transition-colors md:border-l md:border-slate-200 group">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                  <Users className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Guests</p>
                  <input
                    type="text"
                    placeholder="How many travelers?"
                    className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center p-1.5">
                <Link href="/packages" className="w-full h-full">
                  <Button
                    size="lg"
                    className="w-full h-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-2xl px-9 py-4 font-bold soft-shadow hover:shadow-xl transition-all cursor-pointer"
                  >
                    <Search className="h-5 w-5 mr-2" /> Search
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Social Proof Realtime Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-center gap-3 text-white/90 text-xs shadow-lg"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <p>
              <strong className="text-sky-300">Live booking activity:</strong> Matthew Y. from Australia booked <span className="font-semibold text-white">Southern Coast Bliss Tour</span> 4 mins ago!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Certification Bar */}
      <section className="bg-slate-900 text-slate-400 py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-6 text-xs tracking-wider uppercase font-semibold">
          <span className="text-slate-500">Certified Travel Agency:</span>
          <div className="flex flex-wrap items-center gap-8 md:gap-14">
            <span className="hover:text-white transition-colors flex items-center gap-1.5"><Shield className="h-4.5 w-4.5 text-sky-400" /> SLTDA Registered</span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5"><Award className="h-4.5 w-4.5 text-orange-400" /> TripAdvisor 5-Star rated</span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5"><Globe className="h-4.5 w-4.5 text-emerald-400" /> Safe Tourism Certified</span>
            <span className="hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle className="h-4.5 w-4.5 text-purple-400" /> 100% Local Guides</span>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="relative z-30 px-4 py-16 bg-transparent -mt-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl soft-shadow p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border border-sky-100/50"
          >
            {[
              { value: '15000+', label: 'Happy Travelers', icon: Users, color: 'sky' },
              { value: '250+', label: 'Tour Packages', icon: Globe, color: 'cyan' },
              { value: '50+', label: 'Destinations', icon: MapPin, color: 'orange' },
              { value: '98%', label: 'Positive Reviews', icon: Star, color: 'amber' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6.5 w-6.5 text-sky-600" />
                </div>
                <p className="font-display text-3xl md:text-4xl text-slate-800 mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Tours Section */}
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
                <Sparkles className="h-4 w-4" /> HANDPICKED EXPERIENCES
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-slate-800 leading-tight">
                Our Popular Packages
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-slate-500 max-w-md text-base leading-relaxed">
                Beautifully curated travel schedules with luxury accommodation, transfers, and expert guides.
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeCategory === cat.id
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
              <p className="text-slate-400 text-sm">Please check your backend connection</p>
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium mb-2">No featured packages found</p>
              <p className="text-slate-400 text-sm">Try exploring our other tour categories</p>
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
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={isValidImageUrl(pkg.imageUrl) ? pkg.imageUrl : packageImages[index % packageImages.length]}
                          alt={pkg.name}
                          loading="lazy"
                          decoding="async"
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

                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Badge className="bg-white/95 backdrop-blur-sm text-slate-800 soft-shadow text-xs font-semibold border-0">
                            <Camera className="h-3 w-3 mr-1" /> Verified Tour
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
                            <Users className="h-3.5 w-3.5" /> Max {pkg.maxSeats || 15} Seats
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {pkg.duration} Days
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                          <div>
                            <span className="text-xs text-slate-400">Total Price</span>
                            <div>
                              <span className="text-xl font-display text-slate-800">
                                {formatPrice(pkg.price)}
                              </span>
                              <span className="text-xs text-slate-400 ml-1">/ traveler</span>
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
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-sm font-semibold px-10 py-6 rounded-full soft-shadow hover:shadow-xl transition-all hover:-translate-y-0.5 group cursor-pointer"
              >
                View All Travel Packages
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Signature Travel Experiences Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <Compass className="h-4 w-4" /> SRI LANKAN INSIDER PASSIONS
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-800 mb-4">
              Signature Travel Moments
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Every package is designed to provide immersive, rich highlights that connect you directly with the island's soul.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureExperiences.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={exp.image} alt={exp.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-sky-500 text-white text-[10px] font-semibold border-none px-2.5 py-1">
                      {exp.tag}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-slate-800 text-base mb-2">{exp.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safe Payment Workflow Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background visual shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-50/50 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
                <ShieldCheck className="h-4.5 w-4.5 text-sky-500" /> SECURE RESERVATION WORKFLOW
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-slate-800 mb-6 leading-tight">
                How It Works: Secure Booking & Bank Slip Upload
              </h2>
              <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                To offer the best security and transparency, we utilize Sri Lanka's leading travel agency booking payment method:
              </p>

              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Book Your Dates Online',
                    desc: 'Select your package, fill in your travelers details, and create a booking request without sharing any credit card info.'
                  },
                  {
                    step: '02',
                    title: 'Make a Local/International Bank Transfer',
                    desc: 'Transfer payment safely using our official Bank of Ceylon company account details shown on booking receipt.'
                  },
                  {
                    step: '03',
                    title: 'Upload Bank Transfer Slip Receipt',
                    desc: 'Sign in to your customer dashboard, upload a screenshot/photo of the bank receipt, and save it in your reservation panel.'
                  },
                  {
                    step: '04',
                    title: 'Quick Verification & Confirmation',
                    desc: 'Our administrative finance agents verify the transfer in under 2 hours, instantly updating your booking status to Paid!'
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center font-display font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 border border-sky-100/80 shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> 100% Risk Free
              </div>
              <h3 className="font-display font-bold text-slate-800 text-lg mb-4">Why travelers trust TravelEase LK</h3>
              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex gap-2.5 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Government Licensed:</strong> Registered under the Sri Lanka Tourism Development Authority (SLTDA).</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Safe Vehicles & Drivers:</strong> Certified luxurious AC vehicles with professional tourist drivers.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>24/7 Helpline:</strong> Dedicated personal tour manager available on WhatsApp throughout your journey.</p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <p><strong>Zero Booking Fees:</strong> Clear pricing with all local government hotel and entrance taxes included.</p>
                </div>
              </div>

              <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100 mt-6 text-xs text-sky-800 leading-relaxed flex items-center gap-3">
                <Award className="h-8 w-8 text-sky-600 shrink-0" />
                <span>Winner of the <strong>Lanka Travel Trust & Quality Excellence Award</strong> 2026 for customer-centric holiday plans.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Destinations Section */}
      <section className="py-24 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <MapPin className="h-4 w-4" /> EXPLORE SRI LANKA
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-800">
              Popular Destinations
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              From cold misty mountains of Nuwara Eliya to golden sandy beaches of Galle.
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
              <p className="text-red-500 font-medium">Failed to load destinations list</p>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400">No destinations found in the database</p>
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
                        src={isValidImageUrl(dest.imageUrl) ? dest.imageUrl : destinationImages[index % destinationImages.length]}
                        alt={dest.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-slate-800 soft-shadow text-xs font-semibold border-0">
                          {dest.packageCount || 0} Packages
                        </Badge>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-display text-2xl mb-1 group-hover:text-sky-300 transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-white/80 text-xs mb-3 flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-sky-400" /> {dest.country || 'Sri Lanka'}
                        </p>
                        <div className="flex items-center gap-2 text-sky-300 font-semibold text-xs group-hover:gap-3 transition-all">
                          <span>Explore This Destination</span>
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

      {/* Customer Trust Reviews (Testimonials) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <Heart className="h-4 w-4" /> VERIFIED TESTIMONIALS
            </span>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-slate-800">
              Trusted by Hundreds of Happy Explorers
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
              Read real-life testimonials from guests who toured Sri Lanka with TravelEase LK.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'John Smith',
                role: 'Solo Adventure Traveler',
                text: 'Outstanding experience! Everything from booking to bank transfer verification was smooth. The driver spoke fluent English, knew the best secret viewpoints in Ella, and kept me safe all the time.',
                rating: 5,
                location: 'United Kingdom',
              },
              {
                name: 'Sarah & Mark Johnson',
                role: 'Family Holiday makers',
                text: 'Perfect 12-day vacation with our kids. The hotels chosen were beautiful and family-friendly. Our tour guide made sure we got close views of wild elephants at Udawalawe. Highly recommended!',
                rating: 5,
                location: 'Australia',
              },
              {
                name: 'Michael Brown',
                role: 'Culture & Nature Explorer',
                text: 'The best travel agency I have ever booked with. The payment slip upload tool in the portal is brilliant and got verified within an hour. Excellent value, safe driving, and awesome hotels.',
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
                <div className="p-8 rounded-3xl bg-slate-50 soft-shadow card-hover h-full flex flex-col relative border border-slate-100">
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-sky-100" />

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 mb-6 text-xs leading-relaxed flex-1">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center gap-4 pt-5 border-t border-slate-200">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center text-white text-lg font-display font-bold shrink-0 soft-shadow">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{testimonial.name}</p>
                      <p className="text-[11px] text-slate-400">{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 font-display text-sm text-sky-600 mb-3">
              <HelpCircle className="h-5 w-5 text-sky-500" /> QUESTIONS & ANSWERS
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-slate-800 mb-4">
              Clear Your Doubts
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Read quick answers to frequently asked travel questions before scheduling your journey.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left font-bold text-slate-800 hover:text-sky-600 transition-colors flex justify-between items-center text-sm md:text-base"
                  >
                    <span>{faq.q}</span>
                    <span className="text-sky-500 text-xl font-normal transition-transform duration-300">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call To Action (CTA) Section */}
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
              <span className="text-slate-700 text-sm font-semibold">Start Your Journey Today</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl mb-6 text-slate-800 leading-tight">
              Ready to Explore
              <span className="block gradient-text">Paradise Island?</span>
            </h2>
            <p className="text-base md:text-lg mb-10 text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Reserve your travel itinerary with a Government licensed local agency. Secure your dates, upload payment slip later!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-base font-semibold px-10 py-6 rounded-full soft-shadow hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
                >
                  Book A Tour Package
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-sky-200 text-slate-700 hover:bg-white hover:border-sky-300 text-base font-semibold px-10 py-6 rounded-full transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <Headphones className="h-5 w-5 mr-2" /> Contact Tour Desk
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