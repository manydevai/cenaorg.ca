import { useLanguage } from '../contexts/LanguageContext';
import projectionsImg from '../assets/partners/projections-ai.png';
import candorImg from '../assets/partners/candors-cake.png';
import costcoImg from '../assets/partners/costco.png';
import kiameImg from '../assets/partners/kimia-foods.png';
import larochelleImg from '../assets/partners/laroche-photographe.png';
import koworkImg from '../assets/partners/kowork.png';
import valImg from '../assets/partners/val-entretien.png';

export function LogoWall() {
  const { t } = useLanguage();

  const baseLogos = [
    { src: projectionsImg, alt: "ProjectionsAI", customClass: "scale-[1.5] lg:scale-[1.8]" },
    { src: candorImg, alt: "Candor's Cake" },
    { src: costcoImg, alt: "Costco Wholesale" },
    { src: kiameImg, alt: "Kiame Foods" },
    { src: larochelleImg, alt: "Larochelle Signature Photography", customClass: "scale-[1.25] lg:scale-[1.5]" },
    { src: koworkImg, alt: "Kowork" },
    { src: valImg, alt: "VAL Nettoyage et Entretien", customClass: "scale-[1.25] lg:scale-[1.5]" },
  ];

  const logos = [...baseLogos, ...baseLogos];

  return (
    <section className="w-full pt-4 pb-4 bg-white overflow-hidden border-b border-gray-100 relative">
      <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white to-transparent z-10 transition-all"></div>
      <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white to-transparent z-10 transition-all"></div>

      <div className="max-w-7xl mx-auto px-6 mb-4 flex items-center justify-center space-x-6">
        <span className="h-px w-12 sm:w-24 bg-[#8B0000]"></span>
        <span className="text-[10px] tracking-[0.4em] font-bold text-[#121212] uppercase text-center">
          {t('common.trusted_by')}
        </span>
        <span className="h-px w-12 sm:w-24 bg-[#8B0000]"></span>
      </div>

      <div className="flex w-max animate-infinite-scroll hover:pause py-4">
        <div className="flex items-center space-x-24 sm:space-x-32 lg:space-x-48 px-12 sm:px-18 lg:px-24">
          {logos.map((logo, index) => (
            <img
              key={`logo-${index}`}
              src={logo.src}
              alt={logo.alt}
              className={`h-12 sm:h-14 lg:h-16 w-auto object-contain transition-all duration-700 cursor-pointer hover:scale-110 ${logo.customClass || ''}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 60s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
