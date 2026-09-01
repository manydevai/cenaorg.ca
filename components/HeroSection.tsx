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
    }, 1800);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5 bg-[#090909]"
    >
      {/* Dynamic Background - Full-Bleed 100% Screen Cover, Top-Anchored for Visible Faces */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((bg, index) => (
          <div
            key={`full-bg-${index}`}
            className={`absolute inset-0 bg-cover bg-[center_top] lg:bg-[right_top] transition-opacity duration-[700ms] ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${bg})`,
            }}
          />
        ))}
      </div>

      {/* Subtle Gradient Mask on Left Text Column Only - Keeps Right Photo Area Filter-Free */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-3/5 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10 pointer-events-none" />

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

      {/* Brand Watermark */}
      <div className="absolute left-[5%] bottom-[5%] text-[8rem] sm:text-[15rem] font-serif text-white/[0.05] select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        Cena
      </div>
    </section>
  );
}