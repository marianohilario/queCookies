import sharp from "sharp";
import { writeFile } from "node:fs/promises";

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

// ICO with PNG entries: Next exposes this file at /favicon.ico and adds metadata.
const dimensions = [16, 32, 48];
const images = await Promise.all(dimensions.map(pixels =>
  sharp(outlined).resize(pixels, pixels).png().toBuffer(),
));
const header = Buffer.alloc(6 + images.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = dimensions[index];
  header[entry + 1] = dimensions[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...images]));
