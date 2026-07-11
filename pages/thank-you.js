import { useEffect } from "react";
import SEO from "../components/SEO";

export default function ThankYouPage() {
  useEffect(() => {
    document.body.classList.add("thank-you-page", "get-started-page");
    document.body.style.cursor = "auto";
    return () => {
      document.body.classList.remove("thank-you-page", "get-started-page");
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <SEO
        title="Thank You"
        description="Thanks for submitting your project details to Cressida. We'll review your information and get back to you shortly."
        path="/thank-you/"
        noindex
      />

      <main id="main" className="wizard-shell">
        <div className="thank-you-message">
          <h1>Thank You!</h1>
          <p>
            Your project details have been submitted successfully. We&apos;ll
            review your information and get back to you shortly.
          </p>
          <a href="/">Return to Home Page</a>
        </div>
      </main>

      <style jsx global>{`
        .thank-you-message {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          min-height: 100vh;
          padding: 2rem;
          background: #000;
          color: #fff;
        }
        .thank-you-message h1 {
          font-family: "Outfit", system-ui, -apple-system, Segoe UI, Roboto,
            Arial, sans-serif;
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #fff;
        }
        .thank-you-message p {
          max-width: 48rem;
          font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto,
            Arial, sans-serif;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: #c7c7c7;
        }
        .thank-you-message a {
          display: inline-block;
          padding: 0.9rem 1.2rem;
          border-radius: 999px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-family: "Inter", system-ui, -apple-system, Segoe UI, Roboto,
            Arial, sans-serif;
          font-weight: 600;
        }
        .thank-you-message a:hover {
          opacity: 0.9;
        }
      `}</style>
    </>
  );
}
