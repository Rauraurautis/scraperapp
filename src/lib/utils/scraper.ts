import axios from "axios"
import { load } from "cheerio"

export const scrapeToriAxios = async (amount: number) => {
    try {
        const { data } = await axios.get("http://localhost:3005/annetaan")
        return data
    } catch (err) {
        console.error(err)
    }
}