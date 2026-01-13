import image_00b20ac46b901a95d9f5739973b1e5e691040132 from 'figma:asset/00b20ac46b901a95d9f5739973b1e5e691040132.png';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Users, BookOpen, TrendingUp, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { AnimatedCounter } from './AnimatedCounter';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#FDB913] text-black mb-4">{t('about.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('about.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image_00b20ac46b901a95d9f5739973b1e5e691040132}
            alt="CENA Community"
            className="w-full h-64 sm:h-80 md:h-96 object-cover object-[50%_30%] transition-all duration-500 hover:scale-105 hover:brightness-110 cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="border-l-4 border-l-[#A32020] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-[#A32020] mt-1 flex-shrink-0 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(163,32,32,0.8)] hover:scale-110" />
                <div>
                  <h4 className="text-base sm:text-lg mb-2 text-gray-900">{t('about.who_we_are')}</h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('about.who_we_are_text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#FDB913] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#000000] mt-1 flex-shrink-0 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] hover:scale-110" />
                <div>
                  <h4 className="text-base sm:text-lg mb-2 text-gray-900">{t('about.our_approach')}</h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('about.our_approach_text')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <h3 className="text-2xl sm:text-3xl text-center mb-8 font-serif text-gray-900">
          {t('about.stats_title')}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl text-[#A32020] mb-2">
                <AnimatedCounter end={300} suffix="+" repeat={true} repeatDelay={2000} />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{t('about.stats.members')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl text-[#FDB913] mb-2">
                <AnimatedCounter end={50} suffix="+" repeat={true} repeatDelay={2000} />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{t('about.stats.workshops')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl text-[#000000] mb-2">
                <AnimatedCounter end={20} suffix="+" repeat={true} repeatDelay={2000} />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{t('about.stats.partnerships')}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl text-[#A32020] mb-2">
                <AnimatedCounter end={3} suffix="+" repeat={true} repeatDelay={2000} />
              </div>
              <div className="text-xs sm:text-sm text-gray-600">{t('about.stats.years')}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}