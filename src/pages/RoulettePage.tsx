import { FC, useRef } from 'react'
import WheelComponent from '../components/roulette/WheelComponent'

interface RoulettePageProps {

}

const RoulettePage: FC<RoulettePageProps> = ({ }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const applyMule = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const random = Math.random()
        if (random < 0.05) {
            const x = e.clientX
            const y = e.clientY
            const element = document.createElement("span")
            element.className = "mule"
            element.style.left = `${x + 20}px`
            element.style.top = `${y + 20}px`
            // element.style.background = color
            if (containerRef.current) {
                containerRef.current.appendChild(element)
                setTimeout(() => containerRef.current?.removeChild, 500)
            }
        }


    }


    return <div className=" items-center justify-center flex overflow-y-clip" ref={containerRef}>
        <WheelComponent />
    </div>
}

export default RoulettePage

