import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const localTranslations = {
    fr: {
        title: "ÉVÉNEMENTS RÉCENTS",
        event1Title: "HÉRITAGE D'EXCELLENCE",
        event1Subtitle: "Les Noirs qui font l'histoire — Sommet annuel",
        event1Date: "28 Février 2026",
        event1Button: "Lire l'article",
        event2Title: "CONSCIENCE NOIRE",
        event2TitleLine2: "CENA | CAF",
        event2Subtitle: "Échos de l'Ancestralité — Identité angolaise",
        event2Date: "20 Février 2026",
        event2Button: "Lire l'article",
    },
    en: {
        title: "RECENT EVENTS",
        event1Title: "HERITAGE OF EXCELLENCE",
        event1Subtitle: "Black People Making History — Annual Summit",
        event1Date: "February 28, 2026",
        event1Button: "Read Article",
        event2Title: "BLACK CONSCIOUSNESS",
        event2TitleLine2: "CENA | CAF",
        event2Subtitle: "Echoes of Ancestry — Angolan Identity",
        event2Date: "February 20, 2026",
        event2Button: "Read Article",
    },
    pt: {
        title: "EVENTOS RECENTES",
        event1Title: "HERANÇA DE EXCELÊNCIA",
        event1Subtitle: "Os Negros que fazem História — Cimeira anual",
        event1Date: "28 de Fevereiro 2026",
        event1Button: "Ler Artigo",
        event2Title: "CONSCIÊNCIA NEGRA",
        event2TitleLine2: "CENA | CAF",
        event2Subtitle: "Ecos da Ancestralidade — Identidade angolana",
        event2Date: "20 de Fevereiro 2026",
        event2Button: "Ler Artigo",
    }
};

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full text-xl">✕</div>
            </button>
            <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={src}
                alt=""
                className="max-w-full max-h-full object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </motion.div>
    );
}

export function RecentEventsLinkSection() {
    const { language } = useLanguage();
    const t = localTranslations[language as keyof typeof localTranslations] || localTranslations.en;
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    return (
        <section className="bg-black py-24 md:py-32 px-6 border-t border-white/5 relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[#C5A059] to-transparent opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-6xl mx-auto z-10 relative"
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-8 md:w-16 bg-[#C5A059]" />
                    <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#C5A059] font-bold">
                        Archives
                    </span>
                    <div className="h-px w-8 md:w-16 bg-[#C5A059]" />
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-white tracking-widest leading-[1.1] uppercase mb-16 drop-shadow-xl text-center">
                    {t.title}
                </h2>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* Event 1 — Heritage of Excellence */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0 }}
                        className="group relative overflow-hidden aspect-[16/10] md:aspect-[16/9] border border-white/10"
                    >
                        <Link
                            to="/events/black-consciousness-day"
                            className="absolute inset-0 z-10 block"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="/gallery/heritage-excellence-leaders.webp"
                                    alt={t.event1Title}
                                    className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-1000"
                                    style={{ objectPosition: 'center 30%' }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">
                                    {t.event1Date}
                                </span>
                                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl uppercase tracking-widest text-white mb-2 group-hover:text-[#C5A059] transition-colors duration-500 leading-tight">
                                    {t.event1Title}
                                </h3>
                                <p className="font-serif italic text-base md:text-lg text-white/50 mb-8 max-w-sm group-hover:text-white/70 transition-colors">
                                    {t.event1Subtitle}
                                </p>
                                <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-bold border-b border-[#C5A059]/0 group-hover:border-[#C5A059]/100 pb-1 transition-all duration-500 w-fit">
                                    {t.event1Button} <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Event 2 — Consciência Negra CENA-CAF */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="group relative overflow-hidden aspect-[16/10] md:aspect-[16/9] border border-white/10"
                    >
                        <Link
                            to="/events/consciencia-negra-cena-caf"
                            className="absolute inset-0 z-10 block"
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src="/gallery/Mes-da-consciencianegra-cena-caf/cultura-africana.webp"
                                    alt={t.event2Title}
                                    className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-1000"
                                    style={{ objectPosition: 'center 35%' }}
                                />
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-bold mb-4 block opacity-80 group-hover:opacity-100 transition-opacity">
                                    {t.event2Date}
                                </span>
                                <div className="space-y-1 mb-2">
                                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl uppercase tracking-widest text-white group-hover:text-[#C5A059] transition-colors duration-500 leading-none">
                                        {t.event2Title}
                                    </h3>
                                    <h4 className="font-serif text-lg md:text-xl uppercase tracking-widest text-[#C5A059]/80 group-hover:text-[#C5A059] transition-colors duration-500">
                                        {t.event2TitleLine2}
                                    </h4>
                                </div>
                                <p className="font-serif italic text-base md:text-lg text-white/50 mb-8 max-w-sm group-hover:text-white/70 transition-colors">
                                    {t.event2Subtitle}
                                </p>
                                <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-bold border-b border-[#C5A059]/0 group-hover:border-[#C5A059]/100 pb-1 transition-all duration-500 w-fit">
                                    {t.event2Button} <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <AnimatePresence>
                {lightboxImage && (
                    <Lightbox 
                        src={lightboxImage} 
                        onClose={() => setLightboxImage(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
