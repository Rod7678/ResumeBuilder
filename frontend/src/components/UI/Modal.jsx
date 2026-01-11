import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const dialog = useRef();
  useEffect(() => {
   dialog.current.showModal();
  }, []);

  const handleClose = ()=>{
    dialog.current.close();
    onClose();
  }

  return createPortal(
    <dialog ref={dialog} onClose={handleClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
