import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'FR', flag: '🇫🇷' },
    { code: 'en', name: 'EN', flag: '🇨🇦' },
    { code: 'pt', name: 'PT', flag: '🇦🇴' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        className={`flex items-center space-x-1.5 transition-colors py-2 px-2.5 min-h-[44px] min-w-[44px] justify-center group cursor-pointer select-none ${isScrolled ? 'text-gray-700 hover:text-[#121212]' : 'text-gray-300 hover:text-white'}`}
      >
        <Globe className="h-3.5 w-3.5 text-[#C5A059] flex-shrink-0" />
        <span className="text-[10px] tracking-[0.2em] font-bold uppercase">{currentLanguage?.code}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-40 bg-white border border-gray-100 shadow-2xl z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as 'fr' | 'en' | 'pt');
                setIsOpen(false);
              }}
              className={`flex items-center justify-between w-full px-5 py-4 hover:bg-gray-50 transition-colors group ${language === lang.code ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] tracking-widest font-bold ${language === lang.code ? 'text-[#C5A059]' : 'text-gray-600 group-hover:text-[#121212]'}`}>
                  {lang.name}
                </span>
              </div>
              {language === lang.code && (
                <Check className="h-3 w-3 text-[#C5A059]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}