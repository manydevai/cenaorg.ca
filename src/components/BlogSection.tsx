import { useState } from 'react';
import { Loader2, Check, ArrowRight, User, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import newPartnershipsImage from '../assets/sections/educational-partnerships.jpg';
import networkingEveningImage from '../assets/sections/networking-evening.jpg';
import { Button } from './ui/button';

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
      date: 'Dec 15, 2025',
      image: 'https://images.unsplash.com/photo-1709715357519-2a84f9765e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXJzaGlwJTIwYnVzaW5lc3MlMjBzdGFydHVwfGVufDF8fHx8MTc2NTE0MzA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      id: "01"
    },
    {
      titleKey: 'blog.article2_title',
      descriptionKey: 'blog.article2_excerpt',
      authorKey: 'blog.article2_author',
      categoryKey: 'blog.article2_category',
      date: 'Dec 05, 2025',
      image: networkingEveningImage,
      id: "02"
    },
    {
      titleKey: 'blog.article3_title',
      descriptionKey: 'blog.article3_excerpt',
      authorKey: 'blog.article3_author',
      categoryKey: 'blog.article3_category',
      date: 'Nov 20, 2025',
      image: newPartnershipsImage,
      id: "03"
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
    <section id="blog" className="py-24 sm:py-32 bg-[#FBFBFB] overflow-hidden">
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
            <div key={index} className="group py-12 lg:py-20 border-b border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center hover:bg-white transition-all duration-700 px-0 hover:px-8">
              <div className="lg:col-span-1">
                <span className="text-5xl font-serif text-gray-100 group-hover:text-[#C5A059] transition-colors duration-700">{article.id}</span>
              </div>

              <div className="lg:col-span-3">
                <div className="relative aspect-video lg:aspect-square overflow-hidden border border-gray-100 p-2 bg-white">
                  <img
                    src={article.image}
                    alt={t(article.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center space-x-6 text-[10px] tracking-widest uppercase font-bold text-gray-400">
                  <span className="text-[#8B0000]">{t(article.categoryKey)}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#121212] group-hover:text-[#8B0000] transition-colors">{t(article.titleKey)}</h3>
                <p className="text-gray-500 font-sans leading-loose text-sm line-clamp-2">
                  {t(article.descriptionKey)}
                </p>
              </div>

              <div className="lg:col-span-2 lg:text-right">
                <Button variant="ghost" className="p-0 h-auto text-[10px] tracking-[0.3em] font-bold uppercase text-[#121212] group-hover:text-[#8B0000] transition-all">
                  {t('blog.read_entry')} <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </Button>
              </div>
            </div>
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
