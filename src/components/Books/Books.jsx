'use client'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'
import { books as booksData } from '@/data/books'
import { useActions } from '@/hooks/useActions'

export default function Books() {
    const books = useSelector((state) => state.books)

    const { getBooks } = useActions()

    useEffect(() => {
        getBooks(booksData)
    }, [])

    return (
        <section className="books">
            <h1 className="title">Мои книги</h1>
            <div className="books__container">
                {books.map((book) => (
                    <Book key={book.name} book={book} />
                ))}
            </div>
        </section>
    )
}
