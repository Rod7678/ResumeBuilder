import { useState } from "react";
import ContentList from "../ContentList.jsx";
import Main from "../Form/Main.jsx";
import FormList from "../FormList.jsx";
import Modal from "../UI/Modal";
import Button from "../UI/Button.jsx";

const MainBody = () => {
  const [isAddContent, setIsAddContent] = useState(false);
  const [isContentAdded, setIsContentAdded] = useState([]);
  const handleAddContent = () => {
    setIsAddContent(true);
  };
  const handleSelectedContent = (selected) => {
    setIsContentAdded((preContent) => [selected, ...preContent]);
    setIsAddContent(false);
  };

  const handleModalClose = () => {
    setIsAddContent(false);
  };
  console.log(isContentAdded);

  return (
    <>
      {isAddContent && (
        <Modal onClose={handleModalClose}>
          <FormList onSelect={handleSelectedContent} />
        </Modal>
      )}
      <section className="flex">
        <div className="resumePreview w-2/3 bg-amber-50 h-dvh text-black">
          <p>coming soon</p>
        </div>
        <div className="content-body w-1/3">
          <div className="selected-content">
            <Main data={isContentAdded} addingContent={isAddContent} />
          </div>
          <Button onClick={handleAddContent}>Add content</Button>
        </div>
      </section>
    </>
  );
};

export default MainBody;
