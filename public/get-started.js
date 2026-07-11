function initGetStartedPage() {
  const steps = [...document.querySelectorAll(".wizard")];
  if (!steps.length) return;

  let current = 0;

  const animateIn = (el) => {
    if (!window.anime) return;
    window.anime({
      targets: el.querySelectorAll(
        ".h-eyebrow, .service, .choice, .budget-wrap, .form-lines .line, .wizard-cta"
      ),
      opacity: [0, 1],
      translateY: [16, 0],
      easing: "easeOutCubic",
      duration: 600,
      delay: window.anime.stagger(60),
    });
  };

  const showStep = (i) => {
    steps.forEach((s, idx) => {
      s.hidden = idx !== i;
    });
    current = i;
    animateIn(steps[i]);
  };

  showStep(0);

  document.querySelectorAll("[data-next]").forEach((btn) => {
    if (btn.__bound) return;
    btn.__bound = true;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (current < steps.length - 1) showStep(current + 1);
    });
  });

  const range = document.getElementById("budgetRange");
  const label = document.getElementById("budgetLabel");
  if (range && label && !range.__bound) {
    range.__bound = true;
    const update = () => (label.textContent = `$${range.value}`);
    range.addEventListener("input", update);
    update();
  }

  const form = document.getElementById("projectForm");
  if (form && !form.__bound) {
    form.__bound = true;
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = "Submitting...";
      }

      const data = new FormData(form);
      const scriptURL = form.getAttribute("action");

      // Persist locally so the thank-you flow always works on static export
      try {
        const payload = Object.fromEntries(data.entries());
        const services = data.getAll("services");
        payload.services = services;
        localStorage.setItem("cressida_project_lead", JSON.stringify(payload));
      } catch (_) {
        /* ignore */
      }

      if (!scriptURL) {
        window.location.href = "/thank-you/";
        return;
      }

      fetch(scriptURL, { method: "POST", body: data })
        .then(() => {
          window.location.href = "/thank-you/";
        })
        .catch((error) => {
          console.error("Error!", error.message);
          // Still succeed locally on static hosting
          window.location.href = "/thank-you/";
        });
    });
  }
}

window.initGetStartedPage = initGetStartedPage;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGetStartedPage);
} else {
  initGetStartedPage();
}
