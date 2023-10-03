import express from 'express'
import { getLanguagesByRepo, getReposByUser } from '../services/githubApiService'
import { Repo } from '../types'
import { GITHUB_USER, PUBLIC_FOLDER, REPO_IMAGES_FOLDER } from '../../settings'
import { createRepo, deleteAllRepos, getRepoByName, getRepos, updateRepo } from '../services/repoService'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs/promises'

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
            url: html_url,
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

router.get("/:name", async (req, res) => {
    const repoName = req.params.name

    const repo = await getRepoByName(repoName)

    if (!repo) {
        res.status(404).json({
            message: "Repository not found"
        })

        return
    }

    res.status(200).json(repo)
})

router.put("/:name", async (req, res) => {
    const repoName = req.params.name
    const repo = await getRepoByName(repoName)

    if (!repo) {
        return res.status(404).json({
            success: false,
            message: "Repository not found"
        })
    }

    const updatedRepo = await updateRepo({
        ...req.body,
        id: repo.id
    })

    return res.status(200).json({
        success: false,
        message: "Repository updated successfully",
        data: updatedRepo
    })
})

router.post("/fileupload", async (req, res) => {
    const form = formidable({})
    
    let fields
    let files

    try {
        [ fields, files ] = await form.parse(req)
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error uploading image"
        })
        return
    }

    const oldpath = files?.image_url?.[0].filepath ?? ""
    const newpath = path.join(REPO_IMAGES_FOLDER, files?.image_url?.[0].originalFilename ?? "")

    try {
        await fs.mkdir(PUBLIC_FOLDER)
    } catch (err) {
        console.log(err);
    }
    
    try {
        await fs.mkdir(REPO_IMAGES_FOLDER)
    } catch (err) {
        console.log(err);
    }
    
    await fs.rename(oldpath, newpath)

    res.json({
        success: true,
        image_url: files?.image_url?.[0].originalFilename
    })
})

export default router