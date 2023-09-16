import axios from "axios"
import { load } from "cheerio"
import { ItemInfo } from "../../components/tori/ToriComponent"
import { Movie } from "../types"

export const scrapeToriAxios = async (amount: number): Promise<ItemInfo[]> => {
    try {
        const { data } = await axios.get("https://scraper-4do1.onrender.com/annetaan")
        return data
    } catch (err) {
        console.error(err)
        return []
    }
}


export const scrapeJusaMovies = async (): Promise<Movie[]> => {
    try {
        const { data } = await axios.get("https://scraper-4do1.onrender.com/jusa")
        return data
    } catch (err) {
        console.error(err)
        return []
    }


}