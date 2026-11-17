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
    const raw = fs.readFileSync(path.join(dataIconsDir, file), 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.name && parsed.svg) {
      icons.push({
        name: parsed.name.trim(),
        category: (parsed.category || 'General').trim(),
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        svg: parsed.svg.trim(),
      });
    }
  } catch (err) {
    console.error(`⚠️ Failed to parse ${file}:`, err.message);
  }
}

// Sort alphabetically by name
icons.sort((a, b) => a.name.localeCompare(b.name));

// Write to public/icons.json (both with "icons" list and root array support)
fs.writeFileSync(outputPath, JSON.stringify({ icons }, null, 2), 'utf-8');
console.log(`✅ Bundled ${icons.length} individual icons into ${outputPath}`);
