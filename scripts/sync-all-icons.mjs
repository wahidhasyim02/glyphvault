import fs from 'node:fs';
import path from 'node:path';

const assetsDir = path.resolve('public/assets/icons');
const dataIconsDir = path.resolve('data/icons');

// Helper to clean raw Figma SVG
function cleanSvg(raw) {
  let cleaned = raw
    .replace(/<rect\s+width="24"\s+height="24"[^>]*\/>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();

  // If missing standard outer SVG attributes
  if (!cleaned.startsWith('<svg')) {
    cleaned = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n${cleaned}\n</svg>`;
  }
  return cleaned;
}

// 1. Existing icons to update from assets if modified
const modifiedMap = {
  'aperture.json': 'glyph_aperture.svg',
  'arrow-big-left-dash.json': 'glyph_arrow-big-left-dash.svg',
  'arrow-big-left.json': 'glyph_arrow-big-left.svg',
  'arrow-big-right-dash.json': 'glyph_arrow-big-right-dash.svg',
  'arrow-big-right.json': 'glyph_arrow-big-right.svg',
  'case-sensitive.json': 'glyph_case-sensitive.svg',
  'circle-check.json': 'glyph_circle-check.svg',
  'save-all.json': 'glyph_save-all.svg',
  'save-off.json': 'glyph_save-off.svg',
  'siren.json': 'glyph_siren.svg',
};

for (const [jsonFile, assetSvg] of Object.entries(modifiedMap)) {
  const jsonPath = path.join(dataIconsDir, jsonFile);
  const svgPath = path.join(assetsDir, assetSvg);
  if (fs.existsSync(jsonPath) && fs.existsSync(svgPath)) {
    const rawSvg = fs.readFileSync(svgPath, 'utf8');
    const cleaned = cleanSvg(rawSvg);
    const item = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    item.svg = cleaned;
    fs.writeFileSync(jsonPath, JSON.stringify(item, null, 2) + '\n', 'utf8');
    console.log(`Updated SVG in ${jsonFile}`);
  }
}

// 2. Map of all 48 new icons
const newIconsDefinitions = [
  // Bell family
  { file: 'glyph_bell.svg', name: 'bell', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'notification', 'alert', 'alarm', 'reminder'] },
  { file: 'glyph_bell-check.svg', name: 'bell-check', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'check', 'notification', 'alert', 'verified', 'done'] },
  { file: 'glyph_bell-dot.svg', name: 'bell-dot', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'dot', 'notification', 'alert', 'unread', 'active', 'badge'] },
  { file: 'glyph_bell-minus.svg', name: 'bell-minus', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'minus', 'notification', 'alert', 'remove', 'delete', 'unsubscribe'] },
  { file: 'glyph_bell-off.svg', name: 'bell-off', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'off', 'notification', 'alert', 'mute', 'silent', 'disable'] },
  { file: 'glyph_bell-plus.svg', name: 'bell-plus', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'plus', 'notification', 'alert', 'add', 'create', 'subscribe'] },
  { file: 'glyph_bell-ring.svg', name: 'bell-ring', category: 'Emergency & Alerts', tags: ['glyph', 'bell', 'ring', 'ringing', 'notification', 'alert', 'alarm', 'sound'] },

  // Check & circle-slash
  { file: 'glyph_check.svg', name: 'check', category: 'Interface & Health', tags: ['glyph', 'check', 'tick', 'mark', 'success', 'done', 'ok', 'confirm'] },
  { file: 'glyph_check-check.svg', name: 'check-check', category: 'Interface & Health', tags: ['glyph', 'check', 'check-check', 'double-check', 'read', 'delivered', 'done'] },
  { file: 'glyph_check-line.svg', name: 'check-line', category: 'Interface & Health', tags: ['glyph', 'check', 'check-line', 'line', 'confirm', 'verified'] },
  { file: 'glyph_circle-slash.svg', name: 'circle-slash', category: 'Shapes & Badges', tags: ['glyph', 'circle', 'slash', 'ban', 'block', 'forbidden', 'empty', 'null'] },
  { file: 'glyph_circle-slash-2.svg', name: 'circle-slash-2', category: 'Shapes & Badges', tags: ['glyph', 'circle', 'slash', 'circle-slash-2', 'ban', 'block', 'forbidden', 'diagonal'] },

  // Devices: Laptops, PC, Phone, Tablet, Speaker
  { file: 'glyph_laptop.svg', name: 'laptop', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'laptop', 'notebook', 'macbook', 'computer', 'device'] },
  { file: 'glyph_laptop-minimalis.svg', name: 'laptop-minimal', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'laptop', 'laptop-minimal', 'laptop-minimalis', 'notebook', 'screen', 'device'] },
  { file: 'glyph_laptop-minimalis2.svg', name: 'laptop-minimal-2', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'laptop', 'laptop-minimal-2', 'laptop-minimalis2', 'trackpad', 'notebook', 'device'] },
  { file: 'glyph_laptop-minimalis-check.svg', name: 'laptop-minimal-check', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'laptop', 'laptop-minimal-check', 'laptop-minimalis-check', 'verified', 'done', 'success'] },
  { file: 'glyph_pc.svg', name: 'pc', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'pc', 'tower', 'desktop', 'computer', 'cpu', 'workstation'] },
  { file: 'glyph_smartphone.svg', name: 'smartphone', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'smartphone', 'phone', 'mobile', 'iphone', 'android', 'cellphone'] },
  { file: 'glyph_tablet.svg', name: 'tablet', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tablet', 'ipad', 'touchscreen', 'pad', 'device'] },
  { file: 'glyph_tablet-smartphone.svg', name: 'tablet-smartphone', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tablet', 'smartphone', 'devices', 'mobile', 'responsive', 'screen'] },
  { file: 'glyph_speaker.svg', name: 'speaker', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'speaker', 'audio', 'sound', 'music', 'woofer', 'subwoofer'] },
  { file: 'glyph_speaker-minimalis.svg', name: 'speaker-minimal', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'speaker', 'speaker-minimal', 'speaker-minimalis', 'audio', 'sound', 'music'] },

  // Monitor additions
  { file: 'glyph_monitor-camera.svg', name: 'monitor-camera', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'camera', 'webcam', 'video', 'conference', 'screen'] },
  { file: 'glyph_monitor-cog.svg', name: 'monitor-cog', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'cog', 'gear', 'settings', 'display', 'screen'] },
  { file: 'glyph_monitor-dot.svg', name: 'monitor-dot', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'dot', 'status', 'online', 'screen', 'display'] },
  { file: 'glyph_monitor-minus.svg', name: 'monitor-minus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'minus', 'remove', 'delete', 'screen', 'display'] },
  { file: 'glyph_monitor-off.svg', name: 'monitor-off', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'off', 'power', 'disabled', 'slash', 'screen'] },
  { file: 'glyph_monitor-pc.svg', name: 'monitor-pc', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'pc', 'desktop', 'tower', 'computer', 'workstation'] },
  { file: 'glyph_monitor-plus.svg', name: 'monitor-plus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'plus', 'add', 'create', 'new', 'screen'] },
  { file: 'glyph_monitor-screen-share.svg', name: 'monitor-screen-share', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'screen-share', 'share', 'cast', 'stream', 'display'] },
  { file: 'glyph_monitor-screen-share-off.svg', name: 'monitor-screen-share-off', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'screen-share-off', 'stop-sharing', 'disabled'] },
  { file: 'glyph_monitor-smartphone.svg', name: 'monitor-smartphone', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'smartphone', 'mobile', 'responsive', 'cross-platform', 'devices'] },
  { file: 'glyph_monitor-speaker.svg', name: 'monitor-speaker', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'monitor', 'speaker', 'audio', 'sound', 'multimedia', 'workstation'] },

  // TV family additions
  { file: 'glyph_tv.svg', name: 'tv', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'television', 'antenna', 'screen', 'broadcast', 'display'] },
  { file: 'glyph_tv-minimal-cog.svg', name: 'tv-minimal-cog', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'tv-minimal', 'tv-minimal-cog', 'cog', 'gear', 'settings'] },
  { file: 'glyph_tv-minimal-dot.svg', name: 'tv-minimal-dot', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'tv-minimal', 'tv-minimal-dot', 'dot', 'status', 'online'] },
  { file: 'glyph_tv-minimal-minus.svg', name: 'tv-minimal-minus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'tv-minimal', 'tv-minimal-minus', 'minus', 'remove', 'delete'] },
  { file: 'glyph_tv-minimal-off.svg', name: 'tv-minimal-off', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'tv-minimal', 'tv-minimal-off', 'off', 'power', 'disabled', 'slash'] },
  { file: 'glyph_tv-minimal-plus.svg', name: 'tv-minimal-plus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'tv-minimal', 'tv-minimal-plus', 'plus', 'add', 'create'] },
  { file: 'glyph_tv-screen-share.svg', name: 'tv-screen-share', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'screen-share', 'airplay', 'cast', 'stream', 'display'] },
  { file: 'glyph_tv-screen-share-off.svg', name: 'tv-screen-share-off', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'tv', 'screen-share-off', 'stop-sharing', 'disabled'] },

  // Videocamera family
  { file: 'glyph_videocamera.svg', name: 'videocamera', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'video', 'videocamera', 'camera', 'recording', 'movie', 'film'] },
  { file: 'glyph_videocamera-minus.svg', name: 'videocamera-minus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'video', 'videocamera', 'minus', 'remove', 'delete', 'camera'] },
  { file: 'glyph_videocamera-off.svg', name: 'videocamera-off', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'video', 'videocamera', 'off', 'slash', 'mute', 'disabled', 'camera'] },
  { file: 'glyph_videocamera-plus.svg', name: 'videocamera-plus', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'video', 'videocamera', 'plus', 'add', 'create', 'new', 'camera'] },
  { file: 'glyph_videocamera-record.svg', name: 'videocamera-record', category: 'Devices & Tech', tags: ['glyph', 'devices & tech', 'video', 'videocamera', 'record', 'recording', 'dot', 'live', 'camera'] },

  // Trash family
  { file: 'glyph_trash.svg', name: 'trash', category: 'Interface & Health', tags: ['glyph', 'trash', 'bin', 'delete', 'remove', 'garbage', 'recycle'] },
  { file: 'glyph_trash-off.svg', name: 'trash-off', category: 'Interface & Health', tags: ['glyph', 'trash', 'trash-off', 'bin', 'disabled', 'protected', 'undelete', 'slash'] },
];

for (const def of newIconsDefinitions) {
  const svgPath = path.join(assetsDir, def.file);
  const jsonPath = path.join(dataIconsDir, `${def.name}.json`);
  if (!fs.existsSync(svgPath)) {
    console.warn(`File not found: ${svgPath}`);
    continue;
  }
  const rawSvg = fs.readFileSync(svgPath, 'utf8');
  const cleaned = cleanSvg(rawSvg);
  const iconEntry = {
    name: def.name,
    category: def.category,
    tags: Array.from(new Set(def.tags.map(t => t.toLowerCase()))),
    svg: cleaned,
  };
  fs.writeFileSync(jsonPath, JSON.stringify(iconEntry, null, 2) + '\n', 'utf8');
  console.log(`Created data/icons/${def.name}.json`);
}

// 3. Apply the global tag rule:
// "dan yg memiliki nama ada plusnya, tagsnya tambahkan add, yg minus, tambahkan remove"
const allJsonFiles = fs.readdirSync(dataIconsDir).filter(f => f.endsWith('.json'));
let plusCount = 0;
let minusCount = 0;

for (const file of allJsonFiles) {
  const filePath = path.join(dataIconsDir, file);
  const item = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const tagsSet = new Set(item.tags || []);
  let changed = false;

  if (item.name.includes('plus')) {
    if (!tagsSet.has('add')) {
      tagsSet.add('add');
      changed = true;
      plusCount++;
    }
  }

  if (item.name.includes('minus')) {
    if (!tagsSet.has('remove')) {
      tagsSet.add('remove');
      changed = true;
      minusCount++;
    }
  }

  if (changed) {
    item.tags = Array.from(tagsSet);
    fs.writeFileSync(filePath, JSON.stringify(item, null, 2) + '\n', 'utf8');
  }
}

console.log(`\nTags update completed: added 'add' to ${plusCount} plus-icons, added 'remove' to ${minusCount} minus-icons.`);
console.log(`Total icons now in data/icons: ${fs.readdirSync(dataIconsDir).filter(f => f.endsWith('.json')).length}`);
