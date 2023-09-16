import { FC } from 'react'
import WheelComponent from '../components/roulette/WheelComponent'

interface RoulettePageProps {

}

const RoulettePage: FC<RoulettePageProps> = ({ }) => {
    return <div>
        <WheelComponent />
    </div>
}

export default RoulettePage