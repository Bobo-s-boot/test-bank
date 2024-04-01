import "./index.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Arrow from "../../component/arrow";
import Divider from "../../component/divider";

function Check_Sending() {
  const [sending, setSending] = useState(null);
  const { sendingId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sendingIdUser = await axios.get(
          "http://localhost:4000/balance/balance"
        );
        const foundUserdId = sendingIdUser.data.sendings.find(
          (s) => s.id === sendingId
        );

        console.log("Checkk:", foundUserdId);

        if (foundUserdId) {
          setSending(foundUserdId);
        }
      } catch (error) {
        console.error("Error sending", error);
      }
    };

    fetchData();
  }, [sendingId]);

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Transaction</h1>
      </div>
      {sending !== null ? (
        <>
          <h1 className="price-check_sending">-${sending.amount}</h1>

          <div className="check-block">
            <div className="content">
              <p>Date</p>
              <div className="time-block">
                <time>
                  {sending.timestamp.date} {sending.monthName},
                </time>
                <time>
                  {sending.timestamp.hours}:{sending.timestamp.minutes}
                </time>
              </div>
            </div>
            <Divider />
            <div className="content">
              <p>Address</p>
              <p>{sending.email}</p>
            </div>
            <Divider />
            <div className="content">
              <p>Type</p>
              <p>{sending.type}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Check_Sending;
