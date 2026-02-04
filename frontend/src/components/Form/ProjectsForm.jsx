import { useMutation } from "@tanstack/react-query";
import FormDiv from "../UI/FormDiv";
import { queryClient, saveProjectDetails } from "../../utils/http";
import Input from "../UI/Input.jsx";
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
          placeholder="eg. Resume Builder"
          />
        <Input
          id="description"
          name="description"
          label="Project Description"
          type="textarea"
          placeholder="eg. Build to showcase my skills ..."
          />
        <Input
          id="technologies"
          name="technologies"
          label="Technologies used"
          type="text"
          placeholder="eg. React.js, Tailwind"
        />
        <div className="control-row">
          <Input
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            placeholder="eg. 01/01/2026"
            />
          <Input id="endDate" name="endDate" label="End Date" type="date" placeholder="eg. 02/02/2026"/>
        </div>
        <Input
          id="projectLink"
          name="projectLink"
          label="Add Link of project"
          type="url"
          placeholder="eg. http://resumeBuilder.com"
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
