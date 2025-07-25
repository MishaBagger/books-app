import Link from 'next/link'

export default function NavLinks({
    type = 'header',
    onClick,
    toggle,
    isMobile = false,
}) {
    switch (type) {
        case 'header':
            return (
                <nav
                    className={
                        isMobile
                            ? 'nav__links nav__links-mobile'
                            : 'header__container'
                    }
                >
                    <Link href={'/'} className="link link--nav">
                        Главная
                    </Link>
                    <Link href={'#about'} className="link link--nav">
                        Обо мне
                    </Link>
                    <Link href={'#books'} className="link link--nav">
                        Книги
                    </Link>
                    <Link href={'#read'} className="link link--nav">
                        Читать
                    </Link>
                    <Link href={'/cabinet'} className="link link--nav">
                        Кабинет
                    </Link>
                </nav>
            )

        case 'footer':
            return (
                <nav className="footer__nav">
                    <Link href={'/'} className="link link--nav">
                        Главная
                    </Link>
                    <Link href={'#about'} className="link link--nav">
                        Обо мне
                    </Link>
                    <Link href={'#books'} className="link link--nav">
                        Книги
                    </Link>
                    <Link href={'#read'} className="link link--nav">
                        Читать
                    </Link>
                    <Link href={'/cabinet'} className="link link--nav">
                        Кабинет
                    </Link>
                </nav>
            )
        default:
            break
    }
}
