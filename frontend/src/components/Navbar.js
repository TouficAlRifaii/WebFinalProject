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
import { CSSTransition } from "react-transition-group";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const logout = useLogout();
  const location = useLocation().pathname;

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const boolean = token ? true : false;
  const [loggedIn, setLoggedIn] = useState(boolean);

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const handleLogout = async (e) => {
    await logout();
    setLoggedIn(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(token ? true : false);
  }, [location]);
  return (
    <header className="Header">
      <div className="LogoDiv">
        <h3 className="Logo">SSN</h3>
      </div>

      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <>
          {loggedIn ? (
            role === "Admin" ? (
              <nav className="Nav6">
                <Link className="a" to="/">
                  Home
                </Link>
                <Link className="a" to="/users">
                  Users
                </Link>
                <Link className="a" to="/article">
                  Post
                </Link>
                <Link className="a" to="/categories">
                  Categories
                </Link>
                <Link className="a" to="/account">
                  Account
                </Link>
                <Link className="a" onClick={handleLogout} to="/login">
                  Logout
                </Link>
              </nav>
            ) : (
              <nav className="Nav3">
                <Link className="a" to="/">
                  Home
                </Link>
                <Link className="a" to="/account">
                  Account
                </Link>
                <Link className="a" onClick={handleLogout} to="/login">
                  Logout
                </Link>
              </nav>
            )
          ) : (
            <nav className="Nav2">
              <Link className="a" to="/login">
                Login
              </Link>
              <Link className="a" to="/signup">
                SignUp
              </Link>
            </nav>
          )}
        </>
      </CSSTransition>
      <button
        onClick={() => {
          toggleNav();
          setMobile(!mobile);
        }}
        className="Burger"
      >
        {mobile ? (
          <FontAwesomeIcon className="menu" icon={faXmark} />
        ) : (
          <FontAwesomeIcon className="menu" icon={faBars} />
        )}
      </button>
    </header>
  );
};

export default Navbar;
