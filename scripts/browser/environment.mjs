import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { connectBrowser } from "./cdp.mjs";

function run(command, args) {
  const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  child.stdout.on("data", (data) => { output += data; });
  child.stderr.on("data", (data) => { output += data; });
  child.on("error", (error) => { output += error.message; });
  return {
    child,
    async until(pattern) {
      for (let attempt = 0; attempt < 150; attempt++) {
        const match = output.match(pattern);
        if (match) return match;
        if (child.exitCode !== null) throw new Error(output);
        await delay(100);
      }
      throw new Error(`No inició ${command}: ${output}`);
    },
  };
}

export async function startBrowserCheck() {
  const artifacts = resolve(".artifacts/browser");
  await mkdir(artifacts, { recursive: true });
  const profile = await mkdtemp(resolve(".artifacts/chrome-profile-"));
  const port = process.env.BROWSER_TEST_PORT || "43128";
  const origin = `http://127.0.0.1:${port}`;
  const server = run(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", port]);
  const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  let chrome;
  let browser;

  async function stop() {
    browser?.close();
    chrome?.child.kill("SIGTERM");
    server.child.kill("SIGTERM");
    await delay(400);
    await rm(profile, { recursive: true, force: true });
  }
  try {
    await server.until(/Ready/);
    chrome = run(chromePath, ["--headless=new", "--no-first-run", "--no-default-browser-check", "--disable-background-networking", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"]);
    const match = await chrome.until(/DevTools listening on (ws:\/\/[^\s]+)/);
    browser = await connectBrowser(match[1]);
    const navigate = async (path) => {
      await browser.send("Page.navigate", { url: origin + path });
      await browser.waitFor(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete'`);
      await browser.evaluate("document.fonts.ready.then(() => true)");
    };
    const screenshot = async (name) => {
      const { data } = await browser.send("Page.captureScreenshot", { format: "png" });
      await writeFile(join(artifacts, `${name}.png`), Buffer.from(data, "base64"));
    };
    return { ...browser, origin, artifacts, navigate, screenshot, stop };
  } catch (error) { await stop(); throw error; }
}
