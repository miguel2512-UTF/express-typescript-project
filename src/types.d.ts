export interface RepoGithub {
    name: string
    html_url: string
    description: string
    language: string
    languages: string
    homepage: string
}

export interface Repo {
    id?: number
    name: string
    url: string
    image_url?: string | null
    description?: string | null
    language?: string | null
    languages: string
    homepage?: string | null
}

export type Languages =  {
    [language: string]: number
}