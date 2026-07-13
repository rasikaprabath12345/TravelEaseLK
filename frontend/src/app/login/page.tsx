'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, Loader2, Eye, EyeOff, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginFormData = z.infer<typeof loginSchema>;

const features = [
  'Access your personalized dashboard',
  'Track all your bookings in real time',
  'Exclusive member-only deals',
  'Save tours to your wishlist',
];

const bgSlides = [
  'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80',
  'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80',
];

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [bgIdx] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await authService.login(data);
      if (response.success) {
        setAuth(
          {
            id: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            role: response.data.role,
            profileImage: response.data.profileImage,
          },
          response.data.token
        );
        localStorage.setItem('token', response.data.token);
        if (response.data.role === 'Admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={bgSlides[bgIdx]}
          alt="Sri Lanka"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-slate-900/80 to-slate-900/95" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">TravelEase</p>
              <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium">Sri Lanka</p>
            </div>
          </Link>

          {/* Middle Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-semibold">15,000+ Happy Travelers</span>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Your Adventure<br />Starts Here
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Sign in to manage bookings, explore curated tours, and get exclusive member deals.
            </p>

            <div className="space-y-3">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-sky-500/30 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="h-3.5 w-3.5 text-sky-400" />
                  </div>
                  <span className="text-white/80 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom trust */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 border border-white/20">
              <Shield className="h-4 w-4 text-sky-400" />
              <span className="text-white/80 text-xs font-medium">SSL Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-lg leading-none">TravelEase LK</p>
            </div>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
              <p className="text-slate-500 text-sm">Sign in to your TravelEase LK account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 mb-5 text-sm flex items-center gap-2"
              >
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0">!</div>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email.message}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <button type="button" className="text-sky-600 text-xs font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-slate-400 text-xs">Or</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                // Simulate a successful Google Sign-In by logging in as the demo Customer
                setTimeout(() => {
                  setAuth(
                    {
                      id: 2,
                      firstName: 'James',
                      lastName: 'Wilson',
                      email: 'james.w@gmail.com',
                      role: 'Customer',
                    },
                    'mock-google-jwt-token'
                  );
                  localStorage.setItem('token', 'mock-google-jwt-token');
                  router.push('/dashboard');
                  setIsLoading(false);
                }, 1000);
              }}
              className="w-full border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-3 transition-all hover:shadow-sm mb-6 bg-white disabled:opacity-70"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.79 5.79 0 0 1 8.2 12.725a5.79 5.79 0 0 1 5.79-5.79c2.476 0 4.542 1.547 5.342 3.73l3.858-2.998C21.282 3.756 17.962 1.5 13.99 1.5a10.875 10.875 0 0 0-10.87 10.875A10.875 10.875 0 0 0 13.99 23.25c5.96 0 10.125-4.148 10.125-10.286 0-.616-.057-1.228-.168-1.81H12.24Z"
                />
              </svg>
              Sign in with Google
            </button>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-sky-600 font-semibold hover:text-sky-700">
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}