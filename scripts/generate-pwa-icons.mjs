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
// 1. apple-touch-icon.png (180x180) for iOS Safari home screen bookmarking

async function generate() {
  console.log("Generating apple-touch-icon from favicon.svg...");

  // Apple touch icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✔ Generated public/apple-touch-icon.png");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
