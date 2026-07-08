import { Badge } from '../components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { Building2, Phone, Mail, Clock } from 'lucide-react';

export function NPOInfo() {
    const { t } = useLanguage();

    return (
        <div className="pt-32 pb-96 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <Badge className="bg-[#FDB913] text-black mb-6">
                {t('npo_info.badge')}
            </Badge>

            <div className="mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 leading-tight">
                    {t('npo_info.title')}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                    {t('npo_info.intro')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-[#A32020]" />
                        {t('npo_info.title')}
                    </h2>
                    <div className="space-y-4">
                        <div className="pb-3 border-b border-gray-100">
                            <span className="block text-sm text-gray-500 font-medium mb-1">{t('npo_info.details.corp_number.label')}</span>
                            <span className="text-lg text-gray-900 font-mono">{t('npo_info.details.corp_number.value')}</span>
                        </div>
                        <div className="pb-3 border-b border-gray-100">
                            <span className="block text-sm text-gray-500 font-medium mb-1">{t('npo_info.details.neq.label')}</span>
                            <span className="text-lg text-gray-900 font-mono">{t('npo_info.details.neq.value')}</span>
                        </div>
                        <div className="pb-3 border-b border-gray-100">
                            <span className="block text-sm text-gray-500 font-medium mb-1">{t('npo_info.details.founded.label')}</span>
                            <span className="text-lg text-gray-900">{t('npo_info.details.founded.value')}</span>
                        </div>
                        <div className="pb-3 border-b border-gray-100">
                            <span className="block text-sm text-gray-500 font-medium mb-1">{t('npo_info.details.status.label')}</span>
                            <span className="text-lg text-gray-900">{t('npo_info.details.status.value')}</span>
                        </div>
                        <div className="pb-3">
                            <span className="block text-sm text-gray-500 font-medium mb-1">{t('npo_info.details.charity.label')}</span>
                            <span className="text-lg text-gray-900">{t('npo_info.details.charity.value')}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Mail className="h-6 w-6 text-[#FDB913]" />
                        {t('npo_info.contact_info.title')}
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Building2 className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">Adresse</p>
                                <p className="text-gray-600">{t('npo_info.contact_info.address')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">Téléphone</p>
                                <p className="text-gray-600">{t('npo_info.contact_info.phone')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">Courriel</p>
                                <p className="text-gray-600">{t('npo_info.contact_info.email')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Clock className="h-5 w-5 text-gray-400 mt-1 shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900">Heures d'ouverture</p>
                                <p className="text-gray-600">{t('npo_info.contact_info.hours')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Explicit spacer to ensure separation from footer */}
            <div className="h-[200px] w-full" aria-hidden="true" />
        </div>
    );
}
