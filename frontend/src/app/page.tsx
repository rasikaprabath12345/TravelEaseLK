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
  Plane,
  Quote,
  Compass,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';

// Route-code helper — turns a destination name into a boarding-pass style code, e.g. "Ella" -> "ELA"
function routeCode(name?: string) {
  return (name || 'CMB').replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase() || 'CMB';
}

export default function HomePage() {
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useFeaturedPackages();
  const { data: destinationsData, isLoading: destLoading, error: destError } = useDestinations();

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  return (
    <div className="min-h-screen font-body bg-[#F3ECDA]">
      {/* Design tokens + typography, scoped to this page */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        :root {
          --tl-ink: #12211d;
          --tl-canvas: #f3ecda;
          --tl-teal: #0b5c55;
          --tl-teal-dark: #072f2b;
          --tl-gold: #c89b3d;
          --tl-rust: #9c4a2e;
          --tl-paper: #fffbf2;
        }
        .font-display {
          font-family: 'Fraunces', serif;
        }
        .font-body {
          font-family: 'Work Sans', sans-serif;
        }
        .font-mono-tl {
          font-family: 'IBM Plex Mono', monospace;
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--tl-ink)]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80&crop=entropy')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#072F2B]/95 via-[#0B5C55]/75 to-[#12211D]/90 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 font-mono-tl text-[11px] md:text-xs tracking-[0.25em] text-[var(--tl-gold)] border border-[var(--tl-gold)]/40 rounded-full px-4 py-1.5 mb-8"
          >
            <Compass className="h-3.5 w-3.5" />
            6°56′N&nbsp;79°51′E — COLOMBO, SRI LANKA
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="font-display font-medium text-5xl md:text-7xl text-[var(--tl-paper)] mb-6 leading-[1.05]"
          >
            Journeys Written In
            <span className="block italic bg-gradient-to-r from-[var(--tl-gold)] to-[#e8c874] bg-clip-text text-transparent">
              Ceylon Gold &amp; Ocean Blue
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl mb-10 text-[var(--tl-paper)]/80 max-w-2xl mx-auto"
          >
            Hand-crafted itineraries through ancient cities, misty tea country and untouched
            coastline — guided by locals who know every turn.
          </motion.p>

          {/* Search Box — boarding-pass strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="bg-[var(--tl-paper)] rounded-2xl p-2 shadow-2xl max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-stretch">
              <div className="flex flex-col justify-center px-5 py-3 md:border-r md:border-dashed md:border-[var(--tl-ink)]/15">
                <span className="font-mono-tl text-[10px] tracking-[0.2em] text-[var(--tl-teal)] mb-1">
                  DESTINATION
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--tl-gold)] shrink-0" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="bg-transparent border-none outline-none text-[var(--tl-ink)] placeholder-[var(--tl-ink)]/40 w-full font-body"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-5 py-3 md:border-r md:border-dashed md:border-[var(--tl-ink)]/15">
                <span className="font-mono-tl text-[10px] tracking-[0.2em] text-[var(--tl-teal)] mb-1">
                  DEPART
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--tl-gold)] shrink-0" />
                  <input
                    type="text"
                    placeholder="When?"
                    className="bg-transparent border-none outline-none text-[var(--tl-ink)] placeholder-[var(--tl-ink)]/40 w-full font-body"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center px-5 py-3">
                <span className="font-mono-tl text-[10px] tracking-[0.2em] text-[var(--tl-teal)] mb-1">
                  TRAVELLERS
                </span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-[var(--tl-gold)] shrink-0" />
                  <input
                    type="text"
                    placeholder="Guests"
                    className="bg-transparent border-none outline-none text-[var(--tl-ink)] placeholder-[var(--tl-ink)]/40 w-full font-body"
                  />
                </div>
              </div>
              <Link href="/packages" className="md:m-1">
                <Button
                  size="lg"
                  className="w-full h-full text-base bg-[var(--tl-teal)] hover:bg-[var(--tl-teal-dark)] text-[var(--tl-paper)] rounded-xl px-8"
                >
                  <Search className="h-5 w-5 mr-2" /> Search
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-[var(--tl-paper)]/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[var(--tl-gold)] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Featured Packages Section — boarding-pass ticket cards */}
      <section className="py-24 bg-[var(--tl-canvas)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-mono-tl text-xs tracking-[0.25em] text-[var(--tl-teal)]">
              FEATURED ITINERARIES
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl mt-3 mb-4 text-[var(--tl-ink)]">
              Popular <span className="italic text-[var(--tl-teal)]">Routes</span>
            </h2>
            <p className="text-[var(--tl-ink)]/60 text-lg max-w-2xl mx-auto">
              Every itinerary below is a ticket to somewhere unforgettable
            </p>
          </motion.div>

          {packagesLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--tl-teal)]"></div>
            </div>
          ) : packagesError ? (
            <p className="text-center text-[var(--tl-rust)] py-10">
              Failed to load packages. Please try again later.
            </p>
          ) : featuredPackages.length === 0 ? (
            <p className="text-center text-[var(--tl-ink)]/50 py-10">No packages found at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredPackages.slice(0, 8).map((pkg: any, index: number) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/packages/${pkg.id}`}>
                    <div className="group cursor-pointer bg-[var(--tl-paper)] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={pkg.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[var(--tl-paper)]/95 text-[var(--tl-ink)] font-mono-tl text-xs">
                            <Star className="h-3 w-3 mr-1 fill-[var(--tl-gold)] text-[var(--tl-gold)]" />
                            {pkg.averageRating ? pkg.averageRating.toFixed(1) : '5.0'}
                          </Badge>
                        </div>
                        {pkg.isFeatured && (
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-[var(--tl-gold)] text-[var(--tl-ink)] border-none font-mono-tl text-[10px] tracking-wide">
                              FEATURED
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Perforated ticket seam */}
                      <div className="relative">
                        <div className="absolute -left-3 top-0 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--tl-canvas)]" />
                        <div className="absolute -right-3 top-0 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--tl-canvas)]" />
                        <div className="border-t-2 border-dashed border-[var(--tl-ink)]/15 mx-4" />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between font-mono-tl text-[11px] tracking-[0.15em] text-[var(--tl-teal)] mb-3">
                          <span>CMB → {routeCode(pkg.destinationName)}</span>
                          <span className="flex items-center gap-1 text-[var(--tl-ink)]/50">
                            <MapPin className="h-3 w-3" />
                            {pkg.destinationName || 'Sri Lanka'}
                          </span>
                        </div>
                        <h3 className="font-display font-medium text-xl mb-3 line-clamp-1 text-[var(--tl-ink)]">
                          {pkg.name}
                        </h3>
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--tl-ink)]/10">
                          <div>
                            <span className="text-2xl font-display font-semibold text-[var(--tl-rust)]">
                              {formatPrice(pkg.price)}
                            </span>
                            <span className="text-xs text-[var(--tl-ink)]/50 ml-1">/ person</span>
                          </div>
                          <div className="font-mono-tl text-xs text-[var(--tl-ink)]/60">
                            {String(pkg.duration).padStart(2, '0')}D / {String(Math.max(pkg.duration - 1, 0)).padStart(2, '0')}N
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
                variant="outline"
                className="text-base border-[var(--tl-ink)]/20 text-[var(--tl-ink)] hover:bg-[var(--tl-ink)] hover:text-[var(--tl-paper)] rounded-full px-8"
              >
                View All Packages <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-[var(--tl-paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-mono-tl text-xs tracking-[0.25em] text-[var(--tl-teal)]">
              WHERE TO NEXT
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl mt-3 mb-4 text-[var(--tl-ink)]">
              Explore <span className="italic text-[var(--tl-teal)]">Destinations</span>
            </h2>
            <p className="text-[var(--tl-ink)]/60 text-lg max-w-2xl mx-auto">
              From ancient citadels to eight-mile stretches of empty sand
            </p>
          </motion.div>

          {destLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--tl-teal)]"></div>
            </div>
          ) : destError ? (
            <p className="text-center text-[var(--tl-rust)] py-10">Failed to load destinations.</p>
          ) : destinations.length === 0 ? (
            <p className="text-center text-[var(--tl-ink)]/50 py-10">No destinations found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.slice(0, 6).map((dest: any, index: number) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link href={`/destinations/${dest.id}`}>
                    <div className="relative h-72 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                      <img
                        src={dest.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tl-ink)]/90 via-[var(--tl-ink)]/10 to-transparent" />
                      <div className="absolute top-4 left-4 font-mono-tl text-[10px] tracking-[0.2em] text-[var(--tl-paper)]/80 bg-[var(--tl-ink)]/30 backdrop-blur-sm rounded-full px-3 py-1">
                        {routeCode(dest.name)}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-[var(--tl-paper)]">
                        <h3 className="font-display font-medium text-2xl mb-1">{dest.name}</h3>
                        <p className="text-[var(--tl-paper)]/70 text-sm mb-2">{dest.country || 'Sri Lanka'}</p>
                        <p className="font-mono-tl text-xs text-[var(--tl-gold)] flex items-center gap-1">
                          {dest.packageCount || 0} ROUTES AVAILABLE
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
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

      {/* Why Choose Us — contrast band */}
      <section className="py-24 bg-[var(--tl-teal-dark)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-mono-tl text-xs tracking-[0.25em] text-[var(--tl-gold)]">
              THE TRAVELEASE DIFFERENCE
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl mt-3 mb-4 text-[var(--tl-paper)]">
              Why Choose <span className="italic text-[var(--tl-gold)]">TravelEase LK</span>
            </h2>
            <p className="text-[var(--tl-paper)]/60 text-lg max-w-2xl mx-auto">
              Premium service, at every mile of the journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Expert Local Guides', desc: 'Professional, licensed guides who know every backroad' },
              { icon: Shield, title: 'Honest Pricing', desc: 'Transparent rates with absolutely no hidden charges' },
              { icon: Star, title: 'Safety First', desc: 'Vetted operators and 24-hour on-ground support' },
              { icon: Headphones, title: 'Always Reachable', desc: 'Round-the-clock support before, during and after' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="text-center p-6 rounded-2xl hover:bg-[var(--tl-paper)]/5 transition-all">
                  <div className="w-16 h-16 rounded-full border border-[var(--tl-gold)]/40 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-7 w-7 text-[var(--tl-gold)]" />
                  </div>
                  <h3 className="font-display text-xl mb-2 text-[var(--tl-paper)]">{item.title}</h3>
                  <p className="text-[var(--tl-paper)]/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[var(--tl-paper)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-mono-tl text-xs tracking-[0.25em] text-[var(--tl-teal)]">
              TRAVELLER LOG
            </span>
            <h2 className="font-display font-medium text-4xl md:text-5xl mt-3 text-[var(--tl-ink)]">
              What Our <span className="italic text-[var(--tl-teal)]">Travelers Say</span>
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="p-8 rounded-2xl bg-[var(--tl-canvas)] h-full flex flex-col">
                  <Quote className="h-7 w-7 text-[var(--tl-gold)] mb-4" />
                  <p className="font-display italic text-lg text-[var(--tl-ink)]/80 mb-6 flex-1">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--tl-ink)]/10">
                    <div>
                      <p className="font-semibold text-[var(--tl-ink)] text-sm">{testimonial.name}</p>
                      <p className="text-xs text-[var(--tl-ink)]/50 font-mono-tl tracking-wide">
                        {testimonial.role.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[var(--tl-gold)] text-[var(--tl-gold)]" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[var(--tl-teal-dark)] to-[var(--tl-ink)] relative overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <path
            d="M0,200 C300,50 500,350 800,150 C950,60 1050,240 1200,120"
            fill="none"
            stroke="var(--tl-gold)"
            strokeWidth="2"
            strokeDasharray="8 10"
          />
        </svg>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Plane className="h-8 w-8 text-[var(--tl-gold)] mx-auto mb-6" />
            <h2 className="font-display font-medium text-4xl md:text-5xl mb-6 text-[var(--tl-paper)]">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-10 text-[var(--tl-paper)]/70">
              Book your dream vacation today and create memories that last a lifetime
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button
                  size="lg"
                  className="bg-[var(--tl-gold)] text-[var(--tl-ink)] hover:bg-[#dcb254] text-base px-8 rounded-full font-semibold"
                >
                  Browse Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-[var(--tl-paper)] border-2 border-[var(--tl-paper)]/40 hover:bg-[var(--tl-paper)]/10 text-base px-8 rounded-full"
                >
                  Contact Us
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