import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.resolve(__dirname, '../public/assets/icons');
const jsonDir = path.resolve(__dirname, '../data/icons');

const svgFiles = fs.readdirSync(svgDir).filter((f) => f.startsWith('iconix_') && f.endsWith('.svg'));
console.log(`Found ${svgFiles.length} SVGs in ${svgDir}`);

let updatedCount = 0;
let newCount = 0;

for (const svgFile of svgFiles) {
  const iconName = svgFile.replace(/^iconix_/, '').replace(/\.svg$/, '');
  const jsonPath = path.join(jsonDir, `${iconName}.json`);

  const rawSvg = fs.readFileSync(path.join(svgDir, svgFile), 'utf-8');
  // Auto-clean any Figma canvas 24x24 rect
  const cleanedSvg = rawSvg
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
    .trim();

  // Also clean the svg file itself if it contained the Figma 24x24 canvas rect
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
    // Determine category based on prefix
    let category = 'General';
    if (iconName.startsWith('arrow') || iconName.startsWith('chevron')) category = 'Arrows';
    else if (iconName.startsWith('monitor') || iconName.startsWith('laptop') || iconName.startsWith('tv') || iconName.startsWith('tablet') || iconName.startsWith('smartphone') || iconName.startsWith('pc')) category = 'Devices';
    else if (iconName.startsWith('pen') || iconName.startsWith('pencil')) category = 'Design';
    else if (iconName.startsWith('align')) category = 'Layout';
    else if (iconName.startsWith('bell') || iconName.startsWith('alarm')) category = 'Notifications';
    else if (iconName.startsWith('circle') || iconName.startsWith('check')) category = 'System';
    else if (iconName.startsWith('save')) category = 'Files';
    else if (iconName.startsWith('video') || iconName.startsWith('camera') || iconName.startsWith('speaker')) category = 'Media';

    // Tags
    const tags = iconName.split('-');
    if (iconName.includes('plus')) tags.push('add');
    if (iconName.includes('minus')) tags.push('remove');

    jsonData = {
      name: iconName,
      category,
      tags: [...new Set(tags)],
    };
    newCount++;
  }

  // Ensure tags include add/remove for plus/minus
  const tagSet = new Set(Array.isArray(jsonData.tags) ? jsonData.tags : []);
  if (iconName.includes('plus')) tagSet.add('add');
  if (iconName.includes('minus')) tagSet.add('remove');
  jsonData.tags = Array.from(tagSet);

  if (jsonData.svg !== cleanedSvg) {
    jsonData.svg = cleanedSvg;
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2) + '\n', 'utf-8');
    updatedCount++;
    console.log(`Updated JSON for ${iconName}`);
  }
}

console.log(`✅ Sync complete: ${updatedCount} updated, ${newCount} newly created.`);
