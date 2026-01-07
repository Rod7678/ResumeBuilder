import Button from "../UI/Button.jsx";
import Input from "./Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { useNavigate } from "react-router";

export default function ProfessionForm({ onSelect }) {
  const navigate = useNavigate();
  return (
    <>
      <FormDiv title={"Add Professional Experience"} onSend={onSelect}>
        <Input id="jobrole" name="jobrole" label="job role" type="text" />
        <Input
          id="proftitle"
          name="proftitle"
          label="Professional title"
          type="text"
        />
        <Input
          id="joiningDate"
          name="joiningDate"
          label="Enter your joining date"
          type="date"
        />
        <Input
          id="jobLocation"
          name="jobLocation"
          label="Company Location"
          type="text"
        />
        <div className="radio-button">
          <p>choose working type</p>
          <input type="radio" value="WFH" name="typeOfWork" id="wfh" />
          <label htmlFor="wfh">Work from home</label>
          <input type="radio" value="WFO" name="typeOfWork" id="wfo" />
          <label htmlFor="wfo">Work from office</label>
        </div>
        <Button>Submit</Button>
      </FormDiv>
    </>
  );
}
