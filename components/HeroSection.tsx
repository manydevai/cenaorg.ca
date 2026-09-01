import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { BRAND } from '../assets/images';

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
    }, 2800);
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
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5 bg-[#090909]"
    >
      {/* DESKTOP BACKGROUND — Full-Bleed Cover (lg+) */}
      <div className="hidden lg:block absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={`full-bg-${index}`}
            className={`absolute inset-0 bg-cover bg-[right_top] transition-opacity duration-[700ms] ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
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

      {/* MOBILE HERO LAYOUT (< lg) — Full Photo View, Zero Cropping, All Faces Visible */}
      <div className="lg:hidden relative z-20 w-full pt-28 pb-12 px-5 sm:px-8 flex flex-col">
        {/* Mobile Ambient Blurred Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {backgrounds.map((bg, index) => (
            <div
              key={`mobile-blur-${index}`}
              className={`absolute inset-0 bg-cover bg-center blur-2xl opacity-30 scale-110 transition-opacity duration-700 ${index === currentBg ? 'opacity-30' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/90 via-[#090909]/75 to-[#090909]" />
        </div>

        <div className="relative z-10 space-y-5">
          {/* Subtitle Badge */}
          <div className="flex items-center space-x-2.5">
            <span className="h-px w-8 bg-[#C5A059]"></span>
            <span className="text-[#C5A059] font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-white font-serif text-2.5xl sm:text-4xl uppercase leading-[1.15] tracking-tight">
            {t('hero.title').split(/[,&]+/).map((part, i) => (
              <span key={i} className="block">
                <span className={i === 1 ? "text-[#C5A059]" : "text-white"}>
                  {part.trim()}
                </span>
              </span>
            ))}
          </h1>

          {/* MOBILE HERO PHOTO FRAME — Full 100% Group View (Zero Edge Cropping, All People & Faces Visible) */}
          <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-black/90 group my-2">
            {backgrounds.map((bg, index) => (
              <div
                key={`mobile-photo-${index}`}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${index === currentBg ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                <img
                  src={bg}
                  alt={`CENA Hero Photo ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}

            {/* Manual Touch Navigation Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#8B0000] transition-colors"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#8B0000] transition-colors"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-2.5 inset-x-0 z-20 flex items-center justify-center space-x-1.5 pointer-events-auto">
              {backgrounds.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentBg(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentBg ? 'w-6 bg-[#C5A059]' : 'w-1.5 bg-white/40'}`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed font-medium">
            {t('hero.description')}
          </p>

          {/* CTA Primary Action */}
          <div className="pt-2">
            <button
              className="w-full group inline-flex items-center justify-center gap-3 border border-[#C5A059] bg-[#8B0000] hover:bg-[#A00000] text-white px-6 py-3.5 text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-xl rounded-sm"
              onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>{t('hero.cta_primary')}</span>
              <ArrowRight className="h-4 w-4 text-[#C5A059] transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
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

      {/* BRAND WATERMARK */}
      <div className="absolute left-[5%] bottom-[5%] text-[8rem] sm:text-[15rem] font-serif text-white/[0.05] select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        Cena
      </div>
    </section>
  );
}