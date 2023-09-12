import React, { useEffect, useState } from 'react';
import { scrapeToriAxios } from './lib/utils/scraper';
import Item from './components/Item';
import notification from "./notification.mp3"
import useSound from 'use-sound';
import { isMobile } from 'react-device-detect';

export interface ItemInfo {
  item: string
  link: string
  image: string | null
}

const audio = new Audio(notification)

function App() {
  const [items, setItems] = useState<ItemInfo[]>([])
  const [highlightedItem, setHighlightedItem] = useState<ItemInfo | null>(null)
  const [sound, setSound] = useState(false)

  useEffect(() => {

    scrapeToriAxios(15).then(data => {
      setItems(prev => data)
    })
  }, [])


  useEffect(() => {
    let interval = setInterval(() => {
      scrapeToriAxios(15).then(data => {
        if (data[0].item !== items[0].item) {
          if (sound) audio.play()
          setItems(prev => data)
        }
      })
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [items])


  return (
    <div className="bg-slate-900 w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <div className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] flex justify-center">
        {isMobile && highlightedItem?.image ?
          <div className="flex flex-col justify-center items-center">
            <img className="relative" src={highlightedItem.image ?? ""} />
            <a className="text-white py-3 text-xl" href={highlightedItem.link}>Go to product</a>
          </div> : highlightedItem?.image ?
            <img className="relative top-0" src={highlightedItem.image ?? ""} /> : <h1 className="text-white text-center text-3xl md:text-7xl absolute top-2">Tori annetaan-scraper beta</h1>}

      </div>

      <ul className=" bg-slate-800 p-5 max-h-[50%] w-fit overflow-y-scroll overflow-x-hidden flex flex-col items-center rounded-xl">
        {items.length > 0 ? items.map((item, i) => (
          <Item item={item} index={i} setHighlightedItem={setHighlightedItem} key={i} />
        )
        ) : <h1 className="text-white font-semibold">Loading tori items..</h1>
        }

      </ul>
      <button onClick={() => setSound(prev => !prev)} className={`${sound ? "brightness-100" : "brightness-50"} scale-150 text-white p-3`}>📢 Sound {sound ? "on" : "off"}</button>
    </div>
  );
}

export default App;
