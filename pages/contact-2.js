import { useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import SEO, { organizationJsonLd, webPageJsonLd } from "../components/SEO";
import SiteChrome from "../components/SiteChrome";

function loadScript(src, isReady) {
  return new Promise((resolve) => {
    if (isReady()) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (isReady()) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      setTimeout(() => resolve(), 300);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}

const TITLE = "Connect with Cressida";
const DESCRIPTION =
  "Start a project with Cressida or send a general inquiry. Choose how you want to connect with our AI-driven creative agency.";

export default function Contact2Page() {
  useEffect(() => {
    document.body.classList.add("contact2-page");
    document.body.style.cursor = "auto";
    document.body.style.overflow = "";

    let cancelled = false;
    let floatTween = null;

    (async () => {
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js",
        () => !!window.anime
      );
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js",
        () => !!window.gsap
      );
      if (cancelled) return;

      const cards = document.querySelectorAll(".contact-card");
      cards.forEach((c) => {
        c.style.opacity = "1";
      });

      if (window.anime) {
        window.anime({
          targets: ".contact-card",
          opacity: [0, 1],
          translateY: [30, 0],
          easing: "easeOutCubic",
          duration: 800,
          delay: window.anime.stagger(150),
        });
      }

      if (window.gsap) {
        window.gsap.killTweensOf(".contact-card");
        floatTween = window.gsap.to(".contact-card", {
          y: -10,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          stagger: { each: 0.25, yoyo: true },
        });
      }
    })();

    return () => {
      cancelled = true;
      document.body.classList.remove("contact2-page");
      document.body.style.cursor = "";
      document.body.style.overflow = "";
      if (window.gsap) {
        window.gsap.killTweensOf(".contact-card");
        floatTween?.kill?.();
      }
    };
  }, []);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/contact-2/"
        jsonLd={[
          organizationJsonLd,
          webPageJsonLd({
            title: `${TITLE} | Cressida`,
            description: DESCRIPTION,
            path: "/contact-2/",
          }),
        ]}
      />

      <SiteChrome showIkigai={false} />
      <GradientBackground />

      <a href="/contact/" className="close-btn" aria-label="Back to Contact">
        <span className="close-x" aria-hidden="true">
          ×
        </span>
      </a>

      <main id="main" className="contact2-wrapper" tabIndex={-1}>
        <h1 className="visually-hidden">Choose how to connect with Cressida</h1>
        <section className="cards" aria-label="Contact options">
          <article className="contact-card card--left">
            <h2 className="card-title">
              Have a Project in
              <br />
              Mind?
            </h2>

            <a href="/get-started/" className="card-cta">
              <span>Get Started</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </article>

          <article className="contact-card card--right">
            <h2 className="card-title">
              Nope! I have a
              <br />
              General Inquiry.
            </h2>

            <a
              className="card-cta"
              href="mailto:contact@cressida.studio?subject=General%20Inquiry"
            >
              <span>Email Us</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </article>
        </section>
      </main>
    </>
  );
}
