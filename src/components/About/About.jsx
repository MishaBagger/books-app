'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <section className="about" id="about">
            <motion.h2
                className="title"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                Обо мне
            </motion.h2>

            <div className="about__container">
                <motion.div
                    className="about__text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text text--about">
                        Меня зовут Наталья Калинина и свой первый роман «Только
                        вперёд» я написала в 2006 году и с тех пор продолжила
                        свой путь и совершенствовала произведения.
                    </p>
                    <p className="text text--about">
                        С февраля 2024 года являюсь членом литературного клуба
                        «Творчество и потенциал» издательства «Четыре».
                    </p>
                    <p className="text text--about">
                        В 2024 году написала и опубликовала в разных печатных
                        изданиях более 40 рассказов.
                    </p>
                    <p className="text text--about">
                        Награждена более, чем 10 орденами, знаками и медалями.
                        Участвовала во многих конкурсах и номинациях, различных
                        союзах.
                    </p>
                    <p className="text text--about">
                        Мои произведения попадали в популярные лонг-листы и
                        шорт-листы.
                    </p>
                </motion.div>

                <motion.div
                    className="about__image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src={'/about.jpg'}
                        width={500}
                        height={500}
                        priority
                        quality={85}
                        sizes="100vw"
                        alt="banner"
                    />
                </motion.div>
            </div>
        </section>
    )
}
