import Header from '@/components/Header/Header'
import Banner from '@/components/Banner/Banner'
import Main from '@/components/Main/Main'
import About from '@/components/About/About'
import Books from '@/components/Books/Books'

export default function Home() {
    return (
        <>
            <Header />
            <Main>
                <Banner />
                <About />
                <Books/>
            </Main>
        </>
    )
}
