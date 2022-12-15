import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import OverLayer from "./components/OverLayer";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <Login/>
      {/* <div className="container" id="main">
        <AuthForm type="Login" />
        <AuthForm type="SignUp" />
        <OverLayer direction="left" />
        <OverLayer direction="right" />
      </div> */}
    </div>
  );
}

export default App;
