'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronDown, X, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/packages', label: 'PACKAGES' },
    { href: '/destinations', label: 'DESTINATIONS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  // ලාවට transparent (Slightly transparent overlay with a very soft blur)
  const navBgClass = scrolled 
    ? 'bg-black/30 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] py-2' 
    : 'bg-black/10 backdrop-blur-[2px] border-transparent py-4';
    
  // අකුරු දිගටම සුදු පාටින් සහ drop-shadow එකක් සහිතව තබා ඇත
  const textColorClass = 'text-white drop-shadow-md';
  const textMutedClass = 'text-white/85 drop-shadow-md';
  const hamburgerClass = 'bg-white shadow-sm';
  const dividerClass = 'bg-white/30';

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          /* Premium Red Accent */
          --nav-accent: #e11d48; 
          --nav-accent-hover: #be123c;
        }
      `}</style>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBgClass}`}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Globe className="h-7 w-7 text-[var(--nav-accent)] group-hover:rotate-12 transition-transform duration-500 drop-shadow-sm" strokeWidth={2} />
              <div className="flex flex-col justify-center">
                <span className={`font-['Plus_Jakarta_Sans'] font-bold text-xl tracking-tight leading-none transition-colors duration-300 ${textColorClass}`}>
                  TravelEase
                </span>
                <span className={`font-['Inter'] text-[9px] tracking-[0.2em] mt-0.5 uppercase font-bold transition-colors duration-300 ${textMutedClass}`}>
                  Sri Lanka
                </span>
              </div>
            </Link>

            {/* Right Side Container */}
            <div className="flex items-center justify-end flex-1">
              
              {/* Desktop Nav Links */}
              <div className="hidden xl:flex items-center gap-6 2xl:gap-8 mr-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group flex items-center py-2"
                  >
                    {/* Red Vertical Line Hover Effect */}
                    <span className="absolute left-[-12px] h-[12px] w-[3px] bg-[var(--nav-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(225,29,72,0.4)]" />
                    <span className={`font-['Inter'] text-[12px] font-bold tracking-[1px] group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textColorClass}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Action Buttons & Icons */}
              <div className="flex items-center gap-4 sm:gap-6">
                
                {/* Main Action Button (Red Pill Shape) */}
                {isAuthenticated ? (
                  <Link href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} className="hidden sm:block">
                    <Button className="bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-['Inter'] text-[12px] font-bold tracking-wider px-7 h-11 transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 border border-white/10">
                      DASHBOARD
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register" className="hidden sm:block">
                    <Button className="bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-['Inter'] text-[12px] font-bold tracking-wider px-7 h-11 transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 border border-white/10">
                      SIGN UP
                    </Button>
                  </Link>
                )}

                {/* Custom 2-Line Hamburger Menu */}
                <button
                  className="p-1 flex flex-col gap-[6px] items-center justify-center group xl:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className={`w-7 h-[2px] rounded-full group-hover:bg-[var(--nav-accent)] transition-colors ${hamburgerClass}`} />
                  <span className={`w-7 h-[2px] rounded-full group-hover:bg-[var(--nav-accent)] transition-colors ${hamburgerClass}`} />
                </button>

                {/* Divider Line */}
                <div className={`hidden sm:block w-[1px] h-8 transition-colors duration-300 ${dividerClass}`} />

                {/* Red Search Circle */}
                <button aria-label="Search" className="w-11 h-11 rounded-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] flex items-center justify-center transition-all text-white shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] shrink-0 hover:-translate-y-0.5 border border-white/10">
                  <Search className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </button>

                {/* User / Auth Dropdown */}
                <div className="hidden sm:flex items-center">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <span className={`font-['Inter'] text-[12px] font-bold tracking-wider uppercase group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textColorClass}`}>
                        {user?.firstName || 'USER'}
                      </span>
                      <ChevronDown className={`h-4 w-4 group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textMutedClass}`} />
                      <button onClick={logout} className={`ml-2 hover:text-[var(--nav-accent)] transition-colors duration-300 ${textMutedClass}`} title="Logout">
                        <LogOut className="h-[16px] w-[16px]" strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" className="flex items-center gap-1.5 group">
                      <span className={`font-['Inter'] text-[12px] font-bold tracking-wider group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textColorClass}`}>
                        LOGIN
                      </span>
                      <ChevronDown className={`h-4 w-4 group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textMutedClass}`} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] xl:hidden overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1 max-w-[1800px] mx-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center py-4 font-['Inter'] text-[13px] font-bold tracking-widest text-[#171717] hover:text-[var(--nav-accent)] border-b border-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-6 pb-4 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      <Link href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-bold tracking-widest h-12 text-[12px] shadow-md border border-red-500/10">
                          MY DASHBOARD
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full rounded-full border-gray-200 text-[#171717] hover:text-[var(--nav-accent)] font-bold tracking-widest h-12 text-[12px] hover:bg-gray-50 transition-colors"
                        onClick={() => { logout(); setIsOpen(false); }}
                      >
                        LOG OUT
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full border-gray-200 text-[#171717] hover:text-[var(--nav-accent)] font-bold tracking-widest h-12 text-[12px] hover:bg-gray-50 transition-colors">
                          LOGIN
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-bold tracking-widest h-12 text-[12px] shadow-md border border-red-500/10">
                          SIGN UP
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}