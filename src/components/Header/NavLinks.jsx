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
                    <Link href={'/'} className="link">
                        Главная
                    </Link>
                    <Link href={'#about'} className="link">
                        Обо мне
                    </Link>
                    <Link href={'#stories'} className="link">
                        Рассказы
                    </Link>
                    <Link href={'#read'} className="link">
                        Читать
                    </Link>
                    <Link href={'/cabinet'} className="link">
                        Кабинет
                    </Link>
                </nav>
            )

        case 'footer':
            return (
                <nav className="nav__links nav__links-footer">
                    <div className="nav__wrapper nav__wrapper-footer">
                        <div className="link__container"></div>
                    </div>
                    <div className="nav__wrapper nav__wrapper-footer">
                        <div className="link__container"></div>
                    </div>{' '}
                </nav>
            )
        default:
            break
    }
}
