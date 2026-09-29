import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'civic-light' | 'warm-light' | 'midnight-dark';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  label: string;
  description: string;
  primaryColor: string;
  bgPreview: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'civic-light',
    name: 'Civic Light',
    label: 'Clean Light',
    description: 'Authoritative municipal white & slate with firehouse red',
    primaryColor: '#b91c1c',
    bgPreview: '#f8fafc',
  },
  {
    id: 'warm-light',
    name: 'Warm Slate',
    label: 'Warm Light',
    description: 'Soft stone background with rich charcoal & cardinal red',
    primaryColor: '#c2410c',
    bgPreview: '#faf8f5',
  },
  {
    id: 'midnight-dark',
    name: 'Midnight Dark',
    label: 'Midnight Dark',
    description: 'Deep navy-slate background with vibrant amber & red',
    primaryColor: '#dc2626',
    bgPreview: '#0b0f19',
  },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'civic-light',
  setTheme: () => {},
  isLight: true,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dcfd4_theme') as ThemeMode;
      if (saved && ['civic-light', 'warm-light', 'midnight-dark'].includes(saved)) {
        return saved;
      }
    }
    return 'civic-light'; // Default is crisp civic light
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('dcfd4_theme', newTheme);
    } catch (_) {}
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'midnight-dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  const isLight = theme !== 'midnight-dark';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
