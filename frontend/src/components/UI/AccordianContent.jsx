import { useState } from "react";

const AccordianContent = ({ title, enteries = [], onEdit }) => {
  const arrayOfContent = [...enteries];
  const [isOpen, setIsOpen] = useState(false);
  const hasEntries = arrayOfContent.length > 0;
  const hasMultipleEntries = arrayOfContent.length > 1;

  const toggleAccordian = () => {
    if (hasMultipleEntries) {
      setIsOpen((prev) => !prev);
    }
  };

  console.log("accordian content: ", arrayOfContent);
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <button
        onClick={toggleAccordian}
        className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-zinc-100 transition"
      >
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
          <p className="text-sm text-zinc-500">
            {arrayOfContent.length} entries
          </p>
        </div>
        {hasMultipleEntries && (
          <span
            className={`ml-2 transition-transform text-zinc-500 ${isOpen ? "rotate-180" : ""}`}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        )}
      </button>

      {hasEntries && !hasMultipleEntries && (
        <div className="px-5 py-4 border-t border-zinc-200 flex justify-between items-center">
          <h3 className="text-zinc-950 font-bold text-2xl">{title}</h3>
          <p className="text-zinc-700">{arrayOfContent[0].job_role}</p>
          <button
            className="bg-gray-950 rounded-full h-10 w-10 m-0"
            onClick={() => onEdit(title)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      )}
      {hasMultipleEntries && isOpen && (
        <ul>
          <h1>hii</h1>
          {arrayOfContent.map((section, index) => {
            return (
              <li className="py-4 z-10">
                <h3 className="text-zinc-950 font-bold text-2xl">
                  {section.degree}
                </h3>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AccordianContent;
