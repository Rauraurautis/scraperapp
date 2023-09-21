import { useSearchParams } from 'react-router-dom'
import { Movie } from '../../lib/types'
import { movieSchema } from '../../lib/zod/movieSchema'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

interface addMovieComponentProps {
    setData: Dispatch<SetStateAction<Movie[]>>
    data: Movie[]
}

const AddMovieComponent: FC<addMovieComponentProps> = ({ setData, data }) => {
    const [searchParams, setSearchParams] = useSearchParams({ option: "" })
    const option = searchParams.get("option") ?? ""

    useEffect(() => {
        const storageMovies = JSON.parse(localStorage.getItem("movies") || "[]")
        if (Array.isArray(storageMovies)) {
            setData(prev => [...storageMovies, { option: option }])
        }
    }, [option])

    const addMovie = () => {
        const validation = movieSchema.safeParse(option)
        if (validation.success) {
            window.localStorage.setItem("movies", JSON.stringify([...data.slice(0, data.length - 1), option]))
            setSearchParams(prev => {
                prev.set("option", "")
                return prev
            })
        } else {
            console.error("Error: " + validation.error.message)
        }
    }

    const clearMovies = () => {
        setSearchParams(prev => {
            prev.set("option", "")
            return prev
        })
        setData(prev => [{ option: "" }])
        window.localStorage.setItem("movies", JSON.stringify([]))
    }

    return <div className="flex flex-col justify-between h-[100px] items-center">
        <input type="text" className="bg-slate-600 p-1" onChange={(e) => {
            setSearchParams(prev => {
                prev.set("option", e.target.value)
                return prev
            }, { replace: true })
        }} value={option} />
        <div className="flex gap-5">
            <button className="p-3 bg-blue-900 rounded-xl hover:scale-110 transition-all max-w-fit" onClick={() => addMovie()}>Lisää elokuva</button>
            <button className="p-3 bg-blue-900 rounded-xl hover:scale-110 transition-all max-w-fit" onClick={() => clearMovies()}>Tyhjennä</button>
        </div>
    </div>
}

export default AddMovieComponent