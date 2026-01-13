import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GraduationCap, Package, Handshake, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import youthEmpowermentImg from 'figma:asset/d7aa6c891354fb86dc4c96cc90e9d067a9b89f35.png';
import materialDonationsImg from 'figma:asset/abacb320b83b2d170ef45543abb2af6f1908eb5d.png';
import partnershipsImg from 'figma:asset/3fdf509d45ddbe2ed21572fb41eeae512f9214d8.png';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('projects.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl mb-3 text-gray-900">
                      {t(project.titleKey)}
                    </h3>
                    <p className="text-gray-600 mb-4 h-[6.5rem] overflow-hidden">
                      {t(project.descriptionKey)}
                    </p>
                    
                    <CollapsibleContent className="mb-4">
                      <div className="pt-4 border-t border-gray-200 space-y-3 text-gray-600">
                        {t(project.detailsKey)}
                      </div>
                    </CollapsibleContent>

                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="text-[#A32020] hover:text-[#8B1B1B] p-0 w-full justify-start mt-auto">
                        {isExpanded ? t('common.show_less') : t('common.learn_more')} 
                        {isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                      </Button>
                    </CollapsibleTrigger>
                  </CardContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-[#A32020] to-[#000000] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl mb-4">{t('projects.support_cta_title')}</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {t('projects.support_cta_description')}
          </p>
          <Button 
            size="lg"
            className="bg-[#FDB913] text-black hover:bg-[#E5A50D] font-medium"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('common.donate_now')}
          </Button>
        </div>
      </div>
    </section>
  );
}