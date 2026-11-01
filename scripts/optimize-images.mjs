import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const certsDir = path.join(rootDir, "public", "certs");
const aboutPicPath = path.join(rootDir, "public", "about-picture.jpg");

async function optimizeImages() {
  console.log("Optimizing images with sharp...");

  // 1. Optimize about-picture.jpg
  if (fs.existsSync(aboutPicPath)) {
    const originalBuf = fs.readFileSync(aboutPicPath);
    const optimizedBuf = await sharp(originalBuf)
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(aboutPicPath, optimizedBuf);
    console.log(
      `Optimized about-picture.jpg: ${originalBuf.length} -> ${optimizedBuf.length} bytes (${Math.round(
        (1 - optimizedBuf.length / originalBuf.length) * 100
      )}% reduction)`
    );
  }

  // 2. Convert and optimize certs
  if (fs.existsSync(certsDir)) {
    const files = fs.readdirSync(certsDir);
    let originalTotal = 0;
    let newTotal = 0;

    for (const file of files) {
      if (!/\.(jpe?g|png)$/i.test(file)) continue;

      const inputPath = path.join(certsDir, file);
      const originalBuf = fs.readFileSync(inputPath);
      originalTotal += originalBuf.length;

      const baseName = path.basename(file, path.extname(file));
      const outputPath = path.join(certsDir, `${baseName}.webp`);

      const webpBuf = await sharp(originalBuf)
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      fs.writeFileSync(outputPath, webpBuf);
      newTotal += webpBuf.length;

      console.log(
        `Converted ${file} -> ${baseName}.webp: ${originalBuf.length} -> ${webpBuf.length} bytes`
      );

      // Remove the old unoptimized file
      fs.unlinkSync(inputPath);
    }

    console.log(
      `Certs total: ${Math.round(originalTotal / 1024)} KB -> ${Math.round(
        newTotal / 1024
      )} KB (${Math.round((1 - newTotal / originalTotal) * 100)}% reduction)`
    );
  }
}

optimizeImages().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});
