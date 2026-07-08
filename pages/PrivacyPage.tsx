import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LegalLayout } from '../components/LegalLayout';

export function PrivacyPage() {
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
              {t('legal.privacy_policy')}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#121212] leading-tight tracking-tight mb-6">
              {t('legal.privacy_headline')}
            </h1>
            <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase font-bold italic">
              {t('legal.privacy_compliance')}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.purpose_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('legal.purpose_text')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.consent_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('legal.consent_text')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.retention_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('legal.retention_text')}
              </p>
            </section>
          </div>

          {/* Institutional Note */}
          <div className="bg-[#FBFBFB] p-8 border-l-2 border-[#C5A059]">
            <p className="text-[10px] tracking-widest uppercase font-bold text-gray-400 leading-relaxed">
              CENA (NEQ: 1181556193) &copy; 2026. This policy is reviewed annually to ensure digital security and absolute compliance with North American standards.
            </p>
          </div>
        </motion.div>
      </div>
    </LegalLayout>
  );
}
