import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Quote, Star, Award, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t('testimonials.quote1'),
      author: t('testimonials.author1'),
      role: t('testimonials.role1'),
      program: t('testimonials.program1'),
      image: 'https://images.pexels.com/photos/9957550/pexels-photo-9957550.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      quote: t('testimonials.quote2'),
      author: t('testimonials.author2'),
      role: t('testimonials.role2'),
      program: t('testimonials.program2'),
      image: 'https://images.pexels.com/photos/8423069/pexels-photo-8423069.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      quote: t('testimonials.quote3'),
      author: t('testimonials.author3'),
      role: t('testimonials.role3'),
      program: t('testimonials.program3'),
      image: 'https://images.pexels.com/photos/4989148/pexels-photo-4989148.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#121212] text-white relative overflow-hidden border-t border-b border-[#C5A059]/20">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-[#C5A059] font-sans text-xs sm:text-sm tracking-[0.3em] uppercase font-bold mb-3 block">
            {t('testimonials.badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-6 uppercase">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-6" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
            {t('testimonials.description')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-black/60 border border-white/10 hover:border-[#C5A059]/60 p-8 flex flex-col justify-between transition-all duration-500 group relative backdrop-blur-sm"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              {/* Quote Mark & Star Rating */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors duration-300" />
                </div>

                <p className="text-gray-200 text-base leading-relaxed italic mb-8 font-sans">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Metadata */}
              <div className="flex items-center space-x-4 pt-6 border-t border-white/10">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-14 h-14 object-cover border-2 border-[#C5A059] group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#8B0000] p-1 border border-[#C5A059]">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-serif font-bold text-base tracking-wide uppercase">
                    {item.author}
                  </h4>
                  <p className="text-[#C5A059] text-xs font-sans font-semibold mb-1">
                    {item.role}
                  </p>
                  <span className="inline-block text-[11px] text-gray-400 font-sans tracking-wider uppercase bg-white/5 px-2 py-0.5 border border-white/10">
                    {item.program}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Trust Bar */}
        <div className="mt-16 bg-white/5 border border-white/10 p-6 flex flex-wrap items-center justify-around gap-6 text-center" data-aos="fade-up">
          <div className="flex items-center space-x-3">
            <Award className="w-6 h-6 text-[#C5A059]" />
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-gray-300">
              98% Taux de Satisfaction
            </span>
          </div>
          <div className="w-px h-6 bg-white/20 hidden sm:block" />
          <div className="flex items-center space-x-3">
            <span className="text-[#C5A059] font-bold text-lg font-serif">300+</span>
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-gray-300">
              Membres Actifs au Canada
            </span>
          </div>
          <div className="w-px h-6 bg-white/20 hidden sm:block" />
          <div className="flex items-center space-x-3">
            <span className="text-[#C5A059] font-bold text-lg font-serif">6</span>
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-gray-300">
              Programmes d'Accompagnement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
