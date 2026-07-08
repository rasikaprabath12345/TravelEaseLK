import Link from 'next/link';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Tour Packages' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const popularDests = [
    { href: '/destinations', label: 'Sigiriya Rock Fortress' },
    { href: '/destinations', label: 'Ella & Nine Arch Bridge' },
    { href: '/destinations', label: 'Kandy Temple of Tooth' },
    { href: '/destinations', label: 'Yala National Park' },
    { href: '/destinations', label: 'Mirissa Beach & Whales' },
    { href: '/destinations', label: 'Galle Dutch Fort' },
  ];

  const tourTypes = [
    { href: '/packages', label: 'Cultural Heritage Tours' },
    { href: '/packages', label: 'Wildlife Safaris' },
    { href: '/packages', label: 'Beach & Coastal Escapes' },
    { href: '/packages', label: 'Hill Country Adventures' },
    { href: '/packages', label: 'Honeymoon Packages' },
    { href: '/packages', label: 'Group & Family Tours' },
  ];

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative top gradient border */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-cyan-400 to-orange-400" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Globe className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-bold text-lg text-white leading-none">TravelEase</p>
                <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase font-semibold">Sri Lanka</p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Sri Lanka's most trusted premium travel partner. Crafting extraordinary journeys since 2010 — from ancient kingdoms to pristine beaches.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a href="tel:+94112345678" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm group">
                <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-sky-500/20 transition-colors shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                +94 11 234 5678
              </a>
              <a href="mailto:info@traveleaselk.com" className="flex items-center gap-3 text-slate-400 hover:text-sky-400 transition-colors text-sm group">
                <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-sky-500/20 transition-colors shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                info@traveleaselk.com
              </a>
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span>42 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Facebook, href: '#', hoverColor: 'hover:bg-blue-600' },
                { icon: Instagram, href: '#', hoverColor: 'hover:bg-pink-600' },
                { icon: Twitter, href: '#', hoverColor: 'hover:bg-sky-500' },
                { icon: Youtube, href: '#', hoverColor: 'hover:bg-red-600' },
              ].map(({ icon: Icon, href, hoverColor }) => (
                <a key={href + hoverColor}
                  href={href}
                  className={`w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center ${hoverColor} transition-all hover:scale-110 hover:shadow-lg`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-sky-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-sky-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-orange-500 rounded-full" />
              Top Destinations
            </h3>
            <ul className="space-y-3">
              {popularDests.map((dest) => (
                <li key={dest.label}>
                  <Link href={dest.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-orange-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tour Types */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-cyan-500 rounded-full" />
              Tour Types
            </h3>
            <ul className="space-y-3">
              {tourTypes.map((tour) => (
                <li key={tour.label}>
                  <Link href={tour.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {tour.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-sky-900/60 to-cyan-900/60 border border-sky-800/50 rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-semibold text-lg mb-1">Get exclusive travel deals</h4>
              <p className="text-slate-400 text-sm">Subscribe for early-bird offers and Sri Lanka travel tips.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 bg-slate-800/70 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © {currentYear} TravelEase LK. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> for Sri Lanka
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms</Link>
            <Link href="/sitemap" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}