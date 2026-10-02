import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tooltip } from './Tooltip';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  title, 
  date, 
  time, 
  location, 
  image 
}) => {
  const { isRTL, language, t } = useLanguage();

  const formattedDate = React.useMemo(() => {
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return date;
      return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar-AE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(dateObj);
    } catch (e) {
      return date;
    }
  }, [date, language]);

  return (
    <div className="group bg-white dark:bg-neutral-800 rounded-sm overflow-hidden border border-neutral-100 dark:border-neutral-700 transition-all duration-300 hover:shadow-xl hover:border-primary/30 flex flex-col h-full relative">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-white/95 dark:bg-neutral-900/95 backdrop-blur px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white shadow-sm z-10 border border-neutral-100 dark:border-neutral-700`}>
          {formattedDate}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow relative">
        <h3 className={`text-2xl text-neutral-900 dark:text-white mb-6 line-clamp-2 group-hover:text-primary transition-colors ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>
          {title}
        </h3>
        
        <div className="space-y-4 flex-grow">
          <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 text-sm border-t border-neutral-100 dark:border-neutral-700 pt-4">
            <Tooltip content={t('events.time_tooltip')}><Clock className="w-4 h-4 shrink-0 text-primary" aria-label={t('events.time_tooltip')} role="img" /></Tooltip>
            <span className={isRTL ? 'font-arabic' : ''}>{time}</span>
          </div>
          <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400 text-sm">
            <Tooltip content={t('events.location_tooltip')}><MapPin className="w-4 h-4 shrink-0 text-primary" aria-label={t('events.location_tooltip')} role="img" /></Tooltip>
            <span className={isRTL ? 'font-arabic' : ''}>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};