import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataIconsDir = path.resolve(__dirname, '../data/icons');
const files = fs.readdirSync(dataIconsDir).filter((f) => f.endsWith('.json'));

const TAG_DICTIONARY = {
  // Devices & Tech
  tv: ['television', 'screen', 'display', 'monitor', 'media', 'broadcast', 'entertainment', 'video'],
  monitor: ['screen', 'display', 'desktop', 'computer', 'pc', 'hardware', 'workstation'],
  laptop: ['notebook', 'computer', 'pc', 'macbook', 'portable', 'device', 'screen', 'hardware', 'work'],
  smartphone: ['phone', 'mobile', 'cellphone', 'device', 'iphone', 'android', 'touchscreen', 'responsive'],
  tablet: ['ipad', 'tablet', 'screen', 'device', 'touchscreen', 'portable', 'mobile'],
  pc: ['computer', 'tower', 'desktop', 'workstation', 'system-unit', 'cpu', 'hardware'],
  speaker: ['audio', 'sound', 'volume', 'music', 'multimedia', 'acoustic', 'stereo', 'hardware'],
  airplay: ['stream', 'cast', 'screen-share', 'wireless', 'audio', 'video', 'apple', 'connect', 'tv'],
  camera: ['photo', 'photography', 'lens', 'shutter', 'picture', 'capture', 'snapshot'],
  videocamera: ['video', 'camera', 'record', 'movie', 'film', 'camcorder', 'cinema', 'broadcast', 'stream'],

  // Emergency & Alerts
  siren: ['siren', 'emergency', 'police', 'ambulance', 'alert', 'warning', 'alarm', 'light', 'beacon', 'flasher', 'security'],
  sirine: ['siren', 'emergency', 'police', 'ambulance', 'alert', 'warning', 'alarm', 'light', 'beacon', 'flasher'],
  ambulance: ['ambulance', 'hospital', 'emergency', 'medical', 'doctor', 'healthcare', 'rescue', 'paramedic', 'clinic', 'vehicle'],
  bell: ['bell', 'notification', 'alert', 'alarm', 'reminder', 'chime', 'ring'],
  alarm: ['alarm', 'clock', 'time', 'timer', 'wake', 'watch', 'alert', 'bell', 'morning', 'schedule'],
  clock: ['clock', 'time', 'watch', 'timer', 'hour', 'minute', 'schedule', 'history', 'recent', 'countdown'],
  'alarm-smoke': ['smoke', 'fire', 'detector', 'sensor', 'safety', 'emergency', 'hazard', 'alert'],

  // Objects & Geometry
  mirror: ['mirror', 'reflection', 'glass', 'surface', 'optics', 'vanity', 'look'],
  amphora: ['amphora', 'vase', 'pottery', 'antique', 'greek', 'roman', 'jar', 'ceramic', 'ancient', 'vessel', 'museum'],
  anchor: ['anchor', 'sea', 'ship', 'boat', 'marine', 'ocean', 'harbor', 'nautical', 'port', 'sail'],
  anvil: ['anvil', 'blacksmith', 'forge', 'heavy', 'craft', 'iron', 'metal', 'tool', 'workshop', 'steel'],
  angle: ['angle', 'degree', 'geometry', 'math', 'measure', 'corner', 'triangle'],
  antenna: ['antenna', 'signal', 'radio', 'wireless', 'broadcast', 'receiver', 'transmission', 'connectivity', 'telecom'],
  aperture: ['aperture', 'camera', 'lens', 'photo', 'photography', 'shutter', 'focus', 'iris', 'exposure', 'optic'],
  apple: ['apple', 'fruit', 'food', 'healthy', 'diet', 'organic', 'nutrition', 'snack'],
  'air-vent': ['air-vent', 'ac', 'hvac', 'cooling', 'ventilation', 'fan', 'airflow', 'climate', 'temperature'],
  truck: ['truck', 'delivery', 'cargo', 'shipping', 'logistics', 'freight', 'transport', 'vehicle', 'haul'],

  // Design & Editing
  pen: ['pen', 'write', 'edit', 'draw', 'sketch', 'design', 'create', 'tool', 'author', 'compose'],
  pencil: ['pencil', 'write', 'edit', 'draw', 'sketch', 'design', 'create', 'tool', 'draft'],
  save: ['save', 'disk', 'floppy', 'storage', 'store', 'download', 'keep', 'backup', 'file'],
  trash: ['trash', 'delete', 'remove', 'bin', 'garbage', 'rubbish', 'waste', 'clear', 'recycle'],

  // Health & UI
  accessibility: ['accessibility', 'a11y', 'handicap', 'disabled', 'universal', 'inclusion', 'user', 'human', 'body'],
  activity: ['activity', 'pulse', 'heartbeat', 'ecg', 'cardio', 'fitness', 'health', 'vital', 'wave', 'monitor'],
  'app-window': ['window', 'application', 'browser', 'software', 'desktop', 'interface', 'ui', 'frame', 'screen'],
  'case-sensitive': ['case-sensitive', 'font', 'letter', 'caps', 'capital', 'typography', 'text', 'search', 'match'],
};

