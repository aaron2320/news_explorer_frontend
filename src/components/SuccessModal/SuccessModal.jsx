import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  return (
    <ModalWithForm
      title="Registration successfully completed!"
      name="success"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => {
        e.preventDefault();
        onSignInClick();
      }}
      hideDefaultButton={true}
    >
      <button
        type="submit"
        className="success-modal__sign-in"
        onClick={(e) => {
          e.preventDefault();
          onSignInClick();
        }}
      >
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default SuccessModal;
