import "./index.scss";
import { Link } from "react-router-dom";

function Button({ child, to, onClick }) {
  return (
    <Link to={to} className="link">
      <button onClick={onClick} className="button">
        {child}
      </button>
    </Link>
  );
}

export default Button;
