import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Calendar, CheckCircle, Mail, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface EventRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t('event_modal.success_message') || 'Inscription enregistrée avec succès!');
      setName('');
      setEmail('');
      setPhone('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#121212] border border-[#C5A059]/40 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-[#C5A059] mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold">
              {t('event_modal.title')}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white uppercase tracking-tight">
            {eventTitle}
          </h3>
          <p className="text-gray-400 text-sm font-sans mt-2">
            {t('event_modal.subtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-300 mb-2">
              {t('event_modal.name_label')} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João Manuel"
                className="w-full bg-black/50 border border-white/20 focus:border-[#C5A059] focus:outline-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-300 mb-2">
              {t('event_modal.email_label')} *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: joao@example.com"
                className="w-full bg-black/50 border border-white/20 focus:border-[#C5A059] focus:outline-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-bold text-gray-300 mb-2">
              {t('event_modal.phone_label')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: +1 (514) 000-0000"
                className="w-full bg-black/50 border border-white/20 focus:border-[#C5A059] focus:outline-none pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 font-sans"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-white/20 text-gray-300 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#C5A059] text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Traitement...' : t('event_modal.submit_btn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
