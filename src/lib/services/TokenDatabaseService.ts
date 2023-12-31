import axios from "axios";
import { TokenInput } from "../types";

export const postTokenToDb = async (input: TokenInput) => {
    try {
        const request = axios.post("https://scraper-4do1.onrender.com/db", input)
        return request
    } catch (error) {
        console.error(error)
    }
}