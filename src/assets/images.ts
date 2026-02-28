/**
 * CENA Image Assets Repository
 * 
 * This file contains all image URLs used across the CENA website.
 * Centralizing image references here makes it easier to:
 * - Update images in one place
 * - Prevent broken links
 * - Maintain consistency across the site
 * - Track all visual assets
 */

import teamPhotoImg from './cena-new-team.jpg';
import teamShotImg from './cena-new-team-shot.jpg';
import logoImg from './cena-logo-slogan.png';

// ==================== BRAND ASSETS ====================
export const BRAND = {
  logo: logoImg,
  heroBackground: 'https://i.ibb.co/HpkVWCd3/Hero-Background.png',
  teamShot: teamShotImg,
};

// ==================== TEAM PHOTOS ====================
export const TEAM = {
  teamPhoto: teamPhotoImg,
  members: {
    cristinaManuel: 'https://i.ibb.co/99ScsZZj/Cristina-Manuel-CEO.jpg',
    marilenyAntonio: 'https://i.ibb.co/SXZJk2bC/Marileny-Fernando-Antonio-Vice-president.jpg',
    sebastiaoSala: 'https://i.ibb.co/hFY29VPp/Sebastiao-Sala-Directeur-Financier.jpg',
    iolandaMendes: 'https://i.ibb.co/pjYLCS0j/Ilanda-Mendes-Relations-Publiques.jpg',
    danielLove: 'https://i.ibb.co/whV6S2cv/Daniel-Love-Directeur-de-Inovation-et-Jeunesse.jpg',
    dulceFigueiredo: 'https://i.ibb.co/LdVg9mPg/Dulce-Figuero.jpg',
  }
};

// ==================== SUCCESS STORIES PHOTOS ====================
export const SUCCESS_STORIES = {
  antonioSilva: 'https://i.ibb.co/m55LPd0L/cuisinier.jpg',
  fernandoSantos: 'https://i.ibb.co/JR91ckmc/chief-pizza.jpg',
  miguelCardoso: 'https://i.ibb.co/nMRbFxNW/chief-pastry.jpg',
  beatrizFernandes: 'https://i.ibb.co/0pp5PZGF/nurse.jpg',
  carlaMendes: 'https://i.ibb.co/5X452X2b/Docteur.jpg',
  joaquinaFerreira: 'https://i.ibb.co/VWVvfkHG/pexels-olly-3801649.jpg',
  torresCosta: 'https://i.ibb.co/d42c898X/Boulangerie.jpg',
  manuelRodrigues: 'https://i.ibb.co/BVb7VHW5/Grocery-Store.png',
  domingosAlves: 'https://i.ibb.co/BVBp9VCW/Barber.jpg',
  isabelMartins: 'https://i.ibb.co/RpDMrgbr/Designer.jpg',
  albertoNunes: 'https://i.ibb.co/wh2vchkK/Menusier.jpg',
  ruiSousa: 'https://i.ibb.co/0jhNpxSn/Gestor.jpg',
  joseCarvalho: 'https://i.ibb.co/1tWtJT1Z/Businessman.jpg',
  madalenaGoncalves: 'https://i.ibb.co/1f1Yc1HF/Sales.jpg',
  franciscaDias: 'https://i.ibb.co/tpyJM8yr/Artesien.jpg',
  catarinoLopes: 'https://i.ibb.co/QvpqSPYy/couture.jpg',
  agostinhoRibeiro: 'https://i.ibb.co/8nnjY6sh/Assurance.jpg',
  henriquesFreitas: 'https://i.ibb.co/NBFK9V9/Finance.jpg',
  bernardoTavares: 'https://i.ibb.co/QFDJyM7d/pexels-mikhail-nilov-9301526.jpg',
  vitoriaPinto: 'https://i.ibb.co/LdmzRmdD/Immobilier.jpg',
  selmaFerreira: 'https://i.ibb.co/9kKqrk0J/Marketing.jpg',
  felicidadeBaptista: 'https://i.ibb.co/spLdknqz/entrepreneur.jpg',
  marioGomes: 'https://i.ibb.co/gZ3Zr34w/IT.jpg',
  xavierNeto: 'https://i.ibb.co/hFy4BYvK/Avocat-xavier.jpg',
};

// ==================== HELPER FUNCTIONS ====================
/**
 * Get all images as an array for preloading or validation
 */
export const getAllImages = (): string[] => {
  return [
    ...Object.values(BRAND),
    TEAM.teamPhoto,
    ...Object.values(TEAM.members),
    ...Object.values(SUCCESS_STORIES),
  ];
};

/**
 * Validate if an image URL is accessible (client-side only)
 */
export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    BRAND.logo,
    BRAND.heroBackground,
    TEAM.teamPhoto,
  ];

  criticalImages.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};
