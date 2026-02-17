import { useState } from "react";
import Main from "../Main.jsx";
import FormList from "../FormList.jsx";
import Modal from "../UI/Modal";
import Button from "../UI/Button.jsx";
import ResumePreview from "../ResumePreview/ResumePreview.jsx";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext.jsx";

const MainBody = () => {
  const { addForm, addedForms, setActiveForm, setIsEditing } = useUser();
  const [isAddContent, setIsAddContent] = useState(false);

  const handleAddContent = () => {
    setIsAddContent(true);
  };

  const handleSelectedContent = (selected) => {
    addForm((prev) => [selected, ...prev]);
    setActiveForm(selected);
    setIsEditing(true);
    setIsAddContent(false);
  };

  const handleModalClose = () => {
    setIsAddContent(false);
  };

  return (
    <>
      {isAddContent && (
        <Modal onClose={handleModalClose}>
          <FormList onSelect={handleSelectedContent} />
        </Modal>
      )}

      <section className="flex gap-4 p-5">
        <div className="resumePreview w-[25cm] text-black">
          <div className="resume bg-amber-50 h-dvh rounded-xl">
            <ResumePreview />
          </div>
        </div>

        <div className="content-body w-full">
          <div className="selected-content p-2">
            <Main data={addedForms} addingContent={isAddContent} />
          </div>

          <Button onClick={handleAddContent}>Add content</Button>
        </div>
      </section>
    </>
  );
};

export default MainBody;
