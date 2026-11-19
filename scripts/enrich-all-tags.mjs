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

  // Search & Exploration
  search: ['search', 'find', 'query', 'magnifier', 'magnifying-glass', 'explore', 'lookup', 'seek', 'inspect', 'scan', 'filter', 'cari', 'temukan'],

  // Users & Profiles
  user: ['user', 'person', 'account', 'profile', 'member', 'avatar', 'human', 'people', 'individual', 'pengguna', 'akun'],
  users: ['users', 'people', 'team', 'group', 'crowd', 'members', 'community', 'pengguna'],
  group: ['group', 'team', 'users', 'people', 'community', 'organization', 'members', 'kelompok', 'tim'],

  // Home & Architecture
  house: ['house', 'home', 'building', 'dashboard', 'homepage', 'estate', 'property', 'residence', 'rumah', 'beranda'],
  houses: ['houses', 'village', 'neighborhood', 'homes', 'community', 'residence', 'estate'],

  // Security & Locks
  shield: ['shield', 'security', 'protect', 'protection', 'guard', 'defense', 'safety', 'secure', 'safe', 'tameng', 'keamanan'],
  lock: [
    'lock',
    'security',
    'keyhole',
    'secure',
    'padlock',
    'private',
    'privacy',
    'protect',
    'protection',
    'safety',
    'auth',
    'kunci',
    'gembok',
    'terkunci',
    'aman',
  ],
  key: [
    'key',
    'lock',
    'access',
    'secret',
    'password',
    'passkey',
    'passcode',
    'pin',
    'credential',
    'token',
    'security',
    'auth',
    'authentication',
    'login',
    'signin',
    'unlock',
    'permission',
    'license',
    'encryption',
    'private-key',
    'api-key',
    'kata-sandi',
    'sandi',
    'kunci',
    'akses',
  ],

  // Travel & Transport
  plane: ['plane', 'airplane', 'aeroplane', 'flight', 'fly', 'airport', 'travel', 'transport', 'pesawat', 'terbang'],

  // Power & Tech
  plug: ['plug', 'power', 'cable', 'connect', 'connection', 'electric', 'energy', 'socket', 'colokan', 'listrik'],

  // UI Elements & Badges
  heart: ['heart', 'love', 'like', 'favorite', 'health', 'romance', 'suka', 'favorit', 'hati'],
  flag: ['flag', 'mark', 'bookmark', 'report', 'banner', 'pennant', 'golf', 'triangle', 'country', 'bendera'],

  // Art & Design
  brush: ['brush', 'paint', 'draw', 'art', 'color', 'tool', 'kuas', 'lukis', 'design'],
  highlighter: ['highlighter', 'marker', 'pen', 'draw', 'highlight', 'text', 'stabilo', 'mark', 'color'],

  // Marketing & Commerce
  ad: ['ad', 'advertisement', 'advertising', 'promo', 'sponsor', 'marketing', 'campaign', 'commercial', 'iklan', 'promosi'],

  // Vehicles & Logistics
  van: ['van', 'vehicle', 'car', 'delivery', 'transport', 'cargo', 'shipping', 'automobile', 'mobil', 'kendaraan', 'kurir', 'ekspedisi'],
};

// Suffix modifier tags
const SUFFIX_DICTIONARY = {
  keyhole: ['keyhole', 'lock', 'security', 'access', 'auth', 'lubang-kunci', 'kunci'],
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
  code: ['code', 'developer', 'coding', 'html', 'bracket', 'syntax', 'programming', 'dev', 'script', 'source'],
  'exclamation-point': ['exclamation', 'alert', 'warning', 'important', 'caution', 'notice', 'attention', 'mark', 'point', 'peringatan'],
  fading: ['fading', 'history', 'recent', 'countdown', 'expire', 'expired', 'temporary', 'fade', 'schedule'],
  slash: ['slash', 'clear', 'filter', 'cancel', 'empty', 'reset', 'ban'],
  'arrow-down': ['arrow-down', 'down', 'decrease', 'countdown'],
  'arrow-up': ['arrow-up', 'up', 'increase', 'fast-forward'],
  'arrow-left': ['arrow-left', 'left', 'rewind', 'back', 'undo', 'past'],
  'arrow-right': ['arrow-right', 'right', 'forward', 'next', 'future'],
  landing: ['landing', 'arrive', 'arrival', 'mendarat'],
  takeoff: ['takeoff', 'departure', 'depart', 'lepas-landas'],
  taxi: ['taxi', 'runway', 'ground', 'roll'],
  tilt: ['tilt', 'angle', 'maneuver', 'rotate'],
  side: ['side', 'profile', 'horizontal'],
  ban: ['ban', 'block', 'forbidden', 'prohibit', 'blokir'],
  half: ['half', 'split', 'partial', 'separuh'],
  corner: ['corner', 'edge', 'sudut'],
  'question-mark': ['question', 'help', 'faq', 'ask', 'query', 'bantuan', 'tanya'],
  ellipsis: ['ellipsis', 'more', 'options', 'dots', 'menu'],
  open: ['open', 'unlocked', 'access', 'terbuka'],
  collaboration: ['collaboration', 'collab', 'partnership', 'teamwork', 'cooperation', 'kerjasama'],
  star: ['star', 'favorite', 'rating', 'vip', 'premium', 'bintang'],
  golf: ['golf', 'sport', 'hole', 'green'],
  triangle: ['triangle', 'triangel', 'delta', 'shape'],
  triangel: ['triangle', 'triangel', 'delta', 'shape'],
  pen: ['pen', 'write', 'edit', 'draw', 'sketch', 'design', 'tulis', 'edit-user'],
  lock: ['lock', 'security', 'secure', 'protect', 'kunci', 'gembok'],
  key: ['key', 'access', 'secret', 'password', 'passkey', 'credential', 'auth', 'token', 'kunci', 'sandi'],
  shield: ['shield', 'security', 'protect', 'protection', 'guard', 'safety', 'tameng', 'keamanan'],
  search: ['search', 'find', 'query', 'explore', 'lookup', 'cari'],
  house: ['house', 'home', 'building', 'property', 'rumah'],
  plug: ['plug', 'power', 'connect', 'electric', 'colokan', 'listrik'],
  crack: ['crack', 'broken', 'broken-heart', 'damage', 'split', 'patah', 'kecewa'],
  pulse: ['pulse', 'heartbeat', 'activity', 'ecg', 'cardio', 'health', 'vital', 'detak-jantung'],
  brush: ['brush', 'paint', 'draw', 'kuas', 'lukis'],
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

  // Handle clock hour numbers (clock-1 to clock-12)
  const clockHourMatch = iconName.match(/^clock-(\d+)$/);
  if (clockHourMatch) {
    const num = clockHourMatch[1];
    const numberWords = {
      '1': ['one', '1-oclock'],
      '2': ['two', '2-oclock'],
      '3': ['three', '3-oclock'],
      '4': ['four', '4-oclock'],
      '5': ['five', '5-oclock'],
      '6': ['six', '6-oclock'],
      '7': ['seven', '7-oclock'],
      '8': ['eight', '8-oclock'],
      '9': ['nine', '9-oclock'],
      '10': ['ten', '10-oclock'],
      '11': ['eleven', '11-oclock'],
      '12': ['twelve', '12-oclock'],
    };
    if (numberWords[num]) {
      numberWords[num].forEach((w) => tags.add(w));
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
