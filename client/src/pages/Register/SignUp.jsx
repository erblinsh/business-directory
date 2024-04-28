import { useState } from "react";
import {  useRegisterUserMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setRegisterUser } from "../../redux/slices/userAuthSlice";
import '../../styles/login.css'
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [registerUser] = useRegisterUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInput = {
        username,
        name,
        password,
        role: "user"
    };
    
    const loginThisUser = async (e) => {
        e.preventDefault();

        const response = await registerUser(userInput);
        
        response.error && setIsError(true);

        if(!response.error) {
            dispatch(setRegisterUser(response.data.user))

            navigate('/login')
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <form action="#" className="d-flex align-items-center justify-content-center flex-column login-form">
                <h1>Sign up</h1>
                <input className="my-3" type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                <input className="mb-3" type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
                <input className="mb-4" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                {isError && <span className="my-1">Invalid username or password</span>}
                <button className="mb-3" onClick={loginThisUser}>Click</button>

                <Link to="/login">Go to login</Link>
            </form>
        </div>
    );
};