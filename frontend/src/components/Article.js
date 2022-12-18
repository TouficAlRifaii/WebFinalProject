import { Link } from "react-router-dom";

const Article = ({ article }) => {
  return (
    <article className="article">
      <Link to={`/article/${article.id}`}>
        <h2>{article.title}</h2>
        <p className="articleDate">{article.updated_at}</p>
      </Link>
    </article>
    
  );
};

export default Article;
