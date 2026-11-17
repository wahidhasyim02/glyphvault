import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, '../public/assets/icons');
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

// Category classifier
function getCategory(name) {
  if (name.startsWith('arrow-') || name.startsWith('a-arrow-')) return 'Arrows';
  if (name.startsWith('chevron-') || name.startsWith('chevrons-')) return 'Navigation';
  if (name.startsWith('align-')) return 'Alignment';
  if (name.startsWith('alarm-')) return 'Time & Alarms';
  if (name.startsWith('app-window')) return 'Interface';
  if (name.startsWith('circle-')) return 'Shapes & Badges';
  if (name.startsWith('air-') || name.startsWith('airplay')) return 'Devices & Tech';
  if (name.startsWith('ampersand')) return 'Typography';
  if (['ambulance', 'sirine'].includes(name)) return 'Emergency & Alerts';
  if (['accessibility', 'activity'].includes(name)) return 'Interface & Health';
  if (['amphora', 'anchor', 'anvil', 'angle', 'angle-1', 'aperture'].includes(name)) return 'Objects & Geometry';
  return 'General';
}

function getTags(name, category) {
  const parts = name.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const tagSet = new Set(['inalix', category.toLowerCase(), ...parts]);
  if (name.includes('arrow') || name.includes('chevron')) {
    tagSet.add('direction');
  }
  if (name.includes('clock') || name.includes('alarm')) {
    tagSet.add('time');
  }
  if (name.includes('align')) {
    tagSet.add('layout');
  }
  return Array.from(tagSet);
}

const icons = [];

for (const file of files) {
  const filePath = path.join(iconsDir, file);
  // Read exact content without altering points or coordinates
  const rawSvg = fs.readFileSync(filePath, 'utf-8').trim();
  const cleanName = file.replace(/^inalix_/, '').replace(/\.svg$/, '');
  const category = getCategory(cleanName);
  const tags = getTags(cleanName, category);

  icons.push({
    name: cleanName,
    category,
    tags,
    svg: rawSvg
  });
}

// Sort alphabetically by name
icons.sort((a, b) => a.name.localeCompare(b.name));

console.log(`Generated ${icons.length} icon definitions.`);

// Write directly to public/icons.json as an object with "icons" list (Sveltia CMS & Nuxt compatible)
const outputPath = path.resolve(__dirname, '../public/icons.json');
fs.writeFileSync(outputPath, JSON.stringify({ icons }, null, 2), 'utf-8');
console.log(`Successfully written to ${outputPath}`);
