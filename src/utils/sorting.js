export default function sorting(state) {
    if (!state.filteredBooks || !state.allBooks) return
    switch (state.sortType) {
        case 'date':
            state.filteredBooks = [...state.filteredBooks].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )
            break

        case 'desc':
            state.filteredBooks = [...state.filteredBooks].sort((a, b) =>
                a.title.localeCompare(b.title, 'ru', {
                    sensitivity: 'base',
                })
            )
            break

        default:
            state.filteredBooks = [...state.allBooks]
            break
    }
}
