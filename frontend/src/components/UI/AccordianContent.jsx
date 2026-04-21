const AccordianContent = ({ arry }) => {
  console.log("added forms: ", arry);
  return {
    if(arry) {
      <ul>
        {arry.map((section, index) => {
          <li key={section.id} className="py-4">
            <div className=" bg-black p-8 rounded-xl text-start">
              <div className="content-title flex justify-between items-center">
                <h3 className="text-zinc-950 font-bold text-2xl">
                  {section.Title}
                </h3>
                <button
                  className="bg-gray-950 rounded-full h-10 w-10 m-0"
                  // onClick={() => onEdit(section.Title)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div>
          </li>;
        })}
      </ul>;
    },
  };
};

export default AccordianContent;
