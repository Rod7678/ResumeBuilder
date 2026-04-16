import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../UI/Button.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import Input from "../UI/Input.jsx";
import {
  fetchLatestResume,
  queryClient,
  SaveEducationDetails,
  UpdateEducationDetails,
} from "../../utils/http.js";
import { useEffect, useState } from "react";

const EducationForm = ({ onSelect }) => {
  const [formData, setFormData] = useState({
    degree: "",
    fieldOfStudy: "",
    instituteName: "",
    startDate: "",
    endDate: "",
    schlocation: "",
    grade: "",
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });
  const {
    mutate: updateData,
    isPending: updateIsPending,
    isError: updateIsError,
    error: updateError,
  } = useMutation({
    mutationFn: UpdateEducationDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });

  const { data: educationData } = useQuery({
    queryKey: ["educationDetails"],
    queryFn: fetchLatestResume,
  });


  const education = educationData?.education?.[0] || [];

  useEffect(() => {
    if (education) {
      setFormData({
        degree: education.degree || "",
        fieldOfStudy: education.field_of_study || "",
        instituteName: education.institute_name || "",
        startDate: education.start_date || "",
        endDate: education.end_date || "",
        schlocation: education.school_location || "",
        grade: education.grade || "",
      });
      return;
    }
  }, [education]);

  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    
    event.preventDefault();
    const payload = {
      ...formData,
      startDate: normalizeDate(formData.startDate),
      endDate: normalizeDate(formData.endDate)
    }
    if (education.length > 0) {
      // updateData({id: education.id, ...payload});
      updateData(payload);
    } else {
      mutate(payload);
    }
    onSelect();
  };
  return (
    <>
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
        <div className="grid grid-cols-2 gap-4">
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
        {!isPending && <Button className="mt-4">Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </> 
  );
};

export default EducationForm;
