'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trash2, Type, Heading2, Image as ImageIcon, Quote,
  ChevronUp, ChevronDown, Sparkles, Highlighter, List,
  Minus, Table2, MousePointerClick, Copy, Clock, Save,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import { motion, AnimatePresence } from 'framer-motion';

export interface InfoTableRow { label: string; value: string; }

export interface BlogBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'quote' | 'highlight' | 'pointwise' | 'divider' | 'infotable' | 'cta';
  value: string;
  caption?: string;
  highlightColor?: 'blue' | 'green' | 'amber' | 'rose';
  tableRows?: InfoTableRow[];
  ctaLabel?: string;
  ctaUrl?: string;
  ctaColor?: 'rose' | 'slate' | 'emerald';
}

interface BlogBuilderProps {
  value: string;
  onChange: (htmlValue: string) => void;
  autoSaveKey?: string;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function countWords(blocks: BlogBlock[]): number {
  return blocks.reduce((acc, b) => {
    if (b.type === 'divider') return acc;
    if (b.type === 'infotable') {
      return acc + (b.tableRows?.reduce((a, r) => a + r.label.split(' ').length + r.value.split(' ').length, 0) ?? 0);
    }
    return acc + b.value.trim().split(/\s+/).filter(Boolean).length;
  }, 0);
}

export const serializeBlocksToHtml = (blocks: BlogBlock[]): string => {
  if (blocks.length === 0) return '';
  return blocks.map((block) => {
    const escapedVal = escapeHtml(block.value);
    switch (block.type) {
      case 'heading':
        return `<h2 class="text-2xl font-bold font-sans text-slate-800 mt-8 mb-4">${escapedVal}</h2>`;
      case 'quote':
        return `<blockquote class="border-l-4 border-rose-500 pl-4 py-2 my-6 italic text-slate-600 bg-slate-50 rounded-r-xl pr-4">${escapedVal}</blockquote>`;
      case 'divider':
        return `<hr class="divider-block my-8 border-0 border-t-2 border-dashed border-slate-200" />`;
      case 'image': {
        const cap = block.caption ? `<figcaption class="text-center text-xs text-slate-400 mt-2 font-medium">${escapeHtml(block.caption)}</figcaption>` : '';
        return `<figure class="my-8 flex flex-col items-center"><img src="${block.value}" alt="${escapeHtml(block.caption || '')}" class="rounded-3xl shadow-md max-h-[550px] w-full object-cover" />${cap}</figure>`;
      }
      case 'highlight': {
        const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
          blue:  { bg: 'bg-blue-50',  border: 'border-blue-400',  text: 'text-blue-800',  badge: 'bg-blue-400 text-white'  },
          green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', badge: 'bg-green-500 text-white' },
          amber: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-800', badge: 'bg-amber-400 text-white' },
          rose:  { bg: 'bg-rose-50',  border: 'border-rose-500',  text: 'text-rose-800',  badge: 'bg-rose-500 text-white'  },
        };
        const c = colorMap[block.highlightColor ?? 'blue'];
        return `<div class="highlight-block ${c.bg} border-l-4 ${c.border} rounded-r-2xl px-5 py-4 my-6 flex gap-3 items-start" data-highlight-color="${block.highlightColor ?? 'blue'}"><span class="inline-flex items-center shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${c.badge}">TIP</span><p class="${c.text} text-sm leading-relaxed">${escapedVal}</p></div>`;
      }
      case 'pointwise': {
        const liItems = block.value.split('\n').map(l => l.trim()).filter(Boolean)
          .map(line => `<li class="flex gap-2 items-start text-slate-700 text-sm"><span class="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-rose-500 block"></span><span>${escapeHtml(line)}</span></li>`)
          .join('\n');
        return `<ul class="pointwise-block my-6 space-y-2 pl-1" data-pointwise="true">\n${liItems}\n</ul>`;
      }
      case 'infotable': {
        const rows = (block.tableRows ?? []).filter(r => r.label.trim() || r.value.trim())
          .map(r => `<tr class="border-b border-slate-100 last:border-0"><td class="py-2.5 pr-4 text-xs font-bold text-slate-500 uppercase tracking-wide w-40 align-top">${escapeHtml(r.label)}</td><td class="py-2.5 text-sm text-slate-700">${escapeHtml(r.value)}</td></tr>`)
          .join('\n');
        return `<div class="infotable-block my-6 rounded-2xl border border-slate-200 overflow-hidden"><div class="bg-slate-50 px-5 py-3 border-b border-slate-200"><p class="text-xs font-bold text-slate-600 uppercase tracking-wider">Travel Info</p></div><table class="w-full px-5"><tbody class="divide-y divide-slate-100">${rows}</tbody></table></div>`;
      }
      case 'cta': {
        const colorMap2: Record<string, string> = {
          rose:    'background:#f43f5e;color:white;',
          slate:   'background:#1e293b;color:white;',
          emerald: 'background:#10b981;color:white;',
        };
        const style = colorMap2[block.ctaColor ?? 'rose'];
        return `<div class="cta-block my-8 flex justify-center" data-cta-color="${block.ctaColor ?? 'rose'}"><a href="${escapeHtml(block.ctaUrl ?? '#')}" class="cta-link inline-block px-8 py-3 rounded-2xl font-bold text-sm shadow-lg hover:opacity-90 transition-opacity" style="${style}" target="_blank" rel="noopener noreferrer">${escapeHtml(block.ctaLabel || 'Click Here')}</a></div>`;
      }
      case 'text':
      default: {
        const lines = escapedVal.split('\n').join('<br />');
        return `<p class="text-slate-600 leading-relaxed">${lines}</p>`;
      }
    }
  }).join('\n');
};

