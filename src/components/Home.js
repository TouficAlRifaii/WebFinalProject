import Feed from "./Feed";

const Home = () => {
    const articles = {};
  return (
    <main className="Home">
      {articles.length ? (
        <Feed articles={articles} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No Articles to display.</p>
      )}
    </main>
  );
};

export default Home;
