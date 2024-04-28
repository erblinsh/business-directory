import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { darkMode, lightMode } from "../redux/slices/darkModeSlice";
import { IconContext } from "react-icons";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";
import { useEffect, useState } from "react";

export const Links = ({hamburgerActive, setHamburgerActive}) => {  
    const [theme, setTheme] = useState(() => localStorage.getItem('darkMode') === 'true')
    const isUserLoggedIn = useSelector(state => state.userAuthSlice.isLoggedIn)

    const dispatch = useDispatch();

    const handleDark = () => {
        const newTheme = !theme;
        localStorage.setItem('darkMode', newTheme);
        setTheme(newTheme); 
        
        if (newTheme) {
            dispatch(darkMode());
        } else {
            dispatch(lightMode());
        }
    }

    const links = [
        {path: "/", name: "Home", },
        {path: "/business", name: "Business"},
        {path: `${isUserLoggedIn ? "/logout" : "/login"}`, name: `${isUserLoggedIn ? "Log out" : "Log in"}`},
    ]

    const deactivateHamburgerByLink = () => {
        hamburgerActive && setHamburgerActive(false);
    }

    useEffect(() => {
        document.body.classList.toggle('dark-theme', theme);
    }, [theme]);


    return (
        <ul className={`links ${hamburgerActive ? "d-flex" : "links-not-active"} m-0 p-0`}>
            {links.map((link, key) => (
                <Link onClick={deactivateHamburgerByLink} key={key} to={link.path}>
                    {link.name}
                </Link>
            ))}

            <IconContext.Provider value={{ size: "23px" }}>
            {
                theme ? <MdOutlineLightMode onClick={handleDark}/>
                    : <MdOutlineModeNight onClick={handleDark}/>
            }
            </IconContext.Provider>
        </ul>
    )
}