import Banner from '@/components/Banner/Banner'
import About from '@/components/About/About'
import Books from '@/components/Books/Books'
import Read from '@/components/Read/Read'

export default async function Home() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
    const initialBooks = await res.json()
    return (
        <>
            <Banner />
            <About />
            <Books initialBooks={initialBooks}/>
            <Read />
        </>
    )
}
