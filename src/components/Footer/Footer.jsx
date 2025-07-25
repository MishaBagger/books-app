import { contacts } from '@/data/contacts'
import NavLinks from '../Header/NavLinks'

export default function Footer() {
    return (
        <footer className="footer">
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
        </footer>
    )
}
