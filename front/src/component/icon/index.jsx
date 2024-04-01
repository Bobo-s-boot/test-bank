import { Link } from "react-router-dom";
import "./index.scss";

function Icon({ to, children }) {
  return (
    <Link to={to}>
      <div className="icon-container">{children}</div>
    </Link>
  );
}

export default Icon;
