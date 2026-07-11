import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SEEN_KEY = "cressida_splash_seen";

function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch (_) {
    return false;
  }
}

function markSplashSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch (_) {
    /* ignore */
  }
}

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const id = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

function clearSplashBoot() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("splash-boot");
  document.getElementById("cressida-splash-boot")?.remove();
  document.getElementById("cressida-splash-boot-style")?.remove();
}

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [mountStyles, setMountStyles] = useState(false);
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);

  // Cover the page before paint when splash should play
  useLayoutEffect(() => {
    const debugSplash =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).has("splash_debug");
    if (!debugSplash && hasSeenSplash()) {
      clearSplashBoot();
      return;
    }
    setMountStyles(true);
    setVisible(true);
    document.body.classList.add("splash-active");
  }, []);

  // Drop the pre-hydration veil only after React splash is mounted
  useLayoutEffect(() => {
    if (visible) clearSplashBoot();
  }, [visible]);

  useEffect(() => {
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const debugSplash = params?.has("splash_debug");

    if (!debugSplash && hasSeenSplash()) {
      clearSplashBoot();
      setVisible(false);
      setMountStyles(false);
      return;
    }

    if (debugSplash) {
      try {
        sessionStorage.removeItem(SEEN_KEY);
      } catch (_) {
        /* ignore */
      }
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controller = new AbortController();
    const { signal } = controller;

    document.body.classList.add("splash-active");
    setMountStyles(true);
    setVisible(true);

    const finish = async () => {
      if (!debugSplash) markSplashSeen();
      clearSplashBoot();
      document.body.classList.remove("splash-active");
      document.body.classList.add("splash-complete");
      setVisible(false);
      window.setTimeout(() => {
        document.body.classList.remove("splash-complete");
        setMountStyles(false);
      }, 700);
    };

    const run = async () => {
      try {
        if (reduce) {
          await wait(350, signal);
          await finish();
          return;
        }

        // Let layout mount; keep retrying until the real nav mark exists
        const findNavLogo = () =>
          document.querySelector(".header-container .logo img") ||
          document.querySelector(".logo img");

        let navImg = null;
        for (let i = 0; i < 50 && !signal.aborted; i++) {
          navImg = findNavLogo();
          if (navImg) break;
          await wait(40, signal);
        }

        // Wait until the splash logo node is actually mounted
        let logo = logoRef.current;
        for (let i = 0; i < 50 && !signal.aborted; i++) {
          logo = logoRef.current;
          if (logo) break;
          await wait(40, signal);
        }
        const bg = bgRef.current;

        if (!logo) {
          await wait(300, signal);
          await finish();
          return;
        }

        // Enter: soft rise into center
        logo.style.opacity = "0";
        logo.style.transform = "translate(0px, 14px) scale(0.88)";
        logo.style.filter = "blur(10px)";
        void logo.offsetWidth;

        logo.style.transition =
          "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s ease";
        logo.style.opacity = "1";
        logo.style.transform = "translate(0px, 0px) scale(1)";
        logo.style.filter = "blur(0px)";

        await wait(1100, signal);

        // Re-query in case nav mounted during enter
        navImg = findNavLogo() || navImg;

        if (!navImg) {
          if (bg) {
            bg.style.transition = "opacity 0.7s ease";
            bg.style.opacity = "0";
          }
          await wait(700, signal);
          await finish();
          return;
        }

        // Brief hold in center (longer when ?splash_debug=1)
        const debugHold =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).has("splash_debug");
        await wait(debugHold ? 10000 : 420, signal);

        // FLIP: measure after settle
        logo.style.transition = "none";
        logo.style.transform = "translate(0px, 0px) scale(1)";
        void logo.offsetWidth;

        const from = logo.getBoundingClientRect();
        const to = navImg.getBoundingClientRect();
        const scale = to.width / Math.max(from.width, 1);
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);

        // Morph into navbar mark while veil lifts
        void logo.offsetWidth;
        logo.style.transition =
          "transform 1.15s cubic-bezier(0.65, 0, 0.35, 1), filter 1s ease, opacity 0.2s ease 1s";
        logo.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
        logo.style.filter = "blur(0.35px)";

        if (bg) {
          bg.style.transition =
            "opacity 1s cubic-bezier(0.4, 0, 0.2, 1) 0.28s";
          bg.style.opacity = "0";
        }

        await wait(1180, signal);
        logo.style.opacity = "0";
        await wait(160, signal);
        await finish();
      } catch (err) {
        if (err?.name === "AbortError") return;
        await finish();
      }
    };

    run();

    return () => {
      controller.abort();
      document.body.classList.remove("splash-active", "splash-complete");
    };
  }, []);

  if (!visible && !mountStyles) return null;

  return (
    <>
      {visible && (
        <div
          ref={rootRef}
          className="cressida-splash"
          aria-hidden="true"
          role="presentation"
        >
          <div ref={bgRef} className="cressida-splash-bg" />
          <div className="cressida-splash-stage">
            <img
              ref={logoRef}
              src="/cressida.png"
              alt=""
              className="cressida-splash-logo"
              draggable={false}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        body.splash-active .header-container .logo img {
          opacity: 0 !important;
          visibility: hidden !important;
        }

        body.splash-complete .header-container .logo img {
          animation: cressidaNavLogoReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @keyframes cressidaNavLogoReveal {
          from {
            opacity: 0;
            transform: scale(0.97);
            filter: blur(1.5px);
          }
          to {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }

        .cressida-splash {
          position: fixed;
          inset: 0;
          z-index: 999999;
          pointer-events: none;
          overflow: hidden;
        }

        .cressida-splash-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 80% 60% at 50% 45%,
            #16122a 0%,
            #0c0a1a 55%,
            #07060f 100%
          );
        }

        .cressida-splash-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cressida-splash-logo {
          width: min(280px, 58vw);
          height: auto;
          display: block;
          transform-origin: center center;
          will-change: transform, filter, opacity;
          user-select: none;
          opacity: 0;
        }
      `}</style>
    </>
  );
}
