'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Globe, Moon, Sun, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { useThemeStore } from '@/store/theme.store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/packages', label: 'Packages' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-[0_1px_20px_rgba(15,35,55,0.06)]"
    >
      {/* Shared theme tokens — kept identical to the homepage so colors/fonts always match */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-body">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--tl-ocean)] to-[var(--tl-ocean-dark)] flex items-center justify-center shadow-sm">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg text-[var(--tl-navy)] tracking-tight">
              TravelEase <span className="text-[var(--tl-coral)]">LK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[var(--tl-navy)]/65 hover:text-[var(--tl-navy)] transition-colors group py-1"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[var(--tl-coral)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full text-[var(--tl-navy)]/60 hover:text-[var(--tl-navy)] hover:bg-[var(--tl-bg-soft)] transition-colors"
            >
              {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-1 pl-2">
                <Link
                  href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full hover:bg-[var(--tl-bg-soft)] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--tl-ocean)] to-[var(--tl-coral)] flex items-center justify-center text-white text-xs font-display font-bold shrink-0">
                    {user?.firstName?.charAt(0) || <User className="h-3.5 w-3.5" />}
                  </div>
                  <span className="text-sm font-semibold text-[var(--tl-navy)]">{user?.firstName}</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-[var(--tl-navy)]/50 hover:text-[var(--tl-coral)] hover:bg-transparent font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-3">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full text-sm font-semibold border-[var(--tl-navy)]/15 text-[var(--tl-navy)] hover:bg-[var(--tl-bg-soft)] hover:text-[var(--tl-navy)]"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-full text-sm font-semibold bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-[var(--tl-navy)] hover:bg-[var(--tl-bg-soft)]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-black/5"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--tl-navy)]/75 hover:text-[var(--tl-navy)] hover:bg-[var(--tl-bg-soft)] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--tl-navy)]/75 hover:bg-[var(--tl-bg-soft)] transition-colors text-left"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </button>

              <div className="flex flex-col gap-2 px-4 pt-3 mt-2 border-t border-black/5">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard'}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[var(--tl-bg-soft)] text-sm font-semibold text-[var(--tl-navy)]"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--tl-ocean)] to-[var(--tl-coral)] flex items-center justify-center text-white text-[10px] font-display font-bold shrink-0">
                        {user?.firstName?.charAt(0) || <User className="h-3 w-3" />}
                      </div>
                      {user?.firstName ? `${user.firstName}'s Dashboard` : 'Dashboard'}
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="justify-start text-[var(--tl-navy)]/60 hover:text-[var(--tl-coral)] hover:bg-transparent font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full rounded-full font-semibold border-[var(--tl-navy)]/15 text-[var(--tl-navy)]"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full rounded-full font-semibold bg-[var(--tl-coral)] hover:bg-[var(--tl-coral-dark)] text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}