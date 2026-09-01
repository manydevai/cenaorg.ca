import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { shareToWhatsApp, shareContent, ShareOptions } from '../utils/share';

interface ShareButtonProps extends ShareOptions {
  className?: string;
  variant?: 'compact' | 'standard' | 'whatsapp-only' | 'icon-only';
  label?: string;
}

export function ShareButton({
  title,
  text,
  url,
  image,
  className = '',
  variant = 'standard',
  label = 'Partilhar'
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const res = await shareContent({ title, text, url, image });
    if (res.copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    shareToWhatsApp({ title, text, url, image });
  };

  // WhatsApp Icon SVG
  const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.55 4.103 1.514 5.833L.103 23.393l5.728-1.503C7.502 22.784 9.683 23.333 12 23.333c6.627 0 12-5.373 12-11.333S18.627 0 12 0zm0 21.333c-1.92 0-3.72-.516-5.28-1.442l-.378-.225-3.39.889.904-3.305-.246-.392C2.637 15.28 2 13.68 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 9.333-10 9.333z" />
    </svg>
  );

  if (variant === 'whatsapp-only') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer ${className}`}
        title="Partilhar no WhatsApp com foto indexada"
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
        <span>WhatsApp</span>
      </button>
    );
  }

  if (variant === 'icon-only') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <button
          onClick={handleWhatsAppClick}
          className="p-2 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all cursor-pointer"
          title="Partilhar no WhatsApp"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleShareClick}
          className="p-2 rounded-full bg-white/5 hover:bg-[#C5A059]/20 text-[#C5A059] border border-white/10 transition-all cursor-pointer"
          title="Copiar Link / Outras Redes"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* WhatsApp Share Button */}
      <button
        onClick={handleWhatsAppClick}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#25D366]/15 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow-xs"
        title="Partilhar esta notícia no WhatsApp com a foto indexada"
      >
        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
        <span>WhatsApp</span>
      </button>

      {/* General Web Share / Copy Button */}
      <button
        onClick={handleShareClick}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/15 border border-white/15 text-gray-300 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
        title="Copiar link ou partilhar em outras aplicações"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400">Copiado!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{label}</span>
          </>
        )}
      </button>
    </div>
  );
}
