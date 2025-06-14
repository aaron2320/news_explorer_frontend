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
        style={{
          background: "none",
          border: "none",
          color: "#2f71e5",
          appearance: "none",
          padding: "0",
          fontFamily: "Roboto, sans-serif",
          fontSize: "18px",
          fontWeight: "400",
          display: "inline-block",
          textAlign: "left",
          marginTop: "12px",
          cursor: "pointer",
        }}
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
