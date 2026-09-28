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
