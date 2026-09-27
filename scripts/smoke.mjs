import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = process.env.SMOKE_PORT || "43127";
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", port]);
let output = "";
server.stdout.on("data", (data) => { output += data; });
server.stderr.on("data", (data) => { output += data; });

const pages = [
  ["/", "Es tu momento"],
  ["/cookies", "Seguí tu antojo"],
  ["/cookies/tradicional", "Tradicional"],
  ["/cookies/mini-cookies", "Mini cookies"],
  ["/nosotros", "Banfield"],
  ["/preguntas-frecuentes", "pedido mínimo"],
  ["/privacidad", "Tus datos"],
  ["/carrito", "Tu carrito"],
  ["/checkout", "Armemos tu pedido"],
];

try {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (server.exitCode !== null) throw new Error(output);
    if (output.includes("Ready")) break;
    await delay(100);
    if (attempt === 99) throw new Error(`El servidor no inició: ${output}`);
  }
  for (const [path, text] of pages) {
    const response = await fetch(`${origin}${path}`);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.ok(html.includes(text), `${path}: falta ${text}`);
    assert.ok(html.includes('lang="es-AR"'), `${path}: idioma`);
    console.log(`OK ${path}`);
  }
  const missing = await fetch(`${origin}/ruta-inexistente`);
  assert.equal(missing.status, 404);
  console.log("OK 404 · smoke HTTP; no sustituye pruebas de navegador");
} finally {
  server.kill("SIGTERM");
}
