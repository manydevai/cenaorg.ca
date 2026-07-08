import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LegalLayout } from '../components/LegalLayout';

export function DataProtectionPage() {
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
              {t('legal.data_protection')}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#121212] leading-tight tracking-tight mb-6 uppercase">
              {t('legal.data_headline')}
            </h1>
            <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase font-bold italic">
              {t('legal.data_subheadline')}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.officer_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <div className="bg-[#FBFBFB] p-8 border border-gray-100 mb-6">
                <p className="text-gray-600 font-sans leading-loose text-sm mb-4">
                  {t('legal.officer_text')}
                </p>
                <p className="text-[#8B0000] font-sans font-bold text-xs tracking-widest uppercase mb-2">
                  {t('legal.officer_contact')}
                </p>
                <p className="text-gray-400 font-sans text-xs tracking-widest uppercase">
                  {t('legal.officer_role')}
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.security_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-600 font-sans leading-loose text-sm">
                {t('legal.security_text')}
              </p>
            </section>

            <section className="space-y-4 text-sm">
              <h2 className="text-xl font-serif font-bold text-[#121212] uppercase tracking-tight">
                {t('legal.rights_title')}
              </h2>
              <div className="h-px w-12 bg-[#8B0000] mb-6" />
              <p className="text-gray-800 font-bold uppercase tracking-widest text-[10px] mb-6">
                {t('legal.rights_list')}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <li className="space-y-2">
                  <span className="text-[#C5A059] font-serif italic block text-lg">01</span>
                  <p className="text-gray-600 font-sans leading-relaxed">
                    {t('legal.rights_portability')}
                  </p>
                </li>
                <li className="space-y-2">
                  <span className="text-[#C5A059] font-serif italic block text-lg">02</span>
                  <p className="text-gray-600 font-sans leading-relaxed">
                    {t('legal.rights_deindexing')}
                  </p>
                </li>
              </ul>
            </section>
          </div>

          <div className="pt-16 border-t border-gray-100 italic text-gray-400 text-[10px] tracking-widest uppercase leading-relaxed text-center">
            Information Protection & Governance Framework &copy; CENA 2026. Certified Compliance for Quebec Administrative standards.
          </div>
        </motion.div>
      </div>
    </LegalLayout>
  );
}
