import "./index.scss";

function goBack() {
  window.history.back();
}

function Arrow() {
  return (
    <img
      className="arrow"
      src="/svg/arrow.svg"
      alt="back"
      height="24px"
      width="24px"
      onClick={goBack}
    />
  );
}

export default Arrow;
