import { Router } from "express";
import path from 'path';
import { REPO_IMAGES_FOLDER } from "../../settings";

const router = Router()

router.get("/repo/images/:filename", (req, res) => {
    const repoImage = path.join(REPO_IMAGES_FOLDER, req.params.filename)
    res.sendFile(repoImage, (err) => {
        if (err) {
            res.status(404).json({
                success: false,
                message: "File not found"
            })
            return
        }
    })
})

export default router