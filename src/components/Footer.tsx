import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Check, Loader2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { toast } from 'sonner';
import { BRAND } from '../assets/images';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Textarea } from './ui/textarea';

export function Footer() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjectOptions = [
    { value: 'Membership', labelKey: 'subject.membership' },
    { value: 'Volunteer', labelKey: 'subject.volunteer' },
    { value: 'Partnership', labelKey: 'subject.partnership' },
    { value: 'Sponsorship', labelKey: 'subject.sponsorship' },
    { value: 'Other', labelKey: 'subject.other' }
  ];

  const quickLinks = [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.programs'), href: '#programs' },
    { name: t('navigation.events'), href: '#events' },
    { name: t('navigation.contact'), href: '#contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/187u3mjwE8/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/cena.org.ca?igsh=aDdubmRkbXRwcTcw&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/cena-angolana/', label: 'LinkedIn' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t('footer.form_error'));
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
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      toast.error(t('footer.form_error_generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-[#121212] text-white pt-32 pb-12 overflow-hidden border-t border-white/5">



      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Top Grid: Contact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 lg:mb-32">

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
                    <a href="tel:+14386003393" className="text-xl font-serif text-white hover:text-[#C5A059] transition-colors">
                      +1 438-600-3393
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
            <div className="bg-[#161616] p-8 lg:p-16 border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#8B0000]"></div>

              <h4 className="text-2xl font-serif mb-12 uppercase tracking-tight">{t('footer.send_message')}</h4>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-gray-600">{t('footer.your_name')}</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C5A059] transition-all text-white placeholder:text-gray-800 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase font-bold text-gray-600">{t('footer.your_email')}</label>
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
                  <label className="text-[10px] tracking-widest uppercase font-bold text-gray-600">{t('subject.label')}</label>
                  <Select onValueChange={(v: string) => setFormData({ ...formData, subject: v })}>
                    <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus:ring-0 focus:border-[#C5A059] text-white">
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
                  <label className="text-[10px] tracking-widest uppercase font-bold text-gray-600">{t('footer.your_message')}</label>
                  <Textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#C5A059] transition-all text-white min-h-[100px] resize-none"
                  />
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

        {/* Global Footer Bottom: Monochrome Architectural */}
        <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">

          <div className="max-w-xs transition-opacity duration-500 hover:opacity-100 opacity-60">
            <img
              src={BRAND.logo}
              alt="CENA Logo"
              className="h-16 w-auto mb-8"
            />
            <p className="text-[10px] leading-loose tracking-widest text-gray-500 uppercase">
              {t('footer.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-32">
            <div>
              <span className="block text-[10px] tracking-[0.3em] font-bold text-white uppercase mb-8">{t('footer.quick_links')}</span>
              <ul className="space-y-4">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-[10px] tracking-[0.1em] text-gray-500 hover:text-[#C5A059] uppercase transition-colors">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col space-y-8">
              <span className="block text-[10px] tracking-[0.3em] font-bold text-white uppercase mb-0">{t('footer.follow_us')}</span>
              <div className="flex space-x-6">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[9px] tracking-[0.4em] text-gray-700 uppercase font-bold">
          <span>{t('footer.copyright')}</span>
          <span className="mt-4 sm:mt-0 opacity-50">{t('footer.built_with_love')}</span>
        </div>
      </div>
    </footer>
  );
}