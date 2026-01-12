import { useEffect, useState } from "react";
import UserForm from "./UserForm.jsx";
import ProfessionForm from "./ProfessionForm.jsx";
import EducationForm from "./EducationForm.jsx";
import Language from "./Language.jsx";
import ContentList from "../ContentList.jsx";
import { queryClient, saveUserDetail } from "../../utils/http.js";
import { useMutation } from '@tanstack/react-query';

const extractedForm = (data, updateFormInputState) => {
  updateFormInputState((prevData) => ({
    ...prevData,
    ...data,
  }));
};

const Main = ({ data, addingContent }) => {
  const [inputData, setInputData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { mutate, isPending, isError, error } = useMutation({
      mutationFn: saveUserDetail,
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['users']})
        navigate('/users');
      }
    })

  useEffect(()=>{
    setIsEdit(!addingContent);
  },[addingContent]);

  // console.log(addingContent);

  function handleFormSubmit(event) {
    const fd = new FormData(event.target);
  const data = Object.fromEntries(fd.entries());
    event.preventDefault();
    mutate(data)
    extractedForm(data, setInputData);
    setIsEdit(false);
  }



  const handleEdit = () => {
    setIsEdit(true);
  };
  // console.log(inputData);
  // console.log(isProfForm);
  // console.log(data[0]);
  const selectedType = data?.[0];
  let content = null;
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

    default:
      content = <UserForm onSelect={handleFormSubmit} />;
      break;
  }

  return (
    <>
      {isEdit ? content : <ContentList data={inputData} type={selectedType} onEdit={handleEdit} />}
    </>
  );
};

export default Main;
