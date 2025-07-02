import { useState, useEffect } from 'react'
import NavLinks from './NavLinks'

export default function Mobile({ onClick, type }) {
    const [isOpen, setIsOpen] = useState(false)

    function toggleMenu() {
        setIsOpen((prev) => !prev)
    }

    function hideMenu() {
        setIsOpen(false)
    }

    useEffect(() => {
        document.body.classList.toggle('mobile', isOpen)
    }, [toggleMenu, hideMenu])

    return (
        <div className="mobileMenu" id="mobileMenu">
            <input
                type="checkbox"
                id="burger-toggle"
                checked={isOpen}
                readOnly
            />
            <label
                htmlFor="burger-toggle"
                className={`burger__label`}
                id="burger__label"
                onClick={toggleMenu}
            >
                <span></span>
            </label>
            <div id="mobile" className={isOpen === true ? 'open' : ''}>

                <NavLinks onClick={onClick} toggle={hideMenu} isMobile={true} type={'header'}/>
            </div>
        </div>
    )
}
