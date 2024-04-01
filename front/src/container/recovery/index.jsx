import "./index.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmail from "../../component/input-email";
import Arrow from "../../component/arrow";
import Info from "../../component/info";
import Button from "../../component/button";
import Alert from "../../component/alert";

function Recovery() {
  const [inputEmail, setInputEmail] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleConfirmEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/entry/recovery",
        {
          email: inputEmail,
        }
      );

      if (response.data.message === "Correct email address") {
        navigate("/recovery-confirm", {
          state: { email: inputEmail },
        });
      }
    } catch (error) {
      console.error("Email error", error);
      setMessage("Incorect email adress");
    }
  };

  return (
    <div className="main">
      <>
        <Arrow />
      </>

      <Info title="Recover password" description="Choose a recovery method" />

      <InputEmail
        type="email"
        info="Email:"
        value={inputEmail || ""}
        onChange={(e) => setInputEmail(e.target.value)}
      />

      <Button child="Send code" onClick={handleConfirmEmail} />
      {message && <Alert message={message} />}
    </div>
  );
}

export default Recovery;
