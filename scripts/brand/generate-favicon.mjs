import sharp from "sharp";

// Keep the original artwork; the yellow disk adds a 2px outline at tab size.
const size = 1024;
const inset = 64;
const disk = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="512" cy="512" r="512" fill="#fcc256"/></svg>`);
const logo = await sharp("public/brand/que-cookies-logo.png")
  .resize(size - inset * 2, size - inset * 2)
  .png()
  .toBuffer();
const outlined = await sharp(disk)
  .composite([{ input: logo, left: inset, top: inset }])
  .png()
  .toBuffer();

for (const pixels of [32, 180, 192]) {
  await sharp(outlined).resize(pixels, pixels).png()
    .toFile(`public/brand/favicon-${pixels}.png`);
}
