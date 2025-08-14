import { Lora, Jost, Prata } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import '../scss/style.css'
import StoreProvider from './StoreProvider'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Main from '@/components/Main/Main'
import Cookie from '@/components/Cookie/Cookie'

const LoraFont = Lora({
    variable: '--font-lora',
    subsets: ['latin'],
    weight: ['400', '500'],
})

const JostFont = Jost({
    variable: '--font-jost',
    subsets: ['latin'],
})

const PrataFont = Prata({
    variable: '--font-prata',
    subsets: ['latin'],
    weight: ['400'],
})

export const metadata = {
    title: 'Рассказы Натальи Калининой',
    description: 'Рассказы Натальи Калининой',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${LoraFont.variable} ${JostFont.variable} ${PrataFont.variable}`}
            >
                <StoreProvider>
                    <Header />
                    <Cookie />
                    <Main>{children}</Main>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        style={{ zIndex: 10000, top: '20%' }}
                    />
                    <Footer />
                </StoreProvider>
            </body>
        </html>
    )
}
