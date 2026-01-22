import { useMutation } from "@tanstack/react-query";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "./Input.jsx";
import { queryClient, SaveEducationDetails } from "../../utils/http.js";

const EducationForm = ({ onSelect }) => {
  const {mutate} = useMutation({
    mutationFn: SaveEducationDetails,
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ["latestResume"]});
    }
  });

  const handleFormSubmit = (event) =>{
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    mutate(data);
    onSelect();
  };
  return (
    <FormDiv title="Education" onSend={handleFormSubmit}>
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
