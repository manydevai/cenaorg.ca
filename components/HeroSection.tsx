import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    '/hero/1.webp',
    '/hero/2.webp',
    '/hero/3.webp',
    '/hero/4.webp',
    '/hero/5.webp'
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBg((prev: number) => (prev + 1) % backgrounds.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const handleNext = () => {
    setCurrentBg((prev) => (prev + 1) % backgrounds.length);
  };

  const handlePrev = () => {
    setCurrentBg((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen lg:min-h-screen flex flex-col justify-end lg:justify-center overflow-hidden border-b border-white/5 bg-[#090909] w-full max-w-full"
    >
      {/* =========================================================
          DESKTOP BACKGROUND & LAYOUT (hidden on mobile, lg:block)
         ========================================================= */}
      <div className="hidden lg:block absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={`desktop-bg-${index}`}
            className={`absolute inset-0 bg-cover bg-[right_top] transition-opacity duration-[800ms] ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />
        ))}
      </div>

      {/* DESKTOP GRADIENT MASK */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10 pointer-events-none" />

      {/* DESKTOP ARCHITECTURAL DECORATION LINES */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute left-[5%] top-0 w-px h-full bg-white/20"></div>
        <div className="absolute right-[10%] top-0 w-px h-full bg-white/10"></div>
        <div className="absolute top-[30%] left-0 w-full h-px bg-white/10"></div>
      </div>

      {/* DESKTOP TYPOGRAPHIC COLUMN & LAYOUT (lg+) */}
      <div className="hidden lg:flex relative z-20 w-full h-full items-center px-6 sm:px-12 lg:pl-12 lg:pr-10 pt-0 lg:pt-40 pb-24 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">
          <div className={`lg:col-span-10 xl:col-span-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center space-x-3 mb-3 lg:mb-16 lg:-mt-12 lg:relative lg:-top-44">
              <span className="h-px w-12 bg-[#C5A059] shadow-sm"></span>
              <span className="text-[#C5A059] font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                {t('hero.subtitle')}
              </span>
            </div>

            <h1 className="text-white font-serif text-2xl sm:text-4xl md:text-5xl lg:text-5xl uppercase mb-6 sm:mb-10 lg:mb-12 leading-[1.15] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
              {t('hero.title').split(/[,&]+/).map((part, i) => (
                <span key={i} className="block">
                  <span className={i === 1 ? "text-[#C5A059]" : "text-white"}>
                    {part.trim()}
                  </span>
                </span>
              ))}
            </h1>

            <div className="max-w-xl">
              <p className="text-gray-100 text-sm sm:text-base md:text-lg font-sans mb-8 sm:mb-12 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] font-medium">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  className="group relative inline-flex items-center gap-3 border border-white/50 hover:border-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-lg"
                  onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.cta_primary')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* =========================================================
          MOBILE HERO LAYOUT (< lg) — Full Screen Bleed, Clean Uncropped Photos, Compact Text
         ========================================================= */}
      <div className="lg:hidden absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Ambient Blurred Backdrop to fill screen background */}
        {backgrounds.map((bg, index) => (
          <div
            key={`mobile-ambient-${index}`}
            className={`absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 transition-opacity duration-800 ease-in-out ${index === currentBg ? 'opacity-40' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
      </div>

      {/* Layer 2: Main Full Photo Display Container (Top 70vh on Mobile - 100% Uncropped, All Faces Visible) */}
      <div className="lg:hidden absolute top-0 inset-x-0 h-[68vh] z-10 pt-20 px-3 sm:px-6 flex items-center justify-center pointer-events-none">
        {backgrounds.map((bg, index) => (
          <img
            key={`mobile-full-photo-${index}`}
            src={bg}
            alt={`CENA Hero Photo ${index + 1}`}
            className={`w-full h-full object-contain drop-shadow-2xl transition-opacity duration-800 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Touch Prev / Next Buttons */}
        <button
          onClick={handlePrev}
          className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-[#C5A059]/40 text-[#C5A059] backdrop-blur-sm"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 border border-[#C5A059]/40 text-[#C5A059] backdrop-blur-sm"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Layer 3: Sleek & Compact Text Overlay at the Bottom of Mobile View */}
      <div className="lg:hidden relative z-20 w-full bg-gradient-to-t from-[#090909] via-[#090909]/95 to-transparent pt-16 pb-8 px-5 sm:px-8 space-y-2.5">
        {/* Slide Indicator Dots */}
        <div className="flex items-center justify-center space-x-1.5 pb-1">
          {backgrounds.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => setCurrentBg(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${idx === currentBg ? 'w-5 bg-[#C5A059]' : 'w-1 bg-white/30'}`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Subtitle */}
        <div className="flex items-center space-x-2">
          <span className="h-px w-6 bg-[#C5A059]"></span>
          <span className="text-[#C5A059] font-sans text-[9px] tracking-[0.3em] uppercase font-bold">
            {t('hero.subtitle')}
          </span>
        </div>

        {/* Compact Title */}
        <h1 className="text-white font-serif text-lg sm:text-xl uppercase leading-snug tracking-tight">
          {t('hero.title').split(/[,&]+/).map((part, i) => (
            <span key={i} className="inline-block mr-1">
              <span className={i === 1 ? "text-[#C5A059]" : "text-white"}>
                {part.trim()}
              </span>
            </span>
          ))}
        </h1>

        {/* Minimal Description */}
        <p className="text-gray-300 text-[10px] sm:text-xs font-sans leading-relaxed opacity-90 line-clamp-2 max-w-sm">
          {t('hero.description')}
        </p>

        {/* Sleek Compact CTA Button */}
        <div className="pt-1.5">
          <button
            className="group inline-flex items-center gap-2 border border-[#C5A059] bg-[#8B0000] hover:bg-[#A00000] text-white px-4 py-2.5 text-[9px] sm:text-[10px] tracking-[0.18em] font-bold uppercase transition-all duration-300 shadow-xl rounded-xs"
            onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="h-3 w-3 text-[#C5A059] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* BRAND WATERMARK (Desktop only) */}
      <div className="absolute left-[5%] bottom-[5%] text-[8rem] sm:text-[15rem] font-serif text-white/[0.05] select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        Cena
      </div>
    </section>
  );
}