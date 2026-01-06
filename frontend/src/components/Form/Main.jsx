import { useMemo, useState } from "react";
import UserForm from "./UserForm";
import ProfessionForm from "./ProfessionForm";

export default function Main() {
  const [inputData, setInputData] = useState([]);
  const [isProfForm, setIsProForm] = useState(false);

  function handlePersonalSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formdata = Object.fromEntries(fd.entries());
    setInputData((prevData) => [
      {
        ...prevData,
        ...formdata,
      },
    ]);
    // event.target.reset()
    // console.log(inputData);
    // navigate("/professinalForm");
    setIsProForm(true);
  }

  function handleProfessionalSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formdata = Object.fromEntries(fd.entries());
    setInputData((prevData) => [
      {
        ...prevData,
        ...formdata,
      },
    ]);
    setIsProForm(true);
    navigate("/professinalForm");
  }
  const formDetail = useMemo(() => {
    inputData;
  }, []);
  console.log(inputData);
  console.log(formDetail);

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
