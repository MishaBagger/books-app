import Link from 'next/link'

export default function NavLinks({
    type = 'header',
    onClick,
    toggle,
    isMobile = false,
}) {
    if (type === 'header') {
        return (
            <nav
                className={
                    isMobile
                        ? 'nav__links nav__links-mobile'
                        : 'header__container'
                }
            >
                <Link href={'/'} className="link" >
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
            </nav>
        )
    } else if (type === 'footer') {
        return (
            <nav className="nav__links nav__links-footer">
                <div className="nav__test nav__test-footer">
                    <div className="link__container"></div>
                </div>
                <div className="nav__test nav__test-footer">
                    <div className="link__container"></div>
                </div>{' '}
            </nav>
        )
    }
}
