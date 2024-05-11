export const getResponseQurans = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`)
    const quran = await response.json()
    return quran
}

export const getQuransDetails = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${id}`)
    const detailsQuran = await response.json()
    return detailsQuran
}