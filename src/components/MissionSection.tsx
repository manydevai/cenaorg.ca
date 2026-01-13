import { Card, CardContent } from './ui/card';
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
      color: '#A32020'
    },
    {
      icon: Briefcase,
      title: t('mission.pillar2_title'),
      description: t('mission.pillar2_desc'),
      color: '#FDB913'
    },
    {
      icon: Users,
      title: t('mission.pillar3_title'),
      description: t('mission.pillar3_desc'),
      color: '#000000'
    }
  ];

  return (
    <section id="mission" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('mission.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('mission.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('mission.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="border-t-4 hover:shadow-lg transition-shadow group" style={{ borderTopColor: pillar.color }}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 sm:p-4 rounded-full mb-3 sm:mb-4" style={{ backgroundColor: `${pillar.color}15` }}>
                    <pillar.icon 
                      className="h-6 w-6 sm:h-8 sm:w-8 transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        color: pillar.color,
                        filter: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = `drop-shadow(0 0 8px ${pillar.color}CC)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">{pillar.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{pillar.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}