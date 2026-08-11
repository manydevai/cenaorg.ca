import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  User,
  Home,
  HeartHandshake,
  Plus,
  Trash2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  School,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface ChildInfo {
  firstName: string;
  lastName: string;
  age: string;
  dob: string;
  grade: string;
  schoolName: string;
  preference: string;
}

interface BackpackEmbeddedFormProps {
  onCollapse: () => void;
}

export const BackpackEmbeddedForm: React.FC<BackpackEmbeddedFormProps> = ({ onCollapse }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form State
  const [parentFirstName, setParentFirstName] = useState('');
  const [parentLastName, setParentLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('Montreal');
  const [postalCode, setPostalCode] = useState('');

  const [householdChildrenCount, setHouseholdChildrenCount] = useState('1');
  const [neededBackpacksCount, setNeededBackpacksCount] = useState('1');

  const [childrenList, setChildrenList] = useState<ChildInfo[]>([
    {
      firstName: '',
      lastName: '',
      age: '',
      dob: '',
      grade: '',
      schoolName: '',
      preference: 'none',
    },
  ]);

  const [financialSituation, setFinancialSituation] = useState('low_income');
  const [helpPrepare, setHelpPrepare] = useState('yes');
  const [alreadyReceived, setAlreadyReceived] = useState('no');
  const [howHeard, setHowHeard] = useState('website');

  const [consentAccurate, setConsentAccurate] = useState(false);
  const [consentNoGuarantee, setConsentNoGuarantee] = useState(false);
  const [consentContact, setConsentContact] = useState(false);
  const [consentUpdates, setConsentUpdates] = useState(false);

  const handleAddChild = () => {
    setChildrenList((prev) => [
      ...prev,
      {
        firstName: '',
        lastName: '',
        age: '',
        dob: '',
        grade: '',
        schoolName: '',
        preference: 'none',
      },
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
          ? 'Por favor preencha os seus dados pessoais.'
          : language === 'en'
          ? 'Please fill in your personal contact details.'
          : 'Veuillez remplir vos coordonnées personnelles.'
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
    return true;
  };

  const validateStep3 = () => {
    if (!consentAccurate || !consentNoGuarantee || !consentContact) {
      toast.error(
        language === 'pt'
          ? 'Por favor aceite os termos de consentimento obrigatórios.'
          : language === 'en'
          ? 'Please agree to the mandatory consent checkboxes.'
          : 'Veuillez accepter les termes de consentement obligatoires.'
      );
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      setIsSubmitting(true);
      try {
        const payload = {
          subject: 'Programme de Mochilas e Material Escolar CENA - Inscrição 2026',
          name: `${parentFirstName} ${parentLastName}`,
          parentFirstName,
          parentLastName,
          phone,
          email,
          preferredLanguage: language,
          address: `${streetAddress}${apartment ? ' Apt ' + apartment : ''}, ${city}, ${postalCode}`,
          streetAddress,
          apartment,
          city,
          postalCode,
          householdChildrenCount,
          neededBackpacksCount,
          childrenList: childrenList.map((c, i) => 
            `Child #${i + 1}: ${c.firstName} ${c.lastName} (Age: ${c.age}, DOB: ${c.dob || 'N/A'}, Grade: ${c.grade || 'N/A'}, School: ${c.schoolName || 'N/A'}, Pref: ${c.preference})`
          ).join(' | '),
          financialSituation,
          helpPrepare,
          alreadyReceived,
          howHeard,
          consentAccurate: consentAccurate ? 'Yes' : 'No',
          consentNoGuarantee: consentNoGuarantee ? 'Yes' : 'No',
          consentContact: consentContact ? 'Yes' : 'No',
          consentUpdates: consentUpdates ? 'Yes' : 'No',
          submittedAt: new Date().toLocaleString()
        };

        const response = await fetch('https://formbold.com/s/oYWqq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setStep(4);
          toast.success(t('backpack_campaign.success.subtitle'));
        } else {
          toast.error(
            language === 'pt' 
              ? 'Erro ao enviar a inscrição. Tente novamente.' 
              : language === 'en' 
              ? 'Failed to submit registration. Please try again.' 
              : 'Échec de l\'envoi. Veuillez réessayer.'
          );
        }
      } catch (error) {
        toast.error(
          language === 'pt' 
            ? 'Erro ao enviar a inscrição. Tente novamente.' 
            : language === 'en' 
            ? 'Failed to submit registration. Please try again.' 
            : 'Échec de l\'envoi. Veuillez réessayer.'
        );
      } finally {
        setIsSubmitting(false);
      }
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
      <div className="p-6 sm:p-8 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="inline-block px-3 py-1 bg-[#8B0000] text-white text-[10px] tracking-[0.2em] uppercase font-bold">
              {t('backpack_campaign.banner_badge')}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000]">
              {t('backpack_campaign.form_official_badge')}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold uppercase tracking-wide text-stone-900">
            {t('backpack_campaign.section_title')}
          </h3>
        </div>

        {/* Collapse Toolbar */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCollapse}
            className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#A00000] text-white border border-[#C5A059] text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm"
          >
            <ChevronUp className="w-4 h-4" />
            <span>
              {language === 'pt' ? 'Recolher' : language === 'en' ? 'Collapse' : 'Réduire'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Steps Header */}
      {step < 4 && (
        <div className="px-6 py-4 bg-stone-100 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2">
            <span className={step >= 1 ? 'text-[#8B0000]' : 'text-stone-400'}>
              1. {t('backpack_campaign.steps.step1')}
            </span>
            <span className={step >= 2 ? 'text-[#8B0000]' : 'text-stone-400'}>
              2. {t('backpack_campaign.steps.step2')}
            </span>
            <span className={step >= 3 ? 'text-[#8B0000]' : 'text-stone-400'}>
              3. {t('backpack_campaign.steps.step3')}
            </span>
          </div>
          <div className="w-full h-1.5 bg-stone-300">
            <div
              className="h-full bg-gradient-to-r from-[#8B0000] to-[#C5A059] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Content Area */}
      <div className="p-6 sm:p-10 space-y-6 bg-white">
        {/* STEP 1: PARENT / GUARDIAN & ADDRESS */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3">
              <User className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.parent_title')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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

            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3 pt-4">
              <Home className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.address_title')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
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
          </div>
        )}

        {/* STEP 2: HOUSEHOLD & CHILDREN */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3">
              <School className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.household_title')}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
                  {t('backpack_campaign.form.how_many_home')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={householdChildrenCount}
                  onChange={(e) => setHouseholdChildrenCount(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
                  {t('backpack_campaign.form.how_many_need')}
                </label>
                <input
                  type="number"
                  min="1"
                  value={neededBackpacksCount}
                  onChange={(e) => setNeededBackpacksCount(e.target.value)}
                  className="w-full px-4 py-3 text-sm transition-colors border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Dynamic Child Cards */}
            <div className="space-y-6 pt-2">
              {childrenList.map((child, idx) => (
                <div
                  key={idx}
                  className="p-6 border border-stone-300 bg-stone-50/80 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <span className="font-serif font-bold text-base text-[#8B0000] uppercase tracking-wider">
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
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.child_age')} *
                      </label>
                      <input
                        type="number"
                        value={child.age}
                        onChange={(e) => handleChildChange(idx, 'age', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.child_dob')}
                      </label>
                      <input
                        type="date"
                        value={child.dob}
                        onChange={(e) => handleChildChange(idx, 'dob', e.target.value)}
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
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-stone-700">
                        {t('backpack_campaign.form.child_school')}
                      </label>
                      <input
                        type="text"
                        value={child.schoolName}
                        onChange={(e) => handleChildChange(idx, 'schoolName', e.target.value)}
                        className="w-full px-4 py-2.5 text-sm border border-stone-300 bg-white focus:border-[#8B0000] text-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-700">
                      {t('backpack_campaign.form.child_pref')}
                    </label>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-stone-800">
                      {[
                        { key: 'none', label: t('backpack_campaign.form.pref_none') },
                        { key: 'girl', label: t('backpack_campaign.form.pref_girl') },
                        { key: 'boy', label: t('backpack_campaign.form.pref_boy') },
                        { key: 'neutral', label: t('backpack_campaign.form.pref_neutral') },
                      ].map((pref) => (
                        <label key={pref.key} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`embedded-pref-${idx}`}
                            value={pref.key}
                            checked={child.preference === pref.key}
                            onChange={() => handleChildChange(idx, 'preference', pref.key)}
                            className="accent-[#8B0000]"
                          />
                          <span>{pref.label}</span>
                        </label>
                      ))}
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
          </div>
        )}

        {/* STEP 3: FINANCIAL & CONSENT */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-[#8B0000] border-b border-[#8B0000]/20 pb-3">
              <HeartHandshake className="w-5 h-5 text-[#8B0000]" />
              <h4 className="font-serif font-bold text-lg uppercase tracking-wider text-stone-900">
                {t('backpack_campaign.form.financial_title')}
              </h4>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-700">
                {t('backpack_campaign.form.fin_q')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold">
                {[
                  { key: 'low_income', label: t('backpack_campaign.form.fin_low_income') },
                  { key: 'single_parent', label: t('backpack_campaign.form.fin_single_parent') },
                  { key: 'newcomer', label: t('backpack_campaign.form.fin_newcomer') },
                  { key: 'refugee', label: t('backpack_campaign.form.fin_refugee') },
                  { key: 'hardship', label: t('backpack_campaign.form.fin_hardship') },
                  { key: 'other', label: t('backpack_campaign.form.fin_other') },
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`p-3.5 border flex items-center space-x-3 cursor-pointer transition-colors ${
                      financialSituation === item.key
                        ? 'border-[#8B0000] bg-[#8B0000]/5 text-stone-900 font-bold'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="embeddedFinSit"
                      value={item.key}
                      checked={financialSituation === item.key}
                      onChange={() => setFinancialSituation(item.key)}
                      className="accent-[#8B0000]"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-700">
                {t('backpack_campaign.form.fin_help')}
              </label>
              <div className="flex space-x-6 text-xs font-bold text-stone-800">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="embeddedHelpPrep"
                    value="yes"
                    checked={helpPrepare === 'yes'}
                    onChange={() => setHelpPrepare('yes')}
                    className="accent-[#8B0000]"
                  />
                  <span>{t('backpack_campaign.form.yes')}</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="embeddedHelpPrep"
                    value="no"
                    checked={helpPrepare === 'no'}
                    onChange={() => setHelpPrepare('no')}
                    className="accent-[#8B0000]"
                  />
                  <span>{t('backpack_campaign.form.no')}</span>
                </label>
              </div>
            </div>

            {/* Important Info */}
            <div className="border-t border-stone-200 pt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-stone-700">
                  {t('backpack_campaign.form.imp_already')}
                </label>
                <div className="flex space-x-6 text-xs font-bold text-stone-800">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="embeddedAlreadyRec"
                      value="yes"
                      checked={alreadyReceived === 'yes'}
                      onChange={() => setAlreadyReceived('yes')}
                      className="accent-[#8B0000]"
                    />
                    <span>{t('backpack_campaign.form.yes')}</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="embeddedAlreadyRec"
                      value="no"
                      checked={alreadyReceived === 'no'}
                      onChange={() => setAlreadyReceived('no')}
                      className="accent-[#8B0000]"
                    />
                    <span>{t('backpack_campaign.form.no')}</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-stone-700">
                  {t('backpack_campaign.form.imp_how_heard')}
                </label>
                <select
                  value={howHeard}
                  onChange={(e) => setHowHeard(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-stone-300 bg-white text-stone-900 focus:border-[#8B0000] focus:outline-none"
                >
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="friend">Amigo(a) / Familier / Friend</option>
                  <option value="school">Escola / École / School</option>
                  <option value="community">Organização Comunitária</option>
                  <option value="website">Website</option>
                  <option value="other">Outro / Other</option>
                </select>
              </div>
            </div>

            {/* Consent Section */}
            <div className="border-t border-stone-200 pt-4 space-y-3">
              <div className="flex items-center space-x-3 text-[#8B0000] mb-2">
                <ShieldCheck className="w-5 h-5 text-[#8B0000]" />
                <h4 className="font-serif font-bold text-base uppercase tracking-wider text-stone-900">
                  {t('backpack_campaign.form.consent_title')}
                </h4>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer text-xs leading-relaxed text-stone-700">
                <input
                  type="checkbox"
                  checked={consentAccurate}
                  onChange={(e) => setConsentAccurate(e.target.checked)}
                  className="mt-0.5 accent-[#8B0000]"
                />
                <span>{t('backpack_campaign.form.consent_1')} *</span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer text-xs leading-relaxed text-stone-700">
                <input
                  type="checkbox"
                  checked={consentNoGuarantee}
                  onChange={(e) => setConsentNoGuarantee(e.target.checked)}
                  className="mt-0.5 accent-[#8B0000]"
                />
                <span>{t('backpack_campaign.form.consent_2')} *</span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer text-xs leading-relaxed text-stone-700">
                <input
                  type="checkbox"
                  checked={consentContact}
                  onChange={(e) => setConsentContact(e.target.checked)}
                  className="mt-0.5 accent-[#8B0000]"
                />
                <span>{t('backpack_campaign.form.consent_3')} *</span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer text-xs leading-relaxed text-stone-700">
                <input
                  type="checkbox"
                  checked={consentUpdates}
                  onChange={(e) => setConsentUpdates(e.target.checked)}
                  className="mt-0.5 accent-[#8B0000]"
                />
                <span>{t('backpack_campaign.form.consent_4')}</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && (
          <div className="py-8 text-center space-y-6 animate-fade-in bg-white">
            <div className="w-20 h-20 mx-auto bg-[#8B0000]/10 border-2 border-[#8B0000] rounded-full flex items-center justify-center text-[#8B0000] shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-[0.3em] text-[#8B0000]">
                {t('backpack_campaign.success.title')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold uppercase mt-1 mb-3 text-stone-900">
                {t('backpack_campaign.success.subtitle')}
              </h3>
              <p className="text-sm max-w-lg mx-auto leading-relaxed text-stone-600">
                {t('backpack_campaign.success.message')}
              </p>
            </div>

            <div className="border border-stone-200 bg-stone-50 p-6 text-left max-w-md mx-auto space-y-2 text-xs font-sans text-stone-800 shadow-xs">
              <div className="flex justify-between border-b pb-2 border-stone-200">
                <span className="text-stone-500">{t('backpack_campaign.summary_guardian')}</span>
                <span className="font-bold">{parentFirstName} {parentLastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-stone-200">
                <span className="text-stone-500">{t('backpack_campaign.summary_email')}</span>
                <span className="font-bold">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">{t('backpack_campaign.summary_children')}</span>
                <span className="font-bold text-[#8B0000]">{childrenList.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Form Footer Controls */}
      <div className="p-6 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
        {step < 4 ? (
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
              className="px-8 py-3 bg-[#8B0000] hover:bg-[#A00000] text-white font-bold text-xs uppercase tracking-widest border border-[#C5A059] flex items-center space-x-2 transition-colors shadow-lg disabled:opacity-50"
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
                    {step === 3
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
