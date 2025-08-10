export default function formDataCreating (data) {
    const formData = new FormData()

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, key === 'image' ? value[0] : value)
    }
    return formData
}
