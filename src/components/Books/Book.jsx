import Image from 'next/image'

export default function Book({ book, getRedirect }) {
    return (
        <div className="books__wrapper">
            <div className="books__top">
                <Image
                    width={303}
                    height={430}
                    priority
                    quality={85}
                    sizes="100vw"
                    src={`${process.env.NEXT_PUBLIC_STATIC_URL}/books/${book.image}`}
                    alt={book.title}
                />
            </div>
            <div className="books__bottom">
                <h3 className="title title--book">{book.title}</h3>
                <p className="text text--book">{book.description}</p>
                <p className="text text--date">
                    Дата написания:{' '}
                    {new Date(book.date).toLocaleDateString('ru-RU')}
                </p>
            </div>

            <div className="books__buy">
                {/* <p className="text text--buy">Купить книгу:</p>
                <div className="books__buy__container"></div> */}
                <a
                    href={book.link}
                    className="link link--book link--buy"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => getRedirect(book.id)}
                >
                    Читать
                </a>
            </div>
        </div>
    )
}
