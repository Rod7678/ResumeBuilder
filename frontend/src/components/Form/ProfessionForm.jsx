import Button from "../UI/Button.jsx";
import Input from "./Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";

export default function ProfessionForm({onSelect}) {
  return (
    <>
      <FormDiv title={"Add Proffessional Experience"} onSend={onSelect}>
        <Input id="jobrole" label="job role" type="text" />
        <Input id="proftitle" label="Professional title" type="text" />
        <Input id="joiningDate" label="Enter your joining date" type="date" />
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
