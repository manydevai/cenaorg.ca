import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [1, 42, 59, 93, 101, 114, 8, 28, 33, 43];
const SLIDE_INTERVAL = 4500;

const heroSrc = (idx: number) =>
    `/gallery/bcd-${String(HERO_IMAGES[idx]).padStart(3, '0')}.webp`;

export function FeaturedEventSection() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for parallax strategy
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Auto-slideshow
    const startSlideshow = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
        }, SLIDE_INTERVAL);
    }, []);

    useEffect(() => {
        startSlideshow();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [startSlideshow]);

    // Framer Motion scroll-based parallax for mobile
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        // start tracking when the top of the section hits the bottom of the viewport
        // stop when the bottom of the section hits the top of the viewport
        offset: ['start end', 'end start'],
    });
    const mobileY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden h-[400px] md:h-[600px] md:mx-16 lg:mx-24 md:w-auto"
        >
            {/* ═══════════════════════════════════════════
                BACKGROUND — Crossfade Slider
            ═══════════════════════════════════════════ */}
            <div
                className="absolute inset-0"
                style={!isMobile ? {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                } : undefined}
            >
                <AnimatePresence mode="sync">
                    {isMobile ? (
                        /* Mobile: Framer Motion transform-based parallax */
                        <motion.div
                            key={`mobile-${currentSlide}`}
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 1.5, ease: 'easeInOut' },
                                scale: { duration: (SLIDE_INTERVAL / 1000) + 1.5, ease: 'linear' },
                            }}
                            style={{ y: mobileY }}
                            className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
                        >
                            <img
                                src={heroSrc(currentSlide)}
                                alt={t('featured_event.title')}
                                className="w-full h-full object-cover brightness-75"
                                style={{ objectPosition: 'center 20%' }}
                                loading="lazy"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`desktop-${currentSlide}`}
                            initial={{ opacity: 0, scale: 1.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                opacity: { duration: 1.5, ease: 'easeInOut' },
                                scale: { duration: (SLIDE_INTERVAL / 1000) + 1.5, ease: 'linear' },
                            }}
                            className="absolute inset-0 brightness-75 bg-cover"
                            style={{
                                backgroundImage: `url(${heroSrc(currentSlide)})`,
                                backgroundAttachment: 'fixed',
                                backgroundPosition: 'center 20%',
                                backgroundSize: '100% auto',
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle overlay to guarantee text legibility */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            {/* ═══════════════════════════════════════════
                CONTENT — Compact Typography and CTA
            ═══════════════════════════════════════════ */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    {/* Date and Location line */}
                    <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
                        <div className="h-px w-8 md:w-12 bg-[#C5A059]" />
                        <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-sans font-bold">
                            {t('featured_event.date')}
                        </span>
                        <div className="h-px w-8 md:w-12 bg-[#C5A059]" />
                    </div>

                    {/* Main title */}
                    <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white tracking-widest leading-[1.1] max-w-4xl drop-shadow-xl uppercase mb-3">
                        {t('featured_event.title')}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm tracking-[0.15em] text-white/80 font-sans font-light italic max-w-2xl mb-6 drop-shadow-md">
                        {t('featured_event.subtitle')}
                    </p>

                    {/* CTA — CTA matching Team buttons */}
                    <Link
                        to="/gallery/black-consciousness-day"
                        className="inline-flex items-center gap-3 border border-white/20 hover:border-[#C5A059] hover:bg-[#C5A059]/10 px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase font-bold text-white transition-all duration-500 group drop-shadow-lg"
                    >
                        {t('featured_event.cta')}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Link>

                </motion.div>
            </div>
        </section>
    );
}
