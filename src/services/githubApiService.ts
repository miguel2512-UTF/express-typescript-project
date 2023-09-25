import { Languages, Repo } from "../types"
import * as dotenv from "dotenv";

dotenv.config();

const GITHUB_API_URL = "https://api.github.com"
const PERSONAL_ACCESS_TOKEN = process.env.PERSONAL_ACCESS_TOKEN

const authHeaders = {
    Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`
}

export const getReposByUser = async (username: string): Promise<Repo[]> => {
    try {
        const res = await fetch(`${GITHUB_API_URL}/users/${username}/repos`, {
            headers: authHeaders
        })
        const data = res.json()
        
        return data
    } catch (error) {
        throw error
    }
}

export const getLanguagesByRepo = async (repo: string, owner: string): Promise<Languages> => {
    try {
        const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/languages`, {
            headers: authHeaders
        })
        const data = res.json()

        return data
    } catch (error) {
        throw error
    }
}