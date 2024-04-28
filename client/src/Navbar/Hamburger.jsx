export const Hamburger = ({hamburgerActive, handleHamburgerActive}) => {
    return (
        <ul onClick={handleHamburgerActive} className={`m-0 hamburger ${hamburgerActive ? "hamburger-active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
        </ul>
    )
}