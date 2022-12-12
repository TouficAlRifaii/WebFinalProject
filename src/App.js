import AuthForm from './AuthForm';
import OverLayer from './OverLayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthForm type="Login" />
      <AuthForm type="SignUp" />
      <OverLayer direction="left" />
      <OverLayer direction="right" />
    </div>
  );
}

export default App;
