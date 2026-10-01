import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useDonationStats, formatDollars } from '../hooks/useDonationStats';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  Sparkles, 
  Users, 
  DollarSign, 
  ZoomIn, 
  X, 
  ArrowRight,
  Send,
  User,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  Link2
} from 'lucide-react';
import { toast } from 'sonner';

import flyerFR from '../assets/christmas/flyer-fr.jpg';
import flyerPT from '../assets/christmas/flyer-pt.jpg';
import flyerEN from '../assets/christmas/flyer-en.jpg';
import photo1 from '../assets/christmas/1.jpeg';
import photo2 from '../assets/christmas/2.jpeg';
import photo3 from '../assets/christmas/3.jpeg';
import { ChristmasSectionDecor } from './ChristmasSectionDecor';

// Official WhatsApp Brand SVG Icon
const OfficialWhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.533 5.341L2 22l4.821-1.517a9.98 9.98 0 0 0 5.19 1.455h.005c5.507 0 9.99-4.478 9.99-9.985A9.998 9.998 0 0 0 12.012 2zm5.82 14.39c-.24.675-1.39 1.288-1.925 1.371-.497.078-1.127.11-3.273-.777-2.743-1.134-4.503-3.92-4.64-4.103-.136-.184-1.11-1.477-1.11-2.816 0-1.34.697-2.001.945-2.274.248-.272.545-.34.726-.34.182 0 .363.002.521.01.17.008.397-.064.62.473.227.545.772 1.889.84 2.026.068.136.113.295.023.477-.091.181-.136.295-.272.454-.136.16-.286.357-.409.479-.136.136-.277.284-.12.555.158.272.705 1.163 1.515 1.884 1.042.928 1.92 1.214 2.193 1.35.272.136.43.113.59-.069.158-.181.68-0.793.861-1.065.182-.272.363-.227.612-.136.25.09 1.588.749 1.86 1.021.272.272.272.408.204.683z" />
  </svg>
);

