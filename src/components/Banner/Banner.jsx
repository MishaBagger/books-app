'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Banner() {
    return (
        <motion.div
            className="banner"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Image
                className="banner__image"
                src={'/banner.png'}
                fill
                priority
                quality={85}
                sizes="100vw"
                alt="banner"
            />
        </motion.div>
    )
}
