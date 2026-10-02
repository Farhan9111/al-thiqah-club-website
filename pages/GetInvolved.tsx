import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { HandHeart, Building2, Users, ArrowRight, Heart, Globe, Award } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const GetInvolved: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

      {/* Standardized Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/1920/1080?random=50" alt="Get Involved Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs shadow-black drop-shadow-md">{t('nav.get_involved')}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
             </div>

             <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>
               {t('get_involved.hero_title')}
             </h1>

             <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md mb-8 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('get_involved.hero_desc')}
             </p>

             {/* Dual CTA Buttons */}
             <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
               <Link to="/volunteer" className="w-full sm:w-auto">
                   <Button variant="white" size="lg" fullWidth className="min-w-[200px] shadow-xl hover:scale-105 transition-transform">
                       {t('get_involved.volunteer_btn')}
                   </Button>
               </Link>
               <Link to="/sponsorship" className="w-full sm:w-auto">
                   <Button variant="outline-white" size="lg" fullWidth className="min-w-[200px] hover:scale-105 transition-transform backdrop-blur-sm bg-white/5">
                       {t('get_involved.partner_btn')}
                   </Button>
               </Link>
             </div>
        </ScrollReveal>
      </div>

      {/* Impact Stats Section */}
      <div className="bg-neutral-900 border-b border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
         <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
            <ScrollReveal className="grid grid-cols-3 gap-6 md:gap-12 divide-x divide-white/10">
               <div className="text-center px-2">
                  <p className="text-2xl md:text-4xl font-bold text-white font-serif mb-1">500+</p>
                  <p className={`text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.stats_volunteers')}</p>
               </div>
               <div className="text-center px-2">
                  <p className="text-2xl md:text-4xl font-bold text-white font-serif mb-1">50+</p>
                  <p className={`text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.stats_partners')}</p>
               </div>
               <div className="text-center px-2">
                  <p className="text-2xl md:text-4xl font-bold text-white font-serif mb-1">1</p>
                  <p className={`text-[10px] md:text-xs uppercase tracking-widest text-neutral-400 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.stats_goal')}</p>
               </div>
            </ScrollReveal>
         </div>
      </div>

      <div id="opportunities" className="container mx-auto px-4 py-16 md:py-24 space-y-20 md:space-y-32">

        {/* Volunteer Section */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`order-2 lg:order-1 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
             <span className="text-primary font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                {t('get_involved.volunteer_program')}
             </span>
            <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-white mb-6 md:mb-8 leading-tight ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
              {t('get_involved.volunteer_heading')}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light">
              {t('get_involved.volunteer_body')}
            </p>

            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 shrink-0"><Heart className="w-5 h-5"/></div>
                    <div>
                        <h3 className={`font-bold text-neutral-900 dark:text-white mb-1 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.impact_title')}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">{t('get_involved.impact_desc')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 shrink-0"><Globe className="w-5 h-5"/></div>
                    <div>
                        <h3 className={`font-bold text-neutral-900 dark:text-white mb-1 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.community_title')}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">{t('get_involved.community_desc')}</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 shrink-0"><Award className="w-5 h-5"/></div>
                    <div>
                        <h3 className={`font-bold text-neutral-900 dark:text-white mb-1 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('get_involved.experience_title')}</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-light">{t('get_involved.experience_desc')}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <Link to="/volunteer">
                  <Button variant="primary" className="shadow-xl shadow-primary/20">
                    {t('get_involved.volunteer_btn')}
                  </Button>
                </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative group">
             <div className="relative rounded-sm overflow-hidden h-[300px] md:h-[600px] shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 z-10">
               <img src="https://picsum.photos/800/1000?random=51" alt="Volunteers" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               {/* Icon Overlay */}
               <div className={`absolute bottom-8 ${isRTL ? 'left-8' : 'right-8'} w-16 h-16 md:w-20 md:h-20 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg z-20 group-hover:scale-110 transition-transform duration-500`}>
                    <HandHeart className="w-6 h-6 md:w-8 md:h-8" />
               </div>
             </div>
             {/* Decorative Elements */}
             <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} w-2/3 h-2/3 bg-sand dark:bg-neutral-800 rounded-sm -z-0`}></div>
             <div className={`absolute -top-6 ${isRTL ? '-left-6' : '-right-6'} w-2/3 h-2/3 border-2 border-primary/20 rounded-sm -z-0`}></div>
          </div>
        </ScrollReveal>

        {/* Sponsorship & Membership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
           <ScrollReveal delay={100} className="bg-white dark:bg-neutral-800 p-8 md:p-16 border border-neutral-100 dark:border-neutral-700 shadow-sm rounded-sm hover:shadow-2xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-cream dark:bg-neutral-700 rounded-full flex items-center justify-center text-primary mb-10 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm"><Building2 className="w-8 h-8" /></div>
                <h3 className={`text-2xl md:text-3xl text-neutral-900 dark:text-white mb-6 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('get_involved.corp_sponsorship_title')}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-10 font-light leading-relaxed text-base md:text-lg">{t('get_involved.corp_sponsorship_desc')}</p>
              </div>
              <div className="relative z-10 pt-8 border-t border-neutral-100 dark:border-neutral-700">
                 <Link to="/sponsorship" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary hover:text-primaryDark transition-colors group-hover:gap-4">
                    {t('get_involved.corp_sponsorship_cta')} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                 </Link>
              </div>
           </ScrollReveal>

           <ScrollReveal delay={200} className="bg-white dark:bg-neutral-800 p-8 md:p-16 border border-neutral-100 dark:border-neutral-700 shadow-sm rounded-sm hover:shadow-2xl hover:-translate-y-2 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-cream dark:bg-neutral-700 rounded-full flex items-center justify-center text-gold mb-10 group-hover:bg-gold group-hover:text-white transition-colors duration-500 shadow-sm"><Users className="w-8 h-8" /></div>
                <h3 className={`text-2xl md:text-3xl text-neutral-900 dark:text-white mb-6 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('get_involved.membership_title')}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-10 font-light leading-relaxed text-base md:text-lg">{t('get_involved.membership_desc')}</p>
              </div>
              <div className="relative z-10 pt-8 border-t border-neutral-100 dark:border-neutral-700">
                 <Link to="/membership" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gold hover:text-[#E0961F] transition-colors group-hover:gap-4">
                    {t('get_involved.membership_cta')} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                 </Link>
              </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
