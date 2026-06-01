import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input";
import { fetchLatestResume } from "../../utils/http";
import { useFormData } from "../../hooks/useFormData";
import { useEffect } from "react";

const Certificates = ({ onSelect }) => {
  const initialState = {
    certificateName: "",
    organizationName: "",
    issuingDate: "",
    expiringDate: "",
  };

  const { entryId } = useUser();
  const { data: certificatesData } = useQuery({
    queryFn: fetchLatestResume,
    queryKey: ["latestResume"],
  });

//   const {mutate: updateData, isError: updateIsError, isPending: updateIsPending, error: updateError} = useMutation({
//     mutationFn: 
//   });
  let certificates = null;
  if (entryId != null) {
    certificates =
      certificatesData?.certificate?.find((c) => c.id === entryId) || null;
  } else {
    certificates = certificatesData?.certificate?.[0] || null;
  }

  const {
    formData,
    setFormValues,
    handleChange: handleInputChange,
    handleSubmit: handleFormSubmit,
  } = useFormData();

  useEffect(() => {
    if (certificates.length) {
      setFormValues({
        certificateName: certificates.certificate_name || "",
        organizationName: certificates.issuing_organization || "",
        issuingDate: certificates.issue_date || "",
        expiringDate: certificates.expiration_date || "",
      });
    }
  }, [certificates]);
  return (
    <>
      <FormDiv title="Add your Certificates" onSend={handleFormSubmit}>
        <Input
          label="Enter Your certificate Name"
          placeholder="Eg. AI/ML"
          name="certificateName"
          id="certificateName"
          value={formData.certificateName}
          onChange={handleInputChange}
          type="text"
        />
        <Input
          label="Enter Your organization Name"
          placeholder="Eg. Google"
          name="organizationName"
          id="organizationName"
          value={formData.organizationName}
          onChange={handleInputChange}
          type="text"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Eg. 2022"
            name="issuingDate"
            id="issuingDate"
            value={formData.issuingDate}
            onChange={handleInputChange}
            type="date"
            label="Issue Date"
          />
          <Input
            placeholder="Eg. 2024"
            name="expiringDate"
            id="expiringDate"
            value={formData.expiringDate}
            onChange={handleInputChange}
            type="date"
            label="Expire Date"
          />
        </div>
      </FormDiv>
    </>
  );
};

export default Certificates;
