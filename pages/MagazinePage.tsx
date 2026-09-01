import { useState, useEffect } from 'react';
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
  ArrowLeft
} from 'lucide-react';

const TOTAL_PAGES = 40;

export function MagazinePage() {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ pageId?: string }>();
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

  // Sync state with URL search param & path param changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const pStr = params.pageId || searchParams.get('page');
    if (pStr) {
      const p = parseInt(pStr, 10);
      if (!isNaN(p) && p >= 1 && p <= TOTAL_PAGES) {
        setCurrentPage(p);
      }
    }
  }, [searchParams, params.pageId]);

  const updatePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= TOTAL_PAGES) {
      setCurrentPage(newPage);
      setSearchParams({ page: String(newPage) }, { replace: true });
    }
  };

  const PAGE_IMAGE_MAP: Record<number, string> = {
    1: '/magazine/pages/MAG_-_ENGLISH_VERSION.webp',  // Capa
    2: '/magazine/pages/MAG_-_ENGLISH_VERSION2.webp', // Índice / Sumário
    3: '/magazine/pages/MAG_-_ENGLISH_VERSION3.webp', // Mensagem de Boas-Vindas
    4: '/magazine/pages/MAG_-_ENGLISH_VERSION5.webp', // Apresentação & Filosofia CENA ("MORE THAN A NAME, A MISSION")
    
    // SEÇÃO 1: Membros Executivos da CENA em Ordem de Hierarquia
    5: '/magazine/pages/MAG_-_ENGLISH_VERSION11.webp',// 1. Cristina Indira MANUEL (Presidente CENA)
    6: '/magazine/pages/MAG_-_ENGLISH_VERSION10.webp',// 2. Marileny F. ANTONIO (Vice-Presidente CENA)
    7: '/magazine/pages/MAG_-_ENGLISH_VERSION9.webp', // 3. Sebastião Matano Sala (Diretor Financeiro)
    8: '/magazine/pages/MAG_-_ENGLISH_VERSION8.webp', // 4. Dulce Angelina FIGUEIREDO (Diretora RH)
    9: '/magazine/pages/MAG_-_ENGLISH_VERSION7.webp', // 5. Daniel Love Fernando ANTÓNIO (Diretor Juventude)
    10: '/magazine/pages/MAG_-_ENGLISH_VERSION30.webp',// 6. Randy Larochelle (Visão CENA)

    // SEÇÃO 2: Biografias Pessoais de Empreendedores (Candor's Cake em Posição Privilegiada no Topo!)
    11: '/magazine/pages/MAG_-_ENGLISH_VERSION19.webp',// Candor's Cake Parte 1 (Marileny F. Antonio - Pâtisserie)
    12: '/magazine/pages/MAG_-_ENGLISH_VERSION20.webp',// Candor's Cake Parte 2 (Galeria de Bolos & Citação)
    13: '/magazine/pages/MAG_-_ENGLISH_VERSION15.webp',// Samara ARCHANGE, MBA Parte 1
    14: '/magazine/pages/MAG_-_ENGLISH_VERSION16.webp',// Samara ARCHANGE, MBA Parte 2
    15: '/magazine/pages/MAG_-_ENGLISH_VERSION13.webp',// Magalie Sabine Jean-Louis (Imobiliário)
    16: '/magazine/pages/MAG_-_ENGLISH_VERSION14.webp',// Neccy LM (Liderança Feminina)
    17: '/magazine/pages/MAG_-_ENGLISH_VERSION32.webp',// Associação Menarca Muhatu (Divina Ndomateso Ntele)
    18: '/magazine/pages/MAG_-_ENGLISH_VERSION4.webp', // Mrs. Shirley DORISMOND (Membro da Assembleia Nacional - Fundo das Biografias)

    // SEÇÃO 3: Perfis Empresariais Isolados (Empresas) & Portfólio
    19: '/magazine/pages/MAG_-_ENGLISH_VERSION21.webp',// Essential Micro Hair Parte 1
    20: '/magazine/pages/MAG_-_ENGLISH_VERSION22.webp',// Essential Micro Hair Parte 2 (Galeria de Tranças)
    21: '/magazine/pages/MAG_-_ENGLISH_VERSION25.webp',// Zen Dans Ma Tête Parte 1
    22: '/magazine/pages/MAG_-_ENGLISH_VERSION26.webp',// Zen Dans Ma Tête Parte 2
    23: '/magazine/pages/MAG_-_ENGLISH_VERSION27.webp',// Randy Selection Parte 1 (Fotografia Profissional)
    24: '/magazine/pages/MAG_-_ENGLISH_VERSION28.webp',// Randy Selection Parte 2 (Portfólio de Fotografia)
    25: '/magazine/pages/MAG_-_ENGLISH_VERSION29.webp',// Randy Selection Portfólio (Retrato de Moda - Menina nas Grades)
    26: '/magazine/pages/MAG_-_ENGLISH_VERSION18.webp',// Val Nettoyage et Entretien
    27: '/magazine/pages/MAG_-_ENGLISH_VERSION31.webp',// Black Sable Group
    28: '/magazine/pages/MAG_-_ENGLISH_VERSION6.webp', // Groupe Multizone (Fundo dos Perfis Empresariais)

    // SEÇÃO 4: Eventos e Actividades no Final
    29: '/magazine/pages/MAG_-_ENGLISH_VERSION17.webp',// Anúncio DGA Commercial / Real Estate
    30: '/magazine/pages/MAG_-_ENGLISH_VERSION23.webp',// Gala & Eventos Comunitários
    31: '/magazine/pages/MAG_-_ENGLISH_VERSION24.webp',// Actividades CENA
    32: '/magazine/pages/MAG_-_ENGLISH_VERSION33.webp',// Celebração CENA
  };

  const getPageSrc = (pageNum: number) => {
    if (PAGE_IMAGE_MAP[pageNum]) {
      return PAGE_IMAGE_MAP[pageNum];
    }
    if (pageNum === 1) return '/magazine/pages/MAG_-_ENGLISH_VERSION.webp';
    return `/magazine/pages/MAG_-_ENGLISH_VERSION${pageNum}.webp`;
  };

  // Synchronize document Open Graph tags with the current magazine page image for WhatsApp previews
  useEffect(() => {
    const pageImage = getPageSrc(currentPage);
    updateOpenGraphMeta({
      title: `CENA Magazine 2026 — Página ${currentPage}`,
      text: `Descubra a edição 2026 da Revista CENA (Página ${currentPage} de ${TOTAL_PAGES}).`,
      url: `/magazine/page/${currentPage}`,
      image: pageImage
    });
  }, [currentPage]);

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
    if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
  };

  const pdfLinks = {
    fr: '/magazine/pdf/cena-magazine-fr.pdf',
    pt: '/magazine/pdf/cena-magazine-pt.pdf',
    en: '/magazine/pdf/cena-magazine-en.pdf',
  };

  const currentPdf = pdfLinks[language as keyof typeof pdfLinks] || pdfLinks.fr;

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans select-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Top Breadcrumb & Return */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center text-xs uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('navigation.home')}
          </Link>

          <div className="flex items-center space-x-3">
            <ShareButton
              title={`CENA Magazine 2026 — Página ${currentPage}`}
              text={`Confira a página ${currentPage} da Revista CENA Magazine 2026!`}
              url={`/magazine/page/${currentPage}`}
              image={getPageSrc(currentPage)}
              label="Partilhar"
            />
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#8B0000]/30 border border-[#8B0000] px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.25em]">
              {t('magazine.badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight uppercase mb-4 leading-tight">
            {t('magazine.title')}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
            {t('magazine.subtitle')}
          </p>
        </div>

        {/* Reader Control Bar */}
        <div className="bg-[#121212] border border-[#C5A059]/30 rounded-t-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          {/* Page Counter */}
          <div className="flex items-center space-x-3 text-xs font-bold tracking-widest uppercase text-[#C5A059]">
            <BookOpen className="w-4 h-4" />
            <span>
              {t('magazine.page_indicator')
                .replace('{current}', String(currentPage))
                .replace('{total}', String(TOTAL_PAGES))}
            </span>
          </div>

          {/* Quick Page Jump & Thumbnails Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowThumbnails((prev) => !prev)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-bold border transition-colors flex items-center space-x-1.5 rounded ${
                showThumbnails
                  ? 'bg-[#C5A059] text-black border-[#C5A059]'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 rounded transition-colors"
              title={t('magazine.zoom')}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Download PDF Buttons */}
          <div className="flex items-center space-x-2">
            <a
              href={pdfLinks.fr}
              download="CENA_Magazine_FR.pdf"
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-gray-200 transition-colors flex items-center space-x-1 rounded"
              title="Version Française (PDF)"
            >
              <Download className="w-3 h-3 text-[#C5A059]" />
              <span>FR</span>
            </a>
            <a
              href={pdfLinks.pt}
              download="CENA_Magazine_PT.pdf"
              className="px-2.5 py-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-gray-200 transition-colors flex items-center space-x-1 rounded"
              title="Versão Portuguesa (PDF)"
            >
              <Download className="w-3 h-3 text-[#C5A059]" />
              <span>PT</span>
            </a>
            <a
              href={pdfLinks.en}
              download="CENA_Magazine_EN.pdf"
              className="px-2.5 py-1.5 bg-[#8B0000] hover:bg-[#A00000] border border-[#C5A059] text-[11px] font-bold uppercase tracking-wider text-white transition-colors flex items-center space-x-1 rounded shadow-md"
              title="English Edition (PDF)"
            >
              <Download className="w-3 h-3 text-[#C5A059]" />
              <span>EN</span>
            </a>
          </div>
        </div>

        {/* Thumbnail Selector Drawer */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/90 border-x border-b border-[#C5A059]/30 p-4 max-h-64 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 shadow-inner"
            >
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    updatePage(num);
                    setShowThumbnails(false);
                  }}
                  className={`relative aspect-[3/4] border overflow-hidden rounded transition-all ${
                    currentPage === num
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-105'
                      : 'border-white/10 hover:border-white/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getPageSrc(num)}
                    alt={`Page ${num}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-center py-0.5 text-white">
                    {num}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Digital Reader Viewport */}
        <div className="relative bg-[#000000] border-x border-b border-[#C5A059]/30 min-h-[500px] sm:min-h-[700px] flex items-center justify-center p-2 sm:p-6 shadow-2xl overflow-hidden group">
          {/* Left / Right Click Nav Overlays */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/70 border border-[#C5A059]/50 text-white backdrop-blur-md transition-all ${
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-[#8B0000] hover:scale-110 shadow-lg'
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#C5A059]" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentPage === TOTAL_PAGES}
            className={`absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/70 border border-[#C5A059]/50 text-white backdrop-blur-md transition-all ${
              currentPage === TOTAL_PAGES
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-[#8B0000] hover:scale-110 shadow-lg'
            }`}
            aria-label="Next Page"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#C5A059]" />
          </button>

          {/* Active Page Image Display */}
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPage}
                src={getPageSrc(currentPage)}
                alt={`CENA Magazine Page ${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] w-auto object-contain rounded shadow-2xl border border-white/5"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Reader Footer Controls & PDF Download Bar */}
        <div className="mt-8 bg-[#121212] border border-white/15 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <FileText className="w-10 h-10 text-[#C5A059] flex-shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-lg text-white uppercase tracking-wider">
                {t('magazine.home_highlight_title')}
              </h3>
              <p className="text-gray-400 text-xs font-sans">
                {t('magazine.select_edition')}
              </p>
            </div>
          </div>

          <div className="flex flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <a
              href={pdfLinks.fr}
              download="CENA_Magazine_FR.pdf"
              className="px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 rounded whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('magazine.french_edition')}</span>
            </a>
            <a
              href={pdfLinks.pt}
              download="CENA_Magazine_PT.pdf"
              className="px-3 sm:px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-[#C5A059]/40 text-[#C5A059] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 rounded whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('magazine.portuguese_edition')}</span>
            </a>
            <a
              href={pdfLinks.en}
              download="CENA_Magazine_EN.pdf"
              className="px-3 sm:px-4 py-2.5 bg-[#8B0000] hover:bg-[#A00000] border border-[#C5A059] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-1.5 rounded shadow-lg whitespace-nowrap flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t('magazine.english_edition')}</span>
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
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-8"
          >
            <div className="flex items-center justify-between text-xs text-[#C5A059] font-bold tracking-widest uppercase mb-4">
              <span>
                {t('magazine.page_indicator')
                  .replace('{current}', String(currentPage))
                  .replace('{total}', String(TOTAL_PAGES))}
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded uppercase"
              >
                ✕ Close Fullscreen
              </button>
            </div>

            <div className="flex-grow relative flex items-center justify-center overflow-hidden">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="absolute left-4 z-20 p-4 bg-black/80 border border-[#C5A059] rounded-full text-[#C5A059]"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <img
                src={getPageSrc(currentPage)}
                alt={`Page ${currentPage}`}
                className="max-h-full max-w-full object-contain shadow-2xl"
              />

              <button
                onClick={handleNext}
                disabled={currentPage === TOTAL_PAGES}
                className="absolute right-4 z-20 p-4 bg-black/80 border border-[#C5A059] rounded-full text-[#C5A059]"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
