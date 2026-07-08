'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ChevronDown, X, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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

  // සංශෝධනය: Home page ('/') එක හැර අනෙකුත් සියලුම පිටු Light Pages ලෙස සැලකීම වඩාත් සුදුසුය.
  // නැතහොත් අවශ්‍ය පිටු පමණක් මෙලෙස එකතු කළ හැක.
  const isLightPage = pathname?.startsWith('/admin') || 
                      pathname?.startsWith('/dashboard') || 
                      pathname?.startsWith('/login') || 
                      pathname?.startsWith('/register') ||
                      pathname?.startsWith('/packages') || 
                      pathname?.startsWith('/destinations') ||
                      pathname?.startsWith('/about') ||
                      pathname?.startsWith('/contact');
                      
  const isLightNav = scrolled || isLightPage;

  // Background සහ Border අවස්ථාව අනුව වෙනස් වීම (පැහැදිලිව පෙනෙන පරිදි සකසා ඇත)
  const navBgClass = isLightNav 
    ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-1.5' 
    : 'bg-black/15 backdrop-blur-[3px] border-transparent py-2.5';
    
  // සුදු පසුබිමේදී අකුරු පැහැදිලිව පෙනීමට Dark Color එකක් සහ සාමාන්‍ය අවස්ථාවේදී White Color එකක්
  const textColorClass = isLightNav ? 'text-[#171717] font-bold' : 'text-white drop-shadow-md';
  const textMutedClass = isLightNav ? 'text-gray-500 font-semibold' : 'text-white/85 drop-shadow-md';
  const hamburgerClass = isLightNav ? 'bg-[#171717]' : 'bg-white shadow-sm';
  const dividerClass = isLightNav ? 'bg-gray-200' : 'bg-white/30';
  
  // උස කලින් h-20 තිබූ එක h-16/14 දක්වා අඩු කර ඇත
  const navHeightClass = scrolled ? 'h-14' : 'h-16'; 

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

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBgClass}`}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${navHeightClass}`}>
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Globe className="h-6 w-6 text-[var(--nav-accent)] group-hover:rotate-12 transition-transform duration-500 drop-shadow-sm" strokeWidth={2.5} />
              <div className="flex flex-col justify-center">
                <span className={`font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight leading-none transition-colors duration-300 ${textColorClass}`}>
                  TravelEase
                </span>
                <span className={`font-['Inter'] text-[8px] tracking-[0.2em] mt-0.5 uppercase font-bold transition-colors duration-300 ${textMutedClass}`}>
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
              <div className="flex items-center gap-3 sm:gap-5">
                
                {/* Main Action Button (Red Pill Shape) */}
                {isAuthenticated ? (
                  <Link href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} className="hidden sm:block">
                    <Button className="bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-['Inter'] text-[11px] font-bold tracking-wider px-6 h-9.5 md:h-10 transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 border border-white/10">
                      DASHBOARD
                    </Button>
                  </Link>
                ) : (
                  <Link href="/register" className="hidden sm:block">
                    <Button className="bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-['Inter'] text-[11px] font-bold tracking-wider px-6 h-9.5 md:h-10 transition-all shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 border border-white/10">
                      SIGN UP
                    </Button>
                  </Link>
                )}

                {/* Custom 2-Line Hamburger Menu */}
                <button
                  className="p-1 flex flex-col gap-[5px] items-center justify-center group xl:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className={`w-6 h-[2px] rounded-full group-hover:bg-[var(--nav-accent)] transition-colors ${hamburgerClass}`} />
                  <span className={`w-6 h-[2px] rounded-full group-hover:bg-[var(--nav-accent)] transition-colors ${hamburgerClass}`} />
                </button>

                {/* Divider Line */}
                <div className={`hidden sm:block w-[1px] h-6 transition-colors duration-300 ${dividerClass}`} />

                {/* Red Search Circle */}
                <button aria-label="Search" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] flex items-center justify-center transition-all text-white shadow-[0_4px_14px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_20px_rgba(225,29,72,0.5)] shrink-0 hover:-translate-y-0.5 border border-white/10">
                  <Search className="h-4 w-4" strokeWidth={2.5} />
                </button>

                {/* User / Auth Dropdown */}
                <div className="hidden sm:flex items-center">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-1.5 group cursor-pointer">
                      <span className={`font-['Inter'] text-[12px] font-bold tracking-wider uppercase group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textColorClass}`}>
                        {user?.firstName || 'USER'}
                      </span>
                      <ChevronDown className={`h-4 w-4 group-hover:text-[var(--nav-accent)] transition-colors duration-300 ${textMutedClass}`} />
                      <button onClick={logout} className={`ml-1 hover:text-[var(--nav-accent)] transition-colors duration-300 ${textMutedClass}`} title="Logout">
                        <LogOut className="h-[15px] w-[15px]" strokeWidth={2} />
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" className="flex items-center gap-1 group">
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
                    className="flex items-center py-3.5 font-['Inter'] text-[13px] font-bold tracking-widest text-[#171717] hover:text-[var(--nav-accent)] border-b border-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="pt-5 pb-3 flex flex-col gap-2.5">
                  {isAuthenticated ? (
                    <>
                      <Link href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-bold tracking-widest h-11 text-[12px] shadow-md border border-red-500/10">
                          MY DASHBOARD
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full rounded-full border-gray-200 text-[#171717] hover:text-[var(--nav-accent)] font-bold tracking-widest h-11 text-[12px] hover:bg-gray-50 transition-colors"
                        onClick={() => { logout(); setIsOpen(false); }}
                      >
                        LOG OUT
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full rounded-full border-gray-200 text-[#171717] hover:text-[var(--nav-accent)] font-bold tracking-widest h-11 text-[12px] hover:bg-gray-50 transition-colors">
                          LOGIN
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-[var(--nav-accent)] hover:bg-[var(--nav-accent-hover)] text-white rounded-full font-bold tracking-widest h-11 text-[12px] shadow-md border border-red-500/10">
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