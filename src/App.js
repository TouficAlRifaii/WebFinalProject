import AuthForm from "./AuthForm";
import OverLayer from "./OverLayer";

function App() {
  return (
    <div className="App">
      <div className="container" id="main">
        <AuthForm type="Login" />
        <AuthForm type="SignUp" />
        <OverLayer direction="left" />
        <OverLayer direction="right" />
      </div>
    </div>
  );
}

export default App;
