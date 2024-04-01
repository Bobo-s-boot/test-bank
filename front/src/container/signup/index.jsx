import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import InputEmail from "../../component/input-email";
import InputPassword from "../../component/input-password";
import Arrow from "../../component/arrow";
import Info from "../../component/info";
import Button from "../../component/button";
import Href from "../../component/href";
import Alert from "../../component/alert";

function Sign_up() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleConfirmClick = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        email: inputEmail,
        password: inputPassword,
      });

      console.log(response.data.message);
      setMessage("Registration successful!");

      navigate("/signup-confirm", { state: { email: inputEmail } });
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed");
    }
  };

  return (
    <div className="main">
      <Arrow />
      <Info title="Sign up" description="Choose a registration method" />

      <InputEmail
        type="email"
        info="Email:"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />

      <InputPassword
        type="password"
        info="Password:"
        value={inputPassword}
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        onChange={(e) => setInputPassword(e.target.value)}
      />

      <span className="restore">
        Already have an account? <Href to="/signin" child="Sign In" />
      </span>

      <Button child={"Confirm"} onClick={handleConfirmClick} />

      {message && <Alert message={message} />}
    </div>
  );
}

export default Sign_up;
