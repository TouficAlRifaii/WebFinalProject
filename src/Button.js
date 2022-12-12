function Button({type , selector}){
    return(
        <>
        <button className={selector}>{type}</button>
        </>
    )
}
export default Button;