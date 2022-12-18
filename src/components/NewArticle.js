import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/newArticle.css";

const NewArticle = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState();
  const [categories, setCategories] = useState();

  const axiosPrivate = useAxiosPrivate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get("/getCategories");
        setCategories(response.data["categories"]);
      } catch (error) {
        console.log("error: " + error);
      }
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", categoryId);
      const response = await axiosPrivate.post("/createArticle", formData);
      if (response.data["status"] === "success") {
        setSuccess(true);
        setErrMsg(response.data["message"]);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setErrMsg(error.response.data["message"]);
    }
  };

  return (
    <div className="body">
      <div className="newArticlecontainer">
        <section className="NewArticle">
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
          <form className="newArticleForm" onSubmit={handleSubmit}>
            <h1>New Article</h1>
            <label htmlFor="ArticleTitle">Title:</label>
            <input
              id="ArticleTitle"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="ArticleBody">Article:</label>
            <textarea
              id="ArticleBody"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <select
              onChange={(e) => setCategoryId(e.target.value)}
              className="classic"
            >
              <option value="">Select Category</option>
              {categories ? (
                categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="option"
                  >
                    {category.name}
                  </option>
                ))
              ) : (
                <option label="Empty" value="" className="option"></option>
              )}
            </select>

            <button
              className="login-button"
              type="submit"
              disabled={!title || !content || !categoryId ? true : false}
            >
              Post
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default NewArticle;
