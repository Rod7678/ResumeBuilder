import BoxShadow from "../UI/BoxShadow";
import Button from "../UI/Button";
import resume1 from "/resumeImg1.avif";

const HeroSection = () => {
  const imageArray = [
    { id: 1, imgSrc: resume1, className: "mt-0" },
    { id: 2, imgSrc: resume1, className: "mt-40" },
    { id: 3, imgSrc: resume1, className: "mt-60" },
    { id: 4, imgSrc: resume1, className: "mt-40" },
    { id: 5, imgSrc: resume1, className: "mt-0" },
  ];
  return (
    <>
      <section className="hero h-fit bg-neutral-400 flex flex-col items-center justify-center p-12 w-full">
        <h1>Hero section</h1>
        <p>
          SubTitle Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Soluta eius velit, hic nostrum similique, recusandae voluptates,
          adipisci libero aut eveniet consectetur alias unde vel. Fugit dolorum
          ipsum natus nobis nulla!
        </p>
        <div className="pt-10 flex flex-row gap-4 w-full justify-center">
          <Button className="btn-hal py-3 px-6">Get Started</Button>
          <Button className="btn-txt">Templates</Button>
        </div>
        <div className="heroSection-temps" >
          <ul className="grid grid-cols-5 gap-2">
            {imageArray.map((image) => (
              <div key={image.id} className={`img-grid ${image.className}`}>
                <BoxShadow>
                  <img src={image.imgSrc} alt="Resume1" />
                </BoxShadow>
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
