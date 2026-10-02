import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './Button';
import { Tooltip } from './Tooltip';
import { ASSETS } from '../utils/assets';

export const Header: React.FC = () => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open & handle Escape key
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const isHome = location.pathname === '/';
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.programs'), path: '/programs' },
    { label: t('nav.events'), path: '/events' },
    { label: t('nav.get_involved'), path: '/get-involved' },
    { label: t('nav.donate'), path: '/donate' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  // Dynamic classes based on state
  const headerBgClass = scrolled || !isHome || isOpen
    ? 'bg-white/95 dark:bg-neutral-900/95 shadow-lg backdrop-blur-md'
    : 'bg-transparent';

  const headerTextClass = scrolled || !isHome || isOpen
    ? 'text-neutral-900 dark:text-white'
    : 'text-white';

  const headerHeightClass = scrolled ? 'h-16 md:h-20' : 'h-20 md:h-28';
  const logoSizeClass = scrolled ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-16 md:h-16';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerBgClass}`}>
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${headerHeightClass}`}>

        {/* Logo Section */}
        <Tooltip content={t('nav.go_home')} position="bottom">
          <NavLink to="/" className="flex items-center gap-3 group relative z-50" onClick={() => setIsOpen(false)}>
            <div className={`relative bg-white rounded-full flex items-center justify-center shadow-md p-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 overflow-hidden ${logoSizeClass}`}>
               <img
                 src={ASSETS.LOGO}
                 onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/FFFFFF/1B4D3E.png?text=ATC&font=playfair"; }}
                 alt="Al Thiqah Club Logo"
                 className="w-full h-full object-contain"
               />
            </div>

            {/* Desktop Brand Text - Hides/Animates on Scroll */}
            <div className={`hidden md:block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              <h1 className={`text-xl font-bold uppercase tracking-widest leading-none ${headerTextClass} ${isRTL ? 'font-arabic' : 'font-serif'}`}>
                {language === 'en' ? 'Al Thiqah' : 'نادي الثقة'}
              </h1>
              <p className={`text-[0.65rem] uppercase tracking-[0.2em] mt-1 ${headerTextClass} opacity-80`}>
                {language === 'en' ? 'Club for Disabled' : 'لذوي الإعاقة'}
              </p>
            </div>

            {/* Compact Brand Text - Shows on Scroll */}
             <div className={`hidden md:block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] absolute ${isRTL ? 'right-14' : 'left-14'} whitespace-nowrap ${scrolled ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
               <span className={`text-lg font-bold uppercase tracking-wider ${headerTextClass} ${isRTL ? 'font-arabic' : 'font-serif'}`}>
                 {language === 'en' ? 'ATC' : 'الثقة'}
               </span>
            </div>
          </NavLink>
        </Tooltip>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[10px] xl:text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative group py-2 ${
                  isActive ? 'text-gold' : headerTextClass
                } hover:text-gold ${isRTL ? 'font-arabic' : 'font-sans'}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gold transform ${isRTL ? 'origin-right' : 'origin-left'} transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <Tooltip content={t('nav.switch_language')} position="bottom">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors ${headerTextClass} hover:text-gold focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1`}
              aria-label={t('nav.switch_language')}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'عربي' : 'English'}</span>
            </button>
          </Tooltip>
          <Tooltip content={t('nav.join')} position="bottom">
            <Link to="/get-involved">
              <Button size="sm" variant={scrolled || !isHome ? 'primary' : 'white'} className="shadow-lg hover:shadow-xl transition-shadow">
                {t('nav.join')}
              </Button>
            </Link>
          </Tooltip>
        </div>

        {/* Mobile Menu Button - Larger Touch Target & A11y Attributes */}
        <div className="lg:hidden relative z-50">
           <Tooltip content={isOpen ? t('nav.close_menu') : t('nav.open_menu')} position="bottom">
            <button
              ref={menuButtonRef}
              className={`p-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold transition-all duration-300 transform ${headerTextClass} hover:text-gold ${isOpen ? 'rotate-90' : 'rotate-0'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl z-40 lg:hidden flex flex-col pt-24 px-6 pb-20 overflow-y-auto transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
        style={{ height: '100dvh' }}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6 items-center text-center mt-auto mb-auto w-full max-w-sm mx-auto" aria-label="Mobile Navigation">
          {navItems.map((item, idx) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={{ transitionDelay: `${isOpen ? idx * 50 : 0}ms` }}
              className={({ isActive }) =>
                `text-2xl py-2 ${isRTL ? 'font-arabic' : 'font-serif'} ${
                  isActive ? 'text-gold font-bold' : 'text-neutral-900 dark:text-white'
                } hover:text-gold transition-all duration-300 ease-out transform ${
                  isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="w-12 h-[1px] bg-neutral-200 dark:bg-neutral-700 my-4 transition-all duration-300" style={{ transitionDelay: `${isOpen ? navItems.length * 50 : 0}ms` }}></div>
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-lg text-neutral-600 dark:text-neutral-400 hover:text-primary transition-all duration-300 py-2 focus-visible:ring-2 focus-visible:ring-primary rounded px-3" style={{ transitionDelay: `${isOpen ? navItems.length * 50 + 50 : 0}ms` }}>
              <Globe className="w-5 h-5" /> {language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
          </button>
          <div className="w-full mt-4 transition-all duration-300" style={{ transitionDelay: `${isOpen ? navItems.length * 50 + 100 : 0}ms` }}>
            <Link to="/get-involved" onClick={() => setIsOpen(false)}><Button fullWidth variant="primary">{t('nav.join')}</Button></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
