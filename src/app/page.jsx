import Banner from '@/components/Banner/Banner'
import About from '@/components/About/About'
import Books from '@/components/Books/Books'
import Read from '@/components/Read/Read'

async function getBooksSSR() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
            next: { revalidate: 3600 },
        })

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        return await res.json()
    } catch (error) {
        console.error('Ошибка получения книг:', error)
        return {
            books: [],
            totalPages: 0,
            currentPage: 0,
        }
    }
}

export default async function Home() {
    const initialBooks = await getBooksSSR()
    return (
        <>
            <Banner />
            <About />
            <Books initialBooks={initialBooks} />
            <Read />
        </>
    )
}
