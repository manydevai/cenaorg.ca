import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { shareContent, ShareOptions } from '../utils/share';

interface ShareButtonProps extends ShareOptions {
  className?: string;
  variant?: 'compact' | 'standard' | 'icon-only';
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

  if (variant === 'icon-only') {
    return (
      <button
        onClick={handleShareClick}
        className={`p-1.5 rounded-full bg-white/5 hover:bg-[#C5A059]/20 text-[#C5A059] border border-white/10 transition-all cursor-pointer shadow-xs ${className}`}
        title="Partilhar esta notícia"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
      </button>
    );
  }

  return (
    <button
      onClick={handleShareClick}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-[#C5A059]/15 border border-[#C5A059]/30 text-gray-200 hover:text-white text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer shadow-xs ${className}`}
      title="Partilhar notícia (WhatsApp, Redes Sociais, Copiar Link)"
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
  );
}
