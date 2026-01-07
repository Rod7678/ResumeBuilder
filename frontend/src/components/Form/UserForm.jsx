import Input from "./Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";

export default function UserForm({ onSelect }) {
  return (
    <FormDiv title={"Edit personal details"} onSend={onSelect}>
      <Input id="fullname" name="fullname" label="Full name" type="text" />
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

      {/* <Input
        id="typeOfWork"
        name="typeOfWork"
        label="Type of working"
        type="radio"
        value="wfh"
      /> */}
      <Input id="location" name="location" label="Location" type="text" />
      <div className="radio-button">
        <p>Do you have any professional Experience ?</p>
        <input
          type="radio"
          value="true"
          required
          name="experience"
          id="expYes"
        />
        <label htmlFor="expYes">Yes</label>
        <input type="radio" value="" required name="experience" id="expNo" />
        <label htmlFor="expNo">No</label>
      </div>
      <Button>Done</Button>
    </FormDiv>
  );
}
