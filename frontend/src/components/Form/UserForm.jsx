import Input from "./Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { queryClient, saveUserDetail } from "../../utils/http.js";
import { useMutation } from "@tanstack/react-query";

export default function UserForm({ onSelect }) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveUserDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // navigate('/users');
    },
  });
  function handleFormSubmit(event) {
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    event.preventDefault();
    mutate(data);
    onSelect();
  }

  return (
    <FormDiv title={"Edit personal details"} onSend={handleFormSubmit}>
      <Input id="fullname" name="full_name" label="Full name" type="text" />
      <Input
        id="title"
        name="title"
        label="Professional title"
        type="text"
      />
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
