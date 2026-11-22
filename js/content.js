/* Heart of the City Development Center — content the center edits in Google Sheets.
 *
 * Each tab of the "HOTC Website Content" sheet is published to the web as CSV. This file reads
 * those CSVs when a page loads and fills in photos, text, events, board members, videos and the
 * announcement banner. Everything already in the HTML is the fallback: if a link is empty, the
 * sheet is unreachable, or a row is wrong, the page simply keeps what it had.
 *
 * TODO(hookup): in the content sheet, File > Share > Publish to web > pick a tab > "Comma-separated
 * values (.csv)" > Publish. Do that for each tab and paste each link below. Google caches published
 * CSVs, so edits show on the site within about 5 minutes.
 */
const CONTENT_CSV = {
  photos: "",
  text: "",
  announcement: "",
  events: "",
  board: "",
  videos: "",
};

/* ---------- helpers ---------- */

// Minimal CSV parser: handles quoted fields, commas and line breaks inside quotes, and "" escapes.
function parseCSV(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// Rows as objects keyed by lower-case header ("Drive link" -> "drive link"). Blank rows are dropped.
function toRecords(rows) {
  const [head = [], ...body] = rows;
  const keys = head.map((h) => h.trim().toLowerCase());
  return body
    .filter((r) => r.some((v) => v.trim()))
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] || "").trim()])));
}

const sheetCache = {};
function loadTab(name) {
  const url = CONTENT_CSV[name];
  if (!url) return Promise.resolve(null);
  sheetCache[name] ??= fetch(url)
    .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
    .then((t) => toRecords(parseCSV(t)))
    .catch((err) => {
      console.warn(`[HOTC content] could not load the "${name}" tab`, err);
      return null;
    });
  return sheetCache[name];
}

// Accepts any Google Drive share link (…/file/d/ID/view, open?id=ID, uc?id=ID) or a bare file ID.
function driveId(link) {
  const m = link.match(/\/d\/([\w-]{20,})/) || link.match(/[?&]id=([\w-]{20,})/) || link.match(/^([\w-]{20,})$/);
  return m ? m[1] : null;
}
// Not an official Google API: if it ever stops working, photos fall back to the built-in ones.
const driveImage = (id, width = 1600) => `https://lh3.googleusercontent.com/d/${id}=w${width}`;

// Only allow ordinary web links from the sheet.
const safeLink = (href) => (/^https?:\/\//i.test(href) ? href : null);

const isYes = (v) => /^(yes|y|true|x|1|show)$/i.test(v || "");

function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children.filter(Boolean));
  return node;
}

// Loads an image off-screen first, so a bad link never replaces a working photo.
function preload(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
}

// "2026-12-05", "12/5/2026" or "12/5/26" -> Date at local midnight.
function parseDate(v) {
  let m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return new Date(+m[1], m[2] - 1, +m[3]);
  m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
  if (m) return new Date(m[3].length === 2 ? 2000 + +m[3] : +m[3], m[1] - 1, +m[2]);
  return null;
}

/* ---------- sections ---------- */

async function applyPhotos() {
  // Runs on every page: besides img[data-slot], every page uses the shared background photo.
  const rows = await loadTab("photos");
  if (!rows) return;
  for (const row of rows) {
    const id = driveId(row["drive link"] || "");
    if (!row.slot || !id) continue;
    if (row.slot === "site-background") {
      const src = driveImage(id, 2000);
      preload(src).then(() => document.documentElement.style.setProperty("--photo", `url("${src}")`)).catch(() => {});
      continue;
    }
    document.querySelectorAll(`img[data-slot="${CSS.escape(row.slot)}"]`).forEach((img) => {
      const src = driveImage(id);
      preload(src)
        .then(() => {
          img.src = src;
          img.removeAttribute("srcset");
          if (row.description) img.alt = row.description;
        })
        .catch(() => console.warn(`[HOTC content] photo for "${row.slot}" did not load. Is it shared as "Anyone with the link"?`));
    });
  }
}

async function applyText() {
  const targets = document.querySelectorAll("[data-text]");
  if (!targets.length) return;
  const rows = await loadTab("text");
  if (!rows) return;
  const byKey = Object.fromEntries(rows.filter((r) => r.key && r.text).map((r) => [r.key, r.text]));
  targets.forEach((node) => {
    const value = byKey[node.dataset.text];
    if (value) node.textContent = value;
  });
  // Hide "draft" notes once the real text for that block is in the sheet.
  document.querySelectorAll("[data-draft-for]").forEach((tag) => {
    if (byKey[tag.dataset.draftFor]) tag.hidden = true;
  });
}