export const deserializeHtmlToBlocks = (html: string): BlogBlock[] => {
  if (!html) return [{ id: 'init-1', type: 'text', value: '' }];
  const trimmed = html.trim();
  if (!trimmed.startsWith('<') && !trimmed.includes('</')) {
    return [{ id: 'legacy-1', type: 'text', value: html }];
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blocks: BlogBlock[] = [];
    doc.body.childNodes.forEach((node, index) => {
      const id = `block-${index}-${Math.random().toString(36).substring(2, 9)}`;
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName.toUpperCase();
        if (tag === 'H2') {
          blocks.push({ id, type: 'heading', value: el.textContent || '' });
        } else if (tag === 'BLOCKQUOTE') {
          blocks.push({ id, type: 'quote', value: el.textContent || '' });
        } else if (tag === 'HR' && el.classList.contains('divider-block')) {
          blocks.push({ id, type: 'divider', value: '' });
        } else if (tag === 'DIV' && el.classList.contains('highlight-block')) {
          const color = (el.getAttribute('data-highlight-color') || 'blue') as BlogBlock['highlightColor'];
          const p = el.querySelector('p');
          blocks.push({ id, type: 'highlight', value: p?.textContent || '', highlightColor: color });
        } else if (tag === 'UL' && el.classList.contains('pointwise-block')) {
          const lines = Array.from(el.querySelectorAll('li')).map(li => {
            const spans = li.querySelectorAll('span');
            return spans.length >= 2 ? spans[1].textContent?.trim() || '' : li.textContent?.trim() || '';
          });
          blocks.push({ id, type: 'pointwise', value: lines.join('\n') });
        } else if (tag === 'DIV' && el.classList.contains('infotable-block')) {
          const rows: InfoTableRow[] = Array.from(el.querySelectorAll('tr')).map(tr => {
            const tds = tr.querySelectorAll('td');
            return { label: tds[0]?.textContent?.trim() || '', value: tds[1]?.textContent?.trim() || '' };
          });
          blocks.push({ id, type: 'infotable', value: '', tableRows: rows });
        } else if (tag === 'DIV' && el.classList.contains('cta-block')) {
          const a = el.querySelector('a');
          const color = (el.getAttribute('data-cta-color') || 'rose') as BlogBlock['ctaColor'];
          blocks.push({ id, type: 'cta', value: '', ctaLabel: a?.textContent?.trim() || 'Click Here', ctaUrl: a?.getAttribute('href') || '', ctaColor: color });
        } else if (tag === 'FIGURE') {
          const img = el.querySelector('img');
          const figcaption = el.querySelector('figcaption');
          if (img) blocks.push({ id, type: 'image', value: img.getAttribute('src') || '', caption: figcaption?.textContent || '' });
        } else if (tag === 'P') {
          let inner = el.innerHTML.replace(/<br\s*\/?>/gi, '\n');
          const tmp = document.createElement('textarea');
          tmp.innerHTML = inner;
          blocks.push({ id, type: 'text', value: tmp.value });
        } else {
          blocks.push({ id, type: 'text', value: el.textContent || '' });
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        blocks.push({ id, type: 'text', value: node.textContent });
      }
    });
    return blocks.length === 0 ? [{ id: 'init-2', type: 'text', value: '' }] : blocks;
  } catch {
    return [{ id: 'err-parse', type: 'text', value: html }];
  }
};

