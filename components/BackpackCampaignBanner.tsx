import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, X, Heart, ArrowRight } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Side: Campaign Badge & Message */}
        <div className="flex items-center space-x-3 flex-1 min-w-[280px]">
          <span className="inline-flex items-center space-x-1.5 bg-[#C5A059] text-black font-bold text-[10px] tracking-widest px-2.5 py-0.5 uppercase whitespace-nowrap shadow-sm">
            <Sparkles className="w-3 h-3 text-black" />
            <span>{t('backpack_campaign.banner_badge')}</span>
          </span>
          <p className="text-gray-200 truncate font-medium">
            {t('backpack_campaign.banner_text')}
          </p>
        </div>

        {/* Right Side: Action CTAs */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={onOpenModal}
            className="px-3.5 py-1 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-[11px] uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 shadow-md"
          >
            <span>{t('backpack_campaign.btn_register')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={handleQuickDonate}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-[11px] uppercase tracking-wider transition-colors"
          >
            <Heart className="w-3 h-3 text-[#C5A059]" />
            <span>{t('backpack_campaign.btn_donate')}</span>
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Close Announcement"
            className="p-1 text-gray-400 hover:text-white transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
