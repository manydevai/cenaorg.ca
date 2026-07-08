import { useState } from 'react';
import { Loader2, Check, ArrowRight, Camera, User, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export function BlogSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const articles = [
    {
      titleKey: 'blog.article1_title',
      descriptionKey: 'blog.article1_excerpt',
      authorKey: 'blog.article1_author',
      categoryKey: 'blog.article1_category',
      date: 'Feb 28, 2026',
      image: '/gallery/heritage-excellence-leaders.webp',
      id: "01",
      anchor: "heritage-excellence"
    },
    {
      titleKey: 'blog.article2_title',
      descriptionKey: 'blog.article2_excerpt',
      authorKey: 'blog.article2_author',
      categoryKey: 'blog.article2_category',
      date: 'Feb 20, 2026',
      image: '/gallery/Mes-da-consciencianegra-cena-caf/cultura-africana.webp',
      id: "02",
      anchor: "black-consciousness"
    },
    {
      titleKey: 'blog.article3_title',
      descriptionKey: 'blog.article3_excerpt',
      authorKey: 'blog.article3_author',
      categoryKey: 'blog.article3_category',
      date: 'Jan 2026',
      image: '/gallery/cena-incubadora.jpg',
      id: "03",
      anchor: "cena-incubator"
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      // Logic from original component preserved
      const ACCOUNT_ID = "2034564";
      const FORM_ID = "176455234991687628";
      const ENDPOINT = `https://assets.mailerlite.com/jsonp/${ACCOUNT_ID}/forms/${FORM_ID}/subscribe`;
      const formData = new FormData();
      formData.append('fields[email]', email);
      formData.append('ml-submit', '1');
      await fetch(ENDPOINT, { method: 'POST', body: formData });
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      setIsSuccess(true); // Fallback as in original
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog-section" className="py-24 sm:py-32 bg-[#FBFBFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
          <div className="lg:col-span-8">
            <span className="inline-block text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
              {t('blog.badge')}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif text-[#121212] leading-tight tracking-tight">
              {t('blog.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right border-l lg:border-l-0 lg:border-r border-gray-200 lg:pr-12 pl-12 lg:pl-0">
            <p className="text-gray-400 text-sm italic leading-relaxed">
              {t('blog.description')}
            </p>
          </div>
        </div>

        {/* Editorial Feed */}
        <div className="space-y-0 border-t border-gray-200">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              to={`/blog#${article.anchor}`}
              className="group py-12 lg:py-20 border-b border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 items-center hover:bg-white transition-all duration-700 px-0 hover:px-8 block"
            >
              {/* 01. ID — Top on mobile, Left on desktop */}
              <div className="lg:col-span-1 order-1 flex justify-center lg:justify-start">
                <span className="text-5xl font-serif text-gray-100 group-hover:text-[#C5A059] transition-colors duration-700">{article.id}</span>
              </div>

              {/* 03. Title & Meta — Top of pictures on mobile, Right-center on desktop */}
              <div className="lg:col-span-6 order-3 lg:order-3 space-y-4 px-4 lg:px-0 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-[10px] tracking-widest uppercase font-bold text-gray-400">
                  <span className="text-[#8B0000]">{t(article.categoryKey)}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#121212] group-hover:text-[#8B0000] transition-colors leading-[1.2]">
                  {t(article.titleKey)}
                </h3>
              </div>

              {/* 04. Featured Image — Below title on mobile, Left-center on desktop */}
              <div className="lg:col-span-3 order-4 lg:order-2 px-4 lg:px-0">
                <div className="relative aspect-video lg:aspect-square overflow-hidden border border-gray-100 p-2 bg-white">
                  <img
                    src={article.image}
                    alt={t(article.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                </div>
              </div>

              {/* 05. Excerpt — Below image on mobile, part of content column on desktop */}
              <div className="lg:col-span-6 lg:col-start-5 order-5 lg:order-3 px-4 lg:px-0 -mt-4 lg:mt-0 text-center lg:text-left">
                <p className="text-gray-400 font-sans leading-loose text-xs sm:text-sm line-clamp-3 lg:line-clamp-2 italic">
                  {t(article.descriptionKey)}
                </p>
              </div>

              {/* 06. Read Button — Bottom on mobile, Right on desktop */}
              <div className="lg:col-span-2 order-6 lg:order-4 lg:text-right flex justify-center lg:justify-end px-4 lg:px-0">
                <span className="inline-flex items-center text-[10px] tracking-[0.3em] font-bold uppercase text-[#121212] group-hover:text-[#8B0000] transition-all">
                  {t('blog.read_entry')} <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter: Architectural Dark Bar */}
        <div className="mt-32 p-12 lg:p-24 bg-[#121212] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/3 h-full border-r border-[#C5A059]/20 translate-x-12"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-3xl lg:text-4xl font-serif text-white mb-6 uppercase tracking-tight">{t('blog.newsletter_title')}</h3>
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
              <p className="mt-6 text-[8px] tracking-[0.4em] uppercase font-bold text-gray-700">{isSuccess ? t('blog.subscription_active') : t('blog.intel_distribution')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
