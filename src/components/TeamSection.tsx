import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TEAM } from '../assets/images';

export function TeamSection() {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: 'Cristina Indira Manuel',
      roleKey: 'team.role_president',
      image: TEAM.members.cristinaManuel
    },
    {
      name: 'Marileny Fernando António',
      roleKey: 'team.role_vp_operations',
      image: TEAM.members.marilenyAntonio
    },
    {
      name: 'Sebastião Sala',
      roleKey: 'team.role_finance',
      image: TEAM.members.sebastiaoSala
    },
    {
      name: 'Iolanda Maria Mendes',
      roleKey: 'team.role_international',
      image: TEAM.members.iolandaMendes
    },
    {
      name: 'Daniel Love Fernando António',
      roleKey: 'team.role_youth',
      image: TEAM.members.danielLove
    },
    {
      name: 'Dulce Angelina Figueiredo',
      roleKey: 'team.role_hr',
      image: TEAM.members.dulceFigueiredo
    }
  ];

  // Duplicate the array for infinite scroll effect
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section id="team" className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('team.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('team.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('team.description')}
          </p>
        </div>

        {/* Infinite Carousel Container */}
        <div className="relative mb-16">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling Track */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-8 animate-scroll-infinite hover:pause-animation"
              style={{
                width: 'fit-content',
              }}
            >
              {duplicatedMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col items-center flex-shrink-0"
                >
                  {/* Circular Image with Gradient Border */}
                  <div className="relative">
                    {/* Gradient Border Ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#A32020] via-[#FDB913] to-[#000000] p-[3px]">
                      <div className="w-full h-full rounded-full bg-white"></div>
                    </div>
                    {/* Image Container */}
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-[3px]">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        style={{ objectPosition: '50% 35%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leadership Message */}
        <div className="mt-16 bg-gradient-to-r from-[#A32020] to-[#000000] rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl mb-4">
              {t('team.leadership_title')}
            </h3>
            <p className="text-white/90 text-lg leading-relaxed">
              {t('team.leadership_message')}
            </p>
          </div>
        </div>
      </div>

      {/* Inline Keyframe Animation */}
      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
        
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}