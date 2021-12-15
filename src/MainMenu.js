import { Link } from "react-router-dom";
import "./App.scss";
function MainMenu() {
  return (
    <div className="wrapper">
      <Link className="Link" to="/SignIn">
        <button className="btn link-btn btn-pushable" id="signin">
          <span className="btn-front">Sign In!</span>
        </button>
      </Link>
      <Link className="Link" to="/SignUp">
        <button className="btn link-btn btn-pushable" id="signup">
          <span className="btn-front">Sign Up!</span>
        </button>
      </Link>
      <Link className="Link" to="/RFID">
        <button className="btn link-btn btn-pushable" id="rfid">
          <span className="btn-front">RFID</span>
        </button>
      </Link>
    </div>
  );
}
export default MainMenu;
