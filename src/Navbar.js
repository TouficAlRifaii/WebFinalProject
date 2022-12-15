import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <nav className="navbar">
            <h3 className="logo">SSN</h3>

            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/services"><li>Service</li></Link>
                <Link to="/login"><li>Login</li></Link>
                <Link to="/signup"><li>SignUp</li></Link>
                <Link to="/account"><li>Account</li></Link>
            </ul>
        </nav>
    )
}

export default Navbar; 