import { Building2, Users, GraduationCap, Landmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function PartnersSection() {
  const { t } = useLanguage();

  const partnerTypes = [
    {
      icon: Building2,
      type: t('partners.partner_type_corporate'),
      color: '#8B0000'
    },
    {
      icon: Users,
      type: t('partners.partner_type_community'),
      color: '#121212'
    },
    {
      icon: GraduationCap,
      type: t('partners.partner_type_educational'),
      color: '#C5A059'
    },
    {
      icon: Landmark,
      type: t('partners.partner_type_government'),
      color: '#8B0000'
    }
  ];

  return (
    <section id="partners" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('partners.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight">
              {t('partners.title')}
            </h2>
          </div>
          <div className="lg:max-w-sm border-l border-gray-100 pl-8">
            <p className="text-gray-500 text-sm leading-loose">
              {t('partners.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 mb-24">
          {partnerTypes.map((partner, index) => (
            <div
              key={index}
              className="p-12 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-r-0 group hover:bg-[#FBFBFB] transition-all duration-500 cursor-default"
            >
              <div className="mb-12 relative flex items-center justify-center h-24 w-24 border border-gray-100 group-hover:border-[#C5A059] transition-colors duration-500">
                <partner.icon
                  className="h-8 w-8 transition-all duration-700 group-hover:scale-110"
                  style={{ color: partner.color }}
                />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h4 className="text-xs tracking-[0.2em] font-bold text-[#121212] uppercase group-hover:text-[#8B0000] transition-colors">
                {partner.type}
              </h4>
            </div>
          ))}
        </div>

        {/* Dynamic CTA Banner */}
        <div className="bg-[#121212] p-12 lg:p-20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#8B0000]"></div>
          <div className="absolute right-[-5%] top-[-10%] text-[15rem] font-serif text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter">Cena</div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-xl">
              <h3 className="text-3xl font-serif text-white mb-6 uppercase tracking-tight">{t('partners.become_partner_title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                {t('partners.become_partner_desc')}
              </p>
            </div>
            <Button
              className="bg-[#C5A059] hover:bg-white text-black px-12 py-8 rounded-none uppercase text-xs tracking-widest font-bold transition-all duration-500 group-hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('partners.become_partner_button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}