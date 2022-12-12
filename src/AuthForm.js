import Input from "./Input" 
function AuthForm ({ type }){
    
    return(
        <div>
            <form onSubmit={e => e.preventDefault()}>
            
                {type === "SignUp" ? <Input type="text" content="name" /> : null }
                <Input type="email" content="email" />
                <Input type="password" content="password"/>
            </form>
        </div>
    )
}
export default AuthForm