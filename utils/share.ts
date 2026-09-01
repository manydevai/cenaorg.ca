/**
 * Social Sharing and Open Graph Meta Tag Utility
 * Ensures links shared on WhatsApp, Facebook, LinkedIn, Twitter, etc.,
 * properly render the indexed news/article/magazine photo, title, and description.
 */

export interface ShareOptions {
  title: string;
  text?: string;
  url?: string;
  image?: string;
}

/**
 * Resolves a relative or absolute URL path to a full canonical absolute URL.
 */
export function getAbsoluteUrl(path?: string): string {
  const defaultDomain = 'https://cena-ca.org';
  const origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : defaultDomain;

  if (!path) return typeof window !== 'undefined' ? window.location.href : defaultDomain;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  // If running locally, prefer window.location.origin for testing, fallback to production domain
  const basePath = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${basePath}`;
}

/**
 * Dynamically updates document head Open Graph (<meta property="og:...">)
 * and Twitter meta tags so scrapers and link previews (WhatsApp, iMessage, etc.)
 * capture the correct indexed image and content.
 */
export function updateOpenGraphMeta(options: ShareOptions): void {
  if (typeof document === 'undefined') return;

  const fullUrl = getAbsoluteUrl(options.url || window.location.href);
  const title = options.title || "CENA — Communauté d'Éducation et de Networking Angolaise";
  const description = options.text || "Autonomiser la diaspora angolaise et lusophone au Canada par l'éducation, le mentorat et le réseautage d'affaires.";
  
  // Default to magazine cover if no image is specified
  const imageUrl = getAbsoluteUrl(options.image || '/magazine/pages/MAG_-_ENGLISH_VERSION.webp');

  // Update Page Title
  document.title = title;

  // Helper to set or create meta tag
  const setMetaTag = (selector: string, attrName: string, attrValue: string, contentValue: string) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', contentValue);
  };

  // Open Graph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
  setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
  setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '630');

  // Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
}

/**
 * Directly triggers a WhatsApp Share link formatted with title, text, link, and updated OG image.
 */
export function shareToWhatsApp(options: ShareOptions): void {
  const fullUrl = getAbsoluteUrl(options.url || (typeof window !== 'undefined' ? window.location.href : ''));
  updateOpenGraphMeta(options);

  const messageParts: string[] = [];
  if (options.title) messageParts.push(`*${options.title.trim()}*`);
  if (options.text) messageParts.push(options.text.trim());
  messageParts.push(fullUrl);

  const fullText = messageParts.join('\n\n');
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullText)}`;

  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Universal Share Action:
 * Uses Web Share API if supported, or falls back to WhatsApp direct share / Clipboard copy.
 */
export async function shareContent(options: ShareOptions): Promise<{ copied: boolean; shared: boolean }> {
  const fullUrl = getAbsoluteUrl(options.url || (typeof window !== 'undefined' ? window.location.href : ''));
  updateOpenGraphMeta(options);

  const shareTitle = options.title;
  const shareText = options.text ? `${options.text.substring(0, 150)}...` : options.title;

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: fullUrl,
      });
      return { copied: false, shared: true };
    } catch (_) {
      // User canceled or failed native share, fallback to WhatsApp
    }
  }

  // Fallback to Clipboard Copy + WhatsApp Option
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareTitle}\n${fullUrl}`);
      return { copied: true, shared: false };
    }
  } catch (_) {
    // Clipboard failed
  }

  shareToWhatsApp(options);
  return { copied: false, shared: true };
}
