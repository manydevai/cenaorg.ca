import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ShareButton } from './ShareButton';
import { updateOpenGraphMeta } from '../utils/share';
import {
  BookOpen,
  Download,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Calendar,
  Tag,
  ArrowUpRight
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
  const { t } = useLanguage();
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

  const handlePrev = useCallback(() => {
    if (stories.length === 0) return;
    setActiveSlide((prev) => (prev - 1 + stories.length) % stories.length);
  }, [stories.length]);

  // Auto-slideshow (4 seconds transition time for comfortable reading)
  useEffect(() => {
    if (isHovered || stories.length === 0) return;
    const intervalTime = 4000; // 4 seconds (within 3-5s range requested)

    intervalRef.current = setInterval(() => {
      handleNext();
    }, intervalTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, stories.length, handleNext]);

  const currentStory = stories[activeSlide] || stories[0];

  const getPageSrc = (pageNum: number) => {
    if (pageNum === 1) return '/magazine/pages/MAG_-_ENGLISH_VERSION.webp';
    return `/magazine/pages/MAG_-_ENGLISH_VERSION${pageNum}.webp`;
  };

  // Update open graph tags when active slide changes
  useEffect(() => {
    if (currentStory) {
      updateOpenGraphMeta({
        title: `${currentStory.title} — CENA Magazine 2026`,
        text: currentStory.spoiler,
        url: `/magazine/page/${currentStory.page}`,
        image: getPageSrc(currentStory.imagePage)
      });
    }
  }, [currentStory]);

  if (stories.length === 0) return null;

  // Helpers for mobile Cover Flow (3D Carousel)
  const prevIndex = (activeSlide - 1 + stories.length) % stories.length;
  const nextIndex = (activeSlide + 1) % stories.length;

  return (
    <section className="py-14 sm:py-24 bg-[#080808] text-white relative overflow-hidden border-y border-[#C5A059]/25 font-sans select-none">
      {/* Premium Background Atmosphere */}
      <div className="absolute top-0 right-1/4 w-[30rem] h-[30rem] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] bg-[#8B0000]/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP LIVE NEWS TICKER BAR */}
      <div className="w-full bg-[#111111] border-b border-[#C5A059]/30 py-2 px-4 mb-10 sm:mb-12 overflow-hidden flex items-center shadow-md">
        <div className="flex items-center space-x-1.5 bg-[#8B0000] text-white px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex-shrink-0 rounded-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping mr-0.5" />
          <span>{t('magazine.ticker_label')}</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap ml-3 flex-1">
          <p className="inline-block animate-marquee text-[11px] sm:text-xs font-serif italic tracking-wider text-gray-300">
            {t('magazine.ticker_text')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-14" data-aos="fade-up">
          <div className="inline-flex items-center space-x-2 bg-[#8B0000]/25 border border-[#8B0000]/70 px-3 py-1 mb-2.5 rounded-xs">
            <Newspaper className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[#C5A059] font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
              {t('magazine.home_highlight_badge')}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight uppercase mb-2 leading-tight">
            {t('magazine.home_highlight_title')}
          </h2>

          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mb-3" />

          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light max-w-lg mx-auto">
            {t('magazine.home_highlight_desc')}
          </p>
        </div>


        {/* =========================================================
            MOBILE VIEW ONLY (< lg): ENLARGED CINEMATIC 3D COVER FLOW
           ========================================================= */}
        <div className="lg:hidden mb-10" data-aos="fade-up">
          <div
            className="relative bg-[#0d0d0d] border border-[#C5A059]/30 rounded-xl py-5 px-3 shadow-2xl overflow-hidden backdrop-blur-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between px-2 mb-3">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase truncate max-w-[70%]">
                {currentStory.category}
              </span>
              <span className="text-[10px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 border border-[#C5A059]/30 rounded-xs flex-shrink-0">
                {activeSlide + 1} / {stories.length}
              </span>
            </div>

            {/* Enlarged 3D Cover Flow Stage (h-80 sm:h-96 for larger, readable preview) */}
            <div className="relative h-80 sm:h-96 w-full flex items-center justify-center perspective-[1000px] overflow-hidden my-1">
              
              {/* Left Cover (Previous) */}
              <motion.div
                key={`prev-${prevIndex}`}
                onClick={handlePrev}
                className="absolute left-1 sm:left-4 w-40 sm:w-48 aspect-[3/4] z-10 cursor-pointer rounded-lg overflow-hidden border border-white/20 shadow-xl opacity-35 grayscale contrast-125"
                initial={{ scale: 0.7, x: -35, rotateY: 25 }}
                animate={{ scale: 0.75, x: -25, rotateY: 20, opacity: 0.4 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={getPageSrc(stories[prevIndex].imagePage)}
                  alt={stories[prevIndex].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>

              {/* Center Active Cover (Enlarged w-52 sm:w-64 for prominent display) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`active-${currentStory.id}`}
                  className="relative w-52 sm:w-64 aspect-[3/4] z-30 rounded-lg overflow-hidden border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.4)] cursor-pointer"
                  initial={{ scale: 0.88, opacity: 0, y: 8 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <img
                    src={getPageSrc(currentStory.imagePage)}
                    alt={currentStory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-md px-2 py-0.5 border border-[#C5A059]/60 text-[9px] font-bold uppercase tracking-wider text-[#C5A059] rounded-xs">
                    Pág. {currentStory.page}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right Cover (Next) */}
              <motion.div
                key={`next-${nextIndex}`}
                onClick={handleNext}
                className="absolute right-1 sm:right-4 w-40 sm:w-48 aspect-[3/4] z-10 cursor-pointer rounded-lg overflow-hidden border border-white/20 shadow-xl opacity-35 grayscale contrast-125"
                initial={{ scale: 0.7, x: 35, rotateY: -25 }}
                animate={{ scale: 0.75, x: 25, rotateY: -20, opacity: 0.4 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={getPageSrc(stories[nextIndex].imagePage)}
                  alt={stories[nextIndex].title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>

            </div>

            {/* Mobile Story Info (Strict Single Line Title & Spoiler) */}
            <div className="mt-3 px-1 text-center space-y-1.5">
              {/* Single Line Title */}
              <h3 className="text-xs sm:text-sm font-serif font-bold text-white tracking-tight truncate w-full">
                {currentStory.title}
              </h3>

              {/* Single Line Spoiler */}
              <p className="text-[10px] sm:text-xs text-gray-300 font-sans italic truncate w-full max-w-xs mx-auto px-1">
                "{currentStory.spoiler}"
              </p>

              {/* Compact Mobile Action Buttons */}
              <div className="pt-1.5 flex items-center justify-center gap-1.5">
                <Link
                  to={`/magazine?page=${currentStory.page}`}
                  className="px-2.5 py-1 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-[10px] uppercase tracking-wider border border-[#C5A059] rounded-xs transition-all shadow-xs flex items-center space-x-1 whitespace-nowrap"
                >
                  <span>{t('magazine.read_full_article').replace('{page}', String(currentStory.page))}</span>
                </Link>

                {/* Multilingual Share Button (Partilhar / Partager / Share) */}
                <ShareButton
                  title={currentStory.title}
                  text={currentStory.spoiler}
                  url={`/magazine/page/${currentStory.page}`}
                  image={getPageSrc(currentStory.imagePage)}
                />
              </div>
            </div>

            {/* Super Thin Progress Line */}
            <div className="mt-4 w-full bg-white/10 h-0.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all duration-300 ease-out"
                style={{ width: `${((activeSlide + 1) / stories.length) * 100}%` }}
              />
            </div>
          </div>
        </div>


        {/* =========================================================
            DESKTOP VIEW ONLY (lg+): ENLARGED DISPLAY WITH SINGLE LINE CONTROLS
           ========================================================= */}
        {currentStory && (
          <div
            className="hidden lg:block mb-16 bg-[#0c0c0c] border border-[#C5A059]/35 rounded-xl p-8 xl:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-aos="fade-up"
          >
            <div className="grid grid-cols-12 gap-8 xl:gap-12 items-center">
              
              {/* Left Column: Enlarged Magazine Page Image Preview */}
              <div className="col-span-5 xl:col-span-5 flex justify-center">
                <div className="relative group w-full max-w-md">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#8B0000] via-[#C5A059] to-[#8B0000] rounded-xl opacity-60 group-hover:opacity-100 transition duration-700 blur-sm" />
                  <div className="relative bg-black rounded-lg overflow-hidden border border-[#C5A059]/60 shadow-2xl aspect-[3/4]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentStory.id}
                        src={getPageSrc(currentStory.imagePage)}
                        alt={currentStory.title}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.04 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-3 py-1 border border-[#C5A059]/60 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] rounded-xs">
                      Pág. {currentStory.page}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Details & Single-Line Formatting */}
              <div className="col-span-7 xl:col-span-7 space-y-4">
                
                {/* Meta Category Tag & Date */}
                <div className="flex items-center space-x-3 text-xs">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-[#8B0000]/40 border border-[#8B0000] text-[#C5A059] font-bold uppercase tracking-widest rounded-xs text-[10px]">
                    <Tag className="w-3 h-3 mr-1 text-[#C5A059]" />
                    {currentStory.category}
                  </span>
                  <span className="flex items-center text-gray-400 font-serif italic text-xs">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-[#C5A059]" />
                    {currentStory.date}
                  </span>
                </div>

                {/* Single-Line Article Title */}
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={`title-${currentStory.id}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl xl:text-2xl font-serif font-bold text-white tracking-tight truncate w-full"
                    title={currentStory.title}
                  >
                    {currentStory.title}
                  </motion.h3>
                </AnimatePresence>

                {/* Single-Line Teaser Description / Spoiler */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`spoiler-${currentStory.id}`}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="text-gray-300 text-xs xl:text-sm leading-snug font-sans italic truncate w-full border-l-2 border-[#C5A059] pl-3 py-1 bg-white/5 pr-2"
                    title={`"${currentStory.spoiler}"`}
                  >
                    "{currentStory.spoiler}"
                  </motion.p>
                </AnimatePresence>

                {/* Compact Refined Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-2.5">
                  <Link
                    to={`/magazine?page=${currentStory.page}`}
                    className="px-3 py-1.5 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-[11px] uppercase tracking-wider border border-[#C5A059] rounded-xs transition-all shadow-md flex items-center space-x-1.5 whitespace-nowrap"
                  >
                    <span>{t('magazine.read_full_article').replace('{page}', String(currentStory.page))}</span>
                  </Link>

                  <Link
                    to="/magazine"
                    className="px-3 py-1.5 bg-transparent hover:bg-white/10 border border-white/20 text-gray-300 font-bold text-[11px] uppercase tracking-wider rounded-xs transition-colors flex items-center space-x-1 whitespace-nowrap"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{t('magazine.explore_cta')}</span>
                  </Link>

                  {/* Multilingual Share Button (Partilhar / Partager / Share) */}
                  <ShareButton
                    title={currentStory.title}
                    text={currentStory.spoiler}
                    url={`/magazine/page/${currentStory.page}`}
                    image={getPageSrc(currentStory.imagePage)}
                  />
                </div>

                {/* Super Thin Golden Progress Bar & Controls */}
                <div className="pt-4 space-y-2 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>PROGRESSO DE LEITURA</span>
                    <span className="text-[#C5A059] font-bold">{activeSlide + 1} / {stories.length}</span>
                  </div>

                  {/* Super Thin Progress Line */}
                  <div className="w-full bg-white/10 h-0.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C5A059] to-amber-200 transition-all duration-300 ease-out"
                      style={{ width: `${((activeSlide + 1) / stories.length) * 100}%` }}
                    />
                  </div>

                  {/* Sleek Manual Arrows */}
                  <div className="flex items-center justify-end space-x-1.5 pt-1">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 bg-white/5 hover:bg-[#8B0000] border border-white/15 text-white rounded-xs transition-colors cursor-pointer"
                      aria-label="Previous Story"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 bg-white/5 hover:bg-[#8B0000] border border-white/15 text-white rounded-xs transition-colors cursor-pointer"
                      aria-label="Next Story"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 3. INTERACTIVE BACKLINK NEWS GRID (SECONDARY TOPICS) */}
        <div className="hidden lg:block space-y-6" data-aos="fade-up">
          <h3 className="text-lg font-serif font-bold text-white uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Notícias & Destaques da Revista</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {stories.slice(0, Math.floor(stories.length / 3) * 3).map((item) => (
              <div
                key={item.id}
                className="bg-black/60 border border-white/10 hover:border-[#C5A059]/60 rounded-lg transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg overflow-hidden"
              >
                {/* Featured Image Preview */}
                <Link to={`/magazine?page=${item.page}`} className="block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-[#111]">
                    <img
                      src={getPageSrc(item.imagePage)}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md px-2 py-0.5 border border-[#C5A059]/50 text-[9px] font-bold uppercase tracking-wider text-[#C5A059] rounded-xs">
                      Pág. {item.page}
                    </div>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="px-3 py-2.5 flex flex-col flex-1">
                  <div className="space-y-1 flex-1">
                    <span className="text-[#C5A059] font-bold uppercase tracking-wider text-[9px]">
                      {item.category}
                    </span>

                    <Link to={`/magazine?page=${item.page}`}>
                      <h4 className="font-serif font-bold text-xs text-white group-hover:text-[#C5A059] transition-colors leading-snug truncate">
                        {item.title}
                      </h4>
                    </Link>
                  </div>

                  {/* Multilingual Share Button (Partilhar / Partager / Share) */}
                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <Link
                      to={`/magazine?page=${item.page}`}
                      className="font-bold text-[#C5A059] group-hover:text-white transition-colors flex items-center space-x-1 text-[11px]"
                    >
                      <span>Abrir na Revista</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <ShareButton
                      variant="icon-only"
                      title={item.title}
                      text={item.spoiler}
                      url={`/magazine/page/${item.page}`}
                      image={getPageSrc(item.imagePage)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FOOTER DOWNLOAD BAR */}
        <div className="mt-12 bg-[#101010] border border-white/15 p-4 sm:p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A059] flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                Descarregar Revista Completa em PDF
              </h4>
              <p className="text-gray-400 text-[11px] font-sans">
                {t('magazine.select_edition')}
              </p>
            </div>
          </div>

          <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 justify-center sm:justify-start">
            <a
              href="/magazine/pdf/cena-magazine-fr.pdf"
              download="CENA_Magazine_FR.pdf"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 rounded-xs whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3 h-3" />
              <span>{t('magazine.french_edition')}</span>
            </a>
            <a
              href="/magazine/pdf/cena-magazine-pt.pdf"
              download="CENA_Magazine_PT.pdf"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 rounded-xs whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3 h-3" />
              <span>{t('magazine.portuguese_edition')}</span>
            </a>
            <a
              href="/magazine/pdf/cena-magazine-en.pdf"
              download="CENA_Magazine_EN.pdf"
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#8B0000] hover:bg-[#A00000] border border-[#C5A059] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 rounded-xs shadow-xs whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3 h-3 text-[#C5A059]" />
              <span>{t('magazine.english_edition')}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
