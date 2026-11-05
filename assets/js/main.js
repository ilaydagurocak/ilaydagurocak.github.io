/* İlayda Gürocak · Portfolio interactions. No dependencies. */
(function () {
  "use strict";

  const PROJECTS = window.PROJECTS || [];
  const CATS = window.CATEGORIES || {};
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const motionOK = () => !reduceMotion.matches;
  const ROUTING = !window.PORTFOLIO_NO_ROUTING; // deep links like #work/mevzuatradar

  document.documentElement.classList.add("js");

  /* ---------- Icons ---------- */
  const ICON = {
    open: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    left: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    bt: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 7l10 10-5 4V3l5 4L7 17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lock: '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    check: '<svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>',
    ext: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
  };

  const tintVar = (t) => ({ lavender: "var(--lavender)", blue: "var(--blue)", pink: "var(--pink)", neutral: "var(--bg-2)", night: "var(--lavender)", sky: "var(--blue)" }[t] || "var(--lavender)");

  /* =========================================================
     Visuals (cards and detail illustrations)
     ========================================================= */
  function imgTag(src, cls = "", eager = false) {
    return `<img src="${esc(src)}" alt="" loading="${eager ? "eager" : "lazy"}" decoding="async"${cls ? ` class="${cls}"` : ""}>`;
  }

  function docVisual() {
    return `<div class="v-doc">
      <span class="d-ok">${ICON.check} verified</span>
      <p class="d-head">Resmî Gazete · değişiklik</p>
      <div class="d-line"></div><div class="d-line s"></div>
      <p class="d-mark">Madde 5 (2): <s>"30"</s> → <b>"45"</b></p>
      <div class="d-line"></div><div class="d-line"></div><div class="d-line s"></div>
      <p class="d-mark">Madde 7 (1)(b): yürürlükten kaldırıldı</p>
      <div class="d-line"></div><div class="d-line s"></div>
    </div>`;
  }
  function bleVisual() {
    return `<div class="v-ble"><span class="pulse"></span><span class="pulse"></span><span class="pulse"></span><span class="core">${ICON.bt}</span><span class="lock">${ICON.lock} Under NDA</span></div>`;
  }
  function visionVisual() {
    return `<div class="v-vision">
      <div class="road"></div><div class="fig1"></div><div class="fig2"></div><div class="fig3"></div>
      <div class="box b1"><span>person</span></div>
      <div class="box b2"><span>traffic light: red</span></div>
      <div class="box b3"><span>obstacle ahead</span></div>
      <span class="tag">Illustration</span>
    </div>`;
  }
  function textVisual(glyph) {
    if (glyph === "kotlin") {
      return `<div class="v-text"><svg viewBox="0 0 240 120" aria-hidden="true">
        <rect x="30" y="16" width="56" height="92" rx="12" fill="none" stroke="currentColor" stroke-width="2" opacity=".55"/>
        <rect x="154" y="16" width="56" height="92" rx="12" fill="none" stroke="currentColor" stroke-width="2"/>
        <text x="58" y="68" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor" opacity=".7">Swift</text>
        <text x="182" y="68" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor">Kotlin</text>
        <path d="M96 62h48M136 54l8 8-8 8" fill="none" stroke="var(--purple)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></div>`;
    }
    return `<div class="v-text"><svg viewBox="0 0 240 120" aria-hidden="true">
      <path d="M20 100H224M20 100V12" stroke="currentColor" stroke-width="1.5" opacity=".35"/>
      <path d="M24 26C60 70 90 84 130 90S200 96 220 96" fill="none" stroke="var(--purple)" stroke-width="3" stroke-linecap="round"/>
      <path d="M24 40C60 74 92 80 130 82S196 80 220 78" fill="none" stroke="var(--pink-accent)" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 7"/>
      <text x="220" y="70" text-anchor="end" font-size="11" fill="currentColor" opacity=".7">validation</text>
      <text x="220" y="112" text-anchor="end" font-size="11" fill="currentColor" opacity=".7">training</text>
    </svg></div>`;
  }

  function cardVisual(p) {
    const v = p.visual || {};
    const imgs = v.imgs || [];
    switch (v.type) {
      case "browser":
        return imgs.map((src, i) => `<div class="v-browser ${i ? "two" : "one"}"><div class="bar"><i></i><i></i><i></i></div>${imgTag(src)}</div>`).join("");
      case "phones":
        return `<div class="v-phones n${imgs.length}">${imgs.map((src) => `<div class="v-phone">${imgTag(src)}</div>`).join("")}</div>`;
      case "landscape":
        return `<div class="v-land">${imgTag(imgs[0])}</div>`;
      case "doc": return docVisual();
      case "ble": return bleVisual();
      case "vision": return visionVisual();
      case "text": return textVisual(v.glyph);
      default: return "";
    }
  }

  /* =========================================================
     Filters + bento grid
     ========================================================= */
  const bento = $("#bento");
  const filtersEl = $("#filters");

  function cardHTML(p, i) {
    const cat = CATS[p.category] || { label: p.category };
    const tech = (p.stack || []).slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("");
    const stat = p.cardStat && (p.size === "feature" || p.size === "tall" || p.size === "wide")
      ? `<p class="card-stat"><strong>${esc(p.cardStat.value)}</strong><span>${esc(p.cardStat.label)}</span></p>` : "";
    return `<article class="card size-${p.size} t-${p.tint || cat.tint} reveal" data-cat="${p.category}" data-id="${p.id}" style="transition-delay:${Math.min(i, 8) * 60}ms">
      <div class="card-inner">
        <div class="card-visual">${cardVisual(p)}</div>
        <span class="card-label card-tag">${esc(cat.label)}</span>
        <div class="card-body">
          <span class="card-label">${esc(cat.label)}</span>
          <h3 class="card-title">${esc(p.title)}</h3>
          ${stat}
          <p class="card-summary">${esc(p.summary)}</p>
          <ul class="card-tech" aria-label="Technologies">${tech}</ul>
        </div>
      </div>
      <span class="card-open" aria-hidden="true">${ICON.open}</span>
      <button class="card-hit" data-open="${p.id}" aria-label="Open ${esc(p.title)} case study"></button>
    </article>`;
  }

  function renderBento() {
    bento.innerHTML = PROJECTS.map(cardHTML).join("");
    const counts = PROJECTS.reduce((a, p) => ((a[p.category] = (a[p.category] || 0) + 1), a), {});
    const keys = ["all", ...Object.keys(CATS).filter((k) => counts[k])];
    filtersEl.innerHTML = keys.map((k) => `<button class="filter" data-filter="${k}" aria-pressed="${k === "all"}">${k === "all" ? "All projects" : esc(CATS[k].label)}<span class="count">${k === "all" ? PROJECTS.length : counts[k]}</span></button>`).join("");
    filtersEl.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      $$(".filter", filtersEl).forEach((f) => f.setAttribute("aria-pressed", String(f === b)));
      applyFilter(b.dataset.filter);
    });
    if (finePointer.matches) bindTilt();
  }

  function applyFilter(cat) {
    const cards = $$(".card", bento);
    const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    const wasHidden = new Map(cards.map((c) => [c, c.classList.contains("is-hidden")]));
    cards.forEach((c) => {
      c.classList.toggle("is-hidden", cat !== "all" && c.dataset.cat !== cat);
      c.classList.add("in");
      c.style.transitionDelay = "0ms";
    });
    if (!motionOK()) return;
    let n = 0;
    cards.forEach((c) => {
      if (c.classList.contains("is-hidden")) return;
      const last = c.getBoundingClientRect();
      if (wasHidden.get(c)) {
        c.animate([{ opacity: 0, transform: "scale(0.94)" }, { opacity: 1, transform: "none" }], { duration: 480, easing: EASE, delay: n++ * 35, fill: "backwards" });
      } else {
        const f = first.get(c);
        const dx = f.left - last.left, dy = f.top - last.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          c.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 600, easing: EASE });
        }
      }
    });
  }

  function bindTilt() {
    bento.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      if (motionOK()) {
        card.style.setProperty("--tx", `${(0.5 - y) * 3}deg`);
        card.style.setProperty("--ty", `${(x - 0.5) * 4}deg`);
      }
    });
    bento.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".card");
      if (card && !card.contains(e.relatedTarget)) {
        card.style.setProperty("--tx", "0deg");
        card.style.setProperty("--ty", "0deg");
      }
    });
  }

  /* =========================================================
     Shared bits: chips, flow, compare bars, PFR explorer
     ========================================================= */
  const chipsHTML = (list) => `<ul class="chips">${(list || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;

  function flowHTML(arch) {
    return `<div class="flow" tabindex="0" aria-label="${esc(arch.caption || "Architecture")}">${arch.nodes.map((n, i) =>
      `${i ? `<span class="flow-arrow" aria-hidden="true">${ICON.arrow}</span>` : ""}<div class="flow-node"><b>${esc(n.title)}</b><span>${esc(n.text)}</span></div>`).join("")}</div>`;
  }

  function compareHTML(list) {
    return list.map((r) => `<div class="cmp-row"><span>${esc(r.label)}</span><span class="bar-track"><span class="bar" data-w="${r.value}"></span></span><b>${r.value}%</b></div>`).join("");
  }
  function animateBars(root) {
    $$(".bar[data-w]", root).forEach((b) => requestAnimationFrame(() => (b.style.width = `${b.dataset.w}%`)));
  }

  function mountPFR(root) {
    const D = window.PFR_DATA;
    if (!root || !D) return;
    const uid = Math.random().toString(36).slice(2, 7);
    root.innerHTML = `
      <div class="pfr-switch" role="tablist" aria-label="Choose a game">
        ${D.games.map((g, i) => `<button class="pfr-tab" role="tab" id="pfr-${uid}-${i}" aria-selected="${i === 0}" aria-controls="pfr-${uid}-panel" data-i="${i}">${esc(g.name)}<small>${esc(g.studio)}</small></button>`).join("")}
      </div>
      <div class="pfr-grid">
        <div class="pfr-bars" role="tabpanel" id="pfr-${uid}-panel"></div>
        <aside class="pfr-side">
          <div class="gap-card">
            <p class="gap-title">Store rating vs. written reviews</p>
            <div class="gap-track"><span class="gap-line"></span><span class="gap-dot gap-written"></span><span class="gap-dot gap-store"></span></div>
            <div class="gap-scale" aria-hidden="true"><span>1★</span><span>2★</span><span>3★</span><span>4★</span><span>5★</span></div>
            <p class="gap-text"></p>
          </div>
          <dl class="pfr-facts"></dl>
        </aside>
      </div>`;
    const bars = $(".pfr-bars", root);
    bars.innerHTML = D.topics.map((t) => `<div class="pfr-row"><span class="t-name">${esc(t.name)}</span><span class="bar-track"><span class="bar"></span></span><span class="t-val"></span></div>`).join("");
    const rows = $$(".pfr-row", bars);
    const pos = (v) => `${((v - 1) / 4) * 100}%`;

    function show(i) {
      const g = D.games[i];
      $$(".pfr-tab", root).forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
      bars.setAttribute("aria-labelledby", `pfr-${uid}-${i}`);
      const vals = D.topics.map((t) => t.values[i]);
      const max = Math.max(...vals);
      rows.forEach((row, k) => {
        const v = vals[k];
        row.classList.toggle("top", v === max);
        row.querySelector(".bar").style.width = `${Math.min(100, (v / 50) * 100)}%`;
        row.querySelector(".t-val").textContent = `${v}%`;
      });
      const topTopic = D.topics[vals.indexOf(max)].name.toLowerCase();
      const w = $(".gap-written", root), s = $(".gap-store", root), line = $(".gap-line", root);
      w.style.left = pos(g.written); w.dataset.v = `${g.written.toFixed(2)} written`;
      s.style.left = pos(g.store); s.dataset.v = `${g.store.toFixed(2)} store`;
      line.style.left = pos(g.written); line.style.width = `${((g.store - g.written) / 4) * 100}%`;
      $(".gap-text", root).innerHTML = `Players who write a review rate ${esc(g.name)} <b>${(g.store - g.written).toFixed(2)} stars</b> lower than the store average. Their top complaint: <b>${esc(topTopic)}</b>.`;
      $(".pfr-facts", root).innerHTML = `
        <div><dt>Written reviews</dt><dd>${g.reviews.toLocaleString("en-US")}</dd></div>
        <div><dt>Negative</dt><dd>${g.negative}%</dd></div>
        <div><dt>Say they quit</dt><dd>${g.churn}%</dd></div>
        <div><dt>Top complaint</dt><dd>${max}%</dd></div>`;
    }
    root.addEventListener("click", (e) => {
      const t = e.target.closest(".pfr-tab");
      if (t) show(+t.dataset.i);
    });
    root.addEventListener("keydown", (e) => {
      const t = e.target.closest(".pfr-tab");
      if (!t || !["ArrowRight", "ArrowLeft"].includes(e.key)) return;
      const tabs = $$(".pfr-tab", root);
      const n = (tabs.indexOf(t) + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
      tabs[n].focus(); show(n);
    });
    show(0);
  }

  /* =========================================================
     Project detail
     ========================================================= */
  const dialog = $("#detail");
  const scroller = $("#detail-scroll");
  let currentId = null;
  let pushed = false;
  let opener = null;

  function galleryHTML(p) {
    const g = p.gallery;
    if (!g || !g.items || !g.items.length) {
      const v = p.visual || {};
      return `<div class="wrap"><div class="d-illus" style="background:${tintVar(p.tint)}">${cardVisual({ visual: v })}</div>
        <p class="d-illus-note">${esc(p.visualNote || (v.type === "ble" ? "Illustration. Screens and code are covered by a confidentiality agreement." : "Illustration."))}</p></div>`;
    }
    const type = g.type;
    const figs = g.items.map((it) => {
      if (type === "browser") return `<figure class="g-browser"><div class="frame"><div class="bar" aria-hidden="true"><i></i><i></i><i></i></div><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div><figcaption>${esc(it.caption)}</figcaption></figure>`;
      if (type === "landscape") return `<figure class="g-landscape"><div class="frame"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div><figcaption>${esc(it.caption)}</figcaption></figure>`;
      return `<figure class="g-phone"><div class="frame"><img src="${esc(it.src)}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></div><figcaption>${esc(it.caption)}</figcaption></figure>`;
    }).join("");
    return `<div class="d-gallery-wrap">
      <div class="d-gallery" tabindex="0" aria-label="${esc(p.title)} screenshots, scroll sideways">${figs}</div>
      <div class="g-ctrl"><button class="icon-btn" data-g="-1" aria-label="Scroll screenshots back">${ICON.left}</button><button class="icon-btn" data-g="1" aria-label="Scroll screenshots forward">${ICON.right}</button></div>
    </div>`;
  }

  function linkHTML(l) {
    const icon = l.kind === "github" ? ICON.github : ICON.ext;
    const cls = l.kind === "live" ? "btn btn-primary" : "btn btn-ghost";
    return `<a class="${cls}" href="${esc(l.url)}" target="_blank" rel="noopener">${icon}${esc(l.label)}</a>`;
  }

  function detailHTML(p) {
    const cat = CATS[p.category] || { label: p.category };
    const i = PROJECTS.indexOf(p);
    const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    const links = (p.links || []).map(linkHTML).join("");
    const play = p.play ? `<button class="btn btn-primary" data-play="${esc(p.play)}">${ICON.play}Play in browser</button>` : "";
    const sec = (title, inner) => `<section class="d-section"><h3>${title}</h3>${inner}</section>`;
    const list = (arr) => `<ul class="d-list">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const isGame = p.category === "games";

    const results = p.results && p.results.length
      ? `<div><h4>Results</h4><div class="d-results">${p.results.map((r) => `<div><strong>${esc(r.value)}</strong><span>${esc(r.label)}</span></div>`).join("")}</div></div>` : "";

    let arch = "";
    if (p.arch && p.arch.type === "flow") {
      arch = `<section class="d-arch wrap"><h3>How it works</h3><p>${esc(p.arch.caption)}</p>${flowHTML(p.arch)}</section>`;
    } else if (p.arch && p.arch.type === "image") {
      arch = `<section class="d-arch wrap"><h3>Data model</h3><img class="arch-img" src="${esc(p.arch.src)}" alt="${esc(p.arch.alt)}" loading="lazy"><p>${esc(p.arch.caption)}</p></section>`;
    }

    let extra = "";
    if (p.id === "player-feedback-radar") {
      extra = `<section class="d-arch wrap"><h3>Complaints by game</h3><p>Share of each game's reviews that are negative about a topic, from the project's complaint map.</p><div class="pfr" data-pfr></div></section>`;
    }
    if (p.compare) {
      extra += `<section class="d-arch wrap"><h3>Model comparison</h3><p>Verified changes by extraction method, through the same evaluation pipeline.</p><div class="d-compare">${compareHTML(p.compare)}</div></section>`;
    }

    return `
      <div class="d-top">
        <p class="d-crumb"><span class="cat">${esc(cat.label)} / </span><b>${esc(p.title)}</b></p>
        <div class="d-nav">
          <button class="icon-btn" data-go="${prev.id}" aria-label="Previous project: ${esc(prev.title)}">${ICON.left}</button>
          <button class="icon-btn" data-go="${next.id}" aria-label="Next project: ${esc(next.title)}">${ICON.right}</button>
          <button class="icon-btn close" data-close aria-label="Close case study">${ICON.close}</button>
        </div>
      </div>
      <div class="d-detail-wrap" style="--tint-bg:${tintVar(p.tint)}">
        <header class="d-hero">
          <div class="wrap">
            <div class="d-badges"><span>${esc(cat.label)}</span>${(p.badges || []).map((b) => `<span>${esc(b)}</span>`).join("")}</div>
            <h2 class="d-title" id="detail-title">${esc(p.title)}</h2>
            <p class="d-tagline">${esc(p.tagline)}</p>
            ${links || play ? `<div class="d-links">${play}${links}</div>` : ""}
          </div>
        </header>
        <div class="d-play-slot wrap"></div>
        ${galleryHTML(p)}
        <div class="wrap d-body">
          <div>
            ${sec("Overview", `<p>${esc(p.overview)}</p>`)}
            ${p.problem ? sec(isGame ? "Why I made it" : "Problem and motivation", `<p class="muted">${esc(p.problem)}</p>`) : ""}
            ${p.role ? sec("My role", `<p>${esc(p.role)}</p>`) : ""}
            ${p.mechanics ? sec("How it plays", list(p.mechanics)) : ""}
            ${p.built && p.built.length ? sec(isGame ? "Features" : "What I built", list(p.built)) : ""}
          </div>
          <aside class="d-aside">
            ${results}
            ${p.platform ? `<div><h4>Platform</h4><p>${esc(p.platform)}</p></div>` : ""}
            <div><h4>Technology</h4>${chipsHTML(p.stack)}</div>
            ${p.note ? `<p class="d-note">${esc(p.note)}</p>` : ""}
          </aside>
        </div>
        ${arch}
        ${extra}
        <nav class="wrap d-foot" aria-label="More projects">
          <button data-go="${prev.id}"><small>Previous</small><b>${esc(prev.title)}</b></button>
          <button data-go="${next.id}"><small>Next</small><b>${esc(next.title)}</b></button>
        </nav>
      </div>`;
  }

  function renderDetail(p, animate) {
    scroller.innerHTML = detailHTML(p);
    scroller.scrollTop = 0;
    currentId = p.id;
    mountPFR($("[data-pfr]", scroller));
    animateBars(scroller);
    if (animate && motionOK()) {
      scroller.classList.remove("swap"); void scroller.offsetWidth; scroller.classList.add("swap");
    }
  }

  function openDetail(id, { push = true } = {}) {
    const p = byId[id];
    if (!p) return;
    if (!dialog.open) {
      opener = document.activeElement;
      renderDetail(p, false);
      if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
      document.body.classList.add("locked");
      $("[data-close]", scroller).focus({ preventScroll: true });
    } else {
      renderDetail(p, true);
      $("[data-close]", scroller).focus({ preventScroll: true });
    }
    const hash = `#work/${id}`;
    if (ROUTING && location.hash !== hash) {
      if (push && !pushed) { history.pushState({ detail: id }, "", hash); pushed = true; }
      else history.replaceState({ detail: id }, "", hash);
    }
    document.title = `${p.title} · İlayda Gürocak`;
  }

  function finishClose() {
    dialog.classList.remove("closing");
    if (dialog.open) dialog.close();
    document.body.classList.remove("locked");
    scroller.innerHTML = "";
    currentId = null;
    document.title = "İlayda Gürocak · Computer Engineer";
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
  }

  function closeDetail({ fromHistory = false } = {}) {
    if (!dialog.open) return;
    if (!fromHistory) {
      if (pushed) { pushed = false; history.back(); return; } // popstate finishes the close
      if (ROUTING) history.replaceState(null, "", "#work");
    }
    pushed = false;
    if (motionOK()) {
      dialog.classList.add("closing");
      setTimeout(finishClose, 280);
    } else finishClose();
  }

  dialog.addEventListener("cancel", (e) => { e.preventDefault(); closeDetail(); });
  dialog.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) { openDetail(go.dataset.go, { push: false }); return; }
    if (e.target.closest("[data-close]")) { closeDetail(); return; }
    const g = e.target.closest("[data-g]");
    if (g) {
      const gal = $(".d-gallery", scroller);
      gal.scrollBy({ left: +g.dataset.g * gal.clientWidth * 0.8, behavior: motionOK() ? "smooth" : "auto" });
      return;
    }
    const pl = e.target.closest("[data-play]");
    if (pl) {
      const slot = $(".d-play-slot", scroller);
      slot.innerHTML = `<div class="d-play"><iframe src="${esc(pl.dataset.play)}" title="Playable game" allow="fullscreen; autoplay" allowfullscreen></iframe></div>`;
      slot.scrollIntoView({ behavior: motionOK() ? "smooth" : "auto", block: "center" });
    }
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.target.closest(".d-gallery, .pfr-switch, .flow")) return;
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const p = byId[currentId]; if (!p) return;
      const i = PROJECTS.indexOf(p);
      const n = PROJECTS[(i + (e.key === "ArrowRight" ? 1 : -1) + PROJECTS.length) % PROJECTS.length];
      openDetail(n.id, { push: false });
    }
  });

  function routeFromHash() {
    const m = location.hash.match(/^#work\/([\w-]+)$/);
    if (m && byId[m[1]]) {
      if (currentId !== m[1]) openDetail(m[1], { push: false });
    } else if (dialog.open) {
      closeDetail({ fromHistory: true });
    }
  }
  window.addEventListener("popstate", () => { pushed = false; routeFromHash(); });

  // Any [data-open] anywhere on the page opens a case study
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-open]");
    if (!t || dialog.contains(t)) return;
    e.preventDefault();
    openDetail(t.dataset.open);
  });

  /* =========================================================
     Navigation
     ========================================================= */
  function initNav() {
    const toggle = $("#nav-toggle"), links = $("#nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    links.addEventListener("click", (e) => {
      if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.textContent = "Menu"; }
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && links.classList.contains("open")) toggle.click(); });

    const map = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
    const sections = ["work", "lab", "apps", "playground", "about", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          map.forEach((a) => a.classList.remove("active"));
          const a = map.get(en.target.id);
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
    const hero = $("#home");
    new IntersectionObserver(([en]) => { if (en.isIntersecting) map.forEach((a) => a.classList.remove("active")); }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
  }

  /* =========================================================
     Hero parallax + magnetic buttons
     ========================================================= */
  function initHero() {
    const hero = $("#home"), light = $(".hero-light"), objs = $$(".obj", hero);
    objs.forEach((o) => o.style.setProperty("--d", (parseFloat(o.dataset.depth) || 0.3) * 28));
    if (!finePointer.matches) return;
    let raf = 0;
    hero.addEventListener("pointermove", (e) => {
      if (!motionOK()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        objs.forEach((o) => { o.style.setProperty("--px", x.toFixed(3)); o.style.setProperty("--py", y.toFixed(3)); });
        light.style.setProperty("--lx", `${(x + 0.5) * 100}%`);
        light.style.setProperty("--ly", `${(y + 0.5) * 100}%`);
      });
    });
    hero.addEventListener("pointerleave", () => objs.forEach((o) => { o.style.setProperty("--px", 0); o.style.setProperty("--py", 0); }));
  }

  function initMagnetic() {
    if (!finePointer.matches) return;
    $$(".magnetic").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        if (!motionOK()) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* =========================================================
     Reveal on scroll
     ========================================================= */
  function initReveal() {
    const els = $$(".reveal, .section-head, .lab-exp, .model, .step, .about-body, .pg-stage, .cabinet");
    els.forEach((el) => el.classList.add("reveal"));
    if (!("IntersectionObserver" in window) || !motionOK()) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
    // clear stagger delays once cards have revealed so hover feels instant
    setTimeout(() => $$(".card").forEach((c) => (c.style.transitionDelay = "")), 2500);
  }

  /* =========================================================
     AI lab
     ========================================================= */
  function initLab() {
    mountPFR($("#pfr-lab"));
    const mr = byId["mevzuatradar"];
    const pipe = $("#pipeline");
    if (mr && pipe) pipe.innerHTML = mr.arch.nodes.map((n) => `<li><div><b>${esc(n.title)}</b><span>${esc(n.text)}</span></div></li>`).join("");
    const cmp = $("#compare-bars");
    if (mr && cmp) {
      cmp.innerHTML = compareHTML(mr.compare);
      new IntersectionObserver(([en], o) => { if (en.isIntersecting) { animateBars(cmp); o.disconnect(); } }, { threshold: 0.3 }).observe(cmp);
    }
    const run = $("#mr-run"), sent = $("#mr-sentence"), rec = $("#mr-record");
    let on = false, timers = [];
    run.addEventListener("click", () => {
      on = !on;
      timers.forEach(clearTimeout); timers = [];
      sent.classList.toggle("run", on);
      rec.classList.toggle("run", on);
      run.textContent = on ? "Reset the example" : "Show the extracted record";
      const steps = $$("li", pipe);
      steps.forEach((s) => s.classList.remove("lit"));
      if (on) {
        $$("div", rec).forEach((d, i) => (d.style.transitionDelay = motionOK() ? `${i * 110}ms` : "0ms"));
        // light up Parse, Extract, Verify in order
        [2, 3, 4].forEach((k, i) => timers.push(setTimeout(() => steps[k] && steps[k].classList.add("lit"), motionOK() ? 200 + i * 380 : 0)));
      }
    });
  }

  /* =========================================================
     App playground
     ========================================================= */
  function initPlayground() {
    const ids = (window.APP_PLAYGROUND || []).filter((id) => byId[id]);
    const tabs = $("#pg-tabs"), img = $("#pg-img"), cap = $("#pg-caption"), dots = $("#pg-dots"), info = $("#pg-info"), stage = $("#pg-stage"), device = $("#pg-device");
    let app = 0, screen = 0;

    tabs.innerHTML = ids.map((id, i) => {
      const p = byId[id];
      return `<button class="pg-tab" role="tab" aria-selected="${i === 0}" data-i="${i}" aria-controls="pg-stage">${imgTag(p.gallery.items[0].src)}<span><b>${esc(p.title)}</b><small>${p.gallery.items.length} screens</small></span></button>`;
    }).join("");

    function setScreen(k, instant) {
      const items = byId[ids[app]].gallery.items;
      screen = (k + items.length) % items.length;
      const it = items[screen];
      const apply = () => {
        img.src = it.src; img.alt = it.alt;
        cap.textContent = `${it.caption}  ·  ${screen + 1} of ${items.length}`;
        $$(".pg-dot", dots).forEach((d, i) => d.setAttribute("aria-current", String(i === screen)));
      };
      if (instant || !motionOK()) { apply(); return; }
      img.classList.add("swap");
      setTimeout(() => {
        apply();
        if (img.complete) img.classList.remove("swap"); else img.onload = () => img.classList.remove("swap");
      }, 180);
    }

    function setApp(i) {
      app = i;
      const p = byId[ids[i]];
      $$(".pg-tab", tabs).forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
      dots.innerHTML = p.gallery.items.map((it, k) => `<button class="pg-dot" data-k="${k}" aria-label="Show screen ${k + 1}: ${esc(it.caption)}"></button>`).join("");
      info.innerHTML = `
        <h3>${esc(p.title)}</h3>
        <p class="tagline">${esc(p.tagline)}</p>
        <ul class="feat">${(p.built || []).slice(0, 4).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${p.role ? `<p class="pg-role">${esc(p.role)}</p>` : ""}
        <div class="chips">${chipsHTML(p.stack)}</div>
        <button class="btn btn-ghost" data-open="${p.id}">Open the case study</button>`;
      setScreen(0, true);
    }

    tabs.addEventListener("click", (e) => { const t = e.target.closest(".pg-tab"); if (t) setApp(+t.dataset.i); });
    tabs.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
      e.preventDefault();
      const all = $$(".pg-tab", tabs);
      const n = (app + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length;
      all[n].focus(); setApp(n);
    });
    $("#pg-prev").addEventListener("click", () => setScreen(screen - 1));
    $("#pg-next").addEventListener("click", () => setScreen(screen + 1));
    dots.addEventListener("click", (e) => { const d = e.target.closest(".pg-dot"); if (d) setScreen(+d.dataset.k); });
    stage.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") setScreen(screen + 1);
      if (e.key === "ArrowLeft") setScreen(screen - 1);
    });

    // swipe
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) setScreen(screen + (dx < 0 ? 1 : -1));
    });

    // 3D tilt
    if (finePointer.matches) {
      stage.addEventListener("pointermove", (e) => {
        if (!motionOK()) return;
        const r = stage.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        device.style.setProperty("--ry", `${x * 14}deg`);
        device.style.setProperty("--rx", `${-y * 10}deg`);
      });
      stage.addEventListener("pointerleave", () => { device.style.setProperty("--ry", "0deg"); device.style.setProperty("--rx", "0deg"); });
    }
    setApp(0);
  }

  /* =========================================================
     Arcade
     ========================================================= */
  function initArcade() {
    const ids = (window.ARCADE || []).filter((id) => byId[id]);
    const carts = $("#carts"), scr = $("#screen"), img = $("#screen-img"), thumbs = $("#screen-thumbs"), info = $("#game-info"), fs = $("#screen-fs");
    let game = 0, shot = 0;

    carts.innerHTML = ids.map((id, i) => {
      const p = byId[id];
      return `<button class="cart" role="tab" aria-selected="${i === 0}" data-i="${i}" aria-controls="screen">${imgTag((p.visual.imgs || [p.gallery.items[0].src])[0])}<span><b>${esc(p.title)}</b><small>${esc(p.platform || "")}</small></span></button>`;
    }).join("");

    function setShot(k, instant) {
      const items = byId[ids[game]].gallery.items;
      shot = (k + items.length) % items.length;
      const it = items[shot];
      const apply = () => {
        img.src = it.src; img.alt = it.alt;
        $$(".thumb", thumbs).forEach((t, i) => t.setAttribute("aria-current", String(i === shot)));
      };
      if (instant || !motionOK()) { apply(); return; }
      img.classList.add("swap");
      setTimeout(() => { apply(); if (img.complete) img.classList.remove("swap"); else img.onload = () => img.classList.remove("swap"); }, 160);
    }

    function setGame(i) {
      game = i;
      const p = byId[ids[i]];
      $$(".cart", carts).forEach((c, k) => c.setAttribute("aria-selected", String(k === i)));
      scr.classList.toggle("portrait", p.gallery.type === "phone");
      thumbs.innerHTML = p.gallery.items.map((it, k) => `<button class="thumb" data-k="${k}" aria-label="Show ${esc(it.caption)}">${imgTag(it.src)}</button>`).join("");
      info.innerHTML = `
        <div>
          <h3>${esc(p.title)}</h3>
          <p class="plat">${esc(p.platform || "")}</p>
          <p class="desc">${esc(p.overview)}</p>
          <div class="game-actions">
            ${p.play ? `<button class="btn btn-primary" data-open="${p.id}">${ICON.play}Play in browser</button>` : ""}
            <button class="btn btn-ghost" data-open="${p.id}">Open the case study</button>
          </div>
        </div>
        <div>
          <h4>How it plays</h4>
          <ol>${(p.mechanics || []).map((m) => `<li>${esc(m)}</li>`).join("")}</ol>
          <div style="margin-top:18px">${chipsHTML(p.stack)}</div>
        </div>`;
      const start = p.gallery.items.findIndex((it) => it.src === (p.visual.imgs || [])[0]);
      setShot(start < 0 ? 0 : start, true);
    }

    carts.addEventListener("click", (e) => { const c = e.target.closest(".cart"); if (c) setGame(+c.dataset.i); });
    carts.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
      e.preventDefault();
      const all = $$(".cart", carts);
      const n = (game + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length;
      all[n].focus(); setGame(n);
    });
    thumbs.addEventListener("click", (e) => { const t = e.target.closest(".thumb"); if (t) setShot(+t.dataset.k); });

    if (document.fullscreenEnabled && scr.requestFullscreen) {
      fs.addEventListener("click", () => (document.fullscreenElement ? document.exitFullscreen() : scr.requestFullscreen()));
      document.addEventListener("fullscreenchange", () => fs.setAttribute("aria-label", document.fullscreenElement ? "Exit full screen" : "View screenshot full screen"));
    } else fs.hidden = true;

    setGame(0);
  }

  /* =========================================================
     Tech map
     ========================================================= */
  function initStack() {
    const field = $("#stack-field"), panel = $("#stack-panel"), svg = $("#stack-lines");
    const groups = window.TECH_MAP || [];
    const usage = new Map();
    groups.forEach((g) => g.items.forEach((t) => {
      const names = [t.name, ...(t.also || [])];
      usage.set(t.name, PROJECTS.filter((p) => (p.stack || []).some((s) => names.includes(s))));
    }));

    field.insertAdjacentHTML("beforeend", groups.map((g) => `
      <div class="stack-group"><h4>${esc(g.group)}</h4><ul>${g.items.map((t) => {
        const n = usage.get(t.name).length;
        return `<li><button class="tech${n ? " used" : ""}" data-t="${esc(t.name)}" data-group="${esc(g.group)}" ${n ? `data-n="${n}"` : ""} aria-pressed="false">${esc(t.label || t.name)}</button></li>`;
      }).join("")}</ul></div>`).join(""));

    const btns = $$(".tech", field);
    let selected = null;

    function draw() {
      svg.innerHTML = "";
      if (!selected) return;
      const fr = field.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${fr.width} ${fr.height}`);
      const c = (el) => { const r = el.getBoundingClientRect(); return [r.left - fr.left + r.width / 2, r.top - fr.top + r.height / 2]; };
      const [x1, y1] = c(selected);
      svg.innerHTML = btns.filter((b) => b.classList.contains("rel")).map((b) => {
        const [x2, y2] = c(b);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.min(80, Math.abs(x2 - x1) * 0.25 + 20);
        return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
      }).join("");
    }

    function select(btn) {
      if (selected === btn) return;
      selected = btn;
      const name = btn.dataset.t;
      const used = usage.get(name);
      const usedIds = new Set(used.map((p) => p.id));
      const relNames = new Set();
      used.forEach((p) => (p.stack || []).forEach((s) => relNames.add(s)));
      field.classList.add("has-sel");
      btns.forEach((b) => {
        const t = b.dataset.t;
        const item = groups.flatMap((g) => g.items).find((i) => i.name === t);
        const names = [t, ...((item && item.also) || [])];
        const isRel = b !== btn && usage.get(t).some((p) => usedIds.has(p.id)) && names.some((n) => relNames.has(n));
        b.classList.toggle("sel", b === btn);
        b.classList.toggle("rel", isRel);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      const label = btn.textContent;
      panel.innerHTML = used.length
        ? `<h4>${esc(label)}</h4><p>${btn.dataset.group}. Used in ${used.length} project${used.length > 1 ? "s" : ""} on this page; lines show what I used alongside it.</p>
           <ul>${used.map((p) => `<li><button data-open="${p.id}">${esc(p.title)}<small>${esc((CATS[p.category] || {}).label || "")}</small></button></li>`).join("")}</ul>`
        : `<h4>${esc(label)}</h4><p>${btn.dataset.group}. Part of my toolkit, used outside the projects shown on this page.</p>`;
      draw();
    }

    field.addEventListener("click", (e) => { const b = e.target.closest(".tech"); if (b) select(b); });
    field.addEventListener("focusin", (e) => { const b = e.target.closest(".tech"); if (b) select(b); });
    if (finePointer.matches) field.addEventListener("pointerover", (e) => { const b = e.target.closest(".tech"); if (b) select(b); });

    let rt = 0;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(draw, 120); });
    const start = btns.find((b) => b.dataset.t === "Python");
    if (start) {
      const go = () => select(start);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
    }
  }

  /* =========================================================
     Boot
     ========================================================= */
  function boot() {
    renderBento();
    initNav();
    initHero();
    initMagnetic();
    initLab();
    initPlayground();
    initArcade();
    initStack();
    initReveal();
    routeFromHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
