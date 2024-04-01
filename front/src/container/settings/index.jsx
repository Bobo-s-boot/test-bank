import "./index.scss";
import { useState } from "react";
import axios from "axios";
import Arrow from "../../component/arrow";
import InputEmail from "../../component/input-email";
import InputPassword from "../../component/input-password";
import ButtonTransparent from "../../component/button-transparent";
import Divider from "../../component/divider";

function Settings() {
  const [inputEmail, setInputEmail] = useState(null);
  const [inputPassword, setInputPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const handleClickEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/entry/settings-email",
        {
          email: inputEmail,
          password: inputPassword,
        }
      );

      console.log(response.data.message);

      const successMessage = () => {
        alert("Your email has been changed");
      };

      window.setTimeout(successMessage, 2000);
    } catch (error) {
      console.error("Save error", error);

      const errorMessage = () => {
        alert("Your email was not changed");
      };

      window.setTimeout(errorMessage, 2000);
    }
  };

  const handleClickPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/entry/settings-password",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      console.log(response.data.message);

      const corect = () => {
        alert("You password has been changed");
      };

      window.setTimeout(corect, 2000);
    } catch (error) {
      console.error("Error password", error);

      const incorect = () => {
        alert("You password was not changed");
      };

      window.setTimeout(incorect, 2000);
    }
  };

  const handleConfirm = () => {
    const warning = window.confirm(
      "You sure you wont to log out of your account?"
    );

    if (warning) {
      document.location.href = "/";
    }
  };

  return (
    <div className="main">
      <div className="page-name">
        <Arrow />
        <h1>Settings</h1>
      </div>

      <h2>Change email</h2>
      <InputEmail
        type="email"
        info="Email:"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />

      <InputPassword
        type="password"
        info="Old password:"
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />

      <ButtonTransparent child="Save Email" onClick={handleClickEmail} />

      <Divider />

      <h2>Change password</h2>
      <InputPassword
        type="password"
        info="Old password:"
        value={oldPassword}
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <InputPassword
        type="password"
        info="New password:"
        icon={<img src="svg/eye.svg" alt="eye" className="eye" />}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <ButtonTransparent child="Save Password" onClick={handleClickPassword} />

      <Divider />

      <ButtonTransparent
        onClick={handleConfirm}
        child="Log out"
        style={{
          color: "rgb(242, 49, 82)",
          border: "1px solid rgb(242, 49, 82)",
        }}
      />
    </div>
  );
}

export default Settings;
