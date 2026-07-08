'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-bold text-slate-700 block">{label}</label>}
      
      {!value ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${
            isDragActive 
              ? 'border-sky-500 bg-sky-50/50 scale-[0.99]' 
              : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mb-3">
            <Upload className="h-6 w-6 text-sky-500 animate-bounce" />
          </div>

          <p className="text-sm font-semibold text-slate-800 mb-0.5">
            Drag & drop your image here, or{' '}
            <button type="button" onClick={handleButtonClick} className="text-sky-500 hover:underline">
              browse
            </button>
          </p>
          <p className="text-xs text-slate-400 mb-4">Supports PNG, JPG, JPEG, WEBP</p>

          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-slate-200" />
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">or</span>
            <div className="h-[1px] w-8 bg-slate-200" />
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="mt-3 text-xs text-slate-500 hover:text-sky-500 flex items-center gap-1.5"
          >
            <LinkIcon className="h-3.5 w-3.5" />
            {showUrlInput ? 'Hide URL input' : 'Paste an image URL'}
          </Button>

          {showUrlInput && (
            <div className="w-full mt-4">
              <Input
                type="text"
                placeholder={placeholder || "https://example.com/image.jpg"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="rounded-xl border-slate-200 text-xs h-9"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 group h-40">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              onClick={handleButtonClick}
              className="bg-white hover:bg-slate-100 text-slate-800 text-xs rounded-xl shadow font-semibold"
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={clearImage}
              className="bg-red-600 hover:bg-red-700 text-white text-xs rounded-xl shadow font-semibold"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
