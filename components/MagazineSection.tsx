import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BookOpen,
  Download,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Calendar,
  Tag,
  ArrowUpRight,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Story {
  id: number;
  page: number;
  category: string;
  date: string;
  title: string;
  spoiler: string;
  imagePage: number;
}

export function MagazineSection() {
  const { t, language } = useLanguage();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Retrieve translation stories or fallback
  const rawStories = (t('magazine.stories') as unknown) as Story[];
  const stories: Story[] = Array.isArray(rawStories) ? rawStories : [];

  const handleNext = useCallback(() => {
    if (stories.length === 0) return;
    setActiveSlide((prev) => (prev + 1) % stories.length);
  }, [stories.length]);

  const handlePrev = () => {
    if (stories.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };

  // Auto-slideshow
  useEffect(() => {
    if (isHovered || stories.length === 0) return;
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, stories.length, handleNext]);

  const pdfLinks = {
    fr: '/magazine/pdf/cena-magazine-fr.pdf',
    pt: '/magazine/pdf/cena-magazine-pt.pdf',
    en: '/magazine/pdf/cena-magazine-en.pdf',
  };

  const currentPdf = pdfLinks[language as keyof typeof pdfLinks] || pdfLinks.fr;
  const currentStory = stories[activeSlide] || stories[0];

  const getPageSrc = (pageNum: number) => {
    if (pageNum === 1) return '/magazine/pages/MAG_-_ENGLISH_VERSION.webp';
    return `/magazine/pages/MAG_-_ENGLISH_VERSION${pageNum}.webp`;
  };

  const handleShare = async (story?: Story) => {
    const shareUrl = story
      ? `${window.location.origin}/magazine?page=${story.page}`
      : `${window.location.origin}/magazine`;
    const shareTitle = story ? story.title : 'CENA Magazine 2026';
    const shareText = story
      ? `${story.title} — ${story.spoiler.substring(0, 120)}...`
      : 'Descubra a CENA Magazine — Edição Especial 2026';

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
      } catch (_) { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        const btn = document.activeElement as HTMLElement;
        const original = btn?.getAttribute('data-tooltip');
        btn?.setAttribute('data-tooltip', '✓ Link copiado!');
        setTimeout(() => btn?.setAttribute('data-tooltip', original || ''), 2000);
      } catch (_) {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
      }
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#090909] text-white relative overflow-hidden border-y border-[#C5A059]/25 font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8B0000]/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP LIVE DIGITAL NEWS TICKER BAR */}
      <div className="w-full bg-[#121212] border-b border-[#C5A059]/30 py-2.5 px-4 mb-16 overflow-hidden flex items-center shadow-lg">
        <div className="flex items-center space-x-2 bg-[#8B0000] text-white px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex-shrink-0 rounded-xs shadow-md">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping mr-1" />
          <span>{t('magazine.ticker_label')}</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap ml-4 flex-1">
          <p className="inline-block animate-marquee text-xs font-serif italic tracking-wider text-gray-300">
            {t('magazine.ticker_text')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-[#8B0000]/30 border border-[#8B0000] px-4 py-1.5 mb-4">
            <Newspaper className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[#C5A059] font-sans text-xs tracking-[0.3em] uppercase font-bold">
              {t('magazine.home_highlight_badge')}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4 leading-tight">
            {t('magazine.home_highlight_title')}
          </h2>

          <div className="w-24 h-1 bg-[#C5A059] mx-auto mb-6" />

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
            {t('magazine.home_highlight_desc')}
          </p>
        </div>

        {/* 2. AUTO-ROTATING NEWSPAPER FEATURE SLIDER */}
        {currentStory && (
          <div
            className="mb-20 bg-black/70 border-2 border-[#C5A059]/40 rounded-xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Magazine Page Image Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group max-w-sm w-full">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#8B0000] via-[#C5A059] to-[#8B0000] rounded-lg opacity-60 group-hover:opacity-100 transition duration-700 blur-xs" />
                  <div className="relative bg-black rounded-lg overflow-hidden border border-[#C5A059]/50 shadow-2xl aspect-[3/4]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentStory.id}
                        src={getPageSrc(currentStory.imagePage)}
                        alt={currentStory.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 border border-[#C5A059]/50 text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                      Pág. {currentStory.page}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Story Details & Teaser Spoiler */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Meta Tag & Date */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center space-x-1 px-3 py-1 bg-[#8B0000]/40 border border-[#8B0000] text-[#C5A059] font-bold uppercase tracking-widest rounded-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {currentStory.category}
                  </span>
                  <span className="flex items-center text-gray-400 font-serif italic">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#C5A059]" />
                    {currentStory.date}
                  </span>
                </div>

                {/* Story Title */}
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`title-${currentStory.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl sm:text-4xl font-serif font-bold text-white leading-snug tracking-tight"
                  >
                    {currentStory.title}
                  </motion.h3>
                </AnimatePresence>

                {/* Teaser Spoiler Paragraph */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`spoiler-${currentStory.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans border-l-2 border-[#C5A059] pl-4 italic bg-white/5 py-3 pr-3"
                  >
                    "{currentStory.spoiler}"
                  </motion.p>
                </AnimatePresence>

                {/* Primary Action Button (Backlink directly to magazine page) */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/magazine?page=${currentStory.page}`}
                    className="px-6 py-3.5 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-xs uppercase tracking-[0.18em] border border-[#C5A059] transition-all duration-300 shadow-xl flex items-center space-x-2 group"
                  >
                    <span>
                      {t('magazine.read_full_article').replace('{page}', String(currentStory.page))}
                    </span>
                  </Link>

                  <Link
                    to="/magazine"
                    className="px-5 py-3.5 bg-transparent hover:bg-white/10 border border-white/20 text-gray-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5"
                  >
                    <BookOpen className="w-4 h-4 text-[#C5A059]" />
                    <span>{t('magazine.explore_cta')}</span>
                  </Link>

                  <button
                    onClick={() => handleShare(currentStory)}
                    className="px-5 py-3.5 bg-transparent hover:bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#C5A059] font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer"
                    title="Partilhar esta notícia"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Partilhar</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Slider Controls Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              {/* Slide Indicators Dots */}
              <div className="flex items-center space-x-2">
                {stories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? 'w-8 bg-[#C5A059]'
                        : 'w-2 bg-white/20 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Manual Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 bg-white/5 hover:bg-[#8B0000] border border-white/15 text-white rounded-full transition-colors"
                  aria-label="Previous Story"
                >
                  <ChevronLeft className="w-4 h-4 text-[#C5A059]" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 bg-white/5 hover:bg-[#8B0000] border border-white/15 text-white rounded-full transition-colors"
                  aria-label="Next Story"
                >
                  <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE BACKLINK NEWS GRID (SECONDARY TOPICS) */}
        <div className="space-y-6" data-aos="fade-up">
          <h3 className="text-xl font-serif font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <span>Notícias & Destaques da Revista</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.slice(0, Math.floor(stories.length / 3) * 3).map((item) => (
              <div
                key={item.id}
                className="bg-black/60 border border-white/10 hover:border-[#C5A059]/60 rounded-lg transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg overflow-hidden"
              >
                {/* Featured Image */}
                <Link to={`/magazine?page=${item.page}`} className="block">
                  <div className="relative aspect-[3/2.8] overflow-hidden bg-[#111]">
                    <img
                      src={getPageSrc(item.imagePage)}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-[#C5A059]/50 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] rounded-sm">
                      Pág. {item.page}
                    </div>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="px-3 py-2.5 flex flex-col flex-1">
                  <div className="space-y-1 flex-1">
                    <span className="text-[#C5A059] font-bold uppercase tracking-wider text-[10px]">
                      {item.category}
                    </span>

                    <Link to={`/magazine?page=${item.page}`}>
                      <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </Link>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <Link
                      to={`/magazine?page=${item.page}`}
                      className="font-bold text-[#C5A059] group-hover:text-white transition-colors flex items-center space-x-1"
                    >
                      <span>Abrir na Revista</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleShare(item); }}
                      className="p-2 rounded-full hover:bg-[#C5A059]/15 text-gray-400 hover:text-[#C5A059] transition-colors cursor-pointer"
                      title="Partilhar"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FOOTER DOWNLOAD BAR */}
        <div className="mt-16 bg-[#121212] border border-white/15 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-[#C5A059] flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-base text-white uppercase tracking-wider">
                Descarregar Revista Completa em PDF
              </h4>
              <p className="text-gray-400 text-xs font-sans">
                {t('magazine.select_edition')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/magazine/pdf/cena-magazine-fr.pdf"
              download="CENA_Magazine_FR.pdf"
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 rounded"
            >
              <Download className="w-4 h-4" />
              <span>PDF (FR)</span>
            </a>
            <a
              href="/magazine/pdf/cena-magazine-pt.pdf"
              download="CENA_Magazine_PT.pdf"
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 rounded"
            >
              <Download className="w-4 h-4" />
              <span>PDF (PT)</span>
            </a>
            <a
              href="/magazine/pdf/cena-magazine-en.pdf"
              download="CENA_Magazine_EN.pdf"
              className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#A00000] border border-[#C5A059] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2 rounded shadow-lg"
            >
              <Download className="w-4 h-4 text-[#C5A059]" />
              <span>PDF (EN)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
