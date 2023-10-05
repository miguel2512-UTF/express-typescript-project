import { PrismaClient } from "@prisma/client"
import { Repo } from "../types"

const prisma = new PrismaClient()

export const getRepos = async (): Promise<Repo[]> => {
    const repos = await prisma.repository.findMany()

    repos.forEach((repo: Repo) => {
        repo.languages = JSON.parse(repo.languages)
    }); 

    return repos
}

export const getRepoByName = async (name: string): Promise<Repo | null> => {
    const repo = await prisma.repository.findFirst({
        where: {
            name: name
        }
    })
    
    if (repo != null) {
        repo.languages = JSON.parse(repo.languages)
    }

    return repo
}

export const createRepo = async (repo: Repo): Promise<Repo> => {
    return await prisma.repository.create({
        data: {
            name: repo.name,
            description: repo.description,
            url: repo.url,
            language: repo.language,
            languages: repo.languages,
            homepage: repo.homepage
        }
    })
}

export const updateRepo = async (repo: Repo): Promise<Repo> => {
    repo.languages = JSON.stringify(repo.languages)

    const id = repo.id
    delete repo.id
    
    return await prisma.repository.update({
        where: {
            id
        },
        data: repo
    })
}

export const deleteAllRepos = async (): Promise<boolean> => {
    try {
        await prisma.repository.deleteMany()
        return true
    } catch (error) {
        return false
    }
}