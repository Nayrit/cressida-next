export default function HeroText() {
  return (
    <div className="text-container">
      <div className="english-layer">
        <img
          src="/english-text.png"
          alt="Where Technology Meets Art"
          className="text-image"
        />
      </div>
      <div className="japanese-layer">
        <img
          src="/japanese-text.png"
          alt=""
          className="text-image"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
