import Image from 'next/image'

export default function About() {
    return (
        <section className="about">
            <h2 className="title">Обо мне</h2>
            <div className="about__container">
                <div className="about__text">
                    <p className="text text--about">
                        Меня зовут Наталья Калинина и свой первый роман «Только
                        вперёд» я написала в 2006 году и с тех пор продолжила свой
                        путь и совершенствовала произведения.
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
                </div>

                <div className="about__image">
                    <Image
                        src={'/about.jpg'}
                        width={500}
                        height={500}
                        priority
                        quality={85}
                        sizes="100vw"
                        alt="banner"
                    />
                </div>
            </div>
        </section>
    )
}
