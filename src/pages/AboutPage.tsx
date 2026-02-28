import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, Target, Award, BookOpen, Heart, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedCounter } from '../components/AnimatedCounter';
import communityTeam from '../assets/sections/community-team.jpg';

export function AboutPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-[#A32020] via-[#8B1B1B] to-[#000000] text-white py-24 sm:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#FDB913]/5 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <Badge className="bg-[#FDB913] text-black mb-5 font-semibold">{t('about.badge')}</Badge>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">{t('about.title')}</h1>
                    <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light">{t('about.description')}</p>
                </div>
            </section>

            {/* Community Image */}
            <section className="py-16 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10 ring-1 ring-black/5 mb-16">
                        <img src={communityTeam} alt="CENA Community" className="w-full h-[400px] sm:h-[500px] object-cover" style={{ objectPosition: '50% 18%' }} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                            <div className="h-1.5 bg-gradient-to-r from-[#A32020] to-[#A32020]/60" />
                            <CardContent className="p-8">
                                <div className="flex items-start space-x-5">
                                    <div className="p-3 bg-[#A32020]/8 rounded-xl flex-shrink-0">
                                        <Target className="h-7 w-7 text-[#A32020]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('about.who_we_are')}</h3>
                                        <p className="text-gray-500 leading-relaxed">{t('about.who_we_are_text')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                            <div className="h-1.5 bg-gradient-to-r from-[#FDB913] to-[#FDB913]/60" />
                            <CardContent className="p-8">
                                <div className="flex items-start space-x-5">
                                    <div className="p-3 bg-[#FDB913]/10 rounded-xl flex-shrink-0">
                                        <Users className="h-7 w-7 text-[#000]" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('about.our_approach')}</h3>
                                        <p className="text-gray-500 leading-relaxed">{t('about.our_approach_text')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{t('about.stats_title')}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { count: 300, color: '#A32020', label: t('about.stats.members'), icon: Users },
                            { count: 50, color: '#FDB913', label: t('about.stats.workshops'), icon: BookOpen },
                            { count: 20, color: '#111827', label: t('about.stats.partnerships'), icon: Globe },
                            { count: 3, color: '#A32020', label: t('about.stats.years'), icon: Award },
                        ].map((stat, index) => (
                            <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-1 rounded-2xl">
                                <CardContent className="p-7 text-center">
                                    <stat.icon className="h-8 w-8 mx-auto mb-3" style={{ color: stat.color }} />
                                    <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                                        <AnimatedCounter end={stat.count} suffix="+" repeat={true} repeatDelay={2000} />
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-gradient-to-br from-[#A32020] to-[#000] rounded-3xl p-10 sm:p-14 text-white shadow-2xl shadow-[#A32020]/15 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDB913]/8 rounded-full blur-3xl pointer-events-none" />
                        <Heart className="h-10 w-10 text-[#FDB913] mx-auto mb-6 relative" />
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 relative">{t('members.join_title')}</h2>
                        <p className="text-white/80 mb-8 text-lg font-light max-w-xl mx-auto relative">{t('members.join_desc')}</p>
                        <Button
                            size="lg"
                            className="bg-[#FDB913] text-black hover:bg-[#E5A50D] font-semibold px-8 rounded-xl shadow-xl shadow-[#FDB913]/25 hover:scale-[1.02] transition-all duration-300 relative group"
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t('members.join_button')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
