import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import culturalCelebrationImage from 'figma:asset/b7a470e41e2449933b30ffa4e761fceb5d23f9f1.png';
import businessWorkshopImage from 'figma:asset/952e614811f897388cdb5bcf0f6e0c6093c0a81e.png';

export function EventsSection() {
  const { t } = useLanguage();
  
  const scrollToContact = (eventTitle: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const upcomingEvents = [
    {
      titleKey: 'events.event1_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event1_location',
      descriptionKey: 'events.event1_description',
      typeKey: 'events.type_workshop',
      color: '#A32020',
      image: businessWorkshopImage
    },
    {
      titleKey: 'events.event2_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event2_location',
      descriptionKey: 'events.event2_description',
      typeKey: 'events.type_networking',
      color: '#000000',
      image: 'https://images.unsplash.com/photo-1761933799610-c9a75f115794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lbnRvcnNoaXAlMjBtZWV0aW5nfGVufDF8fHx8MTc2NTE0MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      titleKey: 'events.event3_title',
      dateKey: 'events.coming_soon',
      locationKey: 'events.event3_location',
      descriptionKey: 'events.event3_description',
      typeKey: 'events.type_cultural',
      color: '#FDB913',
      image: culturalCelebrationImage
    }
  ];

  return (
    <section id="events" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('events.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('events.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('events.description')}
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-900 text-center">{t('events.upcoming')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                {/* Event Image */}
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={t(event.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <Badge style={{ backgroundColor: event.color }} className="text-white text-xs">
                      {t(event.typeKey)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center text-white text-xs sm:text-sm">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {t(event.dateKey)}
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg mb-2 sm:mb-3 text-gray-900 min-h-[2.5rem] sm:min-h-[3.5rem]">{t(event.titleKey)}</h4>
                  
                  <div className="space-y-2 mb-3 sm:mb-4 text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{t(event.locationKey)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">{t(event.descriptionKey)}</p>
                  
                  <Button 
                    className="w-full text-sm"
                    style={{ backgroundColor: event.color }}
                    onClick={() => scrollToContact(event.titleKey)}
                  >
                    {t('events.register_now')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events Success */}
        <Card className="bg-gradient-to-r from-[#A32020] to-[#000000] text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl mb-2">{t('events.past_events')}</h3>
            <p className="text-lg opacity-90">{t('events.past_event_success')}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}