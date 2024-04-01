import "./index.scss";
import { Link } from "react-router-dom";

function Button_Transparent({ child, to, onClick, style }) {
  return (
    <Link to={to} className="href">
      <button style={style} onClick={onClick} className="button-transparent">
        {child}
      </button>
    </Link>
  );
}

export default Button_Transparent;
