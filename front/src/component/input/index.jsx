import "./index.scss";

function Input({ type, info, value: propValue, onChange, style }) {
  return (
    <div className="input">
      <label className="input-info">{info}</label>
      <div className="input-container">
        <input
          type={type}
          value={propValue}
          onChange={onChange}
          style={style}
        />
      </div>
    </div>
  );
}

export default Input;
