import { FC, useState } from 'react'
import { ItemInfo } from '../App'
import { isMobile } from 'react-device-detect'

interface ItemProps {
    item: ItemInfo
    index: number
    setHighlightedItem:  React.Dispatch<React.SetStateAction<ItemInfo | null>>
}

const Item: FC<ItemProps> = ({ item, index, setHighlightedItem }) => {
    const [showImage, setShowImage] = useState(false)

    if (isMobile) {
        return <li key={index} className="text-white font-semibold hover:scale-125 transition-all"
            onMouseEnter={() => setHighlightedItem(prev => item)}
            onMouseLeave={() => setHighlightedItem(prev => null)}
            onClick={() => setHighlightedItem(prev => item)}>

            <p>{item.item}</p>



        </li>
    }

    return <li key={index} className="text-white font-semibold hover:scale-125 transition-all"
        onMouseEnter={() => setHighlightedItem(prev => item)}
        onMouseLeave={() => setHighlightedItem(prev => null)}>
        <a href={item.link + "#"}>{item.item}</a>



    </li>

}

export default Item