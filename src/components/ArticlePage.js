import { useParams, Link } from "react-router-dom";

const ArticlePage = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((article) => article.id.toString() === id);
  return (
    <main className="articlePage">
      <article className="article">
        {article && (
          <>
            <h2>{article.title}</h2>
            <p className="articleDate">{article.datetime}</p>
            <p className="articleBody">{article.body}</p>
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
