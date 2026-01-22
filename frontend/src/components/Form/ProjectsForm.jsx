import { useMutation } from "@tanstack/react-query";
import FormDiv from "../UI/FormDiv";
import { queryClient, saveProjectDetails } from "../../utils/http";
import Input from "./Input.jsx";
import Button from "../UI/Button.jsx";

const ProjectForm = ({ onSelect }) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveProjectDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      // navigate('/users');
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
    <>
      <FormDiv title="Add your Work" onSend={handleFormSubmit}>
        <Input
          id="projectTitle"
          name="projectTitle"
          label="Project Title"
          type="text"
        />
        <Input
          id="description"
          name="description"
          label="Project Description"
          type="textarea"
        />
        <Input
          id="technologies"
          name="technologies"
          label="Technologies used"
          type="text"
        />
        <div className="control-row">
          <Input
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
          />
          <Input id="endDate" name="endDate" label="End Date" type="date" />
        </div>
        <Input
          id="projectLink"
          name="projectLink"
          label="Add Link of project"
          type="url"
        />

        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button>Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
};

export default ProjectForm;
