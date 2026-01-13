import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Users, Award, Building } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function SupportSection() {
  const { t } = useLanguage();

  const handleDonation = () => {
    const hostedButtonId = '7JF9ZTEN7WVJQ';
    const paypalURL = `https://www.paypal.com/donate/?hosted_button_id=${hostedButtonId}&currency_code=CAD`;
    window.open(paypalURL, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
  };

  const supportTypes = [
    {
      icon: Heart,
      title: t('support.donation_title'),
      description: t('support.donation_description'),
      color: '#A32020'
    },
    {
      icon: Users,
      title: t('support.volunteer_title'),
      description: t('support.volunteer_description'),
      color: '#FDB913'
    },
    {
      icon: Building,
      title: t('support.sponsor_title'),
      description: t('support.sponsor_description'),
      color: '#000000'
    }
  ];

  const impactLevels = [
    { amount: '$50', impact: t('support.impact_50'), color: '#FDB913' },
    { amount: '$100', impact: t('support.impact_100'), color: '#000000' },
    { amount: '$250', impact: t('support.impact_250'), color: '#A32020' },
    { amount: '$500', impact: t('support.impact_500'), color: '#A32020' }
  ];

  return (
    <section id="support" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('support.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('support.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('support.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Donation Card */}
          <Card className="border-2 border-[#A32020]/30 hover:border-[#A32020] hover:shadow-2xl transition-all duration-500 group">
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-[#A32020]/10 rounded-full group-hover:bg-[#A32020]/20 transition-all duration-300">
                  <Heart className="h-6 w-6 text-[#A32020] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(163,32,32,0.8)] hover:scale-110" />
                </div>
                <h3 className="text-2xl text-gray-900">{t('support.donate_title')}</h3>
              </div>
              <p className="text-gray-600 mb-6">{t('support.donate_description')}</p>
              
              <div className="mb-6">
                <h4 className="text-sm text-gray-700 mb-3">{t('support.impact_title')}</h4>
                <div className="space-y-3">
                  {impactLevels.map((level, index) => (
                    <div 
                      key={index} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg gap-2 hover:bg-gray-100 hover:scale-105 transition-all duration-300 cursor-pointer group/amount"
                    >
                      <span 
                        className="text-lg sm:text-xl font-semibold transition-all duration-300 group-hover/amount:drop-shadow-[0_0_12px_rgba(253,185,19,0.9)] group-hover/amount:scale-110" 
                        style={{ color: level.color }}
                      >
                        {level.amount}
                      </span>
                      <span className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover/amount:text-gray-900 transition-colors duration-300">
                        {level.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-[#A32020] hover:bg-[#8B1B1B] text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={handleDonation}
              >
                {t('common.donate_now')}
              </Button>
              <p className="text-xs text-gray-500 mt-3 text-center">
                {t('support.tax_notice')}
              </p>
              <p className="text-xs text-gray-400 mt-1 text-center">
                {t('support.secure_payment')}
              </p>
            </CardContent>
          </Card>

          {/* Other Ways */}
          <div className="space-y-6">
            <h3 className="text-2xl mb-4 text-gray-900">{t('support.other_ways')}</h3>
            {supportTypes.map((way, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full flex-shrink-0" style={{ backgroundColor: `${way.color}15` }}>
                      <way.icon 
                        className="h-6 w-6 transition-all duration-300 group-hover:scale-110" 
                        style={{ 
                          color: way.color,
                          filter: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = `drop-shadow(0 0 8px ${way.color}CC)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-gray-900">{way.title}</h4>
                      <p className="text-gray-600 mb-4">{way.description}</p>
                      <Button 
                        variant="outline"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ borderColor: way.color, color: way.color }}
                      >
                        {t('common.contact_us')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}