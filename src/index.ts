import express from 'express'
import repoRouter from './routes/repos'
import publicRouter from './routes/public'
import { PORT } from '../settings'

const app = express()

app.use(express.json())

app.use((req, _res, next) => {
    console.log(req.method, req.url, new Date().toLocaleString());
    next()
})

app.get("/", (_req, res) => {
    console.log("hello world");
    res.send("Hi!")
})

app.use("/api/repos", repoRouter)

app.use("/public", publicRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})