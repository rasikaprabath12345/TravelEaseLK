'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  CheckCircle, Sparkles, Facebook, Instagram, Twitter, Globe
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(20, 'Please write at least 20 characters'),
  tourType: z.string().optional(),
});
type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Phone, title: 'Call Us', detail: '+94 11 234 5678', sub: 'Mon–Sat, 8am – 8pm (SLT)', href: 'tel:+94112345678', color: 'sky' },
  { icon: MessageCircle, title: 'WhatsApp', detail: '+94 77 123 4567', sub: 'Quick response guaranteed', href: 'https://wa.me/94771234567', color: 'emerald' },
  { icon: Mail, title: 'Email Us', detail: 'info@traveleaselk.com', sub: 'Reply within 2 hours', href: 'mailto:info@traveleaselk.com', color: 'orange' },
  { icon: MapPin, title: 'Visit Our Office', detail: '42 Galle Road, Colombo 03', sub: 'Sri Lanka — Open Mon–Sat', href: '#', color: 'purple' },
];

const tourTypes = [
  'Cultural Heritage Tour',
  'Wildlife Safari',
  'Beach Holiday',
  'Hill Country Adventure',
  'Honeymoon Package',
  'Family Tour',
  'Corporate Trip',
  'Custom Itinerary',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
    reset();
  };

  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=1200&q=80');

  useEffect(() => {
    const saved = localStorage.getItem('site_contact_cover');
    if (saved) setCoverImage(saved);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center text-white">
        <div className="absolute inset-0 z-0">
          <img src={coverImage} className="w-full h-full object-cover" alt="Contact cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="h-4 w-4 text-orange-400" />
            <span className="text-white/90 text-sm font-medium">We&apos;d love to hear from you</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Let&apos;s Plan Your
            <span className="block bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Perfect Trip
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Our travel experts are ready to craft your dream Sri Lanka itinerary. Reach out — we respond within 2 hours.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative z-10 -mt-10 px-4 pb-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl p-5 border border-sky-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer`}
            >
              <div className={`w-11 h-11 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <item.icon className={`h-5 w-5 text-${item.color}-600`} />
              </div>
              <p className="font-semibold text-slate-800 text-sm mb-0.5">{item.title}</p>
              <p className="text-slate-700 font-medium text-sm">{item.detail}</p>
              <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-sky-100 shadow-xl p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Message Sent!</h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                      Thank you for reaching out. Our travel expert will contact you within 2 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-3 rounded-full"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-slate-800 mb-1">Send Us a Message</h2>
                      <p className="text-slate-500 text-sm">Fill in the form and we&apos;ll get back to you shortly.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Full Name *</label>
                          <Input {...register('name')} placeholder="John Smith" className="rounded-xl border-slate-200 focus:border-sky-400 h-11" />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Email Address *</label>
                          <Input {...register('email')} type="email" placeholder="you@example.com" className="rounded-xl border-slate-200 focus:border-sky-400 h-11" />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Phone Number</label>
                          <Input {...register('phone')} placeholder="+44 7911 123456" className="rounded-xl border-slate-200 focus:border-sky-400 h-11" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Tour Type</label>
                          <select
                            {...register('tourType')}
                            className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:border-sky-400 transition-colors"
                          >
                            <option value="">Select tour type</option>
                            {tourTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Subject *</label>
                        <Input {...register('subject')} placeholder="Inquiry about 7-day Sri Lanka tour" className="rounded-xl border-slate-200 focus:border-sky-400 h-11" />
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Your Message *</label>
                        <textarea
                          {...register('message')}
                          rows={5}
                          placeholder="Tell us about your travel dates, group size, preferences, and any questions you have..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors resize-none"
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg group"
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Message
                            </span>
                          )}
                        </Button>
                        <a
                          href="https://wa.me/94771234567?text=Hi%20TravelEaseLK!%20I'd%20like%20to%20inquire%20about%20a%20tour."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button type="button" className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold transition-all">
                            <MessageCircle className="h-5 w-5" />
                          </Button>
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Right Panel */}
            <div className="lg:col-span-2 space-y-5">
              {/* Office Hours */}
              <div className="bg-white rounded-3xl border border-sky-100 shadow-lg p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-500" /> Office Hours
                </h3>
                <div className="space-y-2.5">
                  {[
                    { day: 'Monday – Friday', hours: '8:00 AM – 8:00 PM' },
                    { day: 'Saturday', hours: '8:00 AM – 6:00 PM' },
                    { day: 'Sunday & Holidays', hours: 'Emergency support only' },
                  ].map(item => (
                    <div key={item.day} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 font-medium">{item.day}</span>
                      <span className="text-slate-800 font-semibold">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-green-700 text-xs font-semibold">We&apos;re currently open — WhatsApp us now!</p>
                </div>
              </div>

              {/* Follow Us */}
              <div className="bg-white rounded-3xl border border-sky-100 shadow-lg p-6">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Follow Our Journey</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Facebook, label: 'Facebook', handle: '@TravelEaseLK', color: 'bg-blue-600' },
                    { icon: Instagram, label: 'Instagram', handle: '@travelease_lk', color: 'bg-gradient-to-br from-pink-500 to-orange-500' },
                    { icon: Twitter, label: 'Twitter', handle: '@TravelEaseLK', color: 'bg-sky-500' },
                    { icon: Globe, label: 'TripAdvisor', handle: '4.9 ★ Rated', color: 'bg-emerald-600' },
                  ].map(soc => (
                    <a
                      key={soc.label}
                      href="#"
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                    >
                      <div className={`w-8 h-8 ${soc.color} rounded-lg flex items-center justify-center shrink-0`}>
                        <soc.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium text-xs">{soc.label}</p>
                        <p className="text-slate-500 text-xs">{soc.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href="https://wa.me/94771234567?text=Hi%20TravelEaseLK!%20I'm%20interested%20in%20booking%20a%20tour."
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl p-5 text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="h-7 w-7" />
                  <div>
                    <p className="font-bold text-lg">Chat on WhatsApp</p>
                    <p className="text-white/80 text-sm">Instant response — fastest way to reach us</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm bg-white/10 rounded-xl px-3 py-2">
                  💬 Tap to start a conversation →
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden">
            <div className="p-5 border-b border-sky-100 flex items-center gap-3">
              <MapPin className="h-5 w-5 text-sky-500" />
              <div>
                <p className="font-semibold text-slate-800">TravelEase LK Head Office</p>
                <p className="text-slate-500 text-sm">42 Galle Road, Colombo 03, Sri Lanka</p>
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7986329384143!2d79.84898!3d6.9105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25977f8b86a91%3A0x2f2b48ead0eb684!2sGalle%20Road%2C%20Colombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TravelEaseLK Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
