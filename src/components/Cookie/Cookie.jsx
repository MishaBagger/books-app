'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cookie() {
    const [accept, setAccept] = useState(false)

    useEffect(() => {
        setAccept(localStorage.getItem('cookie_accept'))
    }, [accept])

    return (
        !accept && (
            <motion.div
                className="cookie"
                initial={{ opacity: 0, bottom: '5rem'}}
                animate={{ opacity: 1, bottom: '1.5rem'}}
                transition={{ duration: 0.5}}
            >
                <div className="cookie__wrapper">
                    <p className="text">
                        Наш сайт использует файлы cookie для хранения данных. Пользуясь сайтом, вы даете свое
                        согласие с <a href="/Обработка персональных данных.pdf" target='_blank' className='link link--accent link--cookie'>Обработкой персональных данных</a>
                    </p>
                    <span
                        className="link link--accent link--cookie"
                        onClick={(e) => {
                            localStorage.setItem('cookie_accept', true)
                            setAccept(true)
                        }}
                    >
                        Принять
                    </span>
                </div>
            </motion.div>
        )
    )
}
