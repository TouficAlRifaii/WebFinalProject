onClick={() => Navigate("/login")}import { Link, BrowserRouter as Router } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3 className="logo">SSN</h3>
      <Router>
        <ul className="nav-links">
          <Link onClick={() => Navigate("/")} to="/">
            <li>Home</li>
          </Link>
          <Link onClick={() => Navigate("/services")} to="/services">
            <li>Services</li>
          </Link>
          <Link onClick={() => Navigate("/login")} to="/login">
            <li>Login</li>
          </Link>
          <Link onClick={() => Navigate("/signup")} to="/signup">
            <li>SignUp</li>
          </Link>
          <Link onClick={() => Navigate("/account")} to="/account">
            <li>Account</li>
          </Link>
        </ul>
      </Router>
    </div>
  );
};

export default Navbar;
