'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'
import { useActions } from '@/hooks/useActions'
import useDebounce from '@/hooks/useDebounce'
import BookLoader from './BookLoader'
import { motion } from 'framer-motion'
import useBooks from '@/hooks/useBooks'
import { useGetApiQuery } from '@/lib/api/api'

export default function Books() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortType, setSortType] = useState('date')
    const { filteredBooks } = useSelector((state) => state.books)

    useGetApiQuery(undefined, {skip: typeof window === 'undefined'})

    const { searchBooks, sortBooks } = useActions()
    const debouncedSearch = useDebounce(searchBooks, 300)
    const stableDebouncedSearch = useMemo(
        () => debouncedSearch,
        [debouncedSearch]
    )

    const { isLoading, isError } = useBooks(true)

    const stableSort = useCallback((type) => sortBooks(type), [sortBooks])

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
        <section className="books" id="books">
            <motion.h2
                className="title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Мои книги
            </motion.h2>
            <motion.div
                className="books__filters"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
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
            </motion.div>

            <div className="books__container">
                {isLoading ? <BookLoader /> : renderedBooks}
            </div>
            <div className="books__next">
                <button className="books__next__button">Загрузить ещё</button>
            </div>
        </section>
    )
}
