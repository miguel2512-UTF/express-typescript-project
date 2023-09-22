import express from 'express'
import { getReposOfUser } from '../services/githubApiService'
import { Repo } from '../types'

const router = express.Router()

router.get("/", async (_req, res) => {
    const repos = await getReposOfUser("miguel2512-UTF")
    const mappedRepos = repos.map(({name, html_url, description, language, homepage}: Repo) => {
        return {
            name,
            html_url,
            description,
            language,
            homepage
        }
    })
    res.status(200).json({
        success: true,
        length: repos.length,
        data: mappedRepos
    })
})

export default router