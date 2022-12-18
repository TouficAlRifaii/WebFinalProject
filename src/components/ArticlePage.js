import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ArticlePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [categoryId, setCategoryId] = useState("0");
  const axiosPrivate = useAxiosPrivate();
  const categories = [];
  const role = localStorage.getItem("role");
  const [editing, setEditing] = useState(false);
  const [categoryName, setCategoryName] = useState();

  useEffect(() => {
    const getArticle = async () => {
      const response = await axiosPrivate.get(`/getArticles/${id}`);
      if (response.data["status"] === "success") {
        const article = response.data["articles"][0];
        setTitle(article.title);
        setContent(article.content);
        setCategoryId(article["category_id"]);
        const categoryResponse = await axiosPrivate.get(
          "/getCategories/" + categoryId
        );
        if (categoryResponse.data["status"] === "success") {
          console.log(categoryResponse);
          setCategoryName(categoryResponse.data["categories"][0]["name"]);
        }
      }
    };
    getArticle();
  }, []);
  return (
    <div className="body">
      <div className="newArticlecontainer">
        <section className="NewArticle">
          <form className="newArticleForm">
            <h1>New Article</h1>
            <label htmlFor="ArticleTitle">Title:</label>
            <input
              disabled
              id="ArticleTitle"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="ArticleBody">Article:</label>
            <textarea
              disabled
              id="ArticleBody"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <select
              disabled
              onChange={(e) => setCategoryId(e.target.value)}
              className="classic"
            >
              <option value={categoryId}>{categoryName}</option>
              {/* {categories ? (
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
              )} */}
            </select>
            {role === "Admin" ? (
              <button className="fancy-button fancy-button-green" type="submit">
                Edit
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
