import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <nav className="header__container">
                <Link href={'/'} className="link">Главная</Link>
                <Link href={'#about'} className="link">Обо мне</Link>
                <Link href={'#stories'} className="link">Рассказы</Link>
                <Link href={'#read'} className="link">Читать</Link>
            </nav>
        </header>
    )
}
