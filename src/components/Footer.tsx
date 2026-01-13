import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { BRAND } from '../assets/images';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { Textarea } from './ui/textarea';

export function Footer() {
  const { t } = useLanguage();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjectOptions = [
    { value: 'Membership', labelKey: 'footer.subject_membership' },
    { value: 'Volunteer', labelKey: 'footer.subject_volunteer' },
    { value: 'Partnership', labelKey: 'footer.subject_partnership' },
    { value: 'Sponsorship', labelKey: 'footer.subject_sponsorship' },
    { value: 'Workshop', labelKey: 'footer.subject_workshop' },
    { value: 'Networking Event', labelKey: 'footer.subject_networking' },
    { value: 'Entrepreneurship Program', labelKey: 'footer.subject_entrepreneurship' },
    { value: 'Education Program', labelKey: 'footer.subject_education' },
    { value: 'Other', labelKey: 'footer.subject_other' }
  ];
  
  const quickLinks = [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.mission'), href: '#mission' },
    { name: t('navigation.vision'), href: '#vision' },
    { name: t('navigation.programs'), href: '#programs' },
    { name: t('navigation.events'), href: '#events' },
    { name: t('navigation.team'), href: '#team' },
    { name: t('navigation.blog'), href: '#blog' }
  ];

  const legalLinks = [
    { name: t('footer.privacy_policy'), href: '#' },
    { name: t('footer.terms_of_service'), href: '#' },
    { name: 'Rapports annuels', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/187u3mjwE8/?mibextid=wwXIfr', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/cena.org.ca?igsh=aDdubmRkbXRwcTcw&utm_source=qr', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/cena-angolana/', label: 'LinkedIn' }
  ];

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t('footer.form_error') || 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(t('footer.email_error') || 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formbold.com/s/oYWqq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success(t('footer.form_success') || 'Message sent successfully! We\'ll get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('footer.form_error_generic') || 'Failed to send message. Please try again or email us directly at info@carh.nl');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-[#A32020] to-[#8B1B1B] text-white">
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl sm:text-2xl mb-4 sm:mb-6">{t('footer.get_in_touch')}</h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg mb-1">{t('footer.our_location')}</h4>
                  <p className="text-sm sm:text-base text-white/90">
                    3181 Montée Saint-hubert, QC, Canada<br />
                    CENA - Comunidade de Educação e Networking Angolana<br />
                    Community Organization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg mb-1">{t('footer.phone')}</h4>
                  <a href="tel:+14386003393" className="text-sm sm:text-base text-white/90 hover:text-[#FDB913] transition-colors">
                    +1 438-600-3393
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg mb-1">{t('footer.email')}</h4>
                  <p className="text-sm sm:text-base text-white/90">
                    <a href="mailto:info1@cena-ca.org" className="hover:text-[#FDB913] transition-colors">info1@cena-ca.org</a>
                  </p>
                </div>
              </div>
            </div>

            {/* About CENA */}
            <div className="mt-6 sm:mt-8 p-4 bg-[rgba(0,0,0,0.79)] rounded-lg border border-[#FDB913]/20">
              <h4 className="text-base sm:text-lg mb-2">{t('footer.about_cena')}</h4>
              <p className="text-xs sm:text-sm text-white/90">
                {t('footer.about_text')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl mb-3 sm:mb-4 text-white">{t('footer.send_message')}</h4>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder={t('footer.your_name')}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={isSubmitting}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-[#FDB913]"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder={t('footer.your_email')}
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={isSubmitting}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-[#FDB913]"
                    />
                  </div>
                  <Select
                    name="subject"
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                    disabled={isSubmitting}
                    required
                  >
                    <SelectTrigger 
                      id="contact-subject"
                      className="bg-white/10 border-white/30 text-white focus:border-[#FDB913] data-[placeholder]:text-white/60"
                    >
                      <SelectValue placeholder={t('footer.subject_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {t(option.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    name="message"
                    placeholder={t('footer.your_message')}
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    disabled={isSubmitting}
                    required
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-[#FDB913]"
                  />
                  <Button 
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className={`w-full font-bold transition-all duration-300 ${
                      isSuccess 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-[#FDB913] hover:bg-[#E5A50D] text-black"
                    } disabled:opacity-80 disabled:cursor-not-allowed h-12`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{t('footer.sending') || 'Sending...'}</span>
                      </div>
                    ) : isSuccess ? (
                      <div className="flex items-center gap-2 justify-center">
                        <Check className="h-5 w-5" />
                        <span>{t('footer.sent')}</span>
                      </div>
                    ) : (
                      t('footer.send_message_btn')
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 bg-[rgba(209,162,34,0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <img 
                src="https://i.ibb.co/d0ZDFdVc/CENA.jpg" 
                alt="CENA Logo" 
                className="h-20 w-auto mb-4 rounded-2xl"
              />
              <p className="text-white/90 mb-4">
                {t('footer.description')}
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="w-10 h-10 bg-white/10 hover:bg-[#FDB913] rounded-full flex items-center justify-center transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg mb-4">{t('footer.quick_links')}</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-[#FDB913] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white/90 hover:text-[#FDB913] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/90 text-sm">
            <p className="mb-2">{t('footer.copyright')}</p>
            <p>{t('footer.built_with_love')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}