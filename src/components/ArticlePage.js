import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ArticlePage = () => {
  const { id } = useParams();
  const [article , setArticle] = useState();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(() => {
    const getArticle = async () =>{ 
        const response  = await axiosPrivate.get(`/getArticles/${id}`);
        if(response.data['status'] === "success"){
            setArticle(response.data['articles'][0]);
        }
    }
    getArticle();
  }, [])
  return (
    <main className="articlePage">
      <article className="article">
        {article && (
          <>
            <h2>{article.title}</h2>
            <p className="articleDate">{article.datetime}</p>
            <p className="articleBody">{article.content}</p>
            <button>Edit Article</button>
          </>
        )}
        {!article && (
          <>
            <h2>Article Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default ArticlePage;
