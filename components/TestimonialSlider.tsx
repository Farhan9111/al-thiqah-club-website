import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Testimonial } from '../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  autoPlay = true,
  interval = 8000
}) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isRTL } = useLanguage();

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoPlay || isPaused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, isPaused]);

  if (!testimonials.length) return null;

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
       {/* Card Container */}
       <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden min-h-[450px] md:min-h-[450px] flex border border-neutral-100 dark:border-neutral-700 flex-col md:flex-row">

          {testimonials.map((item, idx) => (
             <div
               key={item.id}
               className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                 idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
               }`}
             >
                <div className="flex flex-col md:flex-row h-full">
                   {/* Image Side */}
                   <div className="w-full md:w-5/12 h-48 md:h-full relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10"></div>
                      <img
                        src={item.image || `https://ui-avatars.com/api/?name=${item.author}&background=random`}
                        alt={item.author}
                        className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${idx === current ? 'scale-110' : 'scale-100'}`}
                      />
                   </div>

                   {/* Content Side */}
                   <div className="w-full md:w-7/12 p-6 md:p-16 flex flex-col justify-center relative bg-white dark:bg-neutral-800 flex-grow">
                      {/* Decorative Quote Mark */}
                      <Quote className={`absolute top-6 ${isRTL ? 'left-6 md:left-8' : 'right-6 md:right-8'} text-neutral-100 dark:text-neutral-700 w-24 h-24 md:w-32 md:h-32 ${isRTL ? '' : 'rotate-180'} -z-0`} />

                      <div className={`relative z-10 transform transition-all duration-700 delay-300 flex flex-col h-full justify-center ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                         <div className="flex items-center gap-2 mb-4 md:mb-6">
                            {[...Array(5)].map((_, i) => (
                               <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-gold fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            ))}
                         </div>

                         <p className={`text-lg md:text-3xl leading-relaxed text-neutral-800 dark:text-neutral-200 mb-6 md:mb-10 line-clamp-4 md:line-clamp-none ${isRTL ? 'font-arabic font-light' : 'font-serif italic'}`}>
                           "{item.quote}"
                         </p>

                         <div className="flex items-center gap-4 mt-auto md:mt-0">
                            <div className="h-[2px] w-8 md:w-12 bg-primary"></div>
                            <div>
                                <h4 className={`text-base md:text-lg font-bold text-neutral-900 dark:text-white uppercase tracking-wider ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                                {item.author}
                                </h4>
                                <p className={`text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-1 uppercase tracking-widest ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                                {item.role}
                                </p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          ))}

          {/* Navigation Controls */}
          <div className={`absolute bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-20 hidden md:flex gap-2`}>
             <button
                onClick={isRTL ? next : prev}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-white/80 dark:bg-neutral-900/80 backdrop-blur text-neutral-600 dark:text-neutral-300 p-3 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isRTL ? "Next Testimonial" : "Previous Testimonial"}
             >
                <ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
             </button>
             <button
                onClick={isRTL ? prev : next}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 bg-white/80 dark:bg-neutral-900/80 backdrop-blur text-neutral-600 dark:text-neutral-300 p-3 focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isRTL ? "Previous Testimonial" : "Next Testimonial"}
             >
                <ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
             </button>
          </div>
       </div>

       {/* Indicators / Progress */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
            {testimonials.map((_, idx) => (
            <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-primary ${
                current === idx ? 'bg-primary w-12' : 'bg-neutral-300 dark:bg-neutral-600 w-4 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={current === idx}
            />
            ))}
        </div>
    </div>
  );
};
