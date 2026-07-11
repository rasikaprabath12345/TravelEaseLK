'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Award, Users, Globe, Shield, Star, Heart, ChevronRight, MapPin,
  Clock, CheckCircle, Sparkles, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const stats = [
  { value: '15,000+', label: 'Happy Travelers', icon: Users, color: 'sky' },
  { value: '14+', label: 'Years of Excellence', icon: Award, color: 'orange' },
  { value: '50+', label: 'Destinations', icon: MapPin, color: 'cyan' },
  { value: '98%', label: 'Satisfaction Rate', icon: Star, color: 'amber' },
];

const team = [
  {
    name: 'Prabhath Kumara',
    role: 'Founder & CEO',
    desc: '20 years in Sri Lanka tourism. Founded TravelEaseLK in 2010 with a vision to redefine premium travel in Sri Lanka.',
    initials: 'PK',
    gradient: 'from-sky-500 to-cyan-500',
  },
  {
    name: 'Nilantha Jayasuriya',
    role: 'Head of Operations',
    desc: 'Expert in logistics and tour operations. Ensures every itinerary runs flawlessly from start to finish.',
    initials: 'NJ',
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Sanduni Perera',
    role: 'Customer Experience Lead',
    desc: 'Dedicated to creating unforgettable personal experiences. Speaks 4 languages and loves connecting travelers with Sri Lanka.',
    initials: 'SP',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Chaminda Rathnayake',
    role: 'Chief Tour Guide',
    desc: 'Certified national guide with 12 years of experience. Expert in wildlife, history, and cultural heritage.',
    initials: 'CR',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const values = [
  { icon: Heart, title: 'Passion for Sri Lanka', desc: 'We love our island deeply and share that passion through every tour we craft.', color: 'text-red-500 bg-red-50' },
  { icon: Shield, title: 'Trust & Transparency', desc: 'No hidden charges. Full transparency in pricing, itineraries, and communication.', color: 'text-sky-600 bg-sky-50' },
  { icon: Star, title: 'Excellence in Service', desc: 'From first inquiry to final farewell, we deliver five-star hospitality at every step.', color: 'text-amber-600 bg-amber-50' },
  { icon: Globe, title: 'Sustainable Tourism', desc: 'We support local communities and promote responsible, eco-friendly travel practices.', color: 'text-emerald-600 bg-emerald-50' },
];

const milestones = [
  { year: '2010', title: 'Founded', desc: 'TravelEaseLK was established in Colombo with a team of 3 passionate travel experts.' },
  { year: '2013', title: '1,000 Travelers', desc: 'Reached our first milestone of 1,000 satisfied international travelers.' },
  { year: '2016', title: 'Award Winner', desc: 'Won the Sri Lanka Tourism Board\'s "Best Emerging Tour Operator" award.' },
  { year: '2019', title: 'Major Expansion', desc: 'Expanded to 50+ destinations and launched our premium honeymoon packages.' },
  { year: '2022', title: 'Digital Platform', desc: 'Launched our fully integrated online booking platform and mobile experience.' },
  { year: '2026', title: '15,000+ Travelers', desc: 'Today we serve travelers from 60+ countries with a 98% satisfaction rate.' },
];

export default function AboutPage() {
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80');

  useEffect(() => {
    const saved = localStorage.getItem('site_about_cover');
    if (saved) setCoverImage(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0">
          <img src={coverImage} className="w-full h-full object-cover" alt="About cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-white/90 text-sm font-medium">About TravelEase LK</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Crafting Extraordinary
            <span className="block bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Sri Lanka Journeys
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Since 2010, TravelEaseLK has been Sri Lanka's most trusted premium travel partner — connecting
            thousands of travelers from across the globe with the island's extraordinary beauty, culture, and warmth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/packages">
              <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-6 rounded-full text-base font-semibold hover:-translate-y-0.5 transition-all shadow-lg shadow-sky-500/25 group">
                Explore Our Tours
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 px-8 py-6 rounded-full text-base font-semibold transition-all">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-white border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-14 h-14 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`h-7 w-7 text-${stat.color}-600`} />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-sky-600 text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" /> OUR STORY
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Born from a Love of Sri Lanka
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  TravelEaseLK was founded in 2010 by Prabhath Kumara, a Sri Lankan born and raised among the island's 
                  ancient temples, misty highlands, and turquoise beaches. After years of guiding international visitors, 
                  Prabhath realized that travelers deserved more than cookie-cutter tours.
                </p>
                <p>
                  He assembled a small team of passionate locals who knew every hidden waterfall, every atmospheric colonial 
                  café, and every family-run spice garden. Together, they began crafting truly personalized experiences 
                  that connected visitors with the real soul of Sri Lanka.
                </p>
                <p>
                  Today, TravelEaseLK has grown to serve over 15,000 travelers from 60+ countries, maintaining the same 
                  personal touch and passion for excellence that started it all. We remain proudly Sri Lankan — and deeply 
                  committed to showcasing the Pearl of the Indian Ocean at its finest.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                {['Certified Tour Operator', 'SLTDA Registered', 'IATA Member'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-1.5">
                    <CheckCircle className="h-4 w-4 text-sky-600" />
                    <span className="text-sky-700 text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Milestone Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {m.year}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{m.title}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-sky-600 text-sm font-semibold mb-3">
              <Shield className="h-4 w-4" /> OUR VALUES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The principles that guide every tour, every interaction, every experience we create.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-sky-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group bg-white"
              >
                <div className={`w-14 h-14 ${val.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <val.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">{val.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 text-sky-600 text-sm font-semibold mb-3">
              <Users className="h-4 w-4" /> THE TEAM
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The People Behind the Magic</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Passionate locals who live and breathe Sri Lanka travel.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white rounded-3xl p-8 border border-sky-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-slate-800 text-lg">{member.name}</h3>
                <p className="text-sky-600 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Explore Sri Lanka?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Let our team craft your perfect itinerary. We're here to make your Sri Lanka dream a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button className="bg-white text-sky-700 hover:bg-sky-50 px-8 py-6 rounded-full text-base font-bold hover:-translate-y-0.5 transition-all shadow-xl group">
                  Browse Packages
                  <ChevronRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 rounded-full text-base font-bold transition-all">
                  Contact Our Team
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
