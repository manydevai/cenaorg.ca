import os
from PIL import Image

src_dir = os.path.join(os.getcwd(), 'public', 'magazine', 'pages', 'en')
og_dir = os.path.join(os.getcwd(), 'public', 'magazine', 'pages', 'og')
os.makedirs(og_dir, exist_ok=True)

converted = 0
for num in range(1, 41):
    src_path = os.path.join(src_dir, f'page-{num}.webp')
    dst_path = os.path.join(og_dir, f'page{num}.jpg')

    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            img.thumbnail((1000, 1333), Image.Resampling.LANCZOS)
            img.save(dst_path, 'JPEG', quality=78, optimize=True)
            size_kb = os.path.getsize(dst_path) / 1024
            print(f"Page {num:2d} -> page{num}.jpg ({size_kb:.1f} KB)")
            converted += 1

print(f"Successfully generated {converted}/40 WhatsApp JPEG thumbnails in 1-to-1 editorial order!")
