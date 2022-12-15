import { useRef, useEffect, useState } from "react";
import "../styles/authForms.css"

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
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
              <button className="login-button" disabled={!email || !password ? true : false}>
                Log In
              </button>
              <p>
                Don't have an account? <br />
                <span>
                  {/* I'll put a router link here later */}
                  <a href="#">Sign Up</a>
                </span>
              </p>
            </form>
          </div>
          <div className="overlayContainer">
            <div className="overlay">
              <div className="overlay-right">
                <h1>Don't have an Account?</h1>
                <button className="login-button overlayer-Login">SignUp</button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
