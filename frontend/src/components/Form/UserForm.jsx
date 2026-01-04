import Input from "./Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import FormDiv from "../UI/FormDiv.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fullname: "",
    proftitle: "",
    email: "",
    phone: "",
    location: " ",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const formdata = Object.fromEntries(fd.entries());
    setInputData(() => ({
      ...formdata,
    }));
    // event.target.reset()
    console.log(inputData);
    navigate("/professinalForm");
  }
  console.log(inputData);

  return (
    <FormDiv title={"Edit personal details"} onSend={handleSubmit}>
      <Input id="fullname" label="Full name" type="text" />
      <Input id="proftitle" label="Professional title" type="text" />
      <Input id="email" label="Enter your email" type="email" />
      <Input
        id="phone"
        label="Enter your phone"
        type="phone"
        minLength={10}
        maxLength={10}
      />
      <Input id="location" label="Location" type="text" />

      <p className="form-actions">
        <Button txtOnly={true}>Reset</Button>
        <Button >Next</Button>
      </p>
    </FormDiv>
  );
}
