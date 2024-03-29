import path from 'path'

export const ROOT_DIR = __dirname
export const PUBLIC_FOLDER = path.join(ROOT_DIR, "public")
export const REPO_IMAGES_FOLDER = path.join(PUBLIC_FOLDER, "repo_images")
export const GITHUB_USER = "miguel2512-UTF"
export const ACCEPTED_IMAGES_EXTENSIONS = ["jpg", "png"]
export const PORT = 3000
export const DEV_DOMAIN = "localhost:" + PORT
export const PROD_DOMAIN = ""
export const DOMAIN = DEV_DOMAIN