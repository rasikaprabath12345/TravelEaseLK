'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Star, Shield, Award, Headphones, ArrowUpRight, Compass } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useFeaturedPackages } from '@/hooks/usePackages';
import { useDestinations } from '@/hooks/useDestinations';
import { formatPrice } from '@/lib/utils';

export default function HomePage() {
  const { data: packagesData } = useFeaturedPackages();
  const { data: destinationsData } = useDestinations();

  const featuredPackages = packagesData?.data || [];
  const destinations = destinationsData?.data || [];

  return (
    <div className="min-h-screen bg-[#F6EFE4] text-[#14201C]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F3D39] pt-28 pb-40 md:pt-36 md:pb-52">
        {/* faint dotted route line, signature motif */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
        >
          <path
            d="M -50 650 C 250 500, 450 700, 700 480 S 1150 250, 1500 150"
            fill="none"
            stroke="#C79A45"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-8">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center lg:col-span-6"
          >
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#C79A45]/40 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#E8D5A8]">
              <Compass className="h-3.5 w-3.5" />
              Ceylon, curated
            </span>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[#F6EFE4] md:text-6xl lg:text-7xl">
              Journeys written
              <br />
              <span className="italic text-[#C79A45]">across the island.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg text-[#CFE0DC]">
              From misted tea country to sun-warmed coastline — TravelEase LK
              designs private itineraries around the moments Sri Lanka is
              known for.
            </p>

            <div className="mt-8 flex items-center gap-8 text-[#CFE0DC]">
              <div>
                <p className="font-serif text-3xl text-[#F6EFE4]">18+</p>
                <p className="text-xs uppercase tracking-widest text-[#8FADA6]">years guiding</p>
              </div>
              <div className="h-10 w-px bg-[#2A5852]" />
              <div>
                <p className="font-serif text-3xl text-[#F6EFE4]">4.9</p>
                <p className="text-xs uppercase tracking-widest text-[#8FADA6]">traveler rating</p>
              </div>
              <div className="h-10 w-px bg-[#2A5852]" />
              <div>
                <p className="font-serif text-3xl text-[#F6EFE4]">40+</p>
                <p className="text-xs uppercase tracking-widest text-[#8FADA6]">routes mapped</p>
              </div>
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative lg:col-span-6"
          >
            <div className="relative ml-auto h-[380px] w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl md:h-[440px]">
              <img
                src="https://images.unsplash.com/photo-1546708973-b339540b5162?w=1000&q=80"
                alt="Tea plantations, Sri Lanka"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -left-6 -bottom-10 h-52 w-44 overflow-hidden rounded-2xl border-4 border-[#F6EFE4] shadow-2xl md:-left-10 md:h-60 md:w-52">
              <img
                src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=700&q=80"
                alt="Coastal stilt fishing, Sri Lanka"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search bar — overlaps hero/section seam */}
      <section className="relative z-20 -mt-16 px-6 md:-mt-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-5xl rounded-2xl border border-[#E4D6BC] bg-white p-3 shadow-xl md:p-4"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.3fr_1fr_0.9fr_auto]">
            <div className="flex items-center gap-3 rounded-xl border border-[#EEE4CF] bg-[#FBF7EF] px-4 py-3">
              <MapPin className="h-5 w-5 shrink-0 text-[#A85C32]" />
              <input
                type="text"
                placeholder="Where to — Ella, Galle, Sigiriya..."
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#9A9184]"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#EEE4CF] bg-[#FBF7EF] px-4 py-3">
              <Calendar className="h-5 w-5 shrink-0 text-[#A85C32]" />
              <input
                type="text"
                placeholder="When"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#9A9184]"
              />
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#EEE4CF] bg-[#FBF7EF] px-4 py-3">
              <Users className="h-5 w-5 shrink-0 text-[#A85C32]" />
              <input
                type="text"
                placeholder="Travelers"
                className="w-full border-none bg-transparent text-sm outline-none placeholder:text-[#9A9184]"
              />
            </div>
            <Link href="/packages" className="md:w-auto">
              <Button
                size="lg"
                className="h-full w-full bg-[#0F3D39] px-6 text-[#F6EFE4] hover:bg-[#0C302D]"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Featured Packages */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row"
          >
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#A85C32]">
                Featured itineraries
              </p>
              <h2 className="font-serif text-4xl tracking-tight text-[#14201C] md:text-5xl">
                Packages worth <span className="italic text-[#0F3D39]">planning around</span>
              </h2>
            </div>
            <Link href="/packages" className="shrink-0">
              <span className="inline-flex items-center gap-1.5 border-b border-[#14201C] pb-1 text-sm font-medium">
                View all packages
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredPackages.slice(0, 8).map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link href={`/packages/${pkg.id}`}>
                  <Card className="group cursor-pointer overflow-hidden rounded-2xl border-[#EEE4CF] bg-white transition-shadow duration-300 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={pkg.imageUrl || 'https://images.unsplash.com/photo-1586183189334-1e2b1f5a1e0d?w=800&q=80'}
                        alt={pkg.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* passport-stamp style rating badge */}
                      <div className="absolute right-3 top-3 flex h-11 w-11 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/80 bg-[#14201C]/70 text-white backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-[#C79A45] text-[#C79A45]" />
                        <span className="text-[11px] font-semibold leading-none">{pkg.averageRating.toFixed(1)}</span>
                      </div>
                      {pkg.isFeatured && (
                        <span className="absolute left-3 top-3 rounded-full bg-[#C79A45] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#14201C]">
                          Featured
                        </span>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="mb-2 flex items-center text-xs uppercase tracking-wide text-[#9A9184]">
                        <MapPin className="mr-1 h-3.5 w-3.5" />
                        {pkg.destinationName}
                      </div>
                      <h3 className="mb-3 line-clamp-1 font-serif text-lg text-[#14201C]">{pkg.name}</h3>
                      <div className="flex items-center justify-between border-t border-[#F1E9D8] pt-3">
                        <div>
                          <span className="text-xl font-semibold text-[#0F3D39]">{formatPrice(pkg.price)}</span>
                          <span className="ml-1 text-xs text-[#9A9184]">/ person</span>
                        </div>
                        <span className="text-xs text-[#9A9184]">{pkg.duration} days</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-[#0F3D39] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#C79A45]">
              Where travelers go
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-[#F6EFE4] md:text-5xl">
              Six corners of the island
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 6).map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link href={`/destinations/${dest.id}`}>
                  <div className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl">
                    <img
                      src={dest.imageUrl || 'https://images.unsplash.com/photo-1546708973-b339540b5162?w=800&q=80'}
                      alt={dest.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14201C] via-[#14201C]/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-[#F6EFE4]">
                      <h3 className="font-serif text-2xl">{dest.name}</h3>
                      <p className="text-sm text-[#CFE0DC]">{dest.country}</p>
                      <p className="mt-2 text-xs uppercase tracking-wide text-[#8FADA6]">
                        {dest.packageCount} packages available
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#A85C32]">
              The difference
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-[#14201C] md:text-5xl">
              Why travelers choose TravelEase LK
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: 'Local guides', desc: 'Guides who grew up on the routes they lead you through.' },
              { icon: Shield, title: 'Transparent pricing', desc: 'One quote, no hidden add-ons at checkout.' },
              { icon: Star, title: 'Vetted stays', desc: 'Every property inspected before it enters an itinerary.' },
              { icon: Headphones, title: 'On-call support', desc: 'A real person reachable throughout your trip.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="rounded-2xl border border-[#EEE4CF] bg-white p-7 transition-shadow hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F3D39]">
                    <item.icon className="h-5 w-5 text-[#C79A45]" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg text-[#14201C]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6B6459]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#FBF7EF] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#A85C32]">
              Traveler notes
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-[#14201C] md:text-5xl">
              What they came back saying
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { name: 'John Smith', role: 'Adventure traveler', text: 'The route through the hill country felt hand-built for us, not copied from a brochure.', rating: 5 },
              { name: 'Sarah Johnson', role: 'Family traveler', text: 'Every logistical detail was handled before we even thought to ask about it.', rating: 5 },
              { name: 'Michael Brown', role: 'Solo traveler', text: 'Fair pricing, sharp communication, and guides who actually know the terrain.', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <div className="h-full rounded-2xl border border-[#EEE4CF] bg-white p-7">
                  <span className="mb-4 block font-serif text-5xl leading-none text-[#E4D6BC]">&ldquo;</span>
                  <p className="mb-6 text-[#3B362F]">{testimonial.text}</p>
                  <div className="flex items-center justify-between border-t border-[#F1E9D8] pt-4">
                    <div>
                      <p className="font-medium text-[#14201C]">{testimonial.name}</p>
                      <p className="text-xs text-[#9A9184]">{testimonial.role}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#C79A45] text-[#C79A45]" />
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
      <section className="relative overflow-hidden bg-[#0F3D39] py-24">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 400"
        >
          <path
            d="M -50 320 C 300 150, 600 380, 900 200 S 1300 60, 1500 20"
            fill="none"
            stroke="#C79A45"
            strokeWidth="2"
            strokeDasharray="2 14"
          />
        </svg>
        <div className="relative mx-auto max-w-3xl px-6 text-center text-[#F6EFE4]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
              Ready to draw your route?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[#CFE0DC]">
              Tell us your dates and interests — we'll shape an itinerary
              around them, not the other way around.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/packages">
                <Button size="xl" className="bg-[#C79A45] text-[#14201C] hover:bg-[#B98A34]">
                  Browse packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="ghost" className="border-2 border-[#F6EFE4]/50 text-[#F6EFE4] hover:bg-white/10">
                  Talk to a planner
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