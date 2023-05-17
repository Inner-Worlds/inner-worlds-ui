import { NavLink } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/Inner Worlds - Login Logo (500 × 300 px).svg";
import djText from "../../assets/Dream Journal - (600 x 100px).svg";
import orSat from "../../assets/Saturn Orange - (140 x 85px).svg";
import tealSat from "../../assets/Saturn Teal - (140 x 85px).svg";

const Login = ({ loginUser }) => {
  return (
    <main className="login">
      <div className="styling login-design">
        <div className="styling stripes">
          <div className="styling login-astronaut"></div>
        </div>
      </div>
      <section className="login-header">
        <section className="logo-imgs">
          <img src={logo} alt="Inner Worlds" className="login-logo"></img>
          <img src={djText} alt="Dream Journal" className="dj-text"></img>
        </section>
        <section className="styling user-btns">
          <NavLink
            to="/Home"
            className="user1 login-button"
            onClick={() => loginUser( { variables: {id: 13} }) }
          >
            <img src={orSat} alt="orange saturn"></img>
            <p>User 1</p>
          </NavLink>
          <NavLink
            to="/Home"
            className="user2 login-button"
            onClick={() =>  loginUser( { variables: {id: 33} }) }
          >
            <img src={tealSat} alt="teal saturn"></img>
            <p>User 2</p>
          </NavLink>
        </section>
      </section>
    </main>
  );
};

export default Login;
