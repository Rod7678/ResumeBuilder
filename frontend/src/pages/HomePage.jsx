import BoxShadow from "../components/UI/BoxShadow";
import siteLogo from "../assets/Logo.png";
import HeroSection from "../components/Sections/HeroSection";

const HomePage = () => {
  return ( 
    <>
      <HeroSection />

      {/* Feature Section */}
      <section className="feature h-100 bg-purple-400 flex items-center justify-center p-12 w-full flex-col">
        <h2 className="text-xl">Feature section</h2>
        <div className="grid grid-cols-2 gap-6 py-10">
          <div className="image-section">
            <BoxShadow><img src={siteLogo} alt="Resume Feature section" className="h-50 "/></BoxShadow>
          </div>
          <div className="flex flex-row text-start fetures-section">
            <h3>Hna</h3>
            <p>AHUSIN</p>
          </div>
        </div>

      </section>

      {/* Template Section */}
      {/* - in next time after creating templates i can make an list of array of object and then apply map for listing */}
      <section className="templates h-100 bg-neutral-400 flex items-center justify-center p-12 w-full flex-col">
        <h2 className="text-xl">Template Section</h2>
        <div className="grid grid-cols-4 gap-4">
          <BoxShadow className="h-20 p-10" >a</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
        </div>
      </section>

      {/* FUture section */}
      <section className="future h-100 bg-blue-400 flex items-center justify-center p-12 w-full">
        <h2 className="text-xl">future section</h2>
      </section>

    </>
  );
};

export default HomePage;
