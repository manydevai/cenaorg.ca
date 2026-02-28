import { Heart, Users, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function SupportSection() {
  const { t } = useLanguage();

  const handleDonation = () => {
    // PayPal donation link disabled as requested
    /*
    const hostedButtonId = '7JF9ZTEN7WVJQ';
    const paypalURL = `https://www.paypal.com/donate/?hosted_button_id=${hostedButtonId}&currency_code=CAD`;
    window.open(paypalURL, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
    */
    console.log('Donation link currently disabled');
  };

  const supportTypes = [
    { icon: Heart, title: t('support.donation_title'), description: t('support.donation_description'), color: '#8B0000' },
    { icon: Users, title: t('support.volunteer_title'), description: t('support.volunteer_description'), color: '#C5A059' },
    { icon: Briefcase, title: t('support.sponsor_title'), description: t('support.sponsor_description'), color: '#8B0000' }
  ];

  const impactLevels = [
    { amount: '$50', impact: t('support.impact_50'), color: '#C5A059' },
    { amount: '$100', impact: t('support.impact_100'), color: '#121212' },
    { amount: '$250', impact: t('support.impact_250'), color: '#8B0000' },
    { amount: '$500', impact: t('support.impact_500'), color: '#8B0000' }
  ];

  return (
    <section id="support" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">

          {/* Main Donation Impact: Editorial Column */}
          <div className="lg:col-span-7">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-8">
              {t('support.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight mb-12 tracking-tight">
              {t('support.title')}
            </h2>
            <p className="text-xl text-gray-500 font-sans mb-16 leading-relaxed italic border-l-2 border-[#C5A059] pl-8">
              {t('support.description')}
            </p>

            <div className="space-y-4">
              <h4 className="text-[10px] tracking-[0.3em] font-bold text-gray-400 uppercase mb-8">{t('support.financial_scaling')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {impactLevels.map((level, index) => (
                  <div key={index} className="p-8 border border-gray-100 flex flex-col justify-between group hover:border-[#C5A059] transition-all duration-500 cursor-default">
                    <span className="block text-4xl font-serif mb-4 group-hover:text-[#8B0000] transition-colors" style={{ color: level.color }}>{level.amount}</span>
                    <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider font-bold">{level.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Column: Architectural Card Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#121212] p-12 lg:p-16 relative z-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-1 bg-[#C5A059]"></div>
              <h3 className="text-3xl font-serif text-white mb-10 leading-tight">{t('support.contribution_center')}</h3>

              <div className="space-y-12">
                {supportTypes.map((way, index) => (
                  <div key={index} className="flex items-start space-x-6 group">
                    <way.icon className="h-6 w-6 mt-1 flex-shrink-0 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12" style={{ color: way.color }} />
                    <div className="border-l border-white/5 pl-6">
                      <h4 className="text-sm tracking-widest uppercase font-bold text-white mb-2">{way.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{way.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-12 border-t border-white/5">
                <Button
                  className="w-full bg-[#8B0000] hover:bg-[#A30000] text-white rounded-none py-8 text-[11px] tracking-[0.3em] font-bold uppercase transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(197,160,89,0.2)]"
                  onClick={handleDonation}
                >
                  {t('support.initiate_contribution')} <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
                <div className="mt-8 grid grid-cols-2 gap-4 text-[8px] tracking-[0.4em] text-gray-600 uppercase font-bold text-center">
                  <span className="p-2 border border-white/5">{t('support.tax_notice')}</span>
                  <span className="p-2 border border-white/5">{t('support.secure_payment')}</span>
                </div>
              </div>
            </div>

            {/* Background Structural Accent */}
            <div className="absolute -top-12 -left-12 w-full h-full border border-gray-100 -z-10 bg-[#FBFBFB]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}