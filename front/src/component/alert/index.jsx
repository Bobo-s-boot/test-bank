import "./index.scss";

function Alert({ message }) {
  return (
    <div className={` ${message ? "alert--box" : "alert--disabled"}`}>
      <img src="svg/error.svg" alt="error" />
      <span className="restore">{message}</span>
    </div>
  );
}

export default Alert;