// Suffix modifier tags
const SUFFIX_DICTIONARY = {
  check: ['check', 'done', 'success', 'verified', 'approved', 'ok', 'completed'],
  plus: ['plus', 'add', 'create', 'new'],
  minus: ['minus', 'remove', 'delete', 'exclude'],
  off: ['off', 'disabled', 'turn-off', 'slash', 'mute'],
  off2: ['off', 'disabled', 'silent', 'slash'],
  dot: ['dot', 'status', 'indicator', 'online', 'badge'],
  play: ['play', 'start', 'resume', 'video', 'player'],
  pause: ['pause', 'hold', 'break', 'player'],
  stop: ['stop', 'halt', 'end', 'square'],
  cloud: ['cloud', 'server', 'network', 'storage', 'sync', 'remote'],
  cog: ['cog', 'gear', 'settings', 'configuration', 'preferences', 'options', 'setup'],
  up: ['up', 'upload', 'arrow', 'outbound', 'send'],
  down: ['down', 'download', 'arrow', 'inbound', 'receive'],
  x: ['x', 'cancel', 'close', 'error', 'dismiss', 'reject'],
  mac: ['mac', 'apple', 'imac', 'desktop', 'retina'],
  camera: ['camera', 'webcam', 'video', 'optic'],
  activity: ['activity', 'pulse', 'graph', 'health', 'vital'],
  sleep: ['sleep', 'night', 'snooze', 'bed', 'rest', 'nap', 'zzz'],
  ring: ['ring', 'alerting', 'vibrate', 'chime', 'active'],
  sparkles: ['sparkles', 'ai', 'magic', 'generate', 'prompt', 'assist', 'smart'],
  ruler: ['ruler', 'measure', 'precision', 'blueprint', 'draft'],
  square: ['square', 'form', 'document', 'note'],
  line: ['line', 'stroke', 'underline'],
  round: ['round', 'circle', 'circular'],
  oval: ['oval', 'ellipse', 'egg-shaped'],
  record: ['record', 'recording', 'dot', 'live', 'on-air'],
  'screen-share': ['screen-share', 'share', 'cast', 'stream', 'broadcast', 'airplay'],
  'screen-share-off': ['screen-share-off', 'stop-sharing', 'disabled'],
};

let enrichedCount = 0;

for (const file of files) {
  const filePath = path.join(dataIconsDir, file);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const icon = JSON.parse(raw);
  const iconName = (icon.name || file.replace(/\.json$/, '')).trim();

  const tags = new Set(Array.isArray(icon.tags) ? icon.tags : []);

  // Always include the icon name and its parts
  tags.add('iconix');
  tags.add(iconName);
  iconName.split('-').forEach((p) => tags.add(p));

  // Fix known typos
  if (iconName === 'antenna') {
    tags.delete('angle');
    tags.delete('1');
  }

  // Apply base dictionary matches
  for (const [key, words] of Object.entries(TAG_DICTIONARY)) {
    if (iconName === key || iconName.startsWith(`${key}-`)) {
      words.forEach((w) => tags.add(w));
    }
  }

  // Handle tv-minimalis special case
  if (iconName.startsWith('tv-minimalis')) {
    TAG_DICTIONARY.tv.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }
  if (iconName.startsWith('laptop-minimalis')) {
    TAG_DICTIONARY.laptop.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }
  if (iconName.startsWith('speaker-minimalis')) {
    TAG_DICTIONARY.speaker.forEach((w) => tags.add(w));
    tags.add('minimalis');
    tags.add('minimal');
  }

  // Apply suffix dictionary matches
  for (const [suffix, words] of Object.entries(SUFFIX_DICTIONARY)) {
    if (iconName.endsWith(`-${suffix}`) || iconName === suffix) {
      words.forEach((w) => tags.add(w));
    }
  }

  // Ensure plus has add, minus has remove
  if (iconName.includes('plus')) tags.add('add');
  if (iconName.includes('minus')) tags.add('remove');

  // Convert set back to array and clean up empty / numeric junk
  const cleanTags = Array.from(tags)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0 && isNaN(Number(t)));

  // Check if tags changed
  const oldTagString = (icon.tags || []).join(',');
  const newTagString = cleanTags.join(',');

  if (oldTagString !== newTagString) {
    icon.tags = cleanTags;
    fs.writeFileSync(filePath, JSON.stringify(icon, null, 2) + '\n', 'utf-8');
    enrichedCount++;
  }
}

console.log(`✅ Successfully enriched tags for ${enrichedCount} icons in data/icons/!`);
