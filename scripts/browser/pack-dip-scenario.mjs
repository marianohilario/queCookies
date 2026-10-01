import assert from "node:assert/strict";
import { bodyText, click, clickText, viewport } from "./helpers.mjs";

const dip = (name) => `output[aria-label="${name}"]`;

const addPackTop = (browser) => browser.evaluate("[...document.querySelectorAll('button')].find(el => el.textContent.includes('Agregar pack')).getBoundingClientRect().top");

// formatMoney separa el símbolo del importe con un espacio duro.
const addPackLabel = (browser) => bodyText(browser).then((text) => text.match(/Agregar pack · [^ ]+ [\d.]+/)?.[0]);

const readDips = (browser, name) =>
  browser.evaluate(`Number(document.querySelector('${dip(name)}')?.textContent)`);

async function expectDip(browser, name, quantity) {
  await browser.waitFor(`document.querySelector('${dip(name)}')?.textContent === '${quantity}'`);
}

export async function checkPackDips(browser) {
  await viewport(browser, 390);
  await browser.navigate("/cookies/mini-cookies");
  await browser.evaluate("localStorage.clear()");
  await browser.navigate("/cookies/mini-cookies");

  // Sin dips el pack mantiene su precio de lista.
  assert.equal(await readDips(browser, "Dip de Nutella"), 0);
  assert.ok((await bodyText(browser)).includes("Sin dips, el pack conserva su precio de lista."));
  assert.equal(await addPackLabel(browser), "Agregar pack · $ 9.500");

  // Un dip suma su precio sin mover el botón de agregar.
  const before = await addPackTop(browser);
  await click(browser, 'button[aria-label="Aumentar Dip de Nutella"]');
  await expectDip(browser, "Dip de Nutella", 1);
  assert.equal(await addPackLabel(browser), "Agregar pack · $ 11.500");
  assert.ok(Math.abs(await addPackTop(browser) - before) < 1, "el botón agregar se movió al elegir dips");
  console.log("OK un dip suma $2.000 al pack sin desplazar el botón de agregar");

  // Bajar de cero no genera dips negativos.
  await click(browser, 'button[aria-label="Reducir Dip de Nutella"]');
  await expectDip(browser, "Dip de Nutella", 0);
  await click(browser, 'button[aria-label="Aumentar Dip de Nutella"]');
  await expectDip(browser, "Dip de Nutella", 1);

  // Varios dips de los dos sabores se acumulan en el precio.
  await click(browser, 'button[aria-label="Aumentar Dip de Nutella"]');
  await click(browser, 'button[aria-label="Aumentar Dip de chocolate blanco"]');
  await click(browser, 'button[aria-label="Aumentar Dip de chocolate blanco"]');
  await expectDip(browser, "Dip de Nutella", 2);
  await expectDip(browser, "Dip de chocolate blanco", 2);
  assert.ok((await bodyText(browser)).includes("2 Dip de Nutella · 2 Dip de chocolate blanco"));
  // $9.500 del pack más $2.000 por cada uno de los cuatro dips.
  assert.equal(await addPackLabel(browser), "Agregar pack · $ 17.500");
  console.log("OK los dips de los dos sabores se acumulan en el precio del pack");

  await clickText(browser, "Agregar pack");
  await browser.navigate("/carrito");
  await browser.waitFor("document.body.textContent.includes('Dips: 2 Dip de Nutella · 2 Dip de chocolate blanco')");
  await browser.waitFor("document.body.textContent.includes('17.500')");
  console.log("OK el carrito conserva el detalle de dips del pack");

  // El mismo pack con otros dips es una línea aparte, no se fusiona.
  await browser.navigate("/cookies/mini-cookies");
  await expectDip(browser, "Dip de Nutella", 0);
  await click(browser, 'button[aria-label="Aumentar Dip de Nutella"]');
  await clickText(browser, "Agregar pack");
  await browser.navigate("/carrito");
  await browser.waitFor("[...document.querySelectorAll('li')].filter((el) => el.textContent.includes('Mini cookies × 12')).length === 2");
  await browser.waitFor("document.body.textContent.includes('29.000')");
  console.log("OK dos combinaciones de dips del mismo pack quedan como líneas separadas");

  // El desglose viaja guardado y el pedido se prepara con el extra incluido.
  const persisted = await browser.evaluate("JSON.parse(localStorage.getItem('quecookies:cart:v3')).items.map((item) => item.dips && Object.values(item.dips).join('/')).join(' ; ')");
  assert.match(persisted, /2\/2 ; 1\/0/);

  // Se deja el carrito como estaba para no arrastrar packs a los escenarios siguientes.
  await browser.evaluate("localStorage.removeItem('quecookies:cart:v3')");
}
