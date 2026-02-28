import image_team from '../assets/sections/community-team.jpg';
import { useLanguage } from '../contexts/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="pt-24 sm:pt-32 pb-8 sm:pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Visual Side: Overlapping Editorial Layers */}
          <div className="lg:col-span-6 relative overflow-hidden lg:overflow-visible">
            <div className="relative z-10 border border-[#121212] p-2 bg-white transform -rotate-3 lg:-rotate-2 transition-transform duration-700 hover:rotate-0">
              <img
                src={image_team}
                alt="CENA Community"
                className="w-full transition-all duration-1000"
              />
            </div>
            {/* Background Accent Box: Heritage Gold */}
            <div className="absolute top-12 left-12 w-full h-full border border-[#C5A059] -z-10 transform rotate-6 lg:rotate-3 opacity-30"></div>

            {/* Floating Impact Badge: High Contrast Crimson */}
            <div className="absolute -bottom-8 -right-4 z-20 bg-[#8B0000] text-white p-4 border border-[#121212] sm:p-6 flex flex-col items-center transform rotate-3 lg:rotate-2 shadow-xl">
              <span className="block text-lg sm:text-xl font-serif mb-1.5 leading-none uppercase tracking-wider">{t('about.stats.badge_impact')}</span>
              <span className="block text-[8px] sm:text-[9px] tracking-[0.3em] uppercase opacity-80 font-bold">
                {t('about.stats.years')}
              </span>
            </div>
          </div>

          {/* Text Side: Refined Editorial Column */}
          <div className="lg:col-span-6">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold">
                {t('about.badge')}
              </span>
              <span className="h-px flex-1 bg-gray-100"></span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-serif text-[#121212] leading-[1.1] mb-8 tracking-tight">
              {t('about.title')}
            </h2>

            <p className="text-xl text-gray-500 font-sans mb-12 leading-relaxed border-l-2 border-[#C5A059] pl-8 italic">
              {t('about.description')}
            </p>

            <div className="space-y-12 border-t border-gray-100 pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-[#121212] flex items-center">
                    <span className="w-2 h-2 bg-[#8B0000] mr-3"></span>
                    {t('about.who_we_are')}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    {t('about.who_we_are_text')}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs tracking-[0.2em] uppercase font-bold text-[#121212] flex items-center">
                    <span className="w-2 h-2 bg-[#C5A059] mr-3"></span>
                    {t('about.our_approach')}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    {t('about.our_approach_text')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}