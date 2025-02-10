import express from "express"
import dotenv from "dotenv"
import { catchException } from "./src/middlewares/catch-exception"
import { userRoutes } from "./src/infra/routes/user.routes"
import { authRoutes } from "./src/infra/routes/auth.routes"


// Config
dotenv.config()

const app = express()

app.use(express.json())

// Routes
app.use(userRoutes)
app.use(authRoutes)

app.use(catchException)

const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`)
})