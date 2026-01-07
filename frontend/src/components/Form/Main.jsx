import {  useState } from "react";
import UserForm from "./UserForm";
import ProfessionForm from "./ProfessionForm";

const handleSubmit = (submittedData, updateState)=>{
  const fd = new FormData(submittedData);
  const formdata = Object.fromEntries(fd.entries());
  updateState((prevData) =>({
    ...prevData,
    ...formdata
  }))
}

const Main = ()=> {
  const [inputData, setInputData] = useState({});
  const [isProfForm, setIsProForm] = useState(false);

  function handlePersonalSubmit(event) {
    event.preventDefault();
    const haveExp = new FormData(event.target).get('experience');
    handleSubmit(event.target, setInputData);
    setIsProForm(() => haveExp);
  }

  function handleProfessionalSubmit(event) {
    event.preventDefault();
    handleSubmit(event.target, setInputData);
    setIsProForm(false);
  }
 
  // console.log(inputData);
  // console.log(isProfForm);

  return (
    <>
      {isProfForm ? (
        <ProfessionForm onSelect={handleProfessionalSubmit} />
      ) : (
        <UserForm onSelect={handlePersonalSubmit} />
      )}
    </>
  );
}


export default Main;