import React, { useEffect, useState } from 'react';
import { scrapeToriAxios } from './lib/utils/scraper';
import Item from './components/Item';
import notification from "./notification.mp3"
import useSound from 'use-sound';

export interface ItemInfo {
  item: string
  link: string
  image: string
}

const audio = new Audio(notification)

function App() {
  const [items, setItems] = useState<ItemInfo[]>([])
  const [image, setImage] = useState<string | null>(null)
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
    <div className="bg-slate-900 w-screen h-screen flex flex-col justify-center items-center">
      <div className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]">{image ? <img className="relative top-0 invisible md:visible" src={image ?? ""} /> : ""}</div>
      <ul className=" bg-slate-800 p-5 max-h-[50%] w-fit overflow-y-scroll overflow-x-hidden flex flex-col items-center">
        {items.length > 0 ? items.map((item, i) => (
          <Item item={item} index={i} setImage={setImage} />
        )
        ) : <h1 className="text-white font-semibold">Loading tori items..</h1>
        }

      </ul>
      <button onClick={() => setSound(prev => !prev)} className={`${sound ? "brightness-100" : "brightness-50"} scale-150 text-white p-3`}>📢 Sound {sound ? "on" : "off"}</button>
    </div>
  );
}

export default App;
