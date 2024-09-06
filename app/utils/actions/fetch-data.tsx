'use server'

export const fetchMovie = async ({ title, year }: { title: string, year: number }) => {
    let optionalParam = ''
    optionalParam += year > 0 ? `&y=${year}` : ''
    const response = await fetch(`https://www.omdbapi.com/?&apikey=${process.env.APIKEY}&t=${title}${optionalParam}`)
    return response.json()
}

export async function handleSubmit(prevState: any, formData: FormData) {

    const fields = {
        title: String(formData.get('title')),
        year: Number(formData.get('year')),
    }

    if (fields.title) {
        const response = await fetchMovie(fields)

        return {
            ...prevState,
            data: response
        }
    }
}