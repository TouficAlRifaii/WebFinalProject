import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../styles/navbar.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navContainer">
        <h3 className="logo">SSN</h3>

        <ul className="nav-links">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link  to="/services">
            <li>Services</li>
          </Link>
          <Link  to="/login">
            <li>Login</li>
          </Link>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/account">
            <li>Account</li>
          </Link>
        </ul>
        <button className="mobile-menu">
        <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
