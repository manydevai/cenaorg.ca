import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, ArrowUpRight } from 'lucide-react';

interface BackpackFloatingPillProps {
  onOpenModal: () => void;
}

export const BackpackFloatingPill: React.FC<BackpackFloatingPillProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[9990] animate-bounce-subtle font-sans scale-90 sm:scale-100 origin-bottom-right">
      <div className="bg-[#8B0000] border-2 border-[#C5A059] shadow-2xl rounded-full p-1 sm:p-1.5 flex items-center space-x-2 sm:space-x-3 text-white backdrop-blur-md">
        <button
          onClick={onOpenModal}
          className="flex items-center space-x-2 pl-2 sm:pl-3 pr-1.5 sm:pr-2 py-1 sm:py-1.5 hover:opacity-90 transition-opacity"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#C5A059] text-black rounded-full flex items-center justify-center font-bold text-xs shadow-md">
            🎒
          </div>
          <div className="text-left pr-1">
            <span className="block text-[9px] sm:text-[10px] text-[#C5A059] uppercase font-bold tracking-widest leading-none">
              Rentrée 2026
            </span>
            <span className="block text-[11px] sm:text-xs font-serif font-bold tracking-wider uppercase text-white leading-tight">
              {t('backpack_campaign.btn_register')}
            </span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] ml-0.5" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 sm:p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-black/30 transition-colors"
          aria-label="Dismiss Widget"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