const HIGHLIGHT_COLORS: { value: BlogBlock['highlightColor']; label: string; ring: string; bg: string }[] = [
  { value: 'blue',  label: 'Info',    ring: 'ring-blue-400',  bg: 'bg-blue-400'  },
  { value: 'green', label: 'Success', ring: 'ring-green-500', bg: 'bg-green-500' },
  { value: 'amber', label: 'Warning', ring: 'ring-amber-400', bg: 'bg-amber-400' },
  { value: 'rose',  label: 'Alert',   ring: 'ring-rose-500',  bg: 'bg-rose-500'  },
];

const CTA_COLORS: { value: BlogBlock['ctaColor']; label: string; cls: string }[] = [
  { value: 'rose',    label: 'Rose',  cls: 'bg-rose-500 text-white'    },
  { value: 'slate',   label: 'Dark',  cls: 'bg-slate-800 text-white'   },
  { value: 'emerald', label: 'Green', cls: 'bg-emerald-500 text-white' },
];

const BLOCK_MENU: { type: BlogBlock['type']; icon: React.ReactNode; label: string; color: string; hoverCls: string }[] = [
  { type: 'text',      icon: React.createElement(Type, {className:"h-3.5 w-3.5"}),              label: 'Paragraph',  color: 'text-sky-500',     hoverCls: 'hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600'        },
  { type: 'heading',   icon: React.createElement(Heading2, {className:"h-3.5 w-3.5"}),          label: 'Heading',    color: 'text-emerald-500', hoverCls: 'hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600' },
  { type: 'highlight', icon: React.createElement(Highlighter, {className:"h-3.5 w-3.5"}),       label: 'Highlight',  color: 'text-indigo-500',  hoverCls: 'hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600' },
  { type: 'pointwise', icon: React.createElement(List, {className:"h-3.5 w-3.5"}),              label: 'Points',     color: 'text-violet-500',  hoverCls: 'hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600' },
  { type: 'infotable', icon: React.createElement(Table2, {className:"h-3.5 w-3.5"}),            label: 'Info Table', color: 'text-teal-500',    hoverCls: 'hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600'      },
  { type: 'cta',       icon: React.createElement(MousePointerClick, {className:"h-3.5 w-3.5"}), label: 'CTA Button', color: 'text-pink-500',    hoverCls: 'hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600'      },
  { type: 'image',     icon: React.createElement(ImageIcon, {className:"h-3.5 w-3.5"}),         label: 'Image',      color: 'text-rose-500',    hoverCls: 'hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600'      },
  { type: 'quote',     icon: React.createElement(Quote, {className:"h-3.5 w-3.5"}),             label: 'Quote',      color: 'text-amber-500',   hoverCls: 'hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600'   },
  { type: 'divider',   icon: React.createElement(Minus, {className:"h-3.5 w-3.5"}),             label: 'Divider',    color: 'text-slate-400',   hoverCls: 'hover:bg-slate-100 hover:border-slate-300 hover:text-slate-600'  },
];

