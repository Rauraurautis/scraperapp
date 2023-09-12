import { FC, useState } from 'react'
import { ItemInfo } from '../App'


interface ItemProps {
    item: ItemInfo
    index: number
    setImage: React.Dispatch<React.SetStateAction<string | null>>
}

const Item: FC<ItemProps> = ({ item, index, setImage }) => {
    const [showImage, setShowImage] = useState(false)

    return <li key={index} className="text-white font-semibold hover:scale-125 transition-all"
        onMouseEnter={() => setImage(prev => item.image)}
        onMouseLeave={() => setImage(prev => null)}>
        <a href={item.link}>{item.item}</a>



    </li>

}

export default Item