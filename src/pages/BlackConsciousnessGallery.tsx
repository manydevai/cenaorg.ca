import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Camera, MoveRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Album configurations
interface Album {
    id: string;
    titleKey: string;
    subtitleKey: string;
    dateKey: string;
    countKey: string;
    folder: string;
    heroImages: string[];
    count: number;
    prefix?: string;
    namingType: 'indexed' | 'named';
    namedFiles?: string[];
}

const ALBUMS: Album[] = [
    {
        id: 'heritage',
        titleKey: 'gallery_page.albums.heritage.title',
        subtitleKey: 'gallery_page.albums.heritage.subtitle',
        dateKey: 'gallery_page.albums.heritage.date',
        countKey: 'gallery_page.albums.heritage.count',
        folder: '/gallery/',
        heroImages: ['bcd-093.webp', 'bcd-042.webp', 'bcd-059.webp', 'bcd-001.webp', 'bcd-022.webp', 'bcd-114.webp', 'bcd-008.webp', 'bcd-028.webp', 'bcd-033.webp', 'bcd-043.webp'],
        count: 116,
        prefix: 'bcd-',
        namingType: 'indexed'
    },
    {
        id: 'consciousness',
        titleKey: 'gallery_page.albums.consciousness.title',
        subtitleKey: 'gallery_page.albums.consciousness.subtitle',
        dateKey: 'gallery_page.albums.consciousness.date',
        countKey: 'gallery_page.albums.consciousness.count',
        folder: '/gallery/Mes-da-consciencianegra-cena-caf/',
        heroImages: ['album2-001.webp', 'album2-004.webp', 'album2-007.webp', 'album2-009.webp', 'album2-012.webp'],
        count: 13,
        prefix: 'album2-',
        namingType: 'indexed'
    }
];

const SLIDE_INTERVAL = 4000;

// Puzzle layout pattern: artistic spanning for visual variety
const masonryPatterns = [
    { colSpan: 2, rowSpan: 2 }, // large
    { colSpan: 1, rowSpan: 2 }, // tall
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 2, rowSpan: 1 }, // wide
    { colSpan: 1, rowSpan: 2 }, // tall
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 1 }, // small
    { colSpan: 1, rowSpan: 2 }, // tall
    { colSpan: 1, rowSpan: 1 }, // small
];

const revealDirections = [
    { x: -50, y: 0 },
    { x: 0, y: 50 },
    { x: 50, y: 0 },
    { x: 0, y: -50 },
    { x: -35, y: 35 },
    { x: 35, y: -35 },
];

function getDirection(index: number) {
    return revealDirections[index % revealDirections.length];
}

function getPattern(index: number) {
    return masonryPatterns[index % masonryPatterns.length];
}

interface ImageItem {
    id: number | string;
    src: string;
}

