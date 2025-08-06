import { motion } from 'framer-motion'

export default function BookLoader() {
    return (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <div className="books__wrapper" key={index}>
                <motion.div
                    key={index}
                    className="books__wrapper--loader"
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 1,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                    }}
                    
                />
                </div>
            ))}
        </>
    )
}
