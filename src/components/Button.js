// const main = document.getElementById("main");
const handleSubmit = (selector) => {
  const main = document.getElementById("main");
  console.log("test");
  if (selector) {
    if (selector === "overlayer-Login") {
      main.classList.remove("right-panel-active");
    } else if (selector === "overlayer-SignUp") {
      main.classList.add("right-panel-active");
    }
  }
};

function Button({ type, selector }) {
  return (
    <>
      <button onClick={handleSubmit.bind(this, selector)} className={selector}>
        {type}
      </button>
    </>
  );
}
export default Button;
