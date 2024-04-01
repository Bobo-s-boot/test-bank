import "./index.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Arrow from "../../component/arrow";
import InputEmail from "../../component/input-email";
import Input from "../../component/input";
import Button from "../../component/button";

function Send() {
  const [email, setEmail] = useState("");
  const [sum, setSum] = useState("");
  const navigate = useNavigate();

  const handleClickConfirmSum = async () => {
    try {
      const serverUrl = "http://localhost:4000/entry/send";
      const response = await axios.post(serverUrl, {
        email: email,
      });

      if (response.data.message === "Corect email address") {
        const urlServer = "http://localhost:4000/balance/send";
        const response2 = await axios.post(urlServer, {
          sum: sum,
          email: email,
        });

        if (response2.data.message === "Amount successfully sent") {
          alert("Send successful");
          navigate("/balance");
        }
      }
    } catch (error) {
      console.error("Error, send not successful", error);
    }
  };

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Send</h1>
      </div>

      <InputEmail
        info="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        info="Sum"
        type="number"
        value={sum}
        onChange={(e) => setSum(e.target.value)}
      />

      <Button child="Send" onClick={handleClickConfirmSum} />
    </div>
  );
}

export default Send;
