import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ZoomIn, 
  ZoomOut,
  Maximize2,
  LayoutGrid,
  MoveHorizontal,
  RotateCcw,
  Sparkles
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
  isStreamMode?: boolean;
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
  isStreamMode = false,
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
      className={`group relative cursor-grab active:cursor-grabbing rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border transition-all duration-300 shadow-xl select-none ${
        isStreamMode 
          ? 'flex-shrink-0 w-72 sm:w-96 aspect-[4/3]' 
          : 'flex-1 min-w-[280px] sm:min-w-[340px] max-w-[460px] aspect-[4/3]'
      } ${
        isDragging 
          ? 'opacity-30 scale-95 border-amber-500 ring-2 ring-amber-500/50' 
          : isDragOver
          ? 'border-amber-400 scale-[1.04] ring-4 ring-amber-500/40 z-10'
          : 'border-slate-800/80 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-950/40'
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'flex' | 'stream'>('flex');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Movable horizontal stream drag-to-scroll refs
  const ribbonRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Filter gallery items based on category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

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
    
    // Find the actual global indices in `items`
    const sourceItem = filteredItems[draggedIndex];
    const targetItem = filteredItems[targetIndex];
    const sourceGlobalIdx = items.findIndex(i => i.id === sourceItem.id);
    const targetGlobalIdx = items.findIndex(i => i.id === targetItem.id);

    if (sourceGlobalIdx !== -1 && targetGlobalIdx !== -1) {
      const nextItems = [...items];
      const [moved] = nextItems.splice(sourceGlobalIdx, 1);
      nextItems.splice(targetGlobalIdx, 0, moved);
      setItems(nextItems);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleResetOrder = () => {
    setItems(GALLERY_ITEMS);
    setSelectedCategory('all');
  };

  // Movable ribbon drag-to-scroll handlers
  const handleRibbonMouseDown = (e: React.MouseEvent) => {
    if (!ribbonRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - ribbonRef.current.offsetLeft);
    setScrollLeftState(ribbonRef.current.scrollLeft);
  };

  const handleRibbonMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleRibbonMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !ribbonRef.current) return;
    e.preventDefault();
    const x = e.pageX - ribbonRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    ribbonRef.current.scrollLeft = scrollLeftState - walk;
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
  }, [activeItem, filteredItems]);

  const navigateLightbox = (direction: number) => {
    if (!activeItem || filteredItems.length === 0) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    setActiveItem(filteredItems[nextIndex]);
    setIsZoomed(false);
  };

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'action', label: 'Frontline Action' },
    { id: 'apparatus', label: 'Apparatus & Fleet' },
    { id: 'historic', label: 'Historic Archive' },
    { id: 'community', label: 'Training & Drills' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-600/40 text-red-300 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Movable Photo Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            District Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Drag to rearrange photos • Move your cursor for 3D tilt • Click any photo for full-screen inspection
          </p>
        </div>

        {/* Minimal Control Bar: Category Filters & Movable Layout Toggle */}
        <div className="glass-panel rounded-2xl p-3 sm:p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/40 border border-red-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Movable View Modes & Reset Order Action */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('flex')}
                title="Fluid Flex Grid"
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'flex'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Flex Grid</span>
              </button>
              <button
                onClick={() => setViewMode('stream')}
                title="Movable Draggable Ribbon"
                className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'stream'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MoveHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Movable Stream</span>
              </button>
            </div>

            <button
              onClick={handleResetOrder}
              title="Reset Photo Order"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all flex items-center gap-1 text-xs font-bold"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* VIEW 1: FLUID FLEX GALLERY (ZERO WORDS, DRAGGABLE 3D)    */}
        {/* ======================================================== */}
        {viewMode === 'flex' && (
          <div className="flex flex-wrap gap-5 sm:gap-6 justify-center">
            {filteredItems.map((item, idx) => (
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
                isStreamMode={false}
              />
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: MOVABLE DRAGGABLE STREAM (KINETIC DRAG-TO-SLIDE) */}
        {/* ======================================================== */}
        {viewMode === 'stream' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Click and drag horizontally to slide through images</span>
              </span>
              <span>Showing {filteredItems.length} photos</span>
            </div>

            <div
              ref={ribbonRef}
              onMouseDown={handleRibbonMouseDown}
              onMouseLeave={handleRibbonMouseLeaveOrUp}
              onMouseUp={handleRibbonMouseLeaveOrUp}
              onMouseMove={handleRibbonMouseMove}
              className={`flex gap-6 overflow-x-auto pb-6 pt-2 px-2 scrollbar-none cursor-grab active:cursor-grabbing select-none ${
                isMouseDown ? 'cursor-grabbing' : ''
              }`}
              style={{ scrollBehavior: isMouseDown ? 'auto' : 'smooth' }}
            >
              {filteredItems.map((item, idx) => (
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
                  isStreamMode={true}
                />
              ))}
            </div>
          </div>
        )}

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
