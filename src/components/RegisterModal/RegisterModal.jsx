import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onLoginClick, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // Check form validity whenever inputs change
  useEffect(() => {
    setIsFormValid(email !== "" && password !== "" && username !== "");
  }, [email, password, username]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLoginClick();
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
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
      <label className="modal__label">
        Username
        <input
          type="text"
          name="username"
          className="modal__input"
          placeholder="Enter username"
          required
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <button
        type="submit"
        className={`modal__submit-button ${
          !isFormValid ? "modal__submit-button_disabled" : ""
        }`}
        disabled={!isFormValid}
      >
        Sign up
      </button>
      <div className="register-modal__footer">
        <p className="register-modal__text">
          or{" "}
          <button
            type="button"
            className="register-modal__link"
            onClick={handleLoginClick}
          >
            Sign in
          </button>
        </p>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
