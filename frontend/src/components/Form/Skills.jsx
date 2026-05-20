import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input";

const Skills = () => {
  return (
    <FormDiv title={"Add Your skills"} onSend={}>
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
