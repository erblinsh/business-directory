import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/slices/userAuthSlice";
import { useNavigate } from "react-router-dom";
import userImg from '../../assets/user-profile-img.png'
import '../../styles/logout.css'

export const Logout = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("user-role")
        localStorage.removeItem("token")

        navigate('/login')
        dispatch(setLogout()); 
    }
    
    return (
        <div className="d-flex align-items-center justify-content-center flex-column profile-container">
            <img src={userImg} alt="profile" className="user-profile-img"/>
            <h2>{user?.userName}</h2>
            <button className="btn btn-danger" onClick={logout}>Log out</button>
        </div>
    )
}