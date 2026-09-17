import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';
import { ShareButton } from '../components/ShareButton';
import { updateOpenGraphMeta } from '../utils/share';
import {
  BookOpen,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Sparkles,
  Grid,
  ArrowLeft,
  ChevronDown,
  Check
} from 'lucide-react';

export const TOTAL_PAGES = 40;

export type SupportedLanguage = 'fr' | 'pt' | 'en';

export const getMagazinePageSrc = (pageNum: number, lang: SupportedLanguage) => {
  const safeLang = ['fr', 'pt', 'en'].includes(lang) ? lang : 'fr';
  const safePage = Math.max(1, Math.min(TOTAL_PAGES, pageNum));
  return `/magazine/pages/${safeLang}/page-${safePage}.webp`;
};

export function MagazinePage() {
  const { t, language, setLanguage } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ pageId?: string }>();

  // Determine language: URL query param has highest priority, then context
  const urlLang = searchParams.get('lang') as SupportedLanguage;
  const activeLang: SupportedLanguage = ['fr', 'pt', 'en'].includes(urlLang)
    ? urlLang
    : (['fr', 'pt', 'en'].includes(language as SupportedLanguage) ? (language as SupportedLanguage) : 'fr');

  // Page state strictly normalized 1 to 40
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pStr = params.pageId || searchParams.get('page');
    if (pStr) {
      const p = parseInt(pStr, 10);
      if (!isNaN(p) && p >= 1 && p <= TOTAL_PAGES) return p;
    }
    return 1;
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showThumbnails, setShowThumbnails] = useState<boolean>(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState<boolean>(false);
  const downloadMenuRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Automatically centralize the magazine display table in the viewport upon entering
  useEffect(() => {
    // Prevent browser native scroll restoration from keeping user at the footer
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const centerReader = () => {
      if (!readerRef.current) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      const rect = readerRef.current.getBoundingClientRect();
      const headerOffset = 68; // Sticky navigation header height with clearance
      const windowHeight = window.innerHeight;
      const readerHeight = rect.height;

      let targetScrollY: number;

      // If the reader fits comfortably inside the viewport (under header)
      if (readerHeight + headerOffset < windowHeight) {
        const remainingSpace = windowHeight - (readerHeight + headerOffset);
        // Center the reader in the remaining vertical space
        targetScrollY = window.scrollY + rect.top - headerOffset - (remainingSpace / 2);
      } else {
        // Reader fills or is taller than viewport: position top control bar right beneath site header
        targetScrollY = window.scrollY + rect.top - headerOffset - 6;
      }

      // Safeguard: Ensure the title header is NEVER cut off or pushed behind the fixed site header
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxScrollBeforeTitleCutOff = window.scrollY + titleRect.top - headerOffset - 8;
        targetScrollY = Math.min(targetScrollY, maxScrollBeforeTitleCutOff);
      }

      window.scrollTo({
        top: Math.max(0, Math.round(targetScrollY)),
        behavior: 'instant'
      });
    };

    // Run immediately
    centerReader();

    // Re-run after layout calculations and image layout settling
    const t1 = setTimeout(centerReader, 40);
    const t2 = setTimeout(centerReader, 150);
    const t3 = setTimeout(centerReader, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Synchronize language state if URL parameter specified a different valid language
  useEffect(() => {
    if (urlLang && ['fr', 'pt', 'en'].includes(urlLang) && urlLang !== language) {
      setLanguage(urlLang);
    }
  }, [urlLang, language, setLanguage]);

  // Synchronize state with URL search param & path param changes (Back/Forward browser support)
  useEffect(() => {
    const pStr = params.pageId || searchParams.get('page');
    if (pStr) {
      const p = parseInt(pStr, 10);
      if (!isNaN(p) && p >= 1 && p <= TOTAL_PAGES && p !== currentPage) {
        setCurrentPage(p);
      }
    }
  }, [searchParams, params.pageId]);

  // Close download dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updatePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      setSearchParams(
        { lang: activeLang, page: String(newPage) },
        { replace: true }
      );
    }
  };

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setSearchParams(
      { lang: newLang, page: String(currentPage) },
      { replace: true }
    );
  };

  // Synchronize Open Graph tags with current page and active language
  useEffect(() => {
    const pageImage = getMagazinePageSrc(currentPage, activeLang);
    updateOpenGraphMeta({
      title: `CENA Magazine 2026 — Page ${currentPage}`,
      text: `Édition 2026 de la Revue CENA (${activeLang.toUpperCase()} - Page ${currentPage} de ${TOTAL_PAGES}).`,
      url: `/magazine?lang=${activeLang}&page=${currentPage}`,
      image: pageImage
    });
  }, [currentPage, activeLang]);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) {
      updatePage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      updatePage(currentPage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') {
      if (isFullscreen) setIsFullscreen(false);
      if (showThumbnails) setShowThumbnails(false);
      if (showDownloadMenu) setShowDownloadMenu(false);
    }
  };

  // Mobile touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diffX > minSwipeDistance) {
      // Swiped left -> Next
      handleNext();
    } else if (diffX < -minSwipeDistance) {
      // Swiped right -> Prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const pdfLinks: Record<SupportedLanguage, { url: string; filename: string; label: string }> = {
    fr: {
      url: '/magazine/pdf/cena-magazine-fr.pdf',
      filename: 'CENA_Magazine_FR.pdf',
      label: 'Français'
    },
    pt: {
      url: '/magazine/pdf/cena-magazine-pt.pdf',
      filename: 'CENA_Magazine_PT.pdf',
      label: 'Português'
    },
    en: {
      url: '/magazine/pdf/cena-magazine-en.pdf',
      filename: 'CENA_Magazine_EN.pdf',
      label: 'English'
    }
  };

  const currentPdf = pdfLinks[activeLang];

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans select-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Header />

      <main className="flex-grow pt-14 sm:pt-16 lg:pt-16 pb-6 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-start">
        {/* Top Breadcrumb & Return Row */}
        <div className="mb-1 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-[11px] sm:text-xs uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            {t('navigation.home')}
          </Link>

          <div className="flex items-center space-x-2">
            <ShareButton
              title={activeLang === 'fr' ? `Revue CENA 2026 — Page ${currentPage}` : activeLang === 'pt' ? `Revista CENA 2026 — Page ${currentPage}` : `CENA Magazine 2026 — Page ${currentPage}`}
              text={activeLang === 'fr' ? `Découvrez la page ${currentPage} de la Revue CENA 2026 (${activeLang.toUpperCase()})!` : `Découvrez la page ${currentPage} de la CENA Magazine 2026 (${activeLang.toUpperCase()})!`}
              url={`/magazine?lang=${activeLang}&page=${currentPage}`}
              image={getMagazinePageSrc(currentPage, activeLang)}
              label={activeLang === 'fr' ? 'Partager' : activeLang === 'pt' ? 'Partilhar' : 'Share'}
            />
          </div>
        </div>

        {/* Compact & Optimized Title Header */}
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-1.5 sm:mb-2">
          <div className="inline-flex items-center space-x-1.5 bg-[#8B0000]/25 border border-[#8B0000]/60 px-2 py-0.5 mb-1 rounded-xs">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C5A059]" />
            <span className="text-[#C5A059] text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
              {t('magazine.badge')}
            </span>
          </div>

          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-serif font-bold text-white tracking-wider uppercase leading-tight">
            {t('magazine.title')?.replace(/—|-/g, ' ').replace(/\s+/g, ' ')}
          </h1>
        </div>

        {/* Reader Container Block — Expanded Width & Height */}
        <div ref={readerRef} className="w-full max-w-6xl mx-auto flex flex-col">
          {/* Reader Control Bar — Sleek, Compact & Fully Responsive */}
          <div className="bg-[#121212] border border-[#C5A059]/30 rounded-t-xl py-2 px-3 sm:px-4 flex items-center justify-between gap-2 shadow-lg z-20">
            {/* Left: Page Counter */}
            <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#C5A059] whitespace-nowrap">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] flex-shrink-0" />
              <span>
                {t('magazine.page_indicator')
                  ? t('magazine.page_indicator')
                      .replace('{current}', String(currentPage))
                      .replace('{total}', String(TOTAL_PAGES))
                  : `PAGE ${currentPage} / ${TOTAL_PAGES}`}
              </span>
            </div>

            {/* Right: Controls (Language Selector, Download, Grid, Fullscreen) */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Compact Language Selector: [ FR | PT | EN ] */}
              <div className="inline-flex items-center bg-black/60 p-0.5 rounded border border-[#C5A059]/40">
                {(['fr', 'pt', 'en'] as SupportedLanguage[]).map((lang) => {
                  const isActive = activeLang === lang;
                  return (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all ${
                        isActive
                          ? 'bg-[#8B0000] text-white border border-[#C5A059] shadow-xs'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      title={`Édition ${lang.toUpperCase()}`}
                      aria-label={`Switch to ${lang.toUpperCase()} language`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {/* Unified Compact PDF Download Button with Dropdown */}
              <div className="relative" ref={downloadMenuRef}>
                <button
                  onClick={() => setShowDownloadMenu((prev) => !prev)}
                  className="px-2 sm:px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center space-x-1"
                  title="Télécharger PDF"
                  aria-label="Télécharger PDF"
                >
                  <Download className="w-3 h-3 text-[#C5A059]" />
                  <span className="hidden sm:inline">PDF</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                <AnimatePresence>
                  {showDownloadMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-1.5 w-44 bg-[#141414] border border-[#C5A059]/40 rounded-lg shadow-2xl py-1.5 z-50 backdrop-blur-lg"
                    >
                      <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-[#C5A059] font-bold border-b border-white/10 mb-1">
                        Download PDF
                      </div>
                      {(['fr', 'pt', 'en'] as SupportedLanguage[]).map((lang) => {
                        const item = pdfLinks[lang];
                        const isCurrent = activeLang === lang;
                        return (
                          <a
                            key={lang}
                            href={item.url}
                            download={item.filename}
                            onClick={() => setShowDownloadMenu(false)}
                            className={`px-3 py-1.5 text-xs flex items-center justify-between transition-colors ${
                              isCurrent
                                ? 'bg-[#8B0000]/40 text-white font-bold'
                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              <Download className="w-3 h-3 text-[#C5A059]" />
                              <span>{item.label}</span>
                            </span>
                            {isCurrent && <Check className="w-3 h-3 text-[#C5A059]" />}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Grid Thumbnails Toggle */}
              <button
                onClick={() => setShowThumbnails((prev) => !prev)}
                className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold border transition-colors flex items-center space-x-1 rounded ${
                  showThumbnails
                    ? 'bg-[#C5A059] text-black border-[#C5A059]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
                title="Miniatures des pages"
                aria-label="Toggle Grid View"
              >
                <Grid className="w-3 h-3" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setIsFullscreen((prev) => !prev)}
                className="p-1 sm:p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded transition-colors"
                title={t('magazine.zoom')}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Thumbnail Selector Drawer (Grid View) — Synchronized 1 to 40 */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#0e0e0e] border-x border-b border-[#C5A059]/30 p-3 max-h-56 sm:max-h-72 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 shadow-inner z-10"
              >
                {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      updatePage(num);
                      setShowThumbnails(false);
                    }}
                    className={`relative aspect-[3/4] border overflow-hidden rounded transition-all group ${
                      currentPage === num
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/60 scale-105 shadow-lg'
                        : 'border-white/10 hover:border-white/50 opacity-75 hover:opacity-100'
                    }`}
                    title={`Page ${num}`}
                  >
                    <img
                      src={getMagazinePageSrc(num, activeLang)}
                      alt={`Page ${num}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <span
                      className={`absolute bottom-0 inset-x-0 text-[9px] font-bold text-center py-0.5 ${
                        currentPage === num
                          ? 'bg-[#8B0000] text-white'
                          : 'bg-black/80 text-gray-300 group-hover:text-white'
                      }`}
                    >
                      {num}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Digital Reader Viewport — Centered, Responsive & Proportional */}
          <div
            className="relative bg-[#050505] border-x border-b border-[#C5A059]/30 rounded-b-xl h-[62vh] sm:h-[68vh] md:h-[73vh] lg:h-[77vh] xl:h-[80vh] min-h-[420px] max-h-[860px] flex items-center justify-center p-1 sm:p-3 md:p-4 shadow-2xl overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Nav Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`absolute left-1.5 sm:left-4 z-20 p-2 sm:p-3 rounded-full bg-black/75 border border-[#C5A059]/40 text-white backdrop-blur-md transition-all ${
                currentPage === 1
                  ? 'opacity-25 cursor-not-allowed'
                  : 'hover:bg-[#8B0000] hover:scale-110 shadow-lg'
              }`}
              aria-label="Previous Page"
              title="Page précédente"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-[#C5A059]" />
            </button>

            {/* Active Page Image Container — Fully Centered, No Scroll Required, Object-Contain */}
            <div className="w-full h-full flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentPage}-${activeLang}`}
                  src={getMagazinePageSrc(currentPage, activeLang)}
                  alt={`CENA Magazine Page ${currentPage}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded shadow-2xl border border-white/5 select-none"
                  draggable={false}
                />
              </AnimatePresence>
            </div>

            {/* Right Nav Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === TOTAL_PAGES}
              className={`absolute right-1.5 sm:right-4 z-20 p-2 sm:p-3 rounded-full bg-black/75 border border-[#C5A059]/40 text-white backdrop-blur-md transition-all ${
                currentPage === TOTAL_PAGES
                  ? 'opacity-25 cursor-not-allowed'
                  : 'hover:bg-[#8B0000] hover:scale-110 shadow-lg'
              }`}
              aria-label="Next Page"
              title="Page suivante"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-[#C5A059]" />
            </button>
          </div>
        </div>

        {/* Reader Footer Controls — Compact & Elegant Card */}
        <div className="mt-4 sm:mt-6 max-w-6xl mx-auto w-full bg-[#111111] border border-white/10 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
                {activeLang === 'fr' ? 'Revue CENA 2026' : activeLang === 'pt' ? 'Revista CENA 2026' : 'CENA Magazine 2026'} — {currentPdf.label}
              </h3>
              <p className="text-gray-400 text-[10px] sm:text-xs font-sans">
                {activeLang === 'fr'
                  ? 'Format PDF haute résolution disponible'
                  : activeLang === 'pt'
                  ? 'Formato PDF em alta resolução disponível'
                  : 'High resolution PDF format available'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={currentPdf.url}
              download={currentPdf.filename}
              className="px-3 py-1.5 bg-[#8B0000] hover:bg-[#A00000] border border-[#C5A059] text-white text-[11px] font-bold uppercase tracking-wider rounded transition-colors flex items-center space-x-1.5 shadow-sm"
              title={`Download ${currentPdf.label} PDF`}
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>PDF ({activeLang.toUpperCase()})</span>
            </a>
          </div>
        </div>
      </main>

      {/* Fullscreen Overlay Mode */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/98 backdrop-blur-md flex flex-col p-2 sm:p-4"
          >
            {/* Top Control Bar in Fullscreen */}
            <div className="flex items-center justify-between text-xs text-[#C5A059] font-bold tracking-widest uppercase mb-2 px-2">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4" />
                <span>
                  {t('magazine.page_indicator')
                    ? t('magazine.page_indicator')
                        .replace('{current}', String(currentPage))
                        .replace('{total}', String(TOTAL_PAGES))
                    : `PAGE ${currentPage} / ${TOTAL_PAGES}`}
                </span>
              </div>

              {/* Language Switcher in Fullscreen */}
              <div className="inline-flex items-center bg-black/60 p-0.5 rounded border border-[#C5A059]/40">
                {(['fr', 'pt', 'en'] as SupportedLanguage[]).map((lang) => {
                  const isActive = activeLang === lang;
                  return (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase rounded-xs transition-all ${
                        isActive
                          ? 'bg-[#8B0000] text-white border border-[#C5A059]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded text-xs uppercase"
              >
                ✕ Fermer
              </button>
            </div>

            {/* Fullscreen Image Stage */}
            <div className="flex-grow relative flex items-center justify-center overflow-hidden">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/80 border border-[#C5A059] text-[#C5A059] ${
                  currentPage === 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#8B0000] hover:text-white'
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <img
                src={getMagazinePageSrc(currentPage, activeLang)}
                alt={`Page ${currentPage}`}
                className="max-h-[88vh] max-w-full object-contain shadow-2xl select-none"
                draggable={false}
              />

              <button
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES}
                className={`absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/80 border border-[#C5A059] text-[#C5A059] ${
                  currentPage === TOTAL_PAGES ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#8B0000] hover:text-white'
                }`}
                aria-label="Next Page"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
