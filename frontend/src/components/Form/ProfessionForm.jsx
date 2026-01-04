import { useNavigate } from "react-router";
import Button from "../UI/Button.jsx";
import Input from "./Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";

export default function ProfessionForm() {
  const navigate = useNavigate();
  return (
    <>
      <FormDiv title={"Add Proffessional Experience"}>
        <Input id="jobrole" label="job role" type="text" />
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
          <Button txtOnly={true} onClick={() => navigate("../")}>
            Back
          </Button>
          <Button>Submit</Button>
        </p>
      </FormDiv>
    </>
  );
}
