import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Quote, Calendar, User, ChevronDown, ChevronUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import africaEducationImg from 'figma:asset/394031ef422e46ed0ebf9f947855b02d81f05355.png';
import schoolPartnershipImg from 'figma:asset/3bca116aac05c5359e2ce73e84ab4c14dedc64f1.png';
import culturalFestivalNewsImg from 'figma:asset/b7a470e41e2449933b30ffa4e761fceb5d23f9f1.png';
import testimonial1Image from 'figma:asset/4c2e3d1bc195f9ecc6d79b1df2639e8b961bd16e.png';
import testimonial2Image from 'figma:asset/5d3e4f2cd2a6g0fdd7e80c2ef3740f9c072ce27f.png';
import testimonial3Image from 'figma:asset/6e4f5g3de3b7h1gee8f91d3fg4851g0d183df38g.png';
import testimonial4Image from 'figma:asset/7f5g6h4ef4c8i2hff9g02e4gh5962h1e294eg49h.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function NewsSection() {
  const { t } = useLanguage();
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);

  const toggleArticle = (index: number) => {
    setExpandedArticles(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  const newsArticles = [
    {
      date: '2025-03-10',
      titleKey: 'news.article1_title',
      excerptKey: 'news.article1_excerpt',
      fullContentKey: 'news.article1_full_content',
      image: africaEducationImg,
      categoryKey: 'news.article1_category',
      authorKey: 'news.article1_author',
      readTimeKey: 'news.article1_read_time'
    },
    {
      date: '2024-09-15',
      titleKey: 'news.article2_title',
      excerptKey: 'news.article2_excerpt',
      fullContentKey: 'news.article2_full_content',
      image: schoolPartnershipImg,
      categoryKey: 'news.article2_category',
      authorKey: 'news.article2_author',
      readTimeKey: 'news.article2_read_time'
    },
    {
      date: '2025-02-28',
      titleKey: 'news.article3_title',
      excerptKey: 'news.article3_excerpt',
      fullContentKey: 'news.article3_full_content',
      image: culturalFestivalNewsImg,
      categoryKey: 'news.article3_category',
      authorKey: 'news.article3_author',
      readTimeKey: 'news.article3_read_time'
    }
  ];

  const testimonials = [
    {
      nameKey: 'news.testimonial1_name',
      roleKey: 'news.testimonial1_role',
      quoteKey: 'news.testimonial1_quote',
      image: testimonial1Image
    },
    {
      nameKey: 'news.testimonial2_name',
      roleKey: 'news.testimonial2_role',
      quoteKey: 'news.testimonial2_quote',
      image: testimonial2Image
    },
    {
      nameKey: 'news.testimonial3_name',
      roleKey: 'news.testimonial3_role',
      quoteKey: 'news.testimonial3_quote',
      image: testimonial3Image
    },
    {
      nameKey: 'news.testimonial4_name',
      roleKey: 'news.testimonial4_role',
      quoteKey: 'news.testimonial4_quote',
      image: testimonial4Image
    }
  ];

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-[#A32020] text-white mb-4">{t('news.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl mb-6 text-gray-900">
            {t('news.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        {/* Latest News */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => {
              const isExpanded = expandedArticles.includes(index);
              return (
                <Collapsible key={index} open={isExpanded} onOpenChange={() => toggleArticle(index)}>
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback 
                        src={article.image}
                        alt={t(article.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className={`${
                          article.categoryKey === 'news.article1_category' ? 'bg-[#A32020]' :
                          article.categoryKey === 'news.article2_category' ? 'bg-[#FDB913] text-black' : 'bg-[#000000]'
                        } text-white`}>
                          {t(article.categoryKey)}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(article.date)}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {t(article.authorKey)}
                        </div>
                      </div>
                      <h3 className="text-lg mb-3 text-gray-900 line-clamp-2">
                        {t(article.titleKey)}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {t(article.excerptKey)}
                      </p>
                      
                      <CollapsibleContent className="mb-4">
                        <div className="pt-4 border-t border-gray-200 text-gray-600 text-sm space-y-3">
                          {t(article.fullContentKey)}
                        </div>
                      </CollapsibleContent>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{t(article.readTimeKey)}</span>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" className="text-[#A32020] hover:text-[#8B1B1B] p-0">
                            {isExpanded ? t('common.show_less') : t('common.read_more')} 
                            {isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </CardContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl p-8 overflow-hidden">
          <h3 className="text-2xl mb-8 text-gray-900 text-center">
            {t('news.community_voices')}
          </h3>
          
          {/* Infinite Carousel Container */}
          <div className="relative">
            {/* Gradient Overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling Track */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 animate-testimonial-scroll hover:pause-animation"
                style={{ width: 'fit-content' }}
              >
                {duplicatedTestimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="border-l-4 border-l-[#FDB913] flex-shrink-0 w-[400px] hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      {/* Quote Icon */}
                      <div className="text-[#FDB913] text-5xl mb-3 leading-none">"</div>
                      
                      <blockquote className="text-gray-700 mb-4 italic min-h-[80px]">
                        {t(testimonial.quoteKey)}
                      </blockquote>
                      
                      <div className="flex items-center space-x-3 mt-4">
                        {/* Profile Image */}
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FDB913]">
                          <ImageWithFallback
                            src={testimonial.image}
                            alt={t(testimonial.nameKey)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-gray-900">{t(testimonial.nameKey)}</div>
                          <div className="text-sm text-gray-500">{t(testimonial.roleKey)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-[#A32020] to-[#000000] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl mb-4">{t('news.stay_connected')}</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {t('news.newsletter_description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('news.email_placeholder') || 'Enter your email'}
              className="flex-1 px-4 py-2 rounded-lg bg-transparent border-2 border-[#FDB913] text-white placeholder:text-white/70 focus:border-[#FDB913] focus:bg-white/5 outline-none transition-colors"
            />
            <Button className="bg-[#FDB913] text-black hover:bg-[#E5A50D] font-medium">
              {t('news.subscribe_button') || 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>

      {/* Inline Keyframe Animation */}
      <style>{`
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-testimonial-scroll {
          animation: testimonial-scroll 40s linear infinite;
        }
        
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}