export default function SelectBook({ setId, books }) {
    return (
        <select
            className="admin__form--select"
            defaultValue={'DEFAULT'}
            onChange={(e) => setId(e.target.value)}
        >
            <option value="DEFAULT" disabled>
                Выберите
            </option>
            {books &&
                books.map((books) => (
                    <option key={books.id} value={books.id}>
                        #{books.id}
                        {': '}
                        {books.title}
                    </option>
                ))}
        </select>
    )
}
