import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { BRAND } from '../assets/images';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const location = useLocation();

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (eventsRef.current && !eventsRef.current.contains(e.target as Node)) {
        setIsEventsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickDonation = () => {
    window.open('https://buy.stripe.com/bJe9AU5JO8p764W882eAg00', '_blank', 'noopener,noreferrer');
  };

  const navigationItems = [
    { name: t('navigation.home'), href: location.pathname === '/' ? '#home' : '/' },
    { name: t('navigation.about'), href: '/#about', isAnchor: true },
    { name: t('navigation.programs'), href: '/#programs', isAnchor: true },
    { name: t('navigation.gallery'), href: '/gallery/black-consciousness-day' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: '/#contact', isAnchor: true }
  ];

  const mobileNavigationItems = [
    { name: t('navigation.home'), href: location.pathname === '/' ? '#home' : '/' },
    { name: t('navigation.about'), href: '/#about', isAnchor: true },
    { name: t('navigation.programs'), href: '/#programs', isAnchor: true },
    { name: t('navigation.gallery'), href: '/gallery/black-consciousness-day' },
    { name: t('navigation.events'), href: '/#events', isAnchor: true },
    { name: t('navigation.recent_events'), href: '/events/black-consciousness-day' },
    { name: t('navigation.blog'), href: '/blog' },
    { name: t('navigation.contact'), href: '/#contact', isAnchor: true }
  ];

  const getLinkClass = (href: string) => {
    const isActive = location.pathname === href || (href === '/' && location.pathname === '/');
    return `px-5 h-12 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-300 relative group flex items-center ${
      isScrolled 
        ? (isActive ? 'text-[#C5A059]' : 'text-gray-600 hover:text-[#121212]') 
        : (isActive ? 'text-[#C5A059]' : 'text-gray-400 hover:text-white')
    }`;
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full transition-all duration-500 ${isMenuOpen ? 'z-[10000] bg-white pt-2 pb-4 shadow-sm' : `z-50 ${isScrolled ? 'bg-white pt-2 pb-4 border-b border-gray-100 shadow-sm' : 'bg-transparent pt-2 pb-8'}`}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-12">

          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="block relative group">
              <img
                src={BRAND.logo}
                alt="CENA Logo"
                className={`h-12 w-auto object-contain transition-all duration-500 ${isScrolled || isMenuOpen ? 'scale-90' : 'scale-110'}`}
              />
              <div className="absolute inset-x-0 -bottom-2 h-0.5 bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </Link>
          </div>

          {/* Center Navigation: Built for Focus */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 3).map((item) => (
              item.isAnchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={getLinkClass(item.href)}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] transition-transform duration-500 ${location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={getLinkClass(item.href)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] transition-transform duration-500 ${location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              )
            ))}

            {/* Events Dropdown */}
            <div ref={eventsRef} className="relative h-12 flex items-center">
              <button
                onClick={() => setIsEventsOpen(!isEventsOpen)}
                className={`${getLinkClass('/events')} gap-1 cursor-pointer`}
              >
                {t('navigation.events')}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isEventsOpen ? 'rotate-180' : ''}`} />
                <span className="absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
              </button>

              {isEventsOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 w-52 bg-white border border-gray-100 shadow-2xl z-50 animate-fade-in-down">
                  <a
                    href="/#events"
                    onClick={(e) => {
                      handleAnchorClick(e, '/#events');
                      setIsEventsOpen(false);
                    }}
                    className="flex items-center w-full px-5 py-4 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-600 hover:text-[#121212] hover:bg-gray-50 transition-colors"
                  >
                    {t('navigation.events')}
                  </a>
                  <div className="h-px bg-gray-100" />
                  <Link
                    to="/events/black-consciousness-day"
                    onClick={() => setIsEventsOpen(false)}
                    className="flex items-center w-full px-5 py-4 text-[10px] tracking-[0.2em] uppercase font-bold text-gray-600 hover:text-[#C5A059] hover:bg-gray-50 transition-colors"
                  >
                    {t('navigation.recent_events')}
                  </Link>
                </div>
              )}
            </div>

            {navigationItems.slice(3).map((item) => (
              item.isAnchor ? (
                <a
                  key={item.href}
                  href={item.href}
                  className={getLinkClass(item.href)}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] transition-transform duration-500 ${location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={getLinkClass(item.href)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-5 right-5 h-px bg-[#C5A059] transition-transform duration-500 ${location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              )
            ))}
          </nav>

          {/* Rights Side: Utilities */}
          <div className="hidden lg:flex items-center space-x-8">
            <LanguageSwitcher isScrolled={isScrolled} />
            <Button
              className={`rounded-none px-6 h-10 text-[10px] tracking-[0.2em] font-bold uppercase transition-all duration-300 border backdrop-blur-sm ${
                isScrolled 
                  ? 'bg-transparent border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white shadow-[2px_2px_0px_0px_#8B000020]' 
                  : 'bg-transparent border-white/50 text-white hover:border-white hover:bg-white/10 shadow-[2px_2px_0px_0px_#ffffff20]'
              }`}
              onClick={handleQuickDonation}
            >
              {t('common.donate_now')}
            </Button>
          </div>

          {/* Toggle (Mobile) */}
          <div className="lg:hidden flex items-center space-x-4 relative z-[10001]">
            <LanguageSwitcher isScrolled={isScrolled || isMenuOpen} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${isScrolled || isMenuOpen ? 'text-[#121212]' : 'text-white'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div 
            className="fixed lg:hidden animate-fade-in-down z-[9999] transition-all duration-500"
            style={{ 
              backgroundColor: '#FFFFFF', 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100vh',
              overflowY: 'auto'
            }}
          >
            <nav className="flex flex-col items-center justify-center min-h-full space-y-8 px-6 pt-24 pb-12">
              {mobileNavigationItems.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-2xl font-serif text-[#121212] uppercase tracking-widest hover:text-[#C5A059] transition-colors"
                    onClick={(e) => {
                      handleAnchorClick(e, item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-2xl font-serif uppercase tracking-widest transition-colors ${location.pathname === item.href ? 'text-[#C5A059]' : 'text-[#121212] hover:text-[#C5A059]'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}

              <div className="w-full h-px bg-gray-100 my-4"></div>
              <Button
                className="w-full bg-transparent border border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white rounded-none py-6 h-12 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300"
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