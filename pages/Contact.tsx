import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { MapPin, Phone, Mail, AlertCircle, Check } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.email');
    }
    if (!formData.subject.trim()) newErrors.subject = t('validation.required');
    if (!formData.message.trim()) newErrors.message = t('validation.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const contactInfo = [
    { icon: <MapPin className="w-6 h-6 text-primary" />, title: t('contact.address'), text: language === 'en' ? 'Al Thiqah Club Rd, Sharjah' : 'شارع نادي الثقة، الشارقة', link: 'https://goo.gl/maps/AlThiqahClub' },
    { icon: <Phone className="w-6 h-6 text-primary" />, title: t('contact.phone'), text: '+971 6 555 1234', link: 'tel:+97165551234' },
    { icon: <Mail className="w-6 h-6 text-primary" />, title: t('contact.email'), text: 'info@althiqah.ae', link: 'mailto:info@althiqah.ae' },
  ];

  const baseInputClasses = "w-full bg-white dark:bg-neutral-900 border px-4 py-4 text-base md:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-all duration-300 rounded-sm";

  const getInputClasses = (error?: string) => {
    return `${baseInputClasses} ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-neutral-200 dark:border-neutral-700 focus:ring-primary focus:border-primary'}`;
  };

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

      {/* Standardized Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="https://picsum.photos/1920/1080?random=contact" alt="Contact Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
        <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.contact')}</span>
                <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
             </div>
             <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('contact.title')}</h1>
             <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
               {t('contact.subtitle')}
             </p>
        </ScrollReveal>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-12">
            <ScrollReveal animation="fade-up" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, idx) => (
                <a key={idx} href={info.link} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-neutral-800 p-8 rounded-sm shadow-sm border border-neutral-100 dark:border-neutral-700 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 group focus-visible:ring-2 focus-visible:ring-primary">
                  <div className="w-12 h-12 bg-cream dark:bg-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">{info.icon}</div>
                  <h3 className={`text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-white mb-2 ${isRTL ? 'font-arabic' : 'font-sans'}`}>{info.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm">{info.text}</p>
                </a>
              ))}
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200} className="w-full h-[300px] md:h-[450px] rounded-sm overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-700 relative group">
               <iframe
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.271449340579!2d55.37255861501064!3d25.3375839838311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5bc0b0b0b0b1%3A0x6a0a0b0b0b0b0b0b!2sAl%20Thiqah%20Club%20For%20Handicapped!5e0!3m2!1sen!2sae!4v1677654321098!5m2!1sen!2sae"
                 width="100%"
                 height="100%"
                 style={{border: 0}}
                 allowFullScreen={true}
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Al Thiqah Club Location"
                 sandbox="allow-scripts allow-same-origin allow-popups"
                 className="grayscale group-hover:grayscale-0 transition-all duration-700"
                ></iframe>
            </ScrollReveal>
          </div>

          <ScrollReveal animation={isRTL ? "slide-right" : "slide-left"} delay={300} className="bg-white dark:bg-neutral-800 p-8 md:p-14 shadow-2xl rounded-sm border-t-4 border-primary relative h-full">
             <div className="mb-10">
               <h3 className={`text-3xl text-neutral-900 dark:text-white mb-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('contact.send_message')}</h3>
               <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light">{t('contact.response_time')}</p>
             </div>

             {submitted ? (
                <div className="p-8 text-center bg-green-50 dark:bg-neutral-700/50 rounded-sm border border-green-200 dark:border-green-800">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className={`text-2xl font-bold text-neutral-900 dark:text-white mb-2 ${isRTL ? 'font-arabic' : 'font-serif'}`}>{t('contact.success')}</h4>
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm" className="mt-4">{t('common.submit_another')}</Button>
                </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                      <input
                        name="name"
                        type="text"
                        placeholder={t('contact.form.name')}
                        className={getInputClasses(errors.name)}
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        autoComplete="name"
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p id="name-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
                    </div>
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder={t('contact.form.email')}
                        className={getInputClasses(errors.email)}
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={100}
                        autoComplete="email"
                        aria-describedby={errors.email ? "email-error" : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p id="email-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
                    </div>
                    <div>
                      <input
                        name="subject"
                        type="text"
                        placeholder={t('contact.form.subject')}
                        className={getInputClasses(errors.subject)}
                        value={formData.subject}
                        onChange={handleChange}
                        maxLength={200}
                        autoComplete="off"
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        aria-invalid={!!errors.subject}
                      />
                      {errors.subject && <p id="subject-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.subject}</p>}
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder={t('contact.form.message')}
                        className={getInputClasses(errors.message)}
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={2000}
                        autoComplete="off"
                        aria-describedby={errors.message ? "message-error" : undefined}
                        aria-invalid={!!errors.message}
                      ></textarea>
                      {errors.message && <p id="message-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.message}</p>}
                    </div>
                    <Button type="submit" fullWidth size="lg">{t('contact.form.send')}</Button>
                </form>
             )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};
