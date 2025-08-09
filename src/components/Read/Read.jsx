'use client'
import { read } from '@/data/read'
import { motion } from 'framer-motion'

export default function Read() {
    return (
        <section className="read" id="read">
            <motion.h2
                className="title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Читать
            </motion.h2>
            <motion.div
                className="read__container"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <p className="text text--first">Дорогие читатели!</p>

                <p className="text text--about">
                    Я с огромным удовольствием приглашаю вас окунуться в
                    увлекательный мир моих литературных произведений. Мои
                    романы, повести и рассказы доступны для чтения на самых
                    популярных книжных площадках, включая такие известные
                    ресурсы как{' '}
                    {read.map((link, index) => [
                        index > 0 && ', ',
                        <a
                            key={link.name}
                            href={link.url}
                            className="link link--accent link--read"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.name}
                        </a>,
                    ])}{' '}
                    и многие другие. Каждое произведение - это частичка моей
                    души, результат кропотливой работы и творческих исканий.
                </p>
                <p className="text text--about">
                    Особенно ценны для меня ваши отзывы и рецензии - они
                    помогают мне расти как автору и лучше понимать читательские
                    предпочтения. Не стесняйтесь делиться своими впечатлениями,
                    мыслями и эмоциями после прочтения. Ваше мнение чрезвычайно
                    важно для меня! Я внимательно изучаю все отклики и с
                    нетерпением жду новых.
                </p>
            </motion.div>
        </section>
    )
}
