import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import OverLayer from "./components/OverLayer";
import Register from "./components/Register";

function App() {
  
  return (
    <div className="App">
      {/* <Register /> */}
      {/* <Login/> */}
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
