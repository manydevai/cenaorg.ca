import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { BRAND } from '../assets/images';

export function HeroSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    BRAND.teamShot,
    BRAND.heroBackground
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBg((prev: number) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Dynamic Full-Bleed Background - Entire Section */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={`full-bg-${index}`}
            className={`absolute inset-0 bg-cover bg-center lg:bg-[right_center] transition-opacity duration-[3000ms] ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${bg})`,
              transform: 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* Very subtle protection for text legibility - NOT a black band */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>

      {/* Structural Decoration: Architectural Lines */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute left-[5%] top-0 w-px h-full bg-white/20"></div>
        <div className="absolute right-[10%] top-0 w-px h-full bg-white/10"></div>
        <div className="absolute top-[30%] left-0 w-full h-px bg-white/10"></div>
      </div>

      <div className="relative z-20 w-full h-full flex items-start lg:items-center px-6 sm:px-12 lg:pl-12 lg:pr-10 pt-0 lg:pt-40 pb-24 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">

          {/* Typographic Column - Pushed Completely Left */}
          <div className={`lg:col-span-10 xl:col-span-8 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="flex items-center space-x-3 mb-3 lg:mb-16 lg:-mt-12 lg:relative lg:-top-44">
              <span className="h-px w-12 bg-[#C5A059]"></span>
              <span className="text-[#C5A059] font-sans text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold">
                {t('hero.subtitle')}
              </span>
            </div>

            <h1 className="text-white font-serif text-4xl sm:text-6xl lg:text-5xl uppercase mb-14 lg:mb-12 leading-[1.1] drop-shadow-2xl">
              {t('hero.title').split(/[,&]+/).map((part, i) => (
                <span key={i} className="block">
                  <span className={i === 1 ? "text-[#C5A059]" : "text-white"}>
                    {part.trim()}
                  </span>
                </span>
              ))}
            </h1>

            <div className="max-w-xl">
              <p className="text-gray-100 text-lg sm:text-xl font-sans mb-12 leading-relaxed drop-shadow-md">
                {t('hero.description')}
              </p>

              <div className="hidden lg:flex flex-wrap gap-6 pt-4">
                <button
                  className="group relative inline-flex items-center gap-3 border border-white/50 hover:border-white bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white px-6 py-2.5 text-[10px] tracking-[0.25em] font-bold uppercase transition-all duration-300"
                  onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('hero.cta_primary')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Centered CTA Button - Pushed further down */}
          <div className="lg:hidden absolute -bottom-10 left-0 w-full flex justify-center px-6 z-30">
            <button
              className="group relative inline-flex items-center justify-center gap-2.5 border border-white/50 hover:border-white bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white w-full max-w-[220px] py-3 text-[9px] tracking-[0.25em] font-bold uppercase transition-all duration-300"
              onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_primary')}
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>

      {/* Brand Watermark */}
      <div className="absolute left-[5%] bottom-[5%] text-[8rem] sm:text-[15rem] font-serif text-white/[0.05] select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        Cena
      </div>
    </section>
  );
}