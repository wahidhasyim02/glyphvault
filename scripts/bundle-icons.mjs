import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.resolve(__dirname, '../public/assets/icons');
const dataIconsDir = path.resolve(__dirname, '../data/icons');
const iconsJsonPath = path.resolve(__dirname, '../public/icons.json');
const glyphJsonPath = path.resolve(__dirname, '../public/glyph.json');

if (!fs.existsSync(dataIconsDir)) {
  fs.mkdirSync(dataIconsDir, { recursive: true });
}

// ----------------------------------------------------
// Step 1: Auto-sync SVGs from public/assets/icons/ -> data/icons/
// ----------------------------------------------------
if (fs.existsSync(svgDir)) {
  const svgFiles = fs.readdirSync(svgDir).filter((f) => f.startsWith('glyph_') && f.endsWith('.svg'));
  let syncedCount = 0;

  for (const svgFile of svgFiles) {
    const iconName = svgFile.replace(/^glyph_/, '').replace(/\.svg$/, '');
    const jsonPath = path.join(dataIconsDir, `${iconName}.json`);

    const rawSvg = fs.readFileSync(path.join(svgDir, svgFile), 'utf-8');
    const cleanedSvg = rawSvg
      .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
      .trim();

    // Clean SVG file itself if it still had the Figma canvas background
    if (rawSvg !== cleanedSvg) {
      fs.writeFileSync(path.join(svgDir, svgFile), cleanedSvg + '\n', 'utf-8');
    }

    let jsonData;
    if (fs.existsSync(jsonPath)) {
      try {
        jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      } catch {
        jsonData = { name: iconName, category: 'General', tags: [] };
      }
    } else {
      let category = 'General';
      if (iconName.startsWith('arrow') || iconName.startsWith('chevron')) category = 'Arrows';
      else if (iconName.startsWith('monitor') || iconName.startsWith('laptop') || iconName.startsWith('tv') || iconName.startsWith('tablet') || iconName.startsWith('smartphone') || iconName.startsWith('pc')) category = 'Devices';
      else if (iconName.startsWith('pen') || iconName.startsWith('pencil')) category = 'Design';
      else if (iconName.startsWith('align')) category = 'Layout';
      else if (iconName.startsWith('bell') || iconName.startsWith('alarm')) category = 'Notifications';
      else if (iconName.startsWith('circle') || iconName.startsWith('check')) category = 'System';
      else if (iconName.startsWith('save')) category = 'Files';
      else if (iconName.startsWith('video') || iconName.startsWith('camera') || iconName.startsWith('speaker')) category = 'Media';

      jsonData = {
        name: iconName,
        category,
        tags: iconName.split('-'),
      };
    }

    // Auto-tag plus -> add, minus -> remove
    const tagSet = new Set(Array.isArray(jsonData.tags) ? jsonData.tags : []);
    if (iconName.includes('plus')) tagSet.add('add');
    if (iconName.includes('minus')) tagSet.add('remove');
    jsonData.tags = Array.from(tagSet);

    if (jsonData.svg !== cleanedSvg || !jsonData.tags.includes('add') && iconName.includes('plus')) {
      jsonData.svg = cleanedSvg;
      fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
      syncedCount++;
    }
  }

  if (syncedCount > 0) {
    console.log(`🔄 Synced ${syncedCount} SVG files to data/icons/*.json`);
  }
}

// ----------------------------------------------------
// Step 2: Bundle all data/icons/*.json into public/icons.json & public/glyph.json
// ----------------------------------------------------
const files = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));
const icons = [];

for (const file of files) {
  try {
    const filePath = path.join(dataIconsDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.name && parsed.svg) {
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

icons.sort((a, b) => a.name.localeCompare(b.name));

// 1. Write public/icons.json (GlyphVault Studio format)
fs.writeFileSync(iconsJsonPath, JSON.stringify({ icons }, null, 2), 'utf-8');
console.log(`✅ Bundled ${icons.length} individual icons into ${iconsJsonPath}`);

// 2. Write public/glyph.json (Official Iconify Collection format for Nuxt & @nuxt/icon)
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

fs.writeFileSync(glyphJsonPath, JSON.stringify(iconifyCollection, null, 2), 'utf-8');
console.log(`✅ Generated Iconify collection (${icons.length} icons) into ${glyphJsonPath}`);
