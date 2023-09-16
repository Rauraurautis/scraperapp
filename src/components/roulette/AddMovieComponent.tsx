import { Movie } from '../../lib/types'
import { movieSchema } from '../../lib/zod/movieSchema'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

interface addMovieComponentProps {
    setData: Dispatch<SetStateAction<Movie[]>>
    data: Movie[]
}

const AddMovieComponent: FC<addMovieComponentProps> = ({ setData, data }) => {
    const [currentOption, setCurrentOption] = useState({ option: "" })

    useEffect(() => {
        const storageMovies = JSON.parse(localStorage.getItem("movies") || "[]")
        if (Array.isArray(storageMovies)) {
            setData(prev => [...storageMovies, { option: currentOption.option }])
        }
    }, [currentOption])

    const addMovie = () => {
        const validation = movieSchema.safeParse(currentOption)
        if (validation.success) {
            window.localStorage.setItem("movies", JSON.stringify([...data.slice(0, data.length - 1), currentOption]))
            setCurrentOption(prev => ({ option: "" }))
        } else {
            console.error("Error: " + validation.error.message)
        }
    }

    const clearMovies = () => {
        setCurrentOption(prev => ({ option: "" }))
        setData(prev => [currentOption])
        window.localStorage.setItem("movies", JSON.stringify([]))
    }

    return <div className="flex flex-col justify-between h-[100px] items-center">
        <input type="text" className="bg-slate-600 p-1" onChange={(e) => setCurrentOption(prev => ({ option: e.target.value }))} value={currentOption.option} />
        <div className="flex gap-5">
            <button className="p-3 bg-blue-900 rounded-xl hover:scale-110 transition-all max-w-fit" onClick={() => addMovie()}>Lisää elokuva</button>
            <button className="p-3 bg-blue-900 rounded-xl hover:scale-110 transition-all max-w-fit" onClick={() => clearMovies()}>Tyhjennä</button>
        </div>
    </div>
}

export default AddMovieComponent