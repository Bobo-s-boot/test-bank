import "./index.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../component/icon";
import { useNavigate } from "react-router-dom";

function Balance() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverUrl = "http://localhost:4000/balance/balance";
        const response = await axios.get(serverUrl);
        setBalance(response.data.balance);
        const newTransactions = response.data.transactions.reverse();
        const newUsers = response.data.sendings.reverse();
        setTransactions(newTransactions);
        setUsers(newUsers);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickTransactions = (transaction) => {
    if (
      transaction &&
      transaction.id !== undefined &&
      transaction.id !== null
    ) {
      navigate(`/check/${transaction.id}`);
      console.log("Correct send", transaction);
    } else {
      console.error(
        "Invalid transaction object or missing transaction id:",
        transaction
      );
    }
  };

  const handleClickSendings = (sending) => {
    if (sending && sending.id !== undefined && sending.id !== null) {
      navigate(`/check-sending/${sending.id}`);
      console.log("Correct send", sending);
    } else {
      console.error("Invalid sending", sending);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <div className="info">
          <Icon to="/settings">
            <img src="/svg/settings.svg" alt="settings" />
          </Icon>

          <span className="">Main wallet</span>
          <Icon to="/notic">
            <img src="/svg/notic.svg" alt="notic" />
          </Icon>
        </div>

        <>
          <h1 className="price">
            {balance !== null ? `$ ${balance.toFixed(2)}` : "Loading..."}
          </h1>
        </>

        <div className="events-box">
          <div className="event">
            <Icon to="/recive">
              <img src="/svg/arrow-down.svg" alt="receive" />
            </Icon>
            <p>Receive</p>
          </div>

          <div className="event">
            <Icon to="/send">
              <img src="/svg/people.svg" alt="send" />
            </Icon>
            <p>Send</p>
          </div>
        </div>
      </div>

      <div className="list">
        {users.map((sending, index) => (
          <div
            key={index}
            className="info-block"
            onClick={() => handleClickSendings(sending)}
          >
            <div className="event-block">
              <img src="/svg/user.svg" alt="send" />
              <h2>
                {sending.name}
                <div className="time-block">
                  <time>
                    {sending.timestamp.hours}:{sending.timestamp.minutes}
                  </time>
                  <span>Sending</span>
                </div>
              </h2>
            </div>
            <p className="withdrawal">-${sending.amount.toFixed(2)}</p>
          </div>
        ))}
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="info-block"
            onClick={() => handleClickTransactions(transaction)}
          >
            <div className="event-block">
              <img
                src={`/svg/${transaction.type === "Receipt" ? "s" : "c"}.svg`}
                alt={transaction.type}
              />
              <div className="recipt-block">
                <h2>
                  {transaction.type === "Receipt" ? "Stripe" : "Coinbase"}
                </h2>
                <div className="time-block">
                  <time>
                    {transaction.timestamp.hours}:
                    {transaction.timestamp.minutes}
                  </time>
                  <span>Receipt</span>
                </div>
              </div>
            </div>
            <p
              className={
                transaction.type === "Receipt" || "Receipt  "
                  ? "receipt"
                  : "withdrawal"
              }
            >
              {transaction.type === "Receipt" || "Receipt  "
                ? `+$${transaction.amount.toFixed(2)}`
                : `$`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Balance;
