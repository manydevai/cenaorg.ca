import { Badge } from './ui/badge';
import { GraduationCap, Briefcase, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function MissionSection() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: GraduationCap,
      title: t('mission.pillar1_title'),
      description: t('mission.pillar1_desc'),
      color: '#8B0000'
    },
    {
      icon: Briefcase,
      title: t('mission.pillar2_title'),
      description: t('mission.pillar2_desc'),
      color: '#C5A059'
    },
    {
      icon: Users,
      title: t('mission.pillar3_title'),
      description: t('mission.pillar3_desc'),
      color: '#121212'
    }
  ];

  return (
    <section id="mission" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Structural Accent Lines */}
      <div className="absolute top-0 right-[20%] w-px h-[200px] bg-gray-100"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-8">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('mission.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight mb-8 tracking-tight">
              {t('mission.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-20">
            <p className="text-gray-500 text-lg leading-relaxed italic border-l border-gray-100 pl-8 relative z-10">
              {t('mission.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-12 border-b md:border-b-0 md:border-r border-gray-100 last:border-r-0 group transition-all duration-500 hover:bg-[#FBFBFB] relative"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: pillar.color }}></div>

              <div className="mb-10 relative">
                <pillar.icon
                  className="h-12 w-12 transition-all duration-700 group-hover:scale-110"
                  style={{ color: pillar.color }}
                />
              </div>
              <h3 className="text-xl font-serif mb-6 text-[#121212] tracking-tight uppercase">{pillar.title}</h3>
              <p className="text-sm text-gray-500 leading-loose font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}