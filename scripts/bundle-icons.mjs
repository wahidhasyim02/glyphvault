import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.resolve(__dirname, '../public/assets/icons');
const dataIconsDir = path.resolve(__dirname, '../data/icons');
const iconsJsonPath = path.resolve(__dirname, '../public/icons.json');
const iconixJsonPath = path.resolve(__dirname, '../public/iconix.json');

if (!fs.existsSync(dataIconsDir)) {
  fs.mkdirSync(dataIconsDir, { recursive: true });
}
if (!fs.existsSync(svgDir)) {
  fs.mkdirSync(svgDir, { recursive: true });
}

// ----------------------------------------------------
// Step 1: Two-Way Sync between public/assets/icons/ and data/icons/
// ----------------------------------------------------

// 1A. Sync from data/icons/*.json -> public/assets/icons/iconix_*.svg
// (Ensures icons added or edited in Decap CMS are exported as SVGs)
const jsonFiles = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));
for (const jsonFile of jsonFiles) {
  try {
    const rawJson = fs.readFileSync(path.join(dataIconsDir, jsonFile), 'utf-8');
    const parsed = JSON.parse(rawJson);
    const iconName = (parsed.name || jsonFile.replace(/\.json$/, '')).trim();
    if (parsed.svg) {
      const cleanedSvg = parsed.svg
        .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
        .trim();

      const targetSvgPath = path.join(svgDir, `iconix_${iconName}.svg`);
      if (!fs.existsSync(targetSvgPath)) {
        fs.writeFileSync(targetSvgPath, cleanedSvg + '\n', 'utf-8');
        console.log(`✨ Generated SVG from CMS for ${iconName}`);
      }
    }
  } catch (err) {
    console.error(`⚠️ Error reading ${jsonFile}:`, err.message);
  }
}

// 1B. Sync from public/assets/icons/iconix_*.svg -> data/icons/*.json
// (Ensures SVGs copied from Figma are cataloged in data/icons/)
const svgFiles = fs.readdirSync(svgDir).filter((f) => (f.startsWith('iconix_') || f.startsWith('iconix_')) && f.endsWith('.svg'));
for (const svgFile of svgFiles) {
  const iconName = svgFile.replace(/^(iconix_|iconix_)/, '').replace(/\.svg$/, '');
  const jsonPath = path.join(dataIconsDir, `${iconName}.json`);

  const rawSvg = fs.readFileSync(path.join(svgDir, svgFile), 'utf-8');
  const cleanedSvg = rawSvg
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
    .trim();

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
    let category = 'General UI';
    if (iconName.startsWith('arrow') || iconName.startsWith('a-arrow-')) category = 'Arrows';
    else if (iconName.startsWith('chevron')) category = 'Navigation';
    else if (iconName.startsWith('align')) category = 'Alignment';
    else if (iconName.startsWith('alarm') || iconName.startsWith('clock')) category = 'Time & Alarms';
    else if (iconName.startsWith('bell') || iconName === 'ambulance' || iconName === 'siren') category = 'Emergency & Alerts';
    else if (iconName.startsWith('circle') || iconName.startsWith('check')) category = 'Shapes & Badges';
    else if (
      iconName.startsWith('save') ||
      iconName.startsWith('file') ||
      iconName.startsWith('folder')
    ) {
      category = 'Files & Folders';
    }
    else if (
      iconName.startsWith('pen') ||
      iconName.startsWith('pencil') ||
      iconName.includes('brush') ||
      iconName === 'highlighter'
    ) {
      category = 'Design & Tools';
    }
    else if (
      iconName.startsWith('monitor') ||
      iconName.startsWith('laptop') ||
      iconName.startsWith('tv') ||
      iconName.startsWith('tablet') ||
      iconName.startsWith('smartphone') ||
      iconName.startsWith('pc') ||
      iconName.startsWith('speaker') ||
      iconName.startsWith('air-') ||
      iconName.startsWith('airplay') ||
      iconName.startsWith('video') ||
      iconName.startsWith('camera') ||
      iconName.startsWith('plug')
    ) {
      category = 'Devices & Tech';
    } else if (
      iconName.startsWith('shield') ||
      iconName.startsWith('lock') ||
      iconName.startsWith('key')
    ) {
      category = 'Security & System';
    } else if (
      iconName.startsWith('mirror') ||
      iconName.startsWith('plane') ||
      ['amphora', 'anchor', 'anvil', 'angle', 'aperture'].includes(iconName)
    ) {
      category = 'Objects & Geometry';
    } else if (['a-large-small', 'ampersand', 'ampersands', 'case-sensitive'].includes(iconName)) {
      category = 'Typography';
    } else if (['accessibility', 'activity', 'trash', 'trash-off'].includes(iconName)) {
      category = 'Interface & Health';
    } else if (iconName === 'apple') {
      category = 'Weather & Nature';
    } else if (
      iconName.startsWith('search') ||
      iconName.startsWith('user') ||
      iconName.startsWith('house') ||
      iconName.startsWith('flag') ||
      ['group', 'heart', 'app-window', 'app-window-mac'].includes(iconName)
    ) {
      category = 'General UI';
    }

    jsonData = {
      name: iconName,
      category,
      tags: ['iconix', iconName, ...iconName.split('-')],
    };
  }

  // Auto-tag plus -> add, minus -> remove
  const tagSet = new Set(Array.isArray(jsonData.tags) ? jsonData.tags : []);
  if (iconName.includes('plus')) tagSet.add('add');
  if (iconName.includes('minus')) tagSet.add('remove');
  jsonData.tags = Array.from(tagSet);

  if (jsonData.svg !== cleanedSvg || (!jsonData.tags.includes('add') && iconName.includes('plus'))) {
    jsonData.svg = cleanedSvg;
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
  }
}

// ----------------------------------------------------
// Step 2: Bundle all data/icons/*.json into public/icons.json & public/iconix.json
// ----------------------------------------------------
const finalFiles = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));
const icons = [];

for (const file of finalFiles) {
  try {
    const filePath = path.join(dataIconsDir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.name && parsed.svg) {
      const cleanedSvg = parsed.svg.replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '').trim();
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

// 1. Write public/icons.json (Iconix Studio format)
fs.writeFileSync(iconsJsonPath, JSON.stringify({ icons }, null, 2), 'utf-8');
console.log(`✅ Bundled ${icons.length} individual icons into ${iconsJsonPath}`);

// 2. Write public/iconix.json (Official Iconify Collection format for Nuxt & @nuxt/icon)
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

let existingCollection = null;
if (fs.existsSync(iconixJsonPath)) {
  try {
    existingCollection = JSON.parse(fs.readFileSync(iconixJsonPath, 'utf-8'));
  } catch {}
}

const iconsUnchanged =
  existingCollection &&
  existingCollection.info?.total === icons.length &&
  JSON.stringify(existingCollection.icons) === JSON.stringify(iconifyIcons);

const lastModified = iconsUnchanged && existingCollection?.lastModified
  ? existingCollection.lastModified
  : Math.floor(Date.now() / 1000);

const iconifyCollection = {
  prefix: 'iconix',
  lastModified,
  width: 24,
  height: 24,
  icons: iconifyIcons,
  info: {
    name: 'Iconix',
    total: icons.length,
    license: {
      title: 'MIT',
    },
  },
};

fs.writeFileSync(iconixJsonPath, JSON.stringify(iconifyCollection, null, 2), 'utf-8');
console.log(`✅ Generated Iconify collection (${icons.length} icons) into ${iconixJsonPath}`);
