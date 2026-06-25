/* ==========================================================================
   GAZVA INSIGHTS — component.js
   Shared navbar + footer markup, injected into every page.
   Keeping these in one place means editing the menu once updates every page.
   ========================================================================== */

(function () {
  "use strict";

  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "quran.html", label: "Quran" },
    { href: "fiqh.html", label: "Fiqh" },
    { href: "thareekh.html", label: "Thareekh" },
    { href: "general.html", label: "General" },
    { href: "kurippathukal.html", label: "Kurippathukal" },
    { href: "contact.html", label: "Contact" },
  ];

  const FOOTER_QUICKLINKS = [
    { href: "index.html", label: "Home" },
    { href: "quran.html", label: "Quran" },
    { href: "fiqh.html", label: "Fiqh" },
    { href: "thareekh.html", label: "Thareekh" },
    { href: "general.html", label: "General" },
    { href: "kurippathukal.html", label: "Kurippathukal" },
    { href: "contact.html", label: "Contact" },
    { href: "about.html", label: "About" },
  ];

  const GAZVA_WEBSITE_URL = "https://www.gazva.com";

  // Pages inside /pages/ (e.g. article templates) need a "../" prefix on every
  // site-relative link. We detect this from a data attribute on <body> so the
  // same component script works at any folder depth.
  function getBasePath() {
    return document.body.getAttribute("data-base-path") || "";
  }

