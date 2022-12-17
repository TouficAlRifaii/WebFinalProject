import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import OverLayer from "./components/OverLayer";
import Register from "./components/Register";
import TextEditor from "./components/TextEditor";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Users from "./components/Users";
import PersistLogin from "./components/PersistLogin";
import Categories from "./components/Categories";
import CreateCategory from "./components/CreateCategory";
import UpdateCategory from "./components/UpdateCategory";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import NewArticle from "./components/NewArticle";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["Admin", "User"]} />}>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/article/:id" element={<ArticlePage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route exact path="/article" element={<NewArticle />} />
              <Route path="/users" element={<Users />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/createCategory" element={<CreateCategory />} />
              <Route path="/updateCategory/:id" element={<UpdateCategory />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
