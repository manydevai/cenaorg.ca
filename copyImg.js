const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, "BLACK CONSCIOUSNESS DAY", "Héritage d'Éxcelence Les Noirqui font l'Histoire (28 fev 2026) Monsieur Natilien Joseph – Député de Longueuil—Saint-Hubert_oficiel.webp");
const dest = path.join(__dirname, "public", "gallery", "Héritage d'Éxcelence Les Noirqui font l'Histoire (28 fev 2026) Monsieur Natilien Joseph – Député de Longueuil—Saint-Hubert_oficiel.webp");

fs.copyFileSync(src, dest);
console.log('Copy successful.');
