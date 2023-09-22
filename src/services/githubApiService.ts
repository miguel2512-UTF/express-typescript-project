const GITHUB_API_URL = "https://api.github.com"

export const getReposOfUser = async (username: string) => {
    try {
        const res = await fetch(`${GITHUB_API_URL}/users/${username}/repos`)
        const data = res.json()
        
        return data
    } catch (error) {
        throw error
    }
}