import {
  Route,
  Routes,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import OverLayer from "./components/OverLayer";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* <Register /> */}
      {/* <Login/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
