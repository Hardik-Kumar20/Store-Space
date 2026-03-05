import "../styles/premiumLoader.css";

const PremiumLoader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader"></div>
      <p className="loader-text">Preparing your dashboard...</p>
    </div>
  );
};

export default PremiumLoader;