import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Send, Check } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { ASSETS } from '../utils/assets';
import { ScrollReveal } from './ScrollReveal';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#050907] text-white pt-12 md:pt-24 pb-12 border-t border-white/5 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <ScrollReveal animation="fade-up" delay={0} className="col-span-1 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="w-14 h-14 bg-white rounded-full p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-primary/10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-primary/30 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={ASSETS.LOGO}
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/200x200/FFFFFF/1B4D3E.png?text=ATC&font=playfair"; }}
                    alt="Al Thiqah Club Logo"
                    className="w-full h-full object-contain relative z-10"
                  />
               </div>
               <div>
                 <h2 className={`text-2xl text-white leading-none mb-1 transition-colors duration-300 group-hover:text-primary ${isRTL ? 'font-arabic font-bold' : 'font-serif font-bold'}`}>
                    {language === 'en' ? 'Al Thiqah' : 'نادي الثقة'}
                 </h2>
                 <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 group-hover:text-white/70 transition-colors">{language === 'en' ? 'Club for Disabled' : 'لذوي الإعاقة'}</p>
               </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed font-light max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook className="w-5 h-5"/>, label: "Facebook", href: "https://facebook.com" },
                { icon: <Twitter className="w-5 h-5"/>, label: "Twitter", href: "https://twitter.com" },
                { icon: <Instagram className="w-5 h-5"/>, label: "Instagram", href: "https://instagram.com" }
              ].map((social, idx) => (
                <Tooltip key={idx} content={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 hover:rotate-6 hover:scale-110 focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {social.icon}
                  </a>
                </Tooltip>
              ))}
            </div>
          </ScrollReveal>

          {/* Contact Column */}
          <ScrollReveal animation="fade-up" delay={100} className="col-span-1">
            <h3 className={`text-lg text-white mb-8 relative inline-block ${isRTL ? 'font-arabic font-bold' : 'font-serif font-semibold'}`}>
              {t('nav.contact')}
              <span className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-8 h-[2px] bg-primary transition-all duration-300 hover:w-16`}></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <Tooltip content={t('footer.open_map')} position={isRTL ? 'left' : 'right'}>
                  <a href="https://goo.gl/maps/AlThiqahClub" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group p-3 -ml-3 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mt-1 shrink-0 shadow-sm group-hover:shadow-primary/30 group-hover:scale-110">
                      <MapPin className="w-4 h-4"/>
                    </div>
                    <span className="text-sm text-neutral-400 font-light leading-relaxed group-hover:text-white transition-colors whitespace-pre-line">{t('footer.address_val')}</span>
                  </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip content={t('footer.call_now')} position={isRTL ? 'left' : 'right'}>
                  <a href="tel:+97165551234" className="flex items-center gap-4 group p-3 -ml-3 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-primary/30 group-hover:scale-110">
                      <Phone className="w-4 h-4"/>
                    </div>
                    <span className="text-sm text-neutral-400 font-light group-hover:text-white transition-colors" dir="ltr">+971 6 555 1234</span>
                  </a>
                </Tooltip>
              </li>
              <li>
                <Tooltip content={t('footer.send_email')} position={isRTL ? 'left' : 'right'}>
                  <a href="mailto:info@althiqah.ae" className="flex items-center gap-4 group p-3 -ml-3 rounded-lg hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 shadow-sm group-hover:shadow-primary/30 group-hover:scale-110">
                      <Mail className="w-4 h-4"/>
                    </div>
                    <span className="text-sm text-neutral-400 font-light group-hover:text-white transition-colors">info@althiqah.ae</span>
                  </a>
                </Tooltip>
              </li>
            </ul>
          </ScrollReveal>

          {/* Quick Links Column */}
          <ScrollReveal animation="fade-up" delay={200} className="col-span-1">
            <h3 className={`text-lg text-white mb-8 relative inline-block ${isRTL ? 'font-arabic font-bold' : 'font-serif font-semibold'}`}>
              {t('footer.discover')}
              <span className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-8 h-[2px] bg-primary transition-all duration-300 hover:w-16`}></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: t('nav.programs'), path: '/programs' },
                { label: t('nav.events'), path: '/events' },
                { label: t('nav.get_involved'), path: '/get-involved' },
                { label: t('nav.donate'), path: '/donate' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-3 text-neutral-400 hover:text-white transition-all duration-300 group py-2 md:py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-primary group-hover:w-6 transition-all duration-300"></span>
                    <span className="text-sm font-light group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Newsletter Column */}
          <ScrollReveal animation="fade-up" delay={300} className="col-span-1">
            <h3 className={`text-lg text-white mb-8 relative inline-block ${isRTL ? 'font-arabic font-bold' : 'font-serif font-semibold'}`}>
              {t('footer.newsletter')}
              <span className={`absolute -bottom-2 ${isRTL ? 'right-0' : 'left-0'} w-8 h-[2px] bg-primary transition-all duration-300 hover:w-16`}></span>
            </h3>
             <p className="text-neutral-400 text-xs mb-6 font-light leading-relaxed">
               {t('footer.newsletter_desc')}
             </p>
             <form className="flex flex-col gap-3 group" onSubmit={handleSubscribe}>
               <div className="relative">
                 <input
                   type="email"
                   required
                   placeholder={t('footer.newsletter_placeholder')}
                   className={`w-full bg-white/5 border border-white/10 px-4 py-4 md:py-3 text-base md:text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white/10 outline-none transition-all duration-300 rounded-sm placeholder:text-neutral-600 peer ${
                     isRTL ? 'pr-10' : 'pl-10'
                   }`}
                   maxLength={100}
                   autoComplete="email"
                   aria-label={t('footer.newsletter')}
                 />
                 <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 peer-focus:text-primary peer-focus:scale-110 transition-all duration-300 pointer-events-none`} />
               </div>
               <button
                type="submit"
                disabled={subscribed}
                className={`text-neutral-900 text-xs font-bold uppercase tracking-widest py-4 md:py-3 px-6 transition-all duration-500 rounded-sm flex items-center justify-center gap-2 overflow-hidden relative focus-visible:ring-2 focus-visible:ring-gold ${
                  subscribed
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-white hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20'
                }`}
               >
                 {subscribed ? (
                   <span className="flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]"><Check className="w-4 h-4" /> {t('footer.subscribed')}</span>
                 ) : (
                   <span className="flex items-center gap-2 group-hover:gap-3 transition-all">{t('footer.subscribe')} <Send className={`w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} /></span>
                 )}
               </button>
             </form>
          </ScrollReveal>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-xs uppercase tracking-wider font-medium text-center md:text-left">
            © {currentYear} Al Thiqah Club for Disabled. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
             <Link to="/contact" className="text-neutral-500 hover:text-white text-xs uppercase tracking-wider transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 py-2">{t('footer.privacy')}</Link>
             <Link to="/contact" className="text-neutral-500 hover:text-white text-xs uppercase tracking-wider transition-colors hover:underline decoration-primary decoration-2 underline-offset-4 py-2">{t('footer.accessibility')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
