import { FC, useState } from 'react'
import { ItemInfo } from './ToriComponent'
import { isMobile } from 'react-device-detect'

interface ItemProps {
    item: ItemInfo
    index: number
    setHighlightedItem: React.Dispatch<React.SetStateAction<ItemInfo | null>>
}

const Item: FC<ItemProps> = ({ item, index, setHighlightedItem }) => {

    if (isMobile) {
        return <li key={index} className={`${item.color === "green" ? "text-green-600" : "text-white"} font-semibold hover:scale-125 transition-all `}
            onMouseEnter={() => setHighlightedItem(prev => item)}
            onMouseLeave={() => setHighlightedItem(prev => null)}
            onClick={() => setHighlightedItem(prev => item)}>
            <p>{item.item}</p>
        </li>
    }

    return <li key={index} className={`${item.color === "green" ? " bg-green-800" : ""} text-white font-semibold hover:scale-125 transition-all w-full text-center px-5 pt-0.5`}
        onMouseEnter={() => setHighlightedItem(prev => item)}
        onMouseLeave={() => setHighlightedItem(prev => null)}>
        <a href={item.link + "#"} target="_blank" className={`${item.item.length > 30 ? "text-sm" : ""}`}>{item.item}</a>



    </li>

}

export default Item