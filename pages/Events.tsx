import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { EventCard } from '../components/EventCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { EventItem } from '../types';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, MapPin, Clock, Filter } from 'lucide-react';

export const Events: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  // Calendar State - Initialized dynamically to current month
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate dynamic dates based on current year/month so the calendar is perpetually live
  const events: EventItem[] = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const formatDateStr = (y: number, m: number, d: number) => {
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(y, m, d));
    };

    return [
      { id: 1, title: language === 'en' ? 'National Para-Athletics Championship' : 'البطولة الوطنية لألعاب القوى البارالمبية', date: formatDateStr(year, month, 12), time: '09:00 AM', location: language === 'en' ? 'Main Stadium' : 'المضمار الرئيسي', category: 'competition', image: 'https://picsum.photos/600/400?random=20' },
      { id: 2, title: language === 'en' ? 'Community Inclusion Day' : 'يوم المجتمع والدمج الشامل', date: formatDateStr(year, month, 18), time: '10:00 AM', location: language === 'en' ? 'Club Main Hall' : 'قاعة النادي الرئيسية', category: 'community', image: 'https://picsum.photos/600/400?random=21' },
      { id: 3, title: language === 'en' ? 'Adaptive Basketball Workshop' : 'ورشة عمل كرة السلة للكراسي المتحركة', date: formatDateStr(year, month, 24), time: '05:00 PM', location: language === 'en' ? 'Indoor Sports Hall' : 'الصالة الرياضية المغطاة', category: 'workshop', image: 'https://picsum.photos/600/400?random=22' },
      { id: 4, title: language === 'en' ? 'Charity Gala & Athletes Honor' : 'حفل العشاء الخيري وتكريم الأبطال', date: formatDateStr(year, month + 1, 5), time: '08:00 PM', location: language === 'en' ? 'Grand Ballroom' : 'قاعة الاحتفالات الكبرى', category: 'community', image: 'https://picsum.photos/600/400?random=23' },
      { id: 5, title: language === 'en' ? 'Sharjah Wheelchair Tennis Open' : 'بطولة الشارقة المفتوحة لتنس الكراسي', date: formatDateStr(year, month + 1, 15), time: '03:00 PM', location: language === 'en' ? 'Tennis Courts' : 'ملاعب التنس', category: 'competition', image: 'https://picsum.photos/600/400?random=24' },
      { id: 6, title: language === 'en' ? 'Youth Adaptive Sports Camp' : 'مخيم الناشئين الرياضي المتكيف', date: formatDateStr(year, month + 1, 22), time: '08:00 AM', location: language === 'en' ? 'Club Grounds' : 'مرافق النادي الخارجية', category: 'workshop', image: 'https://picsum.photos/600/400?random=25' },
    ];
  }, [currentDate, language]);

  const filters = [
    { id: 'all', label: t('events.filter.all') },
    { id: 'competition', label: t('events.filter.competition') },
    { id: 'workshop', label: t('events.filter.workshop') },
    { id: 'community', label: t('events.filter.community') },
  ];

  const parseEventDate = (dateStr: string) => {
    return new Date(dateStr);
  };

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(ev => ev.category === activeFilter);
    }

    if (selectedDate) {
      filtered = filtered.filter(ev => {
        const evDate = parseEventDate(ev.date);
        return evDate.toDateString() === selectedDate.toDateString();
      });
    }

    return filtered;
  }, [activeFilter, selectedDate, events]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar-AE', { month: 'long', year: 'numeric' }).format(currentDate);

  const dayNames = language === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(ev => parseEventDate(ev.date).toDateString() === date.toDateString());
  };

  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 md:h-12"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      const isSelected = selectedDate?.toDateString() === dateToCheck.toDateString();
      const isToday = new Date().toDateString() === dateToCheck.toDateString();

      const dayEvents = getEventsForDate(dateToCheck);
      const hasCompetition = dayEvents.some(ev => ev.category === 'competition');
      const hasCommunity = dayEvents.some(ev => ev.category === 'community');
      const hasWorkshop = dayEvents.some(ev => ev.category === 'workshop');
      const hasEvents = dayEvents.length > 0;

      days.push(
        <button
          key={d}
          onClick={() => setSelectedDate(isSelected ? null : dateToCheck)}
          className={`h-10 md:h-12 w-10 md:w-12 mx-auto rounded-full flex items-center justify-center relative transition-all duration-300 isolate focus-visible:ring-2 focus-visible:ring-primary
            ${isSelected
              ? 'bg-gold text-white shadow-lg shadow-gold/40 scale-110 z-10'
              : 'hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300'
            }
            ${isToday && !isSelected ? 'ring-2 ring-primary text-primary font-bold' : ''}
          `}
          aria-label={`${d} ${monthName}`}
          aria-pressed={isSelected}
        >
          <span className={`text-sm leading-none ${isRTL ? 'font-arabic' : 'font-sans'} ${isSelected || isToday ? 'font-bold' : 'font-medium'}`}>{d}</span>

          {!isSelected && hasEvents && (
            <div className="absolute bottom-2 flex gap-1 transform translate-y-0.5" aria-hidden="true">
              {hasCompetition && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
              {hasWorkshop && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
              {hasCommunity && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

      {/* Standardized Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/1920/600?random=events" alt="Events Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.events')}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
             </div>
             <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('events.title')}</h1>
             <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('events.subtitle')}
             </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Calendar Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
             <ScrollReveal className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                {/* Calendar Header */}
                <div className="p-6 bg-neutral-900 text-white flex items-center justify-between relative z-10">
                   <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gold hover:text-white focus-visible:ring-2 focus-visible:ring-gold" aria-label="Previous Month"><ChevronLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} /></button>
                   <span className={`font-bold text-xl tracking-wide ${isRTL ? 'font-arabic' : 'font-serif italic'}`}>{monthName}</span>
                   <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gold hover:text-white focus-visible:ring-2 focus-visible:ring-gold" aria-label="Next Month"><ChevronRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} /></button>
                </div>

                <div className="p-6 relative z-10">
                   {/* Week Headers */}
                   <div className="grid grid-cols-7 mb-4 text-center border-b border-neutral-100 dark:border-neutral-700 pb-2">
                      {dayNames.map(day => (
                        <span key={day} className={`text-[10px] font-bold uppercase tracking-widest text-neutral-400 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{day}</span>
                      ))}
                   </div>

                   {/* Calendar Grid */}
                   <div className="grid grid-cols-7 gap-y-2">
                      {renderCalendarDays()}
                   </div>

                   {/* Quick Legend */}
                   <div className="mt-8 flex flex-wrap gap-4 text-[10px] uppercase tracking-wider text-neutral-500 justify-center border-t border-neutral-100 dark:border-neutral-700 pt-4">
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> {t('events.filter.competition')}</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {t('events.filter.workshop')}</div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> {t('events.filter.community')}</div>
                   </div>

                   {/* Selected Date Detail View */}
                   {selectedDate && (
                      <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-700 animate-[fadeIn_0.4s_ease-out]">
                        <div className="flex justify-between items-center mb-4">
                          <span className={`text-sm font-bold text-primary dark:text-white ${isRTL ? 'font-arabic' : 'font-serif'}`}>
                            {new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar-AE', { dateStyle: 'full' }).format(selectedDate)}
                          </span>
                          <button onClick={() => setSelectedDate(null)} className="text-[10px] uppercase tracking-wider text-danger hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-danger rounded px-1">
                             <X className="w-3 h-3" /> {t('events.clear')}
                          </button>
                        </div>

                        {/* Mini Event List */}
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                           {selectedDayEvents.length > 0 ? (
                              selectedDayEvents.map(ev => (
                                <div key={ev.id} className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-100 dark:border-neutral-700 hover:border-gold/30 transition-colors group/mini cursor-pointer" onClick={() => setActiveFilter(ev.category)}>
                                   <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                                     <img src={ev.image} alt="" className="w-full h-full object-cover group-hover/mini:scale-110 transition-transform duration-500" />
                                   </div>
                                   <div>
                                      <p className={`text-xs font-bold text-neutral-900 dark:text-white line-clamp-1 mb-1 group-hover/mini:text-gold transition-colors ${isRTL ? 'font-arabic' : 'font-serif'}`}>{ev.title}</p>
                                      <div className="flex flex-col gap-0.5">
                                         <span className="text-[10px] text-neutral-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {ev.time}</span>
                                         <span className="text-[10px] text-neutral-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {ev.location}</span>
                                      </div>
                                   </div>
                                </div>
                              ))
                           ) : (
                              <div className="text-center py-4 bg-neutral-50 dark:bg-neutral-900/30 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-700">
                                <CalendarIcon className="w-5 h-5 text-neutral-400 mx-auto mb-2" />
                                <p className="text-xs text-neutral-400 italic">
                                  {t('events.no_scheduled')}
                                </p>
                              </div>
                           )}
                        </div>
                      </div>
                   )}
                </div>
             </ScrollReveal>
          </div>

          {/* Events List */}
          <div className="lg:col-span-8">
            {/* Filters */}
            <ScrollReveal className="mb-8">
              <div className="flex flex-nowrap overflow-x-auto md:flex-wrap gap-2 md:gap-6 pb-4 border-b border-neutral-200 dark:border-neutral-700 no-scrollbar snap-x" role="tablist" aria-label="Event Categories">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    role="tab"
                    aria-selected={activeFilter === filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`snap-center shrink-0 px-4 pb-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-t-sm whitespace-nowrap ${activeFilter === filter.id ? 'text-primary' : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
                  >
                    {filter.label}
                    <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transform ${isRTL ? 'origin-right' : 'origin-left'} transition-transform duration-300 ${activeFilter === filter.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Active Filter Status Bar */}
            {(selectedDate || activeFilter !== 'all') && (
              <ScrollReveal animation="fade-in" duration={400}>
                <div className="mb-6 flex items-center justify-between bg-white dark:bg-neutral-800 p-4 rounded-sm border border-neutral-100 dark:border-neutral-700 shadow-sm">
                   <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <Filter className="w-4 h-4 text-primary" />
                      <span>{t('events.showing')}</span>
                      <span className="font-bold text-neutral-900 dark:text-white">
                        {activeFilter !== 'all' && filters.find(f => f.id === activeFilter)?.label}
                        {activeFilter !== 'all' && selectedDate && ` ${t('events.on')} `}
                        {selectedDate && new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ar-AE', { dateStyle: 'medium' }).format(selectedDate)}
                        {activeFilter === 'all' && !selectedDate && t('events.filter.all')}
                      </span>
                   </div>
                   <button
                     onClick={() => { setSelectedDate(null); setActiveFilter('all'); }}
                     className="text-[10px] font-bold uppercase tracking-wider text-danger hover:underline flex items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-danger rounded px-1.5 py-0.5"
                   >
                      <X className="w-3 h-3" /> {t('events.clear_all')}
                   </button>
                </div>
              </ScrollReveal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredEvents.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx % 2 * 100} animation="fade-up">
                  <EventCard
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    image={event.image}
                  />
                </ScrollReveal>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-sm border border-neutral-100 dark:border-neutral-700 shadow-sm animate-[fadeIn_0.5s]">
                <p className="text-xl font-serif text-neutral-500 mb-2">{t('events.empty')}</p>
                <button onClick={() => { setSelectedDate(null); setActiveFilter('all'); }} className="text-sm text-primary underline focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1">
                  {t('events.reset_filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
