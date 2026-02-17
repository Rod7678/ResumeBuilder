import { useEffect, useState } from "react";
import UserForm from "./Form/UserForm.jsx";
import ProfessionForm from "./Form/ProfessionForm.jsx";
import EducationForm from "./Form/EducationForm.jsx";
import Language from "./Form/Language.jsx";
import ContentList from "./ContentList.jsx";
import ProjectForm from "./Form/ProjectsForm.jsx";
import { queryClient, saveUserDetail } from "../utils/http.js";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext.jsx";

// const extractedForm = (data, updateFormInputState) => {
//   updateFormInputState((prevData) => ({
//     ...prevData,
//     ...data,
//   }));
// };

const Main = ({ addingContent }) => {
  // const navigate = useNavigate();
  const { activeForm, setActiveForm, addedForms: data , isEditing: isEdit, setIsEditing: setIsEdit } = useUser();

  const selectedType = activeForm || data?.[0] || "User";
 

  

  function handleFormSubmit() {
    setIsEdit(false);
  }

  const handleEdit = (editType) => {
    setActiveForm(editType);
    setIsEdit(true);
  };

  let content = null;

  console.log("selected type: ", selectedType);
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
    case "Projects":
      content = <ProjectForm onSelect={handleFormSubmit} />;
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
      {isEdit ? (
        content
      ) : (
        <ContentList data={data} type={selectedType} onEdit={handleEdit} />
      )}
    </>
  );
};

export default Main;
