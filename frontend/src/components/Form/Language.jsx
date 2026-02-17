import { useNavigate } from "react-router-dom";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button";
import { SaveEducationDetails } from "../../utils/http.js";

const Language = ({ onSelect }) => {
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
    <FormDiv title="Languages" onSend={handleFormSubmit}>
      <Input
        id="lan"
        name="lan"
        label="Language"
        type="text"
        placeholder="eg. Marathi"
      />
      <Input
        name="additionalInfo"
        id="addInfo"
        type="textarea"
        placeholder="eg. I have proficient experience in marathi"
      />
      <label htmlFor="languageLevel"></label>
      <select name="languageLevel" id="languageLevel">
        <option value="basic">Basic</option>
        <option value="conversational">Conversational</option>
        <option value="proficient">Proficient</option>
        <option value="fluent">Fluent</option>
        <option value="natBil">Native/Bilingual</option>
      </select>
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button>Done</Button>}
      {isError && (
        <p> {error.info?.message || "there is error in submitting form"}</p>
      )}
    </FormDiv>
  );
};

export default Language;
