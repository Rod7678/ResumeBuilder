import { useNavigate } from "react-router-dom";
import FormDiv from "../UI/FormDiv";
import Input from "./Input";

const Language = ({ onSelect }) => {
    const navigate = useNavigate();
  return (
    <FormDiv title="Languages" onSend={onSelect}>
      <Input id="lan" name="lan" label="Language" type="text" />
      <textarea name="additionalInfo" id="addInfo"></textarea>
      <label htmlFor="languageLevel"></label>
      <select name="languageLevel" id="languageLevel">
        <option value="basic">Basic</option>
        <option value="conversational">Conversational</option>
        <option value="proficient">Proficient</option>
        <option value="fluent">Fluent</option>
        <option value="natBil">Native/Bilingual</option>
      </select>
      <Button onSelect={()=>navigate('../language')}>Done</Button>
    </FormDiv>
  );
};

export default Language;
