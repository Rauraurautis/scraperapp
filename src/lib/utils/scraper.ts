import axios from "axios"
import { load } from "cheerio"

export const scrapeToriAxios = async (amount: number) => {
    try {
        const { data } = await axios.get("https://scraper-4do1.onrender.com/annetaan")
        return data
    } catch (err) {
        console.error(err)
    }
}