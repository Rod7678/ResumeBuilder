import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { useState } from "react";
import { queryClient, SaveUserProfessionalData } from "../../utils/http.js";
import { useMutation } from "@tanstack/react-query";

export default function ProfessionForm({ onSelect }) {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState("NO");
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveUserProfessionalData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });
  function handleFormSubmit(event) {
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    event.preventDefault();
    mutate(data);
    onSelect();
  }
  const handleCurrentlyWorking = (event) => {
    setIsCurrentlyWorking(event.target.value);
  };

  // let content;

  // if(isPending){
  //   content = <p>Form submitting</p>
  // }
  // if(isError){
  //   content = <p>{error.info}</p>
  // }
  // if(data){
  //   content =
  // }

  return (
    <>
      <FormDiv title={"Add Professional Experience"} onSend={handleFormSubmit}>
        <Input id="jobrole" name="jobrole" label="job role" type="text" placeholder="eg. Frontend Developer"/>
        <Input
          id="joiningDate"
          name="joiningDate"
          label="Enter your joining date"
          type="date"
          placeholder="eg. 01/01/2024"
        />
        {isCurrentlyWorking === "NO" ? (
          <div className="radio-button text-start">
            <p className="text-zinc-700 text-[16px] text-start font-medium py-2">currently working</p>
            <input
              type="radio"
              value="NO"
              onChange={handleCurrentlyWorking}
              name="currentlyWorking"
              checked={isCurrentlyWorking === "NO"}
              id="wokingYes"
            />
            <label className="text-zinc-700 text-[16px] text-start font-medium py-2" htmlFor="wokingYes">Yes</label>
            <input
              type="radio"
              value="YES"
              onChange={handleCurrentlyWorking}
              name="currentlyWorking"
              checked={isCurrentlyWorking === "YES"}
              id="wokingNo"
            />
            <label className="text-zinc-700 text-[16px] text-start font-medium py-2" htmlFor="wokingNo">No</label>
          </div>
        ) : (
          <Input
            id="leavingDate"
            name="leavingDate"
            label="Enter your last day of working"
            type="date"
          />
        )}
        <Input
          id="jobLocation"
          name="jobLocation"
          label="Company Location"
          type="text"
        />
        <div className="radio-button text-start">
          <p className="text-zinc-700 text-[16px] text-start font-medium py-2">choose working type</p>
          <input type="radio" value="WFH" name="typeOfWork" id="wfh" />
          <label className="text-zinc-700 text-[16px] text-start font-medium py-2" htmlFor="wfh">Work from home</label>
          <input type="radio" value="WFO" name="typeOfWork" id="wfo" />
          <label className="text-zinc-700 text-[16px] text-start font-medium py-2" htmlFor="wfo">Work from office</label>
        </div>
        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button>Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
}
