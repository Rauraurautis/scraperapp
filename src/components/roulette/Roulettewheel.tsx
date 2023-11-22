
import { Movie } from '../../lib/types'
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
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

    const containerRef = useRef<HTMLDivElement>(null)

    const applyMule = () => {
        if (containerRef.current && showWinner) {
            const min = containerRef.current.offsetLeft
            const max = min + containerRef.current.offsetWidth
            const x = Math.random() * (max - min) + min
            const y = containerRef.current.offsetTop
            const element = document.createElement("span")
            element.className = "mule"
            element.style.left = `${x}px`
            element.style.top = `${0}px`
            element.style.animation = Math.random() > 0.5 ? `dropDown 3s forwards` : `dropDownReverse 3s forwards`
            // element.style.background = color

            containerRef.current.appendChild(element)
            setTimeout(() => {
                containerRef?.current?.removeChild(element)
            }, 2000)
        }

    }

    useEffect(() => {
        if (showWinner) {
            const interval = setInterval(() => {
                applyMule()
            }, 150)
                return () => { return clearInterval(interval) }
        }
       
    }, [showWinner])



return (
    <div onClick={handleSpinClick} className={`${data.length > 0 ? "cursor-pointer" : ""} flex items-center justify-center `} ref={containerRef}>
        {showWinner ? <div className=" w-fit h-fit absolute flex items-center flex-grow justify-center z-10 animate-pulse-grow-shrink">
            <h1 className=" text-3xl sm:text-5xl font-semibold z-10 w-[500px] text-center text-white overflow-visible">{data[prizeNumber]?.fullName ?? "Pekka"}</h1>
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
