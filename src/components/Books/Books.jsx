import { books } from '@/data/books'
import Book from './Book'

export default function Books() {
    return (
        <section className="books">
            <h1 className="title">Мои книги</h1>
            <div className="books__container">
                {books.map((book) => (
                    <Book key={book.name} book={book}/>
                ))}
            </div>
        </section>
    )
}
