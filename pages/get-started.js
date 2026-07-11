import { useEffect, useState } from "react";
import SEO, { organizationJsonLd, webPageJsonLd } from "../components/SEO";

const SERVICES = [
  "Branding",
  "Content & Creative",
  "SaaS Solutions",
  "Marketing & Growth",
];

const TIMELINES = [
  { value: "> 3 months", label: "More than 3 Months" },
  { value: "1–3 months", label: "1–3 Months" },
  { value: "< 1 month", label: "Less than 1 Month" },
  { value: "Not sure", label: "Not sure" },
];

const TITLE = "Start a Project";
const DESCRIPTION =
  "Tell Cressida about your project in a few quick steps — branding, creative, SaaS, or growth. We respond quickly.";

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [timeline, setTimeline] = useState("> 3 months");
  const [budget, setBudget] = useState(800);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("get-started-page");
    document.body.style.cursor = "auto";
    document.body.style.removeProperty("--color-bg1");
    document.body.style.removeProperty("--color-bg2");
    document.body.style.removeProperty("--color1");
    document.body.style.removeProperty("--color2");
    document.body.style.removeProperty("--color3");
    document.body.style.removeProperty("--color4");
    document.body.style.removeProperty("--color5");
    document.body.style.removeProperty("--color-interactive");
    return () => {
      document.body.classList.remove("get-started-page");
      document.body.style.cursor = "";
    };
  }, []);

  const toggleService = (value) => {
    setServices((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const goNext = (e) => {
    e.preventDefault();
    setStep((s) => Math.min(3, s + 1));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      services,
      timeline,
      budget,
      name,
      email,
      phone,
    };

    try {
      localStorage.setItem("cressida_project_lead", JSON.stringify(payload));
    } catch (_) {
      /* ignore */
    }

    window.location.href = "/thank-you/";
  };

  return (
    <>
      <SEO
        title={TITLE}
        description={DESCRIPTION}
        path="/get-started/"
        jsonLd={[
          organizationJsonLd,
          webPageJsonLd({
            title: `${TITLE} | Cressida`,
            description: DESCRIPTION,
            path: "/get-started/",
          }),
        ]}
      />

      <a href="/contact-2/" className="close-x" aria-label="Close">
        <span aria-hidden="true">×</span>
      </a>

      <main id="main" className="wizard-shell">
        <form className="wizard-form" onSubmit={onSubmit} aria-label="Project intake form">
          {step === 1 && (
            <section className="wizard" data-step="1" aria-labelledby="s1h">
              <div className="wizard-in">
                <h1 id="s1h" className="h-title">
                  Start a Project
                </h1>
                <p className="h-sub">
                  Tell us what you need. It takes less than a minute.
                </p>

                <div className="service-grid">
                  {SERVICES.map((value) => (
                    <label key={value} className="service">
                      <input
                        type="checkbox"
                        name="services"
                        value={value}
                        checked={services.includes(value)}
                        onChange={() => toggleService(value)}
                      />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>

                <div className="wizard-cta">
                  <button className="btn-next" type="button" onClick={goNext}>
                    Next <span className="arrow">→</span>
                  </button>
                  <span className="step-indicator">1 / 3</span>
                </div>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="wizard" data-step="2" aria-labelledby="s2h">
              <div className="wizard-in">
                <div className="twocol">
                  <div className="col">
                    <h2 id="s2h" className="h-eyebrow">
                      Do you have any timeline in mind? (if any)
                    </h2>

                    <div className="choice-list">
                      {TIMELINES.map((t) => (
                        <label key={t.value} className="choice">
                          <input
                            type="radio"
                            name="timeline"
                            value={t.value}
                            checked={timeline === t.value}
                            onChange={() => setTimeline(t.value)}
                          />
                          <span className="opt">{t.label}</span>
                        </label>
                      ))}
                    </div>

                    <div className="wizard-cta">
                      <button className="btn-next" type="button" onClick={goNext}>
                        Next <span className="arrow">→</span>
                      </button>
                      <span className="step-indicator">2 / 3</span>
                    </div>
                  </div>

                  <div className="col">
                    <h2 className="h-eyebrow">Budget</h2>
                    <div className="budget-wrap">
                      <input
                        type="range"
                        min="100"
                        max="2000"
                        step="50"
                        value={budget}
                        id="budgetRange"
                        name="budget"
                        onChange={(e) => setBudget(Number(e.target.value))}
                      />
                      <div className="budget-row">
                        <span className="budget-label" id="budgetLabel">
                          ${budget}
                        </span>
                        <span className="budget-max">$2000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="wizard" data-step="3" aria-labelledby="s3h">
              <div className="wizard-in">
                <div className="twocol">
                  <div className="col">
                    <h2 id="s3h" className="h-eyebrow">
                      Almost there — tell us who you are
                    </h2>
                    <p className="h-sub">We’ll respond quickly. No spam.</p>
                  </div>

                  <div className="col">
                    <div className="form-lines">
                      <label className="line">
                        <span className="prompt">My name is</span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </label>

                      <label className="line">
                        <span className="prompt">My email is</span>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>

                      <label className="line">
                        <span className="prompt">Or call me at</span>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="wizard-cta">
                      <button
                        className="btn-next"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Finish <span className="arrow">→</span>
                          </>
                        )}
                      </button>
                      <span className="step-indicator">3 / 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </form>
      </main>
    </>
  );
}
