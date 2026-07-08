import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import culturalCelebrationImage from '../assets/sections/cultural-celebration.png';
import businessWorkshopImage from '../assets/sections/business-workshop.jpg';
import { Button } from './ui/button';

export function EventsSection() {
  const { t } = useLanguage();

  const upcomingEvents = [
    {
      titleKey: 'events.event1_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event1_location',
      descriptionKey: 'events.event1_description',
      typeKey: 'events.type_workshop',
      color: '#8B0000',
      image: businessWorkshopImage
    },
    {
      titleKey: 'events.event2_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event2_location',
      descriptionKey: 'events.event2_description',
      typeKey: 'events.type_networking',
      color: '#121212',
      image: 'https://images.unsplash.com/photo-1761933799610-c9a75f115794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lbnRvcnNoaXAlMjBtZWV0aW5nfGVufDF8fHx8MTc2NTE0MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      titleKey: 'events.event3_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event3_location',
      descriptionKey: 'events.event3_description',
      typeKey: 'events.type_cultural',
      color: '#C5A059',
      image: culturalCelebrationImage
    }
  ];

  return (
    <section id="events" className="py-24 sm:py-32 bg-[#FBFBFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('events.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight">
              {t('events.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Button 
              variant="link" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#121212] font-bold text-xs tracking-widest uppercase p-0 h-auto hover:text-[#C5A059] transition-colors"
            >
              {t('events.explore_calendar')} <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex flex-col h-full group">
              {/* Editorial Image Frame */}
              <div className="relative mb-8 overflow-hidden aspect-[4/5] border border-gray-100 p-2 bg-white">
                <img
                  src={event.image}
                  alt={t(event.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-black/5">
                  <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#121212]">
                    {t(event.typeKey)}
                  </span>
                </div>
                {/* Structural Lines Overlay */}
                <div className="absolute inset-0 border-[20px] border-white/0 group-hover:border-white/20 transition-all duration-700 pointer-events-none"></div>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="flex items-center space-x-3 mb-4 text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span className="text-[10px] tracking-widest uppercase font-bold">{t(event.dateKey)}</span>
                </div>

                <h3 className="text-2xl font-serif mb-4 text-[#121212] leading-tight group-hover:text-[#8B0000] transition-colors">{t(event.titleKey)}</h3>

                <p className="text-sm text-gray-500 leading-relaxed font-sans mb-8 line-clamp-3">
                  {t(event.descriptionKey)}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[9px] tracking-widest uppercase font-bold text-gray-400 flex items-center">
                    <MapPin className="h-3 w-3 mr-2 text-[#C5A059]" />
                    {t(event.locationKey)}
                  </span>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-[10px] tracking-widest uppercase font-bold text-[#8B0000] hover:bg-transparent hover:translate-x-1 transition-transform"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {t('events.register')} <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Success Callout */}
        <div className="mt-32 p-12 lg:p-16 border border-[#121212] flex flex-col items-center text-center bg-[#FBFBFB]">
          <h3 className="text-2xl font-serif text-[#121212] mb-4 uppercase tracking-tight">{t('events.past_events')}</h3>
          <p className="text-sm text-gray-500 italic max-w-xl">{t('events.past_event_success')}</p>
        </div>
      </div>
    </section>
  );
}