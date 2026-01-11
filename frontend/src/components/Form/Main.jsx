import { useState } from "react";
import UserForm from "./UserForm.jsx";
import ProfessionForm from "./ProfessionForm.jsx";
import EducationForm from "./EducationForm.jsx";
import Language from "./Language.jsx";
import ContentList from "../ContentList.jsx";

const handleSubmit = (submittedData, updateFormInputState) => {
  const fd = new FormData(submittedData);
  const formdata = Object.fromEntries(fd.entries());
  updateFormInputState((prevData) => ({
    ...prevData,
    ...formdata,
  }));
};

const Main = ({ data, addingContent }) => {
  const [inputData, setInputData] = useState({});
  const [isEdit, setIsEdit] = useState(!addingContent);

  function handleFormSubmit(event) {
    event.preventDefault();
    handleSubmit(event.target, setInputData);
    setIsEdit(false);
  }

  console.log(inputData);
  // console.log(isProfForm);

  let content;
  if(isEdit && data.length>0){
    switch (data[0]) {
      case "Professional Experience":
        content = <ProfessionForm onSelect={handleFormSubmit} />;
        break;
      case "Education":
        content = <EducationForm onSelect={handleFormSubmit} />;
        break;
      case "Languages":
        content = <Language onSelect={handleFormSubmit} />;
        break;
  
      default:
        content = <ContentList data={data}/>;
        break;
    }
  }
  else{
    content = <ContentList data={data}/>;
  }
  

  return <>{content}</>;
};

export default Main;
