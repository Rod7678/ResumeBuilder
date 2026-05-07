import { useMutation, useQuery } from "@tanstack/react-query";
import FormDiv from "../UI/FormDiv";
import {
  fetchLatestResume,
  queryClient,
  saveProjectDetails,
  UpdateProjectDetails,
} from "../../utils/http";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import { useEffect, useState } from "react";
import { useFormData } from "../../hooks/useFormData.js";
import { useUser } from "../../context/UserContext.jsx";

const ProjectForm = ({ onSelect }) => {
  const initialState = {
    projectTitle: "",
    description: "",
    technologies: "",
    projectLink: "",
    startDate: "",
    endDate: "",
  };

  const { entryId } = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveProjectDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const { mutate: updateProject } = useMutation({
    mutationFn: ({ data, entryId }) =>
      UpdateProjectDetails({ data, id: entryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const { data: projectsData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  let projects = null;
  if (entryId != null) {
    projects = projectsData?.projects?.find((p) => p.id === entryId) || null;
  } else {
    projects = projectsData?.projects?.[0] || null;
  }

  const {
    formData,
    handleSubmit: handleFormSubmit,
    handleChange: handleInputChange,
    setFormValues,
  } = useFormData({
    initialState,
    onSubmit: (payload) => {
      if (projects?.id) {
        updateProject({data: payload, entryId: projects.id});
      } else {
        mutate(payload);
      }
      onSelect();
    },
  });

  useEffect(() => {
    if (projects) {
      setFormValues({
        projectTitle: projects.project_title || "",
        description: projects.description || "",
        technologies: projects.technologies || "",
        projectLink: projects.project_link || "",
        startDate: projects.start_date || "",
        endDate: projects.end_date || "",
      });
      return;
    }
  }, [projects]);

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
          value={formData.projectLink}
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
