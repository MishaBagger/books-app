'use client'

import { motion } from 'framer-motion'

export default function BookLoader() {
    return (
        <>

            {Array.from({ length: 5 }).map((_, index) => (
                <div className="books__wrapper" key={index}>
                    <div className="books__top">
                        <motion.div
                            className="loader loader--img"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: 1,
                                ease: 'linear',
                                delay: index * 0.2,
                            }}
                        />
                    </div>

                    <div className="books__bottom">
                        <motion.div
                            className="loader loader--title"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: 1,
                                delay: 0.2,
                            }}
                        />
                        <motion.div
                            className="loader loader--big-text"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: 1,
                                delay: 0.3,
                            }}
                        />
                        <motion.div
                            className="loader loader--text loader--date"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: 1,
                                delay: 0.4,
                            }}
                        />
                    </div>

                    <div className="books__buy">
                        <motion.a
                            className="loader loader--button"
                            initial={{ opacity: 0.3 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: 'reverse',
                                duration: 1,
                                delay: 0.5,
                            }}
                        />
                        
                    </div>
                </div>
            ))}
        </>
    )
}
