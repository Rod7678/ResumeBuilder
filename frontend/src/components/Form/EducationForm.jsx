import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "./Input.jsx";

const EducationForm = ({ onSelect }) => {
  return (
    <FormDiv title="Education" onSend={onSelect}>
      <Input id="degree" name="degree" label="Degree" type="text" />
      <Input id="school" name="school" label="School" type="text" />
      {/* <Input id="email" name="email" label="Enter your email" type="email" /> */}
      <div className="control-row">
        <Input id="startDate" name="startDate" label="Start Date" type="date" />
        <Input id="endDate" name="endDate" label="End Date" type="date" />
        <Input
          id="schlocation"
          name="schlocation"
          label="Location"
          type="text"
        />
      </div>
      <Input
        id="description"
        name="description"
        label="Description"
        type="textarea"
      />
      
      <Button>Done</Button>
    </FormDiv>
  );
};

export default EducationForm;
