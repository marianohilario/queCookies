import assert from "node:assert/strict";
import { startBrowserCheck } from "./browser/environment.mjs";
import { viewport, noOverflow } from "./browser/helpers.mjs";
import { checkOrder } from "./browser/order-scenario.mjs";
import { checkStorage } from "./browser/storage-scenario.mjs";
import { checkNavigation } from "./browser/navigation-scenario.mjs";
import { checkRedesign } from "./browser/redesign-scenario.mjs";

const browser = await startBrowserCheck();
try {
  for (const width of [320, 375, 390, 768, 1440]) {
    await viewport(browser, width, width >= 1024 ? 1000 : 844);
    await browser.navigate("/");
    await browser.waitFor("!!document.querySelector('button[aria-label=\"Agregar Tradicional al carrito\"]') && !document.querySelector('button[aria-label=\"Agregar Tradicional al carrito\"]').disabled");
    await noOverflow(browser, `inicio ${width}`);
    if (width === 390 || width === 1440) {
      await browser.waitFor("[...document.images].filter(img => img.getBoundingClientRect().top < innerHeight).every(img => img.complete)");
      await browser.screenshot(`home-${width}`);
    }
    await browser.navigate("/cookies");
    await browser.waitFor("!!document.querySelector('button[aria-label=\"Agregar Tradicional al carrito\"]') && !document.querySelector('button[aria-label=\"Agregar Tradicional al carrito\"]').disabled");
    await noOverflow(browser, `catálogo ${width}`);
    console.log(`OK responsive sin desbordamiento horizontal a ${width}px`);
  }
  await checkNavigation(browser);
  await checkRedesign(browser);
  await checkOrder(browser);
  await checkStorage(browser);
  assert.equal(browser.errors.length, 0, JSON.stringify(browser.errors));
  console.log(`OK sin excepciones JS. Capturas: ${browser.artifacts}`);
} catch (error) {
  await browser.screenshot("failure").catch(() => {});
  throw error;
} finally { await browser.stop(); }
