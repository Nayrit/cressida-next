import Head from "next/head";

export const SITE_URL = "https://cressida.studio";
export const SITE_NAME = "Cressida";
export const SITE_TAGLINE = "Where Technology Meets Art";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/cressida.png`;

/**
 * Full SEO head for static pages: title, description, canonical, robots,
 * Open Graph, Twitter, and JSON-LD.
 */
export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}) {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const graph = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="author" content="Cressida Studio" />
      <meta
        name="keywords"
        content="Cressida, creative agency, AI agency, branding, web design, SaaS, marketing, Dhaka, Bangladesh, motion graphics, product design"
      />
      <meta name="theme-color" content="#0c0a1a" />
      <meta name="color-scheme" content="dark" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="BD-13" />
      <meta name="geo.placename" content="Dhaka" />
      <meta name="geo.position" content="23.7808875;90.4166667" />
      <meta name="ICBM" content="23.7808875, 90.4166667" />

      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/cressida.png" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${SITE_TAGLINE}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {graph.map((data, i) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Head>
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Cressida",
  alternateName: "Cressida Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/cressida.png`,
  image: `${SITE_URL}/cressida.png`,
  description:
    "AI-driven creative agency in Dhaka, Bangladesh — branding, content, SaaS, and growth.",
  email: "contact@cressida.studio",
  telephone: "+8801306032829",
  address: {
    "@type": "PostalAddress",
    streetAddress: "House 12, Road 5, Block B, Gulshan 1",
    addressLocality: "Dhaka",
    postalCode: "1212",
    addressCountry: "BD",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61583176097530",
    "https://www.instagram.com/cressida.studio_/",
  ],
  areaServed: ["BD", "Worldwide"],
  slogan: SITE_TAGLINE,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: "AI-driven creative agency — where technology meets art.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};

export function webPageJsonLd({ title, description, path }) {
  const url = `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}
