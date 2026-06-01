import { useEffect, useState } from "react";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input";
import { useFormData } from "../../hooks/useFormData";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchLatestResume,
  queryClient,
  SaveSkillsDetails,
  UpdateSkillsDetails,
} from "../../utils/http.js";
import { useUser } from "../../context/UserContext";
import Button from "../UI/Button";

const Skills = ({ onSelect }) => {
  const initialState = {
    skills: "",
    skillInfo: "",
    proficiencyLevel: "Beginner",
  };

  const { entryId } = useUser();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: SaveSkillsDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const {
    mutate: updateData,
    isError: updateIsError,
    isPending: updateIsPending,
    error: updateError,
  } = useMutation({
    mutationFn: ({ data, entryId }) =>
      UpdateSkillsDetails({ data, id: entryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const { data: skillData } = useQuery({
    queryFn: fetchLatestResume,
    queryKey: ["latestResume"],
  });

  let skill = null;
  if (entryId != null) {
    skill = skillData?.skills?.find((s) => s.id === entryId) || null;
  } else {
    skill = skillData?.skills?.[0] || null;
  }
  const {
    formData,
    setFormValues,
    handleSubmit: handleFormSubmit,
    handleChange: handleInputChange,
  } = useFormData({
    initialState,
    onSubmit: (payload) => {
      if (skill) {
        updateData({ data: payload, entryId: skill.id });
      } else {
        mutate(payload);
      }
    },
  });

  useEffect(() => {
    if (skill) {
      setFormValues({
        skills: skill.skill_name || "",
        skillInfo: skill.description || "",
        proficiencyLevel: skill.proficiency || "Beginner",
      });

      return;
    }
  }, [skill]);

  console.log("formData :", formData.skills);
  return (
    <>
      <FormDiv title={"Add Your skills"} onSend={handleFormSubmit}>
        <Input
          placeholder="Enter your skill"
          id={"skills"}
          name={"skills"}
          value={formData.skills}
          onChange={handleInputChange}
          type={"text"}
        />
        <Input
          placeholder="Information about your skill"
          id={"skillInfo"}
          name={"skillInfo"}
          value={formData.skillInfo}
          onChange={handleInputChange}
          type={"textarea"}
        />
        <label htmlFor="proficiencyLevel">Proficiency Level</label>
        <select
          name="proficiencyLevel"
          id="proficiencyLevel"
          defaultValue={formData.proficiencyLevel}
          onChange={handleInputChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button className="mt-4">Done</Button>}
        {isError && (
          <p>
            {error.info?.message || "An error occured during submitting form"}
          </p>
        )}
      </FormDiv>
    </>
  );
};

export default Skills;
