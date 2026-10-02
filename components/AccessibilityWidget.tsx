import React, { useState, useEffect, useRef } from 'react';
import { Sun, Monitor, RefreshCw, X, Accessibility, Eye, Moon, MoveVertical, MoveHorizontal, BookOpen, Type, Check } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';

// Default constants for reset
const DEFAULT_FONT_SIZE = 100;
const DEFAULT_LINE_SPACING = 1.5;
const DEFAULT_LETTER_SPACING = 0;

export const AccessibilityWidget: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Helper to get safe values from localStorage with strong generic typing
  const getStored = <T,>(key: string, def: T): T => {
    if (typeof window === 'undefined') return def;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : def;
    } catch {
      return def;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // State with persistence initialization
  const [fontSize, setFontSize] = useState<number>(() => getStored<number>('acc_fontSize', DEFAULT_FONT_SIZE));
  const [isGrayscale, setIsGrayscale] = useState<boolean>(() => getStored<boolean>('acc_grayscale', false));
  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => getStored<boolean>('acc_contrast', false));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getStored<boolean>('acc_darkmode', false));
  const [lineSpacing, setLineSpacing] = useState<number>(() => getStored<number>('acc_lineSpacing', DEFAULT_LINE_SPACING));
  const [letterSpacing, setLetterSpacing] = useState<number>(() => getStored<number>('acc_letterSpacing', DEFAULT_LETTER_SPACING));
  const [isReadMode, setIsReadMode] = useState<boolean>(() => getStored<boolean>('acc_readMode', false));

  // Persist state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('acc_fontSize', JSON.stringify(fontSize));
      localStorage.setItem('acc_grayscale', JSON.stringify(isGrayscale));
      localStorage.setItem('acc_contrast', JSON.stringify(isHighContrast));
      localStorage.setItem('acc_darkmode', JSON.stringify(isDarkMode));
      localStorage.setItem('acc_lineSpacing', JSON.stringify(lineSpacing));
      localStorage.setItem('acc_letterSpacing', JSON.stringify(letterSpacing));
      localStorage.setItem('acc_readMode', JSON.stringify(isReadMode));
    } catch {
      // Ignore storage errors
    }
  }, [fontSize, isGrayscale, isHighContrast, isDarkMode, lineSpacing, letterSpacing, isReadMode]);

  // Apply Visual Changes to Root Element and CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply Font Size
    if (fontSize === DEFAULT_FONT_SIZE) {
      root.style.removeProperty('font-size');
    } else {
      root.style.fontSize = `${fontSize}%`;
    }

    // Apply Filters (Grayscale / Contrast)
    const filters: string[] = [];
    if (isGrayscale) filters.push('grayscale(100%)');
    if (isHighContrast) filters.push('contrast(150%)');

    if (filters.length > 0) {
      root.style.filter = filters.join(' ');
    } else {
      root.style.removeProperty('filter');
    }

    // Apply Dark Mode class
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply Line Spacing and Letter Spacing via CSS custom properties on root
    root.style.setProperty('--app-line-height', `${lineSpacing}`);
    root.style.setProperty('--app-letter-spacing', `${letterSpacing}em`);

    // Apply Read Mode class on body
    if (isReadMode) {
      body.classList.add('read-mode');
    } else {
      body.classList.remove('read-mode');
    }

  }, [fontSize, isGrayscale, isHighContrast, isDarkMode, lineSpacing, letterSpacing, isReadMode]);

  // Keyboard accessibility: Close on Escape & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const resetSettings = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    setIsGrayscale(false);
    setIsHighContrast(false);
    setIsDarkMode(false);
    setLineSpacing(DEFAULT_LINE_SPACING);
    setLetterSpacing(DEFAULT_LETTER_SPACING);
    setIsReadMode(false);

    try {
      localStorage.removeItem('acc_fontSize');
      localStorage.removeItem('acc_grayscale');
      localStorage.removeItem('acc_contrast');
      localStorage.removeItem('acc_darkmode');
      localStorage.removeItem('acc_lineSpacing');
      localStorage.removeItem('acc_letterSpacing');
      localStorage.removeItem('acc_readMode');
    } catch {
      // Ignore
    }

    const root = document.documentElement;
    root.style.removeProperty('font-size');
    root.style.removeProperty('filter');
    root.style.removeProperty('--app-line-height');
    root.style.removeProperty('--app-letter-spacing');
    root.classList.remove('dark');
    document.body.classList.remove('read-mode');
  };

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-[100] flex flex-col ${isRTL ? 'items-start' : 'items-end'} gap-4 print:hidden`}>
      <div
        id="accessibility-menu"
        ref={dialogRef}
        className={`bg-white dark:bg-neutral-800 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-700 w-80 overflow-hidden transition-all duration-300 ${
          isRTL ? 'origin-bottom-left' : 'origin-bottom-right'
        } ${
          isOpen ? 'opacity-100 scale-100 mb-2' : 'opacity-0 scale-90 pointer-events-none h-0 mb-0'
        }`}
        role="dialog"
        aria-labelledby="a11y-dialog-title"
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-neutral-900 text-white flex justify-between items-center">
          <span id="a11y-dialog-title" className={`font-bold uppercase tracking-wider text-sm flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
            <Accessibility className="w-5 h-5 text-gold" aria-hidden="true" />
            {t('a11y.widget_title')}
          </span>
          <button
            onClick={() => {
              setIsOpen(false);
              triggerRef.current?.focus();
            }}
            className="hover:text-gold transition-colors p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={t('a11y.close_menu')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">

          {/* Display Section */}
          <div>
            <label className={`text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
              <Monitor className="w-3.5 h-3.5" aria-hidden="true" /> {t('a11y.display')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex flex-col items-center justify-center p-3 rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isDarkMode
                    ? 'bg-primary text-white border-primary shadow-inner font-bold'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:border-primary'
                }`}
                aria-pressed={isDarkMode}
              >
                <Moon className="w-5 h-5 mb-1" aria-hidden="true" />
                <span className={`text-[11px] uppercase ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('a11y.dark_mode')}</span>
              </button>
              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`flex flex-col items-center justify-center p-3 rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isHighContrast
                    ? 'bg-primary text-white border-primary shadow-inner font-bold'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:border-primary'
                }`}
                aria-pressed={isHighContrast}
              >
                <Sun className="w-5 h-5 mb-1" aria-hidden="true" />
                <span className={`text-[11px] uppercase ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('a11y.contrast')}</span>
              </button>
              <button
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`flex flex-col items-center justify-center p-3 rounded border transition-all col-span-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isGrayscale
                    ? 'bg-primary text-white border-primary shadow-inner font-bold'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:border-primary'
                }`}
                aria-pressed={isGrayscale}
              >
                <Monitor className="w-5 h-5 mb-1" aria-hidden="true" />
                <span className={`text-[11px] uppercase ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('a11y.grayscale')}</span>
              </button>
            </div>
          </div>

          {/* Typography Section */}
          <div>
            <label className={`text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
              <Type className="w-3.5 h-3.5" aria-hidden="true" /> {t('a11y.typography')}
            </label>
            <div className="space-y-3">
              {/* Font Size */}
              <div className="flex items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-700/60 p-2.5 rounded-md">
                 <span className={`text-[11px] font-bold uppercase text-neutral-600 dark:text-neutral-300 w-16 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('a11y.font_size')}</span>
                 <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFontSize(Math.max(80, fontSize - 10))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Decrease Font Size"
                    >
                      A-
                    </button>
                    <span className="text-xs font-bold w-12 text-center dark:text-white tabular-nums">{fontSize}%</span>
                    <button
                      onClick={() => setFontSize(Math.min(150, fontSize + 10))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Increase Font Size"
                    >
                      A+
                    </button>
                 </div>
              </div>

              {/* Line Spacing */}
              <div className="flex items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-700/60 p-2.5 rounded-md">
                 <div className={`flex items-center gap-1 text-[11px] font-bold uppercase text-neutral-600 dark:text-neutral-300 w-16 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                    <MoveVertical className="w-3 h-3" aria-hidden="true" /> {t('a11y.line_spacing')}
                 </div>
                 <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLineSpacing(Math.max(1.0, parseFloat((lineSpacing - 0.1).toFixed(1))))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Decrease Line Spacing"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-12 text-center dark:text-white tabular-nums">{lineSpacing.toFixed(1)}</span>
                    <button
                      onClick={() => setLineSpacing(Math.min(3.0, parseFloat((lineSpacing + 0.1).toFixed(1))))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Increase Line Spacing"
                    >
                      +
                    </button>
                 </div>
              </div>

              {/* Letter Spacing */}
              <div className="flex items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-700/60 p-2.5 rounded-md">
                 <div className={`flex items-center gap-1 text-[11px] font-bold uppercase text-neutral-600 dark:text-neutral-300 w-16 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                    <MoveHorizontal className="w-3 h-3" aria-hidden="true" /> {t('a11y.letter_spacing')}
                 </div>
                 <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLetterSpacing(Math.max(-0.05, parseFloat((letterSpacing - 0.05).toFixed(2))))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Decrease Letter Spacing"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-12 text-center dark:text-white tabular-nums">{letterSpacing.toFixed(2)}</span>
                    <button
                      onClick={() => setLetterSpacing(Math.min(0.5, parseFloat((letterSpacing + 0.05).toFixed(2))))}
                      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-500 rounded hover:bg-primary hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Increase Letter Spacing"
                    >
                      +
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* Read Mode */}
          <div>
            <label className={`text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> {t('a11y.read_mode')}
            </label>
            <button
              onClick={() => setIsReadMode(!isReadMode)}
              className={`w-full flex items-center justify-between p-3 rounded border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isReadMode
                  ? 'bg-primary text-white border-primary shadow-inner font-bold'
                  : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-600 hover:border-primary'
              }`}
              aria-pressed={isReadMode}
            >
              <span className={`text-xs uppercase ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('a11y.distraction_free')}</span>
              {isReadMode ? <Check className="w-4 h-4" aria-hidden="true" /> : <span className="w-4 h-4 rounded-full border border-current opacity-30" aria-hidden="true"></span>}
            </button>
          </div>

          <button
            onClick={resetSettings}
            className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 hover:text-danger hover:bg-danger/10 transition-colors border-t border-neutral-200 dark:border-neutral-700 mt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-danger ${
              isRTL ? 'font-arabic' : 'font-sans'
            }`}
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" /> {t('a11y.reset_defaults')}
          </button>
        </div>
      </div>

      <Tooltip content={t('a11y.tools')} position={isRTL ? 'right' : 'left'}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
            isOpen ? 'bg-neutral-900 text-white rotate-180' : 'bg-primary text-white'
          }`}
          aria-label={isOpen ? t('a11y.close_menu') : t('a11y.open_menu')}
          aria-expanded={isOpen}
          aria-controls="accessibility-menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Eye className="w-7 h-7" />}
        </button>
      </Tooltip>
    </div>
  );
};
