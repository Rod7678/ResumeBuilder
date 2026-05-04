import { useState } from "react";
import { DeleteEducationDetails } from "../../utils/http";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";

const AccordianContent = ({ title, enteries = [], onEdit, onDelete }) => {
  const arrayOfContent = [...enteries];
  const [isOpen, setIsOpen] = useState(false);
  const hasEntries = arrayOfContent.length > 0;
  const hasMultipleEntries = arrayOfContent.length > 1;
  const { handleDelete } = useUser();

  let entryTitle;
  let entrySubtitle;

  switch (title) {
    case "Professional Experience":
      entryTitle = "job_role";
      entrySubtitle = "company_name";
      break;
    case "Education":
      entryTitle = "degree";
      entrySubtitle = "institute_name";
      break;
    case "Languages":
      entryTitle = "language_name";
      entrySubtitle = "proficiency_level";
      break;
    case "Projects":
      entryTitle = "project_name";
      entrySubtitle = "description";
      break;
    default:
      entryTitle = "";
      entrySubtitle = "";
      break;
  }

  const { mutate: deleteMutation } = useMutation({
    mutationFn: ({title, id}) => handleDelete({title, id}),
    onSuccess: () => {
      console.log("Deleted entry successfully");
      // onDelete();
    },
  });
  const toggleAccordian = () => {
    if (hasMultipleEntries) {
      setIsOpen((prev) => !prev);
    }
  };

  // console.log("accordian content: ", arrayOfContent);
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
          <p className="text-zinc-700">{arrayOfContent[0][entryTitle]}</p>
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
          {arrayOfContent.map((section, index) => {
            return (
              <li key={section.id} className="py-4 z-10 border-t border-zinc-200">
                <div className="px-5 py-4  flex justify-between items-center">
                  <div className="flex-col justify-start items-center text-left">
                    <h3 className="text-zinc-950 font-bold text-2xl ">
                      {section[entryTitle]}
                    </h3>
                    <p className="text-zinc-700">{section[entrySubtitle]}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-gray-950 rounded-full h-10 w-10 m-0"
                      // onClick={() => onEdit(title)}
                      onClick={() => onEdit(title, section.id)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      className="bg-red-500 rounded-full h-10 w-10 m-0 hover:bg-red-600 transition hover:text-white"
                      onClick={() => deleteMutation({title, id: section.id})}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AccordianContent;
