import { useBooks } from '@/hooks/useBooks'

export default function Book({ book }) {
    return (
        <div className="books__wrapper">
            <div className="books__top">
                <img src={book.image} alt={book.name} />
            </div>
            <div className="books__bottom">
                <h3 className="title title--book">{book.name}</h3>
                <p className="text text--book">{book.description}</p>
                <p className="text text--buy">Купить книгу:</p>
                <div className="books__buy">
                    {useBooks(book.links).map(({ platform, url, displayName }) => (
                        <a
                            key={platform}
                            href={url}
                            className="link link--book"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {displayName}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
