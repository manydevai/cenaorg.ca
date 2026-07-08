import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LegalLayout } from '../components/LegalLayout';

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <LegalLayout>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="border-b border-gray-100 pb-12">
            <span className="text-[#8B0000] font-sans text-[10px] tracking-[0.4em] uppercase font-bold mb-4 block">
              {t('legal.terms_of_use')}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#121212] leading-tight tracking-tight mb-6 uppercase">
              {t('terms.headline')}
            </h1>
            <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase font-bold italic">
              {t('terms.subheadline')}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('terms.section1_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('terms.section1_text')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('terms.section2_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('terms.section2_text')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('terms.section3_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('terms.section3_text')}
              </p>
            </section>
          </div>

          <div className="pt-16 border-t border-gray-100 italic text-gray-400 text-[10px] tracking-widest uppercase leading-relaxed text-center">
            {t('terms.footer_text')}
          </div>
        </motion.div>
      </div>
    </LegalLayout>
  );
}
