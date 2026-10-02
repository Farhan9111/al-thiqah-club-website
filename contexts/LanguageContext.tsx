import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, { en: string; ar: string }> = {
  // Navigation & General
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.programs': { en: 'Programs', ar: 'البرامج' },
  'nav.events': { en: 'Events', ar: 'الفعاليات' },
  'nav.get_involved': { en: 'Get Involved', ar: 'شارك معنا' },
  'nav.donate': { en: 'Donate', ar: 'تبرع' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.join': { en: 'Join Club', ar: 'انضم للنادي' },
  'nav.switch_language': { en: 'Switch to Arabic', ar: 'التبديل إلى الإنجليزية' },
  'nav.open_menu': { en: 'Open Menu', ar: 'فتح القائمة' },
  'nav.close_menu': { en: 'Close Menu', ar: 'إغلاق القائمة' },
  'nav.go_home': { en: 'Go to Home', ar: 'الذهاب للرئيسية' },

  // Accessibility (a11y)
  'a11y.skip_to_content': { en: 'Skip to main content', ar: 'انتقل إلى المحتوى الرئيسي' },
  'a11y.widget_title': { en: 'Accessibility', ar: 'إمكانية الوصول' },
  'a11y.tools': { en: 'Accessibility Tools', ar: 'أدوات إمكانية الوصول' },
  'a11y.open_menu': { en: 'Open Accessibility Menu', ar: 'فتح قائمة إمكانية الوصول' },
  'a11y.close_menu': { en: 'Close Accessibility Menu', ar: 'إغلاق قائمة إمكانية الوصول' },
  'a11y.display': { en: 'Display', ar: 'العرض والمظهر' },
  'a11y.dark_mode': { en: 'Dark Mode', ar: 'الوضع الداكن' },
  'a11y.contrast': { en: 'High Contrast', ar: 'تباين عالي' },
  'a11y.grayscale': { en: 'Grayscale', ar: 'تدرج رمادي' },
  'a11y.typography': { en: 'Typography', ar: 'الخط والقراءة' },
  'a11y.font_size': { en: 'Font Size', ar: 'حجم الخط' },
  'a11y.line_spacing': { en: 'Line Spacing', ar: 'تباعد الأسطر' },
  'a11y.letter_spacing': { en: 'Letter Spacing', ar: 'تباعد الأحرف' },
  'a11y.read_mode': { en: 'Read Mode', ar: 'وضع القراءة المريح' },
  'a11y.distraction_free': { en: 'Distraction Free', ar: 'عرض خالي من المشتتات' },
  'a11y.reset_defaults': { en: 'Reset Defaults', ar: 'استعادة الإعدادات الأصلية' },
  'a11y.close': { en: 'Close', ar: 'إغلاق' },

  // Hero & Home
  'home.est': { en: 'Est. 1990', ar: 'تأسس ١٩٩٠' },
  'hero.title': { en: 'Sport without limits', ar: 'الرياضة بلا حدود' },
  'hero.subtitle': { en: 'Join Al Thiqah Club for adaptive sports, coaching, and a supportive community.', ar: 'انضم إلى نادي الثقة للرياضات المتكيفة والتدريب ومجتمع داعم.' },
  'hero.cta_primary': { en: 'Explore Programs', ar: 'استكشف البرامج' },
  'hero.cta_secondary': { en: 'Support Us', ar: 'ادعمنا' },
  'home.mission_badge': { en: 'Our Mission', ar: 'رسالتنا' },
  'home.mission_title': { en: 'Empowerment Through Sport', ar: 'التمكين من خلال الرياضة' },
  'home.mission_desc': { en: 'We provide world-class facilities and expert coaching for athletes of all abilities. From recreation to Paralympics, we believe in the transformative power of movement.', ar: 'نوفر مرافق عالمية المستوى وتدريباً متخصصاً للرياضيين من جميع القدرات. من الترفيه إلى الألعاب البارالمبية، نؤمن بالقوة التحويلية للحركة.' },
  'home.view_all': { en: 'View All', ar: 'عرض الكل' },
  'home.view_all_programs': { en: 'View All Programs', ar: 'عرض كل البرامج' },
  'home.testimonials_badge': { en: 'Testimonials', ar: 'الشهادات' },
  'home.testimonials_title': { en: 'Stories of Triumph', ar: 'قصص نجاح' },
  'home.cta_title': { en: 'Become part of our legacy', ar: 'كن جزءاً من إرثنا' },
  'home.cta_desc': { en: 'Whether you are an athlete, a volunteer, or a supporter, there is a place for you here.', ar: 'سواء كنت رياضياً أو متطوعاً أو داعماً، هناك مكان لك هنا.' },
  'home.watch_video': { en: 'Watch Video', ar: 'شاهد الفيديو' },
  'home.scroll_down': { en: 'Scroll Down', ar: 'انتقل للأسفل' },

  // Stats
  'stats.members': { en: 'Active Members', ar: 'عضو نشط' },
  'stats.programs': { en: 'Weekly Programs', ar: 'برنامج أسبوعي' },
  'stats.medals': { en: 'Medals Won', ar: 'ميدالية فاز بها' },
  'stats.members_tooltip': { en: 'Total active registered members', ar: 'إجمالي الأعضاء النشطين المسجلين' },
  'stats.programs_tooltip': { en: 'Programs run weekly', ar: 'البرامج المقامة أسبوعياً' },
  'stats.medals_tooltip': { en: 'International medals won', ar: 'ميداليات دولية تم الفوز بها' },

  // Programs
  'programs.title': { en: 'Our Programs', ar: 'برامجنا' },
  'programs.subtitle': { en: 'Discover our wide range of adaptive activities designed for every interest and ability level. Excellence in every motion.', ar: 'اكتشف مجموعتنا الواسعة من الأنشطة المتكيفة المصممة لكل الاهتمامات ومستويات القدرة. التميز في كل حركة.' },
  'programs.filter.all': { en: 'All', ar: 'الكل' },
  'programs.details': { en: 'View Details', ar: 'التفاصيل' },
  'program.join_prompt': { en: 'Interested in Joining?', ar: 'هل ترغب بالانضمام؟' },
  'program.visit_club': { en: 'Registration for this program is available in-person at the club.', ar: 'التسجيل في هذا البرنامج متاح شخصياً في النادي.' },
  'program.get_directions': { en: 'Get Directions', ar: 'احصل على الاتجاهات' },
  'program.back_to_programs': { en: 'Back to Programs', ar: 'العودة للبرامج' },
  'program.about_title': { en: 'About the Program', ar: 'عن البرنامج' },
  'program.equipment_title': { en: 'Equipment & Gear', ar: 'المعدات والتجهيزات' },
  'program.details_title': { en: 'Details', ar: 'التفاصيل' },
  'program.instructor': { en: 'Instructor', ar: 'المدرب' },
  'program.schedule': { en: 'Schedule', ar: 'الجدول' },
  'program.location': { en: 'Location', ar: 'الموقع' },
  'program.intensity_label': { en: 'Intensity:', ar: 'الشدة:' },

  // Events
  'events.title': { en: 'Upcoming Events', ar: 'الفعاليات القادمة' },
  'events.subtitle': { en: 'Join us in celebrating achievement and building community.', ar: 'انضم إلينا للاحتال بالإنجازات وبناء المجتمع.' },
  'events.filter.all': { en: 'All Events', ar: 'كل الفعاليات' },
  'events.filter.competition': { en: 'Competitions', ar: 'مسابقات' },
  'events.filter.workshop': { en: 'Workshops', ar: 'ورش عمل' },
  'events.filter.community': { en: 'Community', ar: 'مجتمع' },
  'events.empty': { en: 'No events found in this category.', ar: 'لا توجد فعاليات في هذه الفئة.' },
  'events.showing': { en: 'Showing:', ar: 'عرض:' },
  'events.clear_all': { en: 'Clear All', ar: 'مسح الكل' },
  'events.clear': { en: 'Clear', ar: 'مسح' },
  'events.reset_filters': { en: 'Reset Filters', ar: 'إعادة تعيين المرشحات' },
  'events.no_scheduled': { en: 'No events scheduled for this date.', ar: 'لا توجد فعاليات مجدولة لهذا التاريخ.' },
  'events.on': { en: 'on', ar: 'في' },
  'events.time_tooltip': { en: 'Event Time', ar: 'وقت الفعالية' },
  'events.location_tooltip': { en: 'Event Location', ar: 'موقع الفعالية' },
  'events.rsvp': { en: 'RSVP Now', ar: 'سجل الآن' },
  'events.add_calendar': { en: 'Add to Calendar', ar: 'أضف إلى التقويم' },

  // Donate
  'donate.title': { en: 'Make an Impact', ar: 'اصنع أثراً' },
  'donate.desc': { en: 'Your contribution helps us provide equipment, coaching, and facilities.', ar: 'مساهمتك تساعدنا في توفير المعدات والتدريب والمرافق.' },
  'donate.trust_title': { en: 'Transparency & Trust', ar: 'الشفافية والثقة' },
  'donate.impact_title': { en: 'Impact', ar: 'الأثر' },
  'donate.impact_desc': { en: '100% of your contribution directly funds specialized equipment and coaching.', ar: '١٠٠٪ من مساهمتك تمول المعدات المتخصصة والتدريب مباشرة.' },
  'donate.secure_title': { en: 'Secure', ar: 'الأمان' },
  'donate.secure_desc': { en: 'All payments are processed securely via SSL encryption.', ar: 'تتم معالجة جميع المدفوعات بأمان عبر تشفير SSL.' },
  'donate.once': { en: 'One-time', ar: 'مرة واحدة' },
  'donate.monthly': { en: 'Monthly', ar: 'شهري' },
  'donate.custom': { en: 'Custom Amount', ar: 'مبلغ مخصص' },
  'donate.custom_placeholder': { en: 'Enter amount', ar: 'أدخل المبلغ' },
  'donate.button': { en: 'Donate Now', ar: 'تبرع الآن' },
  'donate.secured_by': { en: 'Secured by Stripe', ar: 'مؤمن بواسطة Stripe' },
  'donate.currency': { en: 'AED', ar: 'درهم' },

  // Get Involved
  'get_involved.hero_title': { en: 'Empower. Engage. Elevate.', ar: 'تمكين. مشاركة. ارتقاء.' },
  'get_involved.hero_desc': { en: 'Your time, skills, and support can change lives. Join our mission to empower athletes of all abilities.', ar: 'وقتك ومهاراتك ودعمك يمكن أن يغير حياة الكثيرين. انضم إلى مهمتنا لتمكين الرياضيين من جميع القدرات.' },
  'get_involved.volunteer_btn': { en: 'Join as Volunteer', ar: 'انضم كمتطوع' },
  'get_involved.partner_btn': { en: 'Become a Partner', ar: 'كن شريكاً' },
  'get_involved.stats_volunteers': { en: 'Volunteers', ar: 'متطوع' },
  'get_involved.stats_partners': { en: 'Partners', ar: 'شريك' },
  'get_involved.stats_goal': { en: 'Shared Goal', ar: 'هدف مشترك' },
  'get_involved.volunteer_program': { en: 'Volunteer Program', ar: 'برنامج التطوع' },
  'get_involved.volunteer_heading': { en: 'Be the Heartbeat of Our Club', ar: 'كن نبض نادينا' },
  'get_involved.volunteer_body': { en: 'Whether coaching, organizing events, or providing administrative support, our volunteers are vital to our success. Join a community that values dedication and passion.', ar: 'سواء كان ذلك في التدريب أو تنظيم الفعاليات أو تقديم الدعم الإداري، فإن متطوعينا هم نبض النادي. انضم إلى مجتمع يقدر التفاني والشغف.' },
  'get_involved.impact_title': { en: 'Make a Real Impact', ar: 'اصنع أثراً حقيقياً' },
  'get_involved.impact_desc': { en: 'Directly support athletes in achieving their dreams.', ar: 'ادعم الرياضيين مباشرة لتحقيق أحلامهم.' },
  'get_involved.community_title': { en: 'Global Community', ar: 'مجتمع شامل' },
  'get_involved.community_desc': { en: 'Connect with like-minded individuals from around the world.', ar: 'تواصل مع أشخاص يشاركونك نفس الرؤية من جميع أنحاء العالم.' },
  'get_involved.experience_title': { en: 'Gain Experience', ar: 'اكتسب خبرة' },
  'get_involved.experience_desc': { en: 'Receive certificates and valuable experience for your career.', ar: 'احصل على شهادات وخبرات قيمة لمسيرتك المهنية.' },
  'get_involved.corp_sponsorship_title': { en: 'Corporate Sponsorship', ar: 'رعاية الشركات' },
  'get_involved.corp_sponsorship_desc': { en: 'Partner with us to demonstrate your commitment to inclusivity. Gain visibility and make a tangible impact on our programs.', ar: 'شاركنا لإظهار التزامك بالشمولية. احصل على ظهور مميز واصنع أثراً ملموساً في برامجنا.' },
  'get_involved.corp_sponsorship_cta': { en: 'Contact for Sponsorship', ar: 'تواصل للرعاية' },
  'get_involved.membership_title': { en: 'Become a Member', ar: 'كن عضواً' },
  'get_involved.membership_desc': { en: 'Access world-class facilities, expert coaching, and a supportive community tailored to your individual needs.', ar: 'تمتع بإمكانية الوصول إلى مرافق عالمية وتدريب متخصص ومجتمع داعم يلبي احتياجاتك.' },
  'get_involved.membership_cta': { en: 'Membership Inquiry', ar: 'استفسار عن العضوية' },

  // Volunteer
  'volunteer.title': { en: 'Volunteer Application', ar: 'طلب التطوع' },
  'volunteer.subtitle': { en: 'Join our community of changemakers and help us empower athletes.', ar: 'انضم إلى مجتمع صناع التغيير وساعدنا في تمكين الرياضيين.' },
  'volunteer.name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'volunteer.email': { en: 'Email Address', ar: 'البريد الإلكتروني' },
  'volunteer.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'volunteer.interests': { en: 'Areas of Interest', ar: 'مجالات الاهتمام' },
  'volunteer.interest.coaching': { en: 'Coaching', ar: 'التدريب' },
  'volunteer.interest.events': { en: 'Events', ar: 'الفعاليات' },
  'volunteer.interest.admin': { en: 'Administration', ar: 'الإدارة' },
  'volunteer.interest.medical': { en: 'Medical Support', ar: 'الدعم الطبي' },
  'volunteer.availability': { en: 'Availability', ar: 'التفرغ' },
  'volunteer.availability_placeholder': { en: 'e.g. Weekends, Evenings', ar: 'مثال: عطلة نهاية الأسبوع، المساء' },
  'volunteer.experience': { en: 'Experience / Message', ar: 'الخبرة / رسالة' },
  'volunteer.submit': { en: 'Submit Application', ar: 'تقديم الطلب' },
  'volunteer.thank_you_title': { en: 'Thank You!', ar: 'شكراً لك!' },
  'volunteer.success': { en: 'Thank you for your application! We will review it and contact you soon.', ar: 'شكراً لطلبك! سنقوم بمراجعته والتواصل معك قريباً.' },

  // Membership
  'membership.title': { en: 'Membership Application', ar: 'طلب العضوية' },
  'membership.subtitle': { en: 'Become a member to access world-class facilities and expert coaching.', ar: 'كن عضواً للوصول إلى مرافق وتدريب عالمي المستوى.' },
  'membership.section.personal': { en: 'Personal Information', ar: 'المعلومات الشخصية' },
  'membership.dob': { en: 'Date of Birth', ar: 'تاريخ الميلاد' },
  'membership.gender': { en: 'Gender', ar: 'الجنس' },
  'membership.gender.male': { en: 'Male', ar: 'ذكر' },
  'membership.gender.female': { en: 'Female', ar: 'أنثى' },
  'membership.section.contact': { en: 'Contact Details', ar: 'تفاصيل الاتصال' },
  'membership.section.disability': { en: 'Disability Information', ar: 'معلومات الإعاقة' },
  'membership.disability_type': { en: 'Type of Disability', ar: 'نوع الإعاقة' },
  'membership.assistive_devices': { en: 'Assistive Devices Used', ar: 'الأجهزة المساعدة المستخدمة' },
  'membership.guardian': { en: 'Guardian Name (if under 18)', ar: 'اسم ولي الأمر (إذا كان أقل من ١٨)' },
  'membership.section.documents': { en: 'Required Documents', ar: 'المستندات المطلوبة' },
  'membership.id_card': { en: 'Emirates ID / National ID', ar: 'الهوية الإماراتية / الهوية الوطنية' },
  'membership.passport_photo': { en: 'Passport Photo', ar: 'صورة شخصية' },
  'membership.medical_report': { en: 'Medical Report', ar: 'التقرير الطبي' },
  'membership.upload_guide': { en: 'Upload PDF, JPG, or PNG (Max 5MB)', ar: 'قم بتحميل PDF أو JPG أو PNG (حد أقصى ٥ ميجابايت)' },
  'membership.submit': { en: 'Submit Application', ar: 'تقديم الطلب' },
  'membership.received_title': { en: 'Application Received', ar: 'تم استلام الطلب' },
  'membership.success': { en: 'Application submitted successfully! Our team will contact you for an assessment.', ar: 'تم تقديم الطلب بنجاح! سيتواصل فريقنا معك لإجراء التقييم.' },

  // Sponsorship
  'sponsorship.title': { en: 'Corporate Sponsorship', ar: 'رعاية الشركات' },
  'sponsorship.subtitle': { en: 'Partner with us to empower athletes and build an inclusive society.', ar: 'شاركنا لتمكين الرياضيين وبناء مجتمع شامل.' },
  'sponsorship.section.company': { en: 'Company Details', ar: 'تفاصيل الشركة' },
  'sponsorship.company_name': { en: 'Company Name', ar: 'اسم الشركة' },
  'sponsorship.industry': { en: 'Industry', ar: 'الصناعة' },
  'sponsorship.website': { en: 'Website', ar: 'الموقع الإلكتروني' },
  'sponsorship.section.contact': { en: 'Contact Person', ar: 'الشخص المسؤول' },
  'sponsorship.role': { en: 'Role / Title', ar: 'المسمى الوظيفي' },
  'sponsorship.name': { en: 'Contact Name', ar: 'اسم المسؤول' },
  'sponsorship.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'sponsorship.phone': { en: 'Phone', ar: 'رقم الهاتف' },
  'sponsorship.section.interests': { en: 'Partnership Interests', ar: 'اهتمامات الشراكة' },
  'sponsorship.interest.financial': { en: 'Financial Support', ar: 'الدعم المالي' },
  'sponsorship.interest.equipment': { en: 'Equipment Donation', ar: 'التبرع بالمعدات' },
  'sponsorship.interest.events': { en: 'Event Sponsorship', ar: 'رعاية الفعاليات' },
  'sponsorship.interest.programs': { en: 'Program Support', ar: 'دعم البرامج' },
  'sponsorship.message': { en: 'Message / Proposal', ar: 'الرسالة / المقترح' },
  'sponsorship.submit': { en: 'Submit Inquiry', ar: 'إرسال الاستفسار' },
  'sponsorship.inquiry_sent_title': { en: 'Inquiry Sent', ar: 'تم إرسال الاستفسار' },
  'sponsorship.success': { en: 'Thank you for your interest! Our partnerships team will reach out to you shortly.', ar: 'شكراً لاهتمامكم! سيتواصل معكم فريق الشراكات قريباً.' },

  // Contact
  'contact.title': { en: 'Get in Touch', ar: 'تواصل معنا' },
  'contact.subtitle': { en: 'We are here to answer your questions about membership, programs, and events.', ar: 'نحن هنا للإجابة على أسئلتك حول العضوية والبرامج والفعاليات.' },
  'contact.address': { en: 'Address', ar: 'العنوان' },
  'contact.phone': { en: 'Phone', ar: 'الهاتف' },
  'contact.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.hours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'contact.send_message': { en: 'Send a Message', ar: 'أرسل رسالة' },
  'contact.response_time': { en: 'We usually respond within 24 hours.', ar: 'عادة ما نرد خلال ٢٤ ساعة.' },
  'contact.form.name': { en: 'Your Name', ar: 'الاسم' },
  'contact.form.email': { en: 'Your Email', ar: 'البريد الإلكتروني' },
  'contact.form.subject': { en: 'Subject', ar: 'الموضوع' },
  'contact.form.message': { en: 'Message', ar: 'الرسالة' },
  'contact.form.send': { en: 'Send Message', ar: 'إرسال الرسالة' },
  'contact.success': { en: 'Message sent successfully.', ar: 'تم إرسال الرسالة بنجاح.' },

  // Common Actions
  'common.submit_another': { en: 'Submit Another', ar: 'تقديم طلب آخر' },
  'common.return_home': { en: 'Return Home', ar: 'العودة للرئيسية' },
  'common.click_to_upload': { en: 'Click to upload', ar: 'اضغط للتحميل' },

  // Validation
  'validation.required': { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
  'validation.email': { en: 'Please enter a valid email address', ar: 'يرجى إدخال عنوان بريد إلكتروني صالح' },
  'validation.phone': { en: 'Please enter a valid phone number', ar: 'يرجى إدخال رقم هاتف صالح' },

  // Footer
  'footer.tagline': { en: 'Empowering individuals through adaptive sports since 1990. We believe in ability, not disability.', ar: 'تمكين الأفراد من خلال الرياضات المتكيفة منذ عام ١٩٩٠. نحن نؤمن بالقدرة، لا الإعاقة.' },
  'footer.discover': { en: 'Discover', ar: 'اكتشف' },
  'footer.newsletter': { en: 'Newsletter', ar: 'النشرة البريدية' },
  'footer.newsletter_desc': { en: 'Subscribe directly to stay updated with latest news and events.', ar: 'اشترك مباشرة للبقاء على اطلاع بآخر الأخبار والفعاليات.' },
  'footer.newsletter_placeholder': { en: 'Enter your email', ar: 'أدخل بريدك الإلكتروني' },
  'footer.subscribe': { en: 'Subscribe', ar: 'اشترك' },
  'footer.subscribed': { en: 'Subscribed', ar: 'تم الاشتراك' },
  'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'footer.accessibility': { en: 'Accessibility Statement', ar: 'بيان إمكانية الوصول' },
  'footer.privacy': { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
  'footer.address_val': { en: 'Sharjah, UAE\nAl Thiqah Club Rd', ar: 'الشارقة، الإمارات\nشارع نادي الثقة' },
  'footer.open_map': { en: 'Open Map', ar: 'افتح الخريطة' },
  'footer.call_now': { en: 'Call Now', ar: 'اتصل الآن' },
  'footer.send_email': { en: 'Send Email', ar: 'أرسل بريداً إلكترونياً' },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('app_language');
        if (stored === 'en' || stored === 'ar') return stored;
      } catch {
        // Fallback
      }
    }
    return 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('app_language', language);
    } catch {
      // Ignore
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
