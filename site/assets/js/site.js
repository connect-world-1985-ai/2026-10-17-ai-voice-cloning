/* Your Voice, Synthesised — field guide. Shared behaviour.
   Classic script (no modules, no fetch) so every page works from file://.
   Adding a page = add one entry to PAGES. */
(function () {
  "use strict";

  var PAGES_EN = [
    { group: "Start here" },
    { file: "lecture.html", num: "L", title: "Lecture (24 min)" },
    { file: "index.html", num: "0", title: "Overview & how to read this" },
    { file: "01-how-it-works.html", num: "1", title: "How voice cloning works" },
    { group: "The landscape" },
    { file: "02-cloud.html", num: "2", title: "Cloud services" },
    { file: "03-open-source.html", num: "3", title: "Open-source & local models" },
    { file: "04-voice-conversion.html", num: "4", title: "Voice conversion (speech-to-speech)" },
    { file: "05-explorer.html", num: "5", title: "Tool explorer (sortable)" },
    { group: "Doing it well" },
    { file: "06-recording.html", num: "6", title: "Recording & cleaning your voice" },
    { file: "07-quality-control.html", num: "7", title: "Quality, evaluation & control" },
    { file: "08-pipeline.html", num: "8", title: "The agent narration pipeline" },
    { file: "09-legal.html", num: "9", title: "Legal, ethics & safety" },
    { group: "Decide & start" },
    { file: "10-decide.html", num: "10", title: "Decision framework & cost calculator" },
    { file: "11-hands-on.html", num: "11", title: "Hands-on experiment & agent prompt" },
    { file: "12-next.html", num: "12", title: "Directions for our next discussion" },
    { group: "Reference" },
    { file: "glossary.html", num: "G", title: "Glossary" },
    { file: "sources.html", num: "S", title: "Sources & method" }
  ];
  var PAGES_ZH = [
    { group: "从这里开始" },
    { file: "lecture.html", num: "讲", title: "讲座（中文旁白，31 分钟）" },
    { file: "index.html", num: "0", title: "概览，以及怎么读" },
    { file: "01-how-it-works.html", num: "1", title: "声音克隆怎么工作" },
    { group: "市面上有什么" },
    { file: "02-cloud.html", num: "2", title: "云服务" },
    { file: "03-open-source.html", num: "3", title: "开源与本地模型" },
    { file: "04-voice-conversion.html", num: "4", title: "声音转换（语音到语音）" },
    { file: "05-explorer.html", num: "5", title: "工具表（可排序）" },
    { group: "把它做好" },
    { file: "06-recording.html", num: "6", title: "录音与清理" },
    { file: "07-quality-control.html", num: "7", title: "质量、评测与控制" },
    { file: "08-pipeline.html", num: "8", title: "智能体旁白流程" },
    { file: "09-legal.html", num: "9", title: "法律、伦理与安全" },
    { group: "做决定并开始" },
    { file: "10-decide.html", num: "10", title: "决策框架与费用计算" },
    { file: "11-hands-on.html", num: "11", title: "动手实验与智能体提示" },
    { file: "12-next.html", num: "12", title: "下次讨论的方向" },
    { group: "参考" },
    { file: "glossary.html", num: "词", title: "术语" },
    { file: "sources.html", num: "源", title: "来源与方法" }
  ];
  var ZH = document.documentElement.lang === "zh-CN";
  var PAGES = ZH ? PAGES_ZH : PAGES_EN;
  window.SITE_PAGES = PAGES;

  var EV_TITLES = ZH ? {
    v: "已核实：对照过一手来源（官方文档、价格页、仓库、许可证、论文）。",
    p: "实践：从业者广泛使用的做法。是靠得住的建议，不是单条出处的事实。",
    i: "推断：作者根据证据做的推理，不是一条有出处的事实。",
    u: "未核实：有人这样说或这样宣传（常常是供应商自己或二手来源），没有独立确认。",
    x: "实验性：演示或研究里能工作，生产里还不可靠。"
  } : {
    v: "Verified fact: checked against a primary source (official docs, pricing page, repository, licence file, paper).",
    p: "Practice: widely documented way practitioners work; sound advice, not a single sourced fact.",
    i: "Inference: the author's reasoning from the evidence, not a sourced fact.",
    u: "Unverified: reported or marketed (often by the vendor itself or a secondary source), not independently confirmed.",
    x: "Experimental: works in demos or research, not yet dependable in production."
  };

  function safeGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]); }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function currentFile() {
    var p = decodeURIComponent(location.pathname).replace(/\\/g, "/");
    var f = p.substring(p.lastIndexOf("/") + 1);
    return f || "index.html";
  }
  function slug(s) {
    var t = s.toLowerCase().replace(/<[^>]+>/g, "").trim();
    var ascii = t.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
    if (ascii) return ascii;
    return t.replace(/\s+/g, "-").replace(/[^\u4e00-\u9fff0-9a-z-]+/gi, "").slice(0, 40) || "s";
  }

  /* ---------- theme ---------- */
  var saved = safeGet("avc-theme");
  if (saved === "light" || saved === "dark") document.documentElement.setAttribute("data-theme", saved);

  function effectiveTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function buildChrome() {
    var cur = currentFile();
    var body = document.body;
    var main = document.querySelector("main");
    if (!main) return;

    var top = el("header", { "class": "topbar" });
    var langHref = (ZH ? "../" : "zh/") + cur;
    var langLabel = ZH ? "EN" : "中文";
    top.innerHTML =
      '<button class="icon-btn" id="menu-btn" aria-label="' + (ZH ? "打开导航" : "Open navigation") + '">☰</button>' +
      '<a class="brand" href="index.html">' + (ZH ? "你的声音，被合成出来" : "Your Voice, Synthesised") +
      ' <small>' + (ZH ? "用自己的声音教书 · 指南 · 2026年10月" : "voice cloning for teaching · field guide · Oct 2026") + '</small></a>' +
      '<span class="spacer"></span>' +
      '<a class="icon-btn" href="' + langHref + '">' + langLabel + '</a>' +
      '<button class="icon-btn" id="ev-btn" title="' + (ZH ? "证据标签说明" : "Evidence label legend") + '">' + (ZH ? "标签" : "Labels") + '</button>' +
      '<button class="icon-btn" id="theme-btn" aria-label="' + (ZH ? "切换深色模式" : "Toggle dark mode") + '"></button>';
    body.insertBefore(top, body.firstChild);

    var layout = el("div", { "class": "layout" });
    var side = el("nav", { "class": "sidebar", "aria-label": ZH ? "页面" : "Pages" });
    var html = "";
    PAGES.forEach(function (p) {
      if (p.group) { html += '<div class="group">' + p.group + "</div>"; return; }
      html += '<a href="' + p.file + '"' + (p.file === cur ? ' class="active" aria-current="page"' : "") +
        '><span class="num">' + p.num + "</span><span>" + p.title + "</span></a>";
    });
    side.innerHTML = html;
    var toc = el("aside", { "class": "toc", "aria-label": ZH ? "本页目录" : "On this page" });
    main.parentNode.insertBefore(layout, main);
    layout.appendChild(side);
    layout.appendChild(main);
    layout.appendChild(toc);

    var list = PAGES.filter(function (p) { return p.file; });
    var idx = -1;
    list.forEach(function (p, i) { if (p.file === cur) idx = i; });
    var content = main.querySelector(".content") || main;
    if (idx >= 0) {
      var pager = el("nav", { "class": "pager", "aria-label": ZH ? "上一页和下一页" : "Previous and next page" });
      var ph = "";
      if (idx > 0) ph += '<a class="prev" href="' + list[idx - 1].file + '"><small>' + (ZH ? "← 上一页" : "← Previous") + '</small>' + list[idx - 1].title + "</a>";
      else ph += "<span></span>";
      if (idx < list.length - 1) ph += '<a class="next" href="' + list[idx + 1].file + '"><small>' + (ZH ? "下一页 →" : "Next →") + '</small>' + list[idx + 1].title + "</a>";
      pager.innerHTML = ph;
      content.appendChild(pager);
    }

    var heads = content.querySelectorAll("h2, h3");
    var used = {};
    var th = '<div class="label">' + (ZH ? "本页" : "On this page") + '</div>';
    Array.prototype.forEach.call(heads, function (h) {
      if (h.closest && (h.closest("details") || h.closest(".no-toc"))) return;
      if (!h.id) {
        var base = slug(h.textContent) || "s"; var id = base; var n = 2;
        while (used[id] || document.getElementById(id)) { id = base + "-" + n++; }
        h.id = id;
      }
      used[h.id] = true;
      var a = el("a", { "class": "anchor", href: "#" + h.id, "aria-label": ZH ? "链到这一节" : "Link to this section" }, "#");
      h.appendChild(a);
      var text = h.textContent.replace(/#$/, "");
      th += '<a class="' + h.tagName.toLowerCase() + '" href="#' + h.id + '">' + text + "</a>";
    });
    toc.innerHTML = heads.length ? th : "";

    if ("IntersectionObserver" in window && heads.length) {
      var links = toc.querySelectorAll("a");
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            Array.prototype.forEach.call(links, function (l) {
              l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id);
            });
          }
        });
      }, { rootMargin: "-60px 0px -70% 0px" });
      Array.prototype.forEach.call(heads, function (h) { if (h.id) obs.observe(h); });
    }

    var tb = document.getElementById("theme-btn");
    function paint() {
      if (ZH) tb.textContent = effectiveTheme() === "dark" ? "☀ 浅色" : "☾ 深色";
      else tb.textContent = effectiveTheme() === "dark" ? "☀ Light" : "☾ Dark";
    }
    paint();
    tb.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      safeSet("avc-theme", next);
      paint();
    });

    document.getElementById("menu-btn").addEventListener("click", function () { body.classList.toggle("nav-open"); });
    side.addEventListener("click", function (e) { if (e.target.closest("a")) body.classList.remove("nav-open"); });

    document.getElementById("ev-btn").addEventListener("click", function () {
      var ex = document.getElementById("ev-legend");
      if (ex) { ex.parentNode.removeChild(ex); return; }
      var box = el("div", { id: "ev-legend", "class": "callout", style: "position:fixed;right:16px;top:64px;z-index:40;max-width:min(420px,92vw);box-shadow:0 6px 24px rgba(0,0,0,.18)" });
      box.innerHTML = '<span class="title">' + (ZH ? "每页使用的证据标签" : "Evidence labels used on every page") + '</span>' +
        '<p><span class="ev v">' + (ZH ? "已核实" : "Verified") + '</span> ' + EV_TITLES.v + '</p>' +
        '<p><span class="ev p">' + (ZH ? "实践" : "Practice") + '</span> ' + EV_TITLES.p + '</p>' +
        '<p><span class="ev i">' + (ZH ? "推断" : "Inference") + '</span> ' + EV_TITLES.i + '</p>' +
        '<p><span class="ev u">' + (ZH ? "未核实" : "Unverified") + '</span> ' + EV_TITLES.u + '</p>' +
        '<p><span class="ev x">' + (ZH ? "实验" : "Experimental") + '</span> ' + EV_TITLES.x + '</p>' +
        '<p class="small muted">' + (ZH ? "再点一次“标签”关闭。" : 'Click "Labels" again to close.') + '</p>';
      body.appendChild(box);
    });
  }

  function decorateBadges() {
    Array.prototype.forEach.call(document.querySelectorAll(".ev"), function (b) {
      for (var k in EV_TITLES) if (b.classList.contains(k) && !b.title) b.title = EV_TITLES[k];
    });
  }

  /* ---------- sortable tables: <table data-sortable>; cell data-v overrides sort value ---------- */
  function sortValue(cell) {
    return (cell.getAttribute("data-v") || cell.textContent).trim();
  }
  function compare(x, y) {
    var nx = parseFloat(x), ny = parseFloat(y);
    var numX = /^-?[\d.]+$/.test(x), numY = /^-?[\d.]+$/.test(y);
    if (numX && numY) return nx - ny;
    if (numX) return -1;
    if (numY) return 1;
    return x.localeCompare(y);
  }
  function initSortable(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("table[data-sortable]"), function (t) {
      if (t.getAttribute("data-sort-ready")) return;
      t.setAttribute("data-sort-ready", "1");
      var ths = t.querySelectorAll("thead th");
      Array.prototype.forEach.call(ths, function (th, col) {
        if (th.hasAttribute("data-nosort")) return;
        th.setAttribute("data-sort", "");
        th.setAttribute("tabindex", "0");
        function run() {
          var tbody = t.tBodies[0]; var rows = Array.prototype.slice.call(tbody.rows);
          var dir = th.getAttribute("data-dir") === "asc" ? "desc" : "asc";
          Array.prototype.forEach.call(ths, function (x) { x.removeAttribute("data-dir"); });
          th.setAttribute("data-dir", dir);
          function blank(v) { return v === "" || v === "-" || v === "–" || v === "—"; }
          rows.sort(function (a, b) {
            var x = sortValue(a.cells[col]), y = sortValue(b.cells[col]);
            if (blank(x) || blank(y)) return blank(x) === blank(y) ? 0 : (blank(x) ? 1 : -1);
            var r = compare(x, y);
            return dir === "asc" ? r : -r;
          });
          rows.forEach(function (r) { tbody.appendChild(r); });
        }
        th.addEventListener("click", run);
        th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); run(); } });
      });
    });
  }
  window.SITE_initSortable = initSortable;

  function initFilters() {
    Array.prototype.forEach.call(document.querySelectorAll("input[data-filter-for]"), function (inp) {
      var t = document.getElementById(inp.getAttribute("data-filter-for"));
      if (!t) return;
      inp.addEventListener("input", function () {
        var q = inp.value.toLowerCase();
        Array.prototype.forEach.call(t.tBodies[0].rows, function (r) {
          r.style.display = r.textContent.toLowerCase().indexOf(q) >= 0 ? "" : "none";
        });
      });
    });
  }

  function initTabs() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tabs]"), function (box) {
      var btns = box.querySelectorAll(".tabs button");
      var panels = box.querySelectorAll(".tab-panel");
      function show(name) {
        Array.prototype.forEach.call(btns, function (b) { b.setAttribute("aria-selected", b.getAttribute("data-tab") === name ? "true" : "false"); });
        Array.prototype.forEach.call(panels, function (p) { p.hidden = p.getAttribute("data-panel") !== name; });
      }
      Array.prototype.forEach.call(btns, function (b) {
        b.setAttribute("role", "tab");
        b.addEventListener("click", function () { show(b.getAttribute("data-tab")); });
      });
      if (btns.length) show(btns[0].getAttribute("data-tab"));
    });
  }

  function initToggleAll() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-toggle-all]"), function (b) {
      b.addEventListener("click", function () {
        var c = document.getElementById(b.getAttribute("data-toggle-all"));
        if (!c) return;
        var ds = c.querySelectorAll("details");
        var anyClosed = Array.prototype.some.call(ds, function (d) { return !d.open; });
        Array.prototype.forEach.call(ds, function (d) { d.open = anyClosed; });
        b.textContent = anyClosed ? (ZH ? "全部折叠" : "Collapse all") : (ZH ? "全部展开" : "Expand all");
      });
    });
  }

  /* ---------- copy buttons: <button data-copy="preId"> ---------- */
  function initCopy() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (b) {
      b.addEventListener("click", function () {
        var src = document.getElementById(b.getAttribute("data-copy"));
        if (!src) return;
        var text = src.textContent;
        function done(ok) {
          b.textContent = ok ? (ZH ? "已复制" : "Copied") : (ZH ? "请手动选择并复制" : "Select and copy manually");
          setTimeout(function () { b.textContent = ZH ? "复制" : "Copy"; }, 1800);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallback()); });
        } else { done(fallback()); }
        function fallback() {
          try {
            var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
            var ok = document.execCommand("copy"); document.body.removeChild(ta); return ok;
          } catch (e) { return false; }
        }
      });
    });
  }

  function init() {
    buildChrome();
    decorateBadges();
    initSortable();
    initFilters();
    initTabs();
    initToggleAll();
    initCopy();
    if (typeof window.PAGE_INIT === "function") window.PAGE_INIT();
    decorateBadges();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
