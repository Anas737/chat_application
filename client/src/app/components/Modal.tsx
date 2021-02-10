import React, { ReactChild } from "react";

interface ModalProps {
  children: ReactChild;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className="modal">
      <header className="modal__header">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </button>
      </header>
      <div className="modal__body">{children}</div>
    </div>
  );
};

export default Modal;
