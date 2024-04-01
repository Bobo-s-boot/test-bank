import "./index.scss";
import Arrow from "../../component/arrow";
import { useState, useEffect } from "react";
import axios from "axios";

function Notic() {
  const [announcementNotification, setAnnouncementNotification] =
    useState(null);
  const [warningNotification, setWarningNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.post("http://localhost:4000/entry/notic");
        setAnnouncementNotification(response.data.announcementNotification);
        setWarningNotification(response.data.warningNotification);
      } catch (error) {
        console.error("Notifications error", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Notifications</h1>
      </div>

      <div className="notifications-block">
        {announcementNotification && (
          <div className="notic-block" key={announcementNotification.id}>
            <img src={announcementNotification.image} alt="notic" />
            <div className="notification">
              <h2>{announcementNotification.title}</h2>
              <div className="time-block">
                <time>{announcementNotification.day}</time>
                <p>ago</p>
                <p>{announcementNotification.type}</p>
              </div>
            </div>
          </div>
        )}

        {warningNotification && (
          <div className="notic-block" key={warningNotification.id}>
            <img src={warningNotification.image} alt="notic" />
            <div className="notification">
              <h2>{warningNotification.title}</h2>
              <div className="time-block">
                <time>{warningNotification.day}</time>
                <p>ago</p>
                <p>{warningNotification.type}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notic;