const LOGO_HTML = `
  <img
    src="logo 40.png"
    alt="Gazva Insights Logo"
    width="40"
    height="40"
    style="border-radius:10px; object-fit:cover;"
  >
`;

  function getCurrentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildNavbar() {
    const current = getCurrentPage();
    const base = getBasePath();
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML = `
      <nav class="navbar" aria-label="Primary">
        <a href="${base}index.html" class="navbar__brand" aria-label="Gazva Insights home">
           <span class="navbar__logo">
          <img
            src="${base}logo 40.png"
            alt="Gazva Insights Logo"
            width="40"
            height="40"
            style="border-radius:10px; object-fit:cover;"
          />
        </span>
          <span class="navbar__name">Gazva <span>Insights</span></span>
        </a>
        <ul class="navbar__links" id="navbarLinks">
          ${NAV_LINKS.map(
            (link) =>
              `<li><a href="${base}${link.href}" class="${link.href === current ? "is-active" : ""}" ${
                link.href === current ? 'aria-current="page"' : ""
              }>${link.label}</a></li>`
          ).join("")}
        </ul>
        <button class="navbar__toggle" id="navbarToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navbarLinks">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>`;
    return header;
  }

 function buildFooter() {
  const base = getBasePath();
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer__top">

      <!-- Col 2: Brand -->
      <div class="footer__col footer__col--brand">
        <div class="footer__brand">
          <img src="${base}logo 40.png" alt="Gazva Insights logo" class="footer__logo-img" />
          <div class="footer__brand-text">
            <span class="footer__brand-name">Gazva Insight</span>
            <span class="footer__brand-subline">Knowledge &amp; Reflection</span>
          </div>
        </div>
        <p class="footer__tagline">Sublime reflections on Quran, Fiqh, history, and the everyday questions readers bring to us.</p>
      
      </div>

      <!-- Col 3: About & Contact -->
      <div class="footer__col">
        <h3 class="footer__heading">About</h3>
        <ul class="footer__links">
          <li><a href="${base}about.html">About Us</a></li>
          <li><a href="${base}contact.html">Contact Us</a></li>
          <li><a href="${base}contact.html#contactForm">Ask a Question</a></li>
          <li><a href="${GAZVA_WEBSITE_URL}" target="_blank" rel="noopener">Gazva Media &#8599;</a></li>
        </ul>
      </div>

      <div class="footer__col">
  <h3 class="footer__heading">Follow Us</h3>

  <div class="footer__socials">

    <!-- Instagram -->
    <a href="https://www.instagram.com/gazvafathimazahra/"
   class="footer__social-btn"
   aria-label="Instagram"
   target="_blank"
   rel="noopener">

  <svg width="16" height="16"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       stroke-width="1.8"
       stroke-linecap="round"
       stroke-linejoin="round"
       aria-hidden="true">

    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>

  </svg>

</a>

   <a href="https://www.facebook.com/people/Fathima-Zahra-Islamic-Womens-College-Chemmad-Students-Union-GAZVA/"
   class="footer__social-btn"
   aria-label="Facebook"
   target="_blank"
   rel="noopener">

  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>

</a>

   


  </div>
</div>

    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <span>&copy; <span id="footerYear">${new Date().getFullYear()}</span> Gazva Insights. All rights reserved.</span>
        <span>Powered by <a href="${GAZVA_WEBSITE_URL}" target="_blank" rel="noopener" style="color:#9FC1AC;">Gazva Media</a></span>
      </div>
    </div>`;

  return footer;
}

  function buildAskSidebar() {
    const wrap = document.createElement("aside");
    wrap.className = "ask-sidebar";
    wrap.setAttribute("aria-label", "Ask your question");
    wrap.innerHTML = `
      <h3 class="ask-sidebar__title">Ask your question</h3>
      <p class="ask-sidebar__desc">Have something on your mind about Quran, Fiqh, or history? Send it to our editorial team.</p>
      <form id="askQuestionForm" novalidate>
        <div class="form-field">
          <label for="ask-name">Name</label>
          <input id="ask-name" name="name" type="text" placeholder="Your name" required autocomplete="name" />
        </div>
        <div class="form-field">
          <label for="ask-email">Email</label>
          <input id="ask-email" name="email" type="email" placeholder="Your email address" required autocomplete="email" />
        </div>
        <div class="form-field">
          <label for="ask-subject">Subject</label>
          <textarea id="ask-subject" name="subject" placeholder="Topic of your question" required></textarea>
        </div>
        <div class="form-field">
        <label for="askq-category">Category</label>
        <select id="askq-category" name="category" required>
          <option value="">Select a category</option>
          <option value="Fiqh">Fiqh</option>
          <option value="Quran">Quran</option>
          <option value="Thareekh">Thareekh</option>
          <option value="General">General</option>
          <option value="Other">Other</option>
        </select>
      </div>
        <div class="form-field">
          <label for="ask-question">Your question</label>
          <textarea id="ask-question" name="question" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Send question</button>
        <div class="form-status" id="askQuestionStatus" role="status"></div>
      </form>`;
    return wrap;
  }

  
  function mountIncludes() {
    const headerSlot = document.getElementById("siteHeader");
    if (headerSlot) headerSlot.replaceWith(buildNavbar());

    const footerSlot = document.getElementById("siteFooter");
    if (footerSlot) footerSlot.replaceWith(buildFooter());

    document.querySelectorAll("#askSidebar").forEach((slot) => {
      slot.replaceWith(buildAskSidebar());
    });

    const yearEl = document.getElementById("footerYear");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function wireMobileMenu() {
    const toggle = document.getElementById("navbarToggle");
    const links = document.getElementById("navbarLinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  function wireShareButtons() {
    document.querySelectorAll("[data-share]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const platform = btn.getAttribute("data-share");
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let shareUrl = "";
        if (platform === "whatsapp") {
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
        } else if (platform === "facebook") {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        if (shareUrl) window.open(shareUrl, "_blank", "noopener,width=600,height=600");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountIncludes();
    wireMobileMenu();
    wireShareButtons();

    // The "Ask your question" sidebar form posts to Web3Forms, same as the contact form.
    if (window.GazvaForms && typeof window.GazvaForms.bindWeb3Form === "function") {
      window.GazvaForms.bindWeb3Form("askQuestionForm", "askQuestionStatus");
    }
  });
})();
