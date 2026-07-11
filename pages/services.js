import { useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import HeroText from "../components/HeroText";
import RevealEffects from "../components/RevealEffects";
import SEO, { organizationJsonLd, webPageJsonLd } from "../components/SEO";
import SiteChrome from "../components/SiteChrome";
import VendorScripts from "../components/VendorScripts";

const TITLE = "Services";
const DESCRIPTION =
  "Explore Cressida services: branding, content & creative, SaaS solutions, and marketing & growth — where technology meets art.";

export default function ServicesPage() {
  useEffect(() => {
    document.body.classList.add("services-page-colors");
    return () => document.body.classList.remove("services-page-colors");
  }, []);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/services/"
        jsonLd={[
          organizationJsonLd,
          webPageJsonLd({
            title: `${TITLE} | Cressida`,
            description: DESCRIPTION,
            path: "/services/",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Cressida Services",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Branding",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Content & Creative",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "SaaS Solutions",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "Marketing & Growth",
              },
            ],
          },
        ]}
      />

      <SiteChrome />
      <GradientBackground />

      <main id="main" className="main-content-wrapper">
        <section className="hero-section" aria-labelledby="services-heading">
          <h1 id="services-heading" className="visually-hidden">
            Cressida Services
          </h1>
          <HeroText />
          <RevealEffects />
        </section>

        <section className="svc-intro">
          <aside className="sticky-label" aria-hidden="true">
            <span>SERVICES</span>
          </aside>
          <div className="svc-intro__in">
            <h2 className="intro-lede">
              We help brands be their most inspiring selves.
              <br />
              Own their quirks – their edge – their culture.
              <br />
              Help them be confidently attractive. At home,
              <br />
              and abroad.
            </h2>
          </div>
        </section>

        <section className="vision">
          <aside className="sticky-label" aria-hidden="true">
            <span>OUR VISION</span>
          </aside>
          <div className="vision__in">
            <div className="vision-steps">
              <div className="vision-step reveal-right">
                <div className="step-meta">
                  <span className="vision-n">01</span>
                  <h3 className="vision-title">IMMERSE</h3>
                </div>
                <p className="vision-copy">
                  Our goal is to fully understand each client’s business, audience,
                  and environment. With interviews, on-site observation, and
                  competitive analysis, we build a deep understanding before we
                  create. Every brief is informed with the why of products we deliver.
                </p>
              </div>

              <div className="vision-step reveal-right">
                <div className="step-meta">
                  <span className="vision-n">02</span>
                  <h3 className="vision-title">ARCHITECT</h3>
                </div>
                <p className="vision-copy">
                  Our planning process turns research into decision frameworks to keep
                  teams focused. We map journeys, define KPIs, and translate this
                  into sprints. The blueprint is shared so the work lands well before
                  code ships.
                </p>
              </div>

              <div className="vision-step reveal-right">
                <div className="step-meta">
                  <span className="vision-n">03</span>
                  <h3 className="vision-title">EXECUTE</h3>
                </div>
                <p className="vision-copy">
                  Our designers and engineers bring concepts to market with craft. We
                  prototype, test, refine, and launch—staying aligned with creative
                  intent and business goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="section-break" aria-hidden="true"></div>

        <section className="svc-matrix" aria-labelledby="svc-matrix-heading">
          <div className="svc-matrix__in">
            <h2 id="svc-matrix-heading" className="visually-hidden">
              Our Services
            </h2>

            <div className="svc-row">
              <h3 className="svc-h underline-anim">Branding</h3>
              <div className="svc-col">
                <h4 className="svc-sub">Visual identity design</h4>
                <ul className="svc-list">
                  <li>logo</li>
                  <li>color</li>
                  <li>palette</li>
                  <li>typography</li>
                </ul>
                <ul className="svc-list strong">
                  <li>Brand messaging</li>
                  <li>product design</li>
                </ul>
              </div>
            </div>

            <div className="svc-row">
              <h3 className="svc-h underline-anim">Content &amp; Creative</h3>
              <div className="svc-col">
                <ul className="svc-list strong">
                  <li>Copywriting</li>
                  <li>Storytelling</li>
                  <li>Video production</li>
                  <li>Motion Graphics</li>
                  <li>3D modeling</li>
                  <li>Animation</li>
                  <li>Infographics</li>
                  <li>Data visualization</li>
                  <li>Interactive web experiences</li>
                </ul>
              </div>
            </div>

            <div className="svc-row">
              <h3 className="svc-h underline-anim">SaaS Solutions</h3>
              <div className="svc-col two">
                <ul className="svc-list labeled">
                  <li>
                    <strong>HRM</strong>
                    <span>Human Resource Management systems</span>
                  </li>
                  <li>
                    <strong>LMS</strong>
                    <span>Learning Management Systems</span>
                  </li>
                  <li>
                    <strong>DMS</strong>
                    <span>Document Management Systems</span>
                  </li>
                  <li>
                    <strong>IMS</strong>
                    <span>Inventory Management Systems</span>
                  </li>
                  <li>
                    <strong>AMS</strong>
                    <span>Accounting &amp; Finance Management Software</span>
                  </li>
                  <li>
                    <strong>E-commerce Platforms</strong>
                    <span>Custom online store solutions</span>
                  </li>
                  <li>
                    <strong>Workflow Automation Tools</strong>
                    <span>Task &amp; process automation</span>
                  </li>
                  <li>
                    <strong>Booking &amp; Reservation Systems</strong>
                    <span>Hospitality, venues, appointments</span>
                  </li>
                  <li>
                    <strong>Marketing Automation Tools</strong>
                    <span>Email, SMS, and funnel automation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="svc-row svc-row--last">
              <h3 className="svc-h underline-anim">Marketing &amp; Growth</h3>
              <div className="svc-col">
                <ul className="svc-list strong">
                  <li>Website design &amp; development</li>
                  <li>Social media branding &amp; management</li>
                  <li>
                    Paid advertising campaigns{" "}
                    <span className="light">Google, Meta</span>
                  </li>
                  <li>Email marketing automation</li>
                </ul>
              </div>
              <span className="diag" aria-hidden="true"></span>
            </div>
          </div>
        </section>

        <section className="svc-cta">
          <div className="svc-cta__in">
            <a href="/contact/" className="cta-btn">
              CONNECT NOW
            </a>
          </div>
        </section>
      </main>

      <VendorScripts
        extra={[{ src: "/services.js", init: "initServices" }]}
      />
    </>
  );
}
