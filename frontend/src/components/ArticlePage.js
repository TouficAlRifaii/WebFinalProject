import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ArticlePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState();
  const axiosPrivate = useAxiosPrivate();
  const categories = [];
  const role = localStorage.getItem("role");
  const [editing, setEditing] = useState(false);
  const [categoryName, setCategoryName] = useState();

  const getArticle = async () => {
    const response = await axiosPrivate.get(`/getArticles/${id}`);
    if (response.data["status"] === "success") {
      const article = response.data["articles"][0];
      setTitle(article.title);
      setContent(article.content);
      setCategoryId(article.category_id);
      setCategoryName(response.data["CategoryName"]);
    }
  };
  useEffect(() => {
    getArticle();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", categoryId);
      const response = await axiosPrivate.post("/updateArticle", formData);
      if (response.data["status"] === "success") {
        setEditing(false);
      }
    } catch (error) {
      // setErrMsg(error.response.data["message"]);
    }
  };

  return (
    <div className="body">
      <div className="newArticlecontainer">
        <section className="NewArticle">
          <form className="newArticleForm" onSubmit={(e) => e.preventDefault()}>
            <h1>New Article</h1>
            <label htmlFor="ArticleTitle">Title:</label>
            <input
              disabled={editing ? false : true}
              id="ArticleTitle"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="ArticleBody">Article:</label>
            <textarea
              disabled={editing ? false : true}
              id="ArticleBody"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <select
              disabled={editing ? false : true}
              onChange={(e) => setCategoryId(e.target.value)}
              className="classic"
            >
              <option value={categoryId}>{categoryName}</option>
              {editing ? (
                categories ? (
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
                )
              ) : (
                <></>
              )}
            </select>
            {role === "Admin" ? (
              <button
                onClick={
                  editing ? () => handleSubmit() : () => setEditing(true)
                }
                className={
                  editing
                    ? "fancy-button fancy-button-blue"
                    : "fancy-button fancy-button-green"
                }
              >
                {editing ? "Save" : "Edit"}
              </button>
            ) : (
              <></>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ArticlePage;
