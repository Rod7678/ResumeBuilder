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
const formArray = (type) => {
    let aryData;
    switch (type) {
      case "Professional Experience":
        aryData = addedForms.professional = addedForms.professional || [];
        break;
      case "Education":
        aryData = addedForms.education = addedForms.education || [];
        break;
      case "Languages":
        aryData = addedForms.language = addedForms.language || [];
        break;
      case "Projects":
        aryData = addedForms.projects = addedForms.projects || [];
        break;
      default:
        aryData = [];
        break;
    }
    return aryData;
  }; 
const SelectedContent = ({ onEdit }) => {
  const { addedForms: data } = useUser();
  const uniqueSections = [...new Set(data)];

  const { data: addedFormsArray } = useQuery({
    queryKey: ["Forms"],
    queryFn: fetchLatestResume,
  });

  const addedForms = addedFormsArray || {};
  
  console.log("added forms: ", addedForms);
  return (
    <ul>
      {uniqueSections.map((section) => {
        const type = SELECTED_FORM.find((t) => t.Title === section);
        if (!type) return null;
        return (
          <li key={type.id} className="py-4">
            <div className="user-detail bg-white p-8 rounded-xl text-start">
              <div className="content-title flex justify-between items-center">
                <h3 className="text-zinc-950 font-bold text-2xl">
                  {type.Title} -{console.log(addedForms.professional)}
                  {/* {console.log(formArray(type.Title).length)} */}
                  {formArray(type.Title).length}
                </h3>
                <button
                  className="bg-gray-950 rounded-full h-10 w-10 m-0"
                  onClick={() => onEdit(type.Title)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            {/* <h5>{formArray(type.Title)}</h5> */}
            </div>
            {formArray(type.Title).length > 0 &&
            <AccordianContent arry={formArray(type.Title)} />}
          </li>
        );
      })}
    </ul>
  );
};

export default SelectedContent;
