import assert from "node:assert/strict";
import { click, clickText, viewport } from "./helpers.mjs";

const flavor = (name) => `output[aria-label="${name} en el pack"]`;

async function readMix(browser) {
  return browser.evaluate("[...document.querySelectorAll('output[aria-label$=\" en el pack\"]')].map((el) => Number(el.textContent))");
}

async function expectMix(browser, name, quantity) {
  await browser.waitFor(`document.querySelector('${flavor(name)}')?.textContent === '${quantity}'`);
}

export async function checkPackMix(browser) {
  await viewport(browser, 390);
  await browser.navigate("/cookies/mini-cookies");
  await browser.evaluate("localStorage.clear()");
  await browser.navigate("/cookies/mini-cookies");

  // Arranca con el reparto equitativo completo y el botón habilitado.
  assert.deepEqual(await readMix(browser), [4, 4, 4]);
  assert.ok(await browser.evaluate("!document.body.innerText.includes('Faltan')"));
  assert.equal(await browser.evaluate("[...document.querySelectorAll('button')].find(el => el.textContent.includes('Agregar pack'))?.disabled"), false);

  // Bajar un sabor abre lugar y bloquea la compra hasta completarla.
  await click(browser, 'button[aria-label="Reducir Cacao en el pack"]');
  assert.deepEqual(await readMix(browser), [4, 3, 4]);
  await browser.waitFor("document.body.innerText.includes('Faltan 1')");
  assert.equal(await browser.evaluate("[...document.querySelectorAll('button')].find(el => el.textContent.includes('Agregar pack'))?.disabled"), true);

  // Completar con otro sabor deja lista la combinación y no cambia el precio.
  await click(browser, 'button[aria-label="Aumentar Tradicional en el pack"]');
  assert.deepEqual(await readMix(browser), [5, 3, 4]);
  await browser.waitFor("document.body.innerText.includes('12 minis listas')");
  assert.ok(await browser.evaluate("document.body.innerText.includes('5 Tradicional · 3 Cacao · 4 Red Velvet')"));
  assert.ok(await browser.evaluate("document.body.innerText.includes('9.500')"));
  console.log("OK combinación de sabores exacta: el total clava en el pack y el precio no cambia");

  await clickText(browser, "Agregar pack");
  await browser.navigate("/carrito");
  await browser.waitFor("document.body.innerText.includes('5 Tradicional · 3 Cacao · 4 Red Velvet')");
  await browser.waitFor("document.body.innerText.includes('9.500')");
  console.log("OK el carrito conserva el detalle de sabores del pack");

  // Segunda combinación del mismo pack: línea aparte, no se fusiona.
  await browser.navigate("/cookies/mini-cookies");
  await expectMix(browser, "Cacao", 4);
  await clickText(browser, "Reparto equitativo");
  await expectMix(browser, "Cacao", 4);
  await click(browser, 'button[aria-label="Aumentar Red Velvet en el pack"]');
  // Subir un sabor toma una unidad del que más tiene, para no dejar el pack incompleto.
  assert.deepEqual(await readMix(browser), [3, 4, 5]);
  await clickText(browser, "Agregar pack");
  await browser.navigate("/carrito");
  await browser.waitFor("[...document.querySelectorAll('li')].filter((el) => el.textContent.includes('Mini cookies × 12')).length === 2");
  assert.ok(await browser.evaluate("document.body.innerText.includes('19.000')"));
  console.log("OK dos combinaciones del mismo pack quedan como líneas separadas");

  // Cada combinación persistida es la que el mensaje de WhatsApp detallará.
  const persisted = await browser.evaluate("JSON.parse(localStorage.getItem('quecookies:cart:v2')).items.filter((item) => item.mix).map((item) => Object.values(item.mix).join('/')).join(' ; ')");
  assert.match(persisted, /5\/3\/4 ; 3\/4\/5/);
  console.log("OK cada combinación queda guardada por separado para el pedido");

  // Se deja el carrito como estaba para no arrastrar packs a los escenarios siguientes.
  await browser.evaluate("localStorage.removeItem('quecookies:cart:v2')");
}