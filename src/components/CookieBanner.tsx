import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cena-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cena-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cena-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto bg-[#121212] border border-white/10 p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 pointer-events-auto">
            <div className="flex-1">
              <h4 className="text-white font-serif text-lg mb-2 uppercase tracking-tight">{t('cookies.title')}</h4>
              <p className="text-gray-400 text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                {t('cookies.description')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleDecline}
                className="rounded-none border-white/10 text-white hover:bg-white/5 uppercase text-[10px] tracking-widest h-12 px-8"
              >
                {t('cookies.decline')}
              </Button>
              <Button 
                onClick={handleAccept}
                className="rounded-none bg-[#8B0000] hover:bg-[#A30000] text-white uppercase text-[10px] tracking-widest h-12 px-8"
              >
                {t('cookies.accept')}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
