import { read } from '@/data/read'

export default function Read() {
    return (
        <section className="read">
            <h2 className="title">Читать</h2>
            <div className="read__container">
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
                    ])} и многие другие. Каждое произведение - это частичка моей
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
            </div>
        </section>
    )
}
