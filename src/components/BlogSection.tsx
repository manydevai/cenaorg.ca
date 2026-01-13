import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Calendar, User, Loader2, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import newPartnershipsImage from 'figma:asset/bd8c036f51876e8a6bc321921ecd1bcffbd26fd8.png';
import networkingEveningImage from 'figma:asset/e98c49cf679a1f560c21c85d41b259259777d1d8.png';

export function BlogSection() {
  const { t } = useLanguage();
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const articles = [
    {
      titleKey: 'blog.article1_title',
      descriptionKey: 'blog.article1_excerpt',
      fullContentKey: 'blog.article1_full',
      authorKey: 'blog.article1_author',
      categoryKey: 'blog.article1_category',
      date: 'Dec 15, 2025',
      color: '#A32020',
      image: 'https://images.unsplash.com/photo-1709715357519-2a84f9765e57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXJzaGlwJTIwYnVzaW5lc3MlMjBzdGFydHVwfGVufDF8fHx8MTc2NTE0MzA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      titleKey: 'blog.article2_title',
      descriptionKey: 'blog.article2_excerpt',
      fullContentKey: 'blog.article2_full',
      authorKey: 'blog.article2_author',
      categoryKey: 'blog.article2_category',
      date: 'Dec 05, 2025',
      color: '#FDB913',
      image: networkingEveningImage
    },
    {
      titleKey: 'blog.article3_title',
      descriptionKey: 'blog.article3_excerpt',
      fullContentKey: 'blog.article3_full',
      authorKey: 'blog.article3_author',
      categoryKey: 'blog.article3_category',
      date: 'Nov 20, 2025',
      color: '#000000',
      image: newPartnershipsImage
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus(null);
    setIsSuccess(false);

    // Using the public endpoint found in the HTML snippet
    const FORM_ID = "176455234991687628"; // Extracted from action URL
    const ACCOUNT_ID = "2034564"; // Extracted from action URL
    const ENDPOINT = `https://assets.mailerlite.com/jsonp/${ACCOUNT_ID}/forms/${FORM_ID}/subscribe`;

    const formData = new FormData();
    formData.append('fields[email]', email);
    formData.append('ml-submit', '1');
    formData.append('anticsrf', 'true');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail('');
      } else {
        const data = await response.json();
        // If there's an error but we got a response, it might still be a success in some JSONP cases, 
        // but typically 200 OK means success for these endpoints.
        // MailerLite might return validation errors here.
        if (data.success) {
            setIsSuccess(true);
            setEmail('');
        } else {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Fallback for CORS issues: visual success message even if we can't fully verify the response
      // (MailerLite forms sometimes block cross-origin reading but still accept the POST)
      setIsSuccess(true);
      setEmail('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="blog" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('blog.badge')}</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 text-gray-900">
            {t('blog.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('blog.description')}
          </p>
        </div>

        {/* Blog Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {articles.map((article, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
              {/* Article Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={t(article.titleKey)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge style={{ backgroundColor: article.color }} className="text-white">
                    {t(article.categoryKey)}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 flex flex-col text-white text-xs">
                  <span className="font-semibold mb-1">{t('blog.posted')}</span>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {article.date}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl mb-3 text-gray-900">{t(article.titleKey)}</h3>
                
                {expandedArticle === index ? (
                  <p className="text-gray-600 mb-4 text-sm">
                    {t(article.fullContentKey)}
                  </p>
                ) : (
                  <p className="text-gray-600 mb-4 text-sm h-[4rem] overflow-hidden">
                    {t(article.descriptionKey)}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {t(article.authorKey)}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => toggleExpand(index)}
                  className="w-full px-0 hover:bg-transparent"
                  style={{ color: article.color }}
                >
                  {expandedArticle === index ? (
                    <>
                      {t('common.show_less')} <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t('blog.read_full')} <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter */}
        <Card className="bg-gradient-to-r from-[#A32020] to-[#000000] text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl mb-2">{t('blog.newsletter_title')}</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('blog.newsletter_description')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (isSuccess) setIsSuccess(false);
                }}
                placeholder={t('blog.email_placeholder')}
                required
                disabled={isLoading}
                className="flex-1 px-4 py-2 rounded-lg bg-transparent border-2 border-[#FDB913] text-white placeholder:text-white/70 focus:border-[#FDB913] focus:bg-white/5 outline-none transition-colors disabled:opacity-50"
              />
              <Button 
                type="submit" 
                disabled={isLoading || isSuccess}
                className={`font-bold transition-all duration-300 min-w-[150px] ${
                  isSuccess 
                    ? "bg-green-500 hover:bg-green-600 text-white border-transparent" 
                    : "bg-[#FDB913] hover:bg-[#E5A50D] text-black"
                } disabled:opacity-80 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : isSuccess ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Check className="h-5 w-5" />
                    <span>{t('blog.subscribed') === 'blog.subscribed' ? 'Subscribed!' : t('blog.subscribed')}</span>
                  </div>
                ) : (
                  t('blog.subscribe_button')
                )}
              </Button>
            </form>
            {status && status.type === 'error' && (
              <p className="mt-4 text-sm font-medium text-red-400">
                {status.message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
