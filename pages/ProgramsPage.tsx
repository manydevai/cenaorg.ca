import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { GraduationCap, Briefcase, Users, Lightbulb, UserCheck, Globe, Calendar, Heart, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import cenaAcademyImage from '../assets/sections/cena-academy.jpg';
import womenLeadershipImage from '../assets/sections/women-leadership.jpg';
import volunteerImage from '../assets/sections/volunteer.jpg';

export function ProgramsPage() {
    const { t } = useLanguage();
    const [expandedProgram, setExpandedProgram] = useState<number | null>(null);

    const programs = [
        { icon: GraduationCap, titleKey: 'programs.academy_title', descriptionKey: 'programs.academy_description', detailsKey: 'programs.academy_details', impactKey: 'programs.academy_impact', color: '#A32020', image: cenaAcademyImage },
        { icon: Users, titleKey: 'programs.women_title', descriptionKey: 'programs.women_description', detailsKey: 'programs.women_details', impactKey: 'programs.women_impact', color: '#FDB913', image: womenLeadershipImage },
        { icon: Lightbulb, titleKey: 'programs.youth_title', descriptionKey: 'programs.youth_description', detailsKey: 'programs.youth_details', impactKey: 'programs.youth_impact', color: '#000', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop' },
        { icon: UserCheck, titleKey: 'programs.mentorship_title', descriptionKey: 'programs.mentorship_description', detailsKey: 'programs.mentorship_details', impactKey: 'programs.mentorship_impact', color: '#A32020', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop' },
        { icon: Briefcase, titleKey: 'programs.entrepreneurship_title', descriptionKey: 'programs.entrepreneurship_description', detailsKey: 'programs.entrepreneurship_details', impactKey: 'programs.entrepreneurship_impact', color: '#FDB913', image: 'https://images.unsplash.com/photo-1709715357519-2a84f9765e57?w=800&h=600&fit=crop' },
        { icon: Globe, titleKey: 'programs.integration_title', descriptionKey: 'programs.integration_description', detailsKey: 'programs.integration_details', impactKey: 'programs.integration_impact', color: '#000', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop' },
        { icon: Calendar, titleKey: 'programs.events_title', descriptionKey: 'programs.events_description', detailsKey: 'programs.events_details', impactKey: 'programs.events_impact', color: '#A32020', image: 'https://images.unsplash.com/photo-1764726354739-1222d1ea5b63?w=800&h=600&fit=crop' },
        { icon: Heart, titleKey: 'programs.volunteer_title', descriptionKey: 'programs.volunteer_description', detailsKey: 'programs.volunteer_details', impactKey: 'programs.volunteer_impact', color: '#FDB913', image: volunteerImage },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-[#000000] via-[#8B1B1B] to-[#A32020] text-white py-24 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FDB913]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <Badge className="bg-gray-900 text-white mb-5 font-semibold">{t('programs.badge')}</Badge>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">{t('programs.title')}</h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light">{t('programs.description')}</p>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {programs.map((program, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden rounded-2xl group">
                                <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
                                    <div className="h-48 sm:h-full overflow-hidden">
                                        <img src={program.image} alt={t(program.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <CardContent className="p-6 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 rounded-lg" style={{ backgroundColor: `${program.color}12` }}>
                                                <program.icon className="h-5 w-5" style={{ color: program.color }} />
                                            </div>
                                            <Badge style={{ backgroundColor: program.color }} className="text-white text-xs font-medium">{t(program.impactKey)}</Badge>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{t(program.titleKey)}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-3">{t(program.descriptionKey)}</p>
                                        {expandedProgram === index && (
                                            <p className="text-gray-500 text-xs leading-relaxed mb-3">{t(program.detailsKey)}</p>
                                        )}
                                        <button
                                            onClick={() => setExpandedProgram(expandedProgram === index ? null : index)}
                                            className="text-sm font-medium self-start transition-colors duration-300"
                                            style={{ color: program.color }}
                                        >
                                            {expandedProgram === index ? t('common.show_less') : t('common.learn_more')} →
                                        </button>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-gradient-to-br from-[#A32020] to-[#000] rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDB913]/8 rounded-full blur-3xl pointer-events-none" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative">{t('programs.join_program_title')}</h2>
                        <p className="text-white/80 mb-8 text-lg font-light max-w-xl mx-auto relative">{t('programs.join_program_description')}</p>
                        <Button size="lg" className="bg-[#FDB913] text-black hover:bg-[#E5A50D] font-semibold px-8 rounded-xl shadow-xl shadow-[#FDB913]/25 hover:scale-[1.02] transition-all duration-300 relative group"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('programs.join_program_button')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
