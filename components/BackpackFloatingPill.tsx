import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Sparkles, X, ArrowUpRight } from 'lucide-react';

interface BackpackFloatingPillProps {
  onOpenModal: () => void;
}

export const BackpackFloatingPill: React.FC<BackpackFloatingPillProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9990] animate-bounce-subtle font-sans">
      <div className="bg-[#8B0000] border-2 border-[#C5A059] shadow-2xl rounded-full p-1.5 flex items-center space-x-3 text-white backdrop-blur-md">
        <button
          onClick={onOpenModal}
          className="flex items-center space-x-2 pl-3 pr-2 py-1.5 hover:opacity-90 transition-opacity"
        >
          <div className="w-7 h-7 bg-[#C5A059] text-black rounded-full flex items-center justify-center font-bold text-xs shadow-md">
            🎒
          </div>
          <div className="text-left pr-1">
            <span className="block text-[10px] text-[#C5A059] uppercase font-bold tracking-widest leading-none">
              Rentrée 2026
            </span>
            <span className="block text-xs font-serif font-bold tracking-wider uppercase text-white leading-tight">
              {t('backpack_campaign.btn_register')}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#C5A059] ml-1" />
        </button>

        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-black/30 transition-colors"
          aria-label="Dismiss Widget"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
