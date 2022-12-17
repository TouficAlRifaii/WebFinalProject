import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Feed from "./Feed";
import "../styles/home.css"

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const [articles, setArticles] = useState();

  useEffect(() => {
    const getArticles = async () => {
      const response = await axiosPrivate.get("/getArticles");
      console.log(response);
      if (response.data["status"] === "success") {
        setArticles(response.data["articles"]);
      }
    };
    getArticles();
  }, []);
  return (
    <div className="HomeContainer">
        <main className="Home">
      {articles ? (
        <Feed articles={articles} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No Articles to display.</p>
      )}
    </main>

    </div>
    
  );
};

export default Home;
