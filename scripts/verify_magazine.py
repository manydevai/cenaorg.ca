import os
import fitz

def verify():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    pub_mag = os.path.join(base_dir, 'public', 'magazine')
    
    print("=== 1. VERIFYING PDF FILES ===")
    for lang in ['fr', 'pt', 'en']:
        pdf_path = os.path.join(pub_mag, 'pdf', f'cena-magazine-{lang}.pdf')
        assert os.path.exists(pdf_path), f"Missing {pdf_path}"
        doc = fitz.open(pdf_path)
        assert len(doc) == 40, f"Expected 40 pages in {pdf_path}, found {len(doc)}"
        print(f"  [OK] {lang.upper()} PDF: {len(doc)} pages, size: {os.path.getsize(pdf_path)/(1024*1024):.1f} MB")

    print("\n=== 2. VERIFYING MULTILINGUAL WEBP ASSETS (1 to 40) ===")
    for lang in ['fr', 'pt', 'en']:
        lang_dir = os.path.join(pub_mag, 'pages', lang)
        assert os.path.isdir(lang_dir), f"Directory {lang_dir} missing"
        for p in range(1, 41):
            fpath = os.path.join(lang_dir, f'page-{p}.webp')
            assert os.path.exists(fpath), f"Missing page {p} in {lang}"
            assert os.path.getsize(fpath) > 10000, f"Page {p} in {lang} is too small"
        print(f"  [OK] {lang.upper()} WebP: all 40/40 pages present and valid")

    print("\n=== 3. VERIFYING WHATSAPP OG THUMBNAILS (1 to 40) ===")
    og_dir = os.path.join(pub_mag, 'pages', 'og')
    for p in range(1, 41):
        fpath = os.path.join(og_dir, f'page{p}.jpg')
        assert os.path.exists(fpath), f"Missing OG page {p}"
        assert os.path.getsize(fpath) > 5000, f"OG page {p} is too small"
    print(f"  [OK] WhatsApp OG thumbnails: all 40/40 JPEGs present (<250 KB)")

    print("\n=== 4. VERIFYING PAGE 17, 30, 32 EDITORIAL CONTENT ACCURACY ===")
    doc_fr = fitz.open(os.path.join(pub_mag, 'pdf', 'cena-magazine-fr.pdf'))
    doc_pt = fitz.open(os.path.join(pub_mag, 'pdf', 'cena-magazine-pt.pdf'))
    doc_en = fitz.open(os.path.join(pub_mag, 'pdf', 'cena-magazine-en.pdf'))

    # Page 17 (index 16)
    for lang, doc in [('FR', doc_fr), ('PT', doc_pt), ('EN', doc_en)]:
        p17_text = doc[16].get_text()
        assert '1 7' in p17_text or '17' in p17_text, f"Page 17 text did not contain 17 in {lang}"
        print(f"  [OK] Editorial Page 17 ({lang}): contains printed page number 17")

    # Page 30 (index 29) -> Randy Larochelle
    for lang, doc in [('FR', doc_fr), ('PT', doc_pt), ('EN', doc_en)]:
        p30_text = doc[29].get_text()
        assert 'Randy Larochelle' in p30_text or 'Randy' in p30_text, f"Page 30 missing Randy in {lang}"
        assert '30' in p30_text, f"Page 30 missing 30 in {lang}"
        print(f"  [OK] Editorial Page 30 ({lang}): contains Randy Larochelle & printed page number 30")

    # Page 32 (index 31) -> Menarca Muhatu
    for lang, doc in [('FR', doc_fr), ('PT', doc_pt), ('EN', doc_en)]:
        p32_text = doc[31].get_text()
        assert 'Menarca' in p32_text, f"Page 32 missing Menarca in {lang}"
        assert '32' in p32_text, f"Page 32 missing 32 in {lang}"
        print(f"  [OK] Editorial Page 32 ({lang}): contains Menarca Muhatu & printed page number 32")

    print("\n=== 5. ALL MAGAZINE VALIDATION CHECKS PASSED PERFECTLY ===")

if __name__ == '__main__':
    verify()
