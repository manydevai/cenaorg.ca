import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, ArrowRight, Camera, MoveRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { useLocation } from 'react-router-dom';

// Image imports

interface ArticleItem {
  id: string;
  anchor: string;
  titleKey: string;
  subtitleKey: string;
  excerptKey: string;
  authorKey: string;
  categoryKey: string;
  dateKey: string;
  image: string;
}

// Lightbox modal component (reused logic)
function Lightbox({ 
    src, 
    onClose 
}: { 
    src: string; 
    onClose: () => void;
}) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

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
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full">
                    ✕
                </div>
            </motion.button>

            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={src}
                    alt=""
                    className="max-w-[90vw] max-h-[80vh] object-contain shadow-2xl"
                />
            </div>
        </motion.div>
    );
}

export function BlogPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const articles: ArticleItem[] = [
    {
      id: "01",
      anchor: "heritage-excellence",
      titleKey: 'blog.article1_title',
      subtitleKey: 'blog.article1_subtitle',
      excerptKey: 'blog.article1_excerpt',
      authorKey: 'blog.article1_author',
      categoryKey: 'blog.article1_category',
      dateKey: 'blog.article1_date',
      image: '/gallery/heritage-excellence-leaders.webp'
    },
    {
      id: "02",
      anchor: "black-consciousness",
      titleKey: 'blog.article2_title',
      subtitleKey: 'blog.article2_subtitle',
      excerptKey: 'blog.article2_excerpt',
      authorKey: 'blog.article2_author',
      categoryKey: 'blog.article2_category',
      dateKey: 'blog.article2_date',
      image: '/gallery/Mes-da-consciencianegra-cena-caf/cultura-africana.webp'
    },
    {
      id: "03",
      anchor: "cena-incubator",
      titleKey: 'blog.article3_title',
      subtitleKey: 'blog.article3_subtitle',
      excerptKey: 'blog.article3_excerpt',
      authorKey: 'blog.article3_author',
      categoryKey: 'blog.article3_category',
      dateKey: 'blog.article3_date',
      image: '/gallery/cena-incubadora.jpg'
    }
  ];

  useEffect(() => {
    // SEO Enhancement
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Explore the CENA Incubator impact and stories of Lusophone entrepreneurship in Canada. Perspetivas & Insights from the Angolan diaspora.');

    // Handle deep linking from home page
    if (location.hash) {
      const anchor = location.hash.replace('#', '');
      const article = articles.find(a => a.anchor === anchor);
      if (article) {
        // Expand the article
        setExpandedArticle(article.id);
        
        // Scroll to it after a short delay to allow rendering if needed
        setTimeout(() => {
          const element = document.getElementById(anchor);
          if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
          }
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simple mock success for now as per project pattern
    setTimeout(() => {
      setIsSuccess(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-100 pb-16"
          >
            <div className="mb-4">
              <span className="text-[10px] tracking-[0.6em] uppercase font-sans font-bold text-gray-400">BLOG</span>
            </div>
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('blog.badge')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#121212] leading-tight tracking-tight mb-8">
              {t('blog.title')}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-light italic max-w-2xl">
              {t('blog.description')}
            </p>
          </motion.div>
        </section>

        {/* Article Feed */}
        <section className="px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="space-y-0">
            {articles.map((article, index) => (
              <motion.div 
                key={article.id} 
                id={article.anchor}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group py-12 lg:py-20 border-b border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hover:bg-[#FBFBFB] transition-all duration-700 -mx-6 px-6 sm:-mx-12 sm:px-12 lg:-mx-16 lg:px-16"
              >
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-5xl font-serif text-gray-100 group-hover:text-[#C5A059] transition-colors duration-700">
                    {article.id}
                  </span>
                </div>

                {/* Image */}
                <div className="lg:col-span-3">
                  <a 
                    href={article.image}
                    className="block relative aspect-[4/3] overflow-hidden border border-gray-100 p-2 bg-white cursor-zoom-in group/img"
                    onClick={(e) => {
                        e.preventDefault();
                        setLightboxImage(article.image);
                    }}
                  >
                    <img
                      src={article.image}
                      alt={t(article.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-3 h-3 text-[#C5A059]" />
                    </div>
                  </a>
                </div>

                {/* Content */}
                <div 
                  className="lg:col-span-6 space-y-4 cursor-pointer group/content"
                  onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                >
                  <div className="flex flex-wrap items-center gap-6 text-[10px] tracking-widest uppercase font-bold text-gray-400">
                    <span className="text-[#8B0000]">{t(article.categoryKey)}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{t(article.dateKey)}</span>
                  </div>
                  
                  <div className="group/title">
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#121212] group-hover/content:text-[#8B0000] transition-colors leading-tight">
                        {t(article.titleKey)}
                    </h2>
                    {article.subtitleKey && (
                        <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase mt-2 font-bold">
                            {t(article.subtitleKey)}
                        </p>
                    )}
                    <div className="mt-4 flex items-center gap-3">
                        <div className="h-px w-6 bg-gray-200" />
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400 italic">
                            {t(article.authorKey)}
                        </span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {expandedArticle === article.id ? (
                      <motion.div
                        key="expanded"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="text-gray-600 font-sans leading-relaxed text-base pt-6 border-t border-gray-100 mt-6 whitespace-pre-wrap">
                          {t(article.excerptKey)}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative"
                      >
                        <p className="text-gray-500 font-sans leading-relaxed text-sm line-clamp-3 group-hover/content:text-gray-800 transition-colors">
                          {t(article.excerptKey)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4 flex items-center">
                    <span className="inline-flex items-center text-[10px] tracking-[0.3em] font-bold uppercase text-[#121212] group-hover/content:text-[#8B0000] transition-all">
                      {expandedArticle === article.id ? t('common.show_less') : (
                        <>
                          {t('blog.read_entry')} 
                          <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-500 group-hover/content:translate-x-2" />
                        </>
                      )} 
                    </span>
                  </div>
                </div>

                {/* Empty Action spacer for grid alignment */}
                <div className="lg:col-span-2" />
              </motion.div>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="mt-32 p-12 lg:p-24 bg-[#121212] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/3 h-full border-r border-[#C5A059]/20 translate-x-12"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-xl text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 uppercase tracking-tight">
                  {t('blog.newsletter_title')}
                </h3>
                <p className="text-gray-400 text-sm italic leading-relaxed">
                  {t('blog.newsletter_description')}
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="w-full max-w-md">
                <div className="relative flex items-center border-b border-white/20 focus-within:border-[#C5A059] transition-all py-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('blog.email_placeholder')}
                    className="bg-transparent text-white w-full pr-12 focus:outline-none text-xs tracking-widest uppercase font-bold placeholder:text-gray-800"
                  />
                  <button type="submit" disabled={isLoading || isSuccess} className="text-[#C5A059] hover:text-white transition-colors">
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isSuccess ? <Check className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-6 text-[8px] tracking-[0.4em] uppercase font-bold text-gray-700">
                  {isSuccess ? t('blog.subscription_active') : t('blog.intel_distribution')}
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox 
            src={lightboxImage} 
            onClose={() => setLightboxImage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
