import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ZoomIn, 
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';

interface PhotoCardProps {
  item: GalleryItem;
  index: number;
  onSelect: (item: GalleryItem) => void;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  item,
  index,
  onSelect,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  isDragOver,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      onDragEnd={onDragEnd}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(item)}
      className={`group relative cursor-grab active:cursor-grabbing rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border transition-all duration-300 shadow-lg select-none flex-1 min-w-[280px] sm:min-w-[340px] max-w-[460px] aspect-[4/3] ${
        isDragging 
          ? 'opacity-30 scale-95 border-amber-500 ring-2 ring-amber-500/50' 
          : isDragOver
          ? 'border-amber-400 scale-[1.04] ring-4 ring-amber-500/40 z-10'
          : 'border-slate-800 hover:border-red-500/60 hover:shadow-xl'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, border-color 0.2s, box-shadow 0.2s, opacity 0.2s',
      }}
    >
      <img
        src={item.src}
        alt=""
        className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
      {/* Subtle hover inspect icon overlay - ZERO text */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
        <div className="p-3.5 rounded-full bg-red-600/90 text-white shadow-2xl backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
          <Maximize2 className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    const nextItems = [...items];
    const [moved] = nextItems.splice(draggedIndex, 1);
    nextItems.splice(targetIndex, 0, moved);
    setItems(nextItems);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem, items]);

  const navigateLightbox = (direction: number) => {
    if (!activeItem || items.length === 0) return;
    const currentIndex = items.findIndex((i) => i.id === activeItem.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = items.length - 1;
    if (nextIndex >= items.length) nextIndex = 0;
    setActiveItem(items[nextIndex]);
    setIsZoomed(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            District Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Click any photograph to inspect in high-resolution.
          </p>
        </div>

        {/* FLUID FLEX GALLERY GRID */}
        <div className="flex flex-wrap gap-5 sm:gap-6 justify-center">
          {items.map((item, idx) => (
            <PhotoCard
              key={item.id}
              item={item}
              index={idx}
              onSelect={(selected) => {
                setActiveItem(selected);
                setIsZoomed(false);
              }}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === idx}
              isDragOver={dragOverIndex === idx}
            />
          ))}
        </div>

        {/* ======================================================== */}
        {/* PURE IMAGE FULL-SCREEN LIGHTBOX MODAL (ZERO WORDS)       */}
        {/* ======================================================== */}
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6">
            
            {/* Minimal Floating Action Icons - NO WORDS */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-30">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                title="Toggle Zoom"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-all shadow-xl"
              >
                {isZoomed ? <ZoomOut className="w-5 h-5 text-amber-400" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              <a
                href={activeItem.src}
                download
                title="Download Photo"
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-all shadow-xl"
              >
                <Download className="w-5 h-5" />
              </a>
              <button
                onClick={() => {
                  setActiveItem(null);
                  setIsZoomed(false);
                }}
                title="Close"
                className="p-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all shadow-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav Chevron */}
            <button
              onClick={() => navigateLightbox(-1)}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700/80 transition-all shadow-2xl"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Chevron */}
            <button
              onClick={() => navigateLightbox(1)}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white border border-slate-700/80 transition-all shadow-2xl"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pure High-Resolution Image Container - ZERO WORDS */}
            <div className="w-full max-w-6xl max-h-[92vh] flex items-center justify-center p-2 sm:p-4">
              <div 
                className={`relative max-h-[88vh] overflow-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <img
                  src={activeItem.src}
                  alt=""
                  className="max-h-[88vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl select-none"
                />
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
