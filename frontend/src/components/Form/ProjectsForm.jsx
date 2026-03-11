import { useMutation, useQuery } from "@tanstack/react-query";
import FormDiv from "../UI/FormDiv";
import {
  fetchLatestResume,
  queryClient,
  saveProjectDetails,
  UpdateEducationDetails,
} from "../../utils/http";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { useEffect, useState } from "react";

const ProjectForm = ({ onSelect }) => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    technologies: "",
    projectLink: "",
    startDate: "",
    endDate: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveProjectDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      // navigate('/users');
    },
  });

  const { mutate: updateProject } = useMutation({
    mutationFn: UpdateEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });

  const { data: projectsData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  const projects = projectsData?.projects?.[0] || [];
  useEffect(() => {
    if (projects.length > 0) {
      setFormData({
        projectTitle: projects.project_title,
        description: projects.description,
        technologies: projects.technologies,
        projectLink: projects.project_link,
        startDate: normalizeDate(projects.start_date),
        endDate: normalizeDate(projects.end_date),
      });
      return;
    }
  }, [projects]);

  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      startDate: normalizeDate(formData.startDate),
      endDate: normalizeDate(formData.endDate),
    };
    if (projects.length > 0) {
      updateProject(payload);
    } else {
      mutate(data);
    }
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
          value={formData.projectTitle}
          onChange={handleInputChange}
          placeholder="eg. Resume Builder"
        />
        <Input
          id="description"
          name="description"
          label="Project Description"
          type="textarea"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="eg. Build to showcase my skills ..."
        />
        <Input
          id="technologies"
          name="technologies"
          label="Technologies used"
          type="text"
          value={formData.technologies}
          onChange={handleInputChange}
          placeholder="eg. React.js, Tailwind"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="startDate"
            name="startDate"
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            placeholder="eg. 01/01/2026"
          />
          <Input
            id="endDate"
            name="endDate"
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            placeholder="eg. 02/02/2026"
          />
        </div>
        <Input
          id="projectLink"
          name="projectLink"
          label="Add Link of project"
          type="url"
          onChange={handleInputChange}
          placeholder="eg. http://resumeBuilder.com"
        />

        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button className="mt-4">Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
};

export default ProjectForm;
