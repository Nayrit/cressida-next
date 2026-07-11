import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 992);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
  }, [router.asPath]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "";
  };

  return (
    <>
      <header className="header-container">
        <a href="/" className="logo">
          <img src="/cressida.png" alt="Cressida logo" />
        </a>

        <button
          className="mobile-menu-toggle"
          aria-expanded={isOpen}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>

        <div className="navbar" aria-label="Primary">
          <div
            className={`nav-container ${isOpen ? "active" : ""}`}
            id="primary-nav"
            hidden={isMobile ? !isOpen : false}
          >
            <div className="nav-column">
              <a href="/" className="nav-link">
                Home
              </a>
            </div>
            <div className="nav-column">
              <a href="/services/" className="nav-link">
                Services
              </a>
            </div>
            <div className="nav-column">
              <a href="/team/" className="nav-link">
                Team
              </a>
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .header-container {
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          padding: 10px;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .logo {
          padding: 10px;
          margin-left: 10px;
          z-index: 1001;
        }

        .logo img {
          width: 200px;
          height: auto;
          transition: width 0.3s ease;
          display: block;
        }

        .navbar {
          position: absolute;
          width: 100%;
          left: 0;
          display: flex;
          justify-content: center;
          padding: 15px 20px;
          pointer-events: none;
        }

        .nav-container {
          display: flex;
          gap: 200px;
          pointer-events: auto;
        }

        .nav-column {
          display: flex;
          gap: 15px;
        }

        .nav-link {
          font-family: "Satoshi-Light", sans-serif;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          font-size: 15px;
          transition: all 0.3s ease;
          text-align: center;
          display: inline-block;
        }

        .nav-link:hover {
          text-decoration: underline dotted;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
          z-index: 1100;
        }

        @media (max-width: 1400px) {
          .nav-container {
            gap: 100px;
          }
        }

        @media (max-width: 1200px) {
          .nav-container {
            gap: 80px;
          }
        }

        @media (max-width: 991.98px) {
          .header-container {
            display: block;
            align-items: center;
          }

          .logo {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            z-index: 1001;
          }

          .logo img {
            width: 160px;
          }

          .mobile-menu-toggle {
            display: block;
            position: absolute;
            top: 40px;
            left: 20px;
          }

          .navbar {
            position: static;
          }

          .nav-container {
            display: none;
          }

          .nav-container.active {
            display: flex;
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 1050;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 30px;
          }

          .nav-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
          }

          .nav-link {
            font-size: 24px;
          }
        }

        @media (max-width: 768px) {
          .logo img {
            width: 150px;
          }
        }
      `}</style>
    </>
  );
}
