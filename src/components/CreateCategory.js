import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/authForms.css";

const URL = "/createCategory";
const CreateCategory = () => {
  const nameRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const axios = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    const response = await axios.post(URL, formData);
    console.log(response);
    if (response.data["status"] === "success") {
      setSuccess(true);
      setErrMsg(response.data["message"]);
      setTimeout(() => {
        navigate("/categories");
      }, 2000);
    }
  };

  return (
    <div className="body">
      <section className="container">
        <div className="Login">
          {success ? (
            <p
              ref={errRef}
              className={errMsg ? "successmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          ) : (
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <h1>New Category</h1>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
              aria-describedby="uidnote"
              
            />

            <button
              className="login-button"
              type="submit"
              disabled={!name ? true : false}
            >
              Create Category
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateCategory;
