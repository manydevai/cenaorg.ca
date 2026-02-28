import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { BRAND } from '../assets/images';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const handleQuickDonation = () => {
    // PayPal donation link disabled as requested
    /*
    const hostedButtonId = '7JF9ZTEN7WVJQ';
    const paypalURL = `https://www.paypal.com/donate/?hosted_button_id=${hostedButtonId}&amount=50&currency_code=CAD`;
    window.open(paypalURL, '_blank', 'width=600,height=700,scrollbars=yes,resizable=yes');
    */
    console.log('Donation link currently disabled');
  };

  const navigationItems = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.programs'), href: '#programs' },
    { name: t('navigation.events'), href: '#events' },
    { name: t('navigation.contact'), href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white pt-2 pb-4 border-b border-gray-100 shadow-sm' : 'bg-transparent pt-2 pb-8'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-12">

          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <a href="#home" className="block relative group">
              <img
                src={BRAND.logo}
                alt="CENA Logo"
                className={`h-12 w-auto object-contain transition-all duration-500 ${isScrolled ? 'scale-90' : 'scale-110'}`}
              />
              <div className="absolute inset-x-0 -bottom-2 h-0.5 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          </div>

          {/* Center Navigation: Built for Focus */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-5 py-2 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 relative group ${isScrolled ? 'text-gray-600 hover:text-[#121212]' : 'text-gray-400 hover:text-white'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></span>
              </a>
            ))}
          </nav>

          {/* Rights Side: Utilities */}
          <div className="hidden lg:flex items-center space-x-8">
            <LanguageSwitcher isScrolled={isScrolled} />
            <Button
              className="bg-[#8B0000] hover:bg-[#A30000] text-white rounded-none px-8 py-6 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-500 shadow-[4px_4px_0px_0px_#C5A05933]"
              onClick={handleQuickDonation}
            >
              {t('common.donate_now')}
            </Button>
          </div>

          {/* Toggle (Mobile) */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isScrolled ? 'text-[#121212]' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className={`fixed inset-0 bg-white lg:hidden animate-fade-in-down z-[60] transition-all duration-500 ${isScrolled ? 'top-[64px]' : 'top-[80px]'}`}>
            <nav className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-serif text-[#121212] uppercase tracking-widest hover:text-[#C5A059] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="w-full h-px bg-gray-100 my-4"></div>
              <Button
                className="w-full bg-[#8B0000] text-white rounded-none py-8 text-xs tracking-widest uppercase font-bold"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleQuickDonation();
                }}
              >
                {t('common.donate_now')}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}