import { Button } from './ui/button';
import { Users, BookOpen, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';
import { TypingEffect } from './TypingEffect';
import { BRAND } from '../assets/images';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const { t } = useLanguage();
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsZoomed(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-br from-[#A32020] via-[#8B1B1B] to-[#000000] text-white group"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={BRAND.heroBackground}
          alt="CENA Community Leadership"
          className={`w-full h-full object-cover opacity-20 transition-transform duration-[3000ms] ease-out ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#A32020]/60 via-[#8B1B1B]/60 to-[#000000]/60"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
            <div className="bg-[#FDB913] text-black px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
              Community Organization
            </div>
            <span className="text-white/90 text-sm sm:text-base">Canada - Empowering the Lusophone Diaspora</span>
          </div>
          
          <TypingEffect 
            text={t('hero.title')}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight"
            typingSpeed={100}
            deletingSpeed={50}
            pauseDuration={3000}
            magicText="CENA"
            magicTransitionDuration={5000}
          />
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-3 sm:mb-4">
            {t('hero.subtitle')}
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-3xl">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
            <Button 
              size="lg" 
              className="bg-[#FDB913] hover:bg-[#E5A50D] text-black px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-sm sm:text-base"
              onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_primary')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white bg-transparent text-white hover:bg-white/10 px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-sm sm:text-base"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.cta_secondary')}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-3 rounded-lg p-3 cursor-pointer group/card">
              <div className="bg-[#000000] p-2.5 sm:p-3 rounded-full flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913]" />
              </div>
              <div className="min-w-0">
                <AnimatedCounter end={10} suffix="+" className="text-xl sm:text-2xl" enableScrollSpy={true} repeat={true} repeatDelay={2000} />
                <div className="text-white/90 text-xs sm:text-sm leading-tight">{t('hero.members_connected')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg p-3 cursor-pointer group/card">
              <div className="bg-[#000000] p-2.5 sm:p-3 rounded-full flex-shrink-0">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913]" />
              </div>
              <div className="min-w-0">
                <AnimatedCounter end={12} suffix="+" className="text-xl sm:text-2xl" enableScrollSpy={true} repeat={true} repeatDelay={2000} />
                <div className="text-white/90 text-xs sm:text-sm leading-tight">{t('hero.active_programs')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-lg p-3 cursor-pointer group/card">
              <div className="bg-[#000000] p-2.5 sm:p-3 rounded-full flex-shrink-0">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-[#FDB913]" />
              </div>
              <div className="min-w-0">
                <AnimatedCounter end={7} suffix="+" className="text-xl sm:text-2xl" enableScrollSpy={true} repeat={true} repeatDelay={2000} />
                <div className="text-white/90 text-xs sm:text-sm leading-tight">{t('hero.partners')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}