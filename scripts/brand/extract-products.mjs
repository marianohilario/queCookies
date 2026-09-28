import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Uses the image engine already installed by Next.js; no new dependency.
// These are illustrative crops from the supplied mockup, not product photography.
const source = "public/brand/references/referencia-web.jpeg";
const directory = "public/images/cookies";
const crops = [
  { name: "traditional", left: 328, top: 842, width: 120, height: 111 },
  { name: "pistachio", left: 276, top: 506, width: 156, height: 137 },
  { name: "red-velvet", left: 465, top: 506, width: 156, height: 137 },
  { name: "chocolate", left: 674, top: 506, width: 156, height: 137 },
];

function removeConnectedBackground(data, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];
  function enqueue(x, y) {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const pixel = y * width + x;
    if (visited[pixel]) return;
    const offset = pixel * 4;
    const [r, g, b] = data.subarray(offset, offset + 3);
    if (r < 180 || g < 165 || b < 150 || Math.max(255 - r, 248 - g, 234 - b) > 60) return;
    visited[pixel] = 1;
    queue.push(pixel);
  }
  for (let x = 0; x < width; x++) { enqueue(x, 0); enqueue(x, height - 1); }
  for (let y = 0; y < height; y++) { enqueue(0, y); enqueue(width - 1, y); }
  for (let index = 0; index < queue.length; index++) {
    const pixel = queue[index];
    const x = pixel % width, y = Math.floor(pixel / width);
    data[pixel * 4 + 3] = 0;
    enqueue(x - 1, y); enqueue(x + 1, y); enqueue(x, y - 1); enqueue(x, y + 1);
  }
  return data;
}

await mkdir(directory, { recursive: true });
for (const { name, ...rect } of crops) {
  const { data, info } = await sharp(source).extract(rect).toColourspace("srgb").ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = removeConnectedBackground(data, info.width, info.height);
  await sharp(pixels, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(`${directory}/${name}.png`);
  console.log(`Ilustración extraída: ${name}, ${info.width}×${info.height}`);
}
