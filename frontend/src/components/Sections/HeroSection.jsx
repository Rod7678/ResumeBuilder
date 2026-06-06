import BoxShadow from "../UI/BoxShadow";
import Button from "../UI/Button";
import resume1 from "/resumeImg1.avif";

const HeroSection = () => {
    const imageArray = [
        {id: 1,imgSrc : resume1},
        {id: 2,imgSrc : resume1},
        {id: 3,imgSrc : resume1},
        {id: 4,imgSrc : resume1},
        {id: 5,imgSrc : resume1},
        {id: 6,imgSrc : resume1},
        {id: 7,imgSrc : resume1},
        {id: 8,imgSrc : resume1},
        {id: 9,imgSrc : resume1},
        {id: 10,imgSrc : resume1},
    ];
  return (
    <>
      <section className="hero h-100 bg-neutral-400 flex items-center justify-center p-12 w-full">
        <h1>Hero section</h1>
        <p>
          SubTitle Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Soluta eius velit, hic nostrum similique, recusandae voluptates,
          adipisci libero aut eveniet consectetur alias unde vel. Fugit dolorum
          ipsum natus nobis nulla!
        </p>
        <div className="pt-10 flex flex-row gap-4 justify-center">
          <Button>Get Started</Button>
          <Button>Templates</Button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <ul>{imageArray.map((image)=>{<div key={image.id} className="img-grid1">
            <BoxShadow>
              <img src={image.imgSrc} alt="Resume1" />
            </BoxShadow>
          </div>})}</ul>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
