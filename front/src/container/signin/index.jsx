// Sign_in.js
import "./index.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputEmail from "../../component/input-email";
import Arrow from "../../component/arrow";
import Info from "../../component/info";
import Button from "../../component/button";
import Href from "../../component/href";
import InputPassword from "../../component/input-password";
import Alert from "../../component/alert";

function Sign_in() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    try {
      const response = await axios.post("http://localhost:4000/entry/signin", {
        email: inputEmail,
        password: inputPassword,
      });

      console.log(response.data.message);

      navigate("/balance");
    } catch (error) {
      console.error("Entry error", error);
      setMessage("Error, failed data");
    }
  };

  return (
    <div className="main">
      <>
        <Arrow />
      </>

      <Info title="Sign in" description="Select login method" />

      <InputEmail
        type="email"
        info="Email:"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />

      <InputPassword
        type="password"
        info="Password:"
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />

      <span className="restore">
        Forgot your password? <Href to="/recovery" child="Restore" />
      </span>

      <Button child={"Continue"} onClick={handleConfirmClick} />

      {message && <Alert message={message} />}
    </div>
  );
}

export default Sign_in;
