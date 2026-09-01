import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  const backgrounds = [
    {
      desktopUrl: '/hero/1.webp',
      mobileUrl: '/hero/1.webp',
      mobileSize: 'cover',
      mobilePos: 'center top',
    },
    {
      desktopUrl: '/hero/2.webp',
      mobileUrl: '/hero/2.webp',
      mobileSize: 'cover',
      mobilePos: 'center top',
    },
    {
      desktopUrl: '/hero/3.webp',
      mobileUrl: '/hero/3.webp',
      mobileSize: '155% auto',
      mobilePos: 'center top',
    },
    {
      desktopUrl: '/hero/4.webp',
      mobileUrl: '/hero/4-mobile.webp', // 941x1672 Vertical Portrait Photo
      mobileSize: '120% auto', // Zoom in a little bit on the 3 women in dresses
      mobilePos: 'center 5%',
    },
    {
      desktopUrl: '/hero/5.webp',
      mobileUrl: '/hero/5.webp',
      mobileSize: 'cover',
      mobilePos: 'center top',
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentBg((prev: number) => (prev + 1) % backgrounds.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-end lg:justify-center overflow-hidden border-b border-white/5 bg-[#090909] w-full max-w-full"
    >
      {/* =========================================================
          FULL-BLEED BACKGROUND — Single Layer Full Screen (No Mirroring / No Splitting)
         ========================================================= */}
      <div className="absolute inset-0 z-0 bg-[#090909]">
        {backgrounds.map((bgItem, index) => (
          <div
            key={`hero-bg-${index}`}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Mobile View Background */}
            <div
              className="block lg:hidden absolute inset-0 bg-no-repeat transition-all duration-700"
              style={{
                backgroundImage: `url(${bgItem.mobileUrl})`,
                backgroundSize: bgItem.mobileSize,
                backgroundPosition: bgItem.mobilePos,
              }}
            />
            {/* Desktop View Background */}
            <div
              className="hidden lg:block absolute inset-0 bg-cover bg-[right_top] bg-no-repeat"
              style={{
                backgroundImage: `url(${bgItem.desktopUrl})`,
              }}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP GRADIENT MASK (Left column mask on lg screens) */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/85 via-black/55 to-transparent z-10 pointer-events-none" />

      {/* MOBILE GRADIENT MASK — Bottom-anchored dark gradient for high contrast & clean photo top */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-black via-black/75 via-50% to-transparent z-10 pointer-events-none" />

      {/* DESKTOP ARCHITECTURAL DECORATION LINES */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20 hidden lg:block">
        <div className="absolute left-[5%] top-0 w-px h-full bg-white/20"></div>
        <div className="absolute right-[10%] top-0 w-px h-full bg-white/10"></div>
        <div className="absolute top-[30%] left-0 w-full h-px bg-white/10"></div>
      </div>


      {/* =========================================================
          MOBILE LAYOUT (< lg) — Clean High-End Luxury UI
         ========================================================= */}
      <div className="lg:hidden relative z-20 w-full pt-28 pb-10 px-6 sm:px-8 space-y-3.5">
        {/* Top Minimal Slide Counter (e.g., 04 / 05) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="h-px w-6 bg-[#C5A059]"></span>
            <span className="text-[#C5A059] font-sans text-[9px] tracking-[0.35em] uppercase font-bold">
              {t('hero.subtitle')}
            </span>
          </div>

          <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-[#C5A059]/90 bg-black/40 px-2 py-0.5 border border-[#C5A059]/30 rounded-xs">
            0{currentBg + 1} / 0{backgrounds.length}
          </span>
        </div>

        {/* Compact Serif Title */}
        <h1 className="text-white font-serif text-xl sm:text-2xl uppercase leading-tight tracking-tight drop-shadow-md">
          {t('hero.title').split(/[,&]+/).map((part, i) => (
            <span key={i} className="inline-block mr-1.5">
              <span className={i === 1 ? "text-[#C5A059]" : "text-white"}>
                {part.trim()}
              </span>
            </span>
          ))}
        </h1>

        {/* Minimal Description */}
        <p className="text-gray-200 text-xs font-sans leading-relaxed font-normal opacity-95 line-clamp-2 max-w-sm drop-shadow-sm">
          {t('hero.description')}
        </p>

        {/* Sleek Luxury CTA Button */}
        <div className="pt-2">
          <button
            className="group inline-flex items-center gap-2.5 border border-[#C5A059] bg-[#8B0000] hover:bg-[#A00000] text-white px-5 py-3 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 shadow-2xl rounded-xs"
            onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t('hero.cta_primary')}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#C5A059] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>


      {/* =========================================================
          DESKTOP LAYOUT (lg+) — Original High-Impact Typographic Column
         ========================================================= */}
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

      {/* BRAND WATERMARK (Desktop only) */}
      <div className="absolute left-[5%] bottom-[5%] text-[8rem] sm:text-[15rem] font-serif text-white/[0.05] select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        Cena
      </div>
    </section>
  );
}