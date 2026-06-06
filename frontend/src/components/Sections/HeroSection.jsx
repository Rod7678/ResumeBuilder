import Button from "../UI/Button";

const HeroSection = () => {
  return (
    <>
      <section className="hero h-100 bg-neutral-400 flex items-center justify-center p-12 w-full">
        <h1>Hero section</h1>
        <p>SubTitle
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta eius velit, hic nostrum similique, recusandae voluptates, adipisci libero aut eveniet consectetur alias unde vel. Fugit dolorum ipsum natus nobis nulla!
        </p>
        <div className="pt-10 flex flex-row gap-4 justify-center">
            <Button>Get Started</Button>
            <Button>Templates</Button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
