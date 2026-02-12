import Input from "../UI/Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { queryClient, saveUserDetail } from "../../utils/http.js";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext.jsx";

export default function UserForm({ onSelect }) {
  const {user, updateUser} = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveUserDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      // navigate('/users');
    },
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    mutate(data);
    updateUser(data);
    onSelect();
  }
 

  return (
    <FormDiv title={"Edit personal details"} onSend={handleFormSubmit}>
      <Input id="fullname" name="full_name" label="Full name" type="text" placeholder="eg. Rohit Sharma" required/>
      <Input id="title" name="title" label="Professional title" type="text" placeholder="eg. Software Developer" required/>
      <Input id="email" name="email" label="Enter your email" type="email" placeholder="eg. rohit@example.com" required/>
      <Input
        id="phone"
        name="phone"
        label="Enter your phone"
        type="phone"
        placeholder ="eg. 0123456789"
        minLength={10}
        maxLength={10}
        required
      />
      <Input id="location" name="location" label="Location" type="text" placeholder="eg. A-30, A-block, New York Street, Mumbai-01, India" required/>
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button className="mt-5">Done</Button>}
      {isError && <p> {error.info?.message || "there is error in submitting form"}</p>}
    </FormDiv>
  );
}
