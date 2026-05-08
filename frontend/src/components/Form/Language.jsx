import { useNavigate } from "react-router-dom";
import FormDiv from "../UI/FormDiv";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button";
import {
  fetchLatestResume,
  SaveLanguageDetails,
  UpdateLanguageDetails,
} from "../../utils/http.js";
import { useUser } from "../../context/UserContext.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormData } from "../../hooks/useFormData.js";
import { useEffect } from "react";

const Language = ({ onSelect }) => {
  const initialState = {
    lan: "",
    additionalInfo: "",
    languageLevel: "basic",
  };
  const { entryId } = useUser();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: SaveLanguageDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const {
    mutate: updateLanguage,
    isPending: updateIsPending,
    isError: updateIsError,
    error: updateError,
  } = useMutation({
    mutationFn: ({ data, entryId }) =>
      UpdateLanguageDetails({ data, id: entryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestResume"] });
      onSelect();
    },
  });

  const { data: languageData } = useQuery({
    queryKey: ["latestResume"],
    queryFn: fetchLatestResume,
  });
  let language = null;
  if (entryId != null) {
    language =
      languageData?.languages?.find((lan) => lan.id === entryId) || null;
  } else {
    language = languageData?.languages?.[0] || null;
  }

  const {
    formData,
    setFormValues,
    handleSubmit: handleFormSubmit,
    handleChange: handleInputChange,
  } = useFormData({
    initialState,
    onSubmit: (payload) => {
      if (language) {
        updateLanguage({ data: payload, entryId: language.id });
      } else {
        mutate(payload);
      }
    },
  });

  useEffect(() => {
    if (language) {
      setFormValues({
        lan: language.lan || "",
        additionalInfo: language.additional_info || "",
        languageLevel: language.language_level || "basic",
      });
    }
    return;
  }, [language, setFormValues]);
  return (
    <FormDiv title="Languages" onSend={handleFormSubmit}>
      <Input
        id="lan"
        name="lan"
        value={formData.lan}
        onChange={handleInputChange}
        label="Language"
        type="text"
        placeholder="eg. Marathi"
      />
      <Input
        name="additionalInfo"
        id="addInfo"
        value={formData.additionalInfo}
        onChange={handleInputChange}
        label="Additional Information"
        type="textarea"
        placeholder="eg. I have proficient experience in marathi"
      />
      <label htmlFor="languageLevel">Language Level</label>
      <select name="languageLevel" id="languageLevel">
        <option value="basic" selected>
          Basic
        </option>
        <option value="conversational">Conversational</option>
        <option value="proficient">Proficient</option>
        <option value="fluent">Fluent</option>
        <option value="natBil">Native/Bilingual</option>
      </select>
      {isPending && <p>Form is submitting please wait</p>}
      {!isPending && <Button>Done</Button>}
      {isError && (
        <p> {error.info?.message || "there is error in submitting form"}</p>
      )}
    </FormDiv>
  );
};

export default Language;
