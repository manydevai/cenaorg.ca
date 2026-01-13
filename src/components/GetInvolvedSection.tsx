import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Heart, Users, CreditCard, HandHeart, Megaphone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function GetInvolvedSection() {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = ['10', '25', '50', '100', '250'];

  // PayPal donation URL generator
  const generatePayPalURL = (amount: string) => {
    const baseURL = 'https://www.paypal.com/donate';
    const hostedButtonId = '7JF9ZTEN7WVJQ';
    
    return `${baseURL}/?hosted_button_id=${hostedButtonId}&amount=${amount}&currency_code=EUR`;
  };

  const handleDonation = () => {
    const amount = customAmount || selectedAmount || '25';
    const paypalURL = generatePayPalURL(amount);
    
    // Open PayPal in a new window/tab
    window.open(paypalURL, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
  };

  const ways = [
    {
      icon: CreditCard,
      title: t('get_involved.donate_title'),
      description: t('get_involved.donate_description'),
      action: t('common.donate_now'),
      color: 'bg-[#A32020]',
      borderColor: 'border-[#A32020]'
    },
    {
      icon: HandHeart,
      title: t('get_involved.volunteer_title'),
      description: t('get_involved.volunteer_description'),
      action: t('common.sign_up'),
      color: 'bg-[#000000]',
      borderColor: 'border-[#000000]'
    },
    {
      icon: Megaphone,
      title: t('get_involved.membership_title'),
      description: t('get_involved.membership_description'),
      action: t('common.join_us'),
      color: 'bg-[#FDB913]',
      borderColor: 'border-[#FDB913]'
    }
  ];

  return (
    <section id="get-involved" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('get_involved.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('get_involved.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('get_involved.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div>
            <Card className="border-2 border-[#A32020]/20">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Heart className="h-6 w-6 text-[#A32020] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(163,32,32,0.8)] hover:scale-110" />
                  <h3 className="text-2xl text-gray-900">{t('get_involved.donate_title')}</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-3">{t('get_involved.choose_amount')}</label>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {donationAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant={selectedAmount === amount ? "default" : "outline"}
                          className={`${
                            selectedAmount === amount 
                              ? 'bg-[#A32020] hover:bg-[#8B1B1B] text-white' 
                              : 'border-[#A32020] text-[#A32020] hover:bg-[#A32020] hover:text-white'
                          }`}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                        >
                          €{amount}
                        </Button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder={t('get_involved.custom_amount')}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount('');
                      }}
                      className="border-[#A32020]/30 focus:border-[#A32020]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">{t('get_involved.donation_message')}</label>
                    <Textarea
                      placeholder={t('get_involved.donation_message_placeholder')}
                      rows={3}
                      className="border-[#A32020]/30 focus:border-[#A32020]"
                    />
                  </div>

                  <div className="bg-[#FDB913]/10 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {t('get_involved.anbi_notice')}
                    </p>
                  </div>

                  <Button 
                    className="w-full bg-[#A32020] hover:bg-[#8B1B1B] text-white"
                    onClick={handleDonation}
                  >
                    Donate €{customAmount || selectedAmount || '0'} via PayPal
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Secure payment via PayPal • Redirects to PayPal.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Ways to Help */}
          <div className="space-y-6">
            <h3 className="text-2xl text-gray-900 mb-6">{t('get_involved.other_ways')}</h3>
            
            {ways.map((way, index) => {
              const Icon = way.icon;
              const handleClick = () => {
                if (index === 0) {
                  // Donate - open PayPal
                  window.open('https://www.paypal.com/donate/?hosted_button_id=7JF9ZTEN7WVJQ', '_blank');
                } else {
                  // Volunteer or Membership - scroll to contact
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              };
              
              return (
                <Card key={index} className={`border-2 ${way.borderColor}/20 hover:shadow-lg transition-all duration-300 group`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${way.color}`}>
                        <Icon className="h-6 w-6 text-white transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] group-hover:scale-110" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg mb-2 text-gray-900">
                          {way.title}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {way.description}
                        </p>
                        <Button 
                          variant="outline" 
                          className={`${way.borderColor} text-gray-700 hover:bg-gray-50`}
                          onClick={handleClick}
                        >
                          {way.action} <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Impact Stats */}
            <Card className="bg-gradient-to-r from-[#A32020] to-[#000000] text-white border-0">
              <CardContent className="p-6">
                <h4 className="text-lg mb-4">{t('get_involved.impact_title')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl">€25</div>
                    <div className="text-sm text-white/90">{t('get_involved.impact_25')}</div>
                  </div>
                  <div>
                    <div className="text-2xl">€50</div>
                    <div className="text-sm text-white/90">{t('get_involved.impact_50')}</div>
                  </div>
                  <div>
                    <div className="text-2xl">€100</div>
                    <div className="text-sm text-white/90">{t('get_involved.impact_100')}</div>
                  </div>
                  <div>
                    <div className="text-2xl">€250</div>
                    <div className="text-sm text-white/90">{t('get_involved.impact_250')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}