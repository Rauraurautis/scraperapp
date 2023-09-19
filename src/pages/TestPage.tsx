import { FC, useState } from 'react'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getTokenFromUser, messaging } from '../lib/firebase';

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
    const [isTokenFound, setTokenFound] = useState(false);
    const [userToken, setUserToken] = useState("")
    getTokenFromUser();







    return <><div className="w-[700px] h-[500px] ">
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
        

    </div>
    <div className="w-[200px] flex-wrap break-words"><h1 className="text-white">{userToken}</h1></div>
    </>
}

export default TestPage