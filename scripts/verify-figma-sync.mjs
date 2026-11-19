import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgDir = path.resolve(__dirname, '../public/assets/icons');
const jsonDir = path.resolve(__dirname, '../data/icons');
const iconsJsonPath = path.resolve(__dirname, '../public/icons.json');
const iconixJsonPath = path.resolve(__dirname, '../public/iconix.json');

const svgFiles = fs.readdirSync(svgDir).filter((f) => (f.startsWith('iconix_') || f.startsWith('iconix_')) && f.endsWith('.svg'));
console.log(`Checking ${svgFiles.length} SVGs from Figma folder...`);

let mismatchCount = 0;
let matchCount = 0;
const mismatches = [];

for (const svgFile of svgFiles) {
  const iconName = svgFile.replace(/^(iconix_|iconix_)/, '').replace(/\.svg$/, '');
  const jsonPath = path.join(jsonDir, `${iconName}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.log(`❌ MISSING JSON for: ${iconName}`);
    mismatches.push({ iconName, reason: 'missing JSON' });
    mismatchCount++;
    continue;
  }

  const rawSvg = fs.readFileSync(path.join(svgDir, svgFile), 'utf-8');
  const cleanedSvg = rawSvg
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
    .trim();

  const jsonRaw = fs.readFileSync(jsonPath, 'utf-8');
  const parsed = JSON.parse(jsonRaw);
  const jsonSvg = (parsed.svg || '')
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>\s*/gi, '')
    .trim();

  // Normalize whitespace and line breaks for strict comparison
  const normSvg = cleanedSvg.replace(/\r\n/g, '\n').replace(/\s+/g, ' ');
  const normJson = jsonSvg.replace(/\r\n/g, '\n').replace(/\s+/g, ' ');

  if (normSvg !== normJson) {
    mismatchCount++;
    mismatches.push({ iconName, reason: 'SVG content differs' });
    console.log(`⚠️ MISMATCH in ${iconName}`);
  } else {
    matchCount++;
  }
}

console.log(`----------------------------------------`);
console.log(`Strict Figma vs data/icons verification:`);
console.log(`✅ EXACT MATCH: ${matchCount}`);
console.log(`❌ MISMATCH: ${mismatchCount}`);

// Also check public/icons.json
const iconsJson = JSON.parse(fs.readFileSync(iconsJsonPath, 'utf-8'));
console.log(`public/icons.json contains: ${iconsJson.icons.length} icons`);

// Also check public/iconix.json
const iconixJson = JSON.parse(fs.readFileSync(iconixJsonPath, 'utf-8'));
console.log(`public/iconix.json contains: ${Object.keys(iconixJson.icons).length} icons`);

// Validate tag rules and CMS categories
const configYml = fs.readFileSync(path.resolve(__dirname, '../public/admin/config.yml'), 'utf-8');
const allowedCategories = configYml
  .split('options:')[1]
  .split('- {')[0]
  .split('\n')
  .filter((l) => l.includes('- "'))
  .map((l) => l.replace(/.*- "([^"]+)".*/, '$1').trim());

let tagRuleErrors = 0;
let categoryErrors = 0;

for (const icon of iconsJson.icons) {
  if (!allowedCategories.includes(icon.category)) {
    console.error(`⚠️ Invalid category for ${icon.name}: "${icon.category}"`);
    categoryErrors++;
  }
  if (icon.name.includes('plus') && !icon.tags.includes('add')) {
    console.error(`⚠️ Missing 'add' tag in plus icon: ${icon.name}`);
    tagRuleErrors++;
  }
  if (icon.name.includes('minus') && !icon.tags.includes('remove')) {
    console.error(`⚠️ Missing 'remove' tag in minus icon: ${icon.name}`);
    tagRuleErrors++;
  }
}

if (categoryErrors === 0 && tagRuleErrors === 0) {
  console.log(`✅ All ${iconsJson.icons.length} icons strictly adhere to CMS categories & tag rules!`);
} else {
  console.error(`❌ Errors found: ${categoryErrors} category errors, ${tagRuleErrors} tag rule errors.`);
}
