import assert from "node:assert/strict";
import { click, clickText, viewport } from "./helpers.mjs";

const increase = 'button[aria-label="Aumentar Tradicional"]';
const decrease = 'button[aria-label="Reducir Tradicional"]';

async function expectQuantity(browser, quantity) {
  await browser.waitFor(`document.querySelector('output[aria-label="Tradicional"]')?.textContent === '${quantity}'`);
  await browser.waitFor(`(() => {
    const cart = JSON.parse(localStorage.getItem('quecookies:cart:v3'));
    const line = cart?.items.find(item => item.productId === 'cookie-tradicional');
    return ${quantity} === 0 ? !line : line?.quantity === ${quantity};
  })()`);
}

export async function checkCardQuantity(browser) {
  await viewport(browser, 390);
  for (const path of ["/", "/cookies"]) {
    await browser.navigate(path);
    await browser.waitFor(`!!document.querySelector('${increase}') && !document.querySelector('${increase}').disabled`);
    await expectQuantity(browser, 0);
    assert.equal(await browser.evaluate(`document.querySelector('${decrease}').disabled`), true);

    await click(browser, increase);
    await expectQuantity(browser, 1);
    assert.equal(await browser.evaluate(`document.querySelector('${decrease}').disabled`), false);
    await click(browser, increase);
    await expectQuantity(browser, 2);
    await browser.waitFor("document.querySelector('nav[aria-label=\"Navegación móvil\"] a[href=\"/carrito\"]')?.getAttribute('aria-label') === 'Carrito, 2 artículos'");
    await browser.navigate("/carrito");
    await browser.waitFor("document.body.innerText.includes('7.000')");
    await expectQuantity(browser, 2);
    await click(browser, decrease);
    await expectQuantity(browser, 1);
    assert.equal(await browser.evaluate(`document.querySelector('${decrease}').disabled`), true);

    await browser.navigate(path === "/" ? "/cookies" : "/");
    await expectQuantity(browser, 1);
    await click(browser, decrease);
    await expectQuantity(browser, 0);
    await browser.send("Page.reload");
    await browser.waitFor(`!!document.querySelector('${increase}') && !document.querySelector('${increase}').disabled`);
    await expectQuantity(browser, 0);
    assert.equal(await browser.evaluate(`document.querySelector('${decrease}').disabled`), true);

    await click(browser, increase);
    await expectQuantity(browser, 1);
    await browser.navigate("/carrito");
    await expectQuantity(browser, 1);
    await clickText(browser, "Quitar");
    await browser.waitFor("document.body.innerText.includes('Tu próximo antojo')");
    await browser.waitFor("JSON.parse(localStorage.getItem('quecookies:cart:v3')).items.length === 0");
  }
  await browser.navigate("/cookies/mini-cookies");
  await browser.waitFor("!!document.querySelector('button[aria-label=\"Reducir packs\"]')");
  assert.equal(await browser.evaluate("document.querySelector('button[aria-label=\"Reducir packs\"]').disabled"), true);
  console.log("OK tarjetas: 0→1→2, sincronización inicio/catálogo/carrito, eliminación 1→0 persistida y volver a agregar; carrito/ficha conservan mínimo uno");
}
