async page => {
  const base = "file:///D:/git/scratches/2026.10/AI-voice-cloning/site/";
  const pages = ["index.html", "01-how-it-works.html", "02-cloud.html", "03-open-source.html", "04-voice-conversion.html",
    "05-explorer.html", "06-recording.html", "07-quality-control.html", "08-pipeline.html", "09-legal.html",
    "10-decide.html", "11-hands-on.html", "12-next.html", "glossary.html", "sources.html"];
  const errors = [];
  page.on("pageerror", e => errors.push("pageerror@" + page.url().split("/").pop() + ": " + e.message));
  page.on("console", m => { if (m.type() === "error" || m.type() === "warning") errors.push(m.type() + "@" + page.url().split("/").pop() + ": " + m.text()); });
  const out = { desktop: [], mobile: [], interactions: [] };

  for (const [mode, w, h] of [["desktop", 1366, 900], ["mobile", 390, 844]]) {
    await page.setViewportSize({ width: w, height: h });
    for (const p of pages) {
      await page.goto(base + p);
      await page.waitForTimeout(150);
      const r = await page.evaluate(() => {
        const de = document.documentElement;
        const wide = [];
        document.querySelectorAll(".content *").forEach(el => {
          if (el.closest(".table-wrap, figure.diagram, pre")) return;
          const b = el.getBoundingClientRect();
          if (b.right > window.innerWidth + 2 && b.width > 0) wide.push(el.tagName + "." + (el.className || "") + " right=" + Math.round(b.right));
        });
        return {
          title: document.title,
          hasTopbar: !!document.querySelector(".topbar"),
          sidebarLinks: document.querySelectorAll(".sidebar a").length,
          tocLinks: document.querySelectorAll(".toc a").length,
          pager: !!document.querySelector(".pager"),
          overflowX: de.scrollWidth > window.innerWidth + 1 ? de.scrollWidth : 0,
          wide: wide.slice(0, 3)
        };
      });
      out[mode].push(p + " | toc " + r.tocLinks + " | side " + r.sidebarLinks + " | pager " + r.pager + " | overflowX " + r.overflowX + (r.wide.length ? " | WIDE " + r.wide.join("; ") : ""));
    }
  }

  // interactions at mobile width
  await page.goto(base + "index.html");
  await page.click("#menu-btn");
  out.interactions.push("menu open: " + await page.evaluate(() => document.body.className));
  await page.goto(base + "index.html");
  const t0 = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  await page.click("#theme-btn");
  const t1 = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  out.interactions.push("theme: " + t0 + " -> " + t1);
  await page.click("#theme-btn");

  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto(base + "05-explorer.html");
  const cnt = async () => page.evaluate(() => document.getElementById("tool-count").textContent);
  out.interactions.push("explorer initial: " + await cnt());
  await page.click('#chips-kind .chip[data-kind="open"]');
  await page.click('#chips-flags .chip[data-flag="commercial"]');
  await page.click('#chips-flags .chip[data-flag="zh"]');
  out.interactions.push("open+commercial+zh: " + await cnt());
  // sort by SIM ZH descending
  const simZhTh = page.locator("#tools thead th", { hasText: "SIM ZH" });
  await simZhTh.click(); await simZhTh.click();
  out.interactions.push("top by SIM ZH: " + await page.evaluate(() => Array.from(document.querySelectorAll("#tools tbody tr")).slice(0, 3).map(r => r.cells[0].textContent.trim() + "=" + r.cells[8].textContent).join(", ")));
  await page.click('#chips-kind .chip[data-kind="all"]');
  await page.click('#chips-flags .chip[data-flag="commercial"]');
  await page.click('#chips-flags .chip[data-flag="zh"]');
  await page.click('#chips-flags .chip[data-flag="nogpu"]');
  out.interactions.push("no GPU: " + await cnt());
  await page.fill("#tool-search", "watermark");
  out.interactions.push("search watermark (with no-GPU on): " + await cnt());

  await page.goto(base + "10-decide.html");
  const costs = async () => page.evaluate(() => Array.from(document.querySelectorAll("#cost-table tbody tr")).map(r => r.cells[0].textContent + "=" + r.cells[2].textContent));
  out.interactions.push("costs default: " + (await costs()).join("; "));
  await page.fill("#c-hours", "1"); await page.fill("#c-zh", "0"); await page.fill("#c-over", "0");
  out.interactions.push("costs 1h EN no overhead: " + (await costs()).slice(0, 4).join("; ") + " ... " + (await costs()).slice(-1));
  out.interactions.push("helper default: " + await page.evaluate(() => document.querySelector("#helper-result h4").textContent));
  await page.check('input[name="priv"][value="local"]'); await page.check('input[name="hw"][value="16"]');
  out.interactions.push("helper local+16GB: " + await page.evaluate(() => document.querySelector("#helper-result h4").textContent));
  await page.check('input[name="priv"][value="any"]'); await page.check('input[name="bud"][value="any"]'); await page.check('input[name="pri"][value="like"]');
  out.interactions.push("helper cloud best: " + await page.evaluate(() => document.querySelector("#helper-result h4").textContent));
  await page.check('input[name="priv"][value="notrain"]');
  out.interactions.push("helper notrain: " + await page.evaluate(() => document.querySelector("#helper-result h4").textContent));
  await page.click('[data-tab="local"]');
  out.interactions.push("tab local visible: " + await page.evaluate(() => !document.querySelector('[data-panel="local"]').hidden));

  await page.goto(base + "11-hands-on.html");
  await page.click('[data-copy="agent-prompt-text"]');
  await page.waitForTimeout(200);
  out.interactions.push("copy button text: " + await page.evaluate(() => document.querySelector('[data-copy="agent-prompt-text"]').textContent));

  await page.goto(base + "sources.html");
  await page.click('[data-toggle-all="sources-all"]');
  out.interactions.push("details open after toggle: " + await page.evaluate(() => Array.from(document.querySelectorAll("#sources-all details")).filter(d => d.open).length + "/" + document.querySelectorAll("#sources-all details").length));

  await page.goto(base + "02-cloud.html");
  await page.fill('input[data-filter-for="cloud"]', "mandarin");
  out.interactions.push("cloud filter 'mandarin' visible rows: " + await page.evaluate(() => Array.from(document.querySelectorAll("#cloud tbody tr")).filter(r => r.style.display !== "none" && !r.hidden).length));

  out.errors = errors;
  return JSON.stringify(out, null, 1);
}
