import BoxShadow from "../UI/BoxShadow";
import resume1 from "/resumeImg1.avif";

const TemplateSection = () => {
  return (
    <>
    
      {/* - in next time after creating templates i can make an list of array of object and then apply map for listing */}
      <section id="templates" className="templates h-fit bg-neutral-400 flex items-center justify-center p-12 w-full flex-col">
        <h2 className="text-6xl font-medium">Template Section</h2>
        <div className="grid grid-cols-4 py-4 gap-4">
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
          <BoxShadow className="rounded-xl overflow-hidden object-fill"><button className="p-0"><img src={resume1} alt="" /></button></BoxShadow>
        </div>
      </section>
    </>
  );
};

export default TemplateSection;
