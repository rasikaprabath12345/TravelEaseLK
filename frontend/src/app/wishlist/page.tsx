'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ArrowRight, MapPin, Eye } from 'lucide-react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/wishlist.store';
import { formatPrice } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            My Wishlist
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Keep track of your favorite Sri Lankan adventures and tour packages.
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 p-12 text-center shadow-sm max-w-lg mx-auto mt-8"
            >
              <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/30 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
                <Heart className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Your wishlist is empty</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 max-w-xs mx-auto">
                Explore our handpicked travel packages and save the ones you love.
              </p>
              <Link href="/packages">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl px-6 py-2.5 font-semibold transition-all shadow-md shadow-rose-600/25">
                  Browse Packages <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80'}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 hover:text-white hover:bg-rose-500 transition-colors shadow-sm"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Meta & Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 mb-2.5">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{item.destinationName || 'Sri Lanka'}</span>
                      </div>
                      <h3 className="text-[17px] font-bold text-slate-800 dark:text-white leading-snug tracking-tight group-hover:text-rose-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="p-5 pt-0 border-t border-slate-50 dark:border-slate-700/30 mt-auto flex items-center justify-between">
                    <div className="pt-3">
                      <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Price Starts At</p>
                      <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="pt-3">
                      <Link href={`/packages/${item.id}`}>
                        <Button
                          variant="ghost"
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          View Details <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
