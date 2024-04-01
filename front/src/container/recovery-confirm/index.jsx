import "./index.scss";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Input from "../../component/input";
import InputPassword from "../../component/input-password";
import Arrow from "../../component/arrow";
import Info from "../../component/info";
import Button from "../../component/button";
import Alert from "../../component/alert";

function Recovery_Confirm() {
  const location = useLocation();
  const emailFromRecovery = location.state?.email || "";
  const [inputCode, setInputCode] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClickConfirm = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/entry/recovery-confirm",
        {
          code: inputCode,
          password: inputPassword,
          email: emailFromRecovery,
        }
      );

      if (response.data.message === "Correct data user") {
        window.setTimeout(
          alert("You have provided correct information"),
          navigate("/balance"),
          3000
        );
      }
    } catch (error) {
      console.error("Error code", error);
      setMessage("Incorect code or password");
    }
  };

  return (
    <div className="main">
      <>
        <Arrow />
      </>

      <Info
        title="Recover password"
        description="Write the code you received"
      />

      <Input
        type="text"
        info="Code:"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />

      <InputPassword
        type="password"
        info="Password:"
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />

      <Button child="Restore password" onClick={handleClickConfirm} />
      {message && <Alert message={message} />}
    </div>
  );
}

export default Recovery_Confirm;
