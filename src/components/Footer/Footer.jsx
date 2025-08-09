'use client'
import { contacts } from '@/data/contacts'
import NavLinks from '../Header/NavLinks'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <div className="footer__container">
                <NavLinks type="footer" />
                <div className="footer__contacts">
                    {contacts.map((contact) => (
                        <a
                            key={contact.name}
                            href={contact.url}
                            className="link link--nav"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {contact.name}
                        </a>
                    ))}
                </div>
            </div>
            <p className="text text--copy">© Все права защищены. 2025 год</p>
        </motion.footer>
    )
}
