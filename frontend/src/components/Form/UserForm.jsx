import Input from "./Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";

export default function UserForm({ onSelect }) {
  
  return (
    <FormDiv title={"Edit personal details"} onSend={onSelect}>
      <Input id="fullname" name="full_name" label="Full name" type="text" />
      <Input id="title" name="title" label="Professional title" type="text" />
      <Input id="email" name="email" label="Enter your email" type="email" />
      <Input
        id="phone"
        name="phone"
        label="Enter your phone"
        type="phone"
        minLength={10}
        maxLength={10}
      />
      <Input id="location" name="location" label="Location" type="text" />
      <Button>Done</Button>
    </FormDiv>
  );
}
