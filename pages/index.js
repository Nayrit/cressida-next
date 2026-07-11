import GradientBackground from "../components/GradientBackground";
import HeroText from "../components/HeroText";
import RevealEffects from "../components/RevealEffects";
import SEO, {
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "../components/SEO";
import SiteChrome from "../components/SiteChrome";
import VendorScripts from "../components/VendorScripts";

const TITLE = "Cressida — AI-Driven Creative Agency";
const DESCRIPTION =
  "Cressida is an AI-driven creative agency in Dhaka, Bangladesh. Branding, content & creative, SaaS solutions, and marketing & growth — where technology meets art.";

export default function HomePage() {
  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        jsonLd={[
          organizationJsonLd,
          websiteJsonLd,
          webPageJsonLd({
            title: TITLE,
            description: DESCRIPTION,
            path: "/",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Cressida",
            image: "https://cressida.studio/cressida.png",
            url: "https://cressida.studio/",
            telephone: "+8801306032829",
            email: "contact@cressida.studio",
            address: {
              "@type": "PostalAddress",
              streetAddress: "House 12, Road 5, Block B, Gulshan 1",
              addressLocality: "Dhaka",
              postalCode: "1212",
              addressCountry: "BD",
            },
            priceRange: "$$",
            areaServed: "Worldwide",
          },
        ]}
      />

      <SiteChrome />
      <GradientBackground />

      <main id="main" className="main-content-wrapper">
        <section className="hero-section" aria-labelledby="home-heading">
          <h1 id="home-heading" className="visually-hidden">
            Cressida — Where Technology Meets Art
          </h1>
          <p className="visually-hidden">
            AI-driven creative agency specializing in branding, content, SaaS,
            and growth marketing.
          </p>
          <HeroText />
        </section>

        <section
          className="projects-section-horizontal"
          aria-label="Selected projects"
        >
          <h2 className="visually-hidden">Selected work</h2>
          <div className="projects-track" data-layout="horizontal">
            <div className="project-panel" data-panel-id="1">
              <div className="project-content">
                <picture>
                  <source
                    media="(max-width: 767.98px)"
                    srcSet="/images/circular1-mobile.png"
                  />
                  <img
                    src="/images/circular1.PNG"
                    alt="Plant Affairs — branding and lifestyle project by Cressida"
                    loading="eager"
                    fetchPriority="high"
                    width={1000}
                    height={1000}
                  />
                </picture>
                <div className="project-details"></div>
              </div>
            </div>

            <div className="project-panel" data-panel-id="2">
              <div className="project-content">
                <picture>
                  <source
                    media="(max-width: 767.98px)"
                    srcSet="/images/circular2-mobile.png"
                  />
                  <img
                    src="/images/circular2.png"
                    alt="Trimatrik — creative project by Cressida"
                    loading="lazy"
                    width={1000}
                    height={1000}
                  />
                </picture>
                <div className="project-details"></div>
              </div>
            </div>

            <div className="project-panel" data-panel-id="3">
              <div className="project-content">
                <picture>
                  <source
                    media="(max-width: 767.98px)"
                    srcSet="/images/circular3-mobile.png"
                  />
                  <img
                    src="/images/circular3.png"
                    alt="Atomomade — creative project by Cressida"
                    loading="lazy"
                    width={1000}
                    height={1000}
                  />
                </picture>
                <div className="project-details"></div>
              </div>
            </div>

            <div className="project-panel" data-panel-id="4">
              <div className="project-content">
                <picture>
                  <source
                    media="(max-width: 767.98px)"
                    srcSet="/images/circular4-mobile.png"
                  />
                  <img
                    src="/images/circular4.png"
                    alt="Spax — creative project by Cressida"
                    loading="lazy"
                    width={1000}
                    height={1000}
                  />
                </picture>
                <div className="project-details"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <RevealEffects />
      <VendorScripts />
    </>
  );
}
