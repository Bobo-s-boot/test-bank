import "./index.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Arrow from "../../component/arrow";
import Divider from "../../component/divider";

function Check() {
  const [transaction, setTransaction] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const { transactionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get(
          `http://localhost:4000/balance/balance`
        );
        const foundTransaction = transactionResponse.data.transactions.find(
          (t) => t.id === transactionId
        );
        if (foundTransaction) {
          setTransaction(foundTransaction);

          const emailResponse = await axios.post(
            "http://localhost:4000/entry/emails"
          );
          const userEmail = emailResponse.data.email;
          setUserEmail(userEmail);
        } else {
          console.error("Transaction not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [transactionId]);

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Transaction</h1>
      </div>

      {transaction !== null && userEmail !== null ? (
        <>
          <h1 className="price-check">+${transaction.amount}</h1>

          <div className="check-block">
            <div className="content">
              <p>Date</p>
              <div className="time-block">
                <time>
                  {transaction.timestamp.date} {transaction.monthName},
                </time>
                <time>
                  {transaction.timestamp.hours}:{transaction.timestamp.minutes}
                </time>
              </div>
            </div>
            <Divider />
            <div className="content">
              <p>Address</p>
              <p>{userEmail}</p>
            </div>
            <Divider />
            <div className="content">
              <p>Type</p>
              <p>{transaction.type}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Check;
