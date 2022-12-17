import {
  Link,
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import "../styles/navbar.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import useLogout from "../hooks/useLogout";
import { useEffect } from "react";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const logout = useLogout();
  const location = useLocation().pathname;
  // const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const boolean = token ? true : false;
  const [loggedIn, setLoggedIn] = useState(boolean);

  const handleLogout = async (e) => {
    await logout();
    setLoggedIn(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token ? true : false);
  }, [location]);
  return (
    <nav className="navbar">
      <h3 className="logo">SSN</h3>

      <ul className={mobile ? "nav-links-mobile" : "nav-links"}>
        {loggedIn ? (
          role === "Admin" ? ( 
          <>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/users">
              <li>Users</li>
            </Link>
            <Link to="/article">
              <li>Post</li>
            </Link>
            <Link to="/account">
              <li>Account</li>
            </Link>
            <Link onClick={handleLogout} to="/login">
              <li>Logout</li>
            </Link>
          </>
        ) : 
        <>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/account">
              <li>Account</li>
            </Link>
            <Link onClick={handleLogout} to="/login">
              <li>Logout</li>
            </Link>
          </> ): (
          <>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
          </>
        )}
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
