import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  children,
  isOpen,
  hideDefaultButton = false,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {!hideDefaultButton && (
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
