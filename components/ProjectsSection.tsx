import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, Package, Handshake, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import youthEmpowermentImg from '../assets/sections/community.jpg';
import materialDonationsImg from '../assets/sections/business-workshop.jpg';
import partnershipsImg from '../assets/sections/educational-partnerships.jpg';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function ProjectsSection() {
  const { t } = useLanguage();
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const toggleProject = (index: number) => {
    setExpandedProjects(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const projects = [
    {
      icon: GraduationCap,
      titleKey: 'projects.youth_empowerment_title',
      descriptionKey: 'projects.youth_empowerment_description',
      image: youthEmpowermentImg,
      impactKey: 'projects.youth_empowerment_impact',
      color: 'bg-[#A32020]',
      detailsKey: 'projects.youth_empowerment_details'
    },
    {
      icon: Package,
      titleKey: 'projects.material_donations_title',
      descriptionKey: 'projects.material_donations_description',
      image: materialDonationsImg,
      impactKey: 'projects.material_donations_impact',
      color: 'bg-[#FDB913]',
      detailsKey: 'projects.material_donations_details'
    },
    {
      icon: Handshake,
      titleKey: 'projects.partnerships_title',
      descriptionKey: 'projects.partnerships_description',
      image: partnershipsImg,
      impactKey: 'projects.partnerships_impact',
      color: 'bg-[#000000]',
      detailsKey: 'projects.partnerships_details'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="text-center mb-20 lg:mb-24">
          <Badge className="bg-[#8B0000] text-white px-4 py-1.5 uppercase text-[10px] tracking-[0.3em] font-bold rounded-none mb-6">
            {t('projects.badge')}
          </Badge>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] mb-8 leading-tight tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto font-sans italic border-l border-gray-100 pl-8 inline-block text-left italic">
            {t('projects.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isExpanded = expandedProjects.includes(index);
            return (
              <Collapsible key={index} open={isExpanded} onOpenChange={() => toggleProject(index)}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className={`absolute top-4 left-4 p-3 rounded-full ${project.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm opacity-90">{t(project.impactKey)}</div>
                    </div>
                  </div>
                  <CardContent className="p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-serif mb-4 text-[#121212] tracking-tight uppercase">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed font-sans">
                      {t(project.descriptionKey)}
                    </p>

                    <CollapsibleContent className="mb-4">
                      <div className="pt-4 border-t border-gray-200 space-y-3 text-gray-600">
                        {t(project.detailsKey)}
                      </div>
                    </CollapsibleContent>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="text-[#8B0000] hover:text-[#A30000] p-0 w-full justify-start mt-auto text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-transparent transition-all duration-300">
                        {isExpanded ? t('common.show_less') : t('common.learn_more')}
                        {isExpanded ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                      </Button>
                    </CollapsibleTrigger>
                  </CardContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        <div className="mt-24 lg:mt-32 bg-[#121212] p-12 lg:p-20 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C5A059]/30 translate-x-16 -translate-y-16"></div>

          <h3 className="text-3xl lg:text-4xl font-serif text-white mb-8 leading-tight relative z-10">
            {t('projects.support_cta_title')}
          </h3>
          <p className="text-gray-400 text-sm mb-12 max-w-xl mx-auto leading-relaxed relative z-10 font-sans italic">
            {t('projects.support_cta_description')}
          </p>
          <Button
            size="lg"
            className="bg-[#8B0000] hover:bg-[#A30000] text-white px-12 py-8 rounded-none text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative z-10 hover:tracking-[0.4em]"
            onClick={() => window.open('https://buy.stripe.com/bJe9AU5JO8p764W882eAg00', '_blank', 'noopener,noreferrer')}
          >
            {t('common.donate_now')}
          </Button>
        </div>
      </div>
    </section>
  );
}