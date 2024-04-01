import "./index.scss";
import { useState } from "react";

function Input_Email({ type, info, icon, value: propValue, onChange, style }) {
  const REG_EXP_EMAIL = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/);

  const [inputStatus, setInputStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const getStatusInput = (newValue) => {
    if (!REG_EXP_EMAIL.test(newValue)) {
      setInputStatus("solid 1px red");
      setErrorMessage(
        "Your email need have @ simbol or your syntax is incorrect"
      );
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
          type={type}
          value={propValue}
          onChange={handleChangeInput}
          style={{ border: inputStatus, ...style }}
        />
        {icon && <img src={icon} alt="eye" className="input-icon" />}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default Input_Email;
