import { useState } from "react";

export const useFormData = ({initialState, onSubmit, transform = (data) => data}) => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => {
      let updated = {
        ...prev,
        [name]: type === "checkbox" ? e.target.checked : value || "",
      };
      if (name === "currently_working" && value === "YES") {
        updated.leavingDate = null;
      }
      return updated;
    });
  };

  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const payload = transform({
        ...formData,
        leavingDate: normalizeDate(formData.leavingDate),
        joiningDate: normalizeDate(formData.joiningDate),
        startDate: normalizeDate(formData.startDate),
        endDate: normalizeDate(formData.endDate)
    });
    onSubmit(payload);
  }
  const setFormValues = (data) => {
    setFormData((prev) => ({
        ...prev,                                                                                    
        ...data
    }))
  }
  const resetForm = () => {
    setFormData(initialState);
  }
  return { formData, handleChange, handleSubmit, setFormValues, resetForm };
};
