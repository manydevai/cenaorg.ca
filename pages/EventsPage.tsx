import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import culturalCelebrationImage from '../assets/sections/cultural-celebration.png';
import businessWorkshopImage from '../assets/sections/business-workshop.jpg';

export function EventsPage() {
    const { t } = useLanguage();

    const events = [
        { titleKey: 'events.event1_title', dateKey: 'events.coming_soon', locationKey: 'events.event1_location', descriptionKey: 'events.event1_description', typeKey: 'events.type_workshop', color: '#A32020', image: businessWorkshopImage },
        { titleKey: 'events.event2_title', dateKey: 'events.coming_soon', locationKey: 'events.event2_location', descriptionKey: 'events.event2_description', typeKey: 'events.type_networking', color: '#000', image: 'https://images.unsplash.com/photo-1761933799610-c9a75f115794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lbnRvcnNoaXAlMjBtZWV0aW5nfGVufDF8fHx8MTc2NTE0MzA4MXww&ixlib=rb-4.1.0&q=80&w=1080' },
        { titleKey: 'events.event3_title', dateKey: 'events.coming_soon', locationKey: 'events.event3_location', descriptionKey: 'events.event3_description', typeKey: 'events.type_cultural', color: '#FDB913', image: culturalCelebrationImage },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-[#A32020] via-[#8B1B1B] to-[#000] text-white py-24 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-10 right-20 w-96 h-96 bg-[#FDB913]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <Badge className="bg-[#A32020] text-white mb-5 font-semibold border border-white/20">{t('events.badge')}</Badge>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">{t('events.title')}</h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light">{t('events.description')}</p>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">{t('events.upcoming')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-2xl group">
                                <div className="relative h-56 overflow-hidden">
                                    <img src={event.image} alt={t(event.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <Badge style={{ backgroundColor: event.color }} className="text-white text-xs font-medium shadow-lg">{t(event.typeKey)}</Badge>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center text-white text-sm">
                                            <Calendar className="h-4 w-4 mr-1.5" />
                                            {t(event.dateKey)}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(event.titleKey)}</h3>
                                    <div className="flex items-start text-gray-500 mb-3">
                                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-400" />
                                        <span className="text-sm">{t(event.locationKey)}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{t(event.descriptionKey)}</p>
                                    <Button className="w-full rounded-xl font-medium shadow-lg group/btn" style={{ backgroundColor: event.color }}
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        {t('events.register_now')}
                                        <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Past Events CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-gradient-to-r from-[#A32020] via-[#8B1B1B] to-[#000] rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FDB913]/5 rounded-full blur-3xl pointer-events-none" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 relative">{t('events.past_events')}</h2>
                        <p className="text-lg text-white/80 relative font-light">{t('events.past_event_success')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
