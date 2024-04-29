import { useState } from "react";
import { useLoginUserMutation } from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setLoggedInUser, setUserRole } from "../../redux/slices/userAuthSlice";
import '../../styles/login.css'
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginUser] = useLoginUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInput = {
        username,
        password,
        name: "",
        role: "",
    };
    
    const loginThisUser = async (e) => {
        e.preventDefault();

        const response = await loginUser(userInput);
        const user = response?.data?.result?.user;

        response.error && setIsError(true);


        if(!response.error) {
            localStorage.setItem('token', response.data.result.token)
            dispatch(setLoggedInUser(user));
            dispatch(setUserRole(response?.data?.result?.role));
            
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("user-role", JSON.stringify(response?.data?.result?.role));

            if(response.data.result.role.toLowerCase() === "admin") {
                navigate('/admin')
            } else {
                navigate('/business')
            }
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <form action="#" className="d-flex align-items-center justify-content-center flex-column login-form">
                <h1>Log in</h1>
                <input className="my-3" type="text" placeholder="Enter your username" onChange={e => setUsername(e.target.value)}/>
                <input className="mb-4" type="password" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
                {isError && <span className="my-1">Invalid username or password</span>}
                <button className="mb-3" onClick={loginThisUser}>Log In</button>

                <Link to="/signup">Go to sign up</Link>
            </form>
        </div>
    );
};
