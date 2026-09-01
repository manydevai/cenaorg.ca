import os
from PIL import Image

src_dir = os.path.join(os.getcwd(), 'public', 'magazine', 'pages')
og_dir = os.path.join(os.getcwd(), 'public', 'magazine', 'pages', 'og')
os.makedirs(og_dir, exist_ok=True)

# Page to image file mapping
PAGE_IMAGE_MAP = {
  1: 'MAG_-_ENGLISH_VERSION.webp',
  2: 'MAG_-_ENGLISH_VERSION2.webp',
  3: 'MAG_-_ENGLISH_VERSION3.webp',
  4: 'MAG_-_ENGLISH_VERSION5.webp',
  5: 'MAG_-_ENGLISH_VERSION11.webp',
  6: 'MAG_-_ENGLISH_VERSION10.webp',
  7: 'MAG_-_ENGLISH_VERSION9.webp',
  8: 'MAG_-_ENGLISH_VERSION8.webp',
  9: 'MAG_-_ENGLISH_VERSION7.webp',
  10: 'MAG_-_ENGLISH_VERSION30.webp',
  11: 'MAG_-_ENGLISH_VERSION19.webp', # Candor's Cake
  12: 'MAG_-_ENGLISH_VERSION20.webp',
  13: 'MAG_-_ENGLISH_VERSION15.webp',
  14: 'MAG_-_ENGLISH_VERSION16.webp',
  15: 'MAG_-_ENGLISH_VERSION13.webp',
  16: 'MAG_-_ENGLISH_VERSION14.webp', # Neccy LM
  17: 'MAG_-_ENGLISH_VERSION32.webp', # Association Menarca Muhatu
  18: 'MAG_-_ENGLISH_VERSION4.webp',
  19: 'MAG_-_ENGLISH_VERSION21.webp', # Essential Micro Hair
  20: 'MAG_-_ENGLISH_VERSION22.webp',
  21: 'MAG_-_ENGLISH_VERSION25.webp', # Zen Dans Ma Tête
  22: 'MAG_-_ENGLISH_VERSION26.webp',
  23: 'MAG_-_ENGLISH_VERSION27.webp', # Randy Selection
  24: 'MAG_-_ENGLISH_VERSION28.webp',
  25: 'MAG_-_ENGLISH_VERSION29.webp',
  26: 'MAG_-_ENGLISH_VERSION18.webp', # Val Nettoyage et Entretien
  27: 'MAG_-_ENGLISH_VERSION31.webp',
  28: 'MAG_-_ENGLISH_VERSION6.webp',
  29: 'MAG_-_ENGLISH_VERSION17.webp',
  30: 'MAG_-_ENGLISH_VERSION23.webp',
  31: 'MAG_-_ENGLISH_VERSION24.webp',
  32: 'MAG_-_ENGLISH_VERSION33.webp',
}

def get_page_filename(num):
  if num in PAGE_IMAGE_MAP:
    return PAGE_IMAGE_MAP[num]
  if num == 1:
    return 'MAG_-_ENGLISH_VERSION.webp'
  return f'MAG_-_ENGLISH_VERSION{num}.webp'

converted = 0
for num in range(1, 41):
  fname = get_page_filename(num)
  src_path = os.path.join(src_dir, fname)
  dst_path = os.path.join(og_dir, f'page{num}.jpg')

  if os.path.exists(src_path):
    with Image.open(src_path) as img:
      # Convert RGBA/P to RGB for JPEG
      if img.mode in ('RGBA', 'P'):
        img = img.convert('RGB')
      
      # Resize to ensure max dimension <= 1000px (WhatsApp link card ideal)
      img.thumbnail((1000, 1333), Image.Resampling.LANCZOS)
      
      # Save as JPEG with quality 78 (guarantees size < 200KB for WhatsApp)
      img.save(dst_path, 'JPEG', quality=78, optimize=True)
      size_kb = os.path.getsize(dst_path) / 1024
      print(f"Page {num} ({fname}) -> page{num}.jpg ({size_kb:.1f} KB)")
      converted += 1

print(f"Converted {converted} magazine pages to WhatsApp JPEG thumbnails (< 200 KB)!")
