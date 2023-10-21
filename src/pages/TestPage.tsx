import { FC, useEffect, useState } from 'react'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getTokenFromUser, messaging } from '../lib/firebase';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface TestPageProps {

}

const data = {
    sijainti: "Jouhisarankuja 5 A 11, 01800 Nurmijärvi",
    kaupunginosa: "Klaukkala",
    kerros: "3/5",
    pintaAla: "47m2",
    kokoonpano: "2h+kt",
    huoneita: "2",
    kunto: "Uusi",
    parveke: "Kyllä",
    parvekeTiedot: "Tavallinen, lasitettu",
    sauna: false ? "ei" : "kyllä",
    tyyppi: "Omistus",
    tila: "Rakenteilla"
}

const TestPage: FC<TestPageProps> = ({ }) => {

    const [searchParams, setSearchParams] = useSearchParams({ q: "", something: "" })
    const q = searchParams.get("q")
    const onlyComputerItems = searchParams.get("onlyComputerItems") === "true"

    useEffect(() => {
        axios.get("https://scraper-4do1.onrender.com/healthcheck", { withCredentials: true })
    }, [])

    const getBackCookieInfo = async () => {
        axios.get("https://scraper-4do1.onrender.com/cookies", { withCredentials: true }).then(res => console.log(res.data))
    }


    return <><div className="w-[700px] h-[500px] ">
        <button onClick={getBackCookieInfo} className="p-5 bg-slate-400">Press here</button>
        <div className="w-full h-full bg-gray-300 flex flex-col">
            <h2 className=' text-2xl p-1 pb-2'>Perustiedot</h2>
            {Object.entries(data).map((entry, i, arr) => (
                <div className="w-full p-1 py-1.5" key={i}>
                    <div className="flex items-center">
                        <p className="font-bold w-[30%]">{entry[0].charAt(0).toUpperCase() + entry[0].slice(1)}</p>
                        <p>{entry[1]}</p>
                    </div>
                    {i === arr.length - 1 ? "" : <hr className='h-0.5 bg-gray-400 w-full' />}
                </div>
            ))}
        </div>
        <input type="text" name="something" onChange={e => setSearchParams(prev => {
            prev.set("q", e.target.value)
            return prev
        }, { replace: true })}
            value={q || ""} />
        <input type="checkbox" checked={onlyComputerItems} name="onlyComputerItems" onChange={e => setSearchParams(prev => {
            prev.set("onlyComputerItems", e.target.checked + "")
            return prev
        }, { replace: true })} />
        <Link to="/"><p>front a</p></Link>

    </div>
    </>
}

export default TestPage