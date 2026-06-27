/* ==========================================================================
   GAZVA INSIGHTS — form.js
   web3form ACCESS KEY
   ========================================================================== */

(function () {
  "use strict";

  // TODO: Replace with your real Web3Forms access key from https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = "e42fb4ab-a451-4953-b6ed-7b6fcc81f819";
  const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

  function setStatus(statusEl, state, message) {
    if (!statusEl) return;
    statusEl.classList.remove("is-success", "is-error", "is-loading");
    statusEl.classList.add("is-visible", state);
    statusEl.textContent = message;
  }

  function clearStatus(statusEl) {
    if (!statusEl) return;
    statusEl.classList.remove("is-visible", "is-success", "is-error", "is-loading");
    statusEl.textContent = "";
  }

  /**
   * Wires a <form> up to submit via Web3Forms using fetch + JSON.
   * @param {string} formId - id of the <form> element
   * @param {string} statusId - id of the element used to show status messages
   * @param {object} [options]
   * @param {string} [options.subject] - custom email subject line for this form
   */
  function bindWeb3Form(formId, statusId, options) {
    const form = document.getElementById(formId);
    const statusEl = document.getElementById(statusId);
    if (!form) return;

    const opts = options || {};

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearStatus(statusEl);

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
        setStatus(
          statusEl,
          "is-error",
          "Form is not connected yet — add your Web3Forms access key in js/form.js."
        );
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      setStatus(statusEl, "is-loading", "Sending your message...");

      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      if (opts.subject) formData.append("subject", opts.subject);

      const payload = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (result.success) {
          setStatus(statusEl, "is-success", "Thank you. Your message has been sent.");
          form.reset();
        } else {
          setStatus(
            statusEl,
            "is-error",
            result.message || "Something went wrong. Please try again."
          );
        }
      } catch (err) {
        setStatus(
          statusEl,
          "is-error",
          "Could not send your message. Check your connection and try again."
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    });
  }

  window.GazvaForms = { bindWeb3Form };
})();
