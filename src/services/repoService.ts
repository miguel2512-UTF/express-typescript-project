import db from "../db/connect"
import { Repo } from "../types"

export const getRepos = (): Promise<Repo[]> => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM repository"

        db.all(sql, (err, data: Repo[]) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}

export const createRepo = (repo: Repo): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO repository (name, url, description, language, languages, homepage) VALUES (?, ?, ?, ?, ?, ?)", [repo.name, repo.html_url, repo.description, repo.language, repo.languages, repo.homepage], (err) => {
            reject(err)
        })

        resolve(true)
    })
}