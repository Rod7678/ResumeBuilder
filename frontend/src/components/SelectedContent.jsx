import { useUser } from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../utils/http";
import AccordianContent from "./UI/AccordianContent";

const SELECTED_FORM = [
  {
    id: 1,
    Title: "Professional Experience",
  },
  {
    id: 2,
    Title: "Education",
  },
  {
    id: 3,
    Title: "Languages",
  },
  {
    id: 4,
    Title: "Projects",
  },
  {
    id: 3,
    Title: "Certificates",
  },
];

const SelectedContent = ({ onEdit }) => {
  const { addedForms: data , handleDelete} = useUser();
  const uniqueSections = [...new Set(data)];

  const { data: addedFormsArray } = useQuery({
    queryKey: ["Forms"],
    queryFn: fetchLatestResume,
  });

  const addedForms = addedFormsArray || {};
  
  const entriesArray = (type) => {
    let dataEntry;
    
    switch (type) {
      case "Professional Experience":
        dataEntry = addedForms.professional = addedForms.professional || [];
        break;
      case "Education":
        dataEntry = addedForms.education = addedForms.education || [];
        break;
      case "Languages":
        dataEntry = addedForms.language = addedForms.language || [];
        break;
      case "Projects":
        dataEntry = addedForms.projects = addedForms.projects || [];
        break;
      default:
        dataEntry = [];
        break;
    }
    return dataEntry;
  }; 
  // console.log("added forms: ", addedForms);
  return (
    <ul>
      {uniqueSections.map((section) => {
        const type = SELECTED_FORM.find((t) => t.Title === section);
        if (!type) return null;
        return (
          <li key={type.id} className="py-4">
            {/* <div className="user-detail bg-white p-8 rounded-xl text-start">
              <div className="content-title flex justify-between items-center">
                <h3 className="text-zinc-950 font-bold text-2xl">
                  {entriesArray(type.Title).length}
                </h3>
                <button
                  className="bg-gray-950 rounded-full h-10 w-10 m-0"
                  onClick={() => onEdit(type.Title)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </div> */}
            {/* {entriesArray(type.Title).length > 0 &&
            <AccordianContent enteries={entriesArray(type.Title)} />} */}
            <AccordianContent enteries={entriesArray(type.Title)} title={type.Title} onEdit={onEdit} onDelete={handleDelete} />
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedContent;
