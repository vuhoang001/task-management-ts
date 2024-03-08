import express, { Express, Request, Response } from "express"
import * as database from "./config/database"
import dotenv from "dotenv"
import tasks from "./models/tasks.model"

dotenv.config()

database.connect()

const app: Express = express()
const port: number | string = 3000 || process.env.PORT

app.get('/tasks', async (req: Request, res: Response) => {
    try {
        const task = await tasks.find({
            deleted: false
        })
        if (!res.headersSent) {
            res.json(task)
        }
    } catch (error) {
        // Xử lý lỗi ở đây nếu cần thiết
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

app.use('/tasks/detail/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const task = await tasks.findOne({
        _id: id,
        deleted: false
    })
    res.json(task)
})

app.listen(port, () => {
    console.log(`App is listening in port ${port}`)
})