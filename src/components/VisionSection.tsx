import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Award, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function VisionSection() {
  const { t } = useLanguage();

  const goals = [
    {
      icon: Award,
      title: t('vision.goal1'),
      description: t('vision.goal1_desc'),
      color: '#A32020'
    },
    {
      icon: TrendingUp,
      title: t('vision.goal2'),
      description: t('vision.goal2_desc'),
      color: '#FDB913'
    },
    {
      icon: Heart,
      title: t('vision.goal3'),
      description: t('vision.goal3_desc'),
      color: '#000000'
    }
  ];

  return (
    <section id="vision" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#FDB913] text-black mb-4">{t('vision.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('vision.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('vision.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {goals.map((goal, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow group">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-start">
                  <div className="p-2.5 sm:p-3 rounded-lg mb-3 sm:mb-4" style={{ backgroundColor: `${goal.color}15` }}>
                    <goal.icon 
                      className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        color: goal.color,
                        filter: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = `drop-shadow(0 0 8px ${goal.color}CC)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg mb-2 sm:mb-3 text-gray-900">{goal.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{goal.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}