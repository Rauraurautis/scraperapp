"use client"
import { Movie } from '../../lib/types';
import { scrapeJusaMovies } from '../../lib/utils/scraper';
import { FC, useEffect, useState } from 'react'
import AddMovieComponent from './AddMovieComponent';
import Roulettewheel from './Roulettewheel';
import Spinner from '../Spinner';



const Wheel: FC = ({ }) => {
    const [data, setData] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)



    // Sets the movies for the wheel
    useEffect(() => {
        const storageMovies = localStorage.getItem("movies") || "[]"
        const movies: Movie[] = JSON.parse(storageMovies)
        if (movies) {
            movies.length === 0 ? setData(prev => [{ option: "" }]) : setData(prev => movies)
        } else {
            setData(prev => [...prev, { option: "" }])
        }
    }, [])

    // Sets movies when moving in and out of dialog
    useEffect(() => {
        if (data.length > 0) {
            const storageMovies = localStorage.getItem("movies") || "[]"
            const movies: Movie[] = JSON.parse(storageMovies)
            if (movies.length > 0 && !dialog) {
                setData(prev => [...movies])
            }
        }
    }, [dialog])

    const getJusaMovies = () => {
        try {
            setLoading(true)
            scrapeJusaMovies().then(data => {
                setLoading(false)
                setData(data)
                localStorage.setItem("movies", JSON.stringify(data))
            })

        } catch (error) {
            console.error(error)
        }
    }

    if (loading) {
        return <div className="w-[400px] flex mt-5 items-center justify-center min-h-[550px]">
            <Spinner />
        </div>
    }

    return <div className="w-[400px] flex flex-col mt-5 items-center justify-between min-h-[550px]">
        {dialog ? "" : <Roulettewheel data={data} setDialog={setDialog} />}
        {dialog ? <><Roulettewheel data={data} setDialog={setDialog} /><AddMovieComponent setData={setData} data={data} /></> :
            <div className="flex justify-between mt-5 w-full px-5 sm:px-0">
                <button className="p-3 bg-blue-700 rounded-xl hover:scale-110 transition-all" onClick={getJusaMovies}>Letterboxd</button>
                <button className="p-3 bg-blue-700 rounded-xl hover:scale-110 transition-all" onClick={() => setDialog(true)}>Lisää vaihtoehtoja</button>
            </div>}
    </div>

}

export default Wheel