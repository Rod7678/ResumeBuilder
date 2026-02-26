import Input from "../UI/Input.jsx";
import "./Form.css";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { fetchLatestUser, queryClient, saveUserDetail } from "../../utils/http.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext.jsx";
import { useEffect, useState } from "react";

export default function UserForm({ onSelect }) {
  const { user, updateUser } = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: saveUserDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      // navigate('/users');
    },
  });

  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: fetchLatestUser,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    proTitle: "",
    email: "",
    phone: "",
    location: "",
  });

  useEffect(()=> {
    if(userData) {
      setFormData({
        fullName: userData.full_name,
        proTitle: userData.pro_title,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
      });
      return;
    }
  }, [userData])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function handleFormSubmit() {
    const fd = new FormData();
    fd.append("fullName", formData.fullName);
    fd.append("proTitle", formData.proTitle);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("location", formData.location);
    mutate(fd);
    updateUser(formData);
    onSelect();
  }

  return (
    <FormDiv title={"Edit personal details"} onSend={handleFormSubmit}>
      <Input
        id="fullname"
        name="fullName"
        label="Full name"
        type="text"
        value={formData.fullName}
        placeholder="eg. Rohit Sharma"
        required
        onChange={handleChange}
      />
      <Input
        id="proTitle"
        name="proTitle"
        label="Professional title"
        value={formData.proTitle}
        type="text"
        placeholder="eg. Software Developer"
        required
        onChange={handleChange}
      />
      <Input
        id="email"
        name="email"
        value={formData.email}
        label="Enter your email"
        type="email"
        placeholder="eg. rohit@example.com"
        required
        onChange={handleChange}
      />
      <Input
        id="phone"
        name="phone"
        type="tel"
        inputMode="numeric"
        value={formData.phone}
        maxLength={10}
        placeholder="eg. 9876543210"
        label="Enter your Number"
        required
        onChange={handleChange}
      />
      <Input
        id="location"
        name="location"
        label="Location"
        value={formData.location}
        type="text"
        placeholder="eg. A-30, A-block, New York Street, Mumbai-01, India"
        required
        onChange={handleChange}
      />
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button className="mt-5">Done</Button>}
      {isError && (
        <p> {error.info?.message || "there is error in submitting form"}</p>
      )}
    </FormDiv>
  );
}
