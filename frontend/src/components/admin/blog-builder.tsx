'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Type, Heading2, Image as ImageIcon, Quote, ChevronUp, ChevronDown, Sparkles, Highlighter, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import { motion, AnimatePresence } from 'framer-motion';

export interface BlogBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'quote' | 'highlight' | 'pointwise';
  value: string;
  caption?: string;
  /** For 'highlight': 'blue' | 'green' | 'amber' | 'rose' */
  highlightColor?: 'blue' | 'green' | 'amber' | 'rose';
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
        case 'image': {
          const captionHtml = block.caption
            ? `<figcaption class="text-center text-xs text-slate-400 mt-2 font-medium">${escapeHtml(block.caption)}</figcaption>`
            : '';
          return `<figure class="my-8 flex flex-col items-center"><img src="${block.value}" alt="${escapeHtml(block.caption || '')}" class="rounded-3xl shadow-md max-h-[550px] w-full object-cover" />${captionHtml}</figure>`;
        }
        case 'highlight': {
          const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
            blue:  { bg: 'bg-blue-50',  border: 'border-blue-400',  text: 'text-blue-800',  badge: 'bg-blue-400 text-white'  },
            green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', badge: 'bg-green-500 text-white' },
            amber: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-800', badge: 'bg-amber-400 text-white' },
            rose:  { bg: 'bg-rose-50',  border: 'border-rose-500',  text: 'text-rose-800',  badge: 'bg-rose-500 text-white'  },
          };
          const c = colorMap[block.highlightColor ?? 'blue'];
          return `<div class="highlight-block ${c.bg} border-l-4 ${c.border} rounded-r-2xl px-5 py-4 my-6 flex gap-3 items-start" data-highlight-color="${block.highlightColor ?? 'blue'}"><span class="inline-flex items-center shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.badge}">✦ Tip</span><p class="${c.text} text-sm leading-relaxed">${escapedVal}</p></div>`;
        }
        case 'pointwise': {
          const lines = block.value
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
          const liItems = lines
            .map((line) => `<li class="flex gap-2 items-start text-slate-700 text-sm"><span class="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500 block"></span><span>${escapeHtml(line)}</span></li>`)
            .join('\n');
          return `<ul class="pointwise-block my-6 space-y-2 pl-1" data-pointwise="true">\n${liItems}\n</ul>`;
        }
        case 'text':
        default: {
          const lines = escapedVal.split('\n').join('<br />');
          return `<p class="text-slate-600 leading-relaxed">${lines}</p>`;
        }
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
          blocks.push({ id, type: 'heading', value: el.textContent || '' });
        } else if (tagName === 'BLOCKQUOTE') {
          blocks.push({ id, type: 'quote', value: el.textContent || '' });
        } else if (tagName === 'DIV' && el.classList.contains('highlight-block')) {
          const color = (el.getAttribute('data-highlight-color') || 'blue') as BlogBlock['highlightColor'];
          const p = el.querySelector('p');
          blocks.push({ id, type: 'highlight', value: p?.textContent || el.textContent || '', highlightColor: color });
        } else if (tagName === 'UL' && el.classList.contains('pointwise-block')) {
          const lines = Array.from(el.querySelectorAll('li')).map((li) => {
            const spans = li.querySelectorAll('span');
            return spans.length >= 2 ? spans[1].textContent?.trim() || '' : li.textContent?.trim() || '';
          });
          blocks.push({ id, type: 'pointwise', value: lines.join('\n') });
        } else if (tagName === 'FIGURE') {
          const img = el.querySelector('img');
          const figcaption = el.querySelector('figcaption');
          if (img) {
            blocks.push({
              id, type: 'image',
              value: img.getAttribute('src') || '',
              caption: figcaption?.textContent || '',
            });
          }
        } else if (tagName === 'IMG') {
          blocks.push({
            id, type: 'image',
            value: el.getAttribute('src') || '',
            caption: el.getAttribute('alt') || '',
          });
        } else if (tagName === 'P') {
          let inner = el.innerHTML;
          inner = inner.replace(/<br\s*\/?>/gi, '\n');
          const temp = document.createElement('textarea');
          temp.innerHTML = inner;
          blocks.push({ id, type: 'text', value: temp.value });
        } else {
          blocks.push({ id, type: 'text', value: el.textContent || '' });
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

// ─── Highlight Color Options ──────────────────────────────────────────────────

const HIGHLIGHT_COLORS: { value: BlogBlock['highlightColor']; label: string; ring: string; bg: string }[] = [
  { value: 'blue',  label: 'Info',    ring: 'ring-blue-400',  bg: 'bg-blue-400'  },
  { value: 'green', label: 'Success', ring: 'ring-green-500', bg: 'bg-green-500' },
  { value: 'amber', label: 'Warning', ring: 'ring-amber-400', bg: 'bg-amber-400' },
  { value: 'rose',  label: 'Alert',   ring: 'ring-rose-500',  bg: 'bg-rose-500'  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BlogBuilder({ value, onChange }: BlogBuilderProps) {
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const parsedBlocks = deserializeHtmlToBlocks(value);
      setBlocks(parsedBlocks);
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  const updateParent = (updatedBlocks: BlogBlock[]) => {
    setBlocks(updatedBlocks);
    onChange(serializeBlocksToHtml(updatedBlocks));
  };

  const addBlock = (type: BlogBlock['type']) => {
    const newBlock: BlogBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      value: '',
      ...(type === 'image' ? { caption: '' } : {}),
      ...(type === 'highlight' ? { highlightColor: 'blue' } : {}),
    };
    updateParent([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    let newBlocks = blocks.filter((b) => b.id !== id);
    if (newBlocks.length === 0) {
      newBlocks = [{ id: `block-fallback-${Date.now()}`, type: 'text', value: '' }];
    }
    updateParent(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    updateParent(newBlocks);
  };

  const handleBlockChange = (id: string, fieldValue: string, fieldName: 'value' | 'caption' | 'highlightColor' = 'value') => {
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
      {/* ── Top Toolbar ── */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Article Builder</span>
          </div>
          <p className="text-[10px] text-slate-400 max-w-md leading-relaxed">
            Add paragraphs, headings, quotes, <strong>highlights</strong>, <strong>bullet points</strong>, or images. Use <strong>Up / Down</strong> arrows to reorder blocks.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {([
            { type: 'text',      icon: <Type className="h-3.5 w-3.5 text-sky-500" />,         label: '+ Paragraph'  },
            { type: 'heading',   icon: <Heading2 className="h-3.5 w-3.5 text-emerald-500" />,  label: '+ Heading'    },
            { type: 'highlight', icon: <Highlighter className="h-3.5 w-3.5 text-indigo-500" />,label: '+ Highlight'  },
            { type: 'pointwise', icon: <List className="h-3.5 w-3.5 text-violet-500" />,       label: '+ Points'     },
            { type: 'image',     icon: <ImageIcon className="h-3.5 w-3.5 text-rose-500" />,    label: '+ Image'      },
            { type: 'quote',     icon: <Quote className="h-3.5 w-3.5 text-amber-500" />,       label: '+ Quote'      },
          ] as { type: BlogBlock['type']; icon: React.ReactNode; label: string }[]).map(({ type, icon, label }) => (
            <Button
              key={type}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addBlock(type)}
              className="h-8 rounded-lg text-xs font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700"
            >
              {icon} {label}
            </Button>
          ))}
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
                {/* Heading */}
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

                {/* Text Paragraph */}
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

                {/* Quote */}
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

                {/* ── Highlight Block ── */}
                {block.type === 'highlight' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                      <Highlighter className="h-3 w-3" /> Highlight / Tip Card
                    </div>

                    {/* Color picker */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-semibold">Color:</span>
                      {HIGHLIGHT_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          title={c.label}
                          onClick={() => handleBlockChange(block.id, c.value!, 'highlightColor')}
                          className={`w-5 h-5 rounded-full ${c.bg} ring-2 ring-offset-1 transition-all ${
                            block.highlightColor === c.value ? c.ring : 'ring-transparent opacity-60 hover:opacity-100'
                          }`}
                        />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1 capitalize">
                        — {HIGHLIGHT_COLORS.find((c) => c.value === (block.highlightColor ?? 'blue'))?.label}
                      </span>
                    </div>

                    {/* Preview strip */}
                    {block.value && (
                      <div className={`rounded-xl px-4 py-2.5 border-l-4 text-xs font-medium leading-relaxed ${
                        block.highlightColor === 'green' ? 'bg-green-50 border-green-500 text-green-800' :
                        block.highlightColor === 'amber' ? 'bg-amber-50 border-amber-400 text-amber-800' :
                        block.highlightColor === 'rose'  ? 'bg-rose-50 border-rose-500 text-rose-800'   :
                                                           'bg-blue-50 border-blue-400 text-blue-800'
                      }`}>
                        ✦ {block.value}
                      </div>
                    )}

                    <textarea
                      placeholder="Write a tip, info note, or important highlight for readers..."
                      value={block.value}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      rows={2}
                      className="w-full flex min-h-[60px] rounded-xl border border-indigo-200 bg-indigo-50/20 px-3 py-2 text-sm text-slate-800 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
                    />
                  </div>
                )}

                {/* ── Pointwise Block ── */}
                {block.type === 'pointwise' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-500">
                      <List className="h-3 w-3" /> Bullet Point List
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Enter one item per line. Each line will become a separate bullet point.
                    </p>

                    {/* Live preview */}
                    {block.value.trim() && (
                      <div className="rounded-xl bg-violet-50/40 border border-violet-100 px-4 py-3 space-y-1.5">
                        {block.value.split('\n').filter((l) => l.trim()).map((line, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-violet-900">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <textarea
                      placeholder={`• Best time to visit: November to April\n• Entry fee: Free / LKR 500\n• Nearest town: Ella`}
                      value={block.value}
                      onChange={(e) => handleBlockChange(block.id, e.target.value)}
                      rows={5}
                      className="w-full flex min-h-[120px] rounded-xl border border-violet-200 bg-violet-50/10 px-3 py-2 text-sm text-slate-700 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    />
                  </div>
                )}

                {/* Image */}
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

      {/* ── Bottom Add Toolbar ── */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Add Block:</span>
        {([
          { type: 'text',      icon: <Type className="h-3.5 w-3.5" />,         label: 'Paragraph', hover: 'hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600'        },
          { type: 'heading',   icon: <Heading2 className="h-3.5 w-3.5" />,     label: 'Heading',   hover: 'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600' },
          { type: 'highlight', icon: <Highlighter className="h-3.5 w-3.5" />,  label: 'Highlight', hover: 'hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600'   },
          { type: 'pointwise', icon: <List className="h-3.5 w-3.5" />,         label: 'Points',    hover: 'hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600'   },
          { type: 'image',     icon: <ImageIcon className="h-3.5 w-3.5" />,    label: 'Image',     hover: 'hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600'       },
          { type: 'quote',     icon: <Quote className="h-3.5 w-3.5" />,        label: 'Quote',     hover: 'hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600'    },
        ] as { type: BlogBlock['type']; icon: React.ReactNode; label: string; hover: string }[]).map(({ type, icon, label, hover }) => (
          <button
            key={type}
            type="button"
            onClick={() => addBlock(type)}
            className={`p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 transition-colors flex items-center gap-1 text-xs font-semibold ${hover}`}
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}
