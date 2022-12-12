function Input({ type, content }) {
  return (
    <>
      <label htmlFor={content}></label>
      <input type={type} name={content} placeholder={content} />
    </>
  );
}
export default Input;
