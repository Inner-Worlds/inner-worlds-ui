import "./Login.css";
import logo from "../../assets/Inner Worlds - Login Logo (500 × 300 px).svg";
import djText from "../../assets/Dream Journal - (600 x 100px).svg";
import orSat from "../../assets/Saturn Orange - (140 x 85px).svg";
import tealSat from "../../assets/Saturn Teal - (140 x 85px).svg";

const Login = ({ loginUser, tryLogin, error }) => {
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
          <button
            className="user1 login-button"
            onClick={() => {
              loginUser({ variables: { id: 1 } });
              tryLogin();
            }}
          >
            <img src={orSat} alt="orange saturn" />
            <p>User 1</p>
          </button>
          <button
            className="user2 login-button"
            onClick={() =>  {
              loginUser({ variables: { id: 2 } });
              tryLogin();
            }}
          >
            <img src={tealSat} alt="teal saturn" />
            <p>User 2</p>
          </button>
        </section>
        {error?.message && <h1 className="error">Something went wrong, please try again.</h1>}
      </section>
    </main>
  );
};

export default Login;
