function initCressida() {
  if (window.__CRESSIDA_INITED__) return;
  window.__CRESSIDA_INITED__ = true;

  // ------------------------------
  // Gradient "interactive" bubble
  // ------------------------------
  const interBubble = document.querySelector(".interactive");
  let curX = 0,
    curY = 0,
    tgX = 0,
    tgY = 0;
  let running = false;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    if (interBubble) {
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    requestAnimationFrame(move);
  }

  function onMouseMove(event) {
    tgX = event.clientX;
    tgY = event.clientY;
    if (!running && interBubble) {
      running = true;
      move();
    }
  }

  if (interBubble) {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
  }

  // ------------------------------
  // Glass cursor + dual-language reveal (DESKTOP ONLY)
  // ------------------------------
  const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isDesktop && !prefersReduced) {
    const lens = document.getElementById("reveal-lens");
    const lensContent = document.getElementById("reveal-content");
    const textContainer = document.querySelector(".text-container");
    const englishImage = document.querySelector(".english-layer .text-image");
    const englishLayer = document.querySelector(".english-layer");
    const japaneseImageSrc = document.querySelector(".japanese-layer .text-image")?.src;

    if (lens) lens.style.opacity = "1";

    function collapseMaskOnly() {
      if (!englishLayer || !lens || !lensContent) return;
      lensContent.style.visibility = "hidden";
      lensContent.style.opacity = "0";
      englishLayer.style.setProperty("--mask-size", `0px`);
      lens.style.backdropFilter = "saturate(180%) contrast(120%)";
    }

    // Start fully visible (no hole) until pointer is over the text
    collapseMaskOnly();

    if (lens && lensContent && textContainer && englishImage && englishLayer && japaneseImageSrc) {
      lensContent.innerHTML = "";
      const japaneseClone = document.createElement("img");
      japaneseClone.src = japaneseImageSrc;
      lensContent.appendChild(japaneseClone);

      let textRect = null;
      const updateTextRect = () => {
        textRect = textContainer.getBoundingClientRect();
      };
      const getLensSize = () =>
        window.innerWidth <= 576 ? 100 : window.innerWidth <= 768 ? 150 : 220;

      function updateLens(x, y) {
        if (!lens) return;
        const lensSize = getLensSize();
        lens.style.width = `${lensSize}px`;
        lens.style.height = `${lensSize}px`;
        lens.style.left = `${x}px`;
        lens.style.top = `${y}px`;

        if (!textRect) {
          collapseMaskOnly();
          return;
        }

        const over =
          x >= textRect.left &&
          x <= textRect.right &&
          y >= textRect.top &&
          y <= textRect.bottom;
        if (!over) {
          collapseMaskOnly();
          return;
        }

        const maskX = x - textRect.left;
        const maskY = y - textRect.top;
        englishLayer.style.setProperty("--mask-size", `${lensSize / 2}px`);
        englishLayer.style.setProperty("--mask-x", `${maskX}px`);
        englishLayer.style.setProperty("--mask-y", `${maskY}px`);

        lensContent.style.visibility = "visible";
        lensContent.style.opacity = "1";
        lens.style.backdropFilter = "blur(5px) saturate(200%) contrast(120%)";

        japaneseClone.style.width = `${englishImage.offsetWidth}px`;
        japaneseClone.style.height = `${englishImage.offsetHeight}px`;
        const cloneX = textRect.left - (x - lensSize / 2);
        const cloneY = textRect.top - (y - lensSize / 2);
        japaneseClone.style.left = `${cloneX}px`;
        japaneseClone.style.top = `${cloneY}px`;
      }

      function handleInteraction(e) {
        const x = e.clientX;
        const y = e.clientY;
        if (x === undefined || y === undefined) return;
        if (!textRect) updateTextRect();
        requestAnimationFrame(() => updateLens(x, y));
      }

      document.addEventListener("mousemove", handleInteraction);

      window.addEventListener(
        "scroll",
        () => {
          collapseMaskOnly();
          requestAnimationFrame(updateTextRect);
        },
        { passive: true }
      );

      const ro = new ResizeObserver(updateTextRect);
      ro.observe(textContainer);
      if (englishImage.complete) updateTextRect();
      else englishImage.onload = updateTextRect;
    } else if (lens) {
      document.addEventListener("mousemove", (e) => {
        requestAnimationFrame(() => {
          const size = window.innerWidth <= 576 ? 100 : window.innerWidth <= 768 ? 150 : 220;
          lens.style.width = `${size}px`;
          lens.style.height = `${size}px`;
          lens.style.left = `${e.clientX}px`;
          lens.style.top = `${e.clientY}px`;
          lens.style.backdropFilter = "saturate(180%) contrast(120%)";
        });
      });
    }
  }

  // ------------------------------
  // GSAP / ScrollTrigger (projects)
  // ------------------------------
  function setupScrollAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const fixedTextElements = document.querySelectorAll(".ikigai-fixed, .tagline-top-right");
    if (fixedTextElements.length > 0) {
      gsap.to(fixedTextElements, {
        autoAlpha: 0,
        scrollTrigger: {
          trigger: ".hero-section",
          start: "bottom 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }

    const projectsSection = document.querySelector(".projects-section-horizontal");
    if (!projectsSection) return;

    const track = document.querySelector(".projects-track");
    const panels = gsap.utils.toArray(".project-panel");
    const rootStyles = getComputedStyle(document.documentElement);

    const colorTarget = document.body;
    let activeColorId = null;
    let colorTween = null;

    function tweenColors(vars, duration, ease) {
      if (colorTween) colorTween.kill();
      colorTween = gsap.to(colorTarget, {
        ...vars,
        duration: duration ?? 0.85,
        ease: ease ?? "power2.out",
        overwrite: "auto",
      });
    }

    function varsForPanel(id) {
      return {
        "--color-bg1": rootStyles.getPropertyValue(`--panel-${id}-bg1`).trim(),
        "--color-bg2": rootStyles.getPropertyValue(`--panel-${id}-bg2`).trim(),
        "--color1": rootStyles.getPropertyValue(`--panel-${id}-c1`).trim(),
        "--color2": rootStyles.getPropertyValue(`--panel-${id}-c2`).trim(),
        "--color3": rootStyles.getPropertyValue(`--panel-${id}-c3`).trim(),
        "--color4": rootStyles.getPropertyValue(`--panel-${id}-c4`).trim(),
        "--color5": rootStyles.getPropertyValue(`--panel-${id}-c5`).trim(),
        "--color-interactive": rootStyles
          .getPropertyValue(`--panel-${id}-interactive`)
          .trim(),
      };
    }

    function varsDefault() {
      return {
        "--color-bg1": rootStyles.getPropertyValue("--color-bg1-default").trim(),
        "--color-bg2": rootStyles.getPropertyValue("--color-bg2-default").trim(),
        "--color1": rootStyles.getPropertyValue("--color1-default").trim(),
        "--color2": rootStyles.getPropertyValue("--color2-default").trim(),
        "--color3": rootStyles.getPropertyValue("--color3-default").trim(),
        "--color4": rootStyles.getPropertyValue("--color4-default").trim(),
        "--color5": rootStyles.getPropertyValue("--color5-default").trim(),
        "--color-interactive": rootStyles
          .getPropertyValue("--color-interactive-default")
          .trim(),
      };
    }

    function applyPanelColors(id) {
      if (!id || activeColorId === id) return;
      activeColorId = id;
      tweenColors(varsForPanel(id), 0.85, "power2.out");
    }

    function applyDefaultColors(force = false) {
      if (!force && activeColorId === "default") return;
      activeColorId = "default";
      tweenColors(varsDefault(), 0.55, "power2.out");
    }

    applyDefaultColors(true);

    // Footer must always use the default (red/black) theme — not the last project panel
    const footer = document.querySelector(".bf-footer");
    if (footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: "top 90%",
        end: "bottom top",
        onEnter: () => applyDefaultColors(true),
        onEnterBack: () => applyDefaultColors(true),
      });
    }

    ScrollTrigger.matchMedia({
      "(min-width: 992px)": function () {
        if (!track || !panels.length) return;

        // Each panel is exactly one viewport wide
        gsap.set(track, { x: 0, width: `${panels.length * 100}vw` });
        gsap.set(panels, { width: "100vw", flex: "0 0 100vw" });

        const getScrollDistance = () =>
          Math.max(track.scrollWidth - window.innerWidth, 0);

        const firstId = panels[0]?.dataset?.panelId;
        const lastId = panels[panels.length - 1]?.dataset?.panelId;

        const horizontalScroll = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => "+=" + getScrollDistance(),
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onLeave: () => applyDefaultColors(true),
            onEnterBack: () => lastId && applyPanelColors(lastId),
          },
        });

        ScrollTrigger.create({
          trigger: projectsSection,
          start: "top 80%",
          end: "bottom top",
          onEnter: () => firstId && applyPanelColors(firstId),
          onEnterBack: () => lastId && applyPanelColors(lastId),
          onLeave: () => applyDefaultColors(true),
          onLeaveBack: () => applyDefaultColors(true),
        });

        panels.forEach((panel) => {
          const id = panel.dataset.panelId;
          if (!id) return;
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontalScroll,
            start: "left center",
            end: "right center",
            onEnter: () => applyPanelColors(id),
            onEnterBack: () => applyPanelColors(id),
          });
        });

        // Recalc after images paint so pin distance is correct
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
          horizontalScroll.scrollTrigger?.kill();
          horizontalScroll.kill();
          gsap.set(track, { clearProps: "x,width" });
        };
      },

      "(max-width: 991.98px)": function () {
        if (track) {
          gsap.set(track, { clearProps: "x,width" });
          track.style.removeProperty("width");
        }
        if (!panels.length) return;

        const firstId = panels[0]?.dataset?.panelId;
        const lastId = panels[panels.length - 1]?.dataset?.panelId;

        ScrollTrigger.create({
          trigger: projectsSection,
          start: "top 75%",
          end: "bottom top",
          onEnter: () => firstId && applyPanelColors(firstId),
          onEnterBack: () => lastId && applyPanelColors(lastId),
          onLeave: () => applyDefaultColors(true),
          onLeaveBack: () => applyDefaultColors(true),
        });

        panels.forEach((panel) => {
          const id = panel.dataset.panelId;
          const image = panel.querySelector("img");
          if (!id || !image) return;
          ScrollTrigger.create({
            trigger: image,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => applyPanelColors(id),
            onEnterBack: () => applyPanelColors(id),
          });
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      },
    });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
  }

  function whenReady(fn) {
    const run = () => {
      // Wait one frame after load so layout (and images) settle
      requestAnimationFrame(() => requestAnimationFrame(fn));
    };
    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });
  }

  whenReady(setupScrollAnimations);
}

window.initCressida = initCressida;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCressida);
} else {
  initCressida();
}
