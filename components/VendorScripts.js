import Script from "next/script";
import { useEffect, useMemo, useState } from "react";

/**
 * Loads vendors in order. Handles already-cached scripts after client navigations
 * (Next Script onLoad often does not re-fire).
 */
export default function VendorScripts({
  scrollTrigger = true,
  main = true,
  extra = [],
}) {
  const [animeOk, setAnimeOk] = useState(false);
  const [gsapOk, setGsapOk] = useState(false);
  const [stOk, setStOk] = useState(!scrollTrigger);
  const [mainOk, setMainOk] = useState(!main);

  const extraKey = useMemo(
    () =>
      extra
        .map((item) => (typeof item === "string" ? item : `${item.src}:${item.init || ""}`))
        .join("|"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(extra)]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.anime) setAnimeOk(true);
    if (window.gsap) setGsapOk(true);
    if (!scrollTrigger || window.ScrollTrigger) setStOk(true);
  }, [scrollTrigger]);

  useEffect(() => {
    if (!main || !animeOk || !gsapOk || !stOk) return;

    const run = () => {
      window.__CRESSIDA_INITED__ = false;
      window.initCressida?.();
      setMainOk(true);
    };

    if (window.initCressida) {
      run();
      return;
    }

    const t = setTimeout(() => {
      if (window.initCressida) run();
      else setMainOk(true);
    }, 50);
    return () => clearTimeout(t);
  }, [main, animeOk, gsapOk, stOk]);

  useEffect(() => {
    if (!animeOk || !gsapOk || !stOk || !mainOk) return;
    extra.forEach((item) => {
      const init = typeof item === "string" ? undefined : item.init;
      if (typeof init === "string") window[init]?.();
      else if (typeof init === "function") init();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeOk, gsapOk, stOk, mainOk, extraKey]);

  const vendorsReady = animeOk && gsapOk && stOk;
  const allReady = vendorsReady && mainOk;

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
        strategy="afterInteractive"
        onLoad={() => setAnimeOk(true)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapOk(true)}
      />
      {gsapOk && scrollTrigger && (
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
          strategy="afterInteractive"
          onLoad={() => setStOk(true)}
        />
      )}
      {vendorsReady && main && (
        <Script
          src="/main.js"
          strategy="afterInteractive"
          onLoad={() => {
            window.__CRESSIDA_INITED__ = false;
            window.initCressida?.();
            setMainOk(true);
          }}
        />
      )}
      {allReady &&
        extra.map((item) => {
          const src = typeof item === "string" ? item : item.src;
          return <Script key={src} src={src} strategy="afterInteractive" />;
        })}
    </>
  );
}
