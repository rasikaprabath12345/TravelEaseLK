'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, User, ChevronDown, X, Globe, LogOut,
  Bell, Heart, Settings, Shield, Compass, Briefcase,
  MapPin, Gift, Star, Languages, Calendar, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { formatPrice } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'notifications' | 'profile' | 'wishlist' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: wishlistItems, removeItem: removeWishlistItem } = useWishlistStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [pathname]);

  const toggleDropdown = (type: 'notifications' | 'profile' | 'wishlist') => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handlePopularSearchClick = (term: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/packages?search=${encodeURIComponent(term)}`);
  };

  const isLightPage = pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/packages') ||
    pathname?.startsWith('/destinations') ||
    pathname?.startsWith('/blogs') ||
    pathname?.startsWith('/about') ||
    pathname?.startsWith('/contact');

  const isLightNav = scrolled || isLightPage;

  const navBgClass = isLightNav
    ? 'bg-white/90 backdrop-blur-lg border-b border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-1.5'
    : 'bg-slate-900/10 backdrop-blur-[4px] border-b border-white/5 py-3';

  const textColorClass = isLightNav ? 'text-slate-800 font-bold' : 'text-white drop-shadow-sm';
  const textMutedClass = isLightNav ? 'text-slate-500 font-semibold' : 'text-white/80 drop-shadow-sm';
  const hamburgerClass = isLightNav ? 'bg-slate-800' : 'bg-white';
  const dividerClass = isLightNav ? 'bg-slate-200' : 'bg-white/20';
  const navHeightClass = scrolled ? 'h-14' : 'h-16';



  // Simulating Notifications
  const mockNotifications = [
    { id: 1, title: 'Booking Confirmed!', desc: 'Your booking TE20260021 has been confirmed.', time: '2 hrs ago', unread: true },
    { id: 2, title: 'Exclusive 10% Discount', desc: 'Use coupon SUMMERTREAT on Southern Coast packages.', time: '1 day ago', unread: false },
    { id: 3, title: 'New Destination Added', desc: 'Explore Ella and the famous Nine Arch Bridge.', time: '3 days ago', unread: false },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        :root {
          --nav-accent: #e11d48; 
          --nav-accent-hover: #be123c;
        }
      `}</style>

      <nav ref={dropdownRef} className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBgClass}`} suppressHydrationWarning>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8" suppressHydrationWarning>
          <div className={`flex items-center justify-between transition-all duration-300 ${navHeightClass}`} suppressHydrationWarning>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
                <Globe className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-500" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col justify-center">
                <span className={`font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight leading-none transition-colors duration-300 ${textColorClass}`}>
                  TravelEase
                </span>
                <span className={`font-['Inter'] text-[8px] tracking-[0.2em] mt-0.5 uppercase font-bold transition-colors duration-300 ${textMutedClass}`}>
                  Sri Lanka
                </span>
              </div>
            </Link>

            {/* Middle Nav Items */}
            <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3">

              {/* Home */}
              <Link href="/" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  HOME
                </span>
              </Link>

              {/* Packages */}
              <Link href="/packages" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  PACKAGES
                </span>
              </Link>

              {/* Destinations */}
              <Link href="/destinations" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  DESTINATIONS
                </span>
              </Link>

              {/* Blogs */}
              <Link href="/blogs" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  BLOGS
                </span>
              </Link>

              {/* About */}
              <Link href="/about" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  ABOUT
                </span>
              </Link>

              {/* Contact */}
              <Link href="/contact" className="px-3.5 py-2 rounded-xl group relative">
                <span className={`font-['Inter'] text-[12.5px] font-bold tracking-wider transition-colors duration-200 group-hover:text-[var(--nav-accent)] ${textColorClass}`}>
                  CONTACT
                </span>
              </Link>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3 sm:gap-4.5">

              {/* Wishlist Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('wishlist')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0 hover:bg-slate-100/50 ${isLightNav ? 'border-slate-200 text-slate-700' : 'border-white/10 text-white'
                    }`}
                  aria-label="Wishlist"
                >
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                      {wishlistItems.length}
                    </span>
                  )}
                  <Heart className={`h-4 w-4 ${wishlistItems.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'wishlist' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-slate-800">Saved Tours</span>
                        <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full font-bold">
                          {wishlistItems.length} Items
                        </span>
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {wishlistItems.length === 0 ? (
                          <div className="text-center py-6">
                            <Heart className="h-9 w-9 text-slate-200 mx-auto mb-2" />
                            <p className="text-slate-400 text-xs font-semibold">Your wishlist is empty</p>
                          </div>
                        ) : (
                          wishlistItems.map((item) => (
                            <div key={item.id} className="flex gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors group relative">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                              ) : (
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                  <Heart className="h-4.5 w-4.5 text-slate-300" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0 pr-6">
                                <Link href={`/packages/${item.id}`} className="text-xs font-bold text-slate-800 hover:text-rose-500 block truncate">
                                  {item.name}
                                </Link>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{item.destinationName || 'Sri Lanka'}</span>
                                <span className="text-xs font-bold text-slate-700 block mt-1">{formatPrice(item.price)}</span>
                              </div>
                              <button
                                onClick={(e) => { e.preventDefault(); removeWishlistItem(item.id); }}
                                className="absolute right-1 top-1 w-6 h-6 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                                aria-label="Remove item"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notification bell */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('notifications')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all shrink-0 hover:bg-slate-100/50 ${isLightNav ? 'border-slate-200 text-slate-700' : 'border-white/10 text-white'
                    }`}
                  aria-label="Notifications"
                >
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                  <Bell className="h-4.5 w-4.5" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'notifications' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                        <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-slate-800">Notifications</span>
                        <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full font-bold">1 New</span>
                      </div>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div key={notif.id} className="flex gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors">
                            <AlertCircle className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${notif.unread ? 'text-rose-500' : 'text-slate-400'}`} />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs ${notif.unread ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{notif.title}</p>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{notif.desc}</p>
                              <span className="text-[9px] text-slate-300 block mt-1">{notif.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Divider Line */}
              <div className={`hidden sm:block w-[1px] h-5 transition-colors duration-300 ${dividerClass}`} />

              {/* User profile dropdown or Sign In */}
              <div className="relative">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => toggleDropdown('profile')}
                      className={`flex items-center gap-2 hover:opacity-95 transition-opacity ${textColorClass}`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white text-[13px] font-bold shadow-md shadow-rose-500/10 hover:scale-[1.02] transition-transform">
                        {user?.firstName?.charAt(0)}
                      </div>
                      <span className="text-[12.5px] font-bold tracking-wider hidden sm:block max-w-[90px] truncate">
                        {user?.firstName}
                      </span>
                      <ChevronDown className="h-4 w-4 opacity-70 hidden sm:block" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === 'profile' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 z-50 overflow-hidden"
                        >
                          {/* User card info */}
                          <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-base font-bold shrink-0">
                              {user?.firstName?.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 text-sm truncate">{user?.firstName} {user?.lastName}</p>
                              <p className="text-slate-400 text-xs truncate leading-tight">{user?.email}</p>
                              <span className="inline-block px-1.5 py-0.5 bg-rose-50 text-[10px] text-rose-500 font-bold rounded mt-1 border border-rose-100">{user?.role}</span>
                            </div>
                          </div>

                          {/* Options */}
                          <div className="space-y-1">
                            {user?.role === 'Admin' && (
                              <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors">
                                <Shield className="h-4 w-4 text-slate-400" />
                                Admin Panel
                              </Link>
                            )}
                            <Link href="/dashboard" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors">
                              <Calendar className="h-4 w-4 text-slate-400" />
                              My Bookings
                            </Link>
                            <Link href="/wishlist" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors">
                              <Heart className="h-4 w-4 text-slate-400" />
                              Wishlist
                            </Link>
                            <Link href="/settings" className="flex items-center gap-2.5 px-2.5 py-2 hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold transition-colors">
                              <Settings className="h-4 w-4 text-slate-400" />
                              Settings
                            </Link>
                            <button
                              onClick={logout}
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 rounded-xl text-xs font-bold transition-colors text-left"
                            >
                              <LogOut className="h-4 w-4" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="hidden sm:flex items-center gap-2">
                    <Link href="/login">
                      <Button variant="ghost" className={`font-['Inter'] text-[12px] font-bold tracking-wider px-4.5 rounded-xl border border-transparent transition-all ${isLightNav ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                        }`}>
                        LOGIN
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-xl font-['Inter'] text-[11px] font-bold tracking-wider px-5 h-9 transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:-translate-y-0.5 border border-white/5">
                        SIGN UP
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Hamburger menu for mobile */}
              <button
                className="p-1.5 flex flex-col gap-[5px] items-center justify-center group xl:hidden shrink-0"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Menu"
              >
                <span className={`w-5.5 h-[2.5px] rounded-full transition-all group-hover:bg-[var(--nav-accent)] ${hamburgerClass} ${isOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
                <span className={`w-5.5 h-[2.5px] rounded-full transition-all group-hover:bg-[var(--nav-accent)] ${hamburgerClass} ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`w-5.5 h-[2.5px] rounded-full transition-all group-hover:bg-[var(--nav-accent)] ${hamburgerClass} ${isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
              </button>

            </div>
          </div>
        </div>

        {/* Mobile / Tablet Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900 xl:hidden z-40"
              />

              {/* Drawer Content */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-80 max-w-[90vw] h-screen bg-white shadow-2xl xl:hidden z-50 flex flex-col p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[var(--nav-accent)]" />
                    <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-slate-800 text-base">TravelEase</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <Link href="/" className="px-4 py-3 font-['Inter'] text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-xl transition-all">
                    HOME
                  </Link>

                  <div className="py-1">
                    <div className="px-4 py-2 font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-widest text-slate-400 uppercase">Categories</div>
                    <div className="pl-4 flex flex-col gap-1 mt-1">
                      <Link href="/packages" className="px-4 py-2.5 font-['Inter'] text-[13px] font-semibold text-slate-600 hover:text-rose-500 rounded-xl transition-all">
                        Tours & Packages
                      </Link>
                      <Link href="/destinations" className="px-4 py-2.5 font-['Inter'] text-[13px] font-semibold text-slate-600 hover:text-rose-500 rounded-xl transition-all">
                        Destinations
                      </Link>
                      <Link href="/blogs" className="px-4 py-2.5 font-['Inter'] text-[13px] font-semibold text-slate-600 hover:text-rose-500 rounded-xl transition-all">
                        Blogs
                      </Link>
                    </div>
                  </div>

                  <Link href="/about" className="px-4 py-3 font-['Inter'] text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-xl transition-all">
                    ABOUT US
                  </Link>
                  <Link href="/contact" className="px-4 py-3 font-['Inter'] text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-xl transition-all">
                    CONTACT
                  </Link>
                </div>

                {/* Mobile Profile & Actions */}
                <div className="border-t border-slate-100 pt-5 mt-auto">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-base font-bold shadow-md shrink-0">
                          {user?.firstName?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-800 text-sm truncate">{user?.firstName} {user?.lastName}</p>
                          <p className="text-slate-400 text-xs truncate leading-none mt-1">{user?.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {user?.role === 'Admin' && (
                          <Link href="/admin/dashboard" className="col-span-2">
                            <Button className="w-full bg-slate-900 text-white rounded-xl text-xs font-semibold h-10">
                              Admin Panel
                            </Button>
                          </Link>
                        )}
                        <Link href="/dashboard" className="w-full">
                          <Button variant="outline" className="w-full rounded-xl text-xs font-semibold h-10 border-slate-200 text-slate-700">
                            Bookings
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={logout}
                          className="w-full rounded-xl text-xs font-bold h-10 border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/login">
                        <Button variant="outline" className="w-full rounded-xl text-xs font-bold h-11 border-slate-200 text-slate-700">
                          LOG IN
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-xl text-xs font-bold h-11 shadow-md">
                          SIGN UP
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 relative border border-slate-100"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-4 w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-slate-800 mb-4">
                Search Tour Packages
              </h3>

              <form onSubmit={handleSearchSubmit} className="relative mb-6">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where do you want to go? (e.g. Ella, Sigiriya...)"
                  className="w-full h-12 rounded-xl border border-slate-200 pl-11 pr-4 text-sm focus:outline-none focus:border-rose-500 transition-colors text-slate-800"
                  autoFocus
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Button type="submit" className="absolute right-1.5 top-1.5 h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold px-4">
                  Search
                </Button>
              </form>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Ella', 'Galle', 'Sigiriya', 'Safari', 'Beach'].map((term) => (
                    <button
                      key={term}
                      onClick={() => handlePopularSearchClick(term)}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-xs font-medium text-slate-600 transition-colors border border-slate-100"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}