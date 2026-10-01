import assert from "node:assert/strict";
import { viewport, noOverflow } from "./helpers.mjs";

export async function checkRedesign(browser) {
  await viewport(browser, 390);
  await browser.navigate("/");
  await browser.waitFor("document.querySelector('header img')?.complete && document.querySelector('header img')?.naturalWidth > 0");
  assert.match(await browser.evaluate("document.querySelector('header img').currentSrc"), /que-cookies-logo/);
  assert.equal(await browser.evaluate("getComputedStyle(document.querySelector('nav[aria-label=\"Navegación móvil\"]')).backgroundColor"), "rgb(146, 25, 30)");
  assert.ok(await browser.evaluate("[...document.images].some(img => img.currentSrc.includes('hero-cookies'))"));

  const assets = [
    "/brand/que-cookies-logo.png", "/brand/motifs/hand.png", "/brand/motifs/heart.png",
    "/brand/motifs/cookie.png", "/brand/motifs/pattern.png", "/images/hero-cookies.jpg",
    "/images/cookies/traditional.png", "/images/cookies/pistachio.png",
    "/images/cookies/red-velvet.png", "/images/cookies/chocolate.png",
  ];
  const resources = await browser.evaluate(`Promise.all(${JSON.stringify(assets)}.map(async path => {
    const response = await fetch(path);
    return { path, status: response.status, type: response.headers.get('content-type') };
  }))`);
  assert.ok(resources.every((asset) => asset.status === 200 && asset.type?.startsWith("image/")), JSON.stringify(resources));

  await browser.evaluate("document.querySelector('article').closest('section').scrollIntoView({ block: 'start', behavior: 'instant' })");
  await browser.waitFor("[...document.querySelectorAll('article img')].every(img => img.complete && img.naturalWidth > 0)");
  await noOverflow(browser, "tarjetas y motivos en mobile");
  await browser.screenshot("home-catalog-390");
  const portraits = await browser.evaluate("[...document.querySelectorAll('article img')].map(img => img.getBoundingClientRect().width)");
  assert.ok(portraits.every((width) => width >= 100), `Ilustraciones demasiado pequeñas: ${portraits}`);

  await browser.evaluate("document.querySelector('main a[href=\"/cookies/mini-cookies\"]').closest('section').scrollIntoView({ block: 'start', behavior: 'instant' })");
  await browser.screenshot("brand-minis-390");
  console.log("OK logo corregido, paleta medida, imágenes locales, motivos y tamaño de ilustraciones");
}

// La imagen de la sección de minis se estiraba a la altura de la fila del grid
// (llegó a 303 × 1138 px) porque el elemento de la columna no fijaba proporción.
export async function checkMiniSectionImage(browser) {
  const imageRatio = () => browser.evaluate("(() => { const box = document.querySelector('#minis img').getBoundingClientRect(); return box.height / box.width; })()");

  for (const width of [390, 768, 1440]) {
    await viewport(browser, width);
    await browser.navigate("/cookies");
    await browser.waitFor("!!document.querySelector('#minis img')");
    const ratio = await imageRatio();
    assert.ok(Math.abs(ratio - 1) < 0.02, `imagen de minis deformada a ${width}px: ratio ${ratio.toFixed(2)}`);

    await browser.navigate("/cookies/mini-cookies");
    await browser.waitFor("!!document.querySelector('img[alt^=\"Fotografía ilustrativa\"]')");
    const fichaRatio = await browser.evaluate("(() => { const box = document.querySelector('img[alt^=\"Fotografía ilustrativa\"]').getBoundingClientRect(); return box.height / box.width; })()");
    assert.ok(Math.abs(fichaRatio - 1) < 0.02, `ficha deformada a ${width}px: ratio ${fichaRatio.toFixed(2)}`);

    await browser.navigate("/cookies");
    await browser.waitFor("!!document.querySelector('#minis img')");
    // La imagen acotada no debe empujar el selector fuera de la tarjeta.
    const dentro = await browser.evaluate("(() => { const img = document.querySelector('#minis img').getBoundingClientRect(); const card = document.querySelector('#minis .grid').getBoundingClientRect(); return img.top >= card.top - 1 && img.bottom <= card.bottom + 1; })()");
    assert.ok(dentro, `la imagen de minis se sale de la tarjeta a ${width}px`);
  }
  await viewport(browser, 390);
  await browser.navigate("/cookies");
  await browser.waitFor("!!document.querySelector('#minis img')");
  await noOverflow(browser, "sección de minis acotada");
  console.log("OK la imagen de minis respeta 1:1 como la ficha, sin salirse de la tarjeta");
}
