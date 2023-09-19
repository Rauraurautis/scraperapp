import axios from "axios";
import { TokenInput } from "../types";

export const postTokenToDb = async (input: TokenInput) => {
    try {
        const request = axios.post("http://localhost:3005/db", input)
        return request
    } catch (error) {
        console.error(error)
    }
}