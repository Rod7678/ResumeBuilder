import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input";
import {
  fetchLatestResume,
  queryClient,
  SaveCertificateDetails,
  UpdateCertificateDetails,
} from "../../utils/http";
import { useFormData } from "../../hooks/useFormData";
import { useEffect } from "react";
import Button from "../UI/Button";

const CertificatesForm = ({ onSelect }) => {
  const initialState = {
    certificateName: "",
    organizationName: "",
    issuingDate: "",
    expiringDate: "",
  };

  const { entryId } = useUser();
  const { data: certificatesData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });

  const {
    mutate: saveData,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: SaveCertificateDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const {
    mutate: updateData,
    isError: updateIsError,
    isPending: updateIsPending,
    error: updateError,
  } = useMutation({
    mutationFn: ({ data, entryId }) =>
      UpdateCertificateDetails({ data, id: entryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  let certificatesArr = null;
  if (entryId != null) {
    certificatesArr =
      certificatesData?.certificate?.find((c) => c.id === entryId) || null;
  } else {
    certificatesArr = null;
  }

  const {
    formData,
    setFormValues,
    handleChange: handleInputChange,
    handleSubmit: handleFormSubmit,
  } = useFormData({
    initialState,
    onSubmit: (payload) => {
      if (certificatesArr?.id) {
        updateData({ data: payload, entryId: certificatesArr.id });
      } else {
        saveData(payload);
      }
    },
  });

  useEffect(() => {
    if (certificatesArr) {
      setFormValues({
        certificateName: certificatesArr.certificate_name || "",
        organizationName: certificatesArr.issuing_organization || "",
        issuingDate: certificatesArr.issue_date || "",
        expiringDate: certificatesArr.expiration_date || "",
      });
    } else {
      setFormValues(initialState);
    }
  }, [certificatesArr]);
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
        {isPending && <p>Form is submitting please wait</p>}
        {!isPending && <Button className="mt-4">Done</Button>}
        {isError && (
          <p> {error.info?.message || "there is error in submitting form"}</p>
        )}
      </FormDiv>
    </>
  );
};

export default CertificatesForm;
