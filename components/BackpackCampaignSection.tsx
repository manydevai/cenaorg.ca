import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Heart, ShieldCheck, Gift, CheckCircle2, Award, Users, Link, Facebook, MessageCircle } from 'lucide-react';

import horizFr from '../assets/campaigns/backpack/horizontal-fr.jpg';
import horizPt from '../assets/campaigns/backpack/horizontal-pt.jpg';
import horizEn from '../assets/campaigns/backpack/horizontal-en.jpg';

interface BackpackCampaignSectionProps {
  isFormExpanded?: boolean;
  onToggleForm?: () => void;
}

export const BackpackCampaignSection: React.FC<BackpackCampaignSectionProps> = () => {
  const { t, language } = useLanguage();

  const registeredCount = 200;
  const progressPercentage = 100;

  // Select poster according to active language (FR, EN, PT)
  const horizontalPoster =
    language === 'fr' ? horizFr : language === 'en' ? horizEn : horizPt;

  const handleDonate = () => {
    window.open('https://buy.stripe.com/bJe9AU5JO8p764W882eAg00', '_blank', 'noopener,noreferrer');
  };

  const campaignUrl = 'https://www.cena-ca.org/#backpack-campaign';
  const shareText = language === 'fr'
    ? 'Campagne de sacs à dos CENA 2026 terminée avec succès ! 🎒'
    : language === 'en'
    ? 'CENA Backpack Program 2026 successfully completed! 🎒'
    : 'Campanha de Mochilas CENA 2026 concluída com sucesso! 🎒';

  const [linkCopied, setLinkCopied] = useState(false);

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + campaignUrl)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(campaignUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(campaignUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = campaignUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (window.location.hash === '#backpack-campaign') {
      const scrollTarget = () => {
        const el = document.getElementById('backpack-campaign');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      scrollTarget();
      const t1 = setTimeout(scrollTarget, 300);
      const t2 = setTimeout(scrollTarget, 800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  return (
    <section
      id="backpack-campaign"
      className="scroll-mt-14 sm:scroll-mt-16 pt-16 pb-20 bg-gradient-to-b from-[#121212] via-black to-[#121212] text-white relative overflow-hidden border-b border-[#C5A059]/30"
    >
      {/* Glow Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#8B0000]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-[#8B0000]/30 border border-[#8B0000] px-4 py-1.5 mb-4">
            <Award className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[#C5A059] font-sans text-xs tracking-[0.25em] uppercase font-bold">
              {t('backpack_campaign.section_badge')}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-4 uppercase">
            {t('backpack_campaign.section_title')}
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-6" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
            {t('backpack_campaign.section_subtitle')}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Poster Showcase Column (Left / 7 cols) */}
          <div className="lg:col-span-7 space-y-4" data-aos="fade-right">
            {/* Poster Display Box */}
            <div className="relative group overflow-hidden border-2 border-[#C5A059]/50 shadow-2xl bg-black flex items-center justify-center p-2">
              <img
                src={horizontalPoster}
                alt="Programme de Mochilas CENA"
                className="w-full object-contain max-h-[500px] transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-[#C5A059] font-serif font-bold text-lg">
                  "{t('backpack_campaign.slogan')}"
                </p>
              </div>
            </div>

            {/* Campaign Progress Counter Box (100% Complete) */}
            <div className="bg-black/70 border border-[#C5A059]/40 p-4 sm:p-5 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center space-x-2 text-[#C5A059]">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>{t('backpack_campaign.progress.registered_children')}: <span className="text-white text-sm font-serif font-bold">{registeredCount}</span> / 200</span>
                </div>
                <div className="text-[#C5A059] text-[11px] font-bold">
                  100% {t('backpack_campaign.progress.progress_percentage')}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#8B0000] via-[#C5A059] to-[#D4AF37] rounded-full transition-all duration-1000"
                  style={{ width: `100%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-center border-t border-white/10 text-xs">
                <div className="bg-white/5 p-2.5 border border-white/10 sm:col-span-2">
                  <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {t('backpack_campaign.progress.donors_count')}
                  </span>
                  <span className="block text-base font-serif font-bold text-[#C5A059] mt-0.5">
                    {t('backpack_campaign.progress.donors_label')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Status Column (Right / 5 cols) */}
          <div className="lg:col-span-5 space-y-6" data-aos="fade-left">
            <div className="bg-black/60 border border-white/15 p-6 sm:p-8 backdrop-blur-md space-y-6">
              
              <div className="flex items-center space-x-3 text-[#C5A059]">
                <Gift className="w-8 h-8 flex-shrink-0" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-bold block">
                    {t('backpack_campaign.target_impact_label')}
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {t('backpack_campaign.children_supported_count')}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                {t('backpack_campaign.section_desc')}
              </p>

              {/* Key Features Bullet List */}
              <div className="space-y-3 pt-2 text-xs text-gray-200">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>{t('backpack_campaign.bullet_1')}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>{t('backpack_campaign.bullet_2')}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>{t('backpack_campaign.bullet_3')}</span>
                </div>
              </div>

              {/* Status Badge & Success Announcement */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="w-full py-3.5 bg-[#8B0000]/40 border-2 border-[#C5A059] text-[#C5A059] font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 text-center px-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
                  <span>{t('backpack_campaign.status_closed')}</span>
                </div>

                <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-3.5 text-xs text-gray-200 leading-relaxed font-sans flex items-start space-x-2.5">
                  <Award className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span>{t('backpack_campaign.success_announcement')}</span>
                </div>

                <button
                  onClick={handleDonate}
                  className="w-full py-3.5 bg-transparent hover:bg-white/10 border border-[#C5A059] text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4 text-[#C5A059]" />
                  <span>{t('backpack_campaign.btn_donate')}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>{t('backpack_campaign.confidential_note')}</span>
              </div>

              {/* Share Campaign Buttons */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold text-center mb-3">
                  {t('backpack_campaign.share.label')}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleShareWhatsApp}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider transition-all duration-300 group"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                  <button
                    onClick={handleShareFacebook}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-[#1877F2]/15 hover:bg-[#1877F2]/30 border border-[#1877F2]/40 text-[#1877F2] text-xs font-bold uppercase tracking-wider transition-all duration-300 group"
                    title="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="hidden sm:inline">Facebook</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className={`flex items-center space-x-2 px-4 py-2.5 border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      linkCopied
                        ? 'bg-[#C5A059]/20 border-[#C5A059]/60 text-[#C5A059]'
                        : 'bg-white/5 hover:bg-white/10 border-white/20 text-gray-300'
                    }`}
                    title={linkCopied ? '✓' : 'Copy Link'}
                  >
                    {linkCopied ? <CheckCircle2 className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                    <span className="hidden sm:inline">{linkCopied ? t('backpack_campaign.share.copied') : t('backpack_campaign.share.copy_link')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

