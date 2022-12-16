import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../styles/navbar.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  return (
    <nav className="navbar">
      <h3 className="logo">SSN</h3>

      <ul className={mobile ? "nav-links-mobile" : "nav-links"}>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/services">
          <li>Services</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/signup">
          <li>SignUp</li>
        </Link>
        <Link to="/account">
          <li>Account</li>
        </Link>
      </ul>
      <button className="mobile-menu-icon" onClick={() => setMobile(!mobile)}>
        {mobile ? (
          <FontAwesomeIcon className="menu" icon={faXmark} />
        ) : (
          <FontAwesomeIcon className="menu" icon={faBars} />
        )}
      </button>
    </nav>
  );
};

export default Navbar;