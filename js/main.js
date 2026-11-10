/* Heart of the City Development Center — shared header/footer, nav, tabs and forms.
   The header and footer live here so all six pages stay in sync: edit them once. */

// TODO(hookup): paste the deployed Google Apps Script web app URL here (see apps-script/Code.gs).
// While this is empty, the contact and newsletter forms show a "not connected yet" message.
const FORM_ENDPOINT = "";

const CONTACT = {
  phone: "(517) 219-3425",
  phoneHref: "tel:+15172193425",
  email: "yourrecipe4healing@gmail.com",
  web: "www.heartofthecity989.com",
  webHref: "https://www.heartofthecity989.com",
  // TODO(client): real Facebook URL for "HOTC: Healing, Hope, & Growth"
  facebookHref: "#",
};

const NAV = [
  { id: "home", href: "index.html", label: "Home" },
  { id: "adult", href: "adult-programming.html", label: "Adult Programming", tab: "adult" },
  { id: "youth", href: "youth-families.html", label: "Youth (K–15) and Families", tab: "youth" },
  { id: "about", href: "about.html", label: "About" },
  { id: "involved", href: "get-involved.html", label: "Get Involved" },
  { id: "contact", href: "contact.html", label: "Contact" },
];

const ICONS = {
  "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
};

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;

function renderLayout() {
  const page = document.body.dataset.page;

  const sprite = document.createElement("div");
  sprite.hidden = true;
  sprite.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg">' +
    Object.entries(ICONS)
      .map(([name, paths]) => `<symbol id="i-${name}" viewBox="0 0 24 24">${paths}</symbol>`)
      .join("") +
    "</svg>";
  document.body.prepend(sprite);

  const navLinks = (cls) =>
    NAV.map(
      (n) =>
        `<li><a href="${n.href}"${n.tab ? ` data-tab="${n.tab}"` : ""}${
          cls === "nav" && n.id === page ? ' aria-current="page"' : ""
        }>${n.label}</a></li>`
    ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="topbar"><div class="wrap">
      <a href="${CONTACT.phoneHref}">${icon("phone")} ${CONTACT.phone}</a>
      <a href="mailto:${CONTACT.email}">${icon("mail")} ${CONTACT.email}</a>
    </div></div>
    <div class="site-header"><div class="wrap">
      <a class="brand" href="index.html">
        <img src="assets/logo/hotc-logo-160.png" alt="" width="132" height="160">
        <span class="brand-name">Heart of the City<br>Development Center<small>Your Recipe for Healing</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Menu">${icon("menu")}</button>
      <nav class="nav" id="site-nav" aria-label="Main"><ul>${navLinks("nav")}</ul></nav>
    </div></div>`;

  document.getElementById("site-footer").innerHTML = `
    <section class="newsletter" aria-labelledby="newsletter-title"><div class="wrap">
      <div>
        <h2 id="newsletter-title">Stay Connected. Stay Inspired.</h2>
        <p>Be the first to hear about exciting programs, upcoming events, community initiatives, and opportunities to get involved at Heart of the City Development Center—delivered straight to your inbox.</p>
      </div>
      <form data-form="newsletter" novalidate>
        <input type="email" name="email" required autocomplete="email" placeholder="you@example.com" aria-label="Email address">
        <button class="btn btn--purple" type="submit">Sign Up</button>
        <p class="form-status" role="status"></p>
      </form>
    </div></section>
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <img src="assets/logo/hotc-logo-600.png" alt="Heart of the City Development Center logo" width="600" height="726" loading="lazy">
          <p class="statement">A place to learn, grow, engage &amp; heal.</p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul class="footer-nav">${navLinks("footer")}</ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul class="contact-list">
            <li>${icon("map-pin")} <span>First United Methodist Church (Rear Entrance)<br>4790 Gratiot Rd., Saginaw, MI 48638</span></li>
            <li>${icon("phone")} <a href="${CONTACT.phoneHref}">${CONTACT.phone}</a></li>
            <li>${icon("mail")} <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
            <li>${icon("globe")} <a href="${CONTACT.webHref}">${CONTACT.web}</a></li>
            <li>${icon("facebook")} <a href="${CONTACT.facebookHref}">HOTC: Healing, Hope, &amp; Growth</a> <span class="ph">[PLACEHOLDER: Facebook link]</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bar"><span>Education</span><span>Empowerment</span><span>Inclusion</span><span>Support</span><span>Healing</span><span>Stronger Communities</span></div>
      <p class="footer-legal">© ${new Date().getFullYear()} Heart of the City Development Center</p>
    </footer>`;

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

/* "Our Key Focus" tabs: click or use the arrow keys */
function initTabs() {
  document.querySelectorAll(".tabs").forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        select(tabs[(i + step + tabs.length) % tabs.length], true);
      });
    });
  });
}

/* Contact + newsletter forms post to one Apps Script endpoint, which emails
   the center and logs a timestamped row in a Google Sheet. */
function initForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const status = form.querySelector(".form-status");
    const say = (text, cls) => {
      status.textContent = text;
      status.className = "form-status " + cls;
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new URLSearchParams(new FormData(form));
      if (data.get("website")) return; // honeypot: bots fill this hidden field
      data.set("form", form.dataset.form);

      if (!FORM_ENDPOINT) {
        say(`Draft site: this form isn't connected yet. Please call ${CONTACT.phone} or email ${CONTACT.email}.`, "warn");
        return;
      }
      const button = form.querySelector('[type="submit"]');
      button.disabled = true;
      try {
        // Apps Script web apps don't return CORS headers, so the reply can't be read.
        // A resolved request means it was delivered.
        await fetch(FORM_ENDPOINT, { method: "POST", mode: "no-cors", body: data });
        form.reset();
        say(form.dataset.form === "newsletter" ? "You're signed up. Thank you!" : "Thank you! We'll be in touch soon.", "ok");
      } catch {
        say(`Something went wrong. Please call ${CONTACT.phone} or email ${CONTACT.email}.`, "warn");
      } finally {
        button.disabled = false;
      }
    });
  });
}

renderLayout();
initTabs();
initForms();