// Official Facebook Brand SVG Icon
const OfficialFacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const ChristmasCampaignSection: React.FC = () => {
  const { language, t } = useLanguage();

  // Live donation stats from Stripe webhook backend
  const { stats: donationStats } = useDonationStats(60000); // poll every 60s
  
  // Set default flyer based on language
  const defaultFlyer = language === 'pt' ? flyerPT : language === 'en' ? flyerEN : flyerFR;
  const [activePhoto, setActivePhoto] = useState<string>(defaultFlyer);
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [selectedFlyerModal, setSelectedFlyerModal] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  // Pre-set amounts for each donation tier (in cents for Stripe)
  const tierAmounts: Record<number, number> = {
    1: 3000,   // $30
    2: 10000,  // $100
    3: 25000,  // $250
    4: 40000,  // $400
    5: 0       // custom
  };

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Update active photo when site language changes
  useEffect(() => {
    setActivePhoto(language === 'pt' ? flyerPT : language === 'en' ? flyerEN : flyerFR);
  }, [language]);

  // Live Countdown state calculation (Targeting Dec 15, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 76, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date('2026-12-15T23:59:59').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const getSelectedAmount = (): number => {
    if (selectedTier === 5) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : Math.round(parsed * 100);
    }
    return tierAmounts[selectedTier] || 3000;
  };

  const handleStripeCheckout = (e?: React.FormEvent, overrideAmount?: number) => {
    if (e) e.preventDefault();
    const amountInCents = overrideAmount ?? getSelectedAmount();
    const baseUrl = 'https://buy.stripe.com/bJe9AU5JO8p764W882eAg00';
    // Stripe Payment Links support ?prefilled_amount= in cents
    const url = amountInCents > 0 ? `${baseUrl}?prefilled_amount=${amountInCents}` : baseUrl;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Auto-scroll to campaign section when loaded from shared social links
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();
    const isCampaignRoute =
      path.includes('christmas') ||
      path.includes('campagne-noel') ||
      path.includes('noel-solidaire') ||
      path.includes('natal-solidario') ||
      window.location.hash === '#christmas-campaign';

    if (isCampaignRoute) {
      const scrollTarget = () => {
        const el = document.getElementById('christmas-campaign');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      scrollTarget();
      const t1 = setTimeout(scrollTarget, 300);
      const t2 = setTimeout(scrollTarget, 800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  // Canonical share URLs for Social Media Link Previews (WhatsApp, Facebook, Twitter, iMessage)
  const getCampaignShareInfo = () => {
    const isLocal = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local')
    );
    // WhatsApp and Facebook crawlers cannot access localhost; always use public domain for social previews
    const domain = isLocal ? 'https://cena-ca.org' : window.location.origin;

    let campaignPath = '/christmas-campaign';
    if (language === 'pt') {
      campaignPath = '/natal-solidario';
    } else if (language === 'en') {
      campaignPath = '/christmas-campaign';
    } else {
      campaignPath = '/campagne-noel';
    }

    const shareUrl = `${domain}${campaignPath}`;
    return { shareUrl };
  };

  const handleCopyLink = () => {
    const { shareUrl } = getCampaignShareInfo();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success(t('christmas_campaign.copied_toast'));
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const { shareUrl } = getCampaignShareInfo();
    const shareText = t('christmas_campaign.share_whatsapp_text').trim();
    const fullText = `${shareText} ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const { shareUrl } = getCampaignShareInfo();
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const donationOptions = [
    {
      id: 1,
      title: t('christmas_campaign.option1_title'),
      subtitle: t('christmas_campaign.option1_subtitle'),
      desc: t('christmas_campaign.option1_desc'),
      btn: t('christmas_campaign.option1_btn'),
      icon: DollarSign,
      color: 'from-amber-500/20 to-amber-700/10 border-amber-500/30',
      amount: 3000
    },
    {
      id: 2,
      title: t('christmas_campaign.option2_title'),
      subtitle: t('christmas_campaign.option2_subtitle'),
      desc: t('christmas_campaign.option2_desc'),
      btn: t('christmas_campaign.option2_btn'),
      icon: Gift,
      color: 'from-emerald-500/20 to-emerald-700/10 border-emerald-500/30',
      amount: 10000
    },
    {
      id: 3,
      title: t('christmas_campaign.option3_title'),
      subtitle: t('christmas_campaign.option3_subtitle'),
      desc: t('christmas_campaign.option3_desc'),
      btn: t('christmas_campaign.option3_btn'),
      icon: Heart,
      color: 'from-rose-500/20 to-rose-700/10 border-rose-500/30',
      amount: 25000
    },
    {
      id: 4,
      title: t('christmas_campaign.option4_title'),
      subtitle: t('christmas_campaign.option4_subtitle'),
      desc: t('christmas_campaign.option4_desc'),
      btn: t('christmas_campaign.option4_btn'),
      icon: Users,
      color: 'from-red-500/20 to-red-700/10 border-red-500/30',
      amount: 40000
    },
    {
      id: 5,
      title: t('christmas_campaign.option5_title'),
      subtitle: t('christmas_campaign.option5_subtitle'),
      desc: t('christmas_campaign.option5_desc'),
      btn: t('christmas_campaign.option5_btn'),
      icon: Sparkles,
      color: 'from-yellow-500/20 to-amber-600/10 border-[#C5A059]/40',
      isCustom: true,
      amount: 0
    }
  ];

  return (
    <section 
      id="christmas-campaign" 
      className="py-12 sm:py-20 bg-gray-50 text-gray-900 relative overflow-hidden"
    >
      {/* 1. HERO HEADER BANNER (Rich Christmas Velvet + Frosted Pine Garland & Hanging Ornaments) */}
      {/* ========================================================================= */}
      <div className="relative bg-gradient-to-br from-[#85050C] via-[#8B0000] to-[#450206] text-white pt-16 pb-28 sm:pb-36 lg:pb-44 overflow-hidden">
        
        {/* Luxury Minimalist Christmas Stage Decor inspired by Reference Design */}
        <ChristmasSectionDecor />

        <div className="max-w-[1540px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            
            {/* Left Side: Headline & Slogan — Pushed down cleanly below hanging decor */}
            <div className="lg:col-span-5 space-y-6 pt-16 sm:pt-24 lg:pt-28" data-aos="fade-right">
              
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-[#C5A059]/60 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-[#C5A059] shadow-md">
                <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t('christmas_campaign.section_badge')}</span>
              </div>

              {/* Main Script/Serif Headline inspired by Reference Template */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] text-shadow-md">
                {t('christmas_campaign.title')}
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-amber-200/90 font-light leading-snug">
                "{t('christmas_campaign.subtitle')}"
              </p>

              <p className="text-gray-200 text-sm sm:text-base max-w-xl font-light leading-relaxed">
                {t('christmas_campaign.hero_tagline')}
              </p>

              {/* Feature Highlights Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                  🍱 {t('christmas_campaign.badge_baskets')}
                </span>
                <span className="bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                  💳 {t('christmas_campaign.badge_giftcards')}
                </span>
                <span className="bg-black/30 backdrop-blur-md border border-white/20 text-white text-xs px-3.5 py-1.5 rounded-full font-medium flex items-center gap-1.5">
                  🎄 {t('christmas_campaign.badge_meal')}
                </span>
              </div>

            </div>

            {/* Right Side: CENA Campaign Photo & Flyer Showcase (Expanded into the right space) */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end w-full" data-aos="fade-left">
              <div className="relative group w-full max-w-[820px] 2xl:max-w-[940px]">
                
                {/* Gold Glow Frame */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#C5A059] via-amber-300 to-[#8B0000] rounded-3xl opacity-75 group-hover:opacity-100 blur-lg transition duration-500" />

                <div className="relative bg-[#0d0d0d] border-2 border-[#C5A059] rounded-2xl overflow-hidden shadow-2xl">
                  
                  {/* Active Flyer Display — 100% Complete & Uncropped (Aspect Ratio 1024x769) */}
                  <div 
                    onClick={() => setSelectedFlyerModal(activePhoto)}
                    className="relative w-full aspect-[1024/769] bg-black cursor-zoom-in group/flyer flex items-center justify-center overflow-hidden"
                    title={language === 'pt' ? 'Clique para ampliar' : language === 'en' ? 'Click to enlarge' : 'Cliquer pour agrandir'}
                  >
                    <img 
                      src={activePhoto} 
                      alt="CENA Christmas Campaign Official Flyer"
                      className="w-full h-full object-contain block transition-transform duration-300 group-hover/flyer:scale-[1.01]"
                    />
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 2. ELEVATED FLOATING WHITE CARD (Overlapping Hero Boundary like Reference) */}
      {/* ========================================================================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 -mt-20 sm:-mt-28" data-aos="fade-up">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 sm:p-8 text-gray-900 relative">
          
          {/* Decorative Holly Leaf on Bottom Left (inspired by Reference Template) */}
          <div className="absolute -bottom-5 -left-5 text-4xl pointer-events-none select-none hidden sm:block">
            🌿🍒
          </div>

          {/* PART A: Donation Options & Quick Registration Form */}
          <div className="mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-[#8B0000] bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100 inline-block mb-1">
                  CENA Solidarité 2026
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                  {t('christmas_campaign.form_heading')}
                </h3>
              </div>
              <div className="hidden md:flex items-center space-x-1.5 text-xs text-[#8B0000] font-semibold bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('christmas_campaign.deadline_title')} {t('christmas_campaign.deadline_date')}</span>
              </div>
            </div>

            {/* Render ALL 5 Cards in Top Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {donationOptions.map((opt) => {
                const IconComp = opt.icon;
                const isSelected = selectedTier === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedTier(opt.id)}
                    className={`rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 border ${
                      isSelected
                        ? 'border-[#8B0000] bg-red-50/70 shadow-md ring-2 ring-[#8B0000]/20'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/50 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Top Bar: Icon + Title */}
                      <div className="flex items-center space-x-1.5 mb-1.5">
                        <div className={`w-6 h-6 rounded-md flex-shrink-0 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#8B0000] text-white' : 'bg-red-50 text-[#8B0000]'
                        }`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-serif font-bold text-gray-900 line-clamp-1">
                          {opt.title}
                        </h4>
                      </div>

                      {/* Price Tag Pill or Custom Amount Input */}
                      <div className="mb-1.5">
                        {opt.isCustom && isSelected ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-bold text-[#8B0000]">$</span>
                            <input
                              type="number"
                              min="1"
                              step="1"
                              placeholder="0.00"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-2 py-1 rounded-md border border-red-200 bg-white text-[11px] font-bold text-[#8B0000] focus:outline-none focus:ring-1 focus:ring-[#8B0000] focus:border-[#8B0000] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        ) : (
                          <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-red-100/70 text-[#8B0000] border border-red-200 px-2 py-0.5 rounded-md truncate max-w-full">
                            {opt.isCustom ? '$0.00' : opt.subtitle}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-[10px] font-light leading-snug line-clamp-2">
                        {opt.desc}
                      </p>
                    </div>

                    {/* Compact CTA Button */}
                    <div className="pt-2 mt-2.5 border-t border-gray-200/60">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const amount = opt.isCustom
                            ? (parseFloat(customAmount) > 0 ? Math.round(parseFloat(customAmount) * 100) : 0)
                            : opt.amount;
                          handleStripeCheckout(undefined, amount);
                        }}
                        className="w-full py-1.5 px-1.5 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-wider rounded-md transition-all flex items-center justify-center space-x-1 shadow-2xs"
                      >
                        <span className="truncate">{opt.btn}</span>
                        <ArrowRight className="w-2.5 h-2.5 flex-shrink-0" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Registration Fields & Direct Action CTA */}
            <form onSubmit={handleStripeCheckout} className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-600 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  {t('christmas_campaign.form_name')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marie Dupont"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-gray-50/50"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-600 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {t('christmas_campaign.form_phone')}
                </label>
                <input
                  type="tel"
                  placeholder="+1 (514) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-gray-50/50"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-600 mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {t('christmas_campaign.form_email')}
                </label>
                <input
                  type="email"
                  required
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] bg-gray-50/50"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 bg-[#C8102E] hover:bg-[#A00000] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-md hover:shadow-red-900/30"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span className="truncate">
                    {t('christmas_campaign.form_submit')}
                    {selectedTier !== 5 && ` — $${(tierAmounts[selectedTier] / 100).toFixed(0)}`}
                    {selectedTier === 5 && customAmount && parseFloat(customAmount) > 0 && ` — $${parseFloat(customAmount).toFixed(2)}`}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* PART B: Live Christmas Countdown Timer & Progress Bar (inspired by Reference Template) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Heading & Live Countdown Box */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#8B0000]" />
                <h4 className="text-base sm:text-xl font-serif font-bold text-gray-900">
                  {t('christmas_campaign.countdown_heading')}
                </h4>
              </div>

              {/* 4 Countdown Boxes */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
                <div className="bg-red-50/60 border border-red-100 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-xl sm:text-3xl font-serif font-bold text-[#8B0000] leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mt-1">
                    {t('christmas_campaign.days')}
                  </span>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-xl sm:text-3xl font-serif font-bold text-[#8B0000] leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mt-1">
                    {t('christmas_campaign.hours')}
                  </span>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-xl sm:text-3xl font-serif font-bold text-[#8B0000] leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mt-1">
                    {t('christmas_campaign.minutes')}
                  </span>
                </div>

                <div className="bg-red-50/60 border border-red-100 rounded-xl p-2.5 sm:p-3 text-center">
                  <span className="block text-xl sm:text-3xl font-serif font-bold text-[#8B0000] leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block mt-1">
                    {t('christmas_campaign.seconds')}
                  </span>
                </div>
              </div>

              {/* Campaign Progress Line — LIVE from Stripe */}
              <div className="pt-1 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>{formatDollars(donationStats.totalRaisedDollars)} {t('christmas_campaign.progress_raised_label')}</span>
                  <span className="text-[#8B0000]">
                    {t('christmas_campaign.progress_goal_label')}: {formatDollars(donationStats.goalDollars)} ({donationStats.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-gray-200">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C5A059] via-amber-500 to-[#8B0000] rounded-full transition-all duration-1000"
                    style={{ width: `${donationStats.percentage}%` }}
                  />
                </div>
                {donationStats.donorCount > 0 && (
                  <p className="text-[10px] text-gray-500 font-medium text-right">
                    {donationStats.donorCount} {t('christmas_campaign.progress_donors_label')}
                  </p>
                )}
              </div>

            </div>

            {/* Right: Festive Christmas Tree Graphic */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
              <div className="bg-gradient-to-b from-emerald-50 to-emerald-100/50 border border-emerald-200/60 p-4 rounded-2xl text-center space-y-1.5 max-w-xs shadow-inner relative">
                <div className="text-4xl sm:text-5xl animate-bounce-subtle" style={{ animationDuration: '3s' }}>
                  🎄
                </div>
                <h5 className="font-serif font-bold text-emerald-950 text-sm">
                  {t('christmas_campaign.tree_card_title')}
                </h5>
                <p className="text-[11px] text-emerald-800 font-light leading-relaxed">
                  {t('christmas_campaign.deadline_text')}
                </p>
              </div>
            </div>

          </div>

          {/* PART C: Compact Social Share Buttons (Integrated seamlessly into the main card) */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2 text-gray-700">
              <Share2 className="w-4 h-4 text-[#8B0000]" />
              <span className="font-bold text-xs sm:text-sm font-serif text-gray-900">
                {t('christmas_campaign.share_title')} :
              </span>
              <span className="text-gray-500 text-[11px] hidden md:inline">
                {t('christmas_campaign.share_desc')}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-all border border-gray-300 shadow-2xs hover:shadow-xs"
                title={t('christmas_campaign.copy_link')}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4 text-gray-700" />}
                <span>{copied ? t('christmas_campaign.copied_toast') : t('christmas_campaign.copy_link')}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] hover:text-[#075E54] rounded-lg text-xs font-bold transition-all border border-[#25D366]/30 shadow-2xs hover:border-[#25D366]/60"
                title={t('christmas_campaign.whatsapp')}
              >
                <OfficialWhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleFacebookShare}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] hover:text-[#0d65d9] rounded-lg text-xs font-bold transition-all border border-[#1877F2]/30 shadow-2xs hover:border-[#1877F2]/60"
                title={t('christmas_campaign.facebook')}
              >
                <OfficialFacebookIcon className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 5. BOTTOM MOTTO BANNER */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 mt-16" data-aos="zoom-in">
        <div className="bg-gradient-to-r from-[#8B0000] via-[#A00000] to-[#5A0000] border-2 border-[#C5A059]/50 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <span className="text-4xl block">🎁 ✨ 🎄</span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {t('christmas_campaign.motto_title')}
            </h3>
            <p className="text-amber-100 text-sm sm:text-base font-light leading-relaxed">
              "{t('christmas_campaign.motto_desc')}"
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-200">
              <span className="bg-black/30 px-4 py-2 rounded-full border border-white/20">
                📍 3181 Montée Saint-Hubert, Longueuil, QC J3Y 4J4
              </span>
              <span className="bg-black/30 px-4 py-2 rounded-full border border-white/20">
                ✉️ info1@cena-ca.org | finance@cena-ca.org
              </span>
              <span className="bg-black/30 px-4 py-2 rounded-full border border-white/20">
                📞 +1 (263) 379-4805
              </span>
            </div>
          </div>

        </div>
      </div>


      {/* ========================================================================= */}
      {/* 6. LIGHTBOX MODAL FOR FULL-SIZE FLYER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedFlyerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFlyerModal(null)}
            className="fixed inset-0 z-[10005] flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-6xl w-full flex flex-col items-center justify-center space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Clean Close Button */}
              <div className="w-full flex items-center justify-end px-2 text-white">
                <button
                  onClick={() => setSelectedFlyerModal(null)}
                  className="p-2 rounded-full bg-black/60 hover:bg-[#8B0000] text-white hover:text-amber-200 border border-white/20 transition-all shadow-lg"
                  aria-label="Close modal"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Complete, Uncropped Flyer in Full High Resolution */}
              <div className="w-full flex items-center justify-center">
                <img
                  src={selectedFlyerModal}
                  alt="CENA Official Campaign Flyer Full Screen"
                  className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl shadow-2xl border-2 border-[#C5A059]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
