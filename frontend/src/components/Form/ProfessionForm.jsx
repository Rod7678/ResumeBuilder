import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { useEffect, useState } from "react";
import {
  fetchLatestResume,
  queryClient,
  SaveUserProfessionalData,
} from "../../utils/http.js";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function ProfessionForm({ onSelect }) {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState("NO");
  const [formData, setFormData] = useState({
    companyName: "",
    jobrole: "",
    joiningDate: "",
    leavingDate: "" || null,
    currently_working: isCurrentlyWorking || "NO",
    jobLocation: "",
    workType: "",
    workings: "",
  });
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveUserProfessionalData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
    },
  });

  const { data: professionalData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  const professional = professionalData?.professional || [];

  useEffect(() => {
    if (professional) {
      setFormData({
        companyName: professional[0].company_name || "",
        jobrole: professional[0].job_role || "",
        joiningDate: professional[0].joining_date || "",
        leavingDate: professional[0].leaving_date || null,
        currently_working: professional[0].currently_working || "NO",
        jobLocation: professional[0].job_location || "",
        workType: professional[0].work_type || "",
        workings: professional[0].workings || "",
      });
      return;
    }
  }, [professional]);

  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  function handleFormSubmit(event) {
    const fd = new FormData();
    fd.append("companyName", formData.companyName);
    fd.append("job_role", formData.jobrole);
    fd.append("joining_date", normalizeDate(formData.joiningDate));
    fd.append("leaving_date", normalizeDate(formData.leavingDate));
    fd.append("job_location", formData.jobLocation);
    fd.append("work_type", formData.workType);
    fd.append("workings", formData.workings);
    event.preventDefault();
    mutate(fd);
    onSelect();
  }
  const handleCurrentlyWorking = (event) => {
    setIsCurrentlyWorking(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <FormDiv title={"Add Professional Experience"} onSend={handleFormSubmit}>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          label="Company Name"
          type="text"
          placeholder="eg. Google"
        />
        <Input
          id="jobrole"
          name="jobrole"
          value={formData.jobrole}
          onChange={handleInputChange}
          label="Job Role"
          type="text"
          placeholder="eg. Frontend Developer"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="joiningDate"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleInputChange}
            label="Enter your joining date"
            type="date"
            placeholder="eg. 01/01/2024"
          />
          {isCurrentlyWorking === "NO" ? (
            <div className="radio-button text-start">
              <p className="text-zinc-700 text-[16px] text-start font-medium py-2">
                currently working
              </p>
              <input
                type="radio"
                value="NO"
                onChange={handleCurrentlyWorking}
                name="currentlyWorking"
                checked={isCurrentlyWorking === "NO"}
                id="wokingYes"
              />
              <label
                className="text-zinc-700 text-[16px] text-start font-medium py-2"
                htmlFor="wokingYes"
              >
                Yes
              </label>
              <input
                type="radio"
                value="YES"
                onChange={handleCurrentlyWorking}
                name="currentlyWorking"
                checked={isCurrentlyWorking === "YES"}
                id="wokingNo"
              />
              <label
                className="text-zinc-700 text-[16px] text-start font-medium py-2"
                htmlFor="wokingNo"
              >
                No
              </label>
            </div>
          ) : (
            <Input
              id="leavingDate"
              name="leavingDate"
              value={formData.leavingDate}
              onChange={handleInputChange}
              label="Enter your last day of working"
              type="date"
            />
          )}
        </div>
        <Input
          id="jobLocation"
          name="jobLocation"
          value={formData.jobLocation}
          onChange={handleInputChange}
          label="Company Location"
          type="text"
        />
        <div className="radio-button text-start">
          <p className="text-zinc-700 text-[16px] text-start font-medium py-2">
            choose working type
          </p>
          <input type="radio" value="WFH" name="typeOfWork" id="wfh" />
          <label
            className="text-zinc-700 text-[16px] text-start font-medium py-2"
            htmlFor="wfh"
          >
            Work from home
          </label>
          <input type="radio" value="WFO" name="typeOfWork" id="wfo" />
          <label
            className="text-zinc-700 text-[16px] text-start font-medium py-2"
            htmlFor="wfo"
          >
            Work from office
          </label>
        </div>
        <Input
          id="workingExp"
          name="workingExp"
          value={formData.workings}
          onChange={handleInputChange}
          label="What did you do in this job? Describe your working experience in brief"
          placeholder="Type here"
          type="textarea"
          rows={8}
        />
        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button>Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
}
