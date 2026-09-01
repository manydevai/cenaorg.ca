import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const domain = 'https://cena-ca.org';
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, 'utf-8');

// Page metadata details for Open Graph tags
const PAGE_META_MAP = {
  5: {
    title: "Cristina Indira MANUEL — Fondatrice & Présidente | CENA Magazine 2026",
    description: "« Ne quittez pas ce monde sans accepter Jésus-Christ comme votre Seigneur et Sauveur. Choisissez l'unité plutôt que la division et construisons un héritage durable. »"
  },
  6: {
    title: "Marileny F. ANTONIO — Vice-Présidente CENA | CENA Magazine 2026",
    description: "« Le plus grand succès se bâtit sur la Parole de Dieu. Lorsque le Christ est notre fondation, la foi devient plus forte que la peur. »"
  },
  7: {
    title: "Sebastião Matano Sala — Directeur Financier & Fondateur | CENA Magazine 2026",
    description: "« N'oubliez jamais d'où vous venez, mais ne laissez jamais vos origines limiter où vous pouvez aller. Le succès se mesure à l'impact positif que nous créons. »"
  },
  8: {
    title: "Dulce Angelina FIGUEIREDO — Directrice des RH CENA | CENA Magazine 2026",
    description: "« Je crois que chaque personne possède un objectif unique. Ayez foi en Dieu, croyez en vous-même et n'abandonnez jamais vos rêves. »"
  },
  9: {
    title: "Daniel Love Fernando ANTÓNIO — Directeur Jeunesse | CENA Magazine 2026",
    description: "« La vie est comme un arbre. Chaque saison a un but. Restez enraciné, continuez à grandir et n'abandonnez jamais le voyage. »"
  },
  10: {
    title: "Randy Larochelle — Vision & Engagement | CENA Magazine 2026",
    description: "« Croyez en votre vision, travaillez avec passion et laissez votre travail parler d'lui-même. Le véritable succès se bâtit sur l'intégrité. »"
  },
  11: {
    title: "Candor's Cake — L'Art de Célébrer la Vie | CENA Magazine 2026",
    description: "Fondé par Marileny Fernando Antonio, Candor's Cake transforme chaque événement marquant en un souvenir inoubliable grâce à la haute pâtisserie."
  },
  12: {
    title: "Candor's Cake — Haute Pâtisserie & Créations Exclusives | CENA Magazine 2026",
    description: "Découvrez la galerie de créations de gâteaux d'exception et la passion de Candor's Cake dans la magazine CENA 2026."
  },
  13: {
    title: "Samara ARCHANGE, MBA — Co-Fondatrice DGA Commercial | CENA Magazine 2026",
    description: "« N'abandonnez jamais vos rêves avant d'avoir cherché les meilleurs conseils. Le savoir, la préparation et la détermination concrétisent chaque vision. »"
  },
  14: {
    title: "Samara ARCHANGE, MBA — Financement Commercial & Immobilier | CENA Magazine 2026",
    description: "Conseils et accompagnement stratégique en financement commercial et immobilier avec Samara Archange, MBA."
  },
  15: {
    title: "Magalie Sabine Jean-Louis — Courtier Immobilier Résidentiel | CENA Magazine 2026",
    description: "« Ne laissez jamais la complexité du marché immobilier d'aujourd'hui vous décourager. Devenir propriétaire est possible avec une préparation adéquate. »"
  },
  16: {
    title: "Neccy LM — Leadership Féminin & Croissance Personnelle | CENA Magazine 2026",
    description: "« N'abandonnez jamais. Les défis auxquels vous faites face aujourd'hui peuvent devenir le fondement des victoires de demain. »"
  },
  17: {
    title: "Association Menarca Muhatu — Dignité & Éducation | CENA Magazine 2026",
    description: "Fondée par Divina Ndomateso Ntele, l'association combat la précarité menstruelle et promeut l'éducation, la dignité et l'égalité des filles."
  },
  18: {
    title: "Mrs. Shirley DORISMOND — Membre de l'Assemblée Nationale | CENA Magazine 2026",
    description: "Parcours inspirant de Mme Shirley Dorismond, députée et figure d'engagement communautaire au Québec."
  },
  19: {
    title: "Essential Micro Hair — Confiance & Beauté Naturelle | CENA Magazine 2026",
    description: "Spécialisé dans les micro-locs et les coiffures protectrices sur mesure pour célébrer la beauté naturelle et autonomiser chaque cliente."
  },
  20: {
    title: "Essential Micro Hair — Micro-Locs & Coiffures Protectrices | CENA Magazine 2026",
    description: "Galerie et portfolio des créations capillaires protectrices sur mesure par Essential Micro Hair."
  },
  21: {
    title: "Zen Dans Ma Tête — Promotion de la Santé Mentale | CENA Magazine 2026",
    description: "Organisme dédié à la promotion de la santé mentale et du bien-être émotionnel inclusif au sein des communautés afro-descendantes."
  },
  22: {
    title: "Zen Dans Ma Tête — Bien-être Émotionnel & Inclusivité | CENA Magazine 2026",
    description: "Inclusion, soutien psychologique et ateliers de sensibilisation à la santé mentale pour la jeunesse et les familles."
  },
  23: {
    title: "Randy Selection — Photographe Professionnel & Entrepreneur | CENA Magazine 2026",
    description: "Capturer les moments les plus précieux de la vie avec élégance et maestria visuelle pour des mariages et des événements inoubliables."
  },
  24: {
    title: "Randy Selection — Portfólio de Fotografia & Événements | CENA Magazine 2026",
    description: "Découvrez le travail artistique et événementiel d'exception de Randy Selection."
  },
  25: {
    title: "Randy Selection — Photographie de Mode & Portrait | CENA Magazine 2026",
    description: "Portraits de mode et récits visuels captivants signés Randy Selection."
  },
  26: {
    title: "Val Nettoyage et Entretien — L'Excellence du Service | CENA Magazine 2026",
    description: "« Croyez toujours en votre potentiel et n'ayez jamais peur de faire le premier pas. Le succès se bâtit avec travail, persévérance et honnêteté. »"
  },
  27: {
    title: "Black Sable Group — Innovation & Leadership | CENA Magazine 2026",
    description: "Vision d'affaires, leadership et expansion stratégique du Black Sable Group."
  },
  28: {
    title: "Groupe Multizone — Services & Partenariats | CENA Magazine 2026",
    description: "Présentation des services et solutions multiactivités du Groupe Multizone."
  }
};