async function applyAnnouncement() {
  const box = document.getElementById("site-announcement");
  if (!box) return;
  const rows = await loadTab("announcement");
  const row = rows && rows.find((r) => isYes(r.show) && r.message);
  if (!row) return;
  const href = safeLink(row.link || "");
  box.replaceChildren(
    el("div", { className: "wrap" }, [
      el("p", { textContent: row.message }),
      href && el("a", { href, textContent: "Learn more" }),
    ])
  );
  box.hidden = false;
}

async function applyEvents() {
  const box = document.querySelector("[data-events]");
  if (!box) return;
  const rows = await loadTab("events");
  if (!rows) return; // sheet not connected: keep the placeholder
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = rows
    .map((r) => ({ ...r, when: parseDate(r.date || "") }))
    .filter((r) => r.title && r.when && r.when >= today)
    .sort((a, b) => a.when - b.when);

  if (!upcoming.length) {
    box.replaceChildren(el("p", { className: "events-empty", textContent: "No upcoming events right now. Check back soon!" }));
    return;
  }
  const list = el("ul", { className: "event-list" });
  for (const ev of upcoming) {
    const href = safeLink(ev.link || "");
    list.append(
      el("li", { className: "event" }, [
        el("p", { className: "event-date" }, [
          el("span", { className: "event-month", textContent: ev.when.toLocaleDateString("en-US", { month: "short" }) }),
          el("span", { className: "event-day", textContent: String(ev.when.getDate()) }),
        ]),
        el("div", { className: "event-body" }, [
          el("h3", { textContent: ev.title }),
          el("p", {
            className: "event-meta",
            textContent: [ev.when.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), ev.time, ev.location]
              .filter(Boolean)
              .join(" · "),
          }),
          ev.description && el("p", { textContent: ev.description }),
          href && el("a", { className: "event-link", href, textContent: "Details" }),
        ]),
      ])
    );
  }
  box.replaceChildren(list);
}

async function applyBoard() {
  const box = document.querySelector("[data-board]");
  if (!box) return;
  const rows = await loadTab("board");
  const people = (rows || []).filter((r) => r.name);
  if (!people.length) return; // keep the placeholder
  const grid = el("div", { className: "board-grid" });
  for (const p of people) {
    const id = driveId(p["drive photo link"] || "");
    const photo = el("div", { className: "board-photo" }, [
      el("span", { textContent: p.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() }),
    ]);
    photo.setAttribute("aria-hidden", "true");
    if (id) {
      const src = driveImage(id, 600);
      preload(src)
        .then(() => photo.replaceChildren(el("img", { src, alt: "", width: 600, height: 600, loading: "lazy" })))
        .catch(() => {});
    }
    grid.append(
      el("article", { className: "board-member" }, [photo, el("h3", { textContent: p.name }), p.role && el("p", { textContent: p.role })])
    );
  }
  box.replaceChildren(grid);
}

// "https://youtu.be/ID", "youtube.com/watch?v=ID", "/shorts/ID", "/embed/ID" -> ID
function youtubeId(link) {
  const m = link.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

async function applyVideos() {
  const section = document.querySelector("[data-videos]");
  if (!section) return;
  const rows = await loadTab("videos");
  const vids = (rows || []).map((r) => ({ ...r, id: youtubeId(r["youtube link"] || "") })).filter((r) => r.id);
  if (!vids.length) return; // section stays hidden
  const grid = section.querySelector(".video-grid");
  grid.replaceChildren(
    ...vids.map((v) =>
      el("figure", { className: "video" }, [
        el("iframe", {
          src: `https://www.youtube-nocookie.com/embed/${v.id}`,
          title: v.title || "Video from Heart of the City",
          loading: "lazy",
          allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture",
          allowFullscreen: true,
        }),
        v.title && el("figcaption", { textContent: v.title }),
      ])
    )
  );
  section.hidden = false;
}

[applyPhotos, applyText, applyAnnouncement, applyEvents, applyBoard, applyVideos].forEach((fn) =>
  fn().catch((err) => console.warn("[HOTC content]", err))
);
