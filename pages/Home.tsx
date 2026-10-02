import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { ScrollReveal } from '../components/ScrollReveal';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { Users, Trophy, Calendar, ArrowRight, Play, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS, getRandomAthleteImage, getAthleteImage } from '../utils/assets';
import { Stat, Testimonial } from '../types';

export const Home: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (!duration || duration < 10) {
        setIsContentVisible(true);
        return;
      }
      const shouldHide = currentTime > 3 && currentTime < (duration - 4);
      if (shouldHide && isContentVisible) {
        setIsContentVisible(false);
      } else if (!shouldHide && !isContentVisible) {
        setIsContentVisible(true);
      }
    }
  };

  const stats: Stat[] = [
    { label: t('stats.members'), value: '1,200+', icon: <Users className="w-5 h-5" />, tooltip: t('stats.members_tooltip') },
    { label: t('stats.programs'), value: '45+', icon: <Calendar className="w-5 h-5" />, tooltip: t('stats.programs_tooltip') },
    { label: t('stats.medals'), value: '250', icon: <Trophy className="w-5 h-5" />, tooltip: t('stats.medals_tooltip') },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: language === 'en' ? "Al Thiqah Club changed my life. The coaches saw potential in me when I didn't see it myself." : "نادي الثقة غير حياتي. رأى المدربون فيّ إمكانات لم أرها في نفسي.",
      author: language === 'en' ? "Ahmed Al Mutawa" : "أحمد المطوع",
      role: language === 'en' ? "Paralympic Athlete" : "بطل بارالمبي",
      image: getAthleteImage(1)
    },
    {
      id: 2,
      quote: language === 'en' ? "A wonderful community that supports families and builds confidence in our children." : "مجتمع رائع يدعم العائلات ويبني الثقة في أطفالنا.",
      author: language === 'en' ? "Fatima Hassan" : "فاطمة حسن",
      role: language === 'en' ? "Parent" : "ولي أمر",
      image: getAthleteImage(5)
    },
    {
      id: 3,
      quote: language === 'en' ? "Volunteering here has been the most rewarding experience of my career." : "التطوع هنا كان أكثر تجربة مجزية في مسيرتي المهنية.",
      author: language === 'en' ? "Dr. John Smith" : "د. جون سميث",
      role: language === 'en' ? "Volunteer Doctor" : "طبيب متطوع",
      image: getAthleteImage(10)
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-cream dark:bg-dark-bg transition-colors duration-500">
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {ASSETS.HERO.USE_VIDEO ? (
            <>
             <video
               ref={videoRef}
               key={ASSETS.HERO.VIDEO}
               autoPlay={ASSETS.HERO.OPTIONS.AUTO_PLAY}
               loop={ASSETS.HERO.OPTIONS.LOOP}
               muted={ASSETS.HERO.OPTIONS.MUTED}
               playsInline={ASSETS.HERO.OPTIONS.PLAYS_INLINE}
               onTimeUpdate={handleTimeUpdate}
               onLoadedData={() => setIsVideoLoaded(true)}
               onError={() => setIsVideoLoaded(true)}
               className="w-full h-full object-cover transition-opacity duration-1000"
               poster={ASSETS.HERO.IMAGE}
               aria-label="Al Thiqah Club background video"
             >
               <source src={ASSETS.HERO.VIDEO} type="video/mp4" />
               <img src={ASSETS.HERO.IMAGE} onError={(e) => { e.currentTarget.src = "https://picsum.photos/1920/1080?grayscale&blur=1"; }} alt="Hero Fallback" className="w-full h-full object-cover" />
             </video>

             {!isVideoLoaded && (
               <div className="absolute inset-0 flex items-center justify-center z-10 bg-neutral-900/20 backdrop-blur-[2px] transition-all duration-500">
                  <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
               </div>
             )}
            </>
          ) : (
            <img src={ASSETS.HERO.IMAGE} onError={(e) => { e.currentTarget.src = "https://picsum.photos/1920/1080?grayscale&blur=1"; }} alt="Hero" className="w-full h-full object-cover scale-105 animate-[fadeInSlow_2s_ease-out]" />
          )}

          {/* Overlays for readability */}
          <div className={`absolute inset-0 bg-neutral-900/40 mix-blend-multiply transition-opacity duration-[2500ms] ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-20'}`} />
          <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/30 transition-opacity duration-[2500ms] ease-in-out ${isContentVisible ? 'opacity-100' : 'opacity-30'}`} />
        </div>

        {/* Content Layer */}
        <div className={`container mx-auto px-4 relative z-10 text-center text-white transition-all duration-[2500ms] ease-in-out ${isContentVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
          <div className="flex flex-col items-center">
             <ScrollReveal animation="fade-up" duration={800}>
                <div className="flex items-center gap-4 mb-6 md:mb-8 opacity-90 justify-center">
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                    <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs font-bold">{t('home.est')}</span>
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                </div>
             </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200} duration={800}>
                <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 leading-none drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('hero.title')}</h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400} duration={800}>
                <p className={`text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed drop-shadow-md px-4 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('hero.subtitle')}</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={600} duration={800}>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full px-8 sm:w-auto sm:px-0 justify-center">
                  <Link to="/programs" className="w-full sm:w-auto"><Button size="lg" variant="white" fullWidth className="md:w-auto md:min-w-[180px] hover:scale-105 transition-transform">{t('hero.cta_primary')}</Button></Link>
                  <Link to="/donate" className="w-full sm:w-auto"><Button size="lg" variant="outline-white" fullWidth className="md:w-auto md:min-w-[180px] hover:scale-105 transition-transform">{t('hero.cta_secondary')}</Button></Link>
                </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-[2000ms] ${isContentVisible ? 'opacity-70' : 'opacity-0'}`}>
          <Tooltip content={t('home.scroll_down')}><div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div></Tooltip>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-cream dark:bg-dark-bg transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal animation={isRTL ? "slide-right" : "slide-left"} className="order-2 lg:order-1">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                {t('home.mission_badge')}
              </span>
              <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-dark-text mb-6 md:mb-8 leading-tight ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
                {t('home.mission_title')}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 text-base md:text-lg font-light">
                {t('home.mission_desc')}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-primary/10 dark:border-white/10">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-2 group cursor-default">
                    <div className="sm:hidden text-primary bg-primary/10 p-2 rounded-full">{stat.icon}</div>
                    <div>
                        <Tooltip content={stat.tooltip || ''}><span className="text-3xl md:text-4xl font-serif text-primary mb-0 sm:mb-2 block group-hover:scale-110 transition-transform origin-left">{stat.value}</span></Tooltip>
                        <span className={`text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold ${isRTL ? 'font-arabic' : 'font-sans'}`}>{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal animation={isRTL ? "slide-left" : "slide-right"} delay={200} className="order-1 lg:order-2 relative">
              <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl group">
                <img src={ASSETS.ATHLETES.FEATURED} alt="Al Thiqah Club Athlete" loading="lazy" decoding="async" className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className={`absolute -bottom-6 ${isRTL ? '-right-6' : '-left-6'} w-1/2 h-1/2 bg-sand dark:bg-neutral-800 -z-0 rounded-sm`}></div>
              <div className={`absolute -top-6 ${isRTL ? '-left-6' : '-right-6'} w-1/2 h-1/2 border-2 border-primary/20 -z-0 rounded-sm`}></div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-surface transition-colors duration-500">
        <div className="container mx-auto px-4">
          <ScrollReveal className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-dark-text mb-4 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
                {t('programs.title')}
              </h2>
              <div className="h-1 w-20 bg-primary mt-6"></div>
            </div>
            <Link to="/programs" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primaryDark transition-colors group">
              {t('home.view_all')}
              {isRTL ? <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 10, title: { en: 'Wheelchair Basketball', ar: 'كرة السلة للكراسي المتحركة' }, desc: { en: 'Join our championship-winning adaptive basketball team.', ar: 'انضم إلى فريقنا الفائز بالبطولات في كرة السلة للكراسي.' } },
              { id: 11, title: { en: 'Para-Swimming', ar: 'السباحة البارالمبية' }, desc: { en: 'Buoyancy and cardiovascular conditioning in our aquatic center.', ar: 'تمارين الطفو وصحة القلب في مركزنا المائي المتطور.' } },
              { id: 13, title: { en: 'Para-Powerlifting', ar: 'رفع الأثقال البارالمبي' }, desc: { en: 'Strength conditioning and technical coaching under certified masters.', ar: 'تدريب القوة والتأهيل البدني تحت إشراف مدربين معتمدين.' } }
            ].map((prog, idx) => (
              <ScrollReveal key={prog.id} delay={idx * 100}>
                <Link to={`/programs/${prog.id}`} className="group cursor-pointer block h-full">
                    <div className="relative overflow-hidden mb-6 h-[300px] md:h-[400px] rounded-sm shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img src={getAthleteImage(prog.id)} alt={prog.title[language]} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <ArrowRight className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    </div>
                    <div className={isRTL ? 'pl-4' : 'pr-4'}>
                      <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-dark-text mb-2 group-hover:text-primary transition-colors ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
                        {prog.title[language]}
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base line-clamp-2 leading-relaxed mb-4 font-light">
                        {prog.desc[language]}
                      </p>
                      <span className="inline-block border-b border-primary/30 text-[10px] font-bold uppercase tracking-widest text-primary pb-1 group-hover:border-primary transition-colors">
                        {t('programs.details')}
                      </span>
                    </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-8 md:hidden text-center">
             <Link to="/programs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primaryDark transition-colors group">
               {t('home.view_all_programs')}
               {isRTL ? <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
             </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-32 bg-neutral-50 dark:bg-neutral-900/50 transition-colors duration-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(27,77,62,0.03),transparent_40%)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cream dark:from-dark-bg to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal className="text-center mb-16 md:mb-20">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 flex items-center justify-center gap-2">
              <span className="w-8 h-[1px] bg-primary"></span>
              {t('home.testimonials_badge')}
              <span className="w-8 h-[1px] bg-primary"></span>
            </span>
            <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-dark-text ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
              {t('home.testimonials_title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <TestimonialSlider testimonials={testimonials} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center bg-neutral-900 overflow-hidden">
         <div className="absolute inset-0 opacity-40">
           <img src={ASSETS.FACILITIES.BASKETBALL_1} className="w-full h-full object-cover" alt="Al Thiqah Club Basketball" loading="lazy" decoding="async" />
         </div>
         <div className="absolute inset-0 bg-neutral-900/40"></div>
         <ScrollReveal animation="fade-up" className="container relative z-10 text-center text-white px-4">
             <Tooltip content={t('home.watch_video')}>
               <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 md:mb-10 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 cursor-pointer group shadow-2xl focus-visible:ring-4 focus-visible:ring-gold" tabIndex={0} role="button" aria-label={t('home.watch_video')}>
                 <Play className="w-6 h-6 md:w-8 md:h-8 ml-1 group-hover:text-white text-white" fill="currentColor" aria-hidden="true" />
               </div>
             </Tooltip>
             <h2 className={`text-3xl md:text-6xl mb-6 ${isRTL ? 'font-arabic font-bold' : 'font-serif italic'}`}>{t('home.cta_title')}</h2>
             <p className={`text-white/80 max-w-xl mx-auto mb-10 md:mb-12 text-base md:text-lg font-light leading-relaxed ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('home.cta_desc')}
             </p>
             <Link to="/contact">
               <Button variant="white" size="lg" className="min-w-[200px]">{t('nav.contact')}</Button>
             </Link>
         </ScrollReveal>
      </section>
    </div>
  );
};
