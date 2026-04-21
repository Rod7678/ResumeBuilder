const AccordianContent = ({ arry }) => {
  const A = [...arry];
  return (
    <ul>
      <h1>hii</h1>
      {console.log(typeof(A))}
      {A.map((section, index) => {
        <li className="py-4 z-10">
              <h3 className="text-zinc-950 font-bold text-2xl">
                {section.degree && console.log("section: ", section.degree)}
              </h3>
        </li>;
      })}
    </ul>
  );
};

export default AccordianContent;
