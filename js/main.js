/* =========================================================
   GAZVA INSIGHTS — main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page") || "index.html";
  mountSharedComponents(page);
  initFormSubmissions();
  initShareButtons();
  initLoadMore();
});

/* ─── Load More ─────────────────────────────────────────── */
/*
  Matches HTML:
    grid  →  [data-load-more-grid]
    btn   →  [data-load-more-btn]
  Uses the native `hidden` attribute — simple and reliable.
  PAGE_SIZE cards visible on load; each click reveals PAGE_SIZE more.
*/
document.addEventListener("DOMContentLoaded", () => {
  // Run load more FIRST — independent of everything else
  initLoadMore();

  //  run shared components safely
  try {
    const page = document.body.getAttribute("data-page") || "";
    if (typeof mountSharedComponents === "function") mountSharedComponents(page);
    if (typeof initFormSubmissions === "function") initFormSubmissions();
  } catch(e) {
    console.warn("Component error:", e);
  }

  initShareButtons();
});

function initLoadMore() {
  const grid = document.querySelector("[data-load-more-grid]");
  const btn  = document.querySelector("[data-load-more-btn]");
  if (!grid || !btn) return;

  const PAGE_SIZE = 4;
  const items = Array.from(grid.children);

  // Add is-hidden to cards beyond PAGE_SIZE
  items.forEach((item, i) => {
    if (i >= PAGE_SIZE) item.classList.add("is-hidden");
  });

  if (items.length <= PAGE_SIZE) {
    btn.classList.add("is-hidden");
    return;
  }

  let visible = PAGE_SIZE;

  btn.addEventListener("click", () => {
    const next = items.slice(visible, visible + PAGE_SIZE);
    next.forEach(item => item.classList.remove("is-hidden"));
    visible += next.length;

    if (visible >= items.length) btn.classList.add("is-hidden");
  });
}

/* ─── Form Submissions (Web3Forms) ────────────────────── */
function initFormSubmissions() {
  document.addEventListener("submit", async (e) => {
    const form = e.target.closest("form[data-form-name]");
    if (!form) return;
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const successEl = form.querySelector(".form-success");
    const origText = btn ? btn.textContent : "";

    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }

    const data = Object.fromEntries(new FormData(form).entries());
    const accessKey = data.access_key || "";

    try {
      if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        await new Promise(r => setTimeout(r, 700));
        onSuccess(form, successEl, btn, origText);
        return;
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.success) {
        onSuccess(form, successEl, btn, origText);
      } else {
        onError(btn, origText, result.message);
      }
    } catch (err) {
      onError(btn, origText, err.message);
    }
  });
}

function onSuccess(form, successEl, btn, origText) {
  form.reset();
  if (btn) { btn.disabled = false; btn.textContent = origText; }
  if (successEl) {
    successEl.style.display = "block";
    setTimeout(() => { successEl.style.display = ""; }, 5000);
  }
  if (form.classList.contains("comment-form")) {
    appendComment(form);
  }
}

function onError(btn, origText, msg) {
  if (btn) { btn.disabled = false; btn.textContent = origText; }
  alert("Something went wrong. Please try again.\n" + (msg || ""));
}

/* ─── Append optimistic comment ─────────────────────────── */
function appendComment(form) {
  const list = document.querySelector(".comment-list");
  if (!list) return;
  const name = (form.querySelector('[name="name"]') || {}).value || "Reader";
  const text = (form.querySelector('[name="message"]') || {}).value || "";
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <div class="comment-avatar">${esc(initials)}</div>
    <div class="comment-body">
      <span class="comment-name">${esc(name)}</span>
      <span class="comment-date">${date}</span>
      <p class="comment-text">${esc(text)}</p>
    </div>`;
  list.appendChild(div);
  div.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

/* ─── Share buttons ─────────────────────────────────────── */
function initShareButtons() {
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  document.querySelectorAll("[data-share-wa]").forEach(btn => {
    btn.href = `https://wa.me/?text=${title}%20${url}`;
  });
  document.querySelectorAll("[data-share-fb]").forEach(btn => {
    btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  });
  document.querySelectorAll("[data-share-tw]").forEach(btn => {
    btn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
  });
}

function resetContactForm() {
  document.getElementById("formContent").style.display = "block";
  document.getElementById("formSuccess").classList.remove("is-visible");
  document.getElementById("contactForm").reset();
}

document.getElementById("contactForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Sending…";

  const data = new FormData(this);

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "e42fb4ab-a451-4953-b6ed-7b6fcc81f819",
        subject: "New Contact Form Submission — Gazva Insights",
        ...Object.fromEntries(data)
      })
    });
    const result = await res.json();
    if (result.success) {
      document.getElementById("formContent").style.display = "none";
      document.getElementById("formSuccess").classList.add("is-visible");
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch {
    alert("Network error. Please try again.");
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
  }
});