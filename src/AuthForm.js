import Input from "./Input";
import Button from "./Button";
function AuthForm({ type }) {
  return (
    <div className={type}>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>{type === "SignUp" ? "Create Account" : "Welcome Back"}</h1>
        {type === "SignUp" ? <Input type="text" content="name" /> : null}
        <Input type="email" content="email" />
        <Input type="password" content="password" />
        <Button type={type} />
      </form>
      
    </div>
  );
}
export default AuthForm;
