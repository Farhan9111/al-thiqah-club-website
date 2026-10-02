import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { Heart, ShieldCheck, CreditCard } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export const Donate: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [amount, setAmount] = useState<number | null>(100);
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const amounts = [50, 100, 250, 500];

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors duration-500">

      {/* Standardized Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/1920/1080?random=donate" alt="Donate Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.donate')}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
             </div>
             <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('donate.title')}</h1>
             <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('donate.desc')}
             </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div className="space-y-12">
            <div>
               <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-white mb-8 leading-tight ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('donate.trust_title')}</h2>
               <ScrollReveal animation="fade-up" className="space-y-6">
                <div className="bg-white dark:bg-neutral-800 p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm rounded-sm flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-primary shrink-0 mt-1"><Heart className="w-6 h-6" /></div>
                  <div>
                    <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white mb-3 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('donate.impact_title')}</h3>
                    <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">{t('donate.impact_desc')}</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-neutral-800 p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm rounded-sm flex items-start gap-6 hover:shadow-md transition-shadow duration-300">
                  <div className="text-primary shrink-0 mt-1"><ShieldCheck className="w-6 h-6" /></div>
                  <div>
                    <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white mb-3 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('donate.secure_title')}</h3>
                    <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">{t('donate.secure_desc')}</p>
                  </div>
                </div>
               </ScrollReveal>
            </div>
          </div>

          <ScrollReveal animation={isRTL ? "slide-left" : "slide-right"} delay={200} className="bg-white dark:bg-neutral-800 p-8 md:p-12 shadow-2xl border border-neutral-100 dark:border-neutral-700 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>

            <div className="flex border-b border-neutral-200 dark:border-neutral-700 mb-10" role="tablist">
              <button
                role="tab"
                aria-selected={frequency === 'once'}
                onClick={() => setFrequency('once')}
                className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest transition-all hover:text-primary focus-visible:ring-2 focus-visible:ring-primary ${frequency === 'once' ? 'text-primary border-b-2 border-primary' : 'text-neutral-400'}`}
              >
                {t('donate.once')}
              </button>
              <button
                role="tab"
                aria-selected={frequency === 'monthly'}
                onClick={() => setFrequency('monthly')}
                className={`flex-1 pb-4 text-xs font-bold uppercase tracking-widest transition-all hover:text-primary focus-visible:ring-2 focus-visible:ring-primary ${frequency === 'monthly' ? 'text-primary border-b-2 border-primary' : 'text-neutral-400'}`}
              >
                {t('donate.monthly')}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`py-4 px-6 border text-base md:text-lg transition-all duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-primary ${amount === amt ? 'border-primary bg-primary text-white shadow-lg scale-105' : 'border-neutral-200 dark:border-neutral-600 dark:text-white hover:border-primary hover:text-primary'} ${isRTL ? 'font-arabic' : 'font-serif'}`}
                >
                  {amt} {t('donate.currency')}
                </button>
              ))}
            </div>

            <div className="mb-10">
              <label htmlFor="custom-donate-input" className={`text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2 block ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('donate.custom')}</label>
              <input
                id="custom-donate-input"
                type="number"
                placeholder={t('donate.custom_placeholder')}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-4 py-4 text-base md:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all duration-300 rounded-sm"
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : null)}
                min="1"
                max="100000"
              />
            </div>

            <Button fullWidth size="lg" variant="secondary" className="mb-6 shadow-xl shadow-gold/20 hover:shadow-gold/40">
              <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" />{t('donate.button')}</span>
            </Button>

            <p className="text-center text-[10px] text-neutral-400 uppercase tracking-widest">
              {t('donate.secured_by')}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
