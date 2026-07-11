import { useEffect, useState } from "react";

const SEEN_KEY = "cressida_splash_seen";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only show splash on the first visit in this browser session
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") {
        setShouldRender(false);
        setLoading(false);
        return;
      }
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch (_) {
      /* private mode — still show once this mount */
    }

    setShouldRender(true);

    let faded = false;
    const minMs = 700;
    const maxMs = 1600;
    const started = Date.now();

    const finish = () => {
      if (faded) return;
      faded = true;
      setLoading(false);
      setTimeout(() => setShouldRender(false), 800);
    };

    const tryFinish = () => {
      const elapsed = Date.now() - started;
      setTimeout(finish, Math.max(0, minMs - elapsed));
    };

    if (document.readyState === "complete") tryFinish();
    else window.addEventListener("load", tryFinish, { once: true });

    const maxTimer = setTimeout(finish, maxMs);
    return () => {
      clearTimeout(maxTimer);
      window.removeEventListener("load", tryFinish);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <div className={`preloader ${!loading ? "fade-out" : ""}`}>
        <div className="logo-container">
          <img src="/cressida.png" alt="Loading..." />
        </div>
      </div>

      <style jsx>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #0c0a1a;
          z-index: 999999;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: opacity 0.8s ease, visibility 0.8s ease;
        }

        .preloader.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .logo-container img {
          width: 300px;
          height: auto;
          display: block;
          animation: breathe 2s ease-in-out infinite;
        }

        @keyframes breathe {
          0% {
            opacity: 0.4;
            transform: scale(0.95);
            filter: blur(1px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
            filter: blur(0px);
          }
          100% {
            opacity: 0.4;
            transform: scale(0.95);
            filter: blur(1px);
          }
        }
      `}</style>
    </>
  );
}
