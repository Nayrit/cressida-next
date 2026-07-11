import { useEffect } from "react";
import GradientBackground from "../components/GradientBackground";
import HeroText from "../components/HeroText";
import RevealEffects from "../components/RevealEffects";
import SEO, { organizationJsonLd, webPageJsonLd } from "../components/SEO";
import SiteChrome from "../components/SiteChrome";
import VendorScripts from "../components/VendorScripts";

const TITLE = "Team";
const DESCRIPTION =
  "Meet the Cressida team — designers, marketers, and engineers building brands where technology meets art.";

export default function TeamPage() {
  useEffect(() => {
    document.body.classList.add("has-anim");

    const initTeamAnimations = () => {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        document.querySelectorAll(".member-section").forEach((section, idx) => {
          const wrap = section.querySelector(".member-in");
          if (!wrap) return;
          const nameEl = wrap.querySelector(".member-name");
          const copyBox = wrap.querySelector(".member-copy");
          const copyPs = copyBox ? copyBox.querySelectorAll("p") : [];
          const portrait = wrap.querySelector(".member-portrait");

          window.gsap.set([nameEl, copyBox, portrait], { autoAlpha: 0, y: 18 });

          const tl = window.gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              end: "top 10%",
              toggleActions: "play none none reverse",
            },
          });

          tl.to(nameEl, { autoAlpha: 1, y: 0, duration: 0.5 })
            .to(copyBox, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.25")
            .from(
              copyPs,
              { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.08 },
              "<0.05"
            )
            .to(portrait, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.35");

          const dir = idx % 2 === 0 ? -12 : 12;
          window.gsap.to(portrait, {
            y: dir,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

        const canHover = window.matchMedia(
          "(hover:hover) and (pointer:fine)"
        ).matches;
        if (canHover) {
          document.querySelectorAll(".member-portrait").forEach((card) => {
            const qx = window.gsap.quickTo(card, "rotateY", {
              duration: 0.4,
              ease: "power3.out",
            });
            const qy = window.gsap.quickTo(card, "rotateX", {
              duration: 0.4,
              ease: "power3.out",
            });
            const qt = window.gsap.quickTo(card, "y", {
              duration: 0.4,
              ease: "power3.out",
            });

            const onMove = (e) => {
              const r = card.getBoundingClientRect();
              const cx = e.clientX - r.left;
              const cy = e.clientY - r.top;
              const rx = cy / r.height - 0.5;
              const ry = cx / r.width - 0.5;
              qx(ry * 12);
              qy(rx * -10);
              qt(-2);
            };
            const onLeave = () => {
              qx(0);
              qy(0);
              qt(0);
            };

            card.style.transformPerspective = "800px";
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
          });
        }
      }

      if (window.anime) {
        document.querySelectorAll(".member-name").forEach((h) => {
          if (!h.querySelector(".w")) {
            const words = h.textContent
              .trim()
              .split(" ")
              .map(
                (w) =>
                  `<span class="w" style="display:inline-block; opacity:0;">${w}</span>`
              )
              .join(" ");
            h.innerHTML = words;
          }
        });

        const runNameAnim = (el) => {
          window.anime({
            targets: el.querySelectorAll(".w"),
            translateY: ["0.4em", "0em"],
            opacity: [0, 1],
            easing: "easeOutCubic",
            duration: 600,
            delay: window.anime.stagger(60),
          });
        };

        const first = document.querySelector(".member-section .member-name");
        if (first) runNameAnim(first);

        if (window.ScrollTrigger) {
          document.querySelectorAll(".member-section").forEach((sec) => {
            window.ScrollTrigger.create({
              trigger: sec,
              start: "top 70%",
              once: true,
              onEnter: () => {
                const h = sec.querySelector(".member-name");
                if (h) runNameAnim(h);
              },
            });
          });
        }
      }
    };

    const timer = setTimeout(initTeamAnimations, 250);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("has-anim");
    };
  }, []);

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/team/"
        jsonLd={[
          organizationJsonLd,
          webPageJsonLd({
            title: `${TITLE} | Cressida`,
            description: DESCRIPTION,
            path: "/team/",
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Cressida Team",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Person",
                  name: "Aryan Hassan",
                  jobTitle: "Founder & Designer",
                  worksFor: { "@id": "https://cressida.studio/#organization" },
                  image: "https://cressida.studio/images/team/aryan.jpg",
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Person",
                  name: "Himel",
                  jobTitle: "Marketing",
                  worksFor: { "@id": "https://cressida.studio/#organization" },
                  image: "https://cressida.studio/images/team/Himel.jpg",
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Person",
                  name: "Nayrit",
                  jobTitle: "Engineer",
                  worksFor: { "@id": "https://cressida.studio/#organization" },
                  image: "https://cressida.studio/images/team/nayrit.jpg",
                },
              },
            ],
          },
        ]}
      />

      <SiteChrome />
      <GradientBackground />

      <main id="main" className="main-content-wrapper">
        <section className="hero-section" aria-labelledby="team-heading">
          <h1 id="team-heading" className="visually-hidden">
            Meet the Cressida Team
          </h1>
          <HeroText />
          <RevealEffects />
        </section>

        <section className="member-section">
          <div className="soft-vignette left" aria-hidden="true"></div>
          <div className="member-in">
            <h2 className="member-name">Aryan Hassan</h2>

            <div className="member-copy">
              <p>
                I didn’t set out to build a company—I simply followed my love for
                creativity and design. What began as small projects for friends and
                local businesses slowly grew into something bigger. Along the way, I
                learned that design is more than visuals—it’s about telling stories,
                solving problems, and helping ideas take shape.
              </p>
              <p>
                This company is built on that belief. I approach every project with
                humility, honesty, and care, seeing each collaboration as a chance to
                create something meaningful. I’m still learning, still growing, and
                grateful for every client who trusts me to bring their vision to life.
              </p>
            </div>

            <figure className="member-portrait">
              <img
                src="/images/team/aryan.jpg"
                alt="Aryan Hassan, founder and designer at Cressida"
                width={600}
                height={750}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        <section className="member-section even">
          <div className="soft-vignette right" aria-hidden="true"></div>
          <div className="member-in">
            <h2 className="member-name">Himel</h2>

            <figure className="member-portrait">
              <img
                src="/images/team/Himel.jpg"
                alt="Himel, marketing lead at Cressida"
                width={600}
                height={750}
                loading="lazy"
              />
            </figure>

            <div className="member-copy">
              <p>
                I’ve always been fascinated by how stories connect people. Marketing,
                for me, was never about selling—it was about listening, understanding,
                and finding the right way to share a message that truly resonates. What
                began as small experiments in campaigns and community work grew into a
                passion for building brands that people can trust and relate to.
              </p>
              <p>
                At the heart of my work is empathy. Every strategy I create starts with
                understanding the people we’re speaking to. I believe the best marketing
                is honest, human, and rooted in real connection—and I’m grateful to be
                part of that process.
              </p>
            </div>
          </div>
        </section>

        <section className="member-section">
          <div className="soft-vignette left" aria-hidden="true"></div>
          <div className="member-in">
            <h2 className="member-name">Nayrit</h2>

            <div className="member-copy">
              <p>
                I never planned on becoming a programmer—I just loved solving problems
                and figuring out how things worked. What started with simple curiosity
                and small coding experiments slowly grew into a passion for building
                tools and experiences that actually help people.
              </p>
              <p>
                For me, programming isn&apos;t about complicated code—it&apos;s about
                creating solutions that make life easier and ideas possible. I keep
                learning every day, and I&apos;m grateful to be part of a team where
                design and technology come together to bring meaningful projects to
                life.
              </p>
            </div>

            <figure className="member-portrait">
              <img
                src="/images/team/nayrit.jpg"
                alt="Nayrit, engineer at Cressida"
                width={600}
                height={750}
                loading="lazy"
              />
            </figure>
          </div>
        </section>
      </main>

      <VendorScripts />
    </>
  );
}