// Lightbox modal component
function Lightbox({ 
    images, 
    index, 
    onClose, 
    onNext, 
    onPrev 
}: { 
    images: ImageItem[]; 
    index: number; 
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = 'unset';
        };
    }, [onClose, onNext, onPrev]);

    const currentImage = images[index];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
                onClick={onClose}
            >
                <span className="sr-only">Close</span>
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full">
                    ✕
                </div>
            </motion.button>

            <button
                className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/10 rounded-full group-hover:border-white/40 group-hover:-translate-x-1 transition-all">
                    <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            </button>

            <button
                className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-[110] p-4 group"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-white/10 rounded-full group-hover:border-white/40 group-hover:translate-x-1 transition-all">
                    <MoveRight className="w-6 h-6 md:w-8 md:h-8" />
                </div>
            </button>

            <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.img
                    key={currentImage.src}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: -20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    src={currentImage.src}
                    alt=""
                    className="max-w-[95vw] max-h-[85vh] object-contain shadow-2xl"
                />
                <div className="mt-8 text-center bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
                    <p className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-bold">
                        {index + 1} / {images.length}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function BlackConsciousnessGallery() {
    const { t } = useLanguage();
    const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const activeAlbum = ALBUMS[activeAlbumIndex];

    const generateImages = useCallback((album: Album): ImageItem[] => {
        if (album.namingType === 'indexed') {
            return Array.from({ length: album.count }, (_, i) => ({
                id: i + 1,
                src: `${album.folder}${album.prefix}${String(i + 1).padStart(3, '0')}.webp`,
            }));
        } else {
            return (album.namedFiles || []).map((file, i) => ({
                id: i,
                src: `${album.folder}${file}`,
            }));
        }
    }, []);

    const [allImages, setAllImages] = useState<ImageItem[]>(generateImages(ALBUMS[0]));

    // Hero slideshow
    const startSlideshow = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeAlbum.heroImages.length);
        }, SLIDE_INTERVAL);
    }, [activeAlbum.heroImages.length]);

    useEffect(() => {
        startSlideshow();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startSlideshow]);

    // Scroll to top on mount and album change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeAlbumIndex]);

    const handleNextAlbum = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            const nextIdx = (activeAlbumIndex + 1) % ALBUMS.length;
            setActiveAlbumIndex(nextIdx);
            setCurrentSlide(0);
            setAllImages(generateImages(ALBUMS[nextIdx]));
            setIsTransitioning(false);
        }, 600);
    };

    const heroSrc = (idx: number) => {
        const imageName = activeAlbum.heroImages[idx];
        return `${activeAlbum.folder}${imageName}`;
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeAlbum.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* ═══════════════════════════════════════════
                  HERO HEADER — Full-Viewport Cinematic Slider
                 ═══════════════════════════════════════════ */}
                    <section className="relative w-screen h-[100vh] overflow-hidden">
                        {/* Crossfade images with Ken Burns zoom */}
                        {(() => {
                            const isFirstSlideOfSecondAlbum = activeAlbum.id === 'consciousness' && currentSlide === 0;
                            const objectPos = isFirstSlideOfSecondAlbum ? 'center 15%' : 'center 30%';
                            const initialScale = isFirstSlideOfSecondAlbum ? 1.05 : 1.0;
                            const animateScale = isFirstSlideOfSecondAlbum ? 1.09 : 1.04;
                            const transOrigin = isFirstSlideOfSecondAlbum ? 'top center' : 'center 30%';

                            return (
                                <AnimatePresence mode="sync">
                                    <motion.div
                                        key={`${activeAlbum.id}-${currentSlide}`}
                                        initial={{ opacity: 0, scale: initialScale }}
                                        animate={{ opacity: 1, scale: animateScale }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            opacity: { duration: 1.5, ease: 'easeInOut' },
                                            scale: { duration: SLIDE_INTERVAL / 1000 + 1.5, ease: 'linear' },
                                        }}
                                        className="absolute inset-0"
                                        style={{ transformOrigin: transOrigin }}
                                    >
                                        <img
                                            src={heroSrc(currentSlide)}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            style={{ objectPosition: objectPos }}
                                            loading="eager"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            );
                        })()}

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                        {/* Breadcrumb & Navigation */}
                        <div className="absolute top-24 md:top-28 left-6 md:left-16 z-20 flex justify-between w-full pr-12 md:pr-32">
                            <a
                                href="/"
                                className="inline-flex items-center gap-2 text-white/60 hover:text-[#C5A059] transition-colors text-[11px] tracking-[0.2em] uppercase font-sans group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                {t('gallery_page.breadcrumb_home')}
                                <ChevronRight className="w-3 h-3 opacity-40" />
                                <span className="text-white/80">{t('gallery_page.breadcrumb_gallery')}</span>
                            </a>

                            <button
                                onClick={handleNextAlbum}
                                disabled={isTransitioning}
                                className="hidden md:flex items-center gap-4 text-white/80 hover:text-[#C5A059] transition-all group"
                            >
                                <span className="text-[10px] tracking-[0.4em] font-bold uppercase">
                                    {t('gallery_page.next_album')}
                                </span>
                                <div className="p-3 border border-white/20 rounded-full group-hover:border-[#C5A059] transition-colors">
                                    <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>
                        </div>

                        {/* Hero Title Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 z-10 px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                                className="text-center"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="inline-flex items-center gap-2 mb-6"
                                >
                                    <div className="h-px w-8 bg-[#C5A059]" />
                                    <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-sans font-medium">
                                        {t(activeAlbum.dateKey)}
                                    </span>
                                    <div className="h-px w-8 bg-[#C5A059]" />
                                </motion.div>

                                <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tight leading-[0.9] text-white mb-4 uppercase whitespace-pre-line">
                                    {t(activeAlbum.titleKey)}
                                </h1>

                                <p className="text-sm md:text-base tracking-[0.15em] text-white/60 font-sans font-light mt-4 max-w-2xl mx-auto italic">
                                    {t(activeAlbum.subtitleKey)}
                                </p>

                                <div className="flex items-center justify-center gap-3 mt-8">
                                    <Camera className="w-4 h-4 text-[#C5A059]" />
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-sans">
                                        {t(activeAlbum.countKey)}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Mobile Next Album Button */}
                            <button
                                onClick={handleNextAlbum}
                                disabled={isTransitioning}
                                className="md:hidden mt-12 flex items-center gap-3 text-white/60"
                            >
                                <span className="text-[9px] tracking-[0.3em] font-bold uppercase">{t('gallery_page.next_album')}</span>
                                <MoveRight className="w-4 h-4" />
                            </button>

                            {/* Slide indicators */}
                            <div className="flex gap-1.5 mt-8">
                                {activeAlbum.heroImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setCurrentSlide(idx);
                                            startSlideshow();
                                        }}
                                        className={`h-0.5 transition-all duration-500 ${idx === currentSlide
                                            ? 'w-8 bg-[#C5A059]'
                                            : 'w-3 bg-white/20 hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════
                  SEAMLESS PUZZLE GRID — Zero Gaps
                 ═══════════════════════════════════════════ */}
                    <section className="relative overflow-hidden bg-[#0a0a0a]">
                        <div className="text-center py-10 md:py-14">
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C5A059]/50" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-sans">
                                    {t('gallery_page.photo_credit')}
                                </span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C5A059]/50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-0 auto-rows-[140px] md:auto-rows-[200px] lg:auto-rows-[240px] overflow-hidden">
                            {allImages.map((image, index) => {
                                const pattern = getPattern(index);
                                const dir = getDirection(index);
                                const colSpanClass = pattern.colSpan === 2 ? 'md:col-span-2' : 'col-span-1';
                                const rowSpanClass = pattern.rowSpan === 2 ? 'md:row-span-2' : 'row-span-1';

                                return (
                                    <motion.div
                                        key={`${activeAlbum.id}-${image.id}`}
                                        initial={{ opacity: 0, x: dir.x * 0.4, y: dir.y * 0.4 }}
                                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{
                                            duration: 0.7,
                                            delay: (index % 12) * 0.05,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className={`${colSpanClass} ${rowSpanClass} relative group cursor-pointer overflow-hidden border border-white/5`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <Camera className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>

            {/* Footer Credits */}
            <footer className="px-6 md:px-16 py-16 border-t border-white/5 bg-[#0a0a0a] relative z-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <Camera className="w-4 h-4 text-[#C5A059]" />
                            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                                Credit
                            </span>
                        </div>
                        <p className="text-[12px] tracking-[0.1em] uppercase text-white/40 font-sans max-w-xs text-center md:text-left leading-relaxed">
                            {t('gallery_page.photo_credit')}
                        </p>
                    </div>

                    <button
                        onClick={handleNextAlbum}
                        className="group flex flex-col items-center md:items-end gap-6"
                    >
                        <span className="text-[9px] tracking-[0.6em] uppercase text-white/30 group-hover:text-[#C5A059] transition-colors">
                            Next Experience
                        </span>
                        <div className="flex items-center gap-6">
                            <span className="font-serif text-2xl md:text-4xl text-white group-hover:text-[#C5A059] transition-colors whitespace-pre-line text-center md:text-right leading-tight">
                                {t(ALBUMS[(activeAlbumIndex + 1) % ALBUMS.length].titleKey)}
                            </span>
                            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all">
                                <ChevronRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </button>
                </div>
            </footer>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <Lightbox 
                        images={allImages} 
                        index={selectedImageIndex} 
                        onClose={() => setSelectedImageIndex(null)}
                        onNext={() => setSelectedImageIndex((selectedImageIndex + 1) % allImages.length)}
                        onPrev={() => setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
