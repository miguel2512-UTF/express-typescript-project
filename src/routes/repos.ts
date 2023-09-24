import express from 'express'
import { getLanguagesOfRepo, getReposOfUser } from '../services/githubApiService'
import { Repo } from '../types'

const router = express.Router()

router.get("/", async (_req, res) => {    
    const githubUser = "miguel2512-UTF"
    const repos = await getReposOfUser(githubUser)  
    
    const mappedRepos: Array<Repo> = []
    for (const {name, html_url, description, language, homepage} of repos) {
        const mapRepo = {
            name,
            html_url,
            description,
            language,
            languages: await getLanguagesOfRepo(name, githubUser),
            homepage
        }
        mappedRepos.push(mapRepo)
    }
    
    res.status(200).json({
        success: true,
        length: repos.length,
        data: mappedRepos
    })
})

export default router