import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { Tooltip } from '../components/Tooltip';
import { ScrollReveal } from '../components/ScrollReveal';
import { ArrowLeft, ArrowRight, Calendar, User, Layout, Dumbbell, MapPin } from 'lucide-react';
import { ProgramDetail } from '../types';

const programDatabase: Record<string, ProgramDetail> = {
  '10': {
    title: { en: 'Athletics', ar: 'ألعاب القوى' },
    description: { en: 'Our Athletics program covers a wide range of track and field events adapted for various abilities. Athletes train in racing, shot put, javelin, and discus throw under professional guidance to compete at national and international levels.', ar: 'يغطي برنامج ألعاب القوى لدينا مجموعة واسعة من سباقات المضمار والميدان المكيفة لمختلف القدرات. يتدرب الرياضيون على السباق ودفع الجلة والرمح ورمي القرص تحت إشراف متخصص للمنافسة على المستويات الوطنية والدولية.' },
    equipment: { en: 'Racing wheelchairs, throwing frames, specialized athletic wear.', ar: 'كراسي سباق متحركة، إطارات رمي، ملابس رياضية متخصصة.' },
    instructor: { en: 'Coach Sarah Johnson', ar: 'المدربة سارة جونسون' },
    schedule: { en: 'Sun, Tue, Thu - 4:00 PM', ar: 'الأحد، الثلاثاء، الخميس - ٤:٠٠ مساءً' },
    location: { en: 'Olympic Track', ar: 'المضمار الأولمبي' },
    image: 'https://picsum.photos/1200/800?random=10'
  },
  '11': {
    title: { en: 'Swimming', ar: 'السباحة' },
    description: { en: 'From hydrotherapy for rehabilitation to competitive swimming training, our pool programs focus on buoyancy, muscle strengthening, and cardiovascular health in a safe, accessible environment.', ar: 'من العلاج المائي لإعادة التأهيل إلى تدريب السباحة التنافسي، تركز برامج المسبح لدينا على الطفو وتقوية العضلات وصحة القلب والأوعية الدموية في بيئة آمنة ويمكن الوصول إليها.' },
    equipment: { en: 'Accessible pool lift, flotation devices, swim caps.', ar: 'رافعة مسبح، أجهزة طفو، قبعات سباحة.' },
    instructor: { en: 'Coach Mohammed Ali', ar: 'المدرب محمد علي' },
    schedule: { en: 'Mon, Wed, Sat - 3:00 PM', ar: 'الإثنين، الأربعاء، السبت - ٣:٠٠ مساءً' },
    location: { en: 'Indoor Aquatic Center', ar: 'مركز الألعاب المائية الداخلي' },
    image: 'https://picsum.photos/1200/800?random=11'
  },
  '12': {
    title: { en: 'Art Workshop', ar: 'ورشة الفنون' },
    description: { en: 'A therapeutic and creative space where members express themselves through painting, pottery, and mixed media. These sessions enhance fine motor skills and provide emotional release.', ar: 'مساحة علاجية وإبداعية يعبر فيها الأعضاء عن أنفسهم من خلال الرسم والفخار والوسائط المختلطة. تعزز هذه الجلسات المهارات الحركية الدقيقة وتوفر متنفساً عاطفياً.' },
    equipment: { en: 'Canvas, paints, clay, sculpting tools.', ar: 'قماش، دهانات، طين، أدوات نحت.' },
    instructor: { en: 'Ms. Layla Kensington', ar: 'الأستاذة ليلى كنسينغتون' },
    schedule: { en: 'Tue, Thu - 10:00 AM', ar: 'الثلاثاء، الخميس - ١٠:٠٠ صباحاً' },
    location: { en: 'Creative Studio B', ar: 'استوديو الإبداع ب' },
    image: 'https://picsum.photos/1200/800?random=12'
  },
  '13': {
    title: { en: 'Powerlifting', ar: 'رفع الأثقال' },
    description: { en: 'Focused strength training designed for para-powerlifters. The program emphasizes upper body power, bench press techniques, and core stability under strict safety supervision.', ar: 'تدريب قوة مركز مصمم لرافعي الأثقال البارالمبيين. يركز البرنامج على قوة الجزء العلوي من الجسم، وتقنيات ضغط الصدر، وثبات الجذع تحت إشراف سلامة صارم.' },
    equipment: { en: 'Para-bench press, free weights, wrist wraps.', ar: 'مقعد ضغط بارالمبي، أوزان حرة، أربطة معصم.' },
    instructor: { en: 'Coach James Thor', ar: 'المدرب جيمس ثور' },
    schedule: { en: 'Daily - 5:00 PM', ar: 'يومياً - ٥:٠٠ مساءً' },
    location: { en: 'High Performance Gym', ar: 'صالة الأداء العالي' },
    image: 'https://picsum.photos/1200/800?random=13'
  },
  '14': {
    title: { en: 'Table Tennis', ar: 'تنس الطاولة' },
    description: { en: 'Fast-paced reaction training suitable for standing and wheelchair athletes. Develops hand-eye coordination, reflexes, and strategic thinking.', ar: 'تدريب رد الفعل سريع الخطى مناسب للرياضيين الواقفين ومستخدمي الكراسي المتحركة. يطور التنسيق بين اليد والعين، وردود الفعل، والتفكير الاستراتيجي.' },
    equipment: { en: 'Professional tables, paddles, ball machine.', ar: 'طاولات احترافية، مضارب، آلة قذف الكرات.' },
    instructor: { en: 'Coach Chen Wei', ar: 'المدرب تشين وي' },
    schedule: { en: 'Mon, Wed - 6:00 PM', ar: 'الإثنين، الأربعاء - ٦:٠٠ مساءً' },
    location: { en: 'Multi-purpose Hall', ar: 'القاعة متعددة الأغراض' },
    image: 'https://picsum.photos/1200/800?random=14'
  },
  '15': {
    title: { en: 'Physical Therapy', ar: 'العلاج الطبيعي' },
    description: { en: 'One-on-one sessions with licensed physiotherapists to improve mobility, manage pain, and enhance daily living skills through targeted exercises.', ar: 'جلسات فردية مع معالجين فيزيائيين مرخصين لتحسين الحركة، وإدارة الألم، وتعزيز مهارات الحياة اليومية من خلال تمارين مستهدفة.' },
    equipment: { en: 'Resistance bands, balance balls, parallel bars.', ar: 'أشرطة مقاومة، كرات توازن، قضبان متوازية.' },
    instructor: { en: 'Dr. Emily Stone', ar: 'د. إميلي ستون' },
    schedule: { en: 'By Appointment', ar: 'بموعد مسبق' },
    location: { en: 'Rehab Center', ar: 'مركز إعادة التأهيل' },
    image: 'https://picsum.photos/1200/800?random=15'
  },
  '16': {
    title: { en: 'Shooting', ar: 'الرماية' },
    description: { en: 'Precision air rifle and pistol training. This sport demands immense focus, breath control, and stability, open to athletes with various physical impairments.', ar: 'تدريب دقيق على البندقية الهوائية والمسدس. تتطلب هذه الرياضة تركيزاً هائلاً، وتحكماً في التنفس، وثباتاً، وهي مفتوحة للرياضيين ذوي الإعاقات الجسدية المختلفة.' },
    equipment: { en: 'Air rifles, pistols, target systems, ear protection.', ar: 'بنادق هوائية، مسدسات، أنظمة أهداف، حماية للأذن.' },
    instructor: { en: 'Coach Ahmed Hassan', ar: 'المدرب أحمد حسن' },
    schedule: { en: 'Sun, Tue - 5:30 PM', ar: 'الأحد، الثلاثاء - ٥:٣٠ مساءً' },
    location: { en: 'Shooting Range', ar: 'ميدان الرماية' },
    image: 'https://picsum.photos/1200/800?random=16'
  },
  '17': {
    title: { en: 'Archery', ar: 'القوس والسهم' },
    description: { en: 'Developing upper body strength and mental discipline. Archers shoot from standing or seated positions at various distances.', ar: 'تطوير قوة الجزء العلوي من الجسم والانضباط الذهني. يرمي الرماة من وضعيات الوقوف أو الجلوس على مسافات مختلفة.' },
    equipment: { en: 'Recurve/Compound bows, arrows, arm guards.', ar: 'أقواس منحنية/مركبة، سهام، واقيات ذراع.' },
    instructor: { en: 'Coach Lee Min', ar: 'المدرب لي مين' },
    schedule: { en: 'Mon, Thu - 4:30 PM', ar: 'الإثنين، الخميس - ٤:٣٠ مساءً' },
    location: { en: 'Outdoor Archery Range', ar: 'ميدان القوس والسهم الخارجي' },
    image: 'https://picsum.photos/1200/800?random=17'
  },
  '18': {
    title: { en: 'Boccia', ar: 'البوتشيا' },
    description: { en: 'A highly strategic precision sport primarily for athletes with cerebral palsy or related neurological conditions. It requires extreme focus and tactical planning.', ar: 'رياضة دقة استراتيجية للغاية مخصصة في المقام الأول للرياضيين المصابين بالشلل الدماغي أو الحالات العصبية ذات الصلة. تتطلب تركيزاً شديداً وتخطيطاً تكتيكياً.' },
    equipment: { en: 'Boccia balls (leather), ramps, head pointers.', ar: 'كرات البوتشيا (جلد)، منحدرات، مؤشرات رأس.' },
    instructor: { en: 'Coach Maria Gonzales', ar: 'المدربة ماريا غونزاليس' },
    schedule: { en: 'Wed, Sat - 11:00 AM', ar: 'الأربعاء، السبت - ١١:٠٠ صباحاً' },
    location: { en: 'Indoor Court A', ar: 'الملعب الداخلي أ' },
    image: 'https://picsum.photos/1200/800?random=18'
  },
  '19': {
    title: { en: 'Cultural Club', ar: 'النادي الثقافي' },
    description: { en: 'A hub for intellectual growth offering poetry readings, history discussions, and debate sessions to foster social connection and mental acuity.', ar: 'مركز للنمو الفكري يقدم قراءات شعرية، ومناقشات تاريخية، وجلسات مناظرة لتعزيز التواصل الاجتماعي والحد الذهني.' },
    equipment: { en: 'Audio systems, projectors, library access.', ar: 'أنظمة صوتية، أجهزة عرض، دخول للمكتبة.' },
    instructor: { en: 'Dr. Sultan Al Qasimi', ar: 'د. سلطان القاسمي' },
    schedule: { en: 'Fri - 6:00 PM', ar: 'الجمعة - ٦:٠٠ مساءً' },
    location: { en: 'Main Library', ar: 'المكتبة الرئيسية' },
    image: 'https://picsum.photos/1200/800?random=19'
  },
  '20': {
    title: { en: 'Music Therapy', ar: 'العلاج بالموسيقى' },
    description: { en: 'Using rhythm and melody to improve cognitive function, motor skills, and emotional well-being. Sessions include drumming, singing, and instrument play.', ar: 'استخدام الإيقاع واللحن لتحسين الوظيفة الإدراكية، والمهارات الحركية، والرفاهية العاطفية. تشمل الجلسات الطبول، والغناء، والعزف على الآلات.' },
    equipment: { en: 'Drums, keyboards, percussion instruments.', ar: 'طبول، لوحات مفاتيح، آلات إيقاعية.' },
    instructor: { en: 'Mr. David Beats', ar: 'السيد ديفيد بيتس' },
    schedule: { en: 'Mon - 5:00 PM', ar: 'الإثنين - ٥:٠٠ مساءً' },
    location: { en: 'Music Room', ar: 'غرفة الموسيقى' },
    image: 'https://picsum.photos/1200/800?random=20'
  },
  '21': {
    title: { en: 'Chess Club', ar: 'نادي الشطرنج' },
    description: { en: 'Competitive chess coaching to sharpen strategic thinking, patience, and problem-solving skills. Hosts regular tournaments.', ar: 'تدريب شطرنج تنافسي لشحذ التفكير الاستراتيجي، والصبر، ومهارات حل المشكلات. يستضيف بطولات منتظمة.' },
    equipment: { en: 'Tournament chess sets, timers.', ar: 'مجموعات شطرنج للبطولات، مؤقتات.' },
    instructor: { en: 'Grandmaster Ivan', ar: 'الغراند ماستر إيفان' },
    schedule: { en: 'Tue, Sat - 4:00 PM', ar: 'الثلاثاء، السبت - ٤:٠٠ مساءً' },
    location: { en: 'Quiet Lounge', ar: 'القاعة الهادئة' },
    image: 'https://picsum.photos/1200/800?random=21'
  },
};

