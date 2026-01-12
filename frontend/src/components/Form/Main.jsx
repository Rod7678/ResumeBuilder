import { useEffect, useState } from "react";
import UserForm from "./UserForm.jsx";
import ProfessionForm from "./ProfessionForm.jsx";
import EducationForm from "./EducationForm.jsx";
import Language from "./Language.jsx";
import ContentList from "../ContentList.jsx";
import { queryClient, saveUserDetail } from "../../utils/http.js";
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router";

// const extractedForm = (data, updateFormInputState) => {
//   updateFormInputState((prevData) => ({
//     ...prevData,
//     ...data,
//   }));
// };

const Main = ({ data, addingContent }) => {
  // const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(data?.[0]);
  const [isEdit, setIsEdit] = useState(false);
  const { mutate, isPending, isError, error } = useMutation({
      mutationFn: saveUserDetail,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']})
        // navigate('/users');
      }
    })

  useEffect(()=>{
    setIsEdit(!addingContent);
    setSelectedType(data?.[0])
  },[addingContent,data]);


  function handleFormSubmit(event) {
    const fd = new FormData(event.target);
  const data = Object.fromEntries(fd.entries());
    event.preventDefault();
    mutate(data)
    // extractedForm(data, setInputData);
    setIsEdit(false);
  }



  
  const handleEdit = (editType) => {
    console.log(editType);
    
    setIsEdit(true);
    setSelectedType(editType)
  };
  let content = null;
  console.log(selectedType);
  
  switch (selectedType) {
    case "Professional Experience":
      content = <ProfessionForm onSelect={handleFormSubmit} />;
      break;
    case "Education":
      content = <EducationForm onSelect={handleFormSubmit} />;
      break;
    case "Languages":
      content = <Language onSelect={handleFormSubmit} />;
      break;
    case "User":
      content = <UserForm onSelect={handleFormSubmit} />;
      break;
    default:
      content = <UserForm onSelect={handleFormSubmit} />;
      break;
  }

  return (
    <>
      {isEdit ? content : <ContentList data={data} type={selectedType} onEdit={handleEdit} />}
    </>
  );
};

export default Main;
