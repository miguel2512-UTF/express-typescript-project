import express from 'express'
import { getLanguagesByRepo, getReposByUser } from '../services/githubApiService'
import { Repo } from '../types'
import { GITHUB_USER } from '../../settings'
import { createRepo, deleteAllRepos, getRepos } from '../services/repoService'

const router = express.Router()

router.get("/", async (_req, res) => {
    const repos = await getRepos()
    
    res.status(200).json({
        success: true,
        length: repos.length,
        data: repos
    })
})

router.get("/refresh", async (_req, res) => {
    const deleteRepos = await deleteAllRepos()

    if (!deleteRepos) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
        return
    } 

    const repos = await getReposByUser(GITHUB_USER)

    for (const { name, html_url, description, language, homepage } of repos) {
        const mapRepo: Repo = {
            name,
            html_url,
            description,
            language,
            languages: JSON.stringify(await getLanguagesByRepo(name, GITHUB_USER)),
            homepage
        }
        createRepo(mapRepo)
    }

    res.status(200).json({
        success: true,
        reposCount: repos.length
    })
})

export default router