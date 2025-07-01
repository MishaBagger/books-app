'use client'
import React, { useEffect, useState } from 'react'
import Mobile from './Mobile'
import NavLinks from './NavLinks'

export default function Header() {
    const [isMobile, setIsMobile] = useState(
        window.visualViewport?.width <= 768 || window.innerWidth <= 768
    )

    const [isModal, setIsModal] = useState(false)

    function showModal(event) {
        event.preventDefault()
        setIsModal((prev) => !prev)
    }

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth =
                window.visualViewport?.width || window.innerWidth
            setIsMobile(viewportWidth <= 768)
        }

        window.addEventListener('resize', handleResize)
        window.visualViewport?.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            window.visualViewport?.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        document.body.classList.toggle('modal', isModal === true)
    }, [showModal])
    return (
        <header className="header">
            {isMobile ? (
                <Mobile onClick={showModal} />
            ) : (
                <NavLinks onClick={showModal} type={'header'}/>
            )}
        </header>
    )
}
