import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';

export function TermsOfService() {
    const { t } = useLanguage();

    const sections = [
        'usage',
        'ip',
        'links',
        'disclaimer',
        'governing_law',
        'modifications'
    ];

    return (
        <div className="pt-32 pb-96 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <Badge className="bg-[#A32020] text-white mb-6">
                {t('terms_of_service.title')}
            </Badge>

            <div className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 leading-tight">
                    {t('terms_of_service.title')}
                </h1>
                <p className="text-gray-500 italic">
                    {t('terms_of_service.last_updated')}
                </p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 mb-10">
                <p className="text-lg leading-relaxed mb-8">
                    {t('terms_of_service.intro')}
                </p>

                <div className="space-y-8">
                    {sections.map((section) => (
                        <div key={section} className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {t(`terms_of_service.sections.${section}.title`)}
                            </h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                                {t(`terms_of_service.sections.${section}.content`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spacer to ensure separation from footer */}
            <div style={{ minHeight: '100px', height: '100px', display: 'block', width: '100%', flexShrink: 0 }} aria-hidden="true"></div>
        </div>
    );
}
