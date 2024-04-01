import "./index.scss";

function Info({ title, description }) {
  return (
    <div className="info">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default Info;
