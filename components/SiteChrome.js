export default function SiteChrome({ showIkigai = true }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {showIkigai && (
        <>
          <div className="ikigai-fixed">
            <div className="ikigai-left">We Believe in “IKIGAI”</div>
            <div className="ikigai-right">私たちは生き甲斐を信じています</div>
          </div>

          <div className="tagline-top-right">
            AI-driven
            <br />
            creative agency
          </div>
        </>
      )}
    </>
  );
}