export default function BlogBuilder({ value, onChange, autoSaveKey }: BlogBuilderProps) {
  const [blocks, setBlocks] = useState<BlogBlock[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const STORAGE_KEY = autoSaveKey ? `blog-draft-${autoSaveKey}` : null;

  useEffect(() => {
    if (!isInitialized) {
      let parsed: BlogBlock[] | null = null;
      if (STORAGE_KEY) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) parsed = JSON.parse(stored);
        } catch {}
      }
      setBlocks(parsed ?? deserializeHtmlToBlocks(value));
      setIsInitialized(true);
    }
  }, [value, isInitialized, STORAGE_KEY]);

  const triggerAutoSave = useCallback((updatedBlocks: BlogBlock[]) => {
    if (!STORAGE_KEY) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    setAutoSaveStatus('saving');
    autoSaveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlocks));
        setAutoSaveStatus('saved');
        setTimeout(() => setAutoSaveStatus('idle'), 2500);
      } catch {}
    }, 1800);
  }, [STORAGE_KEY]);

  const clearDraft = () => {
    if (STORAGE_KEY) localStorage.removeItem(STORAGE_KEY);
    setAutoSaveStatus('idle');
  };

  const updateParent = (updatedBlocks: BlogBlock[]) => {
    setBlocks(updatedBlocks);
    onChange(serializeBlocksToHtml(updatedBlocks));
    triggerAutoSave(updatedBlocks);
  };

  const addBlock = (type: BlogBlock['type']) => {
    const defaults: Partial<BlogBlock> = {
      ...(type === 'image'     ? { caption: '' } : {}),
      ...(type === 'highlight' ? { highlightColor: 'blue' } : {}),
      ...(type === 'infotable' ? { tableRows: [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }] } : {}),
      ...(type === 'cta'       ? { ctaLabel: 'Book Now', ctaUrl: '', ctaColor: 'rose' } : {}),
    };
    const newBlock: BlogBlock = { id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, type, value: '', ...defaults };
    updateParent([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    let nb = blocks.filter(b => b.id !== id);
    if (nb.length === 0) nb = [{ id: `block-fallback-${Date.now()}`, type: 'text', value: '' }];
    updateParent(nb);
  };

  const duplicateBlock = (index: number) => {
    const src = blocks[index];
    const clone: BlogBlock = { ...src, id: `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, tableRows: src.tableRows ? src.tableRows.map(r => ({ ...r })) : undefined };
    const nb = [...blocks];
    nb.splice(index + 1, 0, clone);
    updateParent(nb);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;
    const nb = [...blocks];
    const ti = direction === 'up' ? index - 1 : index + 1;
    [nb[index], nb[ti]] = [nb[ti], nb[index]];
    updateParent(nb);
  };

  const handleBlockChange = (id: string, fieldValue: string, fieldName: 'value' | 'caption' | 'highlightColor' | 'ctaLabel' | 'ctaUrl' | 'ctaColor' = 'value') => {
    updateParent(blocks.map(b => b.id === id ? { ...b, [fieldName]: fieldValue } : b));
  };

  const handleTableRowChange = (blockId: string, rowIndex: number, field: 'label' | 'value', val: string) => {
    updateParent(blocks.map(b => {
      if (b.id !== blockId) return b;
      const rows = [...(b.tableRows ?? [])];
      rows[rowIndex] = { ...rows[rowIndex], [field]: val };
      return { ...b, tableRows: rows };
    }));
  };

  const addTableRow = (blockId: string) => {
    updateParent(blocks.map(b => b.id !== blockId ? b : { ...b, tableRows: [...(b.tableRows ?? []), { label: '', value: '' }] }));
  };

  const removeTableRow = (blockId: string, rowIndex: number) => {
    updateParent(blocks.map(b => {
      if (b.id !== blockId) return b;
      const rows = (b.tableRows ?? []).filter((_, i) => i !== rowIndex);
      return { ...b, tableRows: rows.length === 0 ? [{ label: '', value: '' }] : rows };
    }));
  };

  const wordCount = countWords(blocks);
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center p-8 border border-slate-100 rounded-2xl bg-slate-50">
        <span className="text-sm text-slate-500 font-semibold">Loading editor builder...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Article Builder</span>
            </div>
            <p className="text-[10px] text-slate-400 max-w-md leading-relaxed">
              Add blocks below. Use <strong>arrows</strong> to reorder, <strong>Copy</strong> to duplicate, <strong>X</strong> to delete.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px] font-semibold text-slate-600">{wordCount} words &middot; {readingTime} min read</span>
            </div>
            {STORAGE_KEY && (
              <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${
                autoSaveStatus === 'saved'  ? 'bg-green-50 text-green-700 border border-green-200' :
                autoSaveStatus === 'saving' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                             'bg-white text-slate-400 border border-slate-200'
              }`}>
                {autoSaveStatus === 'saved' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                {autoSaveStatus === 'saved' ? 'Draft Saved' : autoSaveStatus === 'saving' ? 'Saving...' : 'Auto-Save On'}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200/70">
          {BLOCK_MENU.map(({ type, icon, label, color }) => (
            <Button key={type} type="button" variant="outline" size="sm" onClick={() => addBlock(type)}
              className="h-7 rounded-lg text-[11px] font-bold gap-1 bg-white hover:bg-slate-100 text-slate-700 px-2.5">
              <span className={color}>{icon}</span> {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 min-h-[150px]">
        <AnimatePresence initial={false}>
          {blocks.map((block, index) => (
            <motion.div key={block.id} layoutId={block.id}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="group relative bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-sm hover:shadow transition-all flex gap-4">

              <div className="flex flex-col items-center gap-0.5 justify-center self-stretch border-r border-slate-100 pr-3">
                <button type="button" onClick={() => moveBlock(index, 'up')} disabled={index === 0}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-20" title="Move Up">
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] font-bold text-slate-300 select-none">{index + 1}</span>
                <button type="button" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-20" title="Move Down">
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex-1 space-y-3 min-w-0">
                {block.type === 'heading' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                      <Heading2 className="h-3 w-3" /> Heading Section
                    </div>
                    <Input type="text" placeholder="Enter section heading title..." value={block.value}
                      onChange={e => handleBlockChange(block.id, e.target.value)}
                      className="rounded-xl border-slate-200 text-slate-800 font-bold text-base md:text-lg h-11 focus-visible:ring-emerald-500" />
                  </div>
                )}
                {block.type === 'text' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-500">
                      <Type className="h-3 w-3" /> Text Paragraph
                    </div>
                    <textarea placeholder="Write your story, tips or description here..." value={block.value}
                      onChange={e => handleBlockChange(block.id, e.target.value)} rows={4}
                      className="w-full flex min-h-[100px] rounded-xl border border-slate-200 bg-background px-3 py-2 text-sm text-slate-700 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2" />
                  </div>
                )}
                {block.type === 'quote' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                      <Quote className="h-3 w-3" /> Quote / Callout
                    </div>
                    <textarea placeholder="Enter a quote or callout text..." value={block.value}
                      onChange={e => handleBlockChange(block.id, e.target.value)} rows={2}
                      className="w-full flex min-h-[60px] rounded-xl border border-amber-200 bg-amber-50/20 px-3 py-2 text-sm text-slate-800 italic leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2" />
                  </div>
                )}
                {block.type === 'divider' && (
                  <div className="flex items-center gap-3 py-2">
                    <Minus className="h-4 w-4 text-slate-300 shrink-0" />
                    <div className="flex-1 border-t-2 border-dashed border-slate-200" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider shrink-0">Section Divider</span>
                    <div className="flex-1 border-t-2 border-dashed border-slate-200" />
                  </div>
                )}
                {block.type === 'highlight' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                      <Highlighter className="h-3 w-3" /> Highlight / Tip Card
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-semibold">Color:</span>
                      {HIGHLIGHT_COLORS.map(c => (
                        <button key={c.value} type="button" title={c.label}
                          onClick={() => handleBlockChange(block.id, c.value!, 'highlightColor')}
                          className={`w-5 h-5 rounded-full ${c.bg} ring-2 ring-offset-1 transition-all ${block.highlightColor === c.value ? c.ring : 'ring-transparent opacity-60 hover:opacity-100'}`} />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">- {HIGHLIGHT_COLORS.find(c => c.value === (block.highlightColor ?? 'blue'))?.label}</span>
                    </div>
                    {block.value && (
                      <div className={`rounded-xl px-4 py-2.5 border-l-4 text-xs font-medium leading-relaxed ${
                        block.highlightColor === 'green' ? 'bg-green-50 border-green-500 text-green-800' :
                        block.highlightColor === 'amber' ? 'bg-amber-50 border-amber-400 text-amber-800' :
                        block.highlightColor === 'rose'  ? 'bg-rose-50 border-rose-500 text-rose-800' :
                                                           'bg-blue-50 border-blue-400 text-blue-800'}`}>
                        {block.value}
                      </div>
                    )}
                    <textarea placeholder="Write a tip, info note, or important highlight..." value={block.value}
                      onChange={e => handleBlockChange(block.id, e.target.value)} rows={2}
                      className="w-full flex min-h-[60px] rounded-xl border border-indigo-200 bg-indigo-50/20 px-3 py-2 text-sm text-slate-800 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2" />
                  </div>
                )}
                {block.type === 'pointwise' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-500">
                      <List className="h-3 w-3" /> Bullet Point List
                    </div>
                    <p className="text-[10px] text-slate-400">One item per line. Each line becomes a bullet point.</p>
                    {block.value.trim() && (
                      <div className="rounded-xl bg-violet-50/40 border border-violet-100 px-4 py-3 space-y-1.5">
                        {block.value.split('\n').filter(l => l.trim()).map((line, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-violet-900">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <textarea placeholder={"Best time: November to April\nEntry fee: Free / LKR 500\nNearest town: Ella"}
                      value={block.value} onChange={e => handleBlockChange(block.id, e.target.value)} rows={5}
                      className="w-full flex min-h-[120px] rounded-xl border border-violet-200 bg-violet-50/10 px-3 py-2 text-sm text-slate-700 leading-relaxed placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2" />
                  </div>
                )}
                {block.type === 'infotable' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-teal-500">
                      <Table2 className="h-3 w-3" /> Travel Info Table
                    </div>
                    <div className="rounded-xl border border-slate-200 overflow-hidden">
                      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Travel Info Preview</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {(block.tableRows ?? []).map((row, ri) => (
                          <div key={ri} className="flex gap-2 items-center px-3 py-2">
                            <Input placeholder="Label (e.g. Best Time)" value={row.label}
                              onChange={e => handleTableRowChange(block.id, ri, 'label', e.target.value)}
                              className="h-8 text-xs rounded-lg border-slate-200 w-36 shrink-0 font-semibold" />
                            <span className="text-slate-300 text-sm">:</span>
                            <Input placeholder="Value (e.g. Nov - Apr)" value={row.value}
                              onChange={e => handleTableRowChange(block.id, ri, 'value', e.target.value)}
                              className="h-8 text-xs rounded-lg border-slate-200 flex-1" />
                            <button type="button" onClick={() => removeTableRow(block.id, ri)}
                              className="p-1 text-slate-300 hover:text-red-400 transition-colors shrink-0">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="px-3 py-2 bg-slate-50/50 border-t border-slate-100">
                        <button type="button" onClick={() => addTableRow(block.id)}
                          className="text-[11px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                          + Add Row
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {block.type === 'cta' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-pink-500">
                      <MousePointerClick className="h-3 w-3" /> CTA Button
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Button Label</span>
                        <Input placeholder="e.g. Book Now" value={block.ctaLabel || ''}
                          onChange={e => handleBlockChange(block.id, e.target.value, 'ctaLabel')}
                          className="h-9 text-sm rounded-xl border-slate-200" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-semibold">Link URL</span>
                        <Input placeholder="https://..." value={block.ctaUrl || ''}
                          onChange={e => handleBlockChange(block.id, e.target.value, 'ctaUrl')}
                          className="h-9 text-sm rounded-xl border-slate-200" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Color:</span>
                      {CTA_COLORS.map(c => (
                        <button key={c.value} type="button" onClick={() => handleBlockChange(block.id, c.value!, 'ctaColor')}
                          className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${c.cls} ${block.ctaColor === c.value ? 'ring-2 ring-offset-1 ring-slate-400 scale-105' : 'opacity-60 hover:opacity-90'}`}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center py-2">
                      <div className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow cursor-default ${
                        block.ctaColor === 'slate'   ? 'bg-slate-800 text-white' :
                        block.ctaColor === 'emerald' ? 'bg-emerald-500 text-white' :
                                                       'bg-rose-500 text-white'}`}>
                        {block.ctaLabel || 'Book Now'} &rarr;
                      </div>
                    </div>
                  </div>
                )}
                {block.type === 'image' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      <ImageIcon className="h-3 w-3" /> Inline Image
                    </div>
                    <ImageUpload value={block.value} onChange={val => handleBlockChange(block.id, val)} placeholder="Upload image or paste image link" />
                    {block.value && (
                      <Input type="text" placeholder="Image caption (e.g. Scenic view of Ella Rock)"
                        value={block.caption || ''} onChange={e => handleBlockChange(block.id, e.target.value, 'caption')}
                        className="rounded-xl border-slate-200 text-xs h-9" />
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-1 self-start pl-1 shrink-0">
                <button type="button" onClick={() => duplicateBlock(index)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Duplicate Block">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => removeBlock(block.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete Block">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Add Block:</span>
        {BLOCK_MENU.map(({ type, icon, label, hoverCls }) => (
          <button key={type} type="button" onClick={() => addBlock(type)}
            className={`p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 transition-colors flex items-center gap-1 text-xs font-semibold ${hoverCls}`}>
            {icon} {label}
          </button>
        ))}
      </div>

      {STORAGE_KEY && autoSaveStatus !== 'idle' && (
        <div className="flex justify-end">
          <button type="button" onClick={clearDraft} className="text-[11px] text-slate-400 hover:text-rose-500 underline transition-colors">
            Clear saved draft
          </button>
        </div>
      )}
    </div>
  );
}
