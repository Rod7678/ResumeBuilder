import { useMutation } from "@tanstack/react-query";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "./Input.jsx";

const EducationForm = ({ onSelect }) => {
  // const {mutate} = useMutation({
  //   mutationFn:
  // });
  return (
    <FormDiv title="Education" onSend={onSelect}>
      <Input id="degree" name="degree" label="Degree" type="text" />
      <Input
        id="fieldOfStudy"
        name="fieldOfStudy"
        label="Field Of Study"
        type="text"
      />
      <Input
        id="instituteName"
        name="instituteName"
        label="Institute Name"
        type="text"
      />
      <div className="control-row">
        <Input id="startDate" name="startDate" label="Start Date" type="date" />
        <Input id="endDate" name="endDate" label="End Date" type="date" />
      </div>
      <Input
        id="schlocation"
        name="schlocation"
        label="Location Of Institute"
        type="text"
      />
      <Input id="grade" name="grade" label="Grade" type="text" />
      <Button>Done</Button>
    </FormDiv>
  );
};

export default EducationForm;
