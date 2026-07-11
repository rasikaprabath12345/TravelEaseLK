'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUp, ArrowDown, Type, Heading2, Image as ImageIcon, Quote, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import { motion, AnimatePresence } from 'framer-motion';

export interface BlogBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'quote';
  value: string;
  caption?: string;
}

interface BlogBuilderProps {
  value: string;
  onChange: (htmlValue: string) => void;
}

// HTML Entities escaping
function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Serialize blocks to HTML
export const serializeBlocksToHtml = (blocks: BlogBlock[]): string => {
  if (blocks.length === 0) return '';
  return blocks
    .map((block) => {
      const escapedVal = escapeHtml(block.value);
      switch (block.type) {
        case 'heading':
          return `<h2 class="text-2xl font-bold font-sans text-slate-800 mt-8 mb-4">${escapedVal}</h2>`;
        case 'quote':
          return `<blockquote class="border-l-4 border-rose-500 pl-4 py-2 my-6 italic text-slate-600 bg-slate-50 rounded-r-xl pr-4">${escapedVal}</blockquote>`;
        case 'image':
          const captionHtml = block.caption
            ? `<figcaption class="text-center text-xs text-slate-400 mt-2 font-medium">${escapeHtml(block.caption)}</figcaption>`
            : '';
          return `<figure class="my-8 flex flex-col items-center"><img src="${block.value}" alt="${escapeHtml(block.caption || '')}" class="rounded-3xl shadow-md max-h-[550px] w-full object-cover" />${captionHtml}</figure>`;
        case 'text':
        default:
          // Replace newlines with <br />
          const lines = escapedVal.split('\n').join('<br />');
          return `<p class="text-slate-600 leading-relaxed">${lines}</p>`;
      }
    })
    .join('\n');
};

// Deserialize HTML string to blocks
export const deserializeHtmlToBlocks = (html: string): BlogBlock[] => {
  if (!html) {
    return [{ id: 'init-1', type: 'text', value: '' }];
  }

  // Fallback for legacy plain text articles
  const trimmed = html.trim();
  if (!trimmed.startsWith('<') && !trimmed.includes('</')) {
    return [{ id: 'legacy-1', type: 'text', value: html }];
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blocks: BlogBlock[] = [];

    // Parse child nodes of body
    doc.body.childNodes.forEach((node, index) => {
      const id = `block-${index}-${Math.random().toString(36).substring(2, 9)}`;

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toUpperCase();

        if (tagName === 'H2') {
          blocks.push({
            id,
            type: 'heading',
            value: el.textContent || '',
          });
        } else if (tagName === 'BLOCKQUOTE') {
          blocks.push({
            id,
            type: 'quote',
            value: el.textContent || '',
          });
        } else if (tagName === 'FIGURE') {
          const img = el.querySelector('img');
          const figcaption = el.querySelector('figcaption');
          if (img) {
            blocks.push({
              id,
              type: 'image',
              value: img.getAttribute('src') || '',
              caption: figcaption?.textContent || '',
            });
          }
        } else if (tagName === 'IMG') {
          blocks.push({
            id,
            type: 'image',
            value: el.getAttribute('src') || '',
            caption: el.getAttribute('alt') || '',
          });
        } else if (tagName === 'P') {
          // Convert <br> tags back to newlines for the text area
          let inner = el.innerHTML;
          inner = inner.replace(/<br\s*\/?>/gi, '\n');
          
          // Decode HTML entities
          const temp = document.createElement('textarea');
          temp.innerHTML = inner;
          const decodedValue = temp.value;

          blocks.push({
            id,
            type: 'text',
            value: decodedValue,
          });
        } else {
          // Other tags fallback
          blocks.push({
            id,
            type: 'text',
            value: el.textContent || '',
          });
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        blocks.push({
          id,
          type: 'text',
          value: node.textContent,
        });
      }
    });

    if (blocks.length === 0) {
      return [{ id: 'init-2', type: 'text', value: '' }];
    }
    return blocks;
  } catch (err) {
    console.error('Error deserializing HTML to blog blocks:', err);
    return [{ id: 'err-parse', type: 'text', value: html }];
  }
};

