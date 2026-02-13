import { useState } from "react";
import Main from "../Main.jsx";
import FormList from "../FormList.jsx";
import Modal from "../UI/Modal";
import Button from "../UI/Button.jsx";
import ResumePreview from "../ResumePreview/ResumePreview.jsx";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../context/UserContext.jsx";

const MainBody = () => {
  const { addForm } = useUser();
  const [isAddContent, setIsAddContent] = useState(false);
  const [isContentAdded, setIsContentAdded] = useState([]);
  const handleAddContent = () => {
    setIsAddContent(true);
  };
  const handleSelectedContent = (selected) => {
    setIsContentAdded((preContent) => [selected, ...preContent]);
    setIsAddContent(false);
    addForm(selected)
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
      <section className="flex gap-4">
        <div className="resumePreview w-[21cm] text-black">
          <div className="resume  bg-amber-50 h-dvh rounded-xl">
            <ResumePreview />
          </div>
        </div>
        <div className="content-body w-full">
          <div className="selected-content p-2">
            <Main data={isContentAdded} addingContent={isAddContent} />
          </div>
          <Button onClick={handleAddContent}>Add content</Button>
        </div>
      </section>
    </>
  );
};

export default MainBody;
