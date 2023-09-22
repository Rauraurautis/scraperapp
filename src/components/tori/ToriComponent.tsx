import { useEffect, useState } from 'react';
import { scrapeToriAxios } from '../../lib/utils/scraper';
import Item from './Item';
import notification from "../../notification.mp3"
import { isMobile } from 'react-device-detect';
import Spinner from '../Spinner';
import { getTokenFromUser } from '../../lib/firebase';

export interface ItemInfo {
    item: string
    link: string
    image: string | null
    color: string
}

const audio = new Audio(notification)

function ToriComponent() {
    const [items, setItems] = useState<ItemInfo[]>([])
    const [incomingItems, setIncomingItems] = useState<ItemInfo[]>([])
    const [highlightedItem, setHighlightedItem] = useState<ItemInfo | null>(null)
    const [loading, setLoading] = useState(false)
    const [sound, setSound] = useState(false)


    useEffect(() => {
        const eventSource = new EventSource(`${process.env.NODE_ENV === "development" ? "http://localhost:3005/subscribeAnnetaan" : "https://scraper-4do1.onrender.com/subscribeAnnetaan"}`)

        eventSource.addEventListener('message', (event) => {
            let newData: ItemInfo[] = JSON.parse(event.data).value || [];
            setIncomingItems(prev => newData)

        });

        eventSource.addEventListener('error', (error) => {
            console.error('SSE error:', error);
            eventSource.close();
        });

        eventSource.addEventListener("close", () => {
            eventSource.close()
            console.log("Connection closed")
        })

        return () => {
            console.log("closing")
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        if (items.length === 0) {
            setItems(prev => incomingItems)
            return
        }

        if (incomingItems.some(item => item.item === items[0].item) && incomingItems[0].item !== items[0].item) {
            let changedData = incomingItems.map((listItem, i) => {
                return !items.some(item => listItem.item === item.item) ? { ...listItem, color: "green" } : { ...listItem }
            })
            if (sound) audio.play()
            setItems(prev => changedData)
        }
    }, [incomingItems, sound])

    /*
    useEffect(() => {
        getTokenFromUser()
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
                // Checks if received data contains the first item of pre-existing items (to prevent list from refreshing in case someone deletes the first item) and then checks if both lists of items have the same first item
                if (data.some(item => item.item === items[0].item) && data[0].item !== items[0].item) {
                    data = data.map((listItem, i) => {
                        return !items.some(item => listItem.item === item.item) ? { ...listItem, color: "green" } : { ...listItem }
                    })
                    if (sound) audio.play()
                    setItems(prev => data)
                }
            }).catch(error => {
                console.error(error)
            })
        }, 2500)

        return () => {
            clearInterval(interval)
        }
    }, [items, sound])
    */



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
                )} </ul> : <div className="absolute  w-[200px] flex justify-center mb-2"><Spinner /></div>}
            <button onClick={() => setSound(prev => !prev)} className={`${sound ? "brightness-100" : "brightness-50"} scale-150 text-white p-3`}>📢 Sound {sound ? "on" : "off"}</button>
        </>
    );
}

export default ToriComponent