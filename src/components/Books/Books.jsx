'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'
import { useActions } from '@/hooks/useActions'
import useDebounce from '@/hooks/useDebounce'
import { useGetBooksQuery } from '@/lib/api/books.api'
import BookLoader from './BookLoader'

export default function Books() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortType, setSortType] = useState('date')
    const { filteredBooks } = useSelector((state) => state.books)

    const { data: dataBooks, isError, isLoading } = useGetBooksQuery()

    const { getBooks, searchBooks, sortBooks } = useActions()
    const debouncedSearch = useDebounce(searchBooks, 300)
    const stableDebouncedSearch = useMemo(
        () => debouncedSearch,
        [debouncedSearch]
    )

    const stableSort = useCallback((type) => sortBooks(type), [sortBooks])

    useEffect(() => {
        getBooks(dataBooks)
    }, [])

    useEffect(() => {
        stableSort(sortType)
    }, [sortType, stableSort])

    useEffect(() => {
        stableDebouncedSearch(searchTerm)
        return () => stableDebouncedSearch.cancel?.()
    }, [searchTerm, stableDebouncedSearch])

    const renderedBooks = useMemo(() => {
        return filteredBooks?.length ? (
            filteredBooks.map((book) => <Book key={book.id} book={book} />)
        ) : (
            <p className="text">
                Книги не найдены, возможно они есть на{' '}
                <a
                    href="https://www.litres.ru/author/natalya-kalinina-12456612"
                    className="link link--accent"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Литрес
                </a>
            </p>
        )
    }, [filteredBooks])

    return (
        <section className="books">
            <h2 className="title">Мои книги</h2>
            <div className="books__filters">
                <input
                    type="search"
                    placeholder="Поиск"
                    value={searchTerm}
                    onInput={(e) => setSearchTerm(e.target.value)}
                    aria-label="Поиск книг"
                />
                <select
                    name="books__select"
                    id="books__select"
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    aria-label="Сортировка книг"
                >
                    <option value="date">Сортировать по новым</option>
                    <option value="desc">Сортировать по алфавиту</option>
                </select>
            </div>
            <div className="books__container">
                {isLoading ? <BookLoader /> : renderedBooks}
            </div>
            <div className="books__next">
                <button className="books__next__button">Загрузить ещё</button>
            </div>
        </section>
    )
}
