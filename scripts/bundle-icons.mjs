import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataIconsDir = path.resolve(__dirname, '../data/icons');
const outputPath = path.resolve(__dirname, '../public/icons.json');

if (!fs.existsSync(dataIconsDir)) {
  console.warn('⚠️ data/icons directory does not exist, skipping bundle.');
  process.exit(0);
}

const files = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));
const icons = [];

for (const file of files) {
  try {
    const filePath = path.join(dataIconsDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.name && parsed.svg) {
      // Auto-strip any accidental Figma canvas background rectangle
      const cleanedSvg = parsed.svg.replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '').trim();
      if (cleanedSvg !== parsed.svg.trim()) {
        parsed.svg = cleanedSvg;
        fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');
      }

      icons.push({
        name: parsed.name.trim(),
        category: (parsed.category || 'General').trim(),
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        svg: cleanedSvg,
      });
    }
  } catch (err) {
    console.error(`⚠️ Failed to parse ${file}:`, err.message);
  }
}

// Sort alphabetically by name
icons.sort((a, b) => a.name.localeCompare(b.name));

// 1. Write to public/icons.json (GlyphVault Studio format)
fs.writeFileSync(outputPath, JSON.stringify({ icons }, null, 2), 'utf-8');
console.log(`✅ Bundled ${icons.length} individual icons into ${outputPath}`);

// 2. Write to public/glyph.json (Official Iconify Collection format for Nuxt & UIcon)
const iconifyIcons = {};
for (const icon of icons) {
  const body = icon.svg
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '')
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>/gi, '')
    .replace(/stroke="black"/gi, 'stroke="currentColor"')
    .replace(/stroke="#000000"/gi, 'stroke="currentColor"')
    .replace(/fill="black"/gi, 'fill="currentColor"')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .trim();

  iconifyIcons[icon.name] = {
    body,
  };
}

const iconifyCollection = {
  prefix: 'glyph',
  lastModified: Math.floor(Date.now() / 1000),
  width: 24,
  height: 24,
  icons: iconifyIcons,
  info: {
    name: 'GlyphVault',
    total: icons.length,
    license: {
      title: 'MIT',
    },
  },
};

const iconifyOutputPath = path.resolve(__dirname, '../public/glyph.json');
fs.writeFileSync(iconifyOutputPath, JSON.stringify(iconifyCollection, null, 2), 'utf-8');
console.log(`✅ Generated Iconify collection (${icons.length} icons) into ${iconifyOutputPath}`);
