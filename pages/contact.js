import GradientBackground from "../components/GradientBackground";
import RevealEffects from "../components/RevealEffects";
import SEO, { organizationJsonLd, webPageJsonLd } from "../components/SEO";
import SiteChrome from "../components/SiteChrome";
import VendorScripts from "../components/VendorScripts";

const TITLE = "Contact";
const DESCRIPTION =
  "Get in touch with Cressida — AI-driven creative agency in Dhaka. Email contact@cressida.studio or start a project today.";

export default function ContactPage() {
  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/contact/"
        jsonLd={[
          organizationJsonLd,
          webPageJsonLd({
            title: `${TITLE} | Cressida`,
            description: DESCRIPTION,
            path: "/contact/",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Cressida",
            url: "https://cressida.studio/contact/",
            mainEntity: { "@id": "https://cressida.studio/#organization" },
          },
        ]}
      />

      <SiteChrome showIkigai={false} />
      <GradientBackground />

      <main id="main" className="main-content-wrapper" tabIndex={-1}>
        <section className="contact-hero" aria-labelledby="contact-heading">
          <div className="contact-inner">
            <h1 id="contact-heading" className="contact-title">
              Get In&nbsp;Touch
            </h1>
          </div>

          <div className="contact-bottom">
            <div className="corner left">
              <div className="eyebrow">Write To Us</div>
              <div>
                <a href="mailto:contact@cressida.studio">
                  contact@cressida.studio
                </a>
              </div>
            </div>

            <a className="cta" href="/contact-2/">
              <span>Let&apos;s Connect</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <RevealEffects />
        </section>
      </main>

      <VendorScripts
        extra={[{ src: "/contact.js", init: "initContactPage" }]}
      />
    </>
  );
}
