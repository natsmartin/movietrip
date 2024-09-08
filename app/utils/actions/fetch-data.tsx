'use server'

export const fetchMovie = async ({ title, year }: { title: string | null, year: number }) => {
    let optionalParam = ''
    optionalParam += year > 0 ? `&y=${year}` : ''
    const response = await fetch(`https://www.omdbapi.com/?&apikey=${process.env.APIKEY}&t=${title}${optionalParam}`)
    return response.json()
}

export async function handleSubmit(prevState: any, formData: FormData) {

    const fields = {
        title: formData.get('title'),
        year: Number(formData.get('year')),
    }

    return {
        ...prevState,
        data: fields
    }

}