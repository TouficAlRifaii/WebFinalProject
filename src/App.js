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

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <Login/> */}

      <Router>
        <Navbar />
        <div className="body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
        </div>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route exact path="/" element={<TextEditor />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
