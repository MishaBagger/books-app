import { useCreateBookMutation } from '@/lib/api/books.api'
import { useState } from 'react'

const defaultValue = {
    name: '',
    description: '',
    links: '',
    image: '',
    date: '',
}

export default function CreateBook() {
    const [book, setBook] = useState(defaultValue)

    const [createBook] = useCreateBookMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        createBook(book).then(() => {
            setBook(defaultValue)
        })
    }

    return <button onClick={handleSubmit}>Добавить</button>
}
