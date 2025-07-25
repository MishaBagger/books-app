import Header from '@/components/Header/Header'
import Banner from '@/components/Banner/Banner'
import Main from '@/components/Main/Main'
import About from '@/components/About/About'
import Books from '@/components/Books/Books'
import Read from '@/components/Read/Read'
import Footer from '@/components/Footer/Footer'

export default function Home() {
    return (
        <>
            <Header />
            <Main>
                <Banner />
                <About />
                <Books />
                <Read />
            </Main>
            <Footer />
        </>
    )
}
