import Input from "./Input" 
function AuthForm ({ type }){
    
    return(
        <div>
            <h1>{type === "SignUp" ? "Create Account" : "Welcome Back"}</h1>
            <form onSubmit={e => e.preventDefault()}>
            
                {type === "SignUp" ? <Input type="text" content="name" /> : null }
                <Input type="email" content="email" />
                <Input type="password" content="password"/>
            </form>
            <Button type={type} />
        </div>
    )
}
export default AuthForm