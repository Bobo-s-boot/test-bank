import "./index.scss";
import Button from "../../component/button";
import ButtonTransparent from "../../component/button-transparent";

function Home() {
  return (
    <div className="main">
      <div className="backround">
        <div className="desc">
          <h1>Hello!</h1>
          <p>Welcome to bank app</p>
        </div>

        <div className="image">
          <img src="img/bank.png" alt="bank" />
        </div>
      </div>

      <div className="buttons">
        <Button to="signup" child="Sign up"></Button>
        <ButtonTransparent to="signin" child="Sign in"></ButtonTransparent>
      </div>
    </div>
  );
}

export default Home;
