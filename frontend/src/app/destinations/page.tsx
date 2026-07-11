'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, ArrowRight, Compass, Globe, Waves, Mountain, TreePine, Award, Star } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../../components/ui/badge';
import { useDestinations } from '../../hooks/useDestinations';
import { isValidImageUrl } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const categoryFilters = [
  { id: 'all', label: 'All', icon: Compass },
  { id: 'beach', label: 'Beach', icon: Waves },
  { id: 'cultural', label: 'Cultural', icon: Award },
  { id: 'nature', label: 'Nature', icon: TreePine },
  { id: 'highlands', label: 'Highlands', icon: Mountain },
];

const destinationImages = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
  'https://images.unsplash.com/photo-1597659840994-8c9fb7b82e4a?w=800&q=80',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80',
  'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=800&q=80',
  'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=80',
  'https://images.unsplash.com/photo-1554188572-9d184b57ef3c?w=800&q=80',
  'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&q=80',
  'https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?w=800&q=80',
  'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
];

const staticDestinations = [
  { name: 'Sigiriya', desc: 'Ancient rock fortress — UNESCO Wonder', img: destinationImages[0] },
  { name: 'Ella', desc: 'Misty highlands, Nine Arch Bridge, tea estates', img: destinationImages[1] },
  { name: 'Kandy', desc: 'Cultural capital — Temple of the Tooth', img: destinationImages[2] },
  { name: 'Yala National Park', desc: "World's highest leopard density", img: destinationImages[3] },
  { name: 'Mirissa', desc: 'Whale watching & pristine beach', img: destinationImages[4] },
  { name: 'Galle Fort', desc: 'UNESCO Dutch colonial fortress', img: destinationImages[5] },
  { name: 'Nuwara Eliya', desc: '"Little England" — rolling tea estates', img: destinationImages[6] },
  { name: 'Trincomalee', desc: 'East coast beaches & Pigeon Island snorkeling', img: destinationImages[7] },
  { name: "Adam's Peak", desc: 'Sacred pilgrimage mountain — legendary sunrise', img: destinationImages[8] },
];

const whyVisit = [
  { icon: Globe, title: 'Year-Round Destination', desc: 'Some part of Sri Lanka is always in its best season — plan any time of year.' },
  { icon: Star, title: '8 UNESCO Heritage Sites', desc: 'More UNESCO sites per square km than almost anywhere on earth.' },
  { icon: Waves, title: 'World-Class Beaches', desc: 'From surf breaks to calm turquoise lagoons — some of Asia\'s best coastline.' },
  { icon: TreePine, title: 'Extraordinary Wildlife', desc: 'Leopards, elephants, blue whales, sea turtles — all in one island paradise.' },
];

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: destinationsData, isLoading, error } = useDestinations();
  const apiDestinations = destinationsData?.data || [];

  const showStatic = !isLoading && apiDestinations.length === 0;

  const filtered = apiDestinations.filter((d: any) => {
    const matchSearch = d.name?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  const displayList = showStatic ? staticDestinations : (filtered.length > 0 ? filtered : apiDestinations);

  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80');

  useEffect(() => {
    const saved = localStorage.getItem('site_destinations_cover');
    if (saved) setCoverImage(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0">
          <img src={coverImage} className="w-full h-full object-cover" alt="Destinations cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <MapPin className="h-4 w-4 text-orange-400" />
            <span className="text-white/90 text-sm font-medium">Explore Sri Lanka</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight"
          >
            Discover Every
            <span className="block bg-gradient-to-r from-sky-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Corner of Paradise
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            From ancient rock fortresses to pristine beaches, misty highlands to wild safaris — 
            Sri Lanka packs a lifetime of experiences into one breathtaking island.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations (Sigiriya, Ella, Kandy...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-white/95 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-white border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {whyVisit.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-sky-600 text-sm font-semibold mb-2">
                <Compass className="h-4 w-4" /> ALL DESTINATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                {showStatic ? '10 Iconic Sri Lanka Destinations' : `${displayList.length} Destinations`}
              </h2>
            </div>

            {!showStatic && (
              <div className="flex gap-2 flex-wrap">
                {categoryFilters.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md'
                        : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-100'
                    }`}
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 rounded-3xl bg-sky-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayList.map((dest: any, index: number) => (
                <motion.div
                  key={dest.id || dest.name || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link href={dest.id ? `/packages?destination=${dest.id}` : '/packages'}>
                    <div className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                      <img
                        src={isValidImageUrl(dest.imageUrl) ? dest.imageUrl : (isValidImageUrl(dest.img) ? dest.img : destinationImages[index % destinationImages.length])}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <Badge className="bg-white/95 text-slate-800 text-xs font-bold border-0 shadow">
                          Sri Lanka
                        </Badge>
                        {dest.packageCount !== undefined && (
                          <Badge className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold border-0 shadow">
                            {dest.packageCount} Tours
                          </Badge>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="font-bold text-2xl mb-1.5 group-hover:text-sky-300 transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                          {dest.desc || dest.shortDescription || dest.description?.slice(0, 90) + '...'}
                        </p>
                        <div className="flex items-center gap-2 text-sky-300 font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Explore Tours</span>
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
      <Footer />
    </div>
  );
}