import React, { useState, useRef, useEffect } from 'react';
import { Sun, Sunrise, Moon, ChevronDown, Check } from 'lucide-react';
import { useTheme, THEME_OPTIONS, type ThemeMode } from '../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentTheme = THEME_OPTIONS.find(t => t.id === theme) || THEME_OPTIONS[0];

  const getIcon = (id: ThemeMode) => {
    switch (id) {
      case 'civic-light':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'warm-light':
        return <Sunrise className="w-4 h-4 text-orange-500" />;
      case 'midnight-dark':
        return <Moon className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[44px] inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border app-surface app-border shadow-sm hover:brightness-105 active:scale-95"
        title="Change Color Theme Variation"
        aria-label="Toggle theme variations"
        aria-expanded={isOpen}
      >
        {getIcon(theme)}
        <span className="hidden sm:inline font-semibold">{currentTheme.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl app-surface app-border shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5 border-b app-border mb-1">
            Color Theme Variations
          </div>

          <div className="space-y-1">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`min-h-[44px] w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-red-600/10 text-red-600 dark:text-red-400 font-bold border border-red-500/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: opt.bgPreview }}
                    >
                      <div 
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: opt.primaryColor }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {opt.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                        {opt.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
