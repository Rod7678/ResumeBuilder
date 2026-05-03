import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import FormDiv from "../UI/FormDiv.jsx";
import { useEffect } from "react";
import {
  fetchLatestResume,
  queryClient,
  SaveUserProfessionalData,
  UpdateProfessionalDetails,
} from "../../utils/http.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormData } from "../../hooks/useFormData.js";
import { useUser } from "../../context/UserContext.jsx";

export default function ProfessionForm({ onSelect }) {
  const initialState = {
    companyName: "",
    jobrole: "",
    joiningDate: "",
    leavingDate: null,
    currentlyWorking: "NO",
    jobLocation: "",
    workType: "",
    workings: "",
  };
  
  const {entryId} = useUser();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveUserProfessionalData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const {
    mutate: updateProf,
    isPending: updateIsPending,
    isError: updateIsError,
    error: updateError,
  } = useMutation({
    mutationFn: ({data, entryId}) => UpdateProfessionalDetails({data, id: entryId}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const { data: professionalData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  let professional = null;
  if(entryId != null){
    professional = professionalData?.professional?.find((prof) => prof.id === entryId) || null;
  }else {
    professional = professionalData?.professional?.[0] || null;
  }
  // const professional = professionalData?.professional?.[0] || [];

  const {
    formData,
    setFormValues,
    handleChange: handleInputChange,
    handleSubmit: handleFormSubmit,
  } = useFormData({
    initialState,
    onSubmit: (payload) => {
      if (professional) {
        updateProf({data: payload, entryId: professional.id});
      } else {
        mutate(payload);
      }
    },
  });

  useEffect(() => {
    if (professional) {
      setFormValues({
        companyName: professional.company_name || "",
        jobrole: professional.job_role || "",
        joiningDate: professional.joining_date || null,
        leavingDate: professional.leaving_date || null,
        currentlyWorking: professional.currently_working || "NO",
        jobLocation: professional.job_location || "",
        workType: professional.work_type || "",
        workings: professional.workings || "",
      });

      return;
    }
  }, [professional]);

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
        <p className="text-zinc-700 text-[16px] font-medium py-2">
          Currently working?
        </p>

        <input
          type="radio"
          value="YES"
          name="currentlyWorking"
          checked={formData.currentlyWorking === "YES"}
          onChange={handleInputChange}
        />
        <label className="text-zinc-700 text-[16px] text-start font-medium py-2 mr-2">
          Yes
        </label>

        <input
          type="radio"
          value="NO"
          name="currentlyWorking"
          checked={formData.currentlyWorking === "NO"}
          onChange={handleInputChange}
        />
        <label className="text-zinc-700 text-[16px] text-start font-medium py-2">
          No
        </label>
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
          {formData.currentlyWorking === "NO" && (
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
          <input
            type="radio"
            value="WFH"
            checked={formData.workType === "WFH"}
            onChange={handleInputChange}
            name="typeOfWork"
            id="wfh"
          />
          <label
            className="text-zinc-700 text-[16px] text-start font-medium py-2 mr-2"
            htmlFor="wfh"
          >
            Work from home
          </label>
          <input
            type="radio"
            value="WFO"
            checked={formData.workType === "WFO"}
            onChange={handleInputChange}
            name="typeOfWork"
            id="wfo"
          />
          <label
            className="text-zinc-700 text-[16px] text-start font-medium py-2"
            htmlFor="wfo"
          >
            Work from office
          </label>
        </div>
        <Input
          id="workings"
          name="workings"
          value={formData.workings}
          onChange={handleInputChange}
          label="What did you do in this job? Describe your working experience in brief"
          placeholder="Type here"
          type="textarea"
          rows={8}
        />
        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button className="mt-4">Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
}
