import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../component/input";
import Arrow from "../../component/arrow";
import Divider from "../../component/divider";
import Alert from "../../component/alert";
import "./index.scss";

function Recive() {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [selectedPaymentSystem, setSelectedPaymentSystem] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  };

  const handlePaymentSystemClick = (paymentSystem) => {
    const confirm = window.confirm("You sure this transaction?");

    if (confirm) {
      setSelectedPaymentSystem(paymentSystem);
    } else {
      alert("Operation cancel of user");
    }
  };

  const sendAmountToServer = async () => {
    try {
      if (!amount.trim()) {
        setMessage("Please, enter the amount");
        return;
      }

      const serverUrl = "http://localhost:4000/balance/amount";
      await axios.post(serverUrl, {
        amount: amount,
        paymentSystem: selectedPaymentSystem,
      });

      const successfully = () => {
        console.log("Amount sent successfully!");
        alert("Sent successfully");
        navigate("/balance");
      };

      window.setTimeout(successfully, 2000);
    } catch (error) {
      console.error("Error sending amount to server:", error);
    }
  };

  useEffect(() => {
    if (selectedPaymentSystem) {
      sendAmountToServer();
    }
  }, [selectedPaymentSystem]);

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Recive</h1>
      </div>

      <div className="amount">
        <h2>Receive amount</h2>
        <Input type="number" value={amount} onChange={handleAmountChange} />
      </div>

      <Divider />

      <div className="payment-sistem">
        <h2>Payment system</h2>
        <div
          className={`info-s ${
            selectedPaymentSystem === "Stripe" ? "selected" : ""
          }`}
          onClick={() => handlePaymentSystemClick("Stripe")}
        >
          <div className="sistem">
            <img src="/svg/s.svg" alt="sent" className="image" />
            <h3>Stripe</h3>
          </div>
          <img src="/svg/pay-sistem.svg" alt="sistem" className="image" />
        </div>
        <div
          className={`info-c ${
            selectedPaymentSystem === "Coinbase" ? "selected" : ""
          }`}
          onClick={() => handlePaymentSystemClick("Coinbase")}
        >
          <div className="sistem">
            <img src="/svg/c.svg" alt="sent" className="image" />
            <h3>Coinbase</h3>
          </div>
          <img src="/svg/sistem-pay.svg" alt="sistem" className="image" />
        </div>
      </div>

      {message && <Alert message={message} />}
    </div>
  );
}

export default Recive;