export default function BlogBuilder({ value, onChange }: BlogBuilderProps) {
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize blocks from HTML string
  useEffect(() => {
    if (!isInitialized) {
      const parsedBlocks = deserializeHtmlToBlocks(value);
      setBlocks(parsedBlocks);
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Sync back to parent when blocks change
  const updateParent = (updatedBlocks: BlogBlock[]) => {
    setBlocks(updatedBlocks);
    const html = serializeBlocksToHtml(updatedBlocks);
    onChange(html);
  };

  const addBlock = (type: BlogBlock['type']) => {
    const newBlock: BlogBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      value: '',
      ...(type === 'image' ? { caption: '' } : {}),
    };
    const newBlocks = [...blocks, newBlock];
    updateParent(newBlocks);
  };

  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter((b) => b.id !== id);
    // Ensure we always have at least one block
    if (newBlocks.length === 0) {
      newBlocks.push({ id: `block-fallback-${Date.now()}`, type: 'text', value: '' });
    }
    updateParent(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    updateParent(newBlocks);
  };

  const handleBlockChange = (id: string, fieldValue: string, fieldName: 'value' | 'caption' = 'value') => {
    const newBlocks = blocks.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          [fieldName]: fieldValue,
        };
      }
      return b;
    });
    updateParent(newBlocks);
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-8 border border-slate-100 rounded-2xl bg-slate-50">
        <span className="text-sm text-slate-500 font-semibold">Loading editor builder...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-rose-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Article Builder</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock('text')}
            className="h-8 rounded-lg text-xs font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700"
          >
            <Type className="h-3.5 w-3.5 text-sky-500" /> + Add Paragraph
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock('heading')}
            className="h-8 rounded-lg text-xs font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700"
          >
            <Heading2 className="h-3.5 w-3.5 text-emerald-500" /> + Add Heading
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock('image')}
            className="h-8 rounded-lg text-xs font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700"
          >
            <ImageIcon className="h-3.5 w-3.5 text-rose-500" /> + Add Image
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addBlock('quote')}
            className="h-8 rounded-lg text-xs font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700"
          >
            <Quote className="h-3.5 w-3.5 text-amber-500" /> + Add Quote
          </Button>
        </div>
      </div>

      <div className="space-y-4 min-h-[150px]">
        <AnimatePresence initial={false}>
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              layoutId={block.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-sm hover:shadow transition-all flex gap-4"
            >
              {/* Block Action Controls */}
              <div className="flex flex-col items-center gap-1 justify-center self-stretch border-r border-slate-100 pr-3.5">
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Block Up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <span className="text-[10px] font-bold text-slate-400 select-none">
                  {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === blocks.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Move Block Down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Block Input Content */}
              <div className="flex-1 space-y-3">
                {block.type === 'heading' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      <Heading2 className="h-3 w-3" /> Heading Section
                    </div>
                    <Input
                      type="text"
                      placeholder="Enter section heading title..."
                      value={block.value}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      className="rounded-xl border-slate-200 text-slate-800 font-bold text-base md:text-lg h-11 focus-visible:ring-emerald-500"
                    />
                  </div>
                )}

                {block.type === 'text' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      <Type className="h-3 w-3" /> Text Paragraph
                    </div>
                    <textarea
                      placeholder="Write your story context, guide tips or description here..."
                      value={block.value}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      rows={4}
                      className="w-full flex min-h-[100px] rounded-xl border border-slate-200 bg-background px-3 py-2 text-sm text-slate-700 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                    />
                  </div>
                )}

                {block.type === 'quote' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      <Quote className="h-3 w-3" /> Quote Highlight
                    </div>
                    <textarea
                      placeholder="Enter quotes, highlights, or tips you want to stand out..."
                      value={block.value}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      rows={2}
                      className="w-full flex min-h-[60px] rounded-xl border border-amber-200 bg-amber-50/20 px-3 py-2 text-sm text-slate-800 italic leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                    />
                  </div>
                )}

                {block.type === 'image' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      <ImageIcon className="h-3 w-3" /> Inline Image
                    </div>
                    
                    <ImageUpload
                      value={block.value}
                      onChange={(val) => handleBlockChange(block.id, val)}
                      placeholder="Upload image or paste image link"
                    />
                    
                    {block.value && (
                      <Input
                        type="text"
                        placeholder="Image caption (e.g. Scenic view of Ella Rock)"
                        value={block.caption || ''}
                        onChange={(e) => handleBlockChange(block.id, e.target.value, 'caption')}
                        className="rounded-xl border-slate-200 text-xs h-9"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Remove Block Button */}
              <div className="flex items-start self-start pl-1">
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete Block"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating/Bottom Add Toolbar */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2.5">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Add Block:</span>
        <button
          type="button"
          onClick={() => addBlock('text')}
          className="p-2 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-600 hover:text-sky-600 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <Type className="h-3.5 w-3.5" /> Paragraph
        </button>
        <button
          type="button"
          onClick={() => addBlock('heading')}
          className="p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <Heading2 className="h-3.5 w-3.5" /> Heading
        </button>
        <button
          type="button"
          onClick={() => addBlock('image')}
          className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <ImageIcon className="h-3.5 w-3.5" /> Image
        </button>
        <button
          type="button"
          onClick={() => addBlock('quote')}
          className="p-2 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-slate-600 hover:text-amber-600 transition-colors flex items-center gap-1 text-xs font-semibold"
        >
          <Quote className="h-3.5 w-3.5" /> Quote
        </button>
      </div>
    </div>
  );
}
