'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Save, ArrowLeft, RotateCcw, Trash2, Plus, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../../components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { ImageUpload } from '../../../components/ui/image-upload';

export default function AdminSettingsPage() {
  const [success, setSuccess] = useState(false);
  
  // Hero slider background lists
  const [heroBackgrounds, setHeroBackgrounds] = useState<string[]>([]);
  const [newHeroUrl, setNewHeroUrl] = useState('');

  // Page banner image inputs
  const [packagesCover, setPackagesCover] = useState('');
  const [destinationsCover, setDestinationsCover] = useState('');
  const [aboutCover, setAboutCover] = useState('');
  const [contactCover, setContactCover] = useState('');

  useEffect(() => {
    // Load home hero images
    const savedHero = localStorage.getItem('site_hero_backgrounds');
    if (savedHero) {
      try {
        setHeroBackgrounds(JSON.parse(savedHero));
      } catch (e) {
        setHeroBackgrounds([
          '/images/1.jpg',
          '/images/2.jpg',
          '/images/3.jpg'
        ]);
      }
    } else {
      setHeroBackgrounds([
        '/images/1.jpg',
        '/images/2.jpg',
        '/images/3.jpg'
      ]);
    }

    // Load other cover page images
    setPackagesCover(localStorage.getItem('site_packages_cover') || 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80');
    setDestinationsCover(localStorage.getItem('site_destinations_cover') || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80');
    setAboutCover(localStorage.getItem('site_about_cover') || 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80');
    setContactCover(localStorage.getItem('site_contact_cover') || 'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=1200&q=80');
  }, []);

  const handleSave = () => {
    localStorage.setItem('site_hero_backgrounds', JSON.stringify(heroBackgrounds));
    localStorage.setItem('site_packages_cover', packagesCover);
    localStorage.setItem('site_destinations_cover', destinationsCover);
    localStorage.setItem('site_about_cover', aboutCover);
    localStorage.setItem('site_contact_cover', contactCover);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all covers to defaults?')) {
      localStorage.removeItem('site_hero_backgrounds');
      localStorage.removeItem('site_packages_cover');
      localStorage.removeItem('site_destinations_cover');
      localStorage.removeItem('site_about_cover');
      localStorage.removeItem('site_contact_cover');
      
      // Reload states
      setHeroBackgrounds(['/images/1.jpg', '/images/2.jpg', '/images/3.jpg']);
      setPackagesCover('https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=1200&q=80');
      setDestinationsCover('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80');
      setAboutCover('https://images.unsplash.com/photo-1549366021-9f761d450615?w=1200&q=80');
      setContactCover('https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=1200&q=80');
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const addHeroUrl = () => {
    if (newHeroUrl.trim()) {
      setHeroBackgrounds([...heroBackgrounds, newHeroUrl.trim()]);
      setNewHeroUrl('');
    }
  };

  const removeHeroUrl = (index: number) => {
    setHeroBackgrounds(heroBackgrounds.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-600 text-sm">Admin</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 text-sm font-medium">Page Covers</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="h-7 w-7 text-sky-500" /> Page Cover Settings
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">Customize cover images across your entire travel platform</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50">
              <RotateCcw className="h-4 w-4 mr-2" /> Reset Defaults
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-md">
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          </div>
        </motion.div>

        {success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 mb-6 flex items-center gap-2.5">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold">All cover settings updated successfully!</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Homepage settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-sky-500" /> Homepage Hero Slideshow
                </CardTitle>
                <p className="text-xs text-slate-400">Manage multiple images for your home landing page slideshow</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <ImageUpload
                    label="Add Slide Image"
                    value={newHeroUrl}
                    onChange={setNewHeroUrl}
                    placeholder="Paste slide image URL or upload one"
                  />
                  {newHeroUrl && (
                    <Button onClick={addHeroUrl} className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl w-full font-semibold">
                      <Plus className="h-4 w-4 mr-1.5" /> Add to Slideshow
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {heroBackgrounds.map((url, i) => (
                    <div key={i} className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-32">
                      <img src={url} alt={`Hero ${i+1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => removeHeroUrl(i)}
                          className="w-9 h-9 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors shadow"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold rounded">
                        Slide {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <CardTitle className="text-lg font-bold">Inner Pages Banners</CardTitle>
                <p className="text-xs text-slate-400">Configure cover headers for packages, destinations, about, and contact pages</p>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                
                {/* Packages Page */}
                <ImageUpload
                  label="Packages Page Banner"
                  value={packagesCover}
                  onChange={setPackagesCover}
                  placeholder="Paste packages cover URL or upload one"
                />

                {/* Destinations Page */}
                <ImageUpload
                  label="Destinations Page Banner"
                  value={destinationsCover}
                  onChange={setDestinationsCover}
                  placeholder="Paste destinations cover URL or upload one"
                />

                {/* About Page */}
                <ImageUpload
                  label="About Page Banner"
                  value={aboutCover}
                  onChange={setAboutCover}
                  placeholder="Paste about cover URL or upload one"
                />

                {/* Contact Page */}
                <ImageUpload
                  label="Contact Page Banner"
                  value={contactCover}
                  onChange={setContactCover}
                  placeholder="Paste contact cover URL or upload one"
                />

              </CardContent>
            </Card>
          </div>

          {/* Previews Sidebar */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-sm font-bold text-slate-800">Banner Live Previews</CardTitle>
              </CardHeader>
              <div className="p-4 space-y-4">
                
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Packages Cover Preview</p>
                  <div className="h-24 rounded-lg overflow-hidden border bg-slate-100">
                    <img src={packagesCover || null} className="w-full h-full object-cover" alt="Packages preview" onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=400')} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Destinations Cover Preview</p>
                  <div className="h-24 rounded-lg overflow-hidden border bg-slate-100">
                    <img src={destinationsCover || null} className="w-full h-full object-cover" alt="Destinations preview" onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400')} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">About Cover Preview</p>
                  <div className="h-24 rounded-lg overflow-hidden border bg-slate-100">
                    <img src={aboutCover || null} className="w-full h-full object-cover" alt="About preview" onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400')} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1.5">Contact Cover Preview</p>
                  <div className="h-24 rounded-lg overflow-hidden border bg-slate-100">
                    <img src={contactCover || null} className="w-full h-full object-cover" alt="Contact preview" onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1616401775305-e4614a3e5a5c?w=400')} />
                  </div>
                </div>

              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
