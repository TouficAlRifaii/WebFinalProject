import AuthForm from './AuthForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthForm type="Login" />
      <AuthForm type="SignUp" />
    </div>
  );
}

export default App;
