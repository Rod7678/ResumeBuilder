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
} from "../../utils/http";
import { useUser } from "../../context/UserContext";
import Button from "../UI/Button";

const Skills = ({ onSelect }) => {
  const initialState = {
    skill: "",
    skillInfo: "",
    proficiencyLevel: "basic",
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
    isError,
    isPending,
    error,
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
    handleSubmit: handleFormSubmit,
    handleChange: handleInputChange,
    setFormValues,
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
        skill: skill.skill || "",
        skillInfo: skill.skillInfo || "",
        proficiencyLevel: skill.proficiencyLevel || "basic",
      });

      return;
    }
  }, [skill]);

  return (
    <FormDiv title={"Add Your skills"} onSend={handleFormSubmit}>
      <Input
        placeholder="Enter your skill"
        id={"skills"}
        name={"skills"}
        value={formData.skill}
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
        value={formData.proficiencyLevel}
        onChange={handleInputChange}
      >
        <option value="basic" selected>
          Basic
        </option>
        <option value="conversational">Conversational</option>
        <option value="proficient">Proficient</option>
        <option value="fluent">Fluent</option>
        <option value="natBil">Native/Bilingual</option>
      </select>
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button className="mt-4">Done</Button>}
      {isError && (
        <p>
          {error.info?.message || "An error occured during submitting form"}
        </p>
      )}
    </FormDiv>
  );
};

export default Skills;
