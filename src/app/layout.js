import { Lora, Jost, Prata } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastContainer } from 'react-toastify'
import '../scss/style.css'
import StoreProvider from './StoreProvider'
import YandexMetrika from '@/components/Analytics/YandexMetrika'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Main from '@/components/Main/Main'
import Cookie from '@/components/Cookie/Cookie'
import Script from 'next/script'

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
    metadataBase: new URL('https://kniginatka.ru'),
    title: 'Наталья Калинина - книги, романы, повести | Официальный сайт писательницы',
    description:
        'Официальный сайт писательницы Натальи Калининой. Автор романов о любви, повестей и рассказов. Член литературного клуба, лауреат премий. Читайте онлайн или покупайте книги.',
    keywords:
        'Наталья Калинина книги, романы Натальи Калининой, повести Натальи Калининой, рассказы Натальи Калининой, современные романы о любви, любовная проза, женские романы, российские писательницы, книги вологодских авторов, современная русская проза, отечественная литература, романы о отношениях, повести о жизни, рассказы о чувствах, эмоциональные романы, психологическая проза, любовные истории, семейные саги, романтическая проза, драматические романы, книги о женской судьбе, современная проза 2024, новые российские авторы, литературные премии, лауреат премии Ева, издательство Четыре, литературный клуб Творчество и потенциал, купить книги онлайн, читать романы онлайн, отзывы на книги, рецензии на романы, современная любовная литература, проза о внутреннем мире, эмоциональные повести, глубокие рассказы, книги с сюжетом, качественная русская проза',
    authors: [{ name: 'Наталья Калинина' }],
    openGraph: {
        title: 'Наталья Калинина - автор романов о любви и жизни',
        description:
            'Книги Натальи Калининой: романы, повести, рассказы о любви, жизни и отношениях. Лауреат литературных премий.',
        url: 'https://kniginatka.ru',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Наталья Калинина - официальный сайт',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Наталья Калинина - автор книг',
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'jVwUKmIrus5N14LgfKlxkIsTJa_0Bg1Wr0nsdYG8PM8',
        yandex: '9ffd61c61a217c61',
    },
    manifest: 'https://kniginatka.ru/manifest.json',
}

const jsonLdData = [
    // Сущность WebSite
    {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Наталья Калинина - официальный сайт писательницы',
        url: 'https://kniginatka.ru',
        description:
            'Официальный сайт писательницы Натальи Калининой. Автор романов о любви, повестей и рассказов. Член литературного клуба, лауреат премий.',
        keywords:
            'Наталья Калинина книги, романы Натальи Калининой, повести Натальи Калининой, рассказы Натальи Калининой, современные романы о любви, любовная проза, женские романы, российские писательницы, книги вологодских авторов, современная русская проза, отечественная литература, романы о отношениях, повести о жизни, рассказы о чувствах, эмоциональные романы, психологическая проза, любовные истории, семейные саги, романтическая проза, драматические романы, книги о женской судьбе, современная проза 2024, новые российские авторы, литературные премии, лауреат премии Ева, издательство Четыре, литературный клуб Творчество и потенциал, купить книги онлайн, читать романы онлайн, отзывы на книги, рецензии на романы, современная любовная литература, проза о внутреннем мире, эмоциональные повести, глубокие рассказы, книги с сюжетом, качественная русская проза',
        // "potentialAction": {
        //   "@type": "SearchAction",
        //   "target": "https://kniginatka.ru/?q={search_term_string}",
        //   "query-input": "required name=search_term_string"
        // },
        publisher: {
            '@type': 'Organization',
            name: 'Издательство Четыре',
        },
    },

    // Отдельная сущность Person
    {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Наталья Калинина',
        url: 'https://kniginatka.ru',
        description:
            'Российская писательница, автор романов о любви, повестей и рассказов. Лауреат литературных премий.',
        award: 'Лауреат премии Ева',
        memberOf: {
            '@type': 'Organization',
            name: "Литературный клуб 'Творчество и потенциал'",
        },
        sameAs: [
            'https://vk.com/kalininanatal',
            'https://www.ozon.ru/person/kalinina-nataliya-evgenevna-140331405/category/knigi-16500',
            'https://www.litres.ru/author/natalya-kalinina-12456612',
            'https://bookz.ru/authors/natalya-kalinina-12456612',
            'https://litportal.ru/avtory/natalya-kalinina-12456612',
        ],
        knowsAbout: [
            'литература',
            'романы о любви',
            'современная проза',
            'писательское мастерство',
        ],
    },
]

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
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
                <YandexMetrika ymId="103803045" />
                <GoogleAnalytics gaId="G-ZZG358W58B" />
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(jsonLdData),
                    }}
                    strategy='afterInteractive'
                />
            </body>
        </html>
    )
}