export const ProgramDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isRTL, t } = useLanguage();

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const program = (id && programDatabase[id]) ? programDatabase[id] : programDatabase['10'];

  const title = program.title[language];
  const description = program.description[language];
  const equipment = program.equipment[language];
  const instructor = program.instructor[language];
  const schedule = program.schedule[language];
  const location = program.location[language];

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors duration-500">
      <div className="relative h-[40vh] md:h-[70vh] w-full overflow-hidden">
        <img src={program.image} alt={title} className="w-full h-full object-cover animate-[fadeInSlow_1.5s_ease-out]" />
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="container mx-auto animate-[fadeIn_1s_ease-out_0.5s_both]">
            <Tooltip content={t('program.back_to_programs')}>
              <Link to="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-4 md:mb-6 transition-colors text-xs md:text-sm uppercase tracking-widest font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded px-2 py-1">
                {isRTL ? <ArrowRight className="w-4 h-4 ml-2" /> : <ArrowLeft className="w-4 h-4 mr-2" />}
                {t('program.back_to_programs')}
              </Link>
            </Tooltip>
            <h1 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <ScrollReveal>
              <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-white mb-6 md:mb-8 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('program.about_title')}</h2>
              <p className="text-base md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">{description}</p>
            </ScrollReveal>
            <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700 w-full"></div>
            <ScrollReveal>
              <h2 className={`text-3xl md:text-5xl text-neutral-900 dark:text-white mb-6 md:mb-8 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('program.equipment_title')}</h2>
              <div className="flex gap-4 md:gap-6 items-start bg-white dark:bg-neutral-800 p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm rounded-sm">
                <Dumbbell className="w-6 h-6 md:w-8 md:h-8 text-primary shrink-0 mt-1" aria-hidden="true" />
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-light">{equipment}</p>
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-4">
            <ScrollReveal delay={200} className="bg-white dark:bg-neutral-800 p-8 md:p-10 border border-neutral-100 dark:border-neutral-700 shadow-xl sticky top-24 md:top-28 rounded-sm">
              <h3 className={`text-2xl md:text-3xl text-neutral-900 dark:text-white mb-8 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('program.details_title')}</h3>
              <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary bg-cream dark:bg-neutral-700 rounded-sm"><User className="w-4 h-4 md:w-5 md:h-5" /></div>
                  <div><span className={`block text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('program.instructor')}</span><span className={`text-base md:text-lg text-neutral-900 dark:text-white ${isRTL ? 'font-arabic' : 'font-serif'}`}>{instructor}</span></div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary bg-cream dark:bg-neutral-700 rounded-sm"><Calendar className="w-4 h-4 md:w-5 md:h-5" /></div>
                  <div><span className={`block text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('program.schedule')}</span><span className={`text-base md:text-lg text-neutral-900 dark:text-white ${isRTL ? 'font-arabic' : 'font-serif'}`}>{schedule}</span></div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-primary bg-cream dark:bg-neutral-700 rounded-sm"><Layout className="w-4 h-4 md:w-5 md:h-5" /></div>
                  <div><span className={`block text-[10px] text-neutral-400 uppercase tracking-widest mb-1 font-bold ${isRTL ? 'font-arabic' : 'font-sans'}`}>{t('program.location')}</span><span className={`text-base md:text-lg text-neutral-900 dark:text-white ${isRTL ? 'font-arabic' : 'font-serif'}`}>{location}</span></div>
                </div>
              </div>

              <div className="mt-8 bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-sm border border-neutral-100 dark:border-neutral-700 text-center">
                  <h4 className={`text-primary font-bold uppercase tracking-widest text-xs mb-3 ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                    {t('program.join_prompt')}
                  </h4>
                  <p className={`text-sm text-neutral-600 dark:text-neutral-400 mb-6 font-light leading-relaxed ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                    {t('program.visit_club')}
                  </p>
                  <a href="https://goo.gl/maps/AlThiqahClub" target="_blank" rel="noopener noreferrer" className="block focus-visible:ring-2 focus-visible:ring-primary rounded">
                      <Button fullWidth variant="outline" size="sm" className="gap-2 group">
                          <MapPin className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                          {t('program.get_directions')}
                      </Button>
                  </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};
