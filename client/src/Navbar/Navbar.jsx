import './Navbar.css'
import logo from '../assets/logo.png'
import { useState } from "react"
import { Links } from "./Links"
import { Hamburger } from "./Hamburger"

export const Navbar = () => {
    const [hamburgerActive, setHamburgerActive] = useState(false);

    const handleHamburgerActive = () => {
        setHamburgerActive(!hamburgerActive);
    }

    return (
        <nav className={`navbar ${hamburgerActive ? "navbar-active" : ""}`}>
            <img className="nav-logo m-0" src={logo} alt="Business-Directory" />

            <Links hamburgerActive={hamburgerActive} setHamburgerActive={setHamburgerActive}/>
            <Hamburger hamburgerActive={hamburgerActive} handleHamburgerActive={handleHamburgerActive}/>
           
        </nav>
    )
}
