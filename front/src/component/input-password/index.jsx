import React, { useState } from "react";
import "./index.scss";

function Input_Password({ info, icon, value: propValue, onChange, style }) {
  const REG_EXP_PASSWORD = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#$%^&*()_+]).{8,}$/
  );

  const MAX_LENGTH = 15;
  const MIN_LENGTH = 6;

  const [iconClicked, setIconClicked] = useState(false);
  const [inputStatus, setInputStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClickedIcon = () => {
    setIconClicked(!iconClicked);
  };

  const getStatusInput = (newValue) => {
    if (!REG_EXP_PASSWORD.test(newValue) || newValue.length < MIN_LENGTH) {
      setInputStatus("solid 1px red");
      setErrorMessage("Your password needs to have at least 6 characters");
    } else if (newValue.length > MAX_LENGTH) {
      setInputStatus("solid 1px red");
      setErrorMessage("Your password is too long");
    } else {
      setInputStatus("solid 1px green");
      setErrorMessage("");
    }
  };

  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    getStatusInput(newValue);
    onChange(e);
  };

  return (
    <div className="input">
      <label className="input-info">{info}</label>
      <div className="input-container">
        <input
          type={iconClicked ? "text" : "password"}
          value={propValue}
          onChange={handleChangeInput}
          style={{ border: inputStatus, ...style }}
        />
        {icon && (
          <img
            src={iconClicked ? "svg/openEye.svg" : "svg/closeEye.svg"}
            alt="eye"
            className="input-icon"
            onClick={handleClickedIcon}
          />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Input_Password;
