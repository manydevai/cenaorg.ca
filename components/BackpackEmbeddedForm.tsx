import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  User,
  Home,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  School,
  ChevronUp,
  Loader2,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface ChildInfo {
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
}

interface BackpackEmbeddedFormProps {
  onCollapse: () => void;
}

export const BackpackEmbeddedForm: React.FC<BackpackEmbeddedFormProps> = ({ onCollapse }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Parent / Contact State
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Address State
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Montreal');
  const [postalCode, setPostalCode] = useState('');
  const [howHeard, setHowHeard] = useState('website');

  // Children State
  const [childrenList, setChildrenList] = useState<ChildInfo[]>([
    { firstName: '', lastName: '', age: '', grade: '' }
  ]);

  // Consent State (2 Uniform Checkboxes)
  const [consentAccurate, setConsentAccurate] = useState(false);
  const [consentStock, setConsentStock] = useState(false);

  const handleAddChild = () => {
    setChildrenList((prev) => [
      ...prev,
      { firstName: '', lastName: '', age: '', grade: '' }
    ]);
  };

  const handleRemoveChild = (index: number) => {
    if (childrenList.length === 1) return;
    setChildrenList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChildChange = (index: number, field: keyof ChildInfo, value: string) => {
    setChildrenList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const validateStep1 = () => {
    if (!parentFirstName.trim() || !parentLastName.trim() || !phone.trim() || !email.trim()) {
      toast.error(
        language === 'pt'
          ? 'Por favor preencha os seus dados pessoais (Nome, Telefone, Email).'
          : language === 'en'
          ? 'Please fill in your personal contact details (Name, Phone, Email).'
          : 'Veuillez remplir vos coordonnées personnelles (Nom, Téléphone, Courriel).'
      );
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    for (let i = 0; i < childrenList.length; i++) {
      const child = childrenList[i];
      if (!child.firstName.trim() || !child.lastName.trim() || !child.age.trim()) {
        toast.error(
          language === 'pt'
            ? `Por favor preencha o nome e idade da Criança #${i + 1}.`
            : language === 'en'
            ? `Please fill in name and age for Child #${i + 1}.`
            : `Veuillez remplir le nom et l'âge pour l'Enfant #${i + 1}.`
        );
        return false;
      }
    }

    if (!consentAccurate || !consentStock) {
      toast.error(
        language === 'pt'
          ? 'Por favor confirme as caixas de consentimento.'
          : language === 'en'
          ? 'Please check the consent boxes to proceed.'
          : 'Veuillez cocher les cases de consentement.'
      );
      return false;
    }
    return true;
  };

  const handleSubmitForm = async () => {
    if (!validateStep2()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        subject: 'Programme de Mochilas e Material Escolar CENA - Inscrição 2026',
        name: `${parentFirstName} ${parentLastName}`,
        parentFirstName,
        parentLastName,
        phone,
        email,
        language,
        address: `${streetAddress}${apartment ? ' Apt ' + apartment : ''}, ${city}, ${postalCode}`,
        streetAddress,
        apartment,
        city,
        postalCode,
        howHeard,
        childrenCount: childrenList.length,
        childrenList: childrenList.map((c, i) => 
          `Child #${i + 1}: ${c.firstName} ${c.lastName} (Age: ${c.age}, Grade: ${c.grade || 'N/A'})`
        ).join(' | '),
        consentAccurate: consentAccurate ? 'Yes' : 'No',
        consentStock: consentStock ? 'Yes' : 'No',
        submittedAt: new Date().toLocaleString()
      };

      const response = await fetch('https://formbold.com/s/oYWqq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStep(3);
        toast.success(t('backpack_campaign.success.subtitle'));
      } else {
        toast.error(
          language === 'pt'
            ? 'Erro ao enviar o pedido. Tente novamente.'
            : language === 'en'
            ? 'Failed to submit request. Please try again.'
            : 'Échec de l\'envoi. Veuillez réessayer.'
        );
      }
    } catch (error) {
      toast.error(
        language === 'pt'
          ? 'Erro ao enviar o pedido. Tente novamente.'
          : language === 'en'
          ? 'Failed to submit request. Please try again.'
          : 'Échec de l\'envoi. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      handleSubmitForm();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <motion.div
      id="backpack-embedded-form"
      initial={{ opacity: 0, height: 0, y: -20 }}
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full mt-10 border-2 border-[#8B0000]/40 bg-white text-stone-900 shadow-2xl overflow-hidden font-sans rounded-none"
    >
      {/* Top Gold & Wine Red Accent Bar */}
      <div className="h-2 w-full bg-gradient-to-r from-[#8B0000] via-[#C5A059] to-[#8B0000]" />

      {/* Embedded Form Header & Controls */}
      <div className="p-4 sm:p-8 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="inline-block px-2.5 py-0.5 bg-[#8B0000] text-white text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-bold">
              {t('backpack_campaign.banner_badge')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#8B0000]">
              {t('backpack_campaign.form_official_badge')}
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-stone-900">
            {t('backpack_campaign.section_title')}
          </h3>
        </div>

        {/* Collapse Button */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCollapse}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#8B0000] hover:bg-[#A00000] text-white border border-[#C5A059] text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-colors shadow-xs"
          >
            <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              {language === 'pt' ? 'Recolher' : language === 'en' ? 'Collapse' : 'Réduire'}
            </span>
          </button>
        </div>
      </div>

      {/* Simplified Progress Steps Header (2 Steps) */}
      {step < 3 && (
        <div className="px-4 sm:px-6 py-3 bg-stone-100 border-b border-stone-200">
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 gap-2">
            <span className={step >= 1 ? 'text-[#8B0000]' : 'text-stone-400'}>
              {t('backpack_campaign.steps.step1')}
            </span>
            <span className={step >= 2 ? 'text-[#8B0000]' : 'text-stone-400'}>
              {t('backpack_campaign.steps.step2')}
            </span>
            <span className={step === 3 ? 'text-[#8B0000]' : 'text-stone-400'}>
              {t('backpack_campaign.steps.step3')}
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-300">
            <div
              className="h-full bg-gradient-to-r from-[#8B0000] to-[#C5A059] transition-all duration-500"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Content Area */}
      <div className="p-5 sm:p-10 space-y-6 bg-white">
        
        {/* STEP 1: PARENT CONTACT & ADDRESS */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3">
              <User className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.parent_title')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.first_name')} *
                </label>
                <input
                  type="text"
                  value={parentFirstName}
                  onChange={(e) => setParentFirstName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.last_name')} *
                </label>
                <input
                  type="text"
                  value={parentLastName}
                  onChange={(e) => setParentLastName(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.phone')} *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.email')} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3 pt-3">
              <Home className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.address_title')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.street')}
                </label>
                <input
                  type="text"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.apt')}
                </label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.city')}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                  {t('backpack_campaign.form.postal_code')}
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* How Heard Select Menu - Clean Localized Single Language Options */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
                {t('backpack_campaign.form.imp_how_heard')}
              </label>
              <select
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-stone-300 bg-white text-stone-900 focus:border-[#8B0000] focus:outline-none"
              >
                <option value="facebook">{t('backpack_campaign.form.how_heard_options.facebook')}</option>
                <option value="instagram">{t('backpack_campaign.form.how_heard_options.instagram')}</option>
                <option value="friend">{t('backpack_campaign.form.how_heard_options.friend')}</option>
                <option value="school">{t('backpack_campaign.form.how_heard_options.school')}</option>
                <option value="community">{t('backpack_campaign.form.how_heard_options.community')}</option>
                <option value="website">{t('backpack_campaign.form.how_heard_options.website')}</option>
                <option value="other">{t('backpack_campaign.form.how_heard_options.other')}</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 2: CHILDREN & CONSENT */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3">
              <School className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.child_title')}s
              </h4>
            </div>

            {/* Dynamic Child Cards */}
            <div className="space-y-4">
              {childrenList.map((child, idx) => (
                <div
                  key={idx}
                  className="p-5 border border-stone-300 bg-stone-50/80 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#8B0000] uppercase tracking-wider">
                      {t('backpack_campaign.form.child_title')} #{idx + 1}
                    </span>
                    {childrenList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChild(idx)}
                        className="text-red-600 hover:text-red-700 flex items-center space-x-1 text-xs uppercase font-bold"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>{t('backpack_campaign.form.remove_child')}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.first_name')} *
                      </label>
                      <input
                        type="text"
                        value={child.firstName}
                        onChange={(e) => handleChildChange(idx, 'firstName', e.target.value)}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.last_name')} *
                      </label>
                      <input
                        type="text"
                        value={child.lastName}
                        onChange={(e) => handleChildChange(idx, 'lastName', e.target.value)}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.child_age')} *
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="18"
                        value={child.age}
                        onChange={(e) => handleChildChange(idx, 'age', e.target.value)}
                        required
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.child_grade')}
                      </label>
                      <input
                        type="text"
                        value={child.grade}
                        onChange={(e) => handleChildChange(idx, 'grade', e.target.value)}
                        placeholder="e.g. 3ème Année / Grade 3"
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddChild}
                className="w-full py-3 border border-dashed border-[#8B0000]/50 bg-white hover:bg-stone-100 text-[#8B0000] font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{t('backpack_campaign.form.add_child')}</span>
              </button>
            </div>

            {/* Uniform Consent Checkboxes Section */}
            <div className="border-t border-stone-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3 text-[#8B0000] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#8B0000]" />
                <h4 className="font-serif font-bold text-base uppercase tracking-wider text-stone-900">
                  {t('backpack_campaign.form.consent_title')}
                </h4>
              </div>

              {/* Checkbox 1: Identical Uniform Size */}
              <label className="flex items-start space-x-3 cursor-pointer p-2.5 bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors">
                <input
                  type="checkbox"
                  checked={consentAccurate}
                  onChange={(e) => setConsentAccurate(e.target.checked)}
                  className="mt-0.5 w-5 h-5 accent-[#8B0000] border-stone-300 rounded-none flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-stone-800 leading-relaxed">
                  {t('backpack_campaign.form.consent_1')} *
                </span>
              </label>

              {/* Checkbox 2: Identical Uniform Size */}
              <label className="flex items-start space-x-3 cursor-pointer p-2.5 bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors">
                <input
                  type="checkbox"
                  checked={consentStock}
                  onChange={(e) => setConsentStock(e.target.checked)}
                  className="mt-0.5 w-5 h-5 accent-[#8B0000] border-stone-300 rounded-none flex-shrink-0 cursor-pointer"
                />
                <span className="text-xs font-medium text-stone-800 leading-relaxed">
                  {t('backpack_campaign.form.consent_2')} *
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 3: ELEGANT SMOOTH CONFIRMATION */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="py-10 text-center space-y-6 bg-white"
          >
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 bg-[#8B0000]/10 rounded-full animate-ping opacity-75" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#8B0000] to-[#A00000] rounded-full flex items-center justify-center text-white shadow-xl border-2 border-[#C5A059]">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-[#8B0000]/10 border border-[#8B0000]/30 px-3 py-1 text-[#8B0000] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{t('backpack_campaign.success.title')}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold uppercase tracking-tight text-stone-900 pt-2">
                {t('backpack_campaign.success.subtitle')}
              </h3>
              <p className="text-sm max-w-md mx-auto leading-relaxed text-stone-600 font-sans">
                {t('backpack_campaign.success.message')}
              </p>
            </div>

            {/* Summary Receipt Card */}
            <div className="border border-stone-200 bg-stone-50 p-6 text-left max-w-md mx-auto space-y-3 text-xs font-sans text-stone-800 shadow-sm border-t-4 border-t-[#8B0000]">
              <div className="flex justify-between border-b pb-2 border-stone-200">
                <span className="text-stone-500 font-medium">{t('backpack_campaign.summary_guardian')}</span>
                <span className="font-bold text-stone-900">{parentFirstName} {parentLastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-stone-200">
                <span className="text-stone-500 font-medium">{t('backpack_campaign.summary_email')}</span>
                <span className="font-bold text-stone-900">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">{t('backpack_campaign.summary_children')}</span>
                <span className="font-bold text-[#8B0000] text-sm">{childrenList.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Embedded Form Footer Controls */}
      <div className="p-4 sm:p-6 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
        {step < 3 ? (
          <>
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1 || isSubmitting}
              className={`px-4 py-3 text-xs uppercase font-bold tracking-wider flex items-center space-x-2 transition-colors ${
                step === 1 || isSubmitting
                  ? 'opacity-30 cursor-not-allowed text-stone-400'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'pt' ? 'Anterior' : language === 'en' ? 'Back' : 'Précédent'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-xs uppercase tracking-widest border border-[#C5A059] flex items-center space-x-2 transition-colors shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>
                    {language === 'pt' ? 'A enviar...' : language === 'en' ? 'Submitting...' : 'Envoi en cours...'}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {step === 2
                      ? t('backpack_campaign.form.submit_btn')
                      : language === 'pt'
                      ? 'Seguinte'
                      : language === 'en'
                      ? 'Next'
                      : 'Suivant'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onCollapse}
            className="w-full py-3 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-xs uppercase tracking-widest border border-[#C5A059] transition-colors"
          >
            {t('backpack_campaign.success.close_btn')}
          </button>
        )}
      </div>
    </motion.div>
  );
};
