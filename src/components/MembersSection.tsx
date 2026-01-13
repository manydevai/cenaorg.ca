import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function MembersSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  const benefits = [
    t('members.benefit1'),
    t('members.benefit2'),
    t('members.benefit3'),
    t('members.benefit4'),
    t('members.benefit5'),
    t('members.benefit6')
  ];

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('members');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="members" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#000000] text-white mb-4">{t('members.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('members.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('members.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl mb-6 text-gray-900">{t('members.member_benefits')}</h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start space-x-3 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`p-1 bg-[#FDB913] rounded-full mt-0.5 flex-shrink-0 transition-all duration-300 ${
                    hoveredIndex === index || isInView 
                      ? 'scale-110' 
                      : ''
                  }`}
                  style={{
                    filter: hoveredIndex === index 
                      ? 'drop-shadow(0 0 8px rgba(253, 185, 19, 0.8)) brightness(1.2)' 
                      : isInView
                        ? 'drop-shadow(0 0 4px rgba(253, 185, 19, 0.6)) brightness(1.1)'
                        : 'none'
                  }}
                  >
                    <Check className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-gradient-to-br from-[#A32020] to-[#000000] text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-4">{t('members.join_title')}</h3>
              <p className="text-lg mb-6 opacity-90">
                {t('members.join_desc')}
              </p>
              <Button 
                size="lg"
                className="w-full bg-[#FDB913] text-black hover:bg-[#E5A50D] font-medium"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('members.join_button')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}