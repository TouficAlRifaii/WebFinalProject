import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import OverLayer from "./components/OverLayer";
import Register from "./components/Register";
import TextEditor from "./components/TextEditor";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import useRefreshToken from "./hooks/useRefreshTokens";
import Users from "./components/Users";
import PersistLogin from "./components/PersistLogin";
import Categories from "./components/Categories";
import CreateCategory from "./components/CreateCategory";
import UpdateCategory from "./components/UpdateCategory";

function App() {
  const refresh = useRefreshToken();
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <Login/> */}

      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route exact path="/" element={<TextEditor />}></Route>
              <Route path="/users" element={<Users />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/createCategory" element={<CreateCategory />} />
              <Route path="/updateCategory/:id" element={<UpdateCategory />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Routes>
      </Router>
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  );
}

export default App;
