import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Arrow from "../../component/arrow";
import Info from "../../component/info";
import Button from "../../component/button";
import Input from "../../component/input";
import Alert from "../../component/alert";

function Signup_Confirm() {
  const location = useLocation();
  const emailFromSignup = location.state?.email || "";
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCodeClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup-confirm",
        {
          email: emailFromSignup,
          code: inputCode,
        }
      );

      if (response.data.message === "Corect code") {
        navigate("/balance");
      }
    } catch (error) {
      console.error("Error", error);
      setMessage("Incorect code,check it and try again");
      setInputCode("");
    }
  };

  return (
    <div className="main">
      <Arrow />
      <Info title="Confirm account" description="Write the code you received" />

      <Input
        type="text"
        info="Code:"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
      />

      <Button child="Confirm" onClick={handleCodeClick} />

      {message && <Alert message={message} />}
    </div>
  );
}

export default Signup_Confirm;
