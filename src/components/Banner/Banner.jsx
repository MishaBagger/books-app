import Image from 'next/image'

export default function Banner() {
    return (
        <div className="banner">
            <Image
            className='banner__image'
                src={'/banner.png'}
                fill
                priority
                quality={85}
                sizes="100vw"
                alt="banner"
            ></Image>
        </div>
    )
}
