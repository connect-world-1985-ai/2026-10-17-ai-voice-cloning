// Static checks for the site: internal links + anchors, JS syntax (files and inline scripts), duplicate ids.
// Usage: node check-site.js <siteDir>
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = path.resolve(process.argv[2] || ".");
const pages = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
let problems = 0;
const report = (msg) => { problems++; console.log("PROBLEM: " + msg); };

function slug(s) {
  return s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}
function stripTags(s) { return s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'"); }

const ids = {};
const html = {};
for (const p of pages) {
  const src = fs.readFileSync(path.join(dir, p), "utf8");
  html[p] = src;
  const set = new Set();
  const seen = {};
  for (const m of src.matchAll(/\sid="([^"]+)"/g)) {
    if (seen[m[1]]) report(`${p}: duplicate id "${m[1]}"`);
    seen[m[1]] = 1; set.add(m[1]);
  }
  // auto ids for h2/h3 without id, mimicking site.js (ignores the details/no-toc skip, which only skips TOC)
  for (const m of src.matchAll(/<(h2|h3)(\s[^>]*)?>([\s\S]*?)<\/\1>/g)) {
    if (m[2] && /\sid="/.test(m[2])) continue;
    let base = slug(stripTags(m[3])) || "s", id = base, n = 2;
    while (set.has(id)) id = base + "-" + n++;
    set.add(id);
  }
  ids[p] = set;
}

for (const p of pages) {
  const src = html[p];
  for (const m of src.matchAll(/\s(href|src)="([^"]+)"/g)) {
    const url = m[2];
    if (/^(https?:|mailto:|data:|javascript:)/i.test(url)) continue;
    if (/' \+|\+ '/.test(url)) continue;
    const [file, anchor] = url.split("#");
    const target = file === "" ? p : file;
    const fp = path.join(dir, target);
    if (!fs.existsSync(fp)) { report(`${p}: missing file ${url}`); continue; }
    if (anchor && target.endsWith(".html") && !ids[target].has(anchor)) report(`${p}: missing anchor ${url}`);
  }
  // inline scripts
  let i = 0;
  for (const m of src.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    i++;
    try { new vm.Script(m[1], { filename: `${p}#inline${i}` }); } catch (e) { report(`${p}: inline script ${i} syntax error: ${e.message}`); }
  }
  if (!/<script src="assets\/js\/site\.js"><\/script>/.test(src)) report(`${p}: site.js not included`);
  if (/type="module"|import\s|fetch\(|XMLHttpRequest/.test(src)) report(`${p}: module/fetch usage`);
  // http links without https
  for (const m of src.matchAll(/href="http:\/\/[^"]+"/g)) console.log(`note: ${p}: insecure link ${m[0]}`);
}

for (const f of fs.readdirSync(path.join(dir, "assets/js"))) {
  const code = fs.readFileSync(path.join(dir, "assets/js", f), "utf8");
  try { new vm.Script(code, { filename: f }); } catch (e) { report(`assets/js/${f}: syntax error: ${e.message}`); }
  if (/\bimport\s|fetch\(|XMLHttpRequest/.test(code)) report(`assets/js/${f}: module/fetch usage`);
}

// data-tools sanity
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "assets/js/data-tools.js"), "utf8"), ctx);
const tools = ctx.window.TOOLS_DATA || [];
const allowed = { kind: ["cloud", "open", "vc"], commercial: ["yes", "cond", "no", "unclear"], ev: ["v", "p", "i", "u", "x"] };
const seenIds = {};
for (const t of tools) {
  if (seenIds[t.id]) report(`data-tools: duplicate id ${t.id}`); seenIds[t.id] = 1;
  for (const k in allowed) if (!allowed[k].includes(t[k])) report(`data-tools: ${t.id} bad ${k}=${t[k]}`);
  for (const k of ["name", "url", "licence", "notes", "status"]) if (!t[k]) report(`data-tools: ${t.id} missing ${k}`);
}
console.log(`Checked ${pages.length} pages, ${tools.length} tools. Problems: ${problems}`);
process.exit(problems ? 1 : 0);
