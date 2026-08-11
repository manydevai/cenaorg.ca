import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Award, X, Heart, ArrowRight } from 'lucide-react';

interface BackpackCampaignBannerProps {
  onOpenModal: () => void;
}

export const BackpackCampaignBanner: React.FC<BackpackCampaignBannerProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('cena-backpack-banner-dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('cena-backpack-banner-dismissed', 'true');
  };

  const handleQuickDonate = () => {
    window.open('https://buy.stripe.com/bJe9AU5JO8p764W882eAg00', '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#8B0000] via-[#5A0000] to-[#121212] border-b border-[#C5A059]/40 text-white relative z-[10001] transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 text-xs">
        
        {/* Left Side: Campaign Badge & Message */}
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <span className="inline-flex items-center space-x-1 bg-[#C5A059] text-black font-bold text-[9px] sm:text-[10px] tracking-wider px-2 py-0.5 uppercase whitespace-nowrap shadow-xs flex-shrink-0">
            <Award className="w-3 h-3 text-black" />
            <span className="hidden xs:inline">{t('backpack_campaign.banner_badge')}</span>
            <span className="xs:hidden">2026</span>
          </span>
          <p className="text-gray-200 truncate font-medium text-[11px] sm:text-xs">
            {t('backpack_campaign.banner_text')}
          </p>
        </div>

        {/* Right Side: Action CTAs */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={onOpenModal}
            className="px-2.5 py-1 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1 shadow-md whitespace-nowrap"
          >
            <span>{t('backpack_campaign.btn_register')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={handleQuickDonate}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
          >
            <Heart className="w-3 h-3 text-[#C5A059]" />
            <span>{t('backpack_campaign.btn_donate')}</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Close Announcement"
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
