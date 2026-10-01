import assert from "node:assert/strict";

export async function click(browser, selector) {
  await browser.waitFor(`!!document.querySelector(${JSON.stringify(selector)}) && !document.querySelector(${JSON.stringify(selector)}).disabled`);
  await browser.evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
}

export async function clickText(browser, text) {
  await browser.waitFor(`[...document.querySelectorAll('button,a')].some(el => el.textContent.trim().includes(${JSON.stringify(text)}) && !el.disabled)`);
  await browser.evaluate(`[...document.querySelectorAll('button,a')].find(el => el.textContent.trim().includes(${JSON.stringify(text)}) && !el.disabled).click()`);
}

export async function fill(browser, selector, value) {
  await browser.waitFor(`!!document.querySelector(${JSON.stringify(selector)})`);
  await browser.evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    const prototype = el.tagName === 'SELECT' ? HTMLSelectElement.prototype : el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(el, ${JSON.stringify(value)});
    el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
  })()`);
}

// innerText corta con saltos de línea donde el texto envuelve: el texto plano del DOM
// no, y así una frase se puede comparar completa sin depender del ancho de pantalla.
export async function bodyText(browser) {
  return browser.evaluate("document.body.textContent.replace(/\\s+/g, ' ').trim()");
}

export async function noOverflow(browser, label) {
  const widths = await browser.evaluate("({ document: document.documentElement.scrollWidth, viewport: window.innerWidth })");
  assert.ok(widths.document <= widths.viewport + 1, `${label}: overflow ${JSON.stringify(widths)}`);
}

export async function viewport(browser, width, height = 844) {
  await browser.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
}
