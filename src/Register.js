import { useRef , useState , useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () =>{
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus , setUserFocus] = useState(false);
    
    const [password, setPassword] = useState("");
    const [validPassword, setValidPasword] = useState(false);
    const [passwordFocus , setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState("");
    const [validMatchPassword, setValidMatchPasword] = useState(false);
    const [matchFocus , setMatchFocus] = useState(false);

    
    return (
        <div>

        </div>
    )



}

export default Register; 