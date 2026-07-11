function initContactPage() {
  const heroBits = document.querySelectorAll(".contact-title, .cta");
  if (heroBits.length && window.anime) {
    window.anime({
      targets: heroBits,
      opacity: [0, 1],
      translateY: [14, 0],
      easing: "easeOutCubic",
      duration: 650,
      delay: window.anime.stagger(120),
    });
  }

  if (window.gsap) {
    window.gsap.to(".cta", {
      scale: 1.02,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }

  const main = document.getElementById("main");
  if (main) window.setTimeout(() => main.focus(), 120);
}

window.initContactPage = initContactPage;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initContactPage);
} else {
  initContactPage();
}
