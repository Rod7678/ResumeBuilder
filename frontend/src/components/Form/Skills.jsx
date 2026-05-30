import { useEffect, useState } from "react";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input";
import { useFormData } from "../../hooks/useFormData";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestResume } from "../../utils/http";
import { useUser } from "../../context/UserContext";

const Skills = ({onSelect}) => {
  const initialState = {
    skill: "",
    skillInfo: "",
    proficiencyLevel: "basic",
  };
  
  const {entryId} = useUser();
  
  const {data: skillData} = useQuery({
    queryFn: fetchLatestResume,
    queryKey: ["latestResume"]
  });
  let skill = null;
  if(entryId != null){
    skill = skillData?.skills?.find((s) => s.id === entryId) || null;
  }else{
    skill = skillData?.skills?.[0] || null;
  }
  const {formData, handleSubmit: handleFprmSubmit} = useFormData({initialState, onSubmit: (payload) => {
    if(skill){

    }
  }})
  // useEffect(()=>{

  // }, [])
  return (
    <FormDiv title={"Add Your skills"} onSend={onSelect}>
      <Input
        placeholder="Enter your skill"
        id={"skills"}
        name={"skills"}
        type={"text"}
      />
      <Input
        placeholder="Information about your skill"
        id={"skillInfo"}
        name={"skillInfo"}
        type={"textarea"}
      />
      <label htmlFor="proficiencyLevel">Proficiency Level</label>
      <select name="proficiencyLevel" id="proficiencyLevel">
        <option value="basic" selected>
          Basic
        </option>
        <option value="conversational">Conversational</option>
        <option value="proficient">Proficient</option>
        <option value="fluent">Fluent</option>
        <option value="natBil">Native/Bilingual</option>
      </select>
    </FormDiv>
  );
};


export default Skills;