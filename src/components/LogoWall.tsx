import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import projectionsImg from 'figma:asset/23cf1bc1be5f77fb89b9bbc7901952445b17b1fc.png';
import candorImg from 'figma:asset/4e63b0c4829aac4268f4a59159dd672adb24c34a.png';
import costcoImg from 'figma:asset/b635b63dce233706112553bb2e3337f29865589b.png';
import kiameImg from 'figma:asset/4af88a1f38338735de968a0d0e0ab4f3543baa4e.png';
import larochelleImg from 'figma:asset/b18972a7e94eca4cc30096fb44aea29330370b6b.png';
import koworkImg from 'figma:asset/626e04bae0cfea09d3e8fd6e9477592a802c9d65.png';
import valImg from 'figma:asset/d003c3b0851e7e2e52f626dbcd363f7e11a8281e.png';

export function LogoWall() {
  const { t } = useLanguage();
  
  const baseLogos = [
    { src: projectionsImg, alt: "ProjectionsAI", className: "h-32" },
    { src: candorImg, alt: "Candor's Cake", className: "h-24" },
    { src: costcoImg, alt: "Costco Wholesale", className: "h-20" },
    { src: kiameImg, alt: "Kiame Foods", className: "h-20" },
    { src: larochelleImg, alt: "Larochelle Signature Photography", className: "h-28" },
    { src: koworkImg, alt: "Kowork", className: "h-20" },
    { src: valImg, alt: "VAL Nettoyage et Entretien", className: "h-24" },
  ];

  // Create a long array for smooth scrolling (4 repetitions)
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];

  return (
    <section className="w-full py-2 bg-white overflow-hidden border-b border-gray-100">
      <div className="container mx-auto px-4 mb-0 pt-0">
        <p className="text-center text-gray-500 font-medium text-[10px] tracking-wider uppercase">
          {t('common.trusted_by')}
        </p>
      </div>
      
      <div className="relative w-full max-w-[100vw] overflow-hidden">
        <div className="flex w-max animate-infinite-scroll">
          <div className="flex items-center space-x-16 mx-4">
            {logos.map((logo, index) => (
              <img
                key={`logo-1-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.className} w-auto object-contain transition-all duration-300`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-16 mx-4">
            {logos.map((logo, index) => (
              <img
                key={`logo-2-${index}`}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.className} w-auto object-contain transition-all duration-300`}
              />
            ))}
          </div>
        </div>
        
        {/* Gradient overlays for fade effect */}
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

      <style>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
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
