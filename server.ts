import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(express.json())

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})