import { Html, Head, Main, NextScript } from "next/document";

const SPLASH_BOOT_SCRIPT = `
(function () {
  var KEY = "cressida_splash_seen";
  var play = false;
  try {
    play =
      /(?:^|[?&])splash_debug(?:=|&|$)/.test(location.search) ||
      sessionStorage.getItem(KEY) !== "1";
  } catch (e) {
    play = true;
  }
  if (!play) return;

  document.documentElement.classList.add("splash-boot");

  var style = document.createElement("style");
  style.id = "cressida-splash-boot-style";
  style.textContent =
    "html.splash-boot #cressida-splash-boot{position:fixed;inset:0;z-index:1000000;pointer-events:none;}" +
    "html.splash-boot #cressida-splash-boot .cressida-splash-boot-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 45%,#16122a 0%,#0c0a1a 55%,#07060f 100%);}" +
    "html.splash-boot .header-container .logo img{opacity:0!important;visibility:hidden!important;}";
  document.head.appendChild(style);

  var el = document.createElement("div");
  el.id = "cressida-splash-boot";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = '<div class="cressida-splash-boot-bg"></div>';
  document.body.insertBefore(el, document.body.firstChild);
})();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/cressida.png" />
        <meta name="theme-color" content="#0c0a1a" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/footer.css" />
        <link rel="stylesheet" href="/services.css" />
        <link rel="stylesheet" href="/team.css" />
        <link rel="stylesheet" href="/contact.css" />
        <link rel="stylesheet" href="/contact_2.css" />
        <link rel="stylesheet" href="/get-started.css" />
      </Head>
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: SPLASH_BOOT_SCRIPT }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
