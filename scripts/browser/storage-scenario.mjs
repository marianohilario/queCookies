import assert from "node:assert/strict";
import { connectBrowser } from "./cdp.mjs";
import { click, clickText } from "./helpers.mjs";

export async function checkStorage(browser) {
  await browser.navigate("/carrito");
  await browser.waitFor("document.body.innerText.includes('13.000')");
  const secondTab = await connectBrowser(browser.url);
  try {
    await secondTab.send("Page.navigate", { url: `${browser.origin}/carrito` });
    await secondTab.waitFor("document.body.innerText.includes('13.000')");
    await secondTab.evaluate("localStorage.setItem('quecookies:cart:v1', JSON.stringify({ version: 1, items: [{ productId: 'cookie-tradicional', quantity: 2, lastPrice: 350000 }] }))");
    await browser.waitFor("document.body.innerText.includes('7.000') && !document.body.innerText.includes('13.000')");
    console.log("OK sincronización de carrito entre pestañas");
  } finally { secondTab.close(); }

  await browser.evaluate("localStorage.setItem('quecookies:cart:v1', '{corrupto')");
  await browser.send("Page.reload");
  await browser.waitFor("document.body.innerText.includes('No pudimos recuperar')");
  assert.ok(await browser.evaluate("document.body.innerText.includes('Tu próximo antojo')"));
  console.log("OK recuperación de almacenamiento corrupto con aviso visible");

  const { identifier } = await browser.send("Page.addScriptToEvaluateOnNewDocument", {
    source: "Storage.prototype.getItem = () => { throw new Error('Storage bloqueado simulado'); }; Storage.prototype.setItem = () => { throw new Error('Storage bloqueado simulado'); };",
  });
  try {
    await browser.navigate("/cookies");
    await click(browser, 'button[aria-label="Aumentar Tradicional"]');
    await browser.waitFor("document.querySelector('output[aria-label=\"Tradicional\"]')?.textContent === '1'");
    await click(browser, 'button[aria-label="Aumentar Tradicional"]');
    await click(browser, 'nav[aria-label="Navegación móvil"] a[href="/carrito"]');
    await browser.waitFor("location.pathname === '/carrito' && document.body.innerText.includes('No podemos guardar')");
    assert.ok(await browser.evaluate("document.body.innerText.includes('7.000')"));
    await clickText(browser, "Continuar con mi pedido");
    await browser.waitFor("!!document.querySelector('#name')");
    console.log("OK carrito y checkout en memoria con almacenamiento denegado");
  } finally {
    await browser.send("Page.removeScriptToEvaluateOnNewDocument", { identifier });
  }
}
