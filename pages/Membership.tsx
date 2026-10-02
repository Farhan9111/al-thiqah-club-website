import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';
import { Check, UserPlus, Upload, AlertCircle } from 'lucide-react';
import { MembershipFormData } from '../types';

export const Membership: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<MembershipFormData>({
    name: '',
    dob: '',
    gender: 'male',
    guardian: '',
    phone: '',
    email: '',
    address: '',
    disabilityType: '',
    assistiveDevices: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t('validation.required');
    if (!formData.dob.trim()) newErrors.dob = t('validation.required');
    if (!formData.phone.trim()) {
        newErrors.phone = t('validation.required');
    } else if (!/^[\d\+\-\s]{8,}$/.test(formData.phone)) {
        newErrors.phone = t('validation.phone');
    }
    if (!formData.email.trim()) {
        newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('validation.email');
    }
    if (!formData.address.trim()) newErrors.address = t('validation.required');
    if (!formData.disabilityType.trim()) newErrors.disabilityType = t('validation.required');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // Accessible File Upload Component
  const FileUploadField = ({ label, id }: { label: string, id: string }) => (
    <div className="relative group">
      <label className={labelClasses} htmlFor={id}>{label}</label>
      <div className="flex items-center justify-center w-full">
        <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-sm cursor-pointer bg-neutral-50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 hover:border-primary transition-all duration-300 group-hover:shadow-md focus-within:ring-2 focus-within:ring-primary">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-neutral-400 group-hover:text-primary transition-colors" aria-hidden="true" />
                <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400 text-center"><span className="font-semibold">{t('common.click_to_upload')}</span></p>
                <p className="text-[10px] text-neutral-400 text-center px-2">{t('membership.upload_guide')}</p>
            </div>
            <input id={id} type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-cream dark:bg-dark-bg min-h-screen transition-colors duration-500">

        {/* Standardized Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <img src="https://picsum.photos/1920/1080?random=membership" alt="Membership Hero" className="absolute inset-0 w-full h-full object-cover animate-kenBurns" />
            <div className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

            <ScrollReveal className="relative z-10 container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-4 mb-4 opacity-90">
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-xs">{t('nav.get_involved')}</span>
                    <div className="h-[1px] w-8 md:w-16 bg-white/60"></div>
                </div>
                <h1 className={`text-4xl sm:text-5xl md:text-7xl text-white mb-6 leading-tight drop-shadow-2xl ${isRTL ? 'font-arabic font-bold' : 'font-serif font-medium italic'}`}>{t('membership.title')}</h1>
                <p className={`text-white/90 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md ${isRTL ? 'font-arabic' : 'font-sans'}`}>
                {t('membership.subtitle')}
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
                        <h2 className={`text-3xl md:text-4xl text-neutral-900 dark:text-white mb-4 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('membership.received_title')}</h2>
                        <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-8">{t('membership.success')}</p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">{t('common.return_home')}</Button>
                    </ScrollReveal>
                ) : (
                    <ScrollReveal animation="fade-up" className="bg-white dark:bg-neutral-800 p-8 md:p-12 shadow-2xl rounded-sm border border-neutral-100 dark:border-neutral-700 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary via-gold to-primary"></div>

                        <form onSubmit={handleSubmit} className="space-y-12" noValidate>

                            {/* Personal Info */}
                            <div className="space-y-6">
                                <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-700 pb-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('membership.section.personal')}</h3>
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
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses} htmlFor="dob-input">{t('membership.dob')}</label>
                                            <input
                                                id="dob-input"
                                                name="dob"
                                                type="date"
                                                required
                                                className={getInputClasses(errors.dob)}
                                                value={formData.dob}
                                                onChange={handleChange}
                                                autoComplete="bday"
                                                aria-describedby={errors.dob ? "dob-error" : undefined}
                                                aria-invalid={!!errors.dob}
                                            />
                                            {errors.dob && <p id="dob-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.dob}</p>}
                                        </div>
                                        <div>
                                            <label className={labelClasses} htmlFor="gender-select">{t('membership.gender')}</label>
                                            <select
                                                id="gender-select"
                                                name="gender"
                                                className={getInputClasses()}
                                                value={formData.gender}
                                                onChange={handleChange}
                                                autoComplete="sex"
                                            >
                                                <option value="male">{t('membership.gender.male')}</option>
                                                <option value="female">{t('membership.gender.female')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClasses} htmlFor="guardian-input">{t('membership.guardian')}</label>
                                    <input
                                        id="guardian-input"
                                        name="guardian"
                                        type="text"
                                        className={getInputClasses()}
                                        value={formData.guardian}
                                        onChange={handleChange}
                                        maxLength={100}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-6">
                                <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-700 pb-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('membership.section.contact')}</h3>
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
                                <div>
                                    <label className={labelClasses} htmlFor="address-input">{t('contact.address')}</label>
                                    <input
                                        id="address-input"
                                        name="address"
                                        type="text"
                                        required
                                        className={getInputClasses(errors.address)}
                                        value={formData.address}
                                        onChange={handleChange}
                                        maxLength={200}
                                        autoComplete="street-address"
                                        aria-describedby={errors.address ? "address-error" : undefined}
                                        aria-invalid={!!errors.address}
                                    />
                                    {errors.address && <p id="address-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.address}</p>}
                                </div>
                            </div>

                            {/* Disability Info */}
                            <div className="space-y-6">
                                <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-700 pb-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('membership.section.disability')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className={labelClasses} htmlFor="disabilityType-input">{t('membership.disability_type')}</label>
                                        <input
                                            id="disabilityType-input"
                                            name="disabilityType"
                                            type="text"
                                            required
                                            className={getInputClasses(errors.disabilityType)}
                                            value={formData.disabilityType}
                                            onChange={handleChange}
                                            maxLength={100}
                                            aria-describedby={errors.disabilityType ? "disabilityType-error" : undefined}
                                            aria-invalid={!!errors.disabilityType}
                                        />
                                        {errors.disabilityType && <p id="disabilityType-error" className="text-danger text-[10px] mt-1 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.disabilityType}</p>}
                                    </div>
                                    <div>
                                        <label className={labelClasses} htmlFor="assistiveDevices-input">{t('membership.assistive_devices')}</label>
                                        <input
                                            id="assistiveDevices-input"
                                            name="assistiveDevices"
                                            type="text"
                                            className={getInputClasses()}
                                            value={formData.assistiveDevices}
                                            onChange={handleChange}
                                            maxLength={200}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Documents Upload Section */}
                            <div className="space-y-6">
                                <h3 className={`text-xl md:text-2xl text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-700 pb-2 ${isRTL ? 'font-arabic font-bold' : 'font-serif'}`}>{t('membership.section.documents')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <FileUploadField id="id_card" label={t('membership.id_card')} />
                                    <FileUploadField id="passport_photo" label={t('membership.passport_photo')} />
                                    <FileUploadField id="medical_report" label={t('membership.medical_report')} />
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" fullWidth size="lg" className="shadow-xl shadow-primary/20">
                                    <span className="flex items-center gap-2">
                                        {t('membership.submit')} <UserPlus className="w-5 h-5" />
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
