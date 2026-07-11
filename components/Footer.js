import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(2025);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bf-footer">
        <div className="bf-container">
          <div className="bf-left">
            <div className="bf-logo">
              <img src="/cressida.png" alt="Cressida" />
            </div>

            <h2 className="bf-tagline">
              Where Technology <br />
              Meets Art.
            </h2>

            <div className="bf-socials">
              <a
                href="https://www.facebook.com/profile.php?id=61583176097530"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/cressida.studio_/?hl=en"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="bf-right">
            <div className="bf-content-stack">
              <div className="bf-group">
                <h4 className="bf-label">Get In Touch</h4>
                <a
                  href="mailto:contact@cressida.studio"
                  className="bf-link highlight"
                >
                  contact@cressida.studio
                </a>
                <a href="tel:+8801306032829" className="bf-link">
                  (+880) 130 603 2829
                </a>
              </div>

              <div className="bf-group">
                <h4 className="bf-label">Explore</h4>
                <nav className="bf-nav-row">
                  <a href="/">Home</a>
                  <a href="/services/">Services</a>
                  <a href="/team/">Team</a>
                  <a href="/contact/">Contact</a>
                </nav>
              </div>

              <div className="bf-group bottom">
                <p className="bf-address" itemProp="address">
                  House 12, Road 5, Block B
                  <br />
                  Gulshan1, Dhaka, Bangladesh 1212
                </p>
                <p className="bf-copyright">© {year} Cressida.</p>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
}
