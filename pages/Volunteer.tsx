import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';
import { Check, HeartHandshake, AlertCircle } from 'lucide-react';
import { VolunteerFormData } from '../types';

export const Volunteer: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    interests: [],
    availability: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const interests = [
    { id: 'coaching', label: t('volunteer.interest.coaching') },
    { id: 'events', label: t('volunteer.interest.events') },
    { id: 'admin', label: t('volunteer.interest.admin') },
    { id: 'medical', label: t('volunteer.interest.medical') }
  ];

  const handleInterestChange = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.required');

    if (!formData.email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.email');
    }

    if (!formData.phone.trim()) {
        newErrors.phone = t('validation.required');
    } else if (!/^[\d\+\-\s]{8,}$/.test(formData.phone)) {
        newErrors.phone = t('validation.phone');
    }

    if (!formData.availability.trim()) newErrors.availability = t('validation.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setTimeout(() => {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 500);
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

  const baseInputClasses = "w-full bg-white dark:bg-neutral-800 border px-4 py-3 text-base md:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 transition-all duration-300 rounded-sm";
  const labelClasses = "block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2";

  const getInputClasses = (error?: string) => {
    return `${baseInputClasses} ${error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-neutral-200 dark:border-neutral-700 focus:ring-primary focus:border-primary'}`;
  };

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

        {/* Standardized Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/1920/1080?random=volunteer" alt="Volunteer Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
            <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

            <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.get_involved')}</span>
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                </div>
                <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('volunteer.title')}</h1>
                <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                {t('volunteer.subtitle')}
                </p>
            </ScrollReveal>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto">
                {submitted ? (
                    <ScrollReveal animation="scale-up" className="bg-white dark:bg-neutral-800 p-8 md:p-12 rounded-sm shadow-xl border-t-4 border-primary text-center">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10" />
                        </div>
                        <h2 className={`text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('volunteer.thank_you_title')}</h2>
                        <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-8">{t('volunteer.success')}</p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">{t('common.submit_another')}</Button>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal animation="fade-up" className="bg-white dark:bg-neutral-800 p-8 md:p-12 shadow-2xl rounded-sm border border-neutral-100 dark:border-neutral-700 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold to-primary"></div>

                        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={labelClasses} htmlFor="name-input">{t('volunteer.name')}</label>
                                    <input
                                        id="name-input"
                                        name="name"
                                        type="text"
                                        required
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
                                    <label className={labelClasses} htmlFor="email-input">{t('volunteer.email')}</label>
                                    <input
                                        id="email-input"
                                        name="email"
                                        type="email"
                                        required
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className={labelClasses} htmlFor="phone-input">{t('volunteer.phone')}</label>
                                    <input
                                        id="phone-input"
                                        name="phone"
                                        type="tel"
                                        required
                                        className={getInputClasses(errors.phone)}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        maxLength={20}
                                        autoComplete="tel"
                                        aria-describedby={errors.phone ? "phone-error" : undefined}
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && <p id="phone-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone}</p>}
                                </div>
                                <div>
                                    <label className={labelClasses} htmlFor="availability-input">{t('volunteer.availability')}</label>
                                    <input
                                        id="availability-input"
                                        name="availability"
                                        type="text"
                                        placeholder={t('volunteer.availability_placeholder')}
                                        className={getInputClasses(errors.availability)}
                                        value={formData.availability}
                                        onChange={handleChange}
                                        maxLength={50}
                                        autoComplete="off"
                                        aria-describedby={errors.availability ? "availability-error" : undefined}
                                        aria-invalid={!!errors.availability}
                                    />
                                    {errors.availability && <p id="availability-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.availability}</p>}
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>{t('volunteer.interests')}</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {interests.map((interest) => (
                                        <button
                                            type="button"
                                            key={interest.id}
                                            onClick={() => handleInterestChange(interest.id)}
                                            className={`p-4 border rounded-sm transition-all duration-300 flex items-center gap-3 text-left focus-visible:ring-2 focus-visible:ring-primary ${
                                                formData.interests.includes(interest.id)
                                                    ? 'bg-primary text-white border-primary shadow-lg transform scale-105'
                                                    : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-primary/50'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${formData.interests.includes(interest.id) ? 'border-white bg-white text-primary' : 'border-neutral-400'}`}>
                                                {formData.interests.includes(interest.id) && <Check className="w-3 h-3" />}
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-wider ${isRTL ? 'font-arabic' : 'font-sans'}`}>{interest.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses} htmlFor="message-input">{t('volunteer.experience')}</label>
                                <textarea
                                    id="message-input"
                                    name="message"
                                    rows={4}
                                    className={getInputClasses(errors.message)}
                                    value={formData.message}
                                    onChange={handleChange}
                                    maxLength={2000}
                                    autoComplete="off"
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" fullWidth size="lg" className="shadow-xl shadow-primary/20">
                                    <span className="flex items-center gap-2">
                                        {t('volunteer.submit')} <HeartHandshake className="w-5 h-5" />
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </ScrollReveal>
                )}
            </div>
        </div>
    </div>
  );
};
