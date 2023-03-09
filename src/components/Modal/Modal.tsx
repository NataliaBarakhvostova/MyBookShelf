import React from "react";
import theme from "./Modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { ModalType } from "../../types/Modal.type";

const Modal: React.FC<ModalType> = ({ title, openAction, children }) => {
  return (
    <div className={theme.modal}>
      <div className={theme.modalContent}>
        <div className={theme.modalHeader}>
          <h3 className={theme.modalTitle}>{title}</h3>
          <button
            onClick={() => openAction(false)}
            className={theme.modalClose}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className={theme.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
