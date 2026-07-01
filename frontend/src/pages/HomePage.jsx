
import HeroSection from "../components/Sections/HeroSection";
import TemplateSection from "../components/Sections/TemplateSection";
import FeatureSection from "../components/Sections/FeatureSection";

const HomePage = () => {
  return ( 
    <>
      <HeroSection />

      {/* Feature Section */}
      <FeatureSection />
      {/* Template Section */}
     <TemplateSection />

      {/* FUture section */}
      <section className="future h-100 bg-blue-400 flex items-center justify-center p-12 w-full">
        <h2 className="text-xl">future section</h2>
      </section>

    </>
  );
};

export default HomePage;
