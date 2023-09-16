import { useEffect, useState } from 'react';
import { scrapeToriAxios } from '../../lib/utils/scraper';
import Item from './Item';
import notification from "../../notification.mp3"
import { isMobile } from 'react-device-detect';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';

export interface ItemInfo {
    item: string
    link: string
    image: string | null
    color: string
}

const audio = new Audio(notification)

function ToriComponent() {
    const [items, setItems] = useState<ItemInfo[]>([])
    const [highlightedItem, setHighlightedItem] = useState<ItemInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [sound, setSound] = useState(false)

    useEffect(() => {
        setLoading(true)
        scrapeToriAxios(15).then(data => {
            data = data.map((data) => { return { ...data, color: "white " } })
            setLoading(false)
            setItems(prev => data)
        })
    }, [])


    useEffect(() => {
        if (loading) return

        let interval = setInterval(() => {
            scrapeToriAxios(15).then(data => {
                if (!data) return

                if (data[0].item !== items[0].item) {
                    data = data.map((movie, i) => {
                        return !items.some(item => item.item === movie.item) ? { ...movie, color: "green" } : { ...movie }
                    })
                    if (sound) audio.play()
                    setItems(prev => data)
                }
            }).catch(error => {
                console.error(error)
            })
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [items, sound])



    return (
        <>
            <div className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] flex justify-center">
                {isMobile && highlightedItem?.image ?
                    <div className="flex flex-col justify-center items-center">
                        <img className="relative" src={highlightedItem.image ?? ""} />
                        <a className="text-white py-3 text-xl" href={highlightedItem.link}>Go to product</a>
                    </div> : highlightedItem?.image ?
                        <img className="relative top-0" src={highlightedItem.image ?? ""} /> : <h1 className="text-white text-center text-3xl md:text-7xl absolute top-2">Tori annetaan-scraper beta</h1>}

            </div>

            {items.length > 0 ? <ul className=" bg-slate-800 max-h-[50%] w-fit overflow-y-scroll overflow-x-hidden flex flex-col items-center rounded-xl">
                {items.map((item, i) => (
                    <Item item={item} index={i} setHighlightedItem={setHighlightedItem} key={i} />
                )
                )} </ul> : <div className="absolute  w-[200px] flex justify-center mb-2"><Spinner /></div> }
            <button onClick={() => setSound(prev => !prev)} className={`${sound ? "brightness-100" : "brightness-50"} scale-150 text-white p-3`}>📢 Sound {sound ? "on" : "off"}</button>
            <Link to={"/roulette"}>Roulette</Link>
        </>
    );
}

export default ToriComponent