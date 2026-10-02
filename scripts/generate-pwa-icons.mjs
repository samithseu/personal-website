import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve(process.cwd(), "public");
const svgPath = path.join(publicDir, "favicon.svg");

if (!fs.existsSync(svgPath)) {
  console.error("favicon.svg not found in public directory");
  process.exit(1);
}

const svgBuffer = fs.readFileSync(svgPath);

// Target icons:
// 1. pwa-192x192.png (standard 192x192)
// 2. pwa-512x512.png (standard 512x512)
// 3. pwa-maskable-512x512.png (512x512 with safe-zone padding)
// 4. apple-touch-icon.png (180x180)

async function generate() {
  console.log("Generating PWA icons from favicon.svg...");

  // Standard 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, "pwa-192x192.png"));
  console.log("✔ Generated public/pwa-192x192.png");

  // Standard 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, "pwa-512x512.png"));
  console.log("✔ Generated public/pwa-512x512.png");

  // Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✔ Generated public/apple-touch-icon.png");

  // Maskable 512x512 with safe-zone (inner 410x410 with #09090b background)
  const innerIcon = await sharp(svgBuffer)
    .resize(410, 410)
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 9, g: 9, b: 11, alpha: 1 }, // #09090b
    },
  })
    .composite([
      {
        input: innerIcon,
        top: 51,
        left: 51,
      },
    ])
    .png()
    .toFile(path.join(publicDir, "pwa-maskable-512x512.png"));
  console.log("✔ Generated public/pwa-maskable-512x512.png (maskable)");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
