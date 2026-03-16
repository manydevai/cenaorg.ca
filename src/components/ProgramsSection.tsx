import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import cenaAcademyImage from '../assets/sections/cena-academy.jpg';
import womenLeadershipImage from '../assets/sections/women-leadership.jpg';
import mentorshipImage from '../assets/sections/mentorat.jpg';
import volunteerImage from '../assets/sections/volunteer.jpg';
import { Button } from './ui/button';

export function ProgramsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);

  const programs = [
    {
      titleKey: 'programs.academy_title',
      descriptionKey: 'programs.academy_description',
      detailsKey: 'programs.academy_details',
      image: cenaAcademyImage,
      id: "01",
      value: "CENA Academy"
    },
    {
      titleKey: 'programs.women_title',
      descriptionKey: 'programs.women_description',
      detailsKey: 'programs.women_details',
      image: womenLeadershipImage,
      id: "02",
      value: "Elite Women"
    },
    {
      titleKey: 'programs.youth_title',
      descriptionKey: 'programs.youth_description',
      detailsKey: 'programs.youth_details',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
      id: "03",
      value: "Innovation Generation"
    },
    {
      titleKey: 'programs.mentorship_title',
      descriptionKey: 'programs.mentorship_description',
      detailsKey: 'programs.mentorship_details',
      image: mentorshipImage,
      id: "04",
      value: "Mentoring Circle"
    },
    {
      titleKey: 'programs.entrepreneurship_title',
      descriptionKey: 'programs.entrepreneurship_description',
      detailsKey: 'programs.entrepreneurship_details',
      image: 'https://images.unsplash.com/photo-1709715357519-2a84f9765e57?w=800&h=600&fit=crop',
      id: "05",
      value: "Entrepreneur Hub"
    },
    {
      titleKey: 'programs.volunteer_title',
      descriptionKey: 'programs.volunteer_description',
      detailsKey: 'programs.volunteer_details',
      image: volunteerImage,
      id: "06",
      value: "Volunteer Program"
    }
  ];

  const handleJoinProgram = (programValue: string) => {
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('program', programValue);
    window.history.pushState({}, '', url);

    // Smooth scroll to strategic liaison form
    const contactSection = document.getElementById('strategic-liaison-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Dispatch custom event to notify Footer component
    window.dispatchEvent(new CustomEvent('program-selected', { detail: programValue }));
  };

  return (
    <section id="programs" className="py-24 sm:py-32 bg-[#121212] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        {/* Section Header: Architectural Asymmetry */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-[#C5A059] font-sans text-[10px] tracking-[0.4em] uppercase font-bold">
                {t('programs.badge')}
              </span>
              <span className="h-px flex-1 bg-white/10"></span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-serif leading-[1.1] tracking-tight">
              {t('programs.title')}
            </h2>
          </div>
          <div className="lg:max-w-xs border-l border-[#C5A059] pl-8">
            <p className="text-gray-400 text-sm leading-relaxed font-sans italic">
              {t('programs.description')}
            </p>
          </div>
        </div>

        {/* Programs Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 bg-[#161616]/50 shadow-2xl">

          {/* Program Selection Sidebar */}
          <div className="lg:col-span-5 border-r border-white/10 flex flex-col">
            {programs.map((program, index) => (
              <div key={index} className="flex flex-col border-b border-white/10 last:border-b-0">
                <button
                  className={`flex-1 text-left p-10 lg:p-12 cursor-pointer transition-all duration-700 group relative overflow-hidden ${activeTab === index ? 'bg-white' : 'hover:bg-white/[0.02]'}`}
                  onMouseEnter={() => setActiveTab(index)}
                  onClick={() => setActiveTab(index)}
                >
                  {activeTab === index && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#8B0000]"></div>
                  )}

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-start space-x-8">
                      <span className={`font-serif text-2xl transition-colors duration-500 ${activeTab === index ? 'text-[#8B0000]' : 'text-gray-600'}`}>{program.id}</span>
                      <div className="max-w-[200px] lg:max-w-full">
                        <h3 className={`text-xl lg:text-2xl font-serif mb-2 uppercase tracking-tight transition-colors duration-500 ${activeTab === index ? 'text-[#121212]' : 'text-white'}`}>
                          {t(program.titleKey)}
                        </h3>
                        <p className={`text-xs leading-loose transition-colors duration-500 ${activeTab === index ? 'text-gray-500' : 'text-gray-600'}`}>
                          {t(program.descriptionKey)}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className={`h-6 w-6 transition-all duration-500 transform ${activeTab === index ? 'rotate-45 text-[#8B0000] scale-125' : 'text-gray-800 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </div>
                </button>

                {/* Mobile Expanded View: Injected directly below the selected button */}
                {activeTab === index && (
                  <div className="lg:hidden w-full relative h-[450px] overflow-hidden flex flex-col justify-end animate-fade-in">
                    <div className="absolute inset-0 transition-all duration-1000 ease-out">
                      <img
                        src={program.image}
                        alt={t(program.titleKey)}
                        className="w-full h-full object-cover opacity-90 scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-10 sm:p-12 pb-16">
                      <div className="animate-slide-up">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-px bg-[#C5A059]"></div>
                          <span className="text-[#C5A059] font-sans text-[8px] tracking-[0.4em] uppercase font-bold">Initiative Analysis</span>
                        </div>
                        <p className="text-white text-base font-serif leading-relaxed mb-8 italic">
                          "{t(program.detailsKey)}"
                        </p>
                        <Button 
                          onClick={() => handleJoinProgram(program.value)}
                          className="bg-[#8B0000] hover:bg-[#A30000] text-white rounded-none px-10 py-6 text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-500"
                        >
                          Join Program
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Impact Component - Hidden on Mobile, Majestic on Desktop */}
          <div className="hidden lg:flex lg:col-span-7 relative lg:min-h-full overflow-hidden flex-col justify-end">
            <div className="absolute inset-0 transition-all duration-1000 ease-out">
              <img
                key={activeTab}
                src={programs[activeTab].image}
                alt={t(programs[activeTab].titleKey)}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-1000 scale-110 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent"></div>
            </div>

            <div className="relative z-10 p-12 lg:p-16">
              <div className="max-w-xl animate-slide-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-px bg-[#C5A059]"></div>
                  <span className="text-[#C5A059] font-sans text-[9px] tracking-[0.4em] uppercase font-bold">Initiative Analysis</span>
                </div>
                <p className="text-white text-lg lg:text-xl font-serif leading-relaxed mb-10 italic">
                  "{t(programs[activeTab].detailsKey)}"
                </p>
                <Button 
                  onClick={() => handleJoinProgram(programs[activeTab].value)}
                  className="bg-[#8B0000] hover:bg-[#A30000] text-white rounded-none px-12 py-8 text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl transition-all duration-500 hover:tracking-[0.3em]"
                >
                  Join Program
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Global CTA Section: Monochrome Heritage */}
        <div className="mt-32 relative p-12 lg:p-20 border border-[#C5A059]/30 bg-[#161616] overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C5A059]/40 translate-x-16 -translate-y-16"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 leading-tight">
                {t('programs.join_program_title')}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                {t('programs.join_program_description')}
              </p>
            </div>
            <Button
              className="bg-white text-black px-12 py-8 rounded-none uppercase text-xs tracking-[0.2em] font-bold hover:bg-[#8B0000] hover:text-white transition-all duration-500 group-hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('programs.join_program_button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}