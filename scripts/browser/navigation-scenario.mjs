import assert from "node:assert/strict";
import { click, noOverflow, viewport } from "./helpers.mjs";

const nav = 'nav[aria-label="Navegación móvil"]';

export async function checkNavigation(browser) {
  for (const width of [320, 375, 390]) {
    await viewport(browser, width);
    await browser.navigate("/");
    await browser.waitFor(`!!document.querySelector(${JSON.stringify(`${nav} a[aria-current]`)})`);
    const links = await browser.evaluate(`Array.from(document.querySelectorAll(${JSON.stringify(`${nav} a`)}), el => ({
      label: el.textContent.trim(), width: el.getBoundingClientRect().width,
      height: el.getBoundingClientRect().height, icon: !!el.querySelector('svg,.brand-motif')
    }))`);
    assert.deepEqual(links.map((link) => link.label), ["Inicio", "Cookies", "Carrito", "Contacto"]);
    assert.ok(links.every((link) => link.width >= 44 && link.height >= 44 && link.icon));
    assert.equal(await browser.evaluate("document.querySelectorAll('header summary').length"), 0);
    await noOverflow(browser, `barra inferior ${width}`);
    await browser.evaluate("window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })");
    await browser.waitFor(`document.querySelector('footer').getBoundingClientRect().bottom <= document.querySelector(${JSON.stringify(nav)}).getBoundingClientRect().top + 1`);
    console.log(`OK cuatro accesos, tamaño táctil y pie sin superposición a ${width}px`);
  }

  for (const [href, label] of [["/cookies", "Cookies"], ["/carrito", "Carrito"], ["/nosotros", "Contacto"], ["/", "Inicio"]]) {
    await click(browser, `${nav} a[href="${href}"]`);
    await browser.waitFor(`location.pathname === ${JSON.stringify(href)} && document.querySelector(${JSON.stringify(`${nav} a[aria-current]`)})?.textContent.trim() === ${JSON.stringify(label)}`);
  }
  for (const [path, href] of [["/cookies/mini-cookies", "/cookies"], ["/checkout", "/carrito"]]) {
    await browser.navigate(path);
    await browser.waitFor(`document.querySelector(${JSON.stringify(`${nav} a[aria-current]`)})?.getAttribute('href') === ${JSON.stringify(href)}`);
  }
  await browser.navigate("/preguntas-frecuentes");
  assert.equal(await browser.evaluate(`document.querySelectorAll(${JSON.stringify(`${nav} a[aria-current]`)}).length`), 0);
  await viewport(browser, 1440, 1000);
  assert.equal(await browser.evaluate(`getComputedStyle(document.querySelector(${JSON.stringify(nav)})).display`), "none");
  assert.equal(await browser.evaluate("getComputedStyle(document.body).paddingBottom"), "0px");
  console.log("OK destinos, activo en fichas/checkout y navegación superior de escritorio");
}

export async function checkNavigationWithCart(browser) {
  await browser.waitFor(`document.querySelector(${JSON.stringify(`${nav} a[href="/carrito"]`)})?.getAttribute('aria-label') === 'Carrito, 2 artículos'`);
  assert.equal(await browser.evaluate("document.body.innerText.includes('Ver carrito ·')"), false);
  await browser.evaluate("[...document.querySelectorAll('button')].find(el => el.textContent.includes('Continuar por WhatsApp')).scrollIntoView({block: 'center', behavior: 'instant'})");
  const visible = await browser.evaluate(`(() => {
    const button = [...document.querySelectorAll('button')].find(el => el.textContent.includes('Continuar por WhatsApp')).getBoundingClientRect();
    const bar = document.querySelector(${JSON.stringify(nav)}).getBoundingClientRect();
    return button.top >= 0 && button.bottom <= bar.top;
  })()`);
  assert.ok(visible, "La barra no debe cubrir el CTA del checkout");
  await browser.screenshot("checkout-bottom-nav-390");
  console.log("OK contador compartido, barra única y CTA de WhatsApp accesible");
}
