import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, Users, GraduationCap, Landmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PartnersSection() {
  const { t } = useLanguage();

  const partnerTypes = [
    {
      icon: Building2,
      type: t('partners.partner_type_corporate'),
      color: '#A32020'
    },
    {
      icon: Users,
      type: t('partners.partner_type_community'),
      color: '#000000'
    },
    {
      icon: GraduationCap,
      type: t('partners.partner_type_educational'),
      color: '#FDB913'
    },
    {
      icon: Landmark,
      type: t('partners.partner_type_government'),
      color: '#A32020'
    }
  ];

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#FDB913] text-black mb-4">{t('partners.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('partners.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {partnerTypes.map((partner, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div 
                  className="p-4 rounded-full mb-4 inline-block transition-all duration-300 group-hover:shadow-lg" 
                  style={{ 
                    backgroundColor: `${partner.color}15`
                  }}
                >
                  <partner.icon 
                    className="h-8 w-8 transition-all duration-300 group-hover:scale-110" 
                    style={{ 
                      color: partner.color,
                      filter: 'brightness(1)'
                    }}
                    onMouseEnter={(e) => {
                      if (partner.color === '#FDB913') {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(253, 185, 19, 0.8)) brightness(1.2)';
                      } else if (partner.color === '#A32020') {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(163, 32, 32, 0.8)) brightness(1.2)';
                      } else {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.6)) brightness(1.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'brightness(1)';
                    }}
                  />
                </div>
                <h4 className="text-gray-900">{partner.type}</h4>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-[#A32020] to-[#000000] text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl mb-3">{t('partners.become_partner_title')}</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('partners.become_partner_desc')}
            </p>
            <Button 
              className="bg-[#FDB913] hover:bg-[#E5A50D] text-black font-medium"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('partners.become_partner_button')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}