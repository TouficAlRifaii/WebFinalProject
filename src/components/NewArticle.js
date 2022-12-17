import { useEffect } from "react";
import { useState } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/newArticle.css";

const NewArticle = ({ handleSubmit }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [categories, setCategories] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get("/getCategories");
        setCategories(response.data["categories"]);
      } catch (error) {
        console.log("error: " + error);
      }

      //   if (response.data["status"] === "success") {
      //     setCategories(response.data["categories"]);
      //     console.log(categories);
      //   }
    };
    getCategories();
  }, []);

  return (
    <div className="body">
      <div className="newArticlecontainer">
        <section className="NewArticle">
          <h1>New Article</h1>
          <form className="newArticleForm" onSubmit={handleSubmit}>
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

            <select className="classic">
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

            <button type="submit">Submit</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default NewArticle;
