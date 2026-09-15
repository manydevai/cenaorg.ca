import os
import fitz
from PIL import Image

def generate_pages():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pdf_dir = os.path.join(base_dir, 'public', 'magazine', 'pdf')
    pages_base_dir = os.path.join(base_dir, 'public', 'magazine', 'pages')
    og_dir = os.path.join(pages_base_dir, 'og')

    os.makedirs(og_dir, exist_ok=True)

    editions = [
        ('fr', 'cena-magazine-fr.pdf'),
        ('pt', 'cena-magazine-pt.pdf'),
        ('en', 'cena-magazine-en.pdf'),
    ]

    mat = fitz.Matrix(2.0, 2.0) # ~144 DPI for crisp, high-res reading

    for lang, pdf_name in editions:
        lang_dir = os.path.join(pages_base_dir, lang)
        os.makedirs(lang_dir, exist_ok=True)
        pdf_path = os.path.join(pdf_dir, pdf_name)

        if not os.path.exists(pdf_path):
            print(f"Error: PDF not found: {pdf_path}")
            continue

        doc = fitz.open(pdf_path)
        total = len(doc)
        print(f"\nProcessing {lang.upper()} ({pdf_name}) - {total} pages...")

        for p in range(total):
            pageNum = p + 1
            page = doc[p]
            pix = page.get_pixmap(matrix=mat, alpha=False)
            img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)

            # Save clean multilingual webp
            webp_path = os.path.join(lang_dir, f"page-{pageNum}.webp")
            img.save(webp_path, format='WEBP', quality=82, method=4)

            # If English, also save backward-compatible legacy filenames
            if lang == 'en':
                if pageNum == 1:
                    legacy_path = os.path.join(pages_base_dir, 'MAG_-_ENGLISH_VERSION.webp')
                else:
                    legacy_path = os.path.join(pages_base_dir, f'MAG_-_ENGLISH_VERSION{pageNum}.webp')
                img.save(legacy_path, format='WEBP', quality=82, method=4)

                # Also save OG JPEG for WhatsApp/Social sharing (< 200KB)
                og_img = img.copy()
                og_img.thumbnail((1000, 1333), Image.Resampling.LANCZOS)
                og_path = os.path.join(og_dir, f"page{pageNum}.jpg")
                og_img.save(og_path, format='JPEG', quality=78, optimize=True)

            print(f"  [{lang.upper()}] Page {pageNum:2d}/{total} -> {os.path.getsize(webp_path)//1024} KB")

    print("\nAll magazine page assets successfully generated!")

if __name__ == '__main__':
    generate_pages()