function getPageSrc(pageNum) {
  return `/magazine/pages/og/page${pageNum}.jpg`;
}

function createPreRenderedHtml(title, description, imagePath, pageUrlPath) {
  const fullImageUrl = `${domain}${imagePath}`;
  const fullPageUrl = `${domain}${pageUrlPath}`;

  let html = template;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/gi,
    `<meta name="description" content="${description}" />`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:image" content="${fullImageUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:type"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:image:type" content="image/jpeg" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/gi,
    `<meta property="og:url" content="${fullPageUrl}" />`
  );

  // Replace Twitter Tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:description" content="${description}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/gi,
    `<meta name="twitter:image" content="${fullImageUrl}" />`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/gi,
    `<link rel="canonical" href="${fullPageUrl}" />`
  );

  return html;
}

function writeHtmlFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

console.log('🚀 Generating static Open Graph pre-rendered pages with WhatsApp JPEG images...');

let count = 0;

// 1. Generate Magazine Pages (1 to 40)
for (let num = 1; num <= 40; num++) {
  const imagePath = getPageSrc(num);
  const meta = PAGE_META_MAP[num] || {
    title: `CENA Magazine 2026 — Página ${num}`,
    description: `Découvrez la página ${num} de la revista CENA Magazine 2026 (Édition Spéciale).`
  };

  const htmlContent = createPreRenderedHtml(meta.title, meta.description, imagePath, `/magazine/page/${num}`);

  // Write to dist/magazine/page/11/index.html
  writeHtmlFile(path.join(distDir, 'magazine', 'page', String(num), 'index.html'), htmlContent);
  // Write to dist/magazine/page11.html
  writeHtmlFile(path.join(distDir, 'magazine', `page${num}.html`), htmlContent);
  // Write to dist/magazine/p${num}.html
  writeHtmlFile(path.join(distDir, 'magazine', `p${num}.html`), htmlContent);
  // Write to dist/magazine/p/${num}/index.html
  writeHtmlFile(path.join(distDir, 'magazine', 'p', String(num), 'index.html'), htmlContent);

  count += 4;
}

// 2. Generate Blog Pages
const BLOG_META_MAP = [
  {
    slug: 'heritage-excellence',
    title: "Heritage & Excellence: Les Noirs qui font l'Histoire | CENA Blog",
    description: "Édition spéciale célébrant les leaders et entrepreneurs d'excellence de la communauté lusophone au Canada.",
    image: "/gallery/heritage-excellence-leaders.webp"
  },
  {
    slug: 'black-consciousness',
    title: "Échos de l'Ancestralité — Mois de la Conscience Noire | CENA Blog",
    description: "La collaboration entre CENA e CAF a donné naissance à une célébration d'exception à Montréal.",
    image: "/gallery/Mes-da-consciencianegra-cena-caf/cultura-africana.webp"
  },
  {
    slug: 'cena-incubator',
    title: "Incubadora CENA: Autonomisation & Entrepreneuriat | CENA Blog",
    description: "Soutenir l'innovation et les projets d'affaires de la diaspora lusophone au Canada.",
    image: "/gallery/cena-incubadora.jpg"
  }
];

for (const blog of BLOG_META_MAP) {
  const htmlContent = createPreRenderedHtml(blog.title, blog.description, blog.image, `/blog/${blog.slug}`);
  writeHtmlFile(path.join(distDir, 'blog', blog.slug, 'index.html'), htmlContent);
  writeHtmlFile(path.join(distDir, 'blog', `${blog.slug}.html`), htmlContent);
  count += 2;
}

console.log(`✅ Successfully generated ${count} pre-rendered static HTML pages with WhatsApp JPEG Open Graph tags!`);
