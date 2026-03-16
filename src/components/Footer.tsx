import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Check, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { BRAND } from '../assets/images';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Textarea } from './ui/textarea';
import { Link } from 'react-router-dom';
import { Checkbox } from './ui/checkbox';

export function Footer() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check URL for program parameter
    const params = new URLSearchParams(window.location.search);
    const programParam = params.get('program');
    if (programParam) {
      setFormData(prev => ({ ...prev, subject: programParam }));
    }

    // Listen for custom event from ProgramsSection
    const handleProgramSelection = (e: any) => {
      setFormData(prev => ({ ...prev, subject: e.detail }));
    };

    window.addEventListener('program-selected', handleProgramSelection);
    return () => window.removeEventListener('program-selected', handleProgramSelection);
  }, []);

  const subjectOptions = [
    { value: 'CENA Academy', labelKey: 'subject.membership' },
    { value: 'Elite Women', labelKey: 'subject.elite_women' },
    { value: 'Innovation Generation', labelKey: 'subject.programs' },
    { value: 'Mentoring Circle', labelKey: 'subject.mentoring_circle' },
    { value: 'Entrepreneur Hub', labelKey: 'subject.entrepreneur_hub' },
    { value: 'Volunteer Program', labelKey: 'subject.volunteer' },
    { value: 'Partnership', labelKey: 'subject.partnership' },
    { value: 'Sponsorship', labelKey: 'subject.sponsorship' },
    { value: 'Other', labelKey: 'subject.other' }
  ];

  const quickLinks = [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.programs'), href: '#programs' },
    { name: t('navigation.events'), href: '#events' },
    { name: t('navigation.contact'), href: '#contact' },
    { name: t('legal.privacy_policy'), href: '/privacy', isInternal: true },
    { name: t('legal.terms_of_use'), href: '/terms', isInternal: true }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61587216690943&mibextid=wwXIfr&rdid=Q4D4ZaNSgxGsoXLG#', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/cena.org.ca?igsh=aDdubmRkbXRwcTcw&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/cena-angolana/', label: 'LinkedIn' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.privacyAccepted) {
      toast.error(t('footer.form_error') + (!formData.privacyAccepted ? ` - ${t('legal.agree_terms')}` : ''));
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formbold.com/s/oYWqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSuccess(true);
        toast.success(t('footer.form_success'));
        setFormData({ name: '', email: '', subject: '', message: '', privacyAccepted: false });
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      toast.error(t('footer.form_error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-[#121212] text-white pt-32 overflow-hidden border-t border-white/5">

      {/* Top Grid: Contact & Form */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Column 1: Identity & Contact */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-16">
            <div>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-[#C5A059] font-sans text-[10px] tracking-[0.4em] uppercase font-bold">{t('footer.contact_bureau')}</span>
                <span className="h-px flex-1 bg-white/10"></span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-serif leading-tight mb-12 tracking-tight">
                {t('footer.get_in_touch')}
              </h2>

              <div className="space-y-10">
                <div className="group cursor-default">
                  <span className="block text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase mb-3">{t('footer.our_location')}</span>
                  <p className="text-gray-300 font-sans leading-relaxed">
                    3181 Montée Saint-hubert, QC, Canada
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="group cursor-default">
                    <span className="block text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase mb-3">{t('footer.phone')}</span>
                    <a href="tel:+12633794805" className="text-xl font-serif text-white hover:text-[#C5A059] transition-colors">
                      +1 263-379-4805
                    </a>
                  </div>
                  <div className="group cursor-default">
                    <span className="block text-[10px] tracking-[0.2em] font-bold text-gray-500 uppercase mb-3">{t('footer.email')}</span>
                    <a href="mailto:info1@cena-ca.org" className="text-xl font-serif text-white hover:text-[#C5A059] transition-colors">
                      info1@cena-ca.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-10 border border-white/5 bg-white/[0.02]">
              <h4 className="text-xs tracking-[0.3em] font-bold text-[#C5A059] uppercase mb-4">{t('footer.about_cena')}</h4>
              <p className="text-xs text-gray-500 leading-loose">
                {t('footer.about_text')}
              </p>
            </div>
          </div>

          {/* Column 2: Minimalist Form */}
          <div className="lg:col-span-7">
            <div 
              id="strategic-liaison-form" 
              className="bg-[#161616] p-8 lg:p-16 border border-white/10 shadow-2xl relative scroll-mt-[100px]"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#8B0000]"></div>

              <h4 className="text-2xl font-serif mb-12 uppercase tracking-tight">{t('footer.send_message')}</h4>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-white/60">{t('footer.your_name')}</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C5A059] transition-all text-white placeholder:text-gray-800 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-white/60">{t('footer.your_email')}</label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C5A059] transition-all text-white placeholder:text-gray-800 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-bold text-white/60">{t('subject.label')}</label>
                  <Select 
                    value={formData.subject}
                    onValueChange={(v: string) => setFormData({ ...formData, subject: v })}
                  >
                    <SelectTrigger className={`bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus:ring-0 focus:border-[#C5A059] text-white transition-all duration-300 ${formData.subject ? 'border-[#C5A059] shadow-[0_4px_12px_rgba(197,160,89,0.1)]' : ''}`}>
                      <SelectValue placeholder={t('subject.placeholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#161616] border-white/10 text-white rounded-none">
                      {subjectOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="focus:bg-white focus:text-black rounded-none">
                          {t(opt.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase font-bold text-white/60">{t('footer.your_message')}</label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C5A059] transition-all text-white min-h-[100px] resize-none"
                  />
                </div>

                <div
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => setFormData({ ...formData, privacyAccepted: !formData.privacyAccepted })}
                >
                  {/* Custom compact checkbox */}
                  <div
                    className={`relative flex-shrink-0 w-3 h-3 border transition-all duration-200 ${
                      formData.privacyAccepted
                        ? 'bg-[#8B0000] border-[#8B0000]'
                        : 'bg-transparent border-white/30 hover:border-white/60'
                    }`}
                  >
                    {formData.privacyAccepted && (
                      <svg
                        viewBox="0 0 10 8"
                        className="absolute inset-0 w-full h-full p-[1.5px]"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="1,4 4,7 9,1" />
                      </svg>
                    )}
                  </div>
                  <label
                    htmlFor="privacy-consent"
                    className="text-[9px] tracking-[0.2em] font-bold text-gray-500 uppercase leading-none cursor-pointer hover:text-white transition-colors"
                  >
                    {t('legal.agree_terms')}
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full h-16 rounded-none text-[10px] tracking-[0.3em] font-bold uppercase transition-all duration-500 ${isSuccess
                    ? "bg-green-600 text-white"
                    : "bg-[#8B0000] hover:bg-[#A30000] text-white group"
                    }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : isSuccess ? (
                    <div className="flex items-center space-x-3">
                      <Check className="h-4 w-4" />
                      <span>{t('footer.sent')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <span>{t('footer.send_message_btn')}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Solid White Monolithic Section */}
      <div className="w-full bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16">

            {/* Logo and Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="max-w-xs transition-opacity duration-500 opacity-90 mx-auto md:mx-0 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <img
                src={BRAND.logo}
                alt="CENA Logo"
                className="h-16 w-auto mb-8"
              />
              <p className="text-[10px] leading-relaxed tracking-widest text-[#121212]/70 uppercase font-bold">
                {t('footer.description')}
              </p>
            </motion.div>

            {/* Links and Socials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-auto grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 lg:gap-32"
            >
              <div className="flex flex-col items-start">
                <span className="block text-[10px] tracking-[0.3em] font-extrabold text-[#121212] uppercase mb-8">{t('footer.quick_links')}</span>
                <ul className="space-y-4">
                  {quickLinks.map((link: any, idx) => (
                    <li key={idx}>
                      {link.isInternal ? (
                        <Link to={link.href} className="text-[10px] font-bold tracking-[0.1em] text-[#121212]/60 hover:text-[#C5A059] uppercase transition-colors">
                          {link.name}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-[10px] font-bold tracking-[0.1em] text-[#121212]/60 hover:text-[#C5A059] uppercase transition-colors">
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-start space-y-8">
                <span className="block text-[10px] tracking-[0.3em] font-extrabold text-[#121212] uppercase mb-0">{t('footer.follow_us')}</span>
                <div className="flex justify-start space-x-6">
                  {socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#121212]/60 hover:text-[#C5A059] transition-colors"
                    >
                      <link.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#121212] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 flex items-center justify-between gap-4">
          {/* Left spacer for balance */}
          <div className="hidden sm:block w-[180px]" />

          {/* Centered Copyright */}
          <p className="flex-1 text-center text-[9px] tracking-[0.25em] text-white/40 uppercase font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {t('footer.copyright')}
          </p>

          {/* Right Signature */}
          <span className="text-[9px] tracking-[0.25em] font-bold uppercase text-white/60 hover:text-white transition-colors cursor-default whitespace-nowrap w-[180px] text-right hidden sm:block">
            {t('footer.built_with_love')}
          </span>
        </div>
      </div>
    </footer>
  );
}