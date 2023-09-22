import express from 'express'
import repoRouter from './routes/repos'

const app = express()

app.use(express.json())

app.use((req, _res, next) => {
    console.log(req.method, req.url, new Date().toLocaleString());
    next()
})

const PORT = 3000

app.get("/", (_req, res) => {
    console.log("hello world");
    res.send("Hi!")
})

app.use("/api/repos", repoRouter)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})