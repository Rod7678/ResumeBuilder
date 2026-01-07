import { useState } from "react";
import UserForm from "./UserForm.jsx";
import ProfessionForm from "./ProfessionForm.jsx";
import EducationForm from "./EducationForm.jsx";
import Language from "./Language.jsx";

const handleSubmit = (submittedData, updateFormInputState, updateFormState) => {
  const fd = new FormData(submittedData);
  const formdata = Object.fromEntries(fd.entries());
  updateFormInputState((prevData) => ({
    ...prevData,
    ...formdata,
  }));
  if (formdata.experience === "yes") {
    updateFormState(() => "prof");
  }else if(formdata.experience === 'lan'){
    updateFormState(() => "lan");
  }
  updateFormState(() => "edu");
};

const Main = () => {
  const [inputData, setInputData] = useState({});
  const [isProfForm, setIsProfForm] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    handleSubmit(event.target, setInputData, setIsProfForm);
  }

  console.log(inputData);
  // console.log(isProfForm);

  let content = <UserForm onSelect={handleFormSubmit} />;

  if (isProfForm === "prof") {
    content = <ProfessionForm onSelect={handleFormSubmit} />;
  } else if (isProfForm === "edu") {
    content = <EducationForm onSelect={handleFormSubmit} />;
  }else if( isProfForm === "lan"){
    content = <Language onSelect={handleFormSubmit}/>;
  }

  return <>{content}</>;
};

export default Main;
