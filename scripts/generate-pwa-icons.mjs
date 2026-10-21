import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

function generateSvg({ size, rayLength, strokeWidth, bg = '#0A0A0C', fg = '#F4F4F6' }) {
  const center = size / 2;
  const d = (rayLength / Math.SQRT2).toFixed(3);
  const r = rayLength.toFixed(3);
  const c = center.toFixed(3);

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <!-- 8-Ray Symmetrical Rounded Asterisk (*) -->
  <line x1="${c}" y1="${(center - rayLength).toFixed(3)}" x2="${c}" y2="${(center + rayLength).toFixed(3)}" stroke="${fg}" stroke-width="${strokeWidth}" stroke-linecap="round" />
  <line x1="${(center - rayLength).toFixed(3)}" y1="${c}" x2="${(center + rayLength).toFixed(3)}" y2="${c}" stroke="${fg}" stroke-width="${strokeWidth}" stroke-linecap="round" />
  <line x1="${(center - d).toFixed(3)}" y1="${(center - d).toFixed(3)}" x2="${(center + Number(d)).toFixed(3)}" y2="${(center + Number(d)).toFixed(3)}" stroke="${fg}" stroke-width="${strokeWidth}" stroke-linecap="round" />
  <line x1="${(center + Number(d)).toFixed(3)}" y1="${(center - d).toFixed(3)}" x2="${(center - d).toFixed(3)}" y2="${(center + Number(d)).toFixed(3)}" stroke="${fg}" stroke-width="${strokeWidth}" stroke-linecap="round" />
</svg>`;
}

const icons = [
  // iOS Apple Touch Icon (180x180, square, no rounded corners in file)
  {
    filename: 'apple-touch-icon.png',
    size: 180,
    rayLength: 56,
    strokeWidth: 17,
  },
  // Standard Android / Web App Manifest icons
  {
    filename: 'pwa-192x192.png',
    size: 192,
    rayLength: 60,
    strokeWidth: 18,
  },
  {
    filename: 'pwa-512x512.png',
    size: 512,
    rayLength: 160,
    strokeWidth: 48,
  },
  // Android Adaptive / Maskable icons (within 80% safe zone)
  {
    filename: 'pwa-maskable-192x192.png',
    size: 192,
    rayLength: 52,
    strokeWidth: 16,
  },
  {
    filename: 'pwa-maskable-512x512.png',
    size: 512,
    rayLength: 138,
    strokeWidth: 42,
  },
];

async function main() {
  console.log('Generating PWA icons for iOS and Android...');
  for (const icon of icons) {
    const svg = generateSvg({
      size: icon.size,
      rayLength: icon.rayLength,
      strokeWidth: icon.strokeWidth,
    });
    const dest = path.join(publicDir, icon.filename);
    await sharp(Buffer.from(svg)).png().toFile(dest);
    console.log(`✓ Generated ${icon.filename} (${icon.size}x${icon.size})`);
  }
  console.log('All icons generated successfully!');
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
