import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "../UI/Input.jsx";
import { fetchLatestResume, queryClient, SaveEducationDetails } from "../../utils/http.js";
import { useEffect, useState } from "react";

const EducationForm = ({ onSelect }) => {
  const [formData, setFormData] = useState({
    degree: "",
    fieldOfStudy: "",
    instituteName: "",
    startDate: "",
    endDate: "",
    schlocation: "",
    grade: ""
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });

  const { data: educationData } = useQuery({
    queryKey: ["educationDetails"],
    queryFn: fetchLatestResume,
  });

  const education = educationData?.education || [];

  useEffect(() => {
    if (education.length > 0) {
      setFormData({
        degree: education[0].degree || "",
        fieldOfStudy: education[0].field_of_study || "",
        instituteName: education[0].institute_name || "",
        startDate: education[0].start_date || "",
        endDate: education[0].end_date || "",
        schlocation: education[0].school_location || "",
        grade: education[0].grade || ""
      });
      return;
    }
  }, [education]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("degree", formData.degree);
    fd.append("fieldOfStudy", formData.fieldOfStudy);
    fd.append("instituteName", formData.instituteName);
    fd.append("startDate", formData.startDate);
    fd.append("endDate", formData.endDate);
    fd.append("schlocation", formData.schlocation);
    fd.append("grade", formData.grade);
    mutate(fd);
    onSelect();
  };
  return (
    <FormDiv title="Education" onSend={handleFormSubmit}>
      <Input
        id="degree"
        name="degree"
        value={formData.degree}
        onChange={handleInputChange}
        label="Degree"
        type="text"
        placeholder="eg. Master of Science"
      />
      <Input
        id="fieldOfStudy"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleInputChange}
        label="Field Of Study"
        type="text"
        placeholder="eg. Computer Science"
      />
      <Input
        id="instituteName"
        name="instituteName"
        value={formData.instituteName}
        onChange={handleInputChange}  
        label="Institute Name"
        type="text"
        placeholder="eg. Oxford University"
      />
      <div className="control-row">
        <Input
          id="startDate"
          name="startDate"
          value={formData.startDate} 
          onChange={handleInputChange}
          label="Start Date"
          type="date"
          placeholder="eg. 2022"
        />
        <Input
          id="endDate"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          label="End Date"
          type="date"
          placeholder="eg. 2024"
        />
      </div>
      <Input
        id="schlocation"
        name="schlocation"
        value={formData.schlocation}
        onChange={handleInputChange}
        label="Location Of Institute"
        type="text"
        placeholder="eg. India"
      />
      <Input
        id="grade"
        name="grade"
        value={formData.grade}
        onChange={handleInputChange}
        label="Grade"
        type="text"
        placeholder="eg. A"
      />
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button>Done</Button>}
      {isError && (
        <p> {error.info?.message || "there is error in submitting form"}</p>
      )}
    </FormDiv>
  );
};

export default EducationForm;
