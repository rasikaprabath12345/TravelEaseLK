'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, LogOut, Heart, Settings, Shield, Calendar, ChevronDown, Phone, Menu
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useWishlistStore } from '@/store/wishlist.store';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const isSolidPage =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/packages') ||
    pathname?.startsWith('/destinations') ||
    pathname?.startsWith('/blogs') ||
    pathname?.startsWith('/about') ||
    pathname?.startsWith('/contact');

  const solid = scrolled || isSolidPage;

  return (
    <>
      {/* ── Top Bar ── */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid
          ? 'bg-white/98 backdrop-blur-sm shadow-[0_1px_0_0_#e2e8f0]'
          : 'bg-transparent'
          }`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* ── Logo ── */}
            <Link href="/" className="flex flex-col shrink-0 select-none">
              <span
                className={`text-[20px] font-extrabold tracking-tight leading-none transition-colors duration-300 ${solid ? 'text-slate-900' : 'text-white'
                  }`}
                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.01em' }}
              >
                TravelEase
              </span>
              <span
                className={`text-[8.5px] tracking-[0.3em] uppercase font-medium mt-[3px] transition-colors duration-300 ${solid ? 'text-slate-400' : 'text-white/50'
                  }`}
              >
                Sri Lanka
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 group ${active
                      ? solid ? 'text-rose-600' : 'text-white'
                      : solid
                        ? 'text-slate-600 hover:text-slate-900'
                        : 'text-white/75 hover:text-white'
                      }`}
                  >
                    {link.label}
                    {/* underline indicator */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-[1.5px] rounded-full transition-all duration-300 ${active
                        ? 'bg-rose-500 opacity-100 scale-x-100'
                        : 'bg-rose-400 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-4">

              {/* Phone */}
              <a
                href="tel:+94771234567"
                className={`hidden xl:flex items-center gap-2 text-[12.5px] font-medium transition-colors duration-200 ${solid ? 'text-slate-500 hover:text-slate-800' : 'text-white/65 hover:text-white'
                  }`}
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                +94 77 123 4567
              </a>

              {/* Separator */}
              <div className={`hidden xl:block w-px h-4 ${solid ? 'bg-slate-200' : 'bg-white/20'}`} />

              {/* Auth */}
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-2.5 transition-opacity hover:opacity-80 ${solid ? 'text-slate-800' : 'text-white'
                      }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center text-white text-[13px] font-bold shadow">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <span className="hidden sm:block text-[13px] font-medium max-w-[80px] truncate">
                      {user?.firstName}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 opacity-50 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                          <p className="font-semibold text-slate-800 text-sm">{user?.firstName} {user?.lastName}</p>
                          <p className="text-slate-400 text-[11px] truncate mt-0.5">{user?.email}</p>
                        </div>
                        {/* Links */}
                        <div className="py-1.5">
                          {user?.role === 'Admin' && (
                            <Link href="/admin/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-slate-700 hover:bg-slate-50 hover:text-rose-600 transition-colors">
                              <Shield className="h-3.5 w-3.5 text-slate-400" /> Admin Panel
                            </Link>
                          )}
                          <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-slate-700 hover:bg-slate-50 transition-colors">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" /> My Bookings
                          </Link>
                          <Link href="/wishlist" className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-slate-700 hover:bg-slate-50 transition-colors">
                            <Heart className="h-3.5 w-3.5 text-slate-400" />
                            Wishlist
                            {wishlistItems.length > 0 && (
                              <span className="ml-auto text-[9px] font-bold bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-full">
                                {wishlistItems.length}
                              </span>
                            )}
                          </Link>
                          <Link href="/settings" className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-slate-700 hover:bg-slate-50 transition-colors">
                            <Settings className="h-3.5 w-3.5 text-slate-400" /> Settings
                          </Link>
                        </div>
                        {/* Logout */}
                        <div className="border-t border-slate-100 py-1.5">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-rose-500 hover:bg-rose-50 transition-colors text-left"
                          >
                            <LogOut className="h-3.5 w-3.5" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2.5">
                  <Link
                    href="/login"
                    className={`text-[13px] font-medium px-3.5 py-2 rounded-lg transition-colors duration-200 ${solid
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/packages"
                    className="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-[12px] font-semibold px-5 py-2 rounded-lg transition-colors duration-200 tracking-wide shadow-md shadow-rose-600/25"
                  >
                    Book Now
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                className={`p-1.5 rounded-lg lg:hidden transition-colors ${solid ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                  }`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm lg:hidden z-40"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
                className="fixed top-0 right-0 w-72 max-w-[85vw] h-screen bg-white shadow-2xl lg:hidden z-50 flex flex-col"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight" style={{ fontFamily: "'Georgia', serif" }}>
                    TravelEase
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Nav links */}
                <div className="flex flex-col px-3 py-4 flex-1 overflow-y-auto">
                  {NAV_LINKS.map((link, i) => {
                    const active = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active
                            ? 'bg-rose-50 text-rose-600'
                            : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                          {link.label}
                          {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500" />}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Drawer footer */}
                <div className="px-6 py-5 border-t border-slate-100 space-y-3">
                  <a href="tel:+94771234567" className="flex items-center gap-2 text-sm text-slate-500">
                    <Phone className="h-4 w-4 text-rose-500" /> +94 77 123 4567
                  </a>
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 py-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-rose-500 to-rose-700 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user?.firstName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{user?.firstName}</p>
                          <p className="text-slate-400 text-xs">{user?.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-center py-2.5 rounded-lg border border-rose-200 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" className="block w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
                        Sign In
                      </Link>
                      <Link href="/packages" className="block w-full text-center py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold transition-colors">
                        Book Now
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}