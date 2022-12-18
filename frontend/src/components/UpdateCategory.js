import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/authForms.css";

const URL = "/updateCategory";
const UpdateCategory = () => {
  const { id } = useParams();
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
    formData.append("id", id);
    const response = await axios.post(URL, formData);
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
            {/* <h1>New Name</h1> */}
            <label htmlFor="name">New Name:</label>
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

export default UpdateCategory;
