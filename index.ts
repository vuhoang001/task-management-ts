import express, { Express, Request, Response } from "express"
import * as database from "./config/database"
import dotenv from "dotenv"
import mainV1Routes from "./api/v1/routes/index.route"
dotenv.config()

database.connect()

const app: Express = express()
const port: number | string = 3000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mainV1Routes(app)

app.listen(port, () => {
    console.log(`App is listening in port ${port}`)
})