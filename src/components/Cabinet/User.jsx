import { motion } from 'framer-motion'
import Info from './Info'

export default function User({ userData, logout }) {
    return (
        <section className="user">
            <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="title"
            >
                Личный кабинет
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="user__container"
            >
                <Info userData={userData} />
                <button className="user__button" onClick={logout}>
                    Выйти из аккаунта
                </button>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="title"
            >
                Избранное
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text"
            >
                В разработке {';)'}
            </motion.p>
        </section>
    )
}
