import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rollupNativePath = path.resolve(__dirname, '../node_modules/rollup/dist/native.js');

try {
  if (fs.existsSync(rollupNativePath)) {
    const content = fs.readFileSync(rollupNativePath, 'utf-8');
    if (!content.includes('@rollup/wasm-node')) {
      fs.writeFileSync(
        rollupNativePath,
        "module.exports = require('@rollup/wasm-node/dist/native.js');\n",
        'utf-8'
      );
      console.log('✅ Patched rollup to use @rollup/wasm-node for cross-platform compatibility.');
    }
  }
} catch (e) {
  console.warn('⚠️ Could not patch rollup native.js:', e.message);
}
