import AuthForm from "./components/AuthForm";
import Login from "./Login";
import OverLayer from "./OverLayer";
import Register from "./Register";

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
