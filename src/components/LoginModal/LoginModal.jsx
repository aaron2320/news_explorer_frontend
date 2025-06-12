import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onRegisterClick, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity when inputs change
  useEffect(() => {
    setIsFormValid(email !== "" && password !== "");
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    onRegisterClick();
  };

  return (
    <ModalWithForm
      title="Sign in"
      name="login"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      hideDefaultButton={true}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Enter email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Enter password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button
        type="submit"
        className={`modal__submit-button ${
          !isFormValid ? "modal__submit-button_disabled" : ""
        }`}
        disabled={!isFormValid}
      >
        Sign in
      </button>
      <div className="login-modal__footer">
        <p className="login-modal__text">
          or{" "}
          <button
            type="button"
            className="login-modal__link"
            onClick={handleRegisterClick}
          >
            Sign up
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
