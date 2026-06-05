import BoxShadow from "../components/UI/BoxShadow";

const HomePage = () => {
  return ( 
    <>
      <section className="hero h-100 bg-neutral-400 flex items-center justify-center p-12 w-full">
        <h1>Hero section</h1>
      </section>
      <section className="feature h-100 bg-purple-400 flex items-center justify-center p-12 w-full">
        <h2 className="text-xl">Feature section</h2>
      </section>
      <section className="future h-100 bg-blue-400 flex items-center justify-center p-12 w-full">
        <h2 className="text-xl">future section</h2>
      </section>
      <section className="templates h-100 bg-neutral-400 flex items-center justify-center p-12 w-full flex-col">
        <h2 className="text-xl">Template Section</h2>
        <div className="grid grid-cols-4 gap-4">
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
          <BoxShadow></BoxShadow>
        </div>
      </section>
    </>
  );
};

export default HomePage;
