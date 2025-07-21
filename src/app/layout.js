import { Lora, Jost, Prata } from 'next/font/google'
import '../scss/style.css'
import StoreProvider from './StoreProvider'

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
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    )
}
