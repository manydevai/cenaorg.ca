import { Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function MembersSection() {
  const { t } = useLanguage();

  const benefits = [
    t('members.benefit1'),
    t('members.benefit2'),
    t('members.benefit3'),
    t('members.benefit4'),
    t('members.benefit5'),
    t('members.benefit6')
  ];

  return (
    <section id="members" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column: Benefits Grid */}
          <div className="lg:col-span-7">
            <span className="inline-block text-[#C5A059] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-8">
              {t('members.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight mb-16 tracking-tight">
              {t('members.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 border-t border-gray-100 pt-16">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-6 group">
                  <div className="h-6 w-6 border border-[#C5A059] flex items-center justify-center flex-shrink-0 group-hover:bg-[#C5A059] transition-all duration-500">
                    <Check className="h-3 w-3 text-[#C5A059] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm text-gray-500 leading-relaxed font-sans">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Membership Card */}
          <div className="lg:col-span-5 w-full flex flex-col h-full lg:pt-20">
            <div className="bg-[#121212] p-12 lg:p-16 relative overflow-hidden flex flex-col h-full shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
              {/* Decorative Corner */}
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A059]/20 translate-x-12 translate-y-12"></div>

              <h3 className="text-3xl font-serif text-white mb-8 leading-tight">{t('members.join_title')}</h3>
              <p className="text-gray-400 text-base leading-relaxed mb-12 italic border-l border-white/5 pl-8">
                {t('members.join_desc')}
              </p>

              <div className="mt-auto pt-12 border-t border-white/5">
                <Button
                  size="lg"
                  className="w-full bg-[#8B0000] hover:bg-[#A30000] text-white rounded-none py-8 text-[10px] tracking-[0.3em] font-bold uppercase transition-all duration-500 flex items-center justify-center gap-4 group"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('members.join_button')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}