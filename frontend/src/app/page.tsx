'use client';

import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { data: destinationsData, isLoading: destLoading, error: destError } = useDestinations();

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  return (
    <div className="font-body bg-white">
      {/* Typography + color tokens, scoped to this page */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        :root {
          --tl-navy: #16232e;
          --tl-ocean: #0e6ba8;
          --tl-ocean-dark: #0a4e7d;
          --tl-coral: #ff7a50;
          --tl-coral-dark: #e85d34;
          --tl-bg-soft: #f5f9fb;
        }
        .font-display {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--tl-navy)]/80 via-[var(--tl-navy)]/55 to-[var(--tl-navy)]/85 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block font-display font-semibold text-xs md:text-sm tracking-[0.2em] text-[var(--tl-coral)] mb-5"
          >
            SRI LANKA · PREMIUM TOURS
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-extrabold text-4xl md:text-6xl text-white mb-6 leading-tight"
          >
            Discover Your Next
            <span className="block text-[var(--tl-coral)]">Adventure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-base md:text-lg mb-10 text-white/80 max-w-xl mx-auto"
          >
            Curated tours across Sri Lanka's beaches, hill country and ancient cities —
            planned to the last detail, so you don't have to.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl p-3 shadow-2xl max-w-3xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-2">
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[var(--tl-bg-soft)] transition-colors">
                <MapPin className="h-5 w-5 text-[var(--tl-ocean)] shrink-0" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-body"
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[var(--tl-bg-soft)] transition-colors md:border-l md:border-gray-100">
                <Calendar className="h-5 w-5 text-[var(--tl-ocean)] shrink-0" />
                <input
                  type="text"
                  placeholder="When?"
                  className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-body"
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-[var(--tl-bg-soft)] transition-colors md:border-l md:border-gray-100">
                <Users className="h-5 w-5 text-[var(--tl-ocean)] shrink-0" />
                <input
                  type="text"
                  placeholder="Guests"
                  className="bg-transparent border-none outline-none text-[var(--tl-navy)] placeholder-[var(--tl-navy)]/40 w-full text-sm font-body"
                />
              </div>
              <Link href="/packages">
                <Button
                  size="lg"
                  className="w-full h-full text-sm font-semibold bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white rounded-xl px-8"
                >
                  <Search className="h-4 w-4 mr-2" /> Search
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
          >
            <div>
              <span className="font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)]">
                FEATURED TOURS
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2 text-[var(--tl-navy)]">
                Popular Packages
              </h2>
            </div>
            <p className="text-gray-500 max-w-md text-sm md:text-base">
              Handpicked travel experiences for unforgettable memories
            </p>
          </motion.div>

          {packagesLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--tl-ocean)]"></div>
            </div>
          ) : packagesError ? (
            <p className="text-center text-red-500 py-10">Failed to load packages. Please try again later.</p>
          ) : featuredPackages.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No packages found at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPackages.slice(0, 8).map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-white text-[var(--tl-navy)] shadow-sm text-xs font-semibold">
                            <Star className="h-3 w-3 mr-1 fill-[var(--tl-coral)] text-[var(--tl-coral)]" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>
                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-[var(--tl-coral)] text-white border-none text-[10px] font-semibold tracking-wide">
                              FEATURED
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-xs text-[var(--tl-ocean)] font-semibold mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {pkg.destinationName || 'Sri Lanka'}
                        </div>
                        <h3 className="font-display font-bold text-lg mb-3 line-clamp-1 text-[var(--tl-navy)]">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div>
                            <span className="text-xl font-display font-extrabold text-[var(--tl-navy)]">
                              {formatPrice(pkg.price)}
                            </span>
                            <span className="text-xs text-gray-400 ml-1">/ person</span>
                          </div>
                          <span className="text-xs font-medium text-gray-500 bg-[var(--tl-bg-soft)] px-2.5 py-1 rounded-full">
                            {pkg.duration} Days
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button
                size="lg"
                variant="outline"
                className="text-sm font-semibold border-gray-200 text-[var(--tl-navy)] hover:bg-[var(--tl-navy)] hover:text-white rounded-full px-8"
              >
                View All Packages <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-[var(--tl-bg-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)]">
              TOP DESTINATIONS
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2 mb-3 text-[var(--tl-navy)]">
              Explore Destinations
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Discover the most beautiful places around the island
            </p>
          </motion.div>

          {destLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--tl-ocean)]"></div>
            </div>
          ) : destError ? (
            <p className="text-center text-red-500 py-10">Failed to load destinations.</p>
          ) : destinations.length === 0 ? (
            <p className="text-center text-gray-400 py-10">No destinations found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.slice(0, 6).map((dest: any, index: number) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link href={`/destinations/${dest.id}`}>
                    <div className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                      <img
                        src={dest.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tl-navy)]/90 via-[var(--tl-navy)]/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <h3 className="font-display font-bold text-xl mb-1">{dest.name}</h3>
                        <p className="text-white/70 text-sm mb-1">{dest.country || 'Sri Lanka'}</p>
                        <p className="text-sm text-[var(--tl-coral)] font-medium flex items-center gap-1">
                          {dest.packageCount || 0} packages available
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </p>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)]">
              WHY TRAVELEASE LK
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2 mb-3 text-[var(--tl-navy)]">
              Built On Trust
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              We provide the best travel experiences with premium service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Experienced Guides', desc: 'Professional and knowledgeable tour guides' },
              { icon: Shield, title: 'Best Prices', desc: 'Competitive pricing with no hidden charges' },
              { icon: Star, title: 'Safe Travel', desc: 'Your safety is our top priority, always' },
              { icon: Headphones, title: '24/7 Support', desc: 'Round the clock customer support' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all h-full">
                  <div className="w-14 h-14 bg-[var(--tl-bg-soft)] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-[var(--tl-ocean)]" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-2 text-[var(--tl-navy)]">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[var(--tl-bg-soft)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="font-display font-semibold text-xs tracking-[0.2em] text-[var(--tl-coral)]">
              TESTIMONIALS
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-2 text-[var(--tl-navy)]">
              What Our Travelers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'John Smith', role: 'Adventure Traveler', text: 'Amazing experience! The tour was well organized and the guides were fantastic.', rating: 5 },
              { name: 'Sarah Johnson', role: 'Family Traveler', text: 'Perfect family vacation. Everything was taken care of. Highly recommended!', rating: 5 },
              { name: 'Michael Brown', role: 'Solo Traveler', text: 'Best travel agency I have ever used. Professional service and great value.', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="p-6 rounded-2xl bg-white shadow-sm h-full flex flex-col">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--tl-coral)] text-[var(--tl-coral)]" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-5 text-sm flex-1">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--tl-ocean)] to-[var(--tl-coral)] flex items-center justify-center text-white text-sm font-display font-bold shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--tl-navy)] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--tl-ocean-dark)] to-[var(--tl-ocean)] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-5 text-white">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-base md:text-lg mb-8 text-white/80">
              Book your dream vacation today and create memories that last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white text-sm font-semibold px-8 rounded-full"
                >
                  Browse Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-2 border-white/40 hover:bg-white/10 text-sm font-semibold px-8 rounded-full"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}