import "./index.scss";
import { Link } from "react-router-dom";

function Href({ to, child }) {
  return (
    <Link to={to} className="link">
      {child}
    </Link>
  );
}

export default Href;
