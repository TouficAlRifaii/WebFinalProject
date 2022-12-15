import Button from "./Button";

function OverLayer({ direction }) {
  return (
    <div className="overlayContainer">
      <div className="overlay">
        {direction ==="left" ? 
        <div className="overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected login with your personal info</p>
            <Button type="Login" selector="overlayer-Login" />
        </div>    
    :
    <div className="overlay-right">
            <h1>Hello There</h1>
            <p>Create an Account to start your journey with us</p>
            <Button type="SignUp" selector="overlayer-SignUp" />
        </div> 
    }
      </div>
    </div>
  );
}
export default OverLayer;