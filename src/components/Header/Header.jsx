'use client'
import React, { useEffect, useState } from 'react'
import Mobile from './Mobile'
import NavLinks from './NavLinks'
import { motion } from 'framer-motion'

export default function Header() {
    const [isMobile, setIsMobile] = useState(false)
    const [isModal, setIsModal] = useState(false)

    function showModal(event) {
        event.preventDefault()
        setIsModal((prev) => !prev)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                const viewportWidth =
                    window.visualViewport?.width || window.innerWidth
                setIsMobile(viewportWidth <= 768)
            }

            handleResize()

            window.addEventListener('resize', handleResize)
            window.visualViewport?.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
                window.visualViewport?.removeEventListener(
                    'resize',
                    handleResize
                )
            }
        }
    }, [])

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.classList.toggle('modal', isModal)
        }
    }, [isModal])

    return (
        <motion.header
            className="header"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {isMobile ? (
                <Mobile onClick={showModal} />
            ) : (
                <NavLinks onClick={showModal} />
            )}
        </motion.header>
    )
}
