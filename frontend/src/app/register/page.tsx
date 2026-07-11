'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, User, Phone, Loader2, Eye, EyeOff, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z.string().optional(),
});
type RegisterFormData = z.infer<typeof registerSchema>;

const testimonial = {
  text: '"TravelEaseLK made our honeymoon truly magical. Every single detail was perfect — from the candlelit dinner in Kandy to the blue whale sighting in Mirissa. We\'ve already booked our second trip!"',
  author: 'Emma & Klaus Schneider',
  country: '🇩🇪 Germany',
};

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await authService.register(data);
      if (response.success) {
        setAuth(
          {
            id: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            role: response.data.role,
          },
          response.data.token
        );
        localStorage.setItem('token', response.data.token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80"
          alt="Sri Lanka Travel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/80 to-slate-900/95" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">TravelEase</p>
              <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium">Sri Lanka</p>
            </div>
          </Link>

          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Join 15,000+<br />Happy Travelers
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Create your free account to unlock personalized tours, member prices, and unforgettable Sri Lanka adventures.
            </p>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="text-white/90 text-sm italic leading-relaxed mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm">E</div>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-white/60 text-xs">{testimonial.country}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {['Free to Join', 'No Spam Ever', 'Instant Access'].map(item => (
              <div key={item} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 border border-white/20">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                <span className="text-white/80 text-xs font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <p className="font-bold text-slate-900 text-lg">TravelEase LK</p>
          </Link>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Mobile Banner Image */}
            <div className="relative h-36 w-full lg:hidden">
              <img
                src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=80"
                alt="Sri Lanka Travel"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h1 className="text-xl font-bold text-white leading-none">Create your account</h1>
                <p className="text-white/80 text-[11px] mt-1.5 leading-none">Join TravelEaseLK for amazing travel experiences</p>
              </div>
            </div>

            <div className="p-8">
              <div className="hidden lg:block mb-7">
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
                <p className="text-slate-500 text-sm">Join TravelEaseLK for amazing travel experiences</p>
              </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 mb-5 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      {...register('firstName')}
                      placeholder="John"
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">Last Name</label>
                  <input
                    {...register('lastName')}
                    placeholder="Smith"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number <span className="text-slate-400 font-normal">(optional)</span></label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    {...register('phoneNumber')}
                    placeholder="+44 7911 123456"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <p className="text-slate-400 text-xs">
                By creating an account, you agree to our{' '}
                <span className="text-sky-600 cursor-pointer hover:underline">Terms of Service</span> and{' '}
                <span className="text-sky-600 cursor-pointer hover:underline">Privacy Policy</span>.
              </p>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white py-3 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 group"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Free Account
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-5">
              Already have an account?{' '}
              <Link href="/login" className="text-sky-600 font-semibold hover:text-sky-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
}