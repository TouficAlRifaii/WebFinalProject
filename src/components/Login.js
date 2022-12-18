import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/authForms.css";

import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/login";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const token = auth?.token;

  useEffect(() => {
    emailRef.current.focus();
    if (token) {
      navigate(from, { replace: true });
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(LOGIN_URL, formData);
      if (response.data["status"] === "success") {
        const token = response.data.authorisation["token"];
        const role = response.data.authorisation["role"];
        const splittedToken = parseJwt(token);

        setAuth({ email, token, role });
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        localStorage.setItem("expiryDate", splittedToken.exp * 1000);
        // setEmail("");
        // setPassword("");
        navigate(from, { replace: true });
      }
    } catch (error) {
      setErrMsg(error.response.data["message"]);
    }
  };

  return (
    <div className="body">
      <section className="container">
        <div className="Login">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          ></p>
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="login-button"
              disabled={!email || !password ? true : false}
            >
              Log In
            </button>
          </form>
        </div>
        <div className="overlayContainer">
          <div className="overlay">
            <div className="overlay-right">
              <h1>Don't have an Account?</h1>
              <Link to="/signup">
                <button className="login-button overlayer-Login">SignUp</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
