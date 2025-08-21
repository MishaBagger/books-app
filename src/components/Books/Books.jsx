'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import Book from './Book'
import { useActions } from '@/hooks/useActions'
import useDebounce from '@/hooks/useDebounce'
import { motion } from 'framer-motion'
import { useGetApiQuery, useLazyGetRedirectQuery } from '@/lib/api/api'
import { useLoadMoreBooksQuery } from '@/lib/api/books.api'

export default function Books({ initialBooks }) {
    const [page, setPage] = useState(initialBooks.currentPage)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortType, setSortType] = useState('date')
    const [isHydrated, setIsHydrated] = useState(false)
    const { filteredBooks } = useSelector((state) => state.books)

    const { data } = useLoadMoreBooksQuery(page, { skip: page === 1 })

    function loadMore() {
        if (page < initialBooks.totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        if (data && page > 1) {
            loadMoreBooks(data)
        }
    }, [data])

    // Метрики посещений
    useGetApiQuery(undefined, { skip: typeof window === 'undefined' })
    const [getRedirect] = useLazyGetRedirectQuery()

    const { searchBooks, sortBooks, getBooks, loadMoreBooks } = useActions()
    const debouncedSearch = useDebounce(searchBooks, 300)
    const stableDebouncedSearch = useMemo(
        () => debouncedSearch,
        [debouncedSearch]
    )

    const stableSort = useCallback((type) => sortBooks(type), [sortBooks])

    useEffect(() => {
        stableSort(sortType)
    }, [sortType, stableSort])

    useEffect(() => {
        stableDebouncedSearch(searchTerm)
        return () => stableDebouncedSearch.cancel?.()
    }, [searchTerm, stableDebouncedSearch])

    useEffect(() => {
        if (initialBooks) {
            getBooks(initialBooks)
        }
        setIsHydrated(true)
    }, [])

    const booksToRender = useMemo(() => {
        // Для SEO и первого рендера используем initialBooks
        if (!isHydrated && initialBooks) {
            return initialBooks.books
        }
        // После гидрации используем данные из Redux
        return filteredBooks
    }, [filteredBooks, initialBooks, isHydrated])

    const renderedBooks = useMemo(() => {
        return booksToRender?.length ? (
            booksToRender.map((book) => (
                <Book key={book.id} book={book} getRedirect={getRedirect} />
            ))
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

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="books__container"
            >
                {renderedBooks}
            </motion.div>
            <div className="books__next">
                <motion.button
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="books__next__button"
                    onClick={loadMore}
                    disabled={page === initialBooks.totalPages}
                >
                    Загрузить ещё
                </motion.button>
            </div>
        </section>
    )
}
