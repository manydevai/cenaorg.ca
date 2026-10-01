import fs from 'fs';

const files = [
  'dist/index.html',
  'dist/magazine/index.html',
  'dist/magazine/pt/index.html',
  'dist/magazine/fr/index.html',
  'dist/magazine/en/index.html',
  'dist/natal-solidario/index.html',
  'dist/campagne-noel/index.html',
  'dist/christmas-campaign/index.html'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf-8');
    const mTitle = c.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
    const mImg = c.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
    console.log(`==> ${f}`);
    console.log(`   Title: ${mTitle ? mTitle[1] : 'NONE'}`);
    console.log(`   Image: ${mImg ? mImg[1] : 'NONE'}`);
  } else {
    console.log(`==> ${f} NOT FOUND`);
  }
}
