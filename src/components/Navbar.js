import { Link, BrowserRouter as Router } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <h3 className="logo">SSN</h3>
      <Router>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <Link to="/services">
            <li>Service</li>
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
      </Router>
    </div>
  );
};

export default Navbar;
