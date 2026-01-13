import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { GraduationCap, Briefcase, Users, ChevronDown, ChevronUp, Lightbulb, UserCheck, Globe, Calendar, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import cenaAcademyImage from 'figma:asset/0154719e25429f26eb9c7a6aaa5daed6d7f07c06.png';
import womenLeadershipImage from 'figma:asset/19d8e04e0d6752983124d107e1edfe033f089ab0.png';

export function ProgramsSection() {
  const { t, language } = useLanguage();
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

  const programs = [
    {
      icon: GraduationCap,
      titleKey: 'programs.academy_title',
      descriptionKey: 'programs.academy_description',
      impactKey: 'programs.academy_impact',
      detailsKey: 'programs.academy_details',
      color: '#A32020',
      image: cenaAcademyImage
    },
    {
      icon: Users,
      titleKey: 'programs.women_title',
      descriptionKey: 'programs.women_description',
      impactKey: 'programs.women_impact',
      detailsKey: 'programs.women_details',
      color: '#FDB913',
      image: womenLeadershipImage
    },
    {
      icon: Lightbulb,
      titleKey: 'programs.youth_title',
      descriptionKey: 'programs.youth_description',
      impactKey: 'programs.youth_impact',
      detailsKey: 'programs.youth_details',
      color: '#000000',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
    },
    {
      icon: UserCheck,
      titleKey: 'programs.mentorship_title',
      descriptionKey: 'programs.mentorship_description',
      impactKey: 'programs.mentorship_impact',
      detailsKey: 'programs.mentorship_details',
      color: '#A32020',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop'
    },
    {
      icon: Briefcase,
      titleKey: 'programs.entrepreneurship_title',
      descriptionKey: 'programs.entrepreneurship_description',
      impactKey: 'programs.entrepreneurship_impact',
      detailsKey: 'programs.entrepreneurship_details',
      color: '#FDB913',
      image: 'https://images.unsplash.com/photo-1709715357519-2a84f9765e57?w=800&h=600&fit=crop'
    },
    {
      icon: Globe,
      titleKey: 'programs.integration_title',
      descriptionKey: 'programs.integration_description',
      impactKey: 'programs.integration_impact',
      detailsKey: 'programs.integration_details',
      color: '#000000',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop'
    },
    {
      icon: Calendar,
      titleKey: 'programs.events_title',
      descriptionKey: 'programs.events_description',
      impactKey: 'programs.events_impact',
      detailsKey: 'programs.events_details',
      color: '#A32020',
      image: 'https://images.unsplash.com/photo-1764726354739-1222d1ea5b63?w=800&h=600&fit=crop'
    },
    {
      icon: Heart,
      titleKey: 'programs.volunteer_title',
      descriptionKey: 'programs.volunteer_description',
      impactKey: 'programs.volunteer_impact',
      detailsKey: 'programs.volunteer_details',
      color: '#FDB913',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop'
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  return (
    <section id="programs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#000000] text-white mb-4">{t('programs.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('programs.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('programs.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full group">
              {/* Image Header */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={t(program.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <div className="p-2.5 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm">
                    <program.icon 
                      className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        color: program.color,
                        filter: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = `drop-shadow(0 0 8px ${program.color}CC)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
                <div className="flex flex-col h-full">
                  <h3 className="mb-2 sm:mb-3 text-gray-900 text-base sm:text-lg" style={{ fontSize: language === 'fr' || language === 'pt' ? '1.05rem' : '1.125rem' }}>{t(program.titleKey)}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3 min-h-[4.5rem]">{t(program.descriptionKey)}</p>
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <Badge style={{ backgroundColor: program.color }} className="text-white text-xs w-fit">
                      {t(program.impactKey)}
                    </Badge>
                  </div>
                  
                  {expandedProgram === index && (
                    <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                      {t(program.detailsKey)}
                    </p>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => toggleExpand(index)}
                    className="mt-auto self-start px-0 hover:bg-transparent text-sm"
                    style={{ color: program.color }}
                  >
                    {expandedProgram === index ? (
                      <>
                        {t('common.show_less')} <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        {t('common.learn_more')} <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-[#A32020] to-[#000000] text-white border-0">
          <CardContent className="p-6 sm:p-8 text-center">
            <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">{t('programs.join_program_title')}</h3>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
              {t('programs.join_program_description')}
            </p>
            <Button 
              size="lg"
              className="bg-[#FDB913] text-black hover:bg-[#E5A50D] font-medium text-sm sm:text-base px-6 sm:px-8"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('programs.join_program_button')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}