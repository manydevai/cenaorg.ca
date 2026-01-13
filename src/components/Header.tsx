import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { BRAND } from '../assets/images';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  // Quick PayPal donation (default $50 CAD)
  const handleQuickDonation = () => {
    const hostedButtonId = '7JF9ZTEN7WVJQ';
    const paypalURL = `https://www.paypal.com/donate/?hosted_button_id=${hostedButtonId}&amount=50&currency_code=CAD`;
    window.open(paypalURL, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
  };

  const navigationItems = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.mission'), href: '#mission' },
    { name: t('navigation.vision'), href: '#vision' },
    { name: t('navigation.programs'), href: '#programs' },
    { name: t('navigation.events'), href: '#events' },
    { name: t('navigation.team'), href: '#team' },
    { name: t('navigation.blog'), href: '#blog' },
    { name: t('navigation.contact'), href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-0 h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 self-start">
            <a href="#home" className="block">
              <img 
                src={BRAND.logo} 
                alt="CENA Logo" 
                className="h-[90px] w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center px-8">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-gray-700 whitespace-nowrap text-center min-w-[80px] hover:text-[#A32020] transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <LanguageSwitcher />
            <Button 
              className="bg-[#A32020] hover:bg-[#8B1B1B] text-white px-6 transition-colors duration-200"
              onClick={handleQuickDonation}
            >
              {t('common.donate_now')}
            </Button>
          </div>

          {/* Mobile Language Switcher & Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 rounded-md hover:text-[#A32020] hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 pt-3">
                <Button 
                  className="w-full bg-[#A32020] hover:bg-[#8B1B1B] text-white transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleQuickDonation();
                  }}
                >
                  {t('common.donate_now')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}