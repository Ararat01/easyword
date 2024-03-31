import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <div className="container">
        <div className="page">
          <img className="image" src="/404.png" alt="" />
          <div className="body">
            <h2>Page Not Found</h2>
            <p>
              Sorry, the page you're looking for doesn't exist. If you think
              somethin is broken, report a problem.
            </p>
            <Link to={"/translate"}>Go Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
