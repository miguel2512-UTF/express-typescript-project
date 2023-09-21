import express from 'express'

const app = express()

app.use(express.json())

const PORT = 3000

app.get("/", (_req, res) => {
    console.log("hello world");
    res.send("Hi!")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})