import { Html, Head, Main, NextScript } from "next/document";

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
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
