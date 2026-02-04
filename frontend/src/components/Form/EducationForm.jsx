import { useMutation } from "@tanstack/react-query";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "./Input.jsx";
import { queryClient, SaveEducationDetails } from "../../utils/http.js";

const EducationForm = ({ onSelect }) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    mutate(data);
    onSelect();
  };
  return (
    <FormDiv title="Education" onSend={handleFormSubmit}>
      <Input
        id="degree"
        name="degree"
        label="Degree"
        type="text"
        placeholder="eg. Master of Science"
      />
      <Input
        id="fieldOfStudy"
        name="fieldOfStudy"
        label="Field Of Study"
        type="text"
        placeholder="eg. Computer Science"
      />
      <Input
        id="instituteName"
        name="instituteName"
        label="Institute Name"
        type="text"
        placeholder="eg. Oxford University"
      />
      <div className="control-row">
        <Input
          id="startDate"
          name="startDate"
          label="Start Date"
          type="date"
          placeholder="eg. 2022"
        />
        <Input
          id="endDate"
          name="endDate"
          label="End Date"
          type="date"
          placeholder="eg. 2024"
        />
      </div>
      <Input
        id="schlocation"
        name="schlocation"
        label="Location Of Institute"
        type="text"
        placeholder="eg. India"
      />
      <Input
        id="grade"
        name="grade"
        label="Grade"
        type="text"
        placeholder="eg. A"
      />
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button>Done</Button>}
      {isError && (
        <p> {error.info?.message || "there is error in submitting form"}</p>
      )}
    </FormDiv>
  );
};

export default EducationForm;
