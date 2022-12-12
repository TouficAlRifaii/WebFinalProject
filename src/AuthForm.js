function AuthForm ({ type }){
    
    return(
        <div>
            <form onSubmit={e => e.preventDefault()}>
                if (type=="SignUp"){
                    <Input type="text" content="name" />
                }
                <Input type="email" content="email" />
                <Input type="password" content="password"/>

            </form>
        </div>
    )
}
export default AuthForm