# CENA Image Assets Repository

This directory contains centralized image management for the CENA website. All images are hosted on imgbb.com to ensure reliability and prevent broken links.

## 📁 Structure

### `/images.ts`
Central repository for all image URLs used across the website. This file exports organized collections of images for easy maintenance and updates.

## 🎨 Image Categories

### 1. **BRAND** - Brand Assets
- **Logo**: CENA official logo (used in header and footer)
- **Hero Background**: Main background image for the hero section

### 2. **TEAM** - Team Member Photos
- **teamPhoto**: Official CENA team group photo
- **members**: Individual profile photos for all team members
  - Cristina Indira Manuel (President)
  - Marileny Fernando António (VP Operations)
  - Sebastião Sala (Finance Director)
  - Iolanda Maria Mendes (International Relations)
  - Daniel Love Fernando António (Youth & Innovation)
  - Dulce Angelina Figueiredo (HR Director)

### 3. **SUCCESS_STORIES** - Community Success Stories
Profile photos for 24 community members showcasing CENA's impact:
- António Silva, Fernando Santos, Miguel Cardoso
- Beatriz Fernandes, Dra. Carla Mendes, Joaquina Ferreira
- Torres Costa, Manuel Rodrigues, Domingos Alves
- Isabel Martins, Alberto Nunes, Rui Sousa
- José Carvalho, Madalena Gonçalves, Francisca Dias
- Catarino Lopes, Agostinho Ribeiro, Henriques Freitas
- Bernardo Tavares, Vitória Pinto, Selma Ferreira
- Felicidade Baptista, Mário Gomes, Dr. Xavier Neto

## 🔧 Usage

### Importing Images
```typescript
import { BRAND, TEAM, SUCCESS_STORIES } from '../assets/images';

// Use brand assets
<img src={BRAND.logo} alt="CENA Logo" />
<img src={BRAND.heroBackground} alt="Hero Background" />

// Use team photos
<img src={TEAM.members.cristinaManuel} alt="Cristina Manuel" />

// Use success story photos
<img src={SUCCESS_STORIES.antonioSilva} alt="António Silva" />
```

### Helper Functions

#### `getAllImages()`
Returns an array of all image URLs for preloading or validation.

```typescript
import { getAllImages } from '../assets/images';

const allImages = getAllImages();
console.log(`Total images: ${allImages.length}`);
```

#### `validateImageUrl(url)`
Validates if an image URL is accessible (client-side only).

```typescript
import { validateImageUrl } from '../assets/images';

const isValid = await validateImageUrl(BRAND.logo);
console.log(`Image is ${isValid ? 'valid' : 'broken'}`);
```

#### `preloadCriticalImages()`
Preloads critical images (logo, hero background, team photo) for better performance.

```typescript
import { preloadCriticalImages } from '../assets/images';

// Call in your app initialization
preloadCriticalImages();
```

## 🛡️ Benefits of Centralized Image Management

1. **Single Source of Truth**: All image URLs in one place
2. **Easy Updates**: Change an image URL once, updates everywhere
3. **Prevent Broken Links**: Easier to track and fix broken image links
4. **Type Safety**: TypeScript autocomplete for all image references
5. **Performance**: Built-in preloading utilities for critical images
6. **Maintainability**: Clear organization by category

## 🔄 Updating Images

To update an image:

1. Upload the new image to imgbb.com
2. Copy the direct image URL (ending in .jpg, .png, etc.)
3. Update the URL in `/assets/images.ts`
4. The change will automatically propagate to all components using that image

Example:
```typescript
export const BRAND = {
  logo: 'https://i.ibb.co/NEW-URL/CENA-logo.png', // Updated URL
  heroBackground: 'https://i.ibb.co/HpkVWCd3/Hero-Background.png',
};
```

## 🌐 Image Hosting

All images are hosted on **imgbb.com** for:
- ✅ High reliability and uptime
- ✅ Fast CDN delivery
- ✅ Permanent storage (images won't expire)
- ✅ No bandwidth limitations
- ✅ Direct image URLs for easy integration

## 📝 Best Practices

1. **Always use centralized imports**: Don't hardcode image URLs in components
2. **Optimize images**: Compress images before uploading to reduce file size
3. **Use descriptive names**: Make it clear what each image represents
4. **Document changes**: Update this README when adding new image categories
5. **Test after updates**: Verify images load correctly after URL changes

## 🚨 Troubleshooting

### Image not displaying?
1. Check if the URL in `images.ts` is correct
2. Verify the image exists on imgbb.com
3. Check browser console for 404 errors
4. Use `validateImageUrl()` to test the URL

### Need to replace multiple images?
1. Update URLs in `images.ts`
2. Clear browser cache
3. Test on different pages/sections

## 📞 Support

For issues with image hosting or broken links, contact the CENA technical team.

---

**Last Updated**: December 2024
**Maintained by**: CENA Technical Team
**Image Host**: imgbb.com
