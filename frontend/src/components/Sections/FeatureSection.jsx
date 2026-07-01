import BoxShadow from "../UI/BoxShadow.jsx";
import siteLogo from "../../assets/Logo.png";
const FeatureSection = () => {
  return (
    <section
      id="features"
      className="feature h-100 bg-purple-400 flex items-center justify-center p-12 w-full flex-col"
    >
      <h2 className="text-xl">Feature section</h2>
      <div className="grid grid-cols-2 gap-6 py-10">
        <div className="image-section">
          <BoxShadow>
            <img
              src={siteLogo}
              alt="Resume Feature section"
              className="h-50 "
            />
          </BoxShadow>
        </div>
        <div className="flex flex-row text-start fetures-section">
          <h3>Hna</h3>
          <p>AHUSIN</p>
        </div>
      </div>
    </section>
  );
};
export default FeatureSection;
