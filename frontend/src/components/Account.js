import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/authForms.css";

const URL = "/editProfile";
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
  useEffect(() => {
    const getAccountInfo = async () => {
        const response = await axiosPrivate.get("/me");
        const user = response.data;
        setName(user["name"]);
        
    } 
    getAccountInfo();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    const response = await axios.post(URL, formData);
    if (response.data["status"] === "success") {
      setSuccess(true);
      setErrMsg("Name Changed Successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="body">
      <section className="container newCat">
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
          <h1>Profile</h1>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
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
            Update Profile
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateCategory;
