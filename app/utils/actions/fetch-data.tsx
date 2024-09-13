'use server'

export const fetchMovie = async ({ title, year }: { title: FormDataEntryValue | null , year: number }) => {
    let optionalParam = ''
    optionalParam += year > 0 ? `&y=${year}` : ''
    const response = await fetch(`https://www.omdbapi.com/?&apikey=${process.env.APIKEY}&t=${title}${optionalParam}`)
    return response.json()
}