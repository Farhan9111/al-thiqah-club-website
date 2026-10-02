import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { Activity, Clock, ArrowRight } from 'lucide-react';
import { ProgramSummary } from '../types';

export const Programs: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const programsData: ProgramSummary[] = [
    {
      id: 10,
      title: { en: 'Athletics', ar: 'ألعاب القوى' },
      description: { en: 'Comprehensive track and field training including sprinting, javelin, and shot put designed for various mobility levels.', ar: 'تدريب شامل للمضمار والميدان يشمل العدو والرمح ودفع الجلة مصمم لمستويات حركية مختلفة.' },
      cat: 'Sports',
      intensity: { en: 'High', ar: 'عالي' },
      schedule: { en: 'Sun, Tue, Thu', ar: 'الأحد، الثلاثاء، الخميس' },
      img: '10'
    },
    {
      id: 11,
      title: { en: 'Swimming', ar: 'السباحة' },
      description: { en: 'Hydrotherapy and competitive swimming coaching focusing on buoyancy, strength, and cardiovascular health.', ar: 'العلاج المائي وتدريب السباحة التنافسي مع التركيز على الطفو والقوة وصحة القلب.' },
      cat: 'Rehab',
      intensity: { en: 'Medium', ar: 'متوسط' },
      schedule: { en: 'Mon, Wed, Sat', ar: 'الإثنين، الأربعاء، السبت' },
      img: '11'
    },
    {
      id: 12,
      title: { en: 'Art Workshop', ar: 'ورشة الفنون' },
      description: { en: 'Creative expression through painting, pottery, and mixed media to enhance fine motor skills and emotional well-being.', ar: 'التعبير الإبداعي من خلال الرسم والفخار والوسائط المختلطة لتعزيز المهارات الحركية الدقيقة والرفاهية العاطفية.' },
      cat: 'Social',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'Tue, Thu', ar: 'الثلاثاء، الخميس' },
      img: '12'
    },
    {
      id: 13,
      title: { en: 'Powerlifting', ar: 'رفع الأثقال' },
      description: { en: 'Strength conditioning and technique training for para-powerlifting, building core stability and upper body power.', ar: 'تكييف القوة والتدريب الفني لرفع الأثقال البارالمبي، وبناء ثبات الجذع وقوة الجزء العلوي من الجسم.' },
      cat: 'Sports',
      intensity: { en: 'High', ar: 'عالي' },
      schedule: { en: 'Daily', ar: 'يومياً' },
      img: '13'
    },
    {
      id: 14,
      title: { en: 'Table Tennis', ar: 'تنس الطاولة' },
      description: { en: 'Fast-paced reaction training and coordination drills suitable for standing and wheelchair players.', ar: 'تدريب رد الفعل سريع الخطى وتمارين التنسيق المناسبة للاعبين الوقوف ومستخدمي الكراسي المتحركة.' },
      cat: 'Sports',
      intensity: { en: 'Medium', ar: 'متوسط' },
      schedule: { en: 'Mon, Wed', ar: 'الإثنين، الأربعاء' },
      img: '14'
    },
    {
      id: 15,
      title: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' },
      description: { en: 'Personalized rehabilitation plans to improve mobility, reduce pain, and enhance daily independence.', ar: 'خطط إعادة تأهيل مخصصة لتحسين الحركة وتقليل الألم وتعزيز الاستقلالية اليومية.' },
      cat: 'Rehab',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'By Appt', ar: 'بموعد' },
      img: '15'
    },
    {
      id: 16,
      title: { en: 'Shooting', ar: 'الرماية' },
      description: { en: 'Precision air rifle and pistol training focusing on focus, breath control, and stability.', ar: 'تدريب دقيق على البندقية الهوائية والمسدس يركز على التركيز والتحكم في التنفس والثبات.' },
      cat: 'Sports',
      intensity: { en: 'Medium', ar: 'متوسط' },
      schedule: { en: 'Sun, Tue', ar: 'الأحد، الثلاثاء' },
      img: '16'
    },
    {
      id: 17,
      title: { en: 'Archery', ar: 'القوس والسهم' },
      description: { en: 'Developing upper body strength and mental discipline through competitive archery techniques.', ar: 'تطوير قوة الجزء العلوي من الجسم والانضباط الذهني من خلال تقنيات الرماية التنافسية.' },
      cat: 'Sports',
      intensity: { en: 'Medium', ar: 'متوسط' },
      schedule: { en: 'Mon, Thu', ar: 'الإثنين، الخميس' },
      img: '17'
    },
    {
      id: 18,
      title: { en: 'Boccia', ar: 'البوتشيا' },
      description: { en: 'A strategic precision sport designed for athletes with high support needs, focusing on tactics and control.', ar: 'رياضة دقة استراتيجية مصممة للرياضيين ذوي احتياجات الدعم العالية، تركز على التكتيكات والتحكم.' },
      cat: 'Sports',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'Wed, Sat', ar: 'الأربعاء، السبت' },
      img: '18'
    },
    {
      id: 19,
      title: { en: 'Cultural Club', ar: 'النادي الثقافي' },
      description: { en: 'Poetry, debate, and history sessions fostering intellectual growth and social connection.', ar: 'جلسات الشعر والمناظرة والتاريخ التي تعزز النمو الفكري والتواصل الاجتماعي.' },
      cat: 'Social',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'Fri', ar: 'الجمعة' },
      img: '19'
    },
    {
      id: 20,
      title: { en: 'Music Therapy', ar: 'العلاج بالموسيقى' },
      description: { en: 'Therapeutic sessions using rhythm and melody to improve cognitive function and reduce stress.', ar: 'جلسات علاجية تستخدم الإيقاع واللحن لتحسين الوظيفة الإدراكية وتقليل التوتر.' },
      cat: 'Social',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'Mon', ar: 'الإثنين' },
      img: '20'
    },
    {
      id: 21,
      title: { en: 'Chess Club', ar: 'نادي الشطرنج' },
      description: { en: 'Competitive chess coaching to sharpen strategic thinking and problem-solving skills.', ar: 'تدريب شطرنج تنافسي لشحذ التفكير الاستراتيجي ومهارات حل المشكلات.' },
      cat: 'Social',
      intensity: { en: 'Low', ar: 'منخفض' },
      schedule: { en: 'Tue, Sat', ar: 'الثلاثاء، السبت' },
      img: '21'
    },
  ];

  const categories = [
    { id: 'all', label: t('programs.filter.all') },
    { id: 'Sports', label: language === 'en' ? 'Sports' : 'الرياضة' },
    { id: 'Rehab', label: language === 'en' ? 'Rehab' : 'إعادة التأهيل' },
    { id: 'Social', label: language === 'en' ? 'Social' : 'اجتماعي' },
  ];

  const getCategoryTitle = (cat: string) => {
    const titles: Record<string, { en: string; ar: string }> = {
      'Sports': { en: 'Sports & Athletics', ar: 'الرياضة وألعاب القوى' },
      'Rehab': { en: 'Rehabilitation & Wellness', ar: 'إعادة التأهيل والعافية' },
      'Social': { en: 'Social & Cultural', ar: 'الأنشطة الاجتماعية والثقافية' },
    };
    return titles[cat]?.[language] || cat;
  };

  const visibleCategories = activeCategory === 'all' ? ['Sports', 'Rehab', 'Social'] : [activeCategory];

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

      {/* Standardized Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/1920/600?random=programs" alt="Programs Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.programs')}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
             </div>
             <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('programs.title')}</h1>
             <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('programs.subtitle')}
             </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">

        {/* Category Tabs */}
        <ScrollReveal delay={100} className="mb-12 md:mb-20">
          <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:justify-center gap-2 md:gap-8 pb-4 border-b border-neutral-200 dark:border-neutral-700 no-scrollbar snap-x" role="tablist" aria-label="Program Categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-center shrink-0 px-4 pb-3 md:pb-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm whitespace-nowrap ${activeCategory === cat.id ? 'text-primary' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                {cat.label}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transform ${isRTL ? 'origin-right' : 'origin-left'} transition-transform duration-300 ${activeCategory === cat.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="space-y-16 md:space-y-32">
          {visibleCategories.map((category) => {
            const categoryPrograms = programsData.filter(p => p.cat === category);

            if (categoryPrograms.length === 0) return null;

            return (
              <div key={category} id={category.toLowerCase()}>
                <ScrollReveal>
                  <div className="flex items-center gap-4 md:gap-6 mb-10 md:mb-16">
                    <div className="h-px bg-neutral-200 dark:bg-neutral-700 flex-grow"></div>
                    <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-white text-center mx-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
                      {getCategoryTitle(category)}
                    </h2>
                    <div className="h-px bg-neutral-200 dark:bg-neutral-700 flex-grow"></div>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {categoryPrograms.map((prog, idx) => (
                      <ScrollReveal key={prog.id} animation="fade-up" delay={idx * 100}>
                          <Link to={`/programs/${prog.id}`} className="group block cursor-pointer h-full active:scale-[0.98] transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                            <div className="bg-white dark:bg-neutral-800 rounded-sm shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col border border-neutral-100 dark:border-neutral-700 overflow-hidden relative">
                                {/* Image Container */}
                                <div className="relative overflow-hidden aspect-video md:aspect-[4/3]">
                                    <img src={`https://picsum.photos/600/500?random=${prog.img}`} alt={prog.title[language]} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                                        <span className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur px-3 py-1.5 text-[10px] font-bold text-neutral-900 dark:text-white uppercase tracking-widest border border-neutral-100 dark:border-neutral-700 shadow-sm">
                                            {prog.cat}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 flex flex-col flex-grow relative">
                                    <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-dark-text mb-3 md:mb-4 group-hover:text-primary transition-colors ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
                                        {prog.title[language]}
                                    </h3>
                                    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mb-6 md:mb-8 font-light leading-relaxed flex-grow line-clamp-3">
                                        {prog.description[language]}
                                    </p>

                                    {/* Meta Details */}
                                    <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-700 pt-4 md:pt-6 mb-4 md:mb-6">
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                            <Clock className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
                                            <span>{prog.schedule[language]}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                                            <Activity className="w-3.5 h-3.5 text-gold shrink-0" aria-hidden="true" />
                                            <span>{t('program.intensity_label')} {prog.intensity[language]}</span>
                                        </div>
                                    </div>

                                    <span className="inline-flex items-center justify-between w-full text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-primaryDark group-hover:gap-2">
                                        <span>{t('programs.details')}</span>
                                        {isRTL ? <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                                    </span>
                                </div>
                            </div>
                          </Link>
                      </ScrollReveal>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
