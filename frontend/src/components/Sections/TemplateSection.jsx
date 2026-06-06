import BoxShadow from "../UI/BoxShadow";

const TemplateSection = () => {
  return (
    <>
    
      {/* - in next time after creating templates i can make an list of array of object and then apply map for listing */}
      <section className="templates h-100 bg-neutral-400 flex items-center justify-center p-12 w-full flex-col">
        <h2 className="text-xl">Template Section</h2>
        <div className="grid grid-cols-4 gap-4">
          <BoxShadow className="h-20 p-10">a</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
          <BoxShadow className="h-20 p-10">bd</BoxShadow>
        </div>
      </section>
    </>
  );
};

export default TemplateSection;
