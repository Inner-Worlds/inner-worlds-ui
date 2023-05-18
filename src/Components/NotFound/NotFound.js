import "./NotFound.css";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();

    const handleBackToLogin = () => {
        history.push("/");
      };
    
      const handleBackToHome = () => {
        history.push("/Home");
      };

  return (
    <div className="not-found">
    <h1 className="not-found-text">404 Lost in Space</h1>
      <button className="back-button" onClick={handleBackToLogin}>
        Please Try Again
      </button>
 
  </div>
  );
};

export default NotFound;
