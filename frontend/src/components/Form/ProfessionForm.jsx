import Button from "../UI/Button.jsx";
import Input from "./Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { useState } from "react";

export default function ProfessionForm({ onSelect }) {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState("NO");
  const handleCurrentlyWorking = (event) => {
    setIsCurrentlyWorking(event.target.value);
  };

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
        {isCurrentlyWorking === "YES" ? (
          <Input
            id="leavingDate"
            name="leavingDate"
            label="Enter your last day of working"
            type="date"
          />
        ) : (
          <div className="radio-button text-start">
            <p className="text-start">currently working</p>
            <input
              type="radio"
              value="YES"
              onChange={handleCurrentlyWorking}
              name="currentlyWorking"
              checked={isCurrentlyWorking === "YES"}
              id="wokingYes"
            />
            <label htmlFor="wokingYes">Yes</label>
            <input
              type="radio"
              value="NO"
              onChange={handleCurrentlyWorking}
              name="currentlyWorking"
              checked={isCurrentlyWorking === "NO"}
              id="wokingNo"
            />
            <label htmlFor="wokingNo">No</label>
          </div>
        )}
        <Input
          id="jobLocation"
          name="jobLocation"
          label="Company Location"
          type="text"
        />
        <div className="radio-button text-start">
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
