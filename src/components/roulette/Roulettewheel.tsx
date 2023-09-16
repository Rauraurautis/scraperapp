
import { Movie } from '../../lib/types'
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { Wheel } from 'react-custom-roulette'

interface RoulettewheelProps {
    data: Movie[]
    setDialog: Dispatch<SetStateAction<boolean>>
}

const randomNumber = (amount: number) => {
    return Math.floor(Math.random() * amount)
}

const randomBackgrounds = () => {
    const backgrounds = []
    for (let i = 0; i < 5; i++) {
        backgrounds.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`)
    }
    return backgrounds
}

const Roulettewheel: FC<RoulettewheelProps> = ({ data, setDialog }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(() => { return randomNumber(data.length) });
    const [showWinner, setShowWinner] = useState(false)

    const bgColors = useMemo(() => {
        return randomBackgrounds()

    }, [])

    const handleSpinClick = () => {
        setDialog(prev => false)
        if (data[0].option === "") {
            return
        }
        if (showWinner) {
            setShowWinner(false)
            return
        }
        const newPrizeNumber = randomNumber(data.length)
        setPrizeNumber(newPrizeNumber);
        if (!mustSpin) {
            setShowWinner(false)
            setMustSpin(true);
        }
    }



    return (
        <div onClick={handleSpinClick} className={`${data.length > 0 ? "cursor-pointer" : ""} flex items-center justify-center `}>
            {showWinner ? <div className=" w-full h-full absolute flex justify-center items-center brightness-150 z-10 ">
                <h1 className=" text-3xl sm:text-5xl font-semibold z-10 w-[500px]  text-center">{data[prizeNumber]?.option ?? "Pekka"}</h1>
            </div> : ""}
            {
                data.length === 0 ?
                    <h1 className="text-3xl">Valitse elokuvat</h1> :
                    <div className={`${showWinner ? "brightness-50" : "flex items-center justify-center"}`}>
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={data.length === 0 ? [{ option: "1" }] : data}
                            onStopSpinning={() => {
                                setMustSpin(false);
                                setShowWinner(true)
                            }}
                            backgroundColors={bgColors}
                            textColors={['#ffffff']}
                            fontSize={15}
                            fontStyle=''
                        />
                    </div>
            }
        </div >
    )
}

export default Roulettewheel
