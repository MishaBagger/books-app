'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'
import { books as booksData } from '@/data/books'
import { useActions } from '@/hooks/useActions'
import useDebounce from '@/hooks/useDebounce'

export default function Books() {
    const [searchTerm, setSearchTerm] = useState('')
    const { filteredBooks } = useSelector((state) => state.books)
    const { getBooks, searchBooks, sortBooks } = useActions()
    const debouncedSearch = useDebounce(searchBooks, 300)

    useEffect(() => {
        getBooks(booksData)
    }, [])

    useEffect(() => {
        debouncedSearch(searchTerm)
    }, [searchTerm])

    return (
        <section className="books">
            <h1 className="title">Мои книги</h1>
            <div className="books__filters">
                <input
                    type="search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    name="books__select"
                    id="books__select"
                    defaultValue={'date'}
                    onChange={(e) => sortBooks(e.target.value)}
                >
                    <option value="date">Сортировать по новым</option>
                    <option value="desc">Сортировать по алфавиту</option>
                </select>
            </div>
            <div className="books__container">
                {filteredBooks.length > 0 
                ? (filteredBooks.map(book => <Book key={book.name} book={book} />
                    )
                ) : (
                    <p className="text">
                        Книги не найдены, возможно они есть на{' '}
                        <a
                            href="https://www.litres.ru/author/natalya-kalinina-12456612"
                            className="link link--found"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Литрес</a>
                    </p>
                )}
            </div>
        </section>
    )
}
